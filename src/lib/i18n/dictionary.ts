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
  name: string; // sector window label (title-only on the homepage)
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

  // Menu overlay
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
    { name: "Smart Cities & Urban Platforms" },
    { name: "Industrial, Manufacturing & Logistics" },
    { name: "Environment, ESG & Resilience" },
    { name: "Utilities, Energy & Water" },
    { name: "Transport, Mobility & Mega-Infrastructure" },
    { name: "Satellite Imagery & Geospatial Data" },
  ],

  menuLinks: [
    "Home",
    "Who We Are",
    "Approach",
    "Services",
    "Sectors",
    "Portfolio",
    "Partners",
    "Contact Us",
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
  navRequest: "اطلب مشروعاً",
  langEn: "EN",
  langAr: "AR",
  openMenu: "افتح القائمة",
  closeMenu: "أغلق القائمة",

  loading: "جارٍ التحميل",

  heroEyebrow: "الرمال المتحدة",
  heroHeadline: "نَصنع\nالمستقبل",
  heroSub:
    "شركة استشارات تقنية سعودية المنشأ، تهندس الحقبة القادمة من المدن الذكية والتوائم الرقمية والذكاء الجغرافي المكاني.",
  ourStory: "قصتنا",
  scrollHint: "مرّر للاكتشاف",

  scrollStatement: "المستقبل لا يحدث لنا، بل نُصمّمه.",

  statsTitle: "لماذا تختار\nالرمال المتحدة؟",
  statsTagline: "قلبٌ سعودي بنبضٍ عالمي. نحن مُكاملو المدن الذكية للغد.",
  statsIntro:
    "الرمال المتحدة هي المُكامل الاستراتيجي للمدن الذكية في المملكة، مكرّسة لتسريع إنجاز المشاريع العملاقة ورؤية 2030 عبر التحول الرقمي الشامل.",
  // أرقام مبدئية — بانتظار تأكيد العميل؛ ليست نهائية.
  stats: [
    {
      value: "12",
      unit: "مدينة",
      label: "نطاق الانتشار",
      copy: "عمليات نشر فاعلة عبر أهم المناطق الصناعية والمراكز الحضرية الاستراتيجية في السعودية.",
    },
    {
      value: "97%",
      unit: "",
      label: "نجاح العملاء",
      copy: "رضا العملاء مقاسٌ عبر التجارب الأولية والارتباطات طويلة الأمد وبرامج التحول.",
    },
    {
      value: "+15",
      unit: "سنة",
      label: "خبرة مجتمعة",
      copy: "قيادةٌ تحمل عقوداً من الخبرة في الجغرافيا المكانية والتوائم الرقمية والبنية الذكية.",
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
      copy: "من مراكز القيادة على مستوى المدينة إلى برامج التقاط الواقع الميدانية.",
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
    { name: "المدن الذكية والمنصّات الحضرية" },
    { name: "الصناعة والتصنيع والخدمات اللوجستية" },
    { name: "البيئة والحوكمة والمرونة" },
    { name: "المرافق والطاقة والمياه" },
    { name: "النقل والتنقّل والبنية التحتية الكبرى" },
    { name: "صور الأقمار الصناعية والبيانات الجغرافية المكانية" },
  ],

  menuLinks: [
    "الرئيسية",
    "من نحن",
    "منهجيتنا",
    "الخدمات",
    "القطاعات",
    "الأعمال",
    "الشركاء",
    "تواصل معنا",
  ],
  email: "info@unitedsands.co",

  formTitle: "اطلب مشروعاً",
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
