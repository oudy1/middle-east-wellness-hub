// Scadding Court newcomer healthcare workshop (Newcomer and Refugee Health
// Education Initiative). Shown until the end of the event day in Toronto.
export const NEWCOMER_WORKSHOP = {
  dateIso: "2026-11-19",
  registerUrl: "https://forms.gle/cfQVzbssWp2fTJdo7",
  en: {
    title: "Newcomer Healthcare Workshop",
    date: "Thursday, November 19, 2026",
    time: "3:00 PM to 5:00 PM",
    place: "Scadding Court Community Centre, 707 Dundas St W, Toronto",
    summary:
      "A free, friendly workshop for newcomers and refugees: how OHIP and IFHP coverage work, how to find a family doctor or walk-in clinic, and where to get help in your language.",
  },
  ar: {
    title: "ورشة الرعاية الصحية للقادمين الجدد",
    date: "الخميس 19 نوفمبر 2026",
    time: "3:00 إلى 5:00 مساءً",
    place: "مركز سكادينغ كورت المجتمعي، 707 شارع دانداس الغربي، تورونتو",
    summary:
      "ورشة مجانية وودّية للقادمين الجدد واللاجئين: كيف تعمل تغطية OHIP وIFHP، وكيف تجد طبيب أسرة أو عيادة بدون موعد، وأين تحصل على المساعدة بلغتك.",
  },
};

export const isNewcomerWorkshopUpcoming = (now: Date = new Date()) => {
  const torontoToday = now.toLocaleDateString("en-CA", { timeZone: "America/Toronto" });
  return torontoToday <= NEWCOMER_WORKSHOP.dateIso;
};
