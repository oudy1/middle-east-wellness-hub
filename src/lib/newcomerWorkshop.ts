// "Healthcare Coverage & Access: A Newcomer's Guide" workshop with Scadding
// Court Community Centre (Newcomer and Refugee Health Education Initiative).
// This is the one shared record used by the homepage card, the Programs page,
// site search and the chatbot. Promotion stops after the event day in Toronto.
// Date, times, title, place and registration link come from content/events.json.

import { eventPhase, getEvent } from "./events";

export const NEWCOMER_WORKSHOP_EVENT = getEvent("newcomer-workshop-2026-11-19");
const EV = NEWCOMER_WORKSHOP_EVENT;

export const NEWCOMER_WORKSHOP_REGISTER_URL = EV.registrationUrl!;

const ADDRESS_EN = "707 Dundas Street West, Toronto, Ontario, Canada";
const VENUE_EN = "Scadding Court Community Centre";

export const NEWCOMER_WORKSHOP = {
  dateIso: EV.dateIso,
  // 3:00 to 5:00 PM in Toronto. Nov 19, 2026 is after the DST change, so EST (UTC-5).
  startUtc: EV.startUtc!,
  endUtc: EV.endUtc!,
  registerUrl: NEWCOMER_WORKSHOP_REGISTER_URL,
  learnMorePath: EV.detailsPath,
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(`${VENUE_EN}, ${ADDRESS_EN}`),
  en: {
    title: EV.en.title,
    organizer: "Project SHAMS in collaboration with Scadding Court Community Centre",
    date: EV.en.date,
    time: EV.en.time!,
    venue: VENUE_EN,
    address: ADDRESS_EN,
    place: EV.en.place,
    cost: "Free",
    format: "In-person healthcare education workshop",
    audience:
      "Newcomers, refugees, immigrant families and community members who want to understand Ontario's healthcare system.",
    summary:
      "A free, interactive workshop to help newcomers and refugees understand Ontario's healthcare system, learn about healthcare coverage, and find essential health and community services.",
    description:
      "Navigating healthcare in a new country can be challenging. Join Project SHAMS and Scadding Court Community Centre for a free, interactive workshop designed to help newcomers and refugees better understand Ontario's healthcare system, learn about healthcare coverage, and find essential health and community services.",
    topics: [
      "Understanding Ontario healthcare coverage, including OHIP and IFHP",
      "Applying for and renewing health cards",
      "Finding family doctors and walk-in clinics",
      "Understanding healthcare services and patient rights",
      "Accessing local healthcare and community resources",
      "Practical demonstrations of healthcare coverage applications",
      "Interactive activities and opportunities to ask questions",
    ],
  },
  ar: {
    title: EV.ar.title,
    organizer: "مشروع شمس بالتعاون مع مركز سكادينغ كورت المجتمعي",
    date: EV.ar.date,
    time: EV.ar.time!,
    venue: "مركز سكادينغ كورت المجتمعي",
    address: "707 شارع دونداس الغربي، تورونتو، أونتاريو، كندا",
    place: EV.ar.place,
    cost: "مجاناً",
    format: "ورشة تثقيف صحي حضورية",
    audience:
      "الوافدون الجدد واللاجئون وعائلات المهاجرين وأفراد المجتمع الراغبون في فهم نظام الرعاية الصحية في أونتاريو.",
    summary:
      "ورشة عمل مجانية وتفاعلية تساعد الوافدين الجدد واللاجئين على فهم نظام الرعاية الصحية في أونتاريو، والتعرّف على خيارات التغطية الصحية، والوصول إلى الخدمات الصحية والمجتمعية الأساسية.",
    description:
      "انضموا إلى مشروع شمس ومركز سكادينغ كورت المجتمعي في ورشة عمل مجانية وتفاعلية تهدف إلى مساعدة الوافدين الجدد واللاجئين على فهم نظام الرعاية الصحية في أونتاريو، والتعرّف على خيارات التغطية الصحية، وكيفية الوصول إلى الخدمات الصحية والمجتمعية الأساسية.",
    topics: [
      "التعرّف على التغطية الصحية في أونتاريو، بما في ذلك OHIP وIFHP",
      "كيفية التقديم للحصول على البطاقة الصحية وتجديدها",
      "البحث عن طبيب أسرة والوصول إلى العيادات دون موعد",
      "فهم الخدمات الصحية وحقوق المرضى",
      "التعرّف على الموارد الصحية والمجتمعية المحلية",
      "عروض تطبيقية حول إجراءات التغطية الصحية",
      "أنشطة تفاعلية وفرصة لطرح الأسئلة",
    ],
  },
};

/**
 * "upcoming" through the whole event day in Toronto. Afterwards "ended"
 * (registration closed) until SHAMS confirms the workshop took place or adds
 * a recording or recap, then "completed". The date passing alone never makes
 * it "completed".
 */
export type NewcomerWorkshopStatus = "upcoming" | "completed" | "ended";

export const newcomerWorkshopStatus = (now: Date = new Date()): NewcomerWorkshopStatus => {
  const phase = eventPhase(EV, now);
  if (phase === "upcoming") return "upcoming";
  return phase === "ended" || phase === "hidden" ? "ended" : "completed";
};

export const isNewcomerWorkshopUpcoming = (now: Date = new Date()) =>
  newcomerWorkshopStatus(now) === "upcoming";

const calendarDetails = () =>
  `${NEWCOMER_WORKSHOP.en.description} Free. Register: ${NEWCOMER_WORKSHOP.registerUrl}`;

/** Google Calendar link with fixed UTC times, so it shows 3 to 5 PM Toronto time in any time zone. */
export const NEWCOMER_WORKSHOP_GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent(`${NEWCOMER_WORKSHOP.en.title} (SHAMS Workshop)`) +
  `&dates=${NEWCOMER_WORKSHOP.startUtc}/${NEWCOMER_WORKSHOP.endUtc}` +
  "&ctz=America/Toronto" +
  "&details=" + encodeURIComponent(calendarDetails()) +
  "&location=" + encodeURIComponent(`${VENUE_EN}, ${ADDRESS_EN}`);

export const NEWCOMER_WORKSHOP_ICS_PATH = "/newcomer-workshop-2026-11-19.ics";

const icsEscape = (v: string) => v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** Calendar file contents; public/newcomer-workshop-2026-11-19.ics must match this exactly (checked by a test). */
export const buildNewcomerWorkshopIcs = () =>
  [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SHAMS//Newcomer Healthcare Workshop//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:newcomer-workshop-2026-11-19@projectshams.com",
    "DTSTAMP:20261115T120000Z",
    `DTSTART:${NEWCOMER_WORKSHOP.startUtc}`,
    `DTEND:${NEWCOMER_WORKSHOP.endUtc}`,
    `SUMMARY:${icsEscape(`${NEWCOMER_WORKSHOP.en.title} (SHAMS Workshop)`)}`,
    `DESCRIPTION:${icsEscape(calendarDetails())}`,
    `LOCATION:${icsEscape(`${VENUE_EN}, ${ADDRESS_EN}`)}`,
    `URL:${NEWCOMER_WORKSHOP.registerUrl}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
