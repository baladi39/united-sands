// Bilingual (EN / AR) copy for everything currently on the live homepage +
// the global Request Project form. Arabic is a first machine-assisted draft —
// it should be reviewed by Reina / a native speaker before launch.
//
// Option ids (services / timelines / etc.) are language-independent and stable;
// only their labels are localized. The email payload always reports the English
// labels so the team reads a consistent language regardless of visitor locale.

export type Lang = "en" | "ar";

export type Option = { id: string; label: string };

export type Stat = {
  value: string; // big gradient number, e.g. "12", "97%"
  unit: string; // small-caps suffix, e.g. "CITIES"; "" when none
  label: string; // category, e.g. "Scale of Reach"
  copy: string; // supporting sentence
};

export type Sector = {
  name: string; // sector window title
  description: string; // short supporting copy shown under the title
};

export type Service = {
  name: string; // service title
  description: string; // short copy revealed when the card expands
};

export type Project = {
  client: string; // e.g. "ADNOC"
  country: string; // e.g. "UAE"
  title: string; // project title
  stat: string; // headline figure, e.g. "40%"
  statLabel: string; // supporting line under the figure
  tags: string[]; // capability tags
  slug?: string; // links the homepage carousel item to its /case-studies/[slug] detail page
};

// A portfolio case study — powers both the /case-studies grid and each
// /case-studies/[slug] detail page. Only studies with real website.psb copy
// ship here; the grid pads the rest with "coming soon" tiles.
export type CaseStudy = {
  slug: string; // stable, language-independent route segment
  client: string; // "Company" filter value
  country: string; // shown in detail meta; "" when undisclosed
  sector: string; // "Category" filter value, e.g. "Oil & Gas / Safety"
  title: string;
  stat: string; // headline figure, e.g. "40%"
  statLabel: string; // supporting line under the figure
  summary: string; // one line revealed on grid hover
  description: string; // detail-page paragraph
  tags: string[]; // services used (placeholder pending client sign-off)
  image: string; // featured visual path
  accent: "gold" | "purple"; // tile + detail tint
};

export type SaudiPillar = {
  title: string; // differentiator name, e.g. "Deep Alignment with Vision 2030"
  copy: string; // one supporting sentence
};

export type TeamMember = {
  name: string; // person name (kept identical EN/AR)
  role: string; // localized title
  bio: string[]; // paragraphs, revealed in the "Read Bio" dialog
  linkedin: string; // profile URL ("#" placeholder until provided)
  initials: string; // monogram shown on the card
};

export type Messages = {
  // Nav + chrome
  navRequest: string;
  langEn: string;
  langAr: string;
  openMenu: string;
  closeMenu: string;

  // Splash
  loading: string;

  // Hero
  heroEyebrow: string;
  heroHeadline: string; // may contain a "\n" line break
  heroSub: string;
  ourStory: string;
  scrollHint: string;

  // Scroll text (Part 3 — between-sections statement)
  scrollStatement: string;
  scrollTagline: string; // bright top marquee band (· separated)
  scrollKeywords: string; // faint bottom marquee band (· separated)

  // Why Choose / Stats (Part 4)
  statsTitle: string; // "Why Choose\nUnited Sands?" — also the carousel aria-label
  statsTagline: string;
  statsIntro: string;
  stats: Stat[];
  statsPrev: string; // prev button aria-label
  statsNext: string; // next button aria-label

  // Value Chain banner (Part 5 — "Serving You Across Every Step")
  serveEyebrow: string;
  serveTitle: string; // may contain a "\n" line break
  serveBody: string;
  serveCta: string;

  // Sectors (Part 6 — "Sectoral Evolution Through Technology")
  sectorsTitle: string; // "Sectoral Evolution\nThrough Technology"
  sectorsIntro: string;
  sectors: Sector[];

  // Services (Part 7 — "Integrated Digital Services")
  servicesEyebrow: string;
  servicesTitle: string; // "Integrated Digital\nServices"
  servicesIntro: string;
  services: Service[];

  // CTA morph (Part 8 — "Request Project" button morph)
  ctaEyebrow: string;
  ctaHeading: string; // "Ready to Shape\nYour Transformation?"

  // Portfolio (Part 9 — "Latest Portfolio")
  portfolioTitle: string; // "Latest\nPortfolio" — split on "\n"
  portfolioIntro: string;
  portfolio: Project[];
  portfolioPrev: string; // prev button aria-label
  portfolioNext: string; // next button aria-label
  portfolioCaseStudy: string; // case-study link label (arrow baked in per dir)

  // Case Studies (Portfolio inner pages — listing grid + project detail)
  caseStudiesEyebrow: string; // "[ OUR PORTFOLIO ]"
  caseStudiesTitle: string; // lead line, e.g. "From Vision"
  caseStudiesTitleAccent: string; // gradient line, e.g. "to Reality"
  caseStudiesSubtitle: string; // "Smart Transformation Case Studies"
  caseStudiesIntro: string;
  caseStudiesFilterBy: string; // "Filter by"
  caseStudiesFilterCategory: string; // "Category"
  caseStudiesFilterCompany: string; // "Company"
  caseStudiesFilterAll: string; // "All"
  caseStudiesComingSoon: string; // muted placeholder-tile label
  caseStudiesEmpty: string; // shown when filters match nothing
  caseStudiesBackToGrid: string; // detail → grid link
  caseStudyServicesUsed: string; // detail services-tags heading
  caseStudyRequestCta: string; // circle CTA label
  caseStudyNotFound: string; // unknown-slug message
  caseStudies: CaseStudy[];

  // Saudi-Born (Part 10 — "Why Being Saudi-Born Matters")
  saudiEyebrow: string; // small Vision-2030 tag
  saudiTitle: string; // "Why Being\nSaudi-Born Matters" — split on "\n"
  saudiIntro: string;
  saudiPillars: SaudiPillar[];
  saudiPrev: string; // prev button aria-label
  saudiNext: string; // next button aria-label

  // Team (Part 11 — "THE TEAM")
  teamEyebrow: string; // small tag, e.g. "THE TEAM"
  teamTitle: string; // "The\nTeam" — split on "\n"
  teamIntro: string;
  team: TeamMember[];
  teamReadBio: string; // expand button label
  teamPrev: string; // prev button aria-label
  teamNext: string; // next button aria-label
  teamLinkedin: string; // aria base, composed with the member name

  // Strategy (Part 12 — "Now Meet the Strategy") — static section
  strategyEyebrow: string; // rendered bracketed
  strategyTitle: string; // "Now Meet\nthe Strategy." — split on "\n"
  strategyBody: string;
  strategyCta: string; // scrolls to the Part 11 team carousel

  // Partners + Contact finale (Part 13 — circle-morph finale)
  partnersEyebrow: string; // rendered bracketed
  partnersTitle: string; // "Strategic Alliances &\nGlobal Technology Partners"
  contactEyebrow: string; // rendered bracketed
  contactTitle: string; // big gradient heading, "Want to talk?"
  contactAddress: string;
  contactPhone: string; // display string; tel: href derived in the component
  contactRights: string; // copyright line tail, e.g. "All rights reserved."

  // Menu overlay (labels only; per-link scroll/route targets live in
  // menu-overlay.tsx MENU_TARGETS, index-matched to this array)
  menuLinks: string[];
  email: string;

  // Request Project form
  formTitle: string;
  formSubtitle: string;
  formContactInfo: string;
  formName: string;
  formCompany: string;
  formEmail: string;
  formDescription: string;
  formServicesQ: string;
  formServices: Option[];
  formMeetingQ: string;
  formMeeting: Option[];
  formTimelineQ: string;
  formTimeline: Option[];
  formHeardQ: string;
  formHeard: Option[];
  formSubmit: string;
  formSending: string;
  formSuccessTitle: string;
  formSuccessBody: string;
  formError: string;
  formClose: string;
  formEmailInvalid: string;

  // About stub
  aboutEyebrow: string;
  aboutTitle: string;
  aboutBody: string;
  aboutBack: string;

  // Value Chain stub page (inner /value-chain placeholder)
  valueChainEyebrow: string;
  valueChainTitle: string;
  valueChainBody: string;
  valueChainBack: string;
};

export const en: Messages = {
  navRequest: "REQUEST PROJECT",
  langEn: "EN",
  langAr: "AR",
  openMenu: "Open menu",
  closeMenu: "Close menu",

  loading: "LOADING",

  heroEyebrow: "UNITED SANDS",
  heroHeadline: "WE SHAPE\nTHE FUTURE",
  heroSub:
    "A Saudi-born technology consultancy engineering the next era of smart cities, digital twins, and geospatial intelligence.",
  ourStory: "OUR STORY",
  scrollHint: "SCROLL TO DISCOVER",

  scrollStatement: "The future doesn't happen to us. We design it.",
  scrollTagline: "SHAPING THE FUTURE · ENGINEERING TOMORROW",
  scrollKeywords: "SMART CITIES · DIGITAL TWINS · GEOSPATIAL INTELLIGENCE",

  statsTitle: "Why Choose\nUnited Sands?",
  statsTagline:
    "A Saudi heart with a Global pulse. We are the smart city integrators of tomorrow.",
  statsIntro:
    "United Sands is the Kingdom's strategic smart city integrator, dedicated to accelerating the delivery of Saudi Arabia's Giga-Projects and Vision 2030 through comprehensive digital transformation.",
  // PLACEHOLDER figures — pending client (Reina) confirmation; do not treat as final.
  stats: [
    {
      value: "12",
      unit: "CITIES",
      label: "Scale of Reach",
      copy: "Active deployments across Saudi Arabia's most strategic industrial zones and urban centres.",
    },
    {
      value: "97%",
      unit: "",
      label: "Customer Success",
      copy: "Customer satisfaction measured across pilots, long-term engagements, and transformation programs.",
    },
    {
      value: "15+",
      unit: "YEARS",
      label: "Combined Experience",
      copy: "Leadership bringing decades of geospatial, digital twin, and smart-infrastructure expertise.",
    },
    {
      value: "60",
      unit: "EXPERTS",
      label: "Team Strength",
      copy: "Engineers, data scientists, and regulatory specialists — fluent in both global tech and local context.",
    },
    {
      value: "30+",
      unit: "PROJECTS",
      label: "Strategic Delivery",
      copy: "From city-scale command centres to field-grade reality-capture programs.",
    },
  ],
  statsPrev: "Previous statistic",
  statsNext: "Next statistic",

  serveEyebrow: "Digital Value Chain",
  serveTitle: "Serving You\nAcross Every Step",
  serveBody:
    "Digital transformation is not a milestone, it's a lifecycle. We walk with you from strategy to autonomy.",
  serveCta: "Walk With Us",

  sectorsTitle: "Sectoral Evolution\nThrough Technology",
  sectorsIntro:
    "We provide a comprehensive ecosystem of advanced technologies designed to transform urban infrastructure and industrial operations through data-driven innovation.",
  sectors: [
    {
      name: "Smart Cities & Urban Platforms",
      description:
        "Unified city data, urban mobility, and governance dashboards.",
    },
    {
      name: "Industrial, Manufacturing & Logistics",
      description:
        "Connected factories, predictive maintenance, and smart logistics.",
    },
    {
      name: "Environment, ESG & Resilience",
      description:
        "Emissions monitoring, climate-risk modelling, and resilience planning.",
    },
    {
      name: "Utilities, Energy & Water",
      description: "Smart grids, demand forecasting, and leak detection.",
    },
    {
      name: "Transport, Mobility & Mega-Infrastructure",
      description:
        "Traffic orchestration and digital twins for mega-projects.",
    },
    {
      name: "Satellite Imagery & Geospatial Data",
      description:
        "Earth observation, change detection, and terrain analysis.",
    },
  ],

  servicesEyebrow: "Services for a Connected Future",
  servicesTitle: "Integrated Digital\nServices",
  servicesIntro:
    "We deploy a comprehensive suite of technologies designed to bridge the gap between physical infrastructure and virtual intelligence. From initial strategy to fully autonomous operations, we build the digital nervous system for the modern world.",
  services: [
    {
      name: "Digital Twin Solutions",
      description:
        "Live 4D simulation environments for real-time operations, predictive maintenance, and multi-scenario analysis.",
    },
    {
      name: "Smart City Solutions",
      description:
        "Command & control, unified city data platforms, urban mobility, smart utilities, and governance dashboards.",
    },
    {
      name: "GIS & Geospatial Intelligence",
      description:
        "Reality capture, GIS (SuperMap), LiDAR, drone intelligence, and spatial analytics.",
    },
  ],

  ctaEyebrow: "Let's Talk",
  ctaHeading: "Ready to Shape\nYour Transformation?",

  portfolioTitle: "Latest\nPortfolio",
  portfolioIntro:
    "A snapshot of our newest engagements — from reality-capture programs to city-scale digital twins.",
  // PLACEHOLDER projects — pending client (Reina) confirmation of the real 3 newest. Do not treat as final.
  portfolio: [
    {
      client: "ADNOC",
      country: "UAE",
      title: "Pipeline Inspection Program",
      stat: "40%",
      statLabel: "Cost reduction vs. traditional inspection",
      tags: ["Reality Capture", "GIS", "Drone Intelligence"],
      slug: "adnoc-pipeline-inspection",
    },
    {
      client: "NEOM",
      country: "KSA",
      title: "Smart City Command Platform",
      stat: "6M+",
      statLabel: "IoT signals processed per day",
      tags: ["Digital Twin", "Command & Control", "Predictive Ops"],
    },
    {
      client: "Royal Commission",
      country: "KSA",
      title: "Industrial Zone Digital Twin",
      stat: "24/7",
      statLabel: "Live 4D operational visibility",
      tags: ["Digital Twin", "LiDAR", "Spatial Analytics"],
    },
  ],
  portfolioPrev: "Previous project",
  portfolioNext: "Next project",
  portfolioCaseStudy: "VIEW CASE STUDY →",

  caseStudiesEyebrow: "[ OUR PORTFOLIO ]",
  caseStudiesTitle: "From Vision",
  caseStudiesTitleAccent: "to Reality",
  caseStudiesSubtitle: "Smart Transformation Case Studies",
  caseStudiesIntro:
    "Real programs where data, geospatial intelligence, and digital twins turned ambition into measurable outcomes on the ground.",
  caseStudiesFilterBy: "Filter by",
  caseStudiesFilterCategory: "Category",
  caseStudiesFilterCompany: "Company",
  caseStudiesFilterAll: "All",
  caseStudiesComingSoon: "Coming soon",
  caseStudiesEmpty: "No case studies match these filters yet.",
  caseStudiesBackToGrid: "All case studies",
  caseStudyServicesUsed: "Services used",
  caseStudyRequestCta: "Request Project",
  caseStudyNotFound: "That case study could not be found.",
  // Only the two studies with real website.psb copy ship as published. Figures +
  // sector are from the PSB; service tags are placeholder pending client (Reina) sign-off.
  caseStudies: [
    {
      slug: "adnoc-pipeline-inspection",
      client: "ADNOC",
      country: "UAE",
      sector: "Oil & Gas / Safety",
      title: "Pipeline Inspection for ADNOC (UAE)",
      stat: "40%",
      statLabel:
        "Cost reduction vs. traditional inspection methods, while improving safety compliance.",
      summary:
        "Drone-led reality capture cut pipeline inspection cost by 40% while raising safety compliance.",
      description:
        "United Sands replaced manual pipeline survey routines with a reality-capture and geospatial-intelligence program — drone-based capture feeding a live GIS model of the network. The result was a 40% reduction in inspection cost compared with traditional methods, alongside measurable gains in safety compliance across the asset base.",
      tags: ["Reality Capture", "GIS", "Drone Intelligence"],
      image: "/assets/portfolio-city.webp",
      accent: "gold",
    },
    {
      slug: "integrated-urban-data-platform",
      client: "Undisclosed",
      country: "",
      sector: "Smart City / Governance",
      title: "Integrated Urban Data Platform",
      stat: "40%",
      statLabel:
        "Reduction in municipal authority response times, driving citizen satisfaction.",
      summary:
        "A unified urban data platform that cut municipal response times by 40%.",
      description:
        "United Sands unified fragmented municipal data sources into a single command-and-control view — a governance-grade platform connecting city operations in real time. Municipal authority response times fell by 40%, driving a measurable lift in citizen satisfaction.",
      tags: ["Command & Control", "Unified City Data", "Governance Dashboards"],
      image: "/assets/portfolio-city.webp",
      accent: "purple",
    },
  ],

  saudiEyebrow: "Vision 2030",
  saudiTitle: "Why Being\nSaudi-Born Matters",
  saudiIntro:
    "Global capability is only half the equation. Being Saudi-born is the other — the local fluency, trust, and alignment that turn ambition into delivery on the ground.",
  // PLACEHOLDER copy — pending client (Reina) confirmation. Do not treat as final.
  saudiPillars: [
    {
      title: "Deep Alignment with Vision 2030",
      copy: "Every engagement is engineered to advance the Kingdom's national goals — from Giga-Project delivery to the wider digital transformation agenda.",
    },
    {
      title: "Fluent in Saudi Regulation",
      copy: "We navigate local compliance, data sovereignty, and procurement frameworks natively, so projects move without regulatory friction.",
    },
    {
      title: "Cultural & Stakeholder Intelligence",
      copy: "Rooted in the local context, we read the stakeholders and decision dynamics that outside firms miss — earning trust faster.",
    },
    {
      title: "Growing Saudi Talent",
      copy: "We invest in Saudi engineers and data scientists, building lasting national capability rather than importing it.",
    },
    {
      title: "Agility with Accountability",
      copy: "Startup-speed delivery backed by enterprise-grade governance — we move fast and own the outcome.",
    },
  ],
  saudiPrev: "Previous reason",
  saudiNext: "Next reason",

  teamEyebrow: "The Team",
  teamTitle: "The\nTeam",
  teamIntro:
    "A leadership team that pairs deep technical depth with on-the-ground knowledge of the Kingdom — the people building United Sands.",
  // Real leadership bios + LinkedIn URLs from the client (2026-06-16). All four LinkedIn profiles provided.
  team: [
    {
      name: "Suleiman Abed Aljawad",
      role: "Founder, United Sands and Atlantis Blu Mining | Co-Founder, Marine Mining Company",
      bio: [
        "Mr. Suleiman Abed Aljawad is a technology-driven founder and executive focused on building future-ready platforms across smart cities, advanced infrastructure, and industrial innovation.",
        "His work centers on the localization and commercialization of frontier technologies, including robotics, digital twin systems, AI-powered monitoring, environmental intelligence, and integrated digital infrastructure solutions. Through strategic partnerships and cross-sector collaboration, he leads the development of scalable technology platforms that support sustainable growth and next-generation urban transformation.",
      ],
      linkedin: "https://www.linkedin.com/in/suleiman-abdeljawad-49b52987/",
      initials: "SA",
    },
    {
      name: "Mohammed Aljuaid",
      role: "Chief Operating Officer",
      bio: [
        "Mr. Mohammed Aljuaid is a smart city and digital transformation executive with extensive experience in urban intelligence, digital twin platforms, geospatial technologies, and large-scale infrastructure programs across Saudi Arabia.",
        "At United Sands, he strengthens operational and delivery capabilities by translating smart city strategies into practical operating models that integrate digital infrastructure, GIS platforms, asset intelligence, data-driven governance, and scalable urban intelligence solutions.",
      ],
      linkedin: "https://www.linkedin.com/in/m-aljuaid-sa",
      initials: "MA",
    },
    {
      name: "Issa Suleiman",
      role: "Business Development Director",
      bio: [
        "Mr. Issa Suleiman leads business development and strategic growth initiatives across smart city infrastructure, advanced technologies, and renewable energy systems.",
        "His work focuses on identifying market opportunities, developing partnership channels, and shaping commercialization pathways for technology-driven projects. Through engagement with government entities, technology partners, and industry stakeholders, he supports the expansion of United Sands' business ecosystem.",
      ],
      linkedin: "https://www.linkedin.com/in/issa-abdeljawad-9361b6324",
      initials: "IS",
    },
    {
      name: "Rinad Saeed",
      role: "Executive Manager",
      bio: [
        "Ms. Rinad Saeed is an Executive Manager focused on strategic partnerships, innovation-led initiatives, smart technologies, and executive alignment within smart city and advanced infrastructure projects.",
        "At United Sands, she supports the development of strategic projects by connecting leadership direction with opportunity development, partnership positioning, stakeholder alignment, and the early structuring of technology-driven initiatives that support scalable smart infrastructure solutions.",
      ],
      linkedin: "https://www.linkedin.com/in/rinad-saeed",
      initials: "RS",
    },
  ],
  teamReadBio: "Read Bio",
  teamPrev: "Previous team members",
  teamNext: "Next team members",
  teamLinkedin: "on LinkedIn",

  strategyEyebrow: "You've Seen the Results.",
  strategyTitle: "Now Meet\nthe Strategy.",
  strategyBody:
    "Success at United Sands is never accidental—it is the result of a unified vision. Our founding team works in lockstep with a formidable network of Limited Partners and advisors from the government and defense sectors to turn complex logistics into seamless execution. With decades of shared history at the helm, we provide the strategic depth that ensures every project under the United Sands umbrella is built to last.",
  strategyCta: "Meet the rest of the team",

  partnersEyebrow: "Powering Progress Together",
  partnersTitle: "Strategic Alliances &\nGlobal Technology Partners",
  contactEyebrow: "Contact Us",
  contactTitle: "Want to talk?",
  contactAddress: "Anas Ibn Malik Rd, Almalqa, Riyadh 13521, Saudi Arabia",
  contactPhone: "00966 059 915 7370",
  contactRights: "All rights reserved.",

  menuLinks: [
    "Home",
    "Sectors",
    "Services",
    "Portfolio",
    "Who We Are",
    "Contact",
  ],
  email: "info@unitedsands.co",

  formTitle: "Request a Project",
  formSubtitle: "Want to talk? Tell us about your project.",
  formContactInfo: "Contact Info",
  formName: "Name & Surname",
  formCompany: "Company Name",
  formEmail: "Email Address",
  formDescription: "Project Description",
  formServicesQ: "What services do you need?",
  formServices: [
    { id: "infrastructure", label: "Infrastructure Support" },
    { id: "consulting", label: "Consulting & Supply" },
    { id: "strategic", label: "Strategic Partnership" },
    { id: "industrial", label: "Industrial Innovation" },
    { id: "itot", label: "IT/OT Consulting" },
    { id: "fullscale", label: "Full-Scale Projects" },
  ],
  formMeetingQ: "When can we have our detailed meeting?",
  formMeeting: [
    { id: "immediately", label: "Immediately" },
    { id: "1-3-months", label: "1–3 Months" },
    { id: "next-quarter", label: "Next Quarter" },
  ],
  formTimelineQ: "Anticipated project timeline",
  formTimeline: [
    { id: "urgent", label: "Urgent" },
    { id: "within-month", label: "Within the Month" },
    { id: "no-rush", label: "No Rush" },
  ],
  formHeardQ: "How did you hear about us?",
  formHeard: [
    { id: "social", label: "Social Media" },
    { id: "referral", label: "Referral" },
    { id: "search", label: "Search Engine" },
    { id: "events", label: "Events / Media" },
  ],
  formSubmit: "Submit Request",
  formSending: "Sending…",
  formSuccessTitle: "Request received",
  formSuccessBody: "Thank you — our team will reach out shortly.",
  formError: "Something went wrong. Please try again.",
  formClose: "Close",
  formEmailInvalid: "Please enter a valid email address.",

  aboutEyebrow: "OUR STORY",
  aboutTitle: "Why Being Saudi-Born Matters",
  aboutBody:
    "A Saudi-born technology consultancy aligned with Vision 2030 — fluent in local regulation, rooted in cultural and stakeholder intelligence, and engineered to deliver. The full About Us page is on the way.",
  aboutBack: "Back to home",

  valueChainEyebrow: "Digital Value Chain",
  valueChainTitle: "Serving You Across Every Step",
  valueChainBody:
    "From vision and strategy through system architecture, integration, cybersecurity, and predictive optimization — we walk every step of the digital transformation lifecycle with you. The full value-chain page is on the way.",
  valueChainBack: "Back to home",
};

export const ar: Messages = {
  navRequest: "طلب الخدمة",
  langEn: "EN",
  langAr: "AR",
  openMenu: "افتح القائمة",
  closeMenu: "أغلق القائمة",

  loading: "جارٍ التحميل",

  heroEyebrow: "الرمال المتحدة",
  heroHeadline: "نَصنع\nالمستقبل",
  heroSub:
    "شركة سعودية تقنية متقدمة، تشكّل الحقبة القادمة من المدن الذكية والتوائم الرقمية، بالإضافة إلى أحدث الأنظمة الجيومكانية الذكية.",
  ourStory: "قصتنا",
  scrollHint: "مرّر للاكتشاف",

  scrollStatement: "المستقبل لا يحدث لنا، بل نُصمّمه.",
  scrollTagline: "نَصنع المستقبل · نُشكّل الغد",
  scrollKeywords: "المدن الذكية · التوائم الرقمية · الذكاء الجيومكاني",

  statsTitle: "لماذا تختار\nالرمال المتحدة؟",
  statsTagline: "قلبٌ سعودي بنبضٍ عالمي. نحن مُكاملو المدن الذكية للغد.",
  statsIntro:
    "الرمال المتحدة هي نواة التكامل الاستراتيجي للمدن الذكية بالمملكة، بجهود مكرّسة لتسريع إنجاز المشاريع العملاقة ورؤية 2030 عبر التحول الرقمي الشامل.",
  // أرقام مبدئية — بانتظار تأكيد العميل؛ ليست نهائية.
  stats: [
    {
      value: "12",
      unit: "مدينة",
      label: "نطاق التغطية",
      copy: "عمليات نشر فاعلة عبر أهم المناطق الصناعية والمراكز الحضرية الاستراتيجية في السعودية.",
    },
    {
      value: "97%",
      unit: "",
      label: "نجاح العملاء",
      copy: "رضا العملاء يتم قياسه عبر المشاريع التجريبية والمشاريع طويلة الأمد وبرامج التحول.",
    },
    {
      value: "+15",
      unit: "سنة",
      label: "خبرة متراكمة",
      copy: "فريق قيادي يملك عقوداً من الخبرة المتراكمة بالأنظمة الجيومكانية والتحول الرقمي والبنية التحتية الذكية.",
    },
    {
      value: "60",
      unit: "خبير",
      label: "قوة الفريق",
      copy: "مهندسون وعلماء بيانات ومختصون تنظيميون — يجيدون التقنية العالمية والسياق المحلي معاً.",
    },
    {
      value: "+30",
      unit: "مشروع",
      label: "تسليم استراتيجي",
      copy: "من مراكز القيادة على مستوى المدينة إلى برامج تجسيد الواقع الميدانية.",
    },
  ],
  statsPrev: "الإحصائية السابقة",
  statsNext: "الإحصائية التالية",

  serveEyebrow: "سلسلة القيمة الرقمية",
  serveTitle: "نخدمك في\nكل خطوة",
  serveBody:
    "التحول الرقمي ليس محطة، بل رحلة متكاملة. نسير معك من الاستراتيجية حتى الاستقلالية.",
  serveCta: "سِر معنا",

  sectorsTitle: "التطور القطاعي\nعبر التقنية",
  sectorsIntro:
    "نقدّم منظومة متكاملة من التقنيات المتقدمة المصممة لتحويل البنية التحتية الحضرية والعمليات الصناعية عبر الابتكار القائم على البيانات.",
  sectors: [
    {
      name: "المدن الذكية والمنصّات الحضرية",
      description: "بيانات مدن موحّدة، وتنقّل حضري، ولوحات حوكمة.",
    },
    {
      name: "الصناعة والتصنيع والخدمات اللوجستية",
      description: "مصانع متّصلة، وصيانة تنبؤية، وخدمات لوجستية ذكية.",
    },
    {
      name: "البيئة والحوكمة والمرونة",
      description: "رصد الانبعاثات، ونمذجة المخاطر المناخية، وتخطيط المرونة.",
    },
    {
      name: "المرافق والطاقة والمياه",
      description: "شبكات ذكية، والتنبؤ بالطلب، وكشف التسرّب.",
    },
    {
      name: "النقل والتنقّل والبنية التحتية الكبرى",
      description: "تنظيم حركة المرور والتوائم الرقمية للمشاريع الكبرى.",
    },
    {
      name: "صور الأقمار الصناعية والبيانات الجيومكانية",
      description: "رصد الأرض، وكشف التغيّرات، وتحليل التضاريس.",
    },
  ],

  servicesEyebrow: "خدمات لمستقبلٍ متّصل",
  servicesTitle: "الخدمات الرقمية\nالمتكاملة",
  servicesIntro:
    "نوظّف منظومة متكاملة من التقنيات لسدّ الفجوة بين البنية التحتية المادية والذكاء الافتراضي. من الاستراتيجية الأولى حتى العمليات المستقلة بالكامل، نبني الجهاز العصبي الرقمي للعالم الحديث.",
  services: [
    {
      name: "حلول التوأم الرقمي",
      description:
        "بيئات محاكاة رباعية الأبعاد للعمليات الآنية والصيانة التنبؤية وتحليل السيناريوهات المتعددة.",
    },
    {
      name: "حلول المدن الذكية",
      description:
        "القيادة والتحكّم، ومنصّات بيانات المدينة الموحّدة، والتنقّل الحضري، والمرافق الذكية، ولوحات الحوكمة.",
    },
    {
      name: "نظم المعلومات الجيومكانية والذكاء الاصطناعي",
      description:
        "تجسيد الواقع، ونظم المعلومات الجيومكانية، والليدار، وذكاء الطائرات المسيّرة، والتحليلات المكانية.",
    },
  ],

  ctaEyebrow: "لنتحدّث",
  ctaHeading: "هل أنت مستعدّ\nلبدء التحوّل؟",

  portfolioTitle: "أحدث\nالأعمال",
  portfolioIntro:
    "لمحة عن أحدث مشاريعنا — من برامج تجسيد الواقع إلى التوائم الرقمية على مستوى المدينة.",
  // مشاريع مبدئية — بانتظار تأكيد العميل للمشاريع الثلاثة الأحدث؛ ليست نهائية.
  portfolio: [
    {
      client: "أدنوك",
      country: "الإمارات",
      title: "برنامج فحص خطوط الأنابيب",
      stat: "40%",
      statLabel: "خفض التكلفة مقارنةً بالفحص التقليدي",
      tags: ["تجسيد الواقع", "نظم المعلومات الجيومكانية", "ذكاء الطائرات المسيّرة"],
      slug: "adnoc-pipeline-inspection",
    },
    {
      client: "نيوم",
      country: "السعودية",
      title: "منصة قيادة المدينة الذكية",
      stat: "+6M",
      statLabel: "إشارة إنترنت أشياء تُعالَج يومياً",
      tags: ["التوأم الرقمي", "القيادة والتحكّم", "العمليات التنبؤية"],
    },
    {
      client: "الهيئة الملكية",
      country: "السعودية",
      title: "التوأم الرقمي للمنطقة الصناعية",
      stat: "24/7",
      statLabel: "رؤية تشغيلية رباعية الأبعاد آنية",
      tags: ["التوأم الرقمي", "الليدار", "التحليلات المكانية"],
    },
  ],
  portfolioPrev: "المشروع السابق",
  portfolioNext: "المشروع التالي",
  portfolioCaseStudy: "عرض دراسة الحالة ←",

  caseStudiesEyebrow: "[ أعمالنا ]",
  caseStudiesTitle: "من الرؤية",
  caseStudiesTitleAccent: "إلى الواقع",
  caseStudiesSubtitle: "دراسات حالة التحوّل الذكي",
  caseStudiesIntro:
    "برامج حقيقية حوّلت فيها البيانات والذكاء الجيومكاني والتوائم الرقمية الطموح إلى نتائج ملموسة على أرض الواقع.",
  caseStudiesFilterBy: "تصفية حسب",
  caseStudiesFilterCategory: "الفئة",
  caseStudiesFilterCompany: "الشركة",
  caseStudiesFilterAll: "الكل",
  caseStudiesComingSoon: "قريباً",
  caseStudiesEmpty: "لا توجد دراسات حالة مطابقة لهذه التصفية بعد.",
  caseStudiesBackToGrid: "جميع دراسات الحالة",
  caseStudyServicesUsed: "الخدمات المستخدمة",
  caseStudyRequestCta: "طلب الخدمة",
  caseStudyNotFound: "تعذّر العثور على دراسة الحالة هذه.",
  caseStudies: [
    {
      slug: "adnoc-pipeline-inspection",
      client: "أدنوك",
      country: "الإمارات",
      sector: "النفط والغاز / السلامة",
      title: "فحص خطوط الأنابيب لأدنوك (الإمارات)",
      stat: "40%",
      statLabel:
        "خفض التكلفة مقارنةً بطرق الفحص التقليدية، مع تحسين الامتثال للسلامة.",
      summary:
        "خفض تجسيد الواقع بالطائرات المسيّرة تكلفة فحص خطوط الأنابيب بنسبة 40% مع رفع الامتثال للسلامة.",
      description:
        "استبدلت يونايتد ساندز إجراءات المسح اليدوي لخطوط الأنابيب ببرنامج تجسيد الواقع والذكاء الجيومكاني — تجسيد الواقع بالطائرات المسيّرة يغذّي نموذجاً جيومكانياً حياً للشبكة. وكانت النتيجة خفض تكلفة الفحص بنسبة 40% مقارنةً بالطرق التقليدية، إلى جانب مكاسب ملموسة في الامتثال للسلامة عبر الأصول.",
      tags: ["تجسيد الواقع", "نظم المعلومات الجيومكانية", "ذكاء الطائرات المسيّرة"],
      image: "/assets/portfolio-city.webp",
      accent: "gold",
    },
    {
      slug: "integrated-urban-data-platform",
      client: "غير معلن",
      country: "",
      sector: "المدن الذكية / الحوكمة",
      title: "منصة البيانات الحضرية المتكاملة",
      stat: "40%",
      statLabel:
        "خفض أزمنة استجابة الجهات البلدية، بما يعزّز رضا المواطنين.",
      summary:
        "منصة بيانات حضرية موحّدة خفضت أزمنة الاستجابة البلدية بنسبة 40%.",
      description:
        "وحّدت يونايتد ساندز مصادر البيانات البلدية المتفرّقة في عرضٍ موحّد للقيادة والتحكّم — منصة بمستوى حوكمي تربط عمليات المدينة آنياً. وانخفضت أزمنة استجابة الجهات البلدية بنسبة 40%، بما عزّز رضا المواطنين بشكلٍ ملموس.",
      tags: ["القيادة والتحكّم", "بيانات المدينة الموحّدة", "لوحات الحوكمة"],
      image: "/assets/portfolio-city.webp",
      accent: "purple",
    },
  ],

  saudiEyebrow: "رؤية 2030",
  saudiTitle: "لماذا يهمّ\nأن نكون سعوديي المنشأ",
  saudiIntro:
    "القدرة العالمية نصف المعادلة فقط، والنصف الآخر هو كوننا سعوديي المنشأ — الفهم المحلي والثقة والتوافق الذي يحوّل الطموح إلى إنجازٍ على أرض الواقع.",
  // نصوص مبدئية — بانتظار تأكيد العميل؛ ليست نهائية.
  saudiPillars: [
    {
      title: "توافق عميق مع رؤية 2030",
      copy: "كل مشروع مهندَس لخدمة أهداف المملكة الوطنية — من إنجاز المشاريع العملاقة إلى أجندة التحول الرقمي الأوسع.",
    },
    {
      title: "إلمام باللوائح المحلية",
      copy: "نتعامل مع الامتثال المحلي وسيادة البيانات وأطر التوريد بطلاقة، لتسير المشاريع دون عوائق تنظيمية.",
    },
    {
      title: "ذكاء ثقافي ومعرفة بأصحاب المصلحة",
      copy: "متجذّرون في السياق المحلي، نقرأ أصحاب المصلحة وديناميكيات القرار التي تغفل عنها الشركات الخارجية — فنكسب الثقة أسرع.",
    },
    {
      title: "تنمية الكفاءات السعودية",
      copy: "نستثمر في المهندسين وعلماء البيانات السعوديين، فنبني قدرة وطنية دائمة بدل استيرادها.",
    },
    {
      title: "مرونة مع شفافية",
      copy: "سرعة إنجازٍ كالشركات الناشئة مدعومة بحوكمةٍ بمستوى المؤسسات — نتحرك بسرعة ونتحمّل مسؤولية النتيجة.",
    },
  ],
  saudiPrev: "السبب السابق",
  saudiNext: "السبب التالي",

  teamEyebrow: "الفريق",
  teamTitle: "الفريق",
  teamIntro:
    "فريق قيادي يجمع بين العمق التقني والمعرفة الميدانية بالمملكة — الأشخاص الذين يبنون الرمال المتحدة.",
  // النص العربي المعتمد من العميل (2026-06-16). الأسماء تبقى لاتينية (مطابِقة للإنجليزية). جميع روابط لينكدإن الأربعة مُسلَّمة.
  team: [
    {
      name: "Suleiman Abed Aljawad",
      role: "المؤسس لشركة United Sands وشركة Atlantis Blu Mining | الشريك المؤسس لشركة التعدين البحري",
      bio: [
        "يُعد الأستاذ سليمان عبدالجواد مؤسسًا وقياديًا مدفوعًا بالتقنية، يركز على بناء منصات مستقبلية في مجالات المدن الذكية، والبنية التحتية المتقدمة، والابتكار الصناعي.",
        "تتمحور أعماله حول توطين وتسويق التقنيات المتقدمة، بما في ذلك الروبوتات، وأنظمة التوأم الرقمي، وحلول المراقبة المدعومة بالذكاء الاصطناعي، والذكاء البيئي، وأطر البنية التحتية الرقمية المتكاملة. ومن خلال الشراكات الاستراتيجية والتعاون بين القطاعات، يقود تطوير منصات تقنية قابلة للتوسع تدعم النمو المستدام والتحول الحضري للجيل القادم.",
      ],
      linkedin: "https://www.linkedin.com/in/suleiman-abdeljawad-49b52987/",
      initials: "SA",
    },
    {
      name: "Mohammed Aljuaid",
      role: "المدير التنفيذي للعمليات",
      bio: [
        "يُعد الأستاذ محمد الجعيد قياديًا في مجال المدن الذكية والتحول الرقمي، ولديه خبرة واسعة في منصات الذكاء الحضري، وأنظمة التوأم الرقمي، والتقنيات الجيومكانية، وبرامج البنية التحتية واسعة النطاق في المملكة العربية السعودية.",
        "في United Sands، يعمل على تعزيز القدرات التشغيلية والتنفيذية للشركة من خلال تحويل استراتيجيات المدن الذكية إلى نماذج تشغيلية عملية، تدمج البنية التحتية الرقمية، ومنصات نظم المعلومات الجغرافية، وذكاء الأصول، والحوكمة القائمة على البيانات، وحلول الذكاء الحضري القابلة للتوسع.",
      ],
      linkedin: "https://www.linkedin.com/in/m-aljuaid-sa",
      initials: "MA",
    },
    {
      name: "Issa Suleiman",
      role: "مدير تطوير الأعمال",
      bio: [
        "يقود الأستاذ عيسى سليمان مبادرات تطوير الأعمال والنمو الاستراتيجي في مجالات البنية التحتية للمدن الذكية، والتقنيات المتقدمة، وأنظمة الطاقة المتجددة.",
        "يركز عمله على تحديد الفرص السوقية، وتطوير قنوات الشراكة، وبناء مسارات تجارية للمشاريع القائمة على التقنية. ومن خلال تواصله مع الجهات الحكومية، والشركاء التقنيين، وأصحاب المصلحة في القطاع، يسهم في توسيع منظومة أعمال United Sands وتعزيز فرصها للنمو.",
      ],
      linkedin: "https://www.linkedin.com/in/issa-abdeljawad-9361b6324",
      initials: "IS",
    },
    {
      name: "Rinad Saeed",
      role: "مدير الإدارة التنفيذية",
      bio: [
        "تركز الأستاذة ريناد سعيد، بصفتها مديرًا للإدارة التنفيذية، على الشراكات الاستراتيجية، والمبادرات القائمة على الابتكار، والتقنيات الذكية، والمواءمة التنفيذية ضمن مشاريع المدن الذكية والبنية التحتية المتقدمة.",
        "في United Sands، تسهم في تطوير المشاريع الاستراتيجية من خلال ربط التوجهات القيادية بتطوير الفرص، وتموضع الشراكات، ومواءمة أصحاب المصلحة، والمساهمة في الهيكلة المبكرة للمبادرات التقنية التي تدعم حلول البنية التحتية الذكية القابلة للتوسع.",
      ],
      linkedin: "https://www.linkedin.com/in/rinad-saeed",
      initials: "RS",
    },
  ],
  teamReadBio: "اقرأ السيرة",
  teamPrev: "أعضاء الفريق السابقون",
  teamNext: "أعضاء الفريق التاليون",
  teamLinkedin: "على لينكدإن",

  strategyEyebrow: "لقد رأيت النتائج.",
  strategyTitle: "والآن تعرّف\nعلى الاستراتيجية.",
  strategyBody:
    "النجاح في الرمال المتحدة ليس صدفة، بل ثمرة رؤية موحّدة. يعمل فريقنا المؤسّس جنباً إلى جنب مع شبكة قوية من الشركاء المحدودين والمستشارين من القطاعين الحكومي والدفاعي لتحويل أعقد العمليات اللوجستية إلى تنفيذ سلس. وبعقودٍ من التاريخ المشترك في القيادة، نوفّر العمق الاستراتيجي الذي يضمن أن كل مشروع تحت مظلة الرمال المتحدة مبنيٌّ ليدوم.",
  strategyCta: "تعرّف على بقية الفريق",

  partnersEyebrow: "نصنع التقدّم معاً",
  partnersTitle: "تحالفات استراتيجية\nوشركاء تقنيون عالميون",
  contactEyebrow: "تواصل معنا",
  contactTitle: "هل تريد التحدّث؟",
  contactAddress: "طريق أنس بن مالك، الملقا، الرياض 13521، المملكة العربية السعودية",
  contactPhone: "00966 059 915 7370",
  contactRights: "جميع الحقوق محفوظة.",

  menuLinks: [
    "الرئيسية",
    "القطاعات",
    "الخدمات",
    "الأعمال",
    "من نحن",
    "تواصل معنا",
  ],
  email: "info@unitedsands.co",

  formTitle: "طلب الخدمة",
  formSubtitle: "تريد التحدث؟ أخبرنا عن مشروعك.",
  formContactInfo: "معلومات التواصل",
  formName: "الاسم واللقب",
  formCompany: "اسم الشركة",
  formEmail: "البريد الإلكتروني",
  formDescription: "وصف المشروع",
  formServicesQ: "ما الخدمات التي تحتاجها؟",
  formServices: [
    { id: "infrastructure", label: "دعم البنية التحتية" },
    { id: "consulting", label: "الاستشارات والتوريد" },
    { id: "strategic", label: "شراكة استراتيجية" },
    { id: "industrial", label: "الابتكار الصناعي" },
    { id: "itot", label: "استشارات IT/OT" },
    { id: "fullscale", label: "مشاريع متكاملة" },
  ],
  formMeetingQ: "متى يمكننا عقد اجتماعنا التفصيلي؟",
  formMeeting: [
    { id: "immediately", label: "فوراً" },
    { id: "1-3-months", label: "خلال 1–3 أشهر" },
    { id: "next-quarter", label: "الربع القادم" },
  ],
  formTimelineQ: "الجدول الزمني المتوقع للمشروع",
  formTimeline: [
    { id: "urgent", label: "عاجل" },
    { id: "within-month", label: "خلال الشهر" },
    { id: "no-rush", label: "دون استعجال" },
  ],
  formHeardQ: "كيف سمعت عنا؟",
  formHeard: [
    { id: "social", label: "وسائل التواصل الاجتماعي" },
    { id: "referral", label: "توصية" },
    { id: "search", label: "محرك بحث" },
    { id: "events", label: "فعاليات / إعلام" },
  ],
  formSubmit: "إرسال الطلب",
  formSending: "جارٍ الإرسال…",
  formSuccessTitle: "تم استلام طلبك",
  formSuccessBody: "شكراً لك — سيتواصل معك فريقنا قريباً.",
  formError: "حدث خطأ ما. يُرجى المحاولة مجدداً.",
  formClose: "إغلاق",
  formEmailInvalid: "يُرجى إدخال بريد إلكتروني صحيح.",

  aboutEyebrow: "قصتنا",
  aboutTitle: "لماذا يهمّ أن نكون سعوديي المنشأ",
  aboutBody:
    "شركة استشارات تقنية سعودية المنشأ، متوائمة مع رؤية 2030 — ملمّة باللوائح المحلية، متجذّرة في الفهم الثقافي ومعرفة أصحاب المصلحة، ومهندَسة للإنجاز. صفحة «من نحن» الكاملة قادمة قريباً.",
  aboutBack: "العودة إلى الرئيسية",

  valueChainEyebrow: "سلسلة القيمة الرقمية",
  valueChainTitle: "نخدمك في كل خطوة",
  valueChainBody:
    "من الرؤية والاستراتيجية مروراً ببنية الأنظمة والتكامل والأمن السيبراني وصولاً إلى التحسين التنبئي — نسير معك في كل خطوة من رحلة التحول الرقمي. صفحة سلسلة القيمة الكاملة قادمة قريباً.",
  valueChainBack: "العودة إلى الرئيسية",
};

export const messages: Record<Lang, Messages> = { en, ar };

// English labels for an option id — used when building the team email so it
// always reads in English regardless of the visitor's selected language.
export function enLabel(
  group: "formServices" | "formMeeting" | "formTimeline" | "formHeard",
  id: string,
): string {
  return en[group].find((o) => o.id === id)?.label ?? id;
}
