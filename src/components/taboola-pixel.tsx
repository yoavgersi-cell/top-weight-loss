"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { TABOOLA_PIXEL_ID } from "@/lib/taboola";

// Taboola (Realize) pixel - the "Manually install the Taboola Pixel" option
// in the Realize campaign wizard. Loads the universal pixel once and fires a
// page_view on every client-side navigation, mirroring what the inline
// snippet does on a full page load. Renders nothing until an ID is set.
export function TaboolaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!TABOOLA_PIXEL_ID || typeof window === "undefined") return;
    // The inline snippet fires the first page_view itself; this covers the
    // App Router's soft navigations, which never reload the document.
    if (!window.__tfaFirstPageViewDone) {
      window.__tfaFirstPageViewDone = true;
      return;
    }
    window._tfa = window._tfa || [];
    window._tfa.push({ notify: "event", name: "page_view", id: Number(TABOOLA_PIXEL_ID) });
  }, [pathname]);

  if (!TABOOLA_PIXEL_ID) return null;

  return (
    <Script
      id="taboola-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window._tfa = window._tfa || [];
          window._tfa.push({notify: 'event', name: 'page_view', id: ${Number(TABOOLA_PIXEL_ID)}});
          !function (t, f, a, x) {
            if (!document.getElementById(x)) {
              t.async = 1;t.src = a;t.id=x;f.parentNode.insertBefore(t, f);
            }
          }(document.createElement('script'),
          document.getElementsByTagName('script')[0],
          '//cdn.taboola.com/libtrc/unip/${Number(TABOOLA_PIXEL_ID)}/tfa.js',
          'tb_tfa_script');
        `,
      }}
    />
  );
}
