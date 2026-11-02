// src/config/siteConfig.ts

export interface ConditionDetail {
  id: string;
  title: string;
  teluguTitle: string;
  category: string;
  shortDesc: string;
  overview: string;
  warningSigns: string[];
  howWeTreat: {
    phase: string;
    title: string;
    detail: string;
  }[];
  familyNote: string;
  whatsappPrefill: string;
}

export interface ProgramDetail {
  id: string;
  slug: string;
  title: string;
  duration: string;
  tagline: string;
  description: string;
  highlights: string[];
  whoIsItFor: string;
  phases: {
    week: string;
    focus: string;
    details: string;
  }[];
  includedTherapies: string[];
  whatsappPrefill: string;
}

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
    url: "https://www.shraddharehab.in",
  },

  contact: {
    phoneDisplay: "+91 73969 89763",
    phoneRaw: "+917396989763",
    secondaryPhoneDisplay: "+91 91824 89763",
    secondaryPhoneRaw: "+919182489763",
    whatsappNumber: "917396989763",
    whatsappDefaultMsg:
      "Hello Shraddha Team, I am reaching out from your website and would like a confidential consultation regarding recovery programs.",
    email: "care@shraddharehab.in",
    address:
      "H.No. 1-89, Mallikarjuna Nagar, Parvathapur, Uppal, Hyderabad - 500098, Telangana",
    googleMapsEmbedUrl:
      "https://www.google.com/maps?q=Parvathapur,+Uppal,+Hyderabad,+Telangana+500098&output=embed",
    web3FormsAccessKey:
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY_HERE",
  },

  // ==========================================
  // 2. HIGH-CONVERSION TRIGGERS (PART 2)
  // ==========================================
  conversionTriggers: {
    teluguTrustLine:
      "మా వద్ద తెలుగు భాషలో కౌన్సెలింగ్ అందుబాటులో ఉంది • Counselling available in Telugu",
    responseGuarantee:
      "Immediate Response Guarantee: Direct confidential guidance from Founder D. Sreekanth Chary & Senior Intake Team.",
    pickupBanner: {
      badge: "24/7 Emergency Family Support across Hyderabad & Telangana",
      title: "Is Your Loved One Refusing to Come for Treatment?",
      teluguSubtitle:
        "పేషెంట్ రిహాబ్‌కు రావడానికి నిరాకరిస్తున్నారా? మా సురక్షితమైన హోమ్ పికప్ సేవ అందుబాటులో ఉంది.",
      description:
        "Denial is the most common symptom of addiction. Waiting for a loved one in severe addiction to 'agree' often leads to medical emergencies or financial ruin. Our trained, compassionate intervention team provides safe, non-violent, medically supervised home pickup across Hyderabad and all districts of Telangana.",
      points: [
        "100% Dignified, Non-Violent & Respectful Approach",
        "Unmarked Private Vehicle to Protect Family Privacy in Your Colony",
        "Guided by 13+ Years of Lived Intervention Experience",
      ],
      ctaCallText: "Request Emergency Pickup Guidance",
      ctaWhatsappPrefill:
        "Hello Shraddha Team, my family member is unwilling to come for treatment. Please guide us on your safe assisted home pickup service.",
    },
  },

  // ==========================================
  // 3. HERO SECTION
  // ==========================================
  hero: {
    highlightedWord: "Recovery",
    headlineRest: "Begins with Faith and Compassionate Care",
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
      "24/7 Safe Assisted Home Pickup",
    ],
  },

  // ==========================================
  // 4. FOUNDER PROFILE
  // ==========================================
  founder: {
    name: "D. Sreekanth Chary",
    role: "Founder, Shraddha Rehabilitation Centre",
    badge: "Founder's Desk • 13 Years of Recovery & Service",
    imageUrl: "/images/founder-sreekanth.jpg",
    imageFallback:
      "/images/founder-sreekanth.jpg",
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
  // 5. BELOW-HERO EMPATHY SECTION
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
  // 6. WHAT WE TREAT & HOW WE TREAT (DETAILED POPUP DATA)
  // ==========================================
  addictionsWeTreat: [
    {
      id: "alcohol",
      title: "Alcohol Addiction Treatment",
      teluguTitle: "మద్యపాన వ్యసనం (Alcohol De-Addiction)",
      category: "Substance Dependency",
      shortDesc:
        "Safe medical withdrawal management and 12-Step A.A. recovery for chronic drinking, morning tremors, and repeated relapse.",
      overview:
        "Chronic alcohol dependency alters brain chemistry and damages liver and nervous system function. Stopping alcohol suddenly at home without medical supervision can cause severe withdrawal tremors, hallucinations, or seizures. At Shraddha, we provide a medically safe detox followed by deep A.A. 12-Step behavioural transformation.",
      warningSigns: [
        "Drinking early in the morning ('eye-opener') to stop hand tremors or anxiety",
        "Hiding bottles, lying about consumption, or becoming aggressive when questioned",
        "Blackouts, memory loss, neglected work duties, and deteriorating liver/stomach health",
        "Repeated promises to stop that fail within a few days",
      ],
      howWeTreat: [
        {
          phase: "Step 01 • Days 1–10",
          title: "Supervised Medical Detoxification",
          detail:
            "24/7 monitoring of blood pressure, hydration, vitamin B1/thiamine replenishment, and safe anti-craving medication so withdrawal is calm and pain-free.",
        },
        {
          phase: "Step 02 • Weeks 2–8",
          title: "A.A. 12-Step Fellowship & Trigger Therapy",
          detail:
            "Daily Big Book reading, Thoughts & Feelings sessions, and 1-on-1 counselling with D. Sreekanth Chary to dismantle excuse-making and peer-pressure triggers.",
        },
        {
          phase: "Step 03 • Ongoing",
          title: "Family Healing & Relapse Prevention",
          detail:
            "Counselling spouses and parents on healthy home boundaries, plus lifelong connection to A.A. meetings after discharge.",
        },
      ],
      familyNote:
        "Never force a heavy drinker to quit 'cold turkey' locked in a bedroom—medical supervision during the first 7 days is critical for safety.",
      whatsappPrefill:
        "Hello Shraddha Team, I need confidential help regarding Alcohol Addiction treatment for my family member.",
    },
    {
      id: "drugs",
      title: "Drug & Substance Addiction",
      teluguTitle: "మత్తుమందుల వ్యసనం (Narcotics & Opioids)",
      category: "Chemical Dependency",
      shortDesc:
        "Comprehensive de-addiction for opioids, brown sugar, synthetic powders, painkillers, and chemical dependencies.",
      overview:
        "Chemical and narcotic addictions create intense physical cravings and hijacked dopamine pathways. Our structured residential environment removes all access to triggers and dealers while rebuilding the resident's physical health, sleep cycle, and moral accountability.",
      warningSigns: [
        "Sudden weight loss, bloodshot eyes, slurred speech, or extreme sleepiness/hyperactivity",
        "Unexplained disappearance of money, valuables, or frequent borrowing",
        "Severe body aches, sweating, agitation, and insomnia when the substance is unavailable",
        "Complete isolation from family members and change in friend circles",
      ],
      howWeTreat: [
        {
          phase: "Step 01 • Stabilization",
          title: "Medical Withdrawal & Sleep Restoration",
          detail:
            "Symptomatic relief for body pain, nausea, and severe restlessness alongside nutritious in-house meals to rebuild immunity.",
        },
        {
          phase: "Step 02 • Rehabilitation",
          title: "Cognitive Behavioural Restructuring (CBT)",
          detail:
            "Intensive daily therapy to break the psychological obsession with substances and replace destructive habits with a 5:30 AM–9:00 PM disciplined routine.",
        },
        {
          phase: "Step 03 • Reintegration",
          title: "Aftercare & Craving Management",
          detail:
            "Structured relapse-warning blueprints and regular follow-ups with family members after returning home.",
        },
      ],
      familyNote:
        "Early intervention saves lives. If you notice missing money or sudden behavioural changes, speak to our counsellor immediately.",
      whatsappPrefill:
        "Hello Shraddha Team, I need confidential help regarding Drug/Substance Addiction treatment.",
    },
    {
      id: "weed",
      title: "Weed (Ganja / Cannabis) Addiction",
      teluguTitle: "గంజాయి వ్యసనం (Cannabis & Bhang)",
      category: "Psychoactive Dependency",
      shortDesc:
        "Specialized treatment for cannabis-induced paranoia, lack of motivation, psychosis, and academic/career breakdown.",
      overview:
        "Many young adults falsely believe weed (ganja) is 'harmless.' However, modern high-potency cannabis frequently triggers severe paranoia, hallucinations (cannabis-induced psychosis), extreme laziness (amotivational syndrome), anger outbursts, and memory impairment.",
      warningSigns: [
        "Suspiciousness, paranoia, talking to oneself, or sudden anger outbursts at parents",
        "Complete loss of interest in studies, job, personal hygiene, or future goals",
        "Reversed sleep schedule (staying awake all night, sleeping all afternoon)",
        "Smell of smoke on clothes, red eyes, rolling papers, or excessive junk-food cravings",
      ],
      howWeTreat: [
        {
          phase: "Step 01 • Brain Detox",
          title: "Neuro-Chemical & Psychiatric Stabilization",
          detail:
            "Clearing THC from the system while managing irritability, sleep reversal, and any underlying paranoia or anxiety.",
        },
        {
          phase: "Step 02 • Discipline",
          title: "Rebuilding Focus, Routine & Motivation",
          detail:
            "Morning yoga, meditation, physical exercise, and structured group classes to restore natural dopamine, concentration, and self-respect.",
        },
        {
          phase: "Step 03 • Youth Mentorship",
          title: "Peer Group & Career/Academic Re-Alignment",
          detail:
            "Helping young adults cut off toxic peer circles and reconnect with their parents and career goals.",
        },
      ],
      familyNote:
        "If a young adult is showing paranoia, suspiciousness, or sudden hostility from weed usage, residential stabilization prevents long-term psychiatric harm.",
      whatsappPrefill:
        "Hello Shraddha Team, I need confidential help regarding Weed / Ganja Addiction treatment.",
    },
    {
      id: "betting",
      title: "Betting & Gambling Addiction Treatment",
      teluguTitle: "బెట్టింగ్ & జూదం వ్యసనం (Online Betting, IPL, Casino Apps)",
      category: "Behavioural Addiction",
      shortDesc:
        "Breaking the destructive cycle of online cricket betting, rummy/casino apps, stock/crypto gambling, and crushing debt traps.",
      overview:
        "Online betting apps, cricket/IPL wagering, and online rummy/casino games trigger the exact same brain reward circuits as hard drugs. Addicts get trapped in 'chasing losses'—taking high-interest loan apps, pawning family gold, lying repeatedly, and falling into severe depression or suicidal despair.",
      warningSigns: [
        "Secretive loans from multiple instant-loan apps, credit cards, or friends",
        "Obsessively checking live match scores or phone screens late into the night",
        "Selling or pledging household gold/vehicles and promising 'one last win' will clear debts",
        "Extreme panic, guilt, mood swings, or hopelessness when creditors call",
      ],
      howWeTreat: [
        {
          phase: "Step 01 • Digital & Financial Circuit Breaker",
          title: "Immediate Separation from Betting Triggers",
          detail:
            "Stepping into a calm, phone-free residential sanctuary breaks the 24/7 dopamine loop of chasing losses and protects the individual during acute debt panic.",
        },
        {
          phase: "Step 02 • Psychological Therapy",
          title: "Impulse Control & Cognitive Restructuring",
          detail:
            "Uncovering the 'illusion of control' and dopamine addiction behind gambling through 1-on-1 CBT and honest 12-Step moral inventory.",
        },
        {
          phase: "Step 03 • Family & Financial Boundaries",
          title: "Financial Transparency & Relapse Safeguards",
          detail:
            "Guiding families on how to stop enabling bailouts, set up transparent bank/UPI controls, and rebuild trust step by step.",
        },
      ],
      familyNote:
        "Paying off a gambler's debt without treating the psychological addiction almost always results in them taking fresh loans within weeks. Treat the root behaviour first.",
      whatsappPrefill:
        "Hello Shraddha Team, I need confidential help regarding Online Betting & Gambling Addiction treatment.",
    },
    {
      id: "mobile",
      title: "Mobile, Gaming & Digital Addiction",
      teluguTitle: "మొబైల్ & గేమింగ్ వ్యసనం (Screen & Gaming Dependency)",
      category: "Behavioural & Youth Care",
      shortDesc:
        "Structured digital detox and behavioural counselling for severe gaming addiction, compulsive screen use, and social withdrawal.",
      overview:
        "When mobile usage, online multiplayer gaming, or compulsive late-night scrolling crosses into addiction, individuals become violently irritable when the phone is taken away, abandon real-world relationships, and suffer severe anxiety and sleep disorders.",
      warningSigns: [
        "12–18 hours of daily screen/gaming time with refusal to attend college or work",
        "Explosive rage, verbal abuse, or self-harm threats when internet/phone is restricted",
        "Skipping meals, severe eye strain, chronic insomnia, and zero real-world social interaction",
      ],
      howWeTreat: [
        {
          phase: "Step 01 • Dopamine Reset",
          title: "Supervised Digital Detoxification",
          detail:
            "Gradual emotional stabilization in a real-world community environment with indoor sports, yoga, and face-to-face human fellowship.",
        },
        {
          phase: "Step 02 • Emotional Regulation",
          title: "Anger Management & Real-Life Coping Skills",
          detail:
            "Teaching healthy ways to process boredom, academic/work stress, and social anxiety without escaping into a screen.",
        },
        {
          phase: "Step 03 • Balanced Re-Entry",
          title: "Structured Screen-Time & Family Contract",
          detail:
            "Establishing practical post-discharge daily schedules and accountability with parents.",
        },
      ],
      familyNote:
        "Our structured 5:30 AM to 9:00 PM routine replaces virtual isolation with real human connection, physical vitality, and mental clarity.",
      whatsappPrefill:
        "Hello Shraddha Team, I need confidential help regarding Mobile & Gaming Addiction treatment.",
    },
    {
      id: "prescription",
      title: "Sleeping Pills, Cough Syrups & All Other Addictions",
      teluguTitle: "నిద్రమాత్రలు, సిరప్‌లు & ఇతర వ్యసనాలు (Polysubstance & Behavioural)",
      category: "Comprehensive De-Addiction",
      shortDesc:
        "Medical detox and holistic rehabilitation for sedatives, painkillers, cough syrups, inhalants, gutkha/nicotine, and dual diagnosis.",
      overview:
        "Many individuals become dependent on pharmacy sleeping pills (benzodiazepines), codeine cough syrups, painkiller injections, whiteners/inhalants, or multiple combined addictions alongside depression and anxiety. Shraddha provides a custom-tailored medical and 12-Step recovery plan for every form of dependency.",
      warningSigns: [
        "Visiting multiple pharmacies or doctors to obtain sleeping tablets, painkillers, or syrups",
        "Drowsiness, confusion, unsteady walking, or memory gaps during the day",
        "Combining alcohol with tablets or switching from one habit to another",
      ],
      howWeTreat: [
        {
          phase: "Step 01 • Gradual Tapering",
          title: "Medically Supervised Dose Tapering",
          detail:
            "Sedatives and prescription drugs require careful, doctor-supervised tapering rather than abrupt stopping to protect the nervous system.",
        },
        {
          phase: "Step 02 • Dual-Diagnosis Care",
          title: "Treating Underlying Anxiety, Trauma & Insomnia",
          detail:
            "Addressing the root emotional pain or sleep disorder that caused the person to start taking pills or substances in the first place.",
        },
        {
          phase: "Step 03 • Holistic Lifestyle",
          title: "Natural Sleep, Yoga & 12-Step Spiritual Grounding",
          detail:
            "Restoring the body's natural circadian rhythm through morning pranayama, wholesome nutrition, and evening meditation.",
        },
      ],
      familyNote:
        "No matter how unusual or complex the addiction is, our team evaluates the whole person with zero judgment.",
      whatsappPrefill:
        "Hello Shraddha Team, I need confidential help regarding Prescription/Polysubstance Addiction treatment.",
    },
  ] as ConditionDetail[],

  // ==========================================
  // 7. NUMBERED PROGRAMS (WITH DETAILED POPUP BREAKDOWNS)
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
      whoIsItFor:
        "Individuals experiencing active physical withdrawal (tremors, sweating, insomnia, severe cravings) or families needing immediate crisis stabilization after a heavy binge.",
      phases: [
        {
          week: "Days 1 – 3",
          focus: "Acute Medical Evaluation & Withdrawal Shield",
          details:
            "Complete vital-sign monitoring, hydration therapy, vitamin replenishment, and physician-prescribed medication to prevent tremors, seizures, or agitation.",
        },
        {
          week: "Days 4 – 10",
          focus: "Physical Stabilization & Sleep Restoration",
          details:
            "Restoring appetite with fresh home-style meals, normalizing natural sleep cycles, and introducing gentle morning breathing exercises.",
        },
        {
          week: "Days 11 – 21",
          focus: "Psychological Readiness & Recovery Roadmap",
          details:
            "Initial 1-on-1 counselling sessions and family review to transition smoothly into long-term relapse prevention.",
        },
      ],
      includedTherapies: [
        "24/7 Medical & Nursing Monitoring",
        "Anti-Craving & Withdrawal Pharmacotherapy",
        "Liver & Nutritional Replenishment Diet",
        "Initial Individual & Family Counselling",
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
      whoIsItFor:
        "Individuals with chronic alcohol, drug, weed, or betting addiction who have relapsed after short detoxes and need deep behavioural and lifestyle transformation.",
      phases: [
        {
          week: "Phase 1 (Days 1 – 30)",
          focus: "Detoxification, Acceptance & Routine Building",
          details:
            "Breaking denial, stabilizing physical health, and adapting to our 5:30 AM–9:00 PM rhythm of yoga, meditation, and Steps 1–3 of the A.A. programme.",
        },
        {
          week: "Phase 2 (Days 31 – 60)",
          focus: "Deep Root-Cause Therapy & Moral Inventory",
          details:
            "Intensive 'Thoughts & Feelings' workshops, anger/stress management, healing guilt and resentment, and daily Big Book study.",
        },
        {
          week: "Phase 3 (Days 61 – 90)",
          focus: "Relapse Prevention & Family Rebuilding",
          details:
            "Preparing for real-world high-risk situations, conducting joint family healing sessions, and building a post-discharge accountability plan.",
        },
      ],
      includedTherapies: [
        "A.A. 12-Step Facilitation & Big Book Study",
        "1-on-1 Lived-Experience Mentorship with D. Sreekanth Chary",
        "Daily Thoughts & Feelings Group Therapy",
        "6:00 AM Yoga, Pranayama & 8:00 AM Spiritual Meditation",
        "Family Counselling & Reintegration Workshops",
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
        "Addiction frequently co-occurs with underlying depression, anxiety, psychosis, or trauma. Treating one without the other leads to relapse. We provide unified psychiatric and psychological intervention.",
      highlights: [
        "Simultaneous psychiatric and de-addiction protocols",
        "Trauma-informed individual counselling",
        "Medication management and mood stabilization",
        "Stress resilience and cognitive restructuring",
      ],
      whoIsItFor:
        "Residents suffering from substance/weed/alcohol addiction alongside severe anxiety, clinical depression, cannabis-induced paranoia, mood swings, or past emotional trauma.",
      phases: [
        {
          week: "Stage 1",
          focus: "Psychiatric Stabilization & Safe Detox",
          details:
            "Clearing substances from the body so our psychiatric team can accurately evaluate and stabilize mood, paranoia, or severe anxiety.",
        },
        {
          week: "Stage 2",
          focus: "Integrated Psychotherapy & Emotional Healing",
          details:
            "Addressing self-medication habits—teaching the resident how to manage emotional pain, grief, or stress without turning to alcohol, weed, or pills.",
        },
        {
          week: "Stage 3",
          focus: "Long-Term Mood & Sobriety Maintenance",
          details:
            "Establishing sustainable medication adherence, sleep hygiene, and family support structures.",
        },
      ],
      includedTherapies: [
        "Psychiatric Assessment & Mood Stabilization",
        "Trauma-Informed Individual Counselling",
        "Mindfulness-Based Stress Reduction",
        "Supervised Medication Management",
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
      whoIsItFor:
        "Graduating residents returning to work/family life and families who want structured ongoing mentorship so old triggers don't cause a relapse.",
      phases: [
        {
          week: "Pre-Discharge",
          focus: "Home Environment & Boundary Blueprint",
          details:
            "Aligning parents, spouses, and the resident on daily routines, financial transparency, and trigger avoidance before going home.",
        },
        {
          week: "First 90 Days Home",
          focus: "Weekly Check-Ins & A.A. Fellowship Connection",
          details:
            "Regular follow-up visits at our Uppal centre, continued 12-Step meeting attendance, and immediate counsellor access if stress arises.",
        },
        {
          week: "Lifelong Brotherhood",
          focus: "Alumni Mentorship & Service",
          details:
            "Staying connected to the Shraddha recovery community and encouraging others on the path of sobriety.",
        },
      ],
      includedTherapies: [
        "Joint Family & Spouse Counselling",
        "Early Relapse Warning Sign Detection",
        "A.A. Fellowship & Alumni Network",
        "24/7 Direct Crisis Guidance Line",
      ],
      whatsappPrefill:
        "Hello Shraddha Team, I want to inquire about the 04 Post-Rehab Aftercare & Family Support program.",
    },
  ] as ProgramDetail[],

  // ==========================================
  // 8. SELF-ASSESSMENT QUESTIONS
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
          "Needing higher amounts of alcohol, substances, or betting/screen time to feel satisfied, or engaging in the habit daily.",
      },
      {
        id: "withdrawal",
        question:
          "Experiencing restlessness, shaking, sweating, insomnia, or severe anger/irritability when trying to stop.",
      },
      {
        id: "failed_attempts",
        question:
          "Multiple sincere promises or attempts to cut down or quit that lasted only a few days or weeks.",
      },
      {
        id: "isolation",
        question:
          "Withdrawing from family conversations, hiding usage or debts, mood swings, or neglecting work and health.",
      },
      {
        id: "safety_concern",
        question:
          "Family members feeling constant anxiety, walking on eggshells, or worrying about medical, financial, or safety risks.",
      },
    ],
  },

  // ==========================================
  // 9. CUSTOM CAMPUS SPACES
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
      altCandidates: [
        "/images/WhatsApp Image 2026-09-28 at 13.36.32 (1).jpg",
        "/images/WhatsApp Image 2026-09-28 at 13.36.32 (1).jpeg",
      ],
      imageFallback:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=85",
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
      altCandidates: [
        "/images/WhatsApp Image 2026-09-28 at 13.42.30.jpg",
        "/images/WhatsApp Image 2026-09-28 at 13.42.30.jpeg",
      ],
      imageFallback:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
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
      altCandidates: [
        "/images/WhatsApp Image 2026-09-28 at 13.44.11.jpg",
        "/images/WhatsApp Image 2026-09-28 at 13.44.11.jpeg",
      ],
      imageFallback:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
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
      altCandidates: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85",
      ],
      imageFallback:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85",
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
      altCandidates: [
        "/images/WhatsApp Image 2026-09-28 at 13.47.09.jpg",
        "/images/WhatsApp Image 2026-09-28 at 13.47.09.jpeg",
      ],
      imageFallback:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85",
    },
  ],

  // ==========================================
  // 10. DAILY SCHEDULE AT SHRADDHA (5:30 AM - 9:00 PM)
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
  // 11. FAQS
  // ==========================================
  faqs: [
    {
      q: "Is admission at Shraddha kept 100% confidential?",
      a: "Yes. Every phone call, WhatsApp chat, and admission record is protected under strict confidentiality. We never disclose resident details to employers, relatives, or external parties without explicit family authorization.",
    },
    {
      q: "What if the patient is unwilling to come for treatment?",
      a: "Denial is a common symptom of addiction. Our team guides families on how to conduct a calm, structured intervention, and we also offer 24/7 safe, non-violent, supervised assisted home pickup across Hyderabad and Telangana.",
    },
    {
      q: "Do you treat online betting, gambling, weed, and mobile addiction?",
      a: "Yes. Alongside alcohol and drug de-addiction, we run specialized cognitive-behavioural and 12-Step recovery protocols for online cricket/rummy/casino betting addiction, cannabis (ganja) dependency, prescription medication abuse, and severe gaming/screen addiction.",
    },
    {
      q: "How long does a resident need to stay?",
      a: "Physical detoxification takes 7 to 21 days, while deep psychological and 12-Step rehabilitation typically spans 30, 60, or 90 days depending on the history of usage and clinical progress.",
    },
    {
      q: "Are family members involved during the recovery process?",
      a: "Yes. After the initial stabilization phase, we conduct regular family updates, scheduled visits at our Uppal centre, and dedicated family counselling sessions so the entire household heals together.",
    },
  ],
};

export type SiteConfigType = typeof siteConfig;