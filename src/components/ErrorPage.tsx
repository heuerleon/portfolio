import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ErrorPage() {
  const t = useTranslations("ErrorPage");

  return (
    <>
      <h1>{t("heading")}</h1>
      <p>
        <Link href="/">{t("returnHome")}</Link>
      </p>
    </>
  );
}
