// Week 1 plan data — edit this file to add real YouTube video IDs
// or to update sets/reps/nutrition as the program progresses.
//
// Each exercise has a `thumb` describing its muscle-map thumbnail:
//   view:    "front" or "back" — which body silhouette to draw
//   muscles: keys drawn on that silhouette, see assets/muscles.js
//     front: chest, shoulders, biceps, forearms, quads
//     back:  traps, rearDelts, lats, triceps, hamstrings, glutes, calves
//   motion:  "vertical" | "horizontal" | "rotate" — small movement badge

const PROGRAM = {
  week: 1,
  startDate: "2026-07-22",
  goal: "Body recomposition — lose fat while building muscle.",
  defaultProtocol: "3 sets · 60-90 sec rest · RPE Moderate",
  baseline: {
    weightKg: 89.5,
    heightCm: 180,
    age: 33,
    bmi: 27.6,
    capturedOn: "2026-07-22",
  },
  schedule: [
    { day: "Mon", label: "Day 1", workout: "Push A", type: "training" },
    { day: "Tue", label: "Day 2", workout: "Pull A", type: "training" },
    { day: "Wed", label: "—", workout: "Rest", type: "rest" },
    { day: "Thu", label: "Day 3", workout: "Legs", type: "training" },
    { day: "Fri", label: "Day 4", workout: "Push/Pull B", type: "training" },
    { day: "Sat", label: "—", workout: "Rest", type: "rest" },
    { day: "Sun", label: "—", workout: "Rest", type: "sunday" },
  ],
  nutritionTargets: [
    { type: "Training", appliesTo: "Mon · Tue · Thu · Fri", kcal: "2,750 kcal", protein: "190 g protein" },
    { type: "Non-Training", appliesTo: "Wed · Sat", kcal: "2,400 kcal", protein: "185 g protein" },
    { type: "Sunday", appliesTo: "Sun (higher-carb adherence day)", kcal: "2,950 kcal", protein: "185 g protein" },
  ],
  dailyRhythm: [
    { when: "On waking", what: "1L filtered water + a pinch of salt — before anything else" },
    { when: "With Meal 1", what: "Vitamin D3 2000 IU, Multivitamin, Zinc Picolinate (optional), Fish oil 1500-2000mg" },
    { when: "Pre-workout (training days)", what: "Black coffee" },
    { when: "Post-workout (training days)", what: "Cardio, 250 kcal — take your tracker/watch off for this session" },
    { when: "With Meal 3", what: "Fish oil 1500-2000mg, Magnesium Citrate (optional), Creatine 5g (optional)" },
    { when: "All day", what: "3-4L water total (the 1L above counts) · food weighed raw/uncooked · meal timing is flexible, fast the first half if you prefer, just finish within the day" },
  ],
  workouts: [
    {
      id: "day1",
      day: "Day 1",
      name: "Push A",
      muscles: "Chest / Shoulders / Triceps / Calves",
      protocol: "3 sets · 60-90 sec rest · RPE Moderate",
      exercises: [
        { name: "30° Incline DB Bench Press", setsReps: "3 × 8", thumb: { view: "front", muscles: ["chest", "shoulders"], motion: "vertical" } },
        { name: "30° Incline DB Neutral-Grip Fly", setsReps: "3 × 8", thumb: { view: "front", muscles: ["chest"], motion: "horizontal" } },
        { name: "Seated Back-Supported DB Shoulder Press", setsReps: "3 × 8", thumb: { view: "front", muscles: ["shoulders"], motion: "vertical" } },
        { name: "Standing DB Lateral Raise", setsReps: "3 × 8-10", thumb: { view: "front", muscles: ["shoulders"], motion: "vertical" } },
        { name: "Rope Tricep Pushdown", setsReps: "3 × 8", thumb: { view: "back", muscles: ["triceps"], motion: "vertical" } },
        { name: "Overhead Rope Tricep Extension", setsReps: "3 × 8", thumb: { view: "back", muscles: ["triceps"], motion: "vertical" } },
        { name: "Seated Calf Raise", setsReps: "3 × 25", thumb: { view: "back", muscles: ["calves"], motion: "vertical" } },
      ],
    },
    {
      id: "day2",
      day: "Day 2",
      name: "Pull A",
      muscles: "Back / Biceps / Traps",
      protocol: "3 sets · 60-90 sec rest · RPE Moderate",
      exercises: [
        { name: "Bent Over Neutral-Grip DB Row", setsReps: "3 × 8", thumb: { view: "back", muscles: ["lats", "traps"], motion: "horizontal" } },
        { name: "Seated Mid-Grip Lat Pulldown", setsReps: "3 × 8", thumb: { view: "back", muscles: ["lats"], motion: "vertical" } },
        { name: "Seated Cable Row", setsReps: "3 × 8", thumb: { view: "back", muscles: ["lats", "traps"], motion: "horizontal" } },
        { name: "Bent Over DB Rear Delt Fly", setsReps: "3 × 8", thumb: { view: "back", muscles: ["rearDelts"], motion: "horizontal" } },
        { name: "Alternating DB Bicep Curls", setsReps: "3 × 8", thumb: { view: "front", muscles: ["biceps"], motion: "rotate" } },
        { name: "Alternating DB Hammer Curls", setsReps: "3 × 8", thumb: { view: "front", muscles: ["biceps", "forearms"], motion: "rotate" } },
        { name: "Standing DB Shrug", setsReps: "3 × 8", thumb: { view: "back", muscles: ["traps"], motion: "vertical" } },
      ],
    },
    {
      id: "day3",
      day: "Day 3",
      name: "Legs",
      muscles: "Quads / Hamstrings / Calves",
      protocol: "3 sets · 60-90 sec rest · RPE Moderate",
      exercises: [
        { name: "Narrow Stance Leg Press", setsReps: "3 × 8", thumb: { view: "front", muscles: ["quads"], motion: "vertical" } },
        { name: "Goblet Squat", setsReps: "3 × 8", thumb: { view: "front", muscles: ["quads"], motion: "vertical" } },
        { name: "Leg Extension (Plantar Flexed)", setsReps: "3 × 8", thumb: { view: "front", muscles: ["quads"], motion: "rotate" } },
        { name: "Prone Hamstring Curl (Dorsi Flexed)", setsReps: "3 × 8", thumb: { view: "back", muscles: ["hamstrings"], motion: "rotate" } },
        { name: "Dumbbell Romanian Deadlift", setsReps: "3 × 8", thumb: { view: "back", muscles: ["hamstrings", "glutes"], motion: "vertical" } },
        { name: "Calf Press / Standing Calf Raise", setsReps: "3 × 25-30", thumb: { view: "back", muscles: ["calves"], motion: "vertical" } },
      ],
    },
    {
      id: "day4",
      day: "Day 4",
      name: "Push/Pull B",
      muscles: "Chest / Shoulders / Back / Biceps / Triceps",
      protocol: "3 sets · 60-90 sec rest · RPE Moderate",
      exercises: [
        { name: "30° Incline DB Bench Press", setsReps: "3 × 8", thumb: { view: "front", muscles: ["chest", "shoulders"], motion: "vertical" } },
        { name: "30° Incline DB Fly (Neutral Grip)", setsReps: "3 × 8", thumb: { view: "front", muscles: ["chest"], motion: "horizontal" } },
        { name: "Standing DB Lateral Raise", setsReps: "3 × 8", thumb: { view: "front", muscles: ["shoulders"], motion: "vertical" } },
        { name: "Pin/Plate Loaded Shoulder Press", setsReps: "3 × 15", thumb: { view: "front", muscles: ["shoulders"], motion: "vertical" } },
        { name: "Narrow Neutral-Grip Lat Pulldown", setsReps: "3 × 12", thumb: { view: "back", muscles: ["lats"], motion: "vertical" } },
        { name: "Narrow Neutral-Grip Cable Row", setsReps: "3 × 8", thumb: { view: "back", muscles: ["lats", "traps"], motion: "horizontal" } },
        { name: "Overhead Rope Tricep Extension", setsReps: "3 × 8", thumb: { view: "back", muscles: ["triceps"], motion: "vertical" } },
        { name: "EZ Bar Bicep Curls", setsReps: "3 × 12", thumb: { view: "front", muscles: ["biceps"], motion: "rotate" } },
      ],
    },
  ],
  nutritionDays: [
    {
      id: "training",
      label: "Training Day",
      appliesTo: "Mon · Tue · Thu · Fri",
      kcal: "~2,750 kcal",
      protein: "~190 g protein",
      meals: [
        { name: "Meal 1", items: ["3x whole eggs", "40g mixed nuts (almond / cashew / peanut / pecan / walnut — roasted, unsalted)", "2x multigrain bread slices, toasted", "30g whey isolate with water"], supplements: "Vitamin D3 2000 IU, Multivitamin, Zinc Picolinate (optional), Fish oil 1500-2000mg" },
        { name: "Snack", items: ["40g instant oats with hot water", "25g almond / cashew / peanut butter", "10g honey or maple syrup", "1x medium banana"] },
        { name: "Meal 2 (post-workout)", items: ["150g cooked-weight basmati rice", "280g raw chicken / salmon / tuna / white fish (~210g cooked)", "200g mixed vegetables", "150g fruit (dragon fruit / watermelon / papaya / kiwi / apple)"] },
        { name: "Meal 3", items: ["130g cooked-weight basmati rice / whole wheat pasta / noodles", "280g raw chicken / salmon / tuna / white fish", "150-200g vegetables (optional)", "150g fruit"], supplements: "Fish oil 1500-2000mg, Magnesium Citrate (optional), Creatine 5g (optional)" },
      ],
      notes: "Pre-workout: black coffee · Post-workout cardio: 250 kcal (take your tracker/watch off for this) · Steps: 12,000",
    },
    {
      id: "nontraining",
      label: "Non-Training Day",
      appliesTo: "Wed · Sat",
      kcal: "~2,400 kcal",
      protein: "~185 g protein",
      meals: [
        { name: "Meal 1", items: ["70g mixed nuts (roasted, unsalted)", "1x medium banana"], supplements: "Vitamin D3 2000 IU, Multivitamin, Zinc Picolinate (optional), Fish oil 1500-2000mg" },
        { name: "Meal 2", items: ["120g cooked-weight basmati rice", "230g raw chicken / salmon / tuna / white fish", "150-200g vegetables (optional)", "150g fruit (watermelon / dragon fruit / pears / apple)"] },
        { name: "Snack", items: ["1x medium banana", "25g raisins / pitted dates"] },
        { name: "Meal 3", items: ["100g cooked-weight basmati rice", "230g raw chicken / salmon / tuna / white fish", "150-200g vegetables (optional)", "25g raisins / pitted dates"], supplements: "Fish oil 1500-2000mg, Magnesium Citrate (optional), Creatine 5g (optional)" },
      ],
      notes: "Cardio: none · Steps: 12,000",
    },
    {
      id: "sunday",
      label: "Sunday",
      appliesTo: "Sun (higher-carb adherence day)",
      kcal: "~2,950 kcal",
      protein: "~185 g protein",
      meals: [
        { name: "Meal 1", items: ["45g instant oats with hot water", "30g almond / cashew / peanut butter", "20g honey or maple syrup", "1x medium banana", "50g pitted olives or 25g mixed nuts"], supplements: "Vitamin D3 2000 IU, Multivitamin, Zinc Picolinate (optional), Fish oil 1500-2000mg" },
        { name: "Meal 2", items: ["180g cooked-weight basmati rice", "230g raw chicken / salmon / tuna / white fish", "150-200g vegetables (optional)", "100g Greek yogurt or gelato/ice cream with 15g honey"] },
        { name: "Snack", items: ["250g fruit of choice"] },
        { name: "Meal 3", items: ["180g cooked-weight basmati rice", "230g raw chicken / salmon / tuna / white fish", "150-200g vegetables (optional)", "40g raisins / pitted dates"], supplements: "Fish oil 1500-2000mg, Magnesium Citrate (optional), Creatine 5g (optional)" },
      ],
      notes: "Cardio: none · Steps: 10,000",
    },
  ],

  // Optional overrides: map an exercise name to a specific YouTube video ID
  // (the 11-character ID from a youtube.com/watch?v=<ID> URL).
  // Anything not listed here falls back to a YouTube search link.
  videoOverrides: {
    // "30° Incline DB Bench Press": "YOUR_VIDEO_ID_HERE",
  },
};
