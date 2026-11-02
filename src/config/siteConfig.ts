// src/config/siteConfig.ts

type CampusSpace = {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  imagePlaceholder: string;
  imageFallback: string;
  altCandidates?: string[];
  privacyBlur: boolean;
  blurZone: "lower-crowd" | "center-band";
};

export const siteConfig = {
  // ==========================================
  // 1. BRAND & CONTACT DETAILS
  // ==========================================
  brand: {
    name: "SHRADDHA",
    shortName: "Shraddha",
    subtitle: "De-addiction center",
    fullName: "Shraddha Rehabilitation Centre",
    tagline: "Faith. Dignity. Clinical Recovery.",
    city: "Uppal, Hyderabad",
    state: "Telangana",
    url: "https://www.shraddharehab.in", // 👈 Add this line (Update with your live domain)
  },

  contact: {
    // Primary Phone & WhatsApp
    phoneDisplay: "+91 73969 89763",
    phoneRaw: "+917396989763",
    // Secondary Mobile
    secondaryPhoneDisplay: "+91 91824 89763",
    secondaryPhoneRaw: "+919182489763",
    // WhatsApp (Country code + 10 digits, no '+' or spaces)
    whatsappNumber: "917396989763",
    whatsappDefaultMsg:
      "Hello Shraddha Team, I am reaching out from your website and would like a confidential consultation regarding recovery programs.",
    email: "shraddharehabcentre@gmail.com", // 👈 Replace with your personal Gmail if you want mailto links to go there too
    address:
      "H.No. 1-89, Mallikarjuna Nagar, Parvathapur, Uppal, Hyderabad - 500098, Telangana",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d754.4546809996067!2d78.6083682853973!3d17.39075975143926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb997e700a42e3%3A0xb256d38b86813179!2sSHRADDHA%20DE-ADDICTION%20CENTER(%20Rehabilitation)!5e0!3m2!1sen!2sin!4v1793540631213!5m2!1sen!2sin",
    // 👇 Paste your free Web3Forms key here (or set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local)
    web3FormsAccessKey:
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
  },

  // ==========================================
  // 2. HERO SECTION (FIXED IMAGE PATH)
  // ==========================================
  hero: {
    highlightedWord: "Recovery",
    headlineRest: "Begins with Faith and Compassionate Care",
    // ✅ Must start with "/" and live inside public/images/hero-statue.jpg
    portraitImageUrl: "/images/hero-statue.jpg",
    portraitImageFallback:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1000&q=85",
    portraitImageAlt:
      "Peaceful meditation statue symbolizing calm recovery at Shraddha",

    quoteBeforeBrand: "“At ",
    quoteBrandHighlight: "Shraddha",
    quoteAfterBrand:
      " Rehabilitation Centre, we provide a safe, dignified, and medically supervised space to overcome addiction and rebuild lives—one day at a time.”",
    primaryCta: "Speak to a Counsellor",
    secondaryCta: "Chat on Whatsapp",
    trustChecks: [
      "100% Confidential Inquiry",
      "24/7 Medical Supervision",
      "Family Support Included",
    ],
  },

  // ==========================================
  // 3. FOUNDER PROFILE & APPLE POPUP JOURNEY
  // ==========================================
  founder: {
    name: "D. Sreekanth Chary",
    role: "Founder, Shraddha Rehabilitation Centre",
    badge: "Founder's Desk • 13 Years of Recovery & Service",
    // ✅ Place founder photo at: public/images/founder-sreekanth.jpg
    imageUrl: "images/founder-sreekanth.jpeg",
    imageFallback:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    shortBio:
      "Having overcome chronic alcoholism through dedicated treatment in 2013, D. Sreekanth Chary has walked the path of recovery for 13 years. Guided by the principles of Alcoholics Anonymous (A.A.) and a deep spiritual awakening, he turned his personal triumph into a lifelong mission. Over the past 13 years, he has helped hundreds of individuals break free from addiction, offering them not just clinical support, but the lived empathy, spiritual tools, and hope needed to rebuild their lives from the ground up.",
    modalTitle:
      "The Journey of D. Sreekanth Chary: From Recovery to Purpose",
    modalIntro:
      "Every transformative institution begins with a deeply personal truth. For Shraddha Rehabilitation Centre, that foundation is the lived experience of its founder, D. Sreekanth Chary—a man who walked through the darkest valleys of addiction to emerge as a guiding light for hundreds of individuals seeking a second chance at life.",
    sections: [
      {
        heading: "The Turning Point (2013)",
        body: "Before dedicating his life to healing others, D. Sreekanth Chary faced his own severe battle with chronic alcoholism. Understanding the physical, emotional, and spiritual toll of addiction firsthand, he reached a decisive turning point in 2013. By committing to structured rehabilitation and treatment, he took the first courageous step toward reclaiming his life. What began as a personal fight for survival soon evolved into a lifelong commitment to sobriety and service.",
      },
      {
        heading: "The Foundation of Recovery: A.A. and Spiritual Awakening",
        body: "Central to Sreekanth Chary’s transformation was his deep engagement with the Alcoholics Anonymous (A.A.) programme and a profound spiritual awakening. He realised early in his recovery that overcoming addiction requires more than mere physical abstinence; it demands an internal shift, self-accountability, and a supportive fellowship. The 12-Step philosophy and spiritual grounding gave him not only the tools to stay sober day by day, but also a renewed sense of purpose: to pass on the grace he had received to those still suffering in silence.",
      },
      {
        heading: "Building Shraddha Rehabilitation Centre",
        body: "Driven by the conviction that no one is beyond recovery, he established Shraddha Rehabilitation Centre. Having maintained uninterrupted sobriety for 13 years, Sreekanth Chary brings an unmatched authenticity to his role. When he speaks to patients and their families, he does not speak from textbook theory alone—he speaks as someone who has sat in their exact seat, felt their despair, and found a way out.",
      },
    ],
    milestones: [
      {
        title: "13 Years of Sobriety & Experience",
        desc: "Since 2013, his personal recovery journey has run parallel to his professional mission, providing over a decade of hands-on counselling and mentorship.",
      },
      {
        title: "Hundreds of Lives Transformed",
        desc: "Under his empathetic leadership, Shraddha Rehabilitation Centre has successfully guided hundreds of patients out of the grip of substance abuse and back into their families and communities.",
      },
      {
        title: "Holistic, 12-Step Driven Care",
        desc: "His treatment approach blends structured medical and psychological care with the time-tested principles of the A.A. programme, mindfulness, and spiritual growth.",
      },
      {
        title: "Empathy-Led Leadership",
        desc: "By removing the stigma and shame surrounding addiction, he has cultivated a safe, disciplined, and compassionate environment where true behavioural change can take root.",
      },
    ],
  },

  // ==========================================
  // 4. BELOW-HERO EMPATHY SECTION
  // ==========================================
  empathySection: {
    heading: "You Don't Have to Fight This Alone",
    subtext:
      "Addiction is not a moral failing—it is a treatable medical, psychological, and spiritual condition that impacts the entire family. We replace stigma and fear with clinical safety, structure, and compassionate care.",
    pillars: [
      {
        title: "24/7 Medical Detox & Safety",
        desc: "Round-the-clock doctors and nursing staff manage physical withdrawal safely, comfortably, and with complete dignity.",
      },
      {
        title: "12-Step & Root-Cause Therapy",
        desc: "1-on-1 counselling, A.A. 12-Step facilitation, and group reflection to heal underlying emotional triggers.",
      },
      {
        title: "Whole-Family Restoration",
        desc: "Dedicated family counselling and post-rehab follow-ups so your loved one returns to a healthy, supportive home.",
      },
    ],
  },

  // ==========================================
  // 5. INTERACTIVE SELF-ASSESSMENT QUESTIONS
  // ==========================================
  selfAssessment: {
    badge: "1-Minute Confidential Check",
    title: "Not Sure If Professional Rehab Is Needed?",
    subtitle:
      "Select any signs you have noticed in yourself or your loved one over the past few months. Your answers are private and never stored.",
    questions: [
      {
        id: "tolerance",
        question:
          "Needing higher amounts of alcohol or substances to feel the same effect, or drinking/using daily.",
      },
      {
        id: "withdrawal",
        question:
          "Experiencing restlessness, shaking, sweating, insomnia, or severe irritability when trying to stop.",
      },
      {
        id: "failed_attempts",
        question:
          "Multiple sincere promises or attempts to cut down or quit that lasted only a few days or weeks.",
      },
      {
        id: "isolation",
        question:
          "Withdrawing from family conversations, hiding usage, mood swings, or neglecting work and health.",
      },
      {
        id: "safety_concern",
        question:
          "Family members feeling constant anxiety, walking on eggshells, or worrying about medical/safety risks.",
      },
    ],
  },

  // ==========================================
  // 6. CONDITIONS WE TREAT
  // ==========================================
  conditionsWeTreat: [
    "Alcohol Dependence",
    "Substance & Drug Addiction",
    "Prescription Medication Abuse",
    "Cannabis & Synthetic Dependencies",
    "Dual Diagnosis (Addiction + Anxiety/Depression)",
    "Behavioural Addictions",
    "Chronic Relapse Prevention",
    "Acute Withdrawal Stabilization",
  ],

  // ==========================================
  // 7. NUMBERED PROGRAMS (01-04 STRUCTURE)
  // ==========================================
  programs: [
    {
      id: "01",
      slug: "medical-detox-stabilization",
      title: "Short-Term Stabilization & Medical Detox",
      duration: "7 – 21 Days",
      tagline: "Safe, supervised physical withdrawal management.",
      description:
        "Designed for immediate physical stabilization and crisis recovery. Our medical team monitors vital signs around the clock, ensuring safe withdrawal from alcohol or substances with minimal discomfort.",
      highlights: [
        "24/7 physician and nursing supervision",
        "Nutritional and hydration restoration",
        "Sleep cycle and acute symptom stabilization",
        "Complete medical and psychiatric baseline assessment",
      ],
      whatsappPrefill:
        "Hello Shraddha Team, I want to inquire about the 01 Short-Term Stabilization & Medical Detox program.",
    },
    {
      id: "02",
      slug: "residential-deaddiction",
      title: "Comprehensive Residential Rehabilitation",
      duration: "30 – 90 Days",
      tagline: "Structured living & 12-Step recovery to break dependency.",
      description:
        "Our flagship residential recovery program addresses the root emotional, behavioural, and spiritual triggers of addiction through daily counselling, A.A. 12-Step principles, and structured living routines.",
      highlights: [
        "Cognitive Behavioural Therapy (CBT) & 12-Step facilitation",
        "Daily peer group therapy and lived-experience mentorship",
        "Mindfulness, yoga, prayer, and physical wellness routines",
        "Trigger identification and emotional regulation training",
      ],
      whatsappPrefill:
        "Hello Shraddha Team, I want to inquire about the 02 Comprehensive Residential Rehabilitation program.",
    },
    {
      id: "03",
      slug: "dual-diagnosis-care",
      title: "Dual Diagnosis & Emotional Recovery",
      duration: "Flexible (45 – 90 Days)",
      tagline: "Integrated care for addiction paired with mental health challenges.",
      description:
        "Addiction frequently co-occurs with underlying depression, anxiety, or trauma. Treating one without the other leads to relapse. We provide unified psychiatric and psychological intervention.",
      highlights: [
        "Simultaneous psychiatric and de-addiction protocols",
        "Trauma-informed individual counselling",
        "Medication management and mood stabilization",
        "Stress resilience and cognitive restructuring",
      ],
      whatsappPrefill:
        "Hello Shraddha Team, I want to inquire about the 03 Dual Diagnosis program.",
    },
    {
      id: "04",
      slug: "post-rehab-family-reintegration",
      title: "Post-Rehab Aftercare & Family Reintegration",
      duration: "Ongoing Support",
      tagline: "Protecting sobriety after returning home and to work.",
      description:
        "Recovery continues after discharge. We work closely with spouses, parents, and residents to rebuild broken trust, establish healthy home boundaries, and prevent relapse in the real world.",
      highlights: [
        "Dedicated family counselling & boundary workshops",
        "Scheduled outpatient follow-ups and A.A. fellowship connection",
        "Crisis helpline access for early warning signs",
        "Vocational & daily routine reintegration planning",
      ],
      whatsappPrefill:
        "Hello Shraddha Team, I want to inquire about the 04 Post-Rehab Aftercare & Family Support program.",
    },
  ],

  // ==========================================
  // 8. CUSTOM CAMPUS SPACES (MATCHED TO YOUR 5 REAL PHOTOS)
  // ==========================================
  campusSpaces: [
    {
      id: "consultation",
      label: "01. Intake & Family Counselling",
      title: "Personalised Intake & Family Guidance Desk",
      description:
        "Every recovery journey at Shraddha begins with an unhurried, face-to-face conversation at our Uppal centre. Founder D. Sreekanth Chary and our intake team sit down directly with families and residents to understand their history, answer every question transparently, and chart out a safe recovery plan.",
      features: [
        "Direct Founder & Counsellor Guidance",
        "100% Confidential Family Intake",
        "Clear Admission & Care Roadmap",
      ],
      imagePlaceholder: "/images/facility-1.jpg",
      imageFallback:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      privacyBlur: false, // Image 1 kept clear as requested
      blurZone: "lower-crowd" as const,
    },
    {
      id: "fellowship",
      label: "02. 12-Step Fellowship Hall",
      title: "Guided by 'One Day at a Time' & 'Keep It Simple'",
      description:
        "Our main fellowship hall is the heart of Shraddha. Surrounded by daily 24-hour A.A. principles and Telugu/English recovery wisdom on the walls, residents gather in unity, brotherhood, and mutual accountability—reminding one another that no one walks the road to sobriety alone.",
      features: [
        "24-Hour 'One Day at a Time' Philosophy",
        "Strong Peer Brotherhood & Unity",
        "Bilingual (Telugu & English) 12-Step Charts",
      ],
      imagePlaceholder: "/images/facility-2.jpg",
      imageFallback:
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      privacyBlur: true, // Blurs faces in middle band while keeping top wall charts readable
      blurZone: "center-band" as const,
    },
    {
      id: "dining",
      label: "03. Homely Dining & Nutrition",
      title: "Wholesome Community Meals & Scheduled Medication",
      description:
        "Physical recovery requires timely, nutritious food and strict medical adherence. Residents sit together at long community tables for freshly prepared, home-style meals alongside supervised morning and evening medication slots to rebuild strength and immunity.",
      features: [
        "Fresh In-House Home-Style Meals",
        "Supervised Breakfast & Dinner Medicine",
        "Hygienic Community Dining Tables",
      ],
      imagePlaceholder: "/images/facility-3.jpg",
      imageFallback:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      privacyBlur: true, // Blurs resident/counsellor faces
      blurZone: "lower-crowd" as const,
    },
    {
      id: "meditation",
      label: "04. Morning Yoga & Meditation",
      title: "Spiritual Awakening, Pranayama & Inner Stillness",
      description:
        "Starting at 6:00 AM every morning with Yoga & Exercise followed by dedicated 8:00 AM Meditation, residents practice breathwork and stillness. Calming the restless mind is essential for overcoming cravings, managing triggers, and building emotional balance.",
      features: [
        "6:00 AM Daily Yoga & Exercise",
        "8:00 AM Guided Spiritual Meditation",
        "Craving & Anxiety Regulation",
      ],
      imagePlaceholder: "/images/facility-4.jpg",
      imageFallback:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80",
      privacyBlur: true, // Blurs faces during meditation
      blurZone: "lower-crowd" as const,
    },
    {
      id: "sessions",
      label: "05. Sharing Class & Big Book Study",
      title: "Thoughts & Feelings Sessions, Sharing Class & Big Book Reading",
      description:
        "Equipped with structured seating for daily morning classes, afternoon 'Thoughts & Feelings' sessions, evening In-House Sharing meetings, and A.A. Big Book reading. Residents learn honest self-reflection and practical relapse-prevention tools.",
      features: [
        "Morning & Afternoon Counselling Sessions",
        "3:00 PM Thoughts & Feelings Workshop",
        "Evening Sharing Class & Big Book Reading",
      ],
      imagePlaceholder: "/images/facility-5.jpg",
      imageFallback:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      privacyBlur: true, // Blurs seated faces
      blurZone: "lower-crowd" as const,
    },
  ] as CampusSpace[],

  // ==========================================
  // 9. EXACT DAILY SCHEDULE AT SHRADDHA (5:30 AM - 9:00 PM)
  // ==========================================
  dailySchedule: [
    { time: "5:30 AM", activity: "Wake Up", category: "Routine" },
    { time: "6:00 AM – 7:00 AM", activity: "Yoga & Exercise", category: "Wellness" },
    { time: "7:00 AM – 8:00 AM", activity: "Bathing", category: "Routine" },
    { time: "8:00 AM – 8:30 AM", activity: "Meditation", category: "Mindfulness" },
    { time: "8:30 AM – 9:30 AM", activity: "Breakfast & Medicine", category: "Medical & Nutrition" },
    { time: "9:30 AM – 10:30 AM", activity: "First Session", category: "Therapy" },
    { time: "10:30 AM – 11:00 AM", activity: "Tea Break", category: "Refreshment" },
    { time: "11:00 AM – 12:00 PM", activity: "Second Session", category: "Therapy" },
    { time: "12:00 PM – 1:00 PM", activity: "Lunch Break", category: "Nutrition" },
    { time: "1:00 PM – 3:00 PM", activity: "Rest", category: "Recovery Rest" },
    { time: "3:00 PM – 4:00 PM", activity: "Thoughts & Feelings Session", category: "Counselling" },
    { time: "4:00 PM – 4:30 PM", activity: "Tea & Snacks", category: "Refreshment" },
    { time: "4:30 PM – 5:30 PM", activity: "Watching TV & Indoor Games", category: "Recreation" },
    { time: "5:30 PM – 6:00 PM", activity: "Freshup", category: "Routine" },
    { time: "6:00 PM – 7:00 PM", activity: "Inhouse Meeting / Sharing Class", category: "12-Step Fellowship" },
    { time: "7:00 PM – 7:30 PM", activity: "Big Book Reading", category: "A.A. Study" },
    { time: "7:30 PM – 8:30 PM", activity: "Dinner & Medicine", category: "Medical & Nutrition" },
    { time: "8:30 PM – 9:00 PM", activity: "Grace Period", category: "Reflection" },
    { time: "9:00 PM", activity: "Sleep", category: "Rest" },
  ],
  // ==========================================
  // 10. FAQS
  // ==========================================
  faqs: [
    {
      q: "Is admission at Shraddha kept 100% confidential?",
      a: "Yes. Every phone call, WhatsApp chat, and admission record is protected under strict confidentiality. We never disclose resident details to employers, relatives, or external parties without explicit family authorization.",
    },
    {
      q: "What if the patient is unwilling to come for treatment?",
      a: "Denial is a common symptom of addiction. Our team guides families on how to conduct a calm, structured intervention, and we also offer safe, supervised assisted pickup services across Hyderabad and Telangana.",
    },
    {
      q: "How long does a resident need to stay?",
      a: "Physical detoxification takes 7 to 14 days, while deep psychological and 12-Step rehabilitation typically spans 30, 60, or 90 days depending on the history of usage and progress.",
    },
    {
      q: "Are family members involved during the recovery process?",
      a: "Yes. After the initial stabilization phase, we conduct regular family updates, scheduled visits at our Uppal centre, and dedicated family counselling sessions so the entire household heals together.",
    },
  ],
};