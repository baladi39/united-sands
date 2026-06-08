"use client";

import { LanguageProvider } from "@/lib/i18n/language-context";
import { RequestProjectProvider } from "@/lib/request-project-context";
import RequestModal from "@/components/request-project/request-modal";

// App-wide client providers. Mounts the Request Project modal once so any
// "Request Project" button anywhere on the site can open the same form.
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <RequestProjectProvider>
        {children}
        <RequestModal />
      </RequestProjectProvider>
    </LanguageProvider>
  );
}
