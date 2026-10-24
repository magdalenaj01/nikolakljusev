
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
    ArrowUpRight,
    BookOpen,
    Landmark,
    ArrowRight,
} from "lucide-react";

import Hero from "@/components/home/Hero";
import PostCard from "@/components/posts/PostCard";

import { db } from "@/lib/db";
import { isLocale, translations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Home({
                                       params,
                                   }: {
    params: Promise<{ locale: string }>;
}) {
    // Get and validate locale
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const t = translations[locale];

    // Fetch latest published posts
    const posts = await db.post.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
    });

    return (
        <>
            {/* =====================================
          HERO SECTION
      ===================================== */}
            <Hero locale={locale} />

            {/* =====================================
          FOUNDATION INTRODUCTION
      ===================================== */}
            <section className="border-b border-[#e7e0da] bg-[#f6f3ed]">
                <div
                    className="
            container-wide grid gap-12 py-24
            lg:grid-cols-[.85fr_1.15fr]
            lg:gap-20 lg:py-32
          "
                >
                    {/* Left Column */}
                    <div>
                        <p className="eyebrow red-label mb-8">
                            {t.memorial} / 2008
                        </p>

                        <h2 className="heading-serif text-5xl leading-tight md:text-7xl">
                            {locale === "mk" ? (
                                <>
                                    Минатото нè обврзува.
                                    <br />
                                    <em className="text-[#a52e37]">
                                        Иднината нè повикува.
                                    </em>
                                </>
                            ) : (
                                <>
                                    The past gives purpose.
                                    <br />
                                    <em className="text-[#a52e37]">
                                        The future calls.
                                    </em>
                                </>
                            )}
                        </h2>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col justify-center">
                        <p className="max-w-xl text-xl leading-[1.9] text-[#514b47]">
                            {t.identityText}
                        </p>

                        {/* Mission and Vision */}
                        <div
                            className="
                mt-9 grid gap-7
                border-t border-[#d5cbc5]
                pt-9 sm:grid-cols-2
              "
                        >
                            {/* Mission */}
                            <div>
                                <Landmark
                                    className="mb-5 text-[#a52e37]"
                                    size={27}
                                />

                                <h3 className="font-serif text-3xl">
                                    {t.mission}
                                </h3>

                                <p className="mt-3 leading-7 text-muted">
                                    {t.missionText}
                                </p>
                            </div>

                            {/* Vision */}
                            <div>
                                <BookOpen
                                    className="mb-5 text-[#a52e37]"
                                    size={27}
                                />

                                <h3 className="font-serif text-3xl">
                                    {t.vision}
                                </h3>

                                <p className="mt-3 leading-7 text-muted">
                                    {t.visionText}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================
          NIKOLA KLJUSEV - BIOGRAPHY
      ===================================== */}
            <section className="bg-[#fffdf9] py-24 lg:py-32">
                <div
                    className="
            container-wide grid items-center
            gap-12 lg:grid-cols-2 lg:gap-24
          "
                >
                    {/* Portrait Image */}
                    <div className="relative">
                        {/* Decorative Border */}
                        <div
                            className="
                absolute -left-5 -top-5
                h-full w-full
                border border-[#bd8b8d]
              "
                        />

                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#ded8d1]">
                            <Image
                                src="/images/nikola-kljusev-portrait.jpg"
                                alt="Академик Никола Кљусев"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Historical Date */}
                        <div
                            className="
                absolute -bottom-5 right-[-12px]
                bg-[#a52e37] px-7 py-5
                font-serif text-2xl text-white
              "
                        >
                            1991 — 1992
                        </div>
                    </div>

                    {/* Biography Content */}
                    <div>
                        {/* Section Label */}
                        <p className="eyebrow red-label mb-7">
                            {locale === "mk"
                                ? "Личност и дело"
                                : "Life and work"}
                        </p>

                        {/* Biography Title */}
                        <h2 className="heading-serif max-w-xl text-5xl md:text-7xl">
                            {locale === "mk"
                                ? "Никола Кљусев"
                                : "Nikola Kljusev"}
                        </h2>

                        {/* Biography Description */}
                        <p className="mt-8 max-w-xl text-lg leading-9 text-muted">
                            {t.bioText}
                        </p>

                        {/* Memorial Centre History */}
                        <p className="mt-5 max-w-xl leading-8 text-muted">
                            {t.history}
                        </p>

                        {/* About Link */}
                        <Link
                            href={`/${locale}/about`}
                            className="
                mt-9 inline-flex items-center gap-3
                border-b border-[#a52e37] pb-2
                font-bold text-[#a52e37]
                transition-all hover:gap-5
              "
                        >
                            {t.discover}
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================
          LATEST NEWS AND POSTS
      ===================================== */}
            <section className="bg-[#ede9e3] py-24 lg:py-28">
                <div className="container-wide">
                    {/* Section Header */}
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-7">
                        <div>
                            {/* Section Label */}
                            <p className="eyebrow red-label mb-5">
                                {t.foundation}
                            </p>

                            {/* Section Title */}
                            <h2 className="heading-serif text-5xl md:text-7xl">
                                {t.latest}
                            </h2>

                            {/* Section Description */}
                            <p className="mt-5 text-muted">
                                {t.latestDesc}
                            </p>
                        </div>

                        {/* View All Link */}
                        <Link
                            href={`/${locale}/activities`}
                            className="btn-outline"
                        >
                            {t.all}
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid gap-7 md:grid-cols-3">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                locale={locale}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================
          LITERARY HERITAGE SECTION
      ===================================== */}
            <section className="bg-[#25252a] py-20 text-white">
                <div
                    className="
            container-wide flex flex-wrap
            items-center justify-between gap-8
          "
                >
                    {/* Content */}
                    <div>
                        {/* Section Label */}
                        <p className="eyebrow mb-5 text-[#d28a8d]">
                            {locale === "mk"
                                ? "Книжевно наследство"
                                : "Literary heritage"}
                        </p>

                        {/* Section Title */}
                        <h2 className="heading-serif max-w-3xl text-4xl md:text-6xl">
                            {locale === "mk"
                                ? "Зборовите остануваат. Делото продолжува."
                                : "Words endure. The legacy lives on."}
                        </h2>
                    </div>

                    {/* Literature Link */}
                    <Link
                        href={`/${locale}/literature`}
                        aria-label={t.literature}
                        className="
              inline-flex h-16 w-16
              items-center justify-center
              rounded-full bg-[#a52e37]
              transition-transform hover:rotate-45
            "
                    >
                        <ArrowRight size={25} />
                    </Link>
                </div>
            </section>
        </>
    );
}
