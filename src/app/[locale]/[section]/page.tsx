
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { db } from "@/lib/db";
import {
    categoryKeys,
    isLocale,
    translations,
} from "@/lib/i18n";

import PostCard from "@/components/posts/PostCard";
import SectionReveal from "@/components/animations/SectionReveal";

export const dynamic = "force-dynamic";

export default async function Section({
                                          params,
                                      }: {
    params: Promise<{ locale: string; section: string }>;
}) {
    const { locale, section } = await params;

    if (
        !isLocale(locale) ||
        !categoryKeys.includes(
            section as (typeof categoryKeys)[number]
        )
    ) {
        notFound();
    }

    const key = section as (typeof categoryKeys)[number];
    const t = translations[locale];
    const isMk = locale === "mk";

    const posts = await db.post.findMany({
        where: {
            category: key,
            published: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main className="min-h-screen bg-[#FAF8F5] text-[#302C2E]">

            {/* Editorial page header */}
            <section className="relative isolate overflow-hidden border-b border-[#A52E37]/10 bg-[#F7F3EF]">
                {/* Background accents */}
                <div className="pointer-events-none absolute -right-32 -top-52 h-[560px] w-[560px] rounded-full border border-[#A52E37]/10" />

                <div className="pointer-events-none absolute -right-16 -top-32 h-[450px] w-[450px] rounded-full border border-[#A52E37]/10" />

                <div className="pointer-events-none absolute right-[15%] top-[-130px] h-[400px] w-[400px] rounded-full bg-[#A52E37]/[0.035] blur-[90px]" />

                <div className="container-wide relative z-10 py-20 md:py-28">

                    <SectionReveal>
                        {/* Breadcrumb */}
                        <div className="mb-10 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#8B7A7D]">
                            <Link
                                href={`/${locale}`}
                                className="transition-colors hover:text-[#A52E37]"
                            >
                                {isMk ? "Почетна" : "Home"}
                            </Link>

                            <span className="h-1 w-1 rounded-full bg-[#A52E37]" />

                            <span className="text-[#A52E37]">
                {t[key]}
              </span>
                        </div>

                        {/* Foundation eyebrow */}
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-[2px] w-11 bg-[#A52E37]" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A52E37]">
                {t.foundation}
              </span>
                        </div>

                        {/* Title */}
                        <h1 className="heading-serif max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[1.08] tracking-[-0.055em] text-[#302C2E]">
                            {t[key]}
                        </h1>

                        {/* Accent line */}
                        <div className="mt-9 h-[2px] w-24 bg-[#A52E37]" />

                        {/* Description */}
                        <p className="mt-8 max-w-2xl text-base leading-8 text-[#766D70] md:text-lg">
                            {t.latestDesc}
                        </p>

                        {/* Return home */}
                        <Link
                            href={`/${locale}`}
                            className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#A52E37] transition-all hover:gap-4"
                        >
                            <ArrowLeft size={17} />
                            {isMk ? "Назад кон почетна" : "Back to home"}
                        </Link>
                    </SectionReveal>
                </div>
            </section>

            {/* Posts section */}
            <section className="container-wide relative py-20 md:py-28">

                {/* Heading row */}
                <SectionReveal>
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A52E37]">
                                {isMk ? "Архива на фондацијата" : "Foundation archive"}
                            </p>

                            <h2 className="heading-serif text-3xl leading-tight text-[#302C2E] md:text-5xl">
                                {isMk ? "Најнови објави" : "Latest publications"}
                            </h2>
                        </div>

                        <span className="rounded-full border border-[#A52E37]/15 bg-white/60 px-5 py-2.5 text-xs font-semibold text-[#8D3540] shadow-sm backdrop-blur-xl">
              {posts.length}{" "}
                            {isMk
                                ? posts.length === 1
                                    ? "објава"
                                    : "објави"
                                : posts.length === 1
                                    ? "publication"
                                    : "publications"}
            </span>
                    </div>
                </SectionReveal>

                {/* Posts grid */}
                {posts.length > 0 ? (
                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, index) => (
                            <SectionReveal
                                key={post.id}
                                delay={Math.min(index * 0.08, 0.32)}
                            >
                                <div className="group h-full transition-all duration-500 hover:-translate-y-2">
                                    <PostCard locale={locale} post={post} />
                                </div>
                            </SectionReveal>
                        ))}
                    </div>
                ) : (
                    <SectionReveal>
                        <div className="relative overflow-hidden rounded-[30px] border border-[#A52E37]/10 bg-white/65 px-8 py-20 text-center shadow-[0_20px_60px_rgba(80,40,40,0.04)] backdrop-blur-xl">
                            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#A52E37]/[0.04] blur-3xl" />

                            <div className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A52E37]/15 bg-[#A52E37]/[0.06]">
                                <ArrowUpRight size={27} className="text-[#A52E37]" />
                            </div>

                            <h3 className="heading-serif relative text-2xl text-[#302C2E] md:text-3xl">
                                {isMk
                                    ? "Наскоро нови содржини"
                                    : "New content coming soon"}
                            </h3>

                            <p className="relative mx-auto mt-4 max-w-lg text-sm leading-7 text-[#786F72]">
                                {t.noPosts}
                            </p>

                            <Link
                                href={`/${locale}`}
                                className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-[#A52E37]/20 bg-white/75 px-6 py-3 text-sm font-semibold text-[#A52E37] transition-all duration-300 hover:-translate-y-1 hover:bg-[#A52E37] hover:text-white"
                            >
                                {isMk ? "Почетна страница" : "Homepage"}
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </SectionReveal>
                )}
            </section>
        </main>
    );
}
