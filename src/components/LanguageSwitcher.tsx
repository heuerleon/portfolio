"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const other = locale === "en" ? "ko" : "en";
  const t = useTranslations("LanguageSwitcher");

  return (
    <Link href={pathname} locale={other} className="lang-switcher">
      {t("label")}
    </Link>
  );
}
