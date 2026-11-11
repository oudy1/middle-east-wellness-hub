import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SearchableResource } from '@/lib/resourceFinderData';

/** Opens a search result inside the app (no full page reload) or in a new tab when external. */
export function useOpenResource() {
  const navigate = useNavigate();
  return useCallback(
    (resource: SearchableResource) => {
      if (resource.isExternal) {
        window.open(resource.url, '_blank', 'noopener,noreferrer');
        return;
      }
      navigate(resource.url);
      if (resource.anchor) {
        setTimeout(() => {
          document.getElementById(resource.anchor!)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    [navigate]
  );
}
