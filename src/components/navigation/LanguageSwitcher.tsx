
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({
                                             locale,
                                         }: {
    locale: Locale;
}) {
    const path = usePathname();

    const getLocalePath = (newLocale: Locale) => {
        const result = path.replace(
            /^\/(mk|en)(?=\/|$)/,
            `/${newLocale}`
        );

        return result === path ? `/${newLocale}` : result;
    };

    return (
        <div
            className="
        flex items-center gap-1
        rounded-full
        border border-[#A52E37]/10
        bg-white/65 p-1
        shadow-[0_4px_18px_rgba(60,30,30,0.04)]
        backdrop-blur-xl
      "
            aria-label="Select language"
        >
            {(["mk", "en"] as const).map((lang) => {
                const active = locale === lang;

                return (
                    <Link
                        key={lang}
                        href={getLocalePath(lang)}
                        hrefLang={lang}
                        aria-current={active ? "page" : undefined}
                        className={`
              flex h-8 min-w-9 items-center justify-center
              rounded-full px-2
              text-[11px] font-semibold
              tracking-wider
              transition-all duration-300
              ${
                            active
                                ? "bg-[#A52E37] text-white shadow-[0_3px_10px_rgba(165,46,55,0.18)]"
                                : "text-[#70676A] hover:bg-[#A52E37]/10 hover:text-[#A52E37]"
                        }
            `}
                    >
                        {lang.toUpperCase()}
                    </Link>
                );
            })}
        </div>
    );
}
