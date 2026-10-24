
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
    navItems,
    translations,
    type Locale,
} from "@/lib/i18n";

import NavItem from "./NavItem";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Navbar({
                                   locale,
                               }: {
    locale: Locale;
}) {
    const path = usePathname();
    const t = translations[locale];

    const [scrolled, setScrolled] = useState(false);

    // Detect page scrolling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.header
            initial={{
                y: -60,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.55,
                ease: "easeOut",
            }}
            className={`
        sticky top-0 z-50
        border-b border-[#8F2935]/10
        backdrop-blur-2xl
        transition-all duration-500
        ${
                scrolled
                    ? "bg-white/90 shadow-[0_8px_35px_rgba(80,30,35,0.07)]"
                    : "bg-[#FFFCFA]/80"
            }
      `}
        >
            <div
                className={`
          container-wide mx-auto
          flex items-center justify-between gap-4
          transition-all duration-500
          ${scrolled ? "h-[64px]" : "h-[72px]"}
        `}
            >
                {/* ============================
            LOGO
        ============================ */}
                <Link
                    href={`/${locale}`}
                    className="group flex min-w-0 shrink-0 items-center"
                    aria-label="Foundation Nikola Kljusev"
                >
                    <Image
                        src="/images/foundation-logo.jpg"
                        alt="Фондација Никола Кљусев"
                        width={190}
                        height={104}
                        priority
                        className={`
              w-auto object-contain
              transition-all duration-500
              group-hover:scale-[1.03]
              ${scrolled ? "h-[48px]" : "h-[55px]"}
            `}
                    />
                </Link>

                {/* ============================
            DESKTOP NAVIGATION
        ============================ */}
                <nav className="hidden items-center gap-1.5 lg:flex">
                    {navItems.map((item) => {
                        const itemPath = `/${locale}${item.href}`;

                        const isActive =
                            path === itemPath ||
                            (item.href !== "" &&
                                path.startsWith(`${itemPath}/`));

                        return (
                            <NavItem
                                key={item.key}
                                locale={locale}
                                href={item.href}
                                label={t[item.key]}
                                active={isActive}
                            />
                        );
                    })}
                </nav>

                {/* ============================
            LANGUAGE AND MOBILE MENU
        ============================ */}
                <div className="flex shrink-0 items-center gap-3">
                    {/* Language Switcher */}
                    <LanguageSwitcher locale={locale} />

                    {/* Mobile Navigation */}
                    <MobileMenu
                        locale={locale}
                        pathname={path}
                    />
                </div>
            </div>
        </motion.header>
    );
}
