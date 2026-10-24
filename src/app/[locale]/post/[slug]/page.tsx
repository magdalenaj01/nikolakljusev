
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    BookOpen,
    FolderOpen,
    Landmark,
} from "lucide-react";

import { db } from "@/lib/db";
import {
    isLocale,
    translations,
    categoryKeys,
} from "@/lib/i18n";

import SectionReveal from "@/components/animations/SectionReveal";

export const dynamic = "force-dynamic";

const categoryIcons = {
    activities: Landmark,
    projects: FolderOpen,
    literature: BookOpen,
};

export default async function Article({
                                          params,
                                      }: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;

    if (!isLocale(locale)) notFound();

    const post = await db.post.findUnique({
        where: { slug },
    });

    if (!post || !post.published) notFound();

    const t = translations[locale];
    const isMk = locale === "mk";

    const title = isMk ? post.titleMk : post.titleEn;
    const excerpt = isMk ? post.excerptMk : post.excerptEn;
    const content = isMk ? post.contentMk : post.contentEn;

    const category =
        categoryKeys.find((c) => c === post.category) ||
        "activities";

    const CategoryIcon = categoryIcons[category];

    const date = new Date(post.createdAt);

    const formattedDate = new Intl.DateTimeFormat(
        isMk ? "mk-MK" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
    ).format(date);

    return (
        <main className="min-h-screen bg-[#FAF8F5] text-[#302C2E]">

            {/* Header / Article introduction */}
            <section className="relative isolate overflow-hidden border-b border-[#A52E37]/10 bg-[#F8F4F0]">
                {/* Decorative elements */}
                <div className="pointer-events-none absolute -right-40 -top-40 h-[530px] w-[530px] rounded-full border border-[#A52E37]/10" />

                <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-[#A52E37]/10" />

                <div className="pointer-events-none absolute right-[15%] top-0 h-[380px] w-[380px] rounded-full bg-[#A52E37]/[0.035] blur-[90px]" />

                <div className="container-wide relative z-10 py-16 md:py-24">
                    <SectionReveal>
                        {/* Back link */}
                        <Link
                            href={`/${locale}/${category}`}
                            className="group mb-12 inline-flex items-center gap-3 rounded-full border border-[#A52E37]/15 bg-white/65 px-5 py-3 text-sm font-semibold text-[#922D39] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:bg-white hover:shadow-md"
                        >
                            <ArrowLeft
                                size={17}
                                className="transition-transform duration-300 group-hover:-translate-x-1"
                            />
                            {t.back}
                        </Link>

                        {/* Category / date */}
                        <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#A52E37]/15 bg-white/65 px-4 py-2 text-xs font-semibold text-[#A52E37] backdrop-blur-xl">
                <CategoryIcon size={15} />
                  {t[category]}
              </span>

                            <span className="flex items-center gap-2 text-sm text-[#8B7B7D]">
                <CalendarDays
                    size={16}
                    className="text-[#A52E37]/70"
                />
                <time dateTime={date.toISOString()}>
                  {formattedDate}
                </time>
              </span>
                        </div>

                        {/* Title */}
                        <h1 className="heading-serif max-w-[1050px] text-[clamp(2.7rem,6vw,6rem)] leading-[1.08] tracking-[-0.05em] text-[#302C2E]">
                            {title}
                            <span className="text-[#A52E37]"></span>
                        </h1>

                        {/* Accent line */}
                        <div className="mt-9 h-[3px] w-24 rounded-full bg-[#A52E37]" />

                        {/* Excerpt */}
                        <p className="mt-8 max-w-[850px] text-lg leading-9 text-[#766C70] md:text-xl">
                            {excerpt}
                        </p>
                    </SectionReveal>
                </div>
            </section>

            {/* Article image */}
            {post.imageUrl && (
                <section className="container-wide relative z-10 mt-12 md:mt-16">
                    <SectionReveal>
                        <div className="relative aspect-[16/9] max-h-[640px] overflow-hidden rounded-[28px] border border-white/80 bg-[#EEE7E2] shadow-[0_25px_70px_rgba(70,35,38,0.09)]">
                            <Image
                                src={post.imageUrl}
                                alt={title}
                                fill
                                priority
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    </SectionReveal>
                </section>
            )}

            {/* Article body */}
            <section className="container-wide py-16 md:py-24">
                <div className="mx-auto max-w-[900px]">
                    <SectionReveal>
                        <article className="relative overflow-hidden rounded-[28px] border border-[#EDE2DE] bg-white/75 p-7 shadow-[0_20px_65px_rgba(80,40,40,0.045)] backdrop-blur-xl sm:p-11 md:p-16">

                            {/* Preserve line breaks from editor */}
                            <div className="prose-content whitespace-pre-wrap break-words text-[16px] leading-[1.95] text-[#51494C] md:text-[17px]">
                                {content}
                            </div>
                        </article>
                    </SectionReveal>

                    {/* Back to category */}
                    <SectionReveal delay={0.1}>
                        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#E7DAD6] pt-9">
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#A52E37]">
                                    {isMk ? "Продолжете со читање" : "Continue exploring"}
                                </p>

                                <h2 className="heading-serif text-2xl text-[#302C2E] md:text-3xl">
                                    {t[category]}
                                </h2>
                            </div>

                            <Link
                                href={`/${locale}/${category}`}
                                className="group inline-flex items-center gap-3 rounded-full border border-[#A52E37]/20 bg-white/75 px-6 py-3.5 text-sm font-semibold text-[#A52E37] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#A52E37] hover:text-white hover:shadow-lg"
                            >
                                {isMk ? "Сите објави" : "All publications"}
                                <ArrowUpRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </main>
    );
}
