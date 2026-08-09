// Week 1 plan data — edit this file to add real YouTube video IDs
// or to update sets/reps/nutrition as the program progresses.
//
// Each exercise has a `thumb.exerciseId` pointing at an entry in the
// free-exercise-db (public domain, see assets/app.js IMAGE_BASE) —
// real photos of the start and end position, used for the thumbnail
// and the before/after pair shown on expansion. `thumb.badge` is a
// generic muscle-map diagram (see assets/musclemap.js) shown as a
// small corner badge on top of those photos — `view` is "front" or
// "back" (which muscle vocabulary applies) and `muscles` is the list
// of segments to highlight.
// `guideline` is a short form cue shown when the exercise is expanded.

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
        {
          name: "30° Incline DB Bench Press",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Incline_Dumbbell_Press", targets: "Chest, Front Delts", badge: { view: "front", muscles: ["chest", "shoulders"] } },
          guideline: "Set the bench to a 30° incline. Press the dumbbells up and slightly in until your arms are extended over your upper chest, then lower with control until your elbows are just below bench level.",
        },
        {
          name: "30° Incline DB Neutral-Grip Fly",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Incline_Dumbbell_Flyes", targets: "Chest", badge: { view: "front", muscles: ["chest"] } },
          guideline: "Start with arms extended above your chest, palms facing each other. Lower the dumbbells out to the sides in a wide arc with a slight elbow bend, then bring them back together over your chest.",
        },
        {
          name: "Seated Back-Supported DB Shoulder Press",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Dumbbell_Shoulder_Press", targets: "Shoulders, Triceps", badge: { view: "front", muscles: ["shoulders"] } },
          guideline: "Sit with your back supported, dumbbells at shoulder height. Press straight overhead until your arms are extended, then lower back to shoulder height under control.",
        },
        {
          name: "Standing DB Lateral Raise",
          setsReps: "3 × 8-10",
          thumb: { exerciseId: "Side_Lateral_Raise", targets: "Side Delts", badge: { view: "front", muscles: ["shoulders"] } },
          guideline: "Stand tall with a slight bend in your elbows. Raise the dumbbells out to your sides until they reach shoulder height, leading with your elbows, then lower slowly.",
        },
        {
          name: "Rope Tricep Pushdown",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Triceps_Pushdown_-_Rope_Attachment", targets: "Triceps", badge: { view: "back", muscles: ["triceps"] } },
          guideline: "Keep your elbows tucked at your sides. Push the rope down until your arms are fully extended, splitting the rope apart at the bottom, then control it back up.",
        },
        {
          name: "Overhead Rope Tricep Extension",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Triceps_Overhead_Extension_with_Rope", targets: "Triceps", badge: { view: "back", muscles: ["triceps"] } },
          guideline: "With the rope behind your head, extend your arms overhead until straight, keeping your elbows close to your ears, then lower back behind your head.",
        },
        {
          name: "Seated Calf Raise",
          setsReps: "3 × 25",
          thumb: { exerciseId: "Seated_Calf_Raise", targets: "Calves", badge: { view: "back", muscles: ["calves"] } },
          guideline: "With the pad resting on your knees, lower your heels as far as comfortable, then press up onto your toes and squeeze at the top.",
        },
      ],
    },
    {
      id: "day2",
      day: "Day 2",
      name: "Pull A",
      muscles: "Back / Biceps / Traps",
      protocol: "3 sets · 60-90 sec rest · RPE Moderate",
      exercises: [
        {
          name: "Bent Over Neutral-Grip DB Row",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Bent_Over_Two-Dumbbell_Row_With_Palms_In", targets: "Lats, Upper Back", badge: { view: "back", muscles: ["lats", "traps"] } },
          guideline: "Hinge forward at the hips with a flat back. Pull the dumbbells up toward your hips, driving your elbows back, then lower with control.",
        },
        {
          name: "Seated Mid-Grip Lat Pulldown",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Wide-Grip_Lat_Pulldown", targets: "Lats", badge: { view: "back", muscles: ["lats"] } },
          guideline: "Pull the bar down to your upper chest, driving your elbows down and back. Control the weight back up until your arms are fully extended.",
        },
        {
          name: "Seated Cable Row",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Seated_Cable_Rows", targets: "Lats, Mid Back", badge: { view: "back", muscles: ["lats", "traps"] } },
          guideline: "Sit tall with a slight forward lean at the bottom. Pull the handle to your torso, squeezing your shoulder blades together, then extend back with control.",
        },
        {
          name: "Bent Over DB Rear Delt Fly",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench", targets: "Rear Delts", badge: { view: "back", muscles: ["rearDelts"] } },
          guideline: "Hinge forward with a flat back and a soft bend in your knees. Raise the dumbbells out to the sides until level with your shoulders, then lower slowly.",
        },
        {
          name: "Alternating DB Bicep Curls",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Dumbbell_Alternate_Bicep_Curl", targets: "Biceps", badge: { view: "front", muscles: ["biceps"] } },
          guideline: "Keep your elbows pinned to your sides. Curl one dumbbell up toward your shoulder, rotating your palm up, then lower and repeat on the other side.",
        },
        {
          name: "Alternating DB Hammer Curls",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Alternate_Hammer_Curl", targets: "Biceps, Forearms", badge: { view: "front", muscles: ["biceps", "forearms"] } },
          guideline: "Keep your elbows pinned to your sides and palms facing each other throughout. Curl one dumbbell up toward your shoulder, then lower and alternate.",
        },
        {
          name: "Standing DB Shrug",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Dumbbell_Shrug", targets: "Traps", badge: { view: "back", muscles: ["traps"] } },
          guideline: "Hold the dumbbells at your sides. Shrug your shoulders straight up toward your ears, pause briefly, then lower with control — avoid rolling your shoulders.",
        },
      ],
    },
    {
      id: "day3",
      day: "Day 3",
      name: "Legs",
      muscles: "Quads / Hamstrings / Calves",
      protocol: "3 sets · 60-90 sec rest · RPE Moderate",
      exercises: [
        {
          name: "Narrow Stance Leg Press",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Narrow_Stance_Leg_Press", targets: "Quads", badge: { view: "front", muscles: ["quads"] } },
          guideline: "Feet close together on the platform. Lower until your knees reach about 90°, then press through your heels back to the start without locking your knees out.",
        },
        {
          name: "Goblet Squat",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Goblet_Squat", targets: "Quads, Glutes", badge: { view: "front", muscles: ["quads"] } },
          guideline: "Hold a dumbbell vertically at your chest. Squat down until your thighs are at least parallel to the floor, keeping your chest up, then drive back up through your heels.",
        },
        {
          name: "Leg Extension (Plantar Flexed)",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Leg_Extensions", targets: "Quads", badge: { view: "front", muscles: ["quads"] } },
          guideline: "Point your toes (plantar flex) and extend your legs until straight, squeezing your quads at the top, then lower back down under control.",
        },
        {
          name: "Prone Hamstring Curl (Dorsi Flexed)",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Lying_Leg_Curls", targets: "Hamstrings", badge: { view: "back", muscles: ["hamstrings"] } },
          guideline: "Lying face down, flex your feet (toes toward shins) and curl your heels toward your glutes, then lower back down slowly.",
        },
        {
          name: "Dumbbell Romanian Deadlift",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Romanian_Deadlift", targets: "Hamstrings, Glutes", badge: { view: "back", muscles: ["hamstrings", "glutes"] } },
          guideline: "With a slight bend in your knees, hinge at the hips and lower the dumbbells along your legs, keeping your back flat. Drive your hips forward to return to standing.",
        },
        {
          name: "Calf Press / Standing Calf Raise",
          setsReps: "3 × 25-30",
          thumb: { exerciseId: "Standing_Calf_Raises", targets: "Calves", badge: { view: "back", muscles: ["calves"] } },
          guideline: "From a full stretch at the bottom, press up onto your toes as high as possible, squeeze, then lower under control.",
        },
      ],
    },
    {
      id: "day4",
      day: "Day 4",
      name: "Push/Pull B",
      muscles: "Chest / Shoulders / Back / Biceps / Triceps",
      protocol: "3 sets · 60-90 sec rest · RPE Moderate",
      exercises: [
        {
          name: "30° Incline DB Bench Press",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Incline_Dumbbell_Press", targets: "Chest, Front Delts", badge: { view: "front", muscles: ["chest", "shoulders"] } },
          guideline: "Set the bench to a 30° incline. Press the dumbbells up and slightly in until your arms are extended over your upper chest, then lower with control until your elbows are just below bench level.",
        },
        {
          name: "30° Incline DB Fly (Neutral Grip)",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Incline_Dumbbell_Flyes", targets: "Chest", badge: { view: "front", muscles: ["chest"] } },
          guideline: "Start with arms extended above your chest, palms facing each other. Lower the dumbbells out to the sides in a wide arc with a slight elbow bend, then bring them back together over your chest.",
        },
        {
          name: "Standing DB Lateral Raise",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Side_Lateral_Raise", targets: "Side Delts", badge: { view: "front", muscles: ["shoulders"] } },
          guideline: "Stand tall with a slight bend in your elbows. Raise the dumbbells out to your sides until they reach shoulder height, leading with your elbows, then lower slowly.",
        },
        {
          name: "Pin/Plate Loaded Shoulder Press",
          setsReps: "3 × 15",
          thumb: { exerciseId: "Leverage_Shoulder_Press", targets: "Shoulders", badge: { view: "front", muscles: ["shoulders"] } },
          guideline: "Sit tall against the pad. Press the handles straight overhead until your arms are extended, then lower back to shoulder height.",
        },
        {
          name: "Narrow Neutral-Grip Lat Pulldown",
          setsReps: "3 × 12",
          thumb: { exerciseId: "Close-Grip_Front_Lat_Pulldown", targets: "Lats", badge: { view: "back", muscles: ["lats"] } },
          guideline: "Using the narrow neutral-grip handle, pull down to your upper chest, driving your elbows down close to your body, then control it back up.",
        },
        {
          name: "Narrow Neutral-Grip Cable Row",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Seated_Cable_Rows", targets: "Lats, Mid Back", badge: { view: "back", muscles: ["lats", "traps"] } },
          guideline: "Pull the narrow handle to your torso, keeping your elbows close to your sides, then extend back out with control.",
        },
        {
          name: "Overhead Rope Tricep Extension",
          setsReps: "3 × 8",
          thumb: { exerciseId: "Triceps_Overhead_Extension_with_Rope", targets: "Triceps", badge: { view: "back", muscles: ["triceps"] } },
          guideline: "With the rope behind your head, extend your arms overhead until straight, keeping your elbows close to your ears, then lower back behind your head.",
        },
        {
          name: "EZ Bar Bicep Curls",
          setsReps: "3 × 12",
          thumb: { exerciseId: "EZ-Bar_Curl", targets: "Biceps", badge: { view: "front", muscles: ["biceps"] } },
          guideline: "Using the EZ bar's angled grip, curl the bar up toward your shoulders, keeping your elbows fixed at your sides, then lower with control.",
        },
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
