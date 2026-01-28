"use client";

import { useLocale } from "next-intl";
import { setLocale } from "@/lib/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ChangeLangProps {
  styles?: string;
}

export default function ChangeLang({ styles }: ChangeLangProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isArabic = locale === "ar";

  const handleChangeLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    startTransition(async () => {
      await setLocale(newLocale);
      // Soft refresh to update server components (html lang/dir) without full reload
      router.refresh();
    });
  };

  return (
    // <button
    //   onClick={handleChangeLanguage}
    //   disabled={isPending}
    //   className="px-4 py-2 bg-[#41ab5d] text-white rounded hover:bg-[#238b45] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    // >
    //   {isPending ? "Changing..." : locale === "en" ? "العربية" : "English"}
    // </button>
    <Button
      onClick={handleChangeLanguage}
      disabled={isPending}
      //className={`disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${styles}`}
      className={`
        disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold
        ${isArabic ? "font-arabic text-right" : "font-english text-left"}
        ${styles}
      `}
    >
      {isPending ? "Changing..." : locale === "en" ? "العربية" : "English"}
    </Button>
  );
}
