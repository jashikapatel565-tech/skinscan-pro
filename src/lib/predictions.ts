export interface Prediction {
  disease: string;
  confidence: number;
  description: string;
}

export interface Recommendations {
  shouldDo: string[];
  shouldAvoid: string[];
  diet: string[];
  prevention: string[];
}

interface PredictionResult {
  predictions: Prediction[];
  recommendations: Recommendations;
}

const DISEASES: { disease: string; description: string; recommendations: Recommendations }[] = [
  {
    disease: "Eczema (Atopic Dermatitis)",
    description: "A chronic condition causing dry, itchy, and inflamed skin patches.",
    recommendations: {
      shouldDo: [
        "Moisturize skin regularly with fragrance-free cream",
        "Use gentle, soap-free cleansers",
        "Wear soft, breathable fabrics like cotton",
        "Consult a dermatologist for persistent symptoms",
      ],
      shouldAvoid: [
        "Harsh soaps and detergents",
        "Scratching affected areas",
        "Extreme temperatures and low humidity",
        "Known allergens and irritants",
      ],
      diet: [
        "Omega-3 rich foods (salmon, flaxseed)",
        "Probiotic foods (yogurt, kimchi)",
        "Anti-inflammatory fruits (blueberries, cherries)",
        "Stay well hydrated with water",
      ],
      prevention: [
        "Keep skin moisturized daily",
        "Identify and avoid personal triggers",
        "Manage stress through relaxation techniques",
        "Use a humidifier in dry environments",
      ],
    },
  },
  {
    disease: "Psoriasis",
    description: "An autoimmune condition causing rapid skin cell buildup, leading to thick, scaly patches.",
    recommendations: {
      shouldDo: [
        "Apply prescribed topical treatments consistently",
        "Get moderate sun exposure (10–15 min daily)",
        "Keep skin moisturized after bathing",
        "Follow up regularly with your dermatologist",
      ],
      shouldAvoid: [
        "Smoking and excessive alcohol",
        "Skin injuries or sunburns",
        "Stressful situations when possible",
        "Picking or scratching plaques",
      ],
      diet: [
        "Anti-inflammatory foods (turmeric, ginger)",
        "Leafy greens and colorful vegetables",
        "Whole grains and lean proteins",
        "Limit processed and sugary foods",
      ],
      prevention: [
        "Maintain a healthy weight",
        "Exercise regularly",
        "Practice stress management",
        "Avoid known flare triggers",
      ],
    },
  },
  {
    disease: "Melanoma",
    description: "A serious form of skin cancer developing from pigment-producing cells (melanocytes).",
    recommendations: {
      shouldDo: [
        "Seek immediate consultation with a dermatologist",
        "Get a professional biopsy for confirmation",
        "Monitor other moles using the ABCDE rule",
        "Schedule regular skin examinations",
      ],
      shouldAvoid: [
        "Prolonged sun exposure without protection",
        "Tanning beds and UV lamps",
        "Ignoring changes in moles or skin spots",
        "Delaying medical consultation",
      ],
      diet: [
        "Antioxidant-rich foods (berries, dark chocolate)",
        "Vitamin D supplements (consult doctor)",
        "Green tea and cruciferous vegetables",
        "Foods rich in selenium (Brazil nuts, fish)",
      ],
      prevention: [
        "Apply SPF 30+ sunscreen daily",
        "Wear protective clothing outdoors",
        "Perform monthly self-skin checks",
        "Avoid peak sun hours (10 AM – 4 PM)",
      ],
    },
  },
  {
    disease: "Acne Vulgaris",
    description: "A common skin condition where hair follicles become clogged with oil and dead skin cells.",
    recommendations: {
      shouldDo: [
        "Wash face twice daily with a gentle cleanser",
        "Use non-comedogenic skincare products",
        "Apply benzoyl peroxide or salicylic acid as directed",
        "Change pillowcases frequently",
      ],
      shouldAvoid: [
        "Touching or picking at blemishes",
        "Heavy, oil-based cosmetics",
        "Over-washing or scrubbing the skin",
        "Dairy and high-glycemic foods in excess",
      ],
      diet: [
        "Zinc-rich foods (pumpkin seeds, chickpeas)",
        "Fresh fruits and vegetables",
        "Plenty of water for hydration",
        "Vitamin A sources (sweet potato, carrots)",
      ],
      prevention: [
        "Maintain a consistent skincare routine",
        "Remove makeup before sleeping",
        "Keep hair clean and off the face",
        "Manage stress levels",
      ],
    },
  },
  {
    disease: "Fungal Infection (Tinea)",
    description: "A common infection caused by dermatophyte fungi, appearing as circular, red, scaly patches.",
    recommendations: {
      shouldDo: [
        "Apply antifungal cream as prescribed",
        "Keep the affected area clean and dry",
        "Wash clothes and towels in hot water",
        "Complete the full course of treatment",
      ],
      shouldAvoid: [
        "Sharing personal items (towels, clothing)",
        "Wearing tight, non-breathable clothing",
        "Walking barefoot in public showers",
        "Keeping skin moist for prolonged periods",
      ],
      diet: [
        "Probiotic-rich foods to support immunity",
        "Garlic (natural antifungal properties)",
        "Coconut oil in cooking",
        "Reduce sugar and refined carbohydrates",
      ],
      prevention: [
        "Keep skin dry, especially in folds",
        "Wear breathable fabrics",
        "Use antifungal powder in prone areas",
        "Maintain good personal hygiene",
      ],
    },
  },
  {
    disease: "Contact Dermatitis",
    description: "An inflammatory skin reaction caused by direct contact with an irritant or allergen.",
    recommendations: {
      shouldDo: [
        "Identify and remove the irritating substance",
        "Apply cool compresses to soothe the area",
        "Use over-the-counter hydrocortisone cream",
        "See a doctor if reaction is severe",
      ],
      shouldAvoid: [
        "Re-exposure to the triggering substance",
        "Scratching the affected skin",
        "Using fragranced products on irritated skin",
        "Hot water on the affected area",
      ],
      diet: [
        "Anti-inflammatory foods (berries, leafy greens)",
        "Vitamin C-rich foods for skin healing",
        "Adequate protein for tissue repair",
        "Omega-3 fatty acids",
      ],
      prevention: [
        "Wear protective gloves when handling chemicals",
        "Patch test new skincare products",
        "Use hypoallergenic products",
        "Keep a diary to identify triggers",
      ],
    },
  },
];

export function predictDisease(): PredictionResult {
  const shuffled = [...DISEASES].sort(() => Math.random() - 0.5);
  const primary = shuffled[0];
  const secondary1 = shuffled[1];
  const secondary2 = shuffled[2];

  const primaryConf = Math.round(70 + Math.random() * 25);
  const sec1Conf = Math.round(10 + Math.random() * 20);
  const sec2Conf = Math.max(1, 100 - primaryConf - sec1Conf);

  return {
    predictions: [
      { disease: primary.disease, confidence: primaryConf, description: primary.description },
      { disease: secondary1.disease, confidence: sec1Conf, description: secondary1.description },
      { disease: secondary2.disease, confidence: sec2Conf, description: secondary2.description },
    ],
    recommendations: primary.recommendations,
  };
}
