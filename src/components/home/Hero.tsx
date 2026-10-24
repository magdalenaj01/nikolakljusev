
"use client";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const slides = [
    {
        src: "/images/kljusev-historic.jpg",
        mk: "Историски моменти",
        en: "Historical moments",
        position: "center",
    },
    {
        src: "/images/nikola-kljusev-portrait.jpg",
        mk: "Никола Кљусев",
        en: "Nikola Kljusev",
        position: "center",
    },
    {
        src: "/images/fondacija1.jpg",
        mk: "Активности на фондацијата",
        en: "Foundation activities",
        position: "center",
    },
    {
        src: "/images/fondacija2.jpg",
        mk: "Фондација Никола Кљусев",
        en: "Nikola Kljusev Foundation",
        position: "center",
    },
    {
        src: "/images/knigi.jpg",
        mk: "Книжевно наследство",
        en: "Literary heritage",
        position: "center",
    },
    {
        src: "/images/rakopis.jpg",
        mk: "Ракописи и документи",
        en: "Manuscripts and documents",
        position: "center",
    },
    {
        src: "/images/foundation-logo.jpg",
        mk: "Меморијален центар",
        en: "Memorial Centre",
        position: "center",
    },
];

export default function Hero({
                                 locale,
                             }: {
    locale: Locale;
}) {
    const [active, setActive] = useState(0);
    const reducedMotion = useReducedMotion();
    const isMk = locale === "mk";

    // Automatic slideshow
    useEffect(() => {
        const timer = window.setInterval(() => {
            setActive((current) => (current + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section
            className="
        relative isolate min-h-[670px]
        overflow-hidden bg-[#F8F5F1]
        text-[#302C2E]
        lg:min-h-[740px]
      "
        >
            {/* Light background details */}
            <div
                className="
          pointer-events-none absolute
          -left-40 top-10
          h-[500px] w-[500px]
          rounded-full bg-[#A52E37]/[0.05]
          blur-[110px]
        "
            />

            {/* Right-side image slider */}
            <div
                className="
          absolute inset-x-0 bottom-0 top-[35%]
          overflow-hidden
          md:inset-y-0 md:left-[45%] md:right-0
        "
            >
                <AnimatePresence initial={false} mode="sync">
                    {slides.map(
                        (slide, index) =>
                            index === active && (
                                <motion.div
                                    key={slide.src}
                                    className="absolute inset-0"
                                    initial={{
                                        opacity: 0,
                                        scale: reducedMotion ? 1 : 1.07,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        opacity: {
                                            duration: reducedMotion ? 0 : 1.3,
                                        },
                                        scale: {
                                            duration: reducedMotion ? 0 : 6,
                                            ease: "easeOut",
                                        },
                                    }}
                                >
                                    <Image
                                        src={slide.src}
                                        alt={isMk ? slide.mk : slide.en}
                                        fill
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 55vw"
                                        className="object-contain"
                                        style={{
                                            objectPosition: slide.position,
                                        }}
                                    />
                                </motion.div>
                            )
                    )}
                </AnimatePresence>

                {/* Soft fade between image and content */}
                <div
                    className="
            pointer-events-none absolute inset-0
            bg-gradient-to-b
            from-[#F8F5F1] via-transparent to-[#F8F5F1]/20
            md:bg-gradient-to-r
            md:from-[#F8F5F1]
            md:via-[#F8F5F1]/20
            md:to-transparent
          "
                />
            </div>

            {/* Content */}
            <div
                className="
          container-wide relative z-10
          mx-auto flex min-h-[670px]
          items-start pt-14 pb-20
          lg:min-h-[740px] lg:pt-20
        "
            >
                <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: reducedMotion ? 0 : 0.85,
                        ease: "easeOut",
                    }}
                    className="
            relative z-10
            w-full max-w-[640px]
            rounded-[28px]
            border border-white/70
            bg-white/70
            p-7
            shadow-[0_20px_65px_rgba(80,45,45,0.07)]
            backdrop-blur-xl
            sm:p-10 lg:p-12
          "
                >
                    {/* Foundation title */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.15,
                        }}
                        className="
              mb-3 text-[clamp(1.2rem,2.3vw,2rem)]
              font-semibold uppercase
              tracking-[0.18em] text-[#40373B]
            "
                    >
                        {isMk ? "ФОНДАЦИЈА" : "FOUNDATION"}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.85,
                            delay: 0.25,
                        }}
                        className="
              heading-serif
              text-[clamp(2.8rem,5.1vw,5.5rem)]
              font-medium leading-[1.06]
              tracking-[-0.055em]
              text-[#A52E37]
            "
                    >
                        {isMk
                            ? "„НИКОЛА КЉУСЕВ“"
                            : "“NIKOLA KLJUSEV”"}
                    </motion.h1>

                    {/* Accent line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 85 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.55,
                        }}
                        className="my-7 h-[3px] rounded-full bg-[#A52E37]"
                    />

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.55,
                        }}
                        className="
              max-w-[500px]
              text-[15px] leading-8
              text-[#655D60]
              sm:text-[17px]
            "
                    >
                        {isMk
                            ? "Меморијален центар посветен на зачувувањето и промовирањето на историското, научното и културното наследство на академик Никола Кљусев."
                            : "A memorial centre dedicated to preserving and promoting the historical, scientific and cultural legacy of academician Nikola Kljusev."}
                    </motion.p>

                    {/* Modern glass buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.7,
                        }}
                        className="mt-9 flex flex-wrap gap-3"
                    >
                        <Link
                            href={`/${locale}/about`}
                            className="
                group inline-flex items-center
                justify-center gap-3 rounded-full
                bg-[#A52E37] px-7 py-3.5
                text-sm font-semibold text-white
                shadow-[0_8px_25px_rgba(165,46,55,0.18)]
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-[#89232E]
                hover:shadow-[0_14px_35px_rgba(165,46,55,0.24)]
              "
                        >
                            {isMk ? "За фондацијата" : "About the foundation"}
                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>

                        <Link
                            href={`/${locale}/activities`}
                            className="
                group inline-flex items-center
                justify-center gap-3 rounded-full
                border border-[#A52E37]/20
                bg-white/60 px-7 py-3.5
                text-sm font-semibold text-[#922D39]
                shadow-sm backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-[#A52E37]/40
                hover:bg-white/90
                hover:shadow-lg
              "
                        >
                            {isMk ? "Активности" : "Activities"}
                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={
                    reducedMotion
                        ? {}
                        : { y: [0, 6, 0] }
                }
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          pointer-events-none absolute bottom-8
          left-[5%] z-20
          hidden items-center gap-3
          text-xs font-medium uppercase
          tracking-widest text-[#8A777A]
          md:flex
        "
            >
                <ArrowDown size={17} />
                {isMk ? "Истражете повеќе" : "Explore more"}
            </motion.div>
        </section>
    );
}
