import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Heart, Activity, Scan, Stethoscope } from "lucide-react";
import authBg from "@/assets/auth-bg.jpg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = isLogin
      ? login(username.trim(), password)
      : signUp(username.trim(), password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Full background image */}
      <img
        src={authBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/40 to-accent/30 backdrop-blur-[2px]" />

      {/* Left branding — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center p-16">
        <div className="text-primary-foreground max-w-lg animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-primary-foreground/15 backdrop-blur-md flex items-center justify-center mb-8 shadow-lg border border-primary-foreground/20">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-display font-extrabold leading-tight mb-5">
            Skin Disease<br />Detection System
          </h1>
          <p className="text-xl opacity-90 leading-relaxed mb-10">
            AI-powered skin analysis for early detection, personalized health guidance, and peace of mind.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Scan className="w-4 h-4" />, label: "AI Analysis" },
              { icon: <Heart className="w-4 h-4" />, label: "Health First" },
              { icon: <Stethoscope className="w-4 h-4" />, label: "Expert Insights" },
              { icon: <Activity className="w-4 h-4" />, label: "Instant Results" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-sm font-medium"
              >
                {f.icon}
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Card with glassmorphism */}
          <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-card-hover p-8 sm:p-10 border border-border/50">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
              <div className="w-11 h-11 rounded-xl bg-gradient-medical flex items-center justify-center shadow-primary-glow">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-display font-bold">SkinDetect</h2>
            </div>

            {/* Heading */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-display font-extrabold text-foreground">
                {isLogin ? "Welcome back" : "Get started"}
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                {isLogin
                  ? "Sign in to access the detection dashboard"
                  : "Create your account to start analyzing"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-muted/60 border-border/60 focus:bg-card transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl bg-muted/60 border-border/60 focus:bg-card transition-colors"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2.5 text-center">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-medical hover:opacity-90 transition-opacity shadow-primary-glow"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-primary font-semibold hover:underline underline-offset-2"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-primary-foreground/60 mt-6 lg:text-muted-foreground/60">
            For educational & demonstration purposes only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
