
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";

type NavItemProps = {
    locale: Locale;
    href: string;
    label: string;
    active: boolean;
    onClick?: () => void;
};

export default function NavItem({
                                    locale,
                                    href,
                                    label,
                                    active,
                                    onClick,
                                }: NavItemProps) {
    return (
        <Link
            href={`/${locale}${href}`}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className={`
        group relative inline-flex items-center
        justify-center whitespace-nowrap
        rounded-full px-3.5 py-2.5
        text-[13px] font-medium
        transition-all duration-300 ease-out
        hover:-translate-y-[1px]
        hover:bg-white/70
        hover:text-[#922C38]
        hover:shadow-[0_5px_20px_rgba(143,41,53,0.08)]
        ${
                active
                    ? "bg-[#922C38]/[0.07] text-[#922C38]"
                    : "text-[#4B4548]"
            }
      `}
        >
            {/* Glass highlight */}
            <span
                className="
          pointer-events-none absolute inset-0
          rounded-full border border-white/0
          transition-all duration-300
          group-hover:border-white/90
        "
            />

            <span className="relative z-10">{label}</span>

            {/* Active indicator */}
            {active && (
                <motion.span
                    layoutId="activeNavIndicator"
                    className="
            absolute bottom-[4px] left-1/2
            h-[2px] w-5 -translate-x-1/2
            rounded-full bg-[#A52E37]
          "
                    transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                    }}
                />
            )}
        </Link>
    );
}
