export interface MandalaCell {
  title: string;
  items?: string[]; // The 8 surrounding items for a sub-goal
}

export interface MandalaChartData {
  center: string;
  goals: MandalaCell[]; // The 8 sub-goals surrounding the center
}

export const ohtaniChart: MandalaChartData = {
  center: "Drafted #1 by 8 Teams",
  goals: [
    {
      title: "Control",
      items: [
        "In-step strengthening",
        "Body axis stability",
        "Eliminate anxiety",
        "Mental stability",
        "Whole body usage",
        "Release point stability",
        "Core strengthening",
        "Visualization",
      ],
    },
    {
      title: "Kire (Sharpness)",
      items: [
        "Spin rate",
        "Extension",
        "Wrist strength",
        "Lower body usage",
        "Angle",
        "Release point",
        "Ball grip",
        "Arm swing speed",
      ],
    },
    {
      title: "Speed 160km/h",
      items: [
        "Shoulder flexibility",
        "Lower body strength",
        "Core power",
        "Body mechanics",
        "Weight training",
        "Nutrition",
        "Plyometrics",
        "Shoulder stability",
      ],
    },
    {
      title: "Change of Pace", // Often translated as "Breaking Ball" or "Variety"
      items: [
        "Forkball mastery",
        "Slider sharpness",
        "Curveball control",
        "Changeup timing",
        "Pitch tunneling",
        "Count leverage",
        "Batter psychology",
        "Release consistency",
      ],
    },
    {
      title: "Luck",
      items: [
        "Pick up trash",
        "Greet others",
        "Clean room",
        "Respect equipment",
        "Positive attitude",
        "Support teammates",
        "Be polite",
        "Read books",
      ],
    },
    {
      title: "Human Character",
      items: [
        "Sensitivity/Empathy",
        "Loved by others",
        "Planning ability",
        "Gratefulness",
        "Persistence",
        "Trustworthiness",
        "Humility",
        "Compassion",
      ],
    },
    {
      title: "Mental",
      items: [
        "Clear goals",
        "Stay cool/calm",
        "Focus on now",
        "Don't get emotional",
        "Positive thinking",
        "Confidence",
        "Analyze failures",
        "Courage",
      ],
    },
    {
      title: "Body Building",
      items: [
        "Supplements",
        "Flexibility",
        "Stamina",
        "Recovery",
        "Sleep quality",
        "Nutritional balance",
        "Hydration",
        "Weight control",
      ],
    },
  ],
};

export const emptyChart: MandalaChartData = {
  center: "",
  goals: Array(8).fill(null).map(() => ({
    title: "",
    items: Array(8).fill(""),
  })),
};
