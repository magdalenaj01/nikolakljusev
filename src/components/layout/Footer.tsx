
import Link from "next/link";
import {
    navItems,
    translations,
    type Locale,
} from "@/lib/i18n";

export default function Footer({
                                   locale,
                               }: {
    locale: Locale;
}) {
    const t = translations[locale];

    return (
        <footer className="bg-[#202126] text-white">
            <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">

                {/* Foundation Information */}
                <div>
                    <div className="mb-5 font-serif text-3xl">
                        Никола Кљусев
                        <span className="text-[#ca4a55]">.</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    {navItems.map((n) => (
                        <Link
                            key={n.key}
                            href={`/${locale}${n.href}`}
                            className="text-[#d6cecb] hover:text-white"
                        >
                            {t[n.key]}
                        </Link>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="text-sm text-[#d6cecb]">
                    {t.address}

                    <p className="mt-3">
                        <a href="mailto:info@nikolakljusev.org.mk">
                            info@nikolakljusev.org.mk
                        </a>
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="container-wide border-t border-white/15 py-5 text-xs text-[#bcb4b1]">
                © {new Date().getFullYear()} {t.foundation}
            </div>
        </footer>
    );
}
