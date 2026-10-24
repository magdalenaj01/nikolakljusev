
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    CalendarDays,
    BookOpen,
    Landmark,
    FolderOpen,
} from "lucide-react";

import { translations, type Locale } from "@/lib/i18n";

type PostPreview = {
    id: string;
    slug: string;
    category: string;
    titleMk: string;
    titleEn: string;
    excerptMk: string;
    excerptEn: string;
    imageUrl: string | null;
    createdAt: Date | string;
};

type Category = "activities" | "projects" | "literature";

const categoryIcons = {
    activities: Landmark,
    projects: FolderOpen,
    literature: BookOpen,
};

export default function PostCard({
                                     post,
                                     locale,
                                 }: {
    post: PostPreview;
    locale: Locale;
}) {
    const t = translations[locale];
    const reducedMotion = useReducedMotion();

    const category: Category =
        post.category === "projects" ||
        post.category === "literature"
            ? post.category
            : "activities";

    const CategoryIcon = categoryIcons[category];

    const isMk = locale === "mk";

    const title = isMk ? post.titleMk : post.titleEn;
    const excerpt = isMk ? post.excerptMk : post.excerptEn;

    const date = new Date(post.createdAt);

    const formattedDate = Number.isNaN(date.getTime())
        ? ""
        : new Intl.DateTimeFormat(isMk ? "mk-MK" : "en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);

    return (
        <motion.article
            whileHover={reducedMotion ? undefined : { y: -7 }}
            transition={{
                duration: 0.35,
                ease: "easeOut",
            }}
            className="
        group relative flex h-full flex-col
        overflow-hidden rounded-[24px]
        border border-[#E9DEDA]
        bg-white/85
        shadow-[0_8px_30px_rgba(72,39,43,0.045)]
        backdrop-blur-xl
        transition-[border-color,box-shadow] duration-500
        hover:border-[#A52E37]/25
        hover:shadow-[0_25px_65px_rgba(83,43,46,0.12)]
      "
        >
            <Link
                href={`/${locale}/post/${post.slug}`}
                className="flex h-full flex-col"
                aria-label={`${isMk ? "Прочитај" : "Read"}: ${title}`}
            >
                {/* Image area */}
                <div
                    className="
            relative aspect-[1.45/1]
            overflow-hidden bg-[#F0E9E4]
          "
                >
                    {post.imageUrl ? (
                        <Image
                            src={post.imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="
                object-cover
                transition-transform duration-[850ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-[1.07]
              "
                            unoptimized
                        />
                    ) : (
                        <div
                            className="
                absolute inset-0 flex items-center
                justify-center
                bg-gradient-to-br
                from-[#F8F4F0]
                via-[#EBDFDA]
                to-[#E4CFCE]
              "
                        >
                            <div
                                className="
                  absolute h-52 w-52
                  rounded-full
                  border border-[#A52E37]/15
                "
                            />

                            <div
                                className="
                  absolute h-36 w-36
                  rounded-full
                  border border-[#A52E37]/15
                "
                            />

                            <CategoryIcon
                                size={58}
                                strokeWidth={1}
                                className="
                  relative z-10
                  text-[#A52E37]/65
                  transition-transform duration-700
                  group-hover:scale-110
                "
                            />
                        </div>
                    )}

                    {/* Soft image gradient */}
                    <div
                        className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t
              from-[#251A1D]/25
              via-transparent
              to-transparent
            "
                    />

                    {/* Glass category label */}
                    <div
                        className="
              absolute left-5 top-5
              flex items-center gap-2
              rounded-full
              border border-white/65
              bg-white/85
              px-4 py-2
              shadow-[0_5px_18px_rgba(40,25,25,0.07)]
              backdrop-blur-xl
            "
                    >
                        <CategoryIcon
                            size={14}
                            className="text-[#A52E37]"
                        />

                        <span
                            className="
                text-[10px] font-bold uppercase
                tracking-[0.12em]
                text-[#8D3540]
              "
                        >
              {t[category]}
            </span>
                    </div>

                    {/* Hover arrow */}
                    <div
                        className="
              absolute bottom-5 right-5
              flex h-11 w-11
              translate-y-3 items-center
              justify-center rounded-full
              border border-white/60
              bg-white/85 text-[#A52E37]
              opacity-0 backdrop-blur-xl
              transition-all duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
            "
                    >
                        <ArrowUpRight size={19} />
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                    {/* Date */}
                    {formattedDate && (
                        <div
                            className="
                mb-5 flex items-center gap-2
                text-xs font-medium
                text-[#8C7D7D]
              "
                        >
                            <CalendarDays
                                size={15}
                                className="text-[#A52E37]/70"
                            />
                            <time dateTime={date.toISOString()}>
                                {formattedDate}
                            </time>
                        </div>
                    )}

                    {/* Title */}
                    <h3
                        className="
              heading-serif
              mb-4 line-clamp-2
              text-[25px] leading-[1.18]
              tracking-[-0.035em]
              text-[#302C2E]
              transition-colors duration-300
              group-hover:text-[#A52E37]
            "
                    >
                        {title}
                    </h3>

                    {/* Description */}
                    <p
                        className="
              mb-7 line-clamp-3
              text-sm leading-7
              text-[#786F72]
            "
                    >
                        {excerpt}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto">
                        <div
                            className="
                mb-5 h-px w-full
                bg-gradient-to-r
                from-[#A52E37]/20
                via-[#E8DAD6]
                to-transparent
              "
                        />

                        <div className="flex items-center justify-between">
              <span
                  className="
                  text-[13px] font-semibold
                  text-[#A52E37]
                "
              >
                {t.read}
              </span>

                            <span
                                className="
                  flex h-9 w-9 items-center
                  justify-center rounded-full
                  border border-[#A52E37]/15
                  bg-[#A52E37]/[0.05]
                  text-[#A52E37]
                  transition-all duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                  group-hover:border-[#A52E37]
                  group-hover:bg-[#A52E37]
                  group-hover:text-white
                "
                            >
                <ArrowUpRight size={17} />
              </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
