import { useEffect } from 'react';

type SEOHeadProps = {
  title: string;
  description: string;
  titleAr?: string;
  descriptionAr?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  /** Path-only canonical (e.g. "/about"); combined with site origin. */
  path?: string;
  /** JSON-LD structured data object (or array of objects). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Override active language. Defaults to <html lang="..."> attribute. */
  lang?: 'en' | 'ar';
};

const SITE_ORIGIN = 'https://www.projectshams.com';
const DEFAULT_OG = '/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png';

export const SEOHead = ({
  title,
  description,
  titleAr,
  descriptionAr,
  keywords,
  ogImage = DEFAULT_OG,
  canonicalUrl,
  path,
  jsonLd,
  lang,
}: SEOHeadProps) => {
  useEffect(() => {
    const activeLang =
      lang || (document.documentElement.getAttribute('lang') as 'en' | 'ar') || 'en';
    const isArabic = activeLang === 'ar';

    const resolvedTitle = isArabic && titleAr ? titleAr : title;
    const resolvedDescription =
      isArabic && descriptionAr ? descriptionAr : description;

    document.title = resolvedTitle;

    const setMeta = (name: string, content: string, asProperty = false) => {
      const attr = asProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', resolvedDescription);
    if (keywords) setMeta('keywords', keywords);

    setMeta('og:title', resolvedTitle, true);
    setMeta('og:description', resolvedDescription, true);
    setMeta('og:image', ogImage.startsWith('http') ? ogImage : `${SITE_ORIGIN}${ogImage}`, true);
    setMeta('og:type', 'website', true);
    setMeta('og:locale', isArabic ? 'ar_AR' : 'en_CA', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', resolvedTitle);
    setMeta('twitter:description', resolvedDescription);
    setMeta('twitter:image', ogImage.startsWith('http') ? ogImage : `${SITE_ORIGIN}${ogImage}`);

    // Canonical
    const canonicalHref =
      canonicalUrl ||
      (path ? `${SITE_ORIGIN}${path}` : `${SITE_ORIGIN}${window.location.pathname}`);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);
    setMeta('og:url', canonicalHref, true);

    // hreflang alternates (English/Arabic share the same URL; lang switched client-side)
    const setAlternate = (hreflang: string, href: string) => {
      let link = document.querySelector(
        `link[rel="alternate"][hreflang="${hreflang}"]`,
      );
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };
    setAlternate('en', canonicalHref);
    setAlternate('ar', canonicalHref);
    setAlternate('x-default', canonicalHref);

    // JSON-LD structured data
    const jsonLdId = 'seohead-jsonld';
    const existing = document.getElementById(jsonLdId);
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = jsonLdId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const stale = document.getElementById(jsonLdId);
      if (stale) stale.remove();
    };
  }, [title, description, titleAr, descriptionAr, keywords, ogImage, canonicalUrl, path, jsonLd, lang]);

  return null;
};
