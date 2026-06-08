// Bilingual (EN / AR) copy for everything currently on the live homepage +
// the global Request Project form. Arabic is a first machine-assisted draft —
// it should be reviewed by Reina / a native speaker before launch.
//
// Option ids (services / timelines / etc.) are language-independent and stable;
// only their labels are localized. The email payload always reports the English
// labels so the team reads a consistent language regardless of visitor locale.

export type Lang = "en" | "ar";

export type Option = { id: string; label: string };

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
