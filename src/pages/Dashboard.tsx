import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "@/lib/auth";
import { predictDisease, type Prediction, type Recommendations } from "@/lib/predictions";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Upload,
  LogOut,
  ImageIcon,
  Activity,
  CheckCircle2,
  XCircle,
  Apple,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const ConfidenceBar = ({ value, isPrimary }: { value: number; isPrimary: boolean }) => (
  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
    <div
      className={`h-full rounded-full transition-all duration-1000 ease-out ${
        isPrimary ? "bg-gradient-medical" : "bg-gradient-health"
      }`}
      style={{ width: `${value}%` }}
    />
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setPredictions(null);
    setRecommendations(null);
  };

  const handlePredict = () => {
    setLoading(true);
    setPredictions(null);
    setRecommendations(null);
    setTimeout(() => {
      const result = predictDisease();
      setPredictions(result.predictions);
      setRecommendations(result.recommendations);
      setLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-medical flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">SkinDetect</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Hi, <span className="font-semibold text-foreground">{user.username}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Upload Section */}
        <section className="bg-card rounded-2xl shadow-card p-6 sm:p-8 animate-fade-in">
          <h2 className="text-2xl font-display font-bold mb-1">Skin Analysis</h2>
          <p className="text-muted-foreground mb-6">Upload a skin image to get AI-powered predictions</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center min-h-[260px] cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded skin"
                  className="max-h-[240px] rounded-lg object-contain"
                />
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground mb-1">Click to upload image</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-4">
              <div className="bg-muted/50 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Upload className="w-5 h-5 text-primary" />
                  <span className="font-semibold">How it works</span>
                </div>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Upload a clear image of the skin area</li>
                  <li>Click "Predict Disease" to analyze</li>
                  <li>Review predictions and recommendations</li>
                </ol>
              </div>
              <Button
                onClick={handlePredict}
                disabled={!imagePreview || loading}
                className="h-12 text-base font-semibold bg-gradient-medical hover:opacity-90 transition-opacity shadow-primary-glow disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5 mr-2" />
                    Predict Disease
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Results */}
        {predictions && (
          <section className="space-y-6 animate-fade-in">
            {/* Predictions */}
            <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8">
              <h3 className="text-xl font-display font-bold mb-6">Prediction Results</h3>
              <div className="grid gap-4">
                {predictions.map((p, i) => (
                  <div
                    key={p.disease}
                    className={`rounded-xl p-5 ${
                      i === 0 ? "bg-primary/5 border-2 border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {i === 0 && (
                            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                              Primary
                            </span>
                          )}
                          <span className="font-display font-bold text-lg">{p.disease}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                      <span
                        className={`text-2xl font-display font-bold whitespace-nowrap ${
                          i === 0 ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {p.confidence}%
                      </span>
                    </div>
                    <ConfidenceBar value={p.confidence} isPrimary={i === 0} />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {recommendations && (
              <div className="grid sm:grid-cols-2 gap-6">
                <RecCard
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  title="What You Should Do"
                  items={recommendations.shouldDo}
                  colorClass="text-accent"
                  bgClass="bg-secondary"
                />
                <RecCard
                  icon={<XCircle className="w-5 h-5" />}
                  title="What to Avoid"
                  items={recommendations.shouldAvoid}
                  colorClass="text-destructive"
                  bgClass="bg-destructive/5"
                />
                <RecCard
                  icon={<Apple className="w-5 h-5" />}
                  title="Suggested Diet"
                  items={recommendations.diet}
                  colorClass="text-accent"
                  bgClass="bg-secondary"
                />
                <RecCard
                  icon={<ShieldCheck className="w-5 h-5" />}
                  title="Prevention Tips"
                  items={recommendations.prevention}
                  colorClass="text-primary"
                  bgClass="bg-primary/5"
                />
              </div>
            )}

            <p className="text-xs text-center text-muted-foreground italic pb-4">
              ⚠️ This is a demonstration tool for educational purposes only. Always consult a qualified dermatologist for medical advice.
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

const RecCard = ({
  icon,
  title,
  items,
  colorClass,
  bgClass,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  colorClass: string;
  bgClass: string;
}) => (
  <div className="bg-card rounded-2xl shadow-card p-6 animate-fade-in">
    <div className={`flex items-center gap-3 mb-4 ${colorClass}`}>
      <div className={`w-10 h-10 rounded-xl ${bgClass} flex items-center justify-center`}>
        {icon}
      </div>
      <h4 className="font-display font-bold text-foreground">{title}</h4>
    </div>
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colorClass} bg-current`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
