
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";

// Generate static routes for supported languages
export function generateStaticParams() {
    return [
        { locale: "mk" },
        { locale: "en" },
    ];
}

// Layout for Macedonian and English pages
export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Get current locale from route parameters
    const { locale } = await params;

    // Validate supported locale
    if (!isLocale(locale)) {
        notFound();
    }

    return (
        <>
            {/* Navigation */}
            <Navbar locale={locale} />

            {/* Main Page Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <Footer locale={locale} />
        </>
    );
}
