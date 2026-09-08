import { UkHeader, UkFooter } from "@/components/uk-chrome";

// UK-region chrome layout. /uk lives outside the (main) group, so it does not
// inherit the US header/footer - it renders compliant UK chrome with no
// medicine references or US weight-loss drug links.
export default function UkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UkHeader />
      <main className="flex-1">{children}</main>
      <UkFooter />
    </>
  );
}
