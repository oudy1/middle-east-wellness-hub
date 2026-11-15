import routes from "../../content/chatbot-routes.json";

// Homepage cards link only by route key, so they can never point at a missing page.
export const HOME_ROUTES = routes as Record<string, string>;
export function homeRoute(key: string): string {
  const path = HOME_ROUTES[key];
  if (!path) throw new Error(`Unknown route key: ${key}`);
  return path;
}

export const HERO_LINKS = { primary: "resources", secondary: "about" } as const;
// Compact row under the hero: the four main destinations.
export const HERO_QUICK_KEYS = ["resources", "programs", "healthcare_workers", "research"] as const;
export const BENTO_KEYS = ["resources", "newcomer_initiative", "healthcare_workers", "mentorship", "research", "recordings"] as const;
export const JOURNEY_KEYS = ["educational_materials", "healthcare_workers", "programs"] as const;
