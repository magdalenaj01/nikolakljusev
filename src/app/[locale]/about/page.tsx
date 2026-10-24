import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, translations } from "@/lib/i18n";

// Text is kept here so the About page can be updated without changing
// translation keys used by other pages.
const pageContent = {
    mk: {
        introduction:
            "Фондацијата „Никола Кљусев“ е меморијален и културно-образовен центар посветен на животот, делото и наследството на академик Никола Кљусев - економист, професор, писател и прв претседател на Владата на независна Република Македонија.",
        foundationLabel: "01 / ЗА ФОНДАЦИЈАТА",
        foundationTitle: "Место каде што наследството продолжува да живее",
        foundationText: [
            "Меморијалниот центар „Никола Кљусев“ е основан во 2008 година. Неговата работа е посветена на зачувување и претставување на научното, книжевното и државничкото наследство на академикот, како и на неговата улога во современата македонска историја.",
            "Во досегашното работење, Фондацијата организирала литературни конкурси за ученици, меѓу кои „Творам за Македонија“, јавни предавања и културно-образовни настани. Преку овие активности таа создава простор за учење, творештво и разговор за важни општествени теми.",
            "Фондацијата го доближува делото на Никола Кљусев до новите генерации и го негува интересот за историјата, културата, образованието и општествената одговорност.",
        ],
        biographyLabel: "02 / БИОГРАФИЈА",
        biographyTitle: "Академик Никола Кљусев",
        biographySubtitle: "Економист · Универзитетски професор · Академик · Државник · Писател",
        biographyText: [
            "Никола Кљусев (1927–2008) е роден во Штип. Дипломирал на Економскиот факултет во Белград во 1953 година, а во 1964 година докторирал во областа на економските науки. Својот професионален пат го посветил на економските истражувања и високото образование.",
            "Бил редовен професор и декан на Економскиот факултет во Скопје, а во 1988 година станал член на Македонската академија на науките и уметностите (МАНУ). Автор е на научни трудови и книги од областа на економскиот развој и инвестициите.",
            "Од 1991 до 1992 година бил претседател на првата Влада на независна Република Македонија. Покрај научната и државничката работа, оставил значаен книжевен опус составен од поезија, есеи и проза.",
        ],
        portraitAlt: "Академик Никола Кљусев",
        portraitCaption: "Никола Кљусев (1927–2008)",
    },
    en: {
        introduction:
            "The Nikola Kljusev Foundation is a memorial, cultural and educational centre dedicated to the life, work and legacy of academician Nikola Kljusev — an economist, professor, writer and the first Prime Minister of independent Macedonia.",
        foundationLabel: "01 / THE FOUNDATION",
        foundationTitle: "A place where a legacy lives on",
        foundationText: [
            "The Nikola Kljusev Memorial Centre was established in 2008. Its work focuses on preserving and presenting the academic, literary and public legacy of Nikola Kljusev, including his role in modern Macedonian history.",
            "Over the years, the Foundation has organized literary competitions for students, including ‘I Create for Macedonia’, public lectures and cultural and educational events. These activities have encouraged learning, creativity and discussion of important social issues.",
            "The Foundation introduces new generations to Kljusev’s work and fosters interest in history, culture, education and social responsibility.",
        ],
        biographyLabel: "02 / BIOGRAPHY",
        biographyTitle: "Academician Nikola Kljusev",
        biographySubtitle: "Economist · University professor · Academician · Statesman · Writer",
        biographyText: [
            "Nikola Kljusev (1927–2008) was born in Štip. He graduated from the Faculty of Economics in Belgrade in 1953 and earned a doctorate in economics in 1964. He devoted much of his professional career to economic research and higher education.",
            "He was a full professor and dean of the Faculty of Economics in Skopje and became a member of the Macedonian Academy of Sciences and Arts (MANU) in 1988. He authored academic publications and books on economic development and investment.",
            "From 1991 to 1992, he served as the head of the first government of independent Macedonia. Alongside his academic and public work, he also wrote poetry, essays and prose.",
        ],
        portraitAlt: "Academician Nikola Kljusev",
        portraitCaption: "Nikola Kljusev (1927–2008)",
    },
} as const;

export default async function About({
                                        params,
                                    }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const t = translations[locale];
    const content = pageContent[locale];

    return (
        <>
            {/* PAGE INTRODUCTION */}
            <section className="border-b border-[#dfd3cb] bg-[#eee8e1] py-20 md:py-28">
                <div className="container-wide">
                    <p className="eyebrow text-[#a52e37]">{t.about}</p>

                    <h1 className="heading-serif mt-6 max-w-5xl text-5xl text-[#302c2e] sm:text-6xl md:text-7xl">
                        {t.foundation}
                    </h1>

                    <p className="mt-8 max-w-4xl text-lg leading-8 text-[#635e5c] md:text-xl md:leading-9">
                        {content.introduction}
                    </p>
                </div>
            </section>

            {/* ABOUT THE FOUNDATION: EDITORIAL LAYOUT, NO CARDS */}
            <section className="container-wide py-20 md:py-28">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
                    <div>
                        <p className="eyebrow text-[#a52e37]">
                            {content.foundationLabel}
                        </p>

                        <h2 className="heading-serif mt-6 max-w-lg text-4xl text-[#302c2e] md:text-5xl">
                            {content.foundationTitle}
                        </h2>

                        <div className="mt-8 h-[2px] w-16 bg-[#a52e37]" />
                    </div>

                    <div className="space-y-6 text-base leading-8 text-[#5f5957] md:text-lg md:leading-9">
                        {content.foundationText.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* BIOGRAPHY */}
            <section className="bg-[#f3e9e4] py-20 md:py-28">
                <div className="container-wide grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                    <figure className="lg:pt-4">
                        <div className="flex min-h-[310px] items-center justify-center border border-[#e4cfc7] bg-[#ead8cf] px-6 py-12">
                            <Image
                                src="/images/nikola-kljusev-portrait.jpg"
                                alt={content.portraitAlt}
                                width={270}
                                height={186}
                                sizes="270px"
                                className="h-auto w-full max-w-[270px]"
                            />
                        </div>

                        <figcaption className="mt-4 text-sm tracking-wide text-[#766963]">
                            {content.portraitCaption}
                        </figcaption>
                    </figure>

                    <div>
                        <p className="eyebrow text-[#a52e37]">
                            {content.biographyLabel}
                        </p>

                        <h2 className="heading-serif mt-6 text-4xl text-[#302c2e] md:text-5xl">
                            {content.biographyTitle}
                        </h2>

                        <p className="mt-5 text-sm font-medium leading-7 text-[#9b4245]">
                            {content.biographySubtitle}
                        </p>

                        <div className="mt-8 space-y-6 border-t border-[#d9c5bc] pt-8 text-base leading-8 text-[#5f5957] md:text-lg md:leading-9">
                            {content.biographyText.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
