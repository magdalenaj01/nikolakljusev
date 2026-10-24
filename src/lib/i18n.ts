
export type Locale = "mk" | "en";

export const locales: Locale[] = ["mk", "en"];

export const isLocale = (x: string): x is Locale =>
    locales.includes(x as Locale);

// ============================================
// TRANSLATIONS
// ============================================

export const translations = {
    // Macedonian
    mk: {
        // Navigation
        home: "Почетна",
        about: "За нас",
        activities: "Активности",
        projects: "Проекти",
        literature: "Литература",
        contact: "Контакт",

        // Foundation
        foundation: "Фондација „Никола Кљусев“",
        memorial: "Меморијален центар",

        // Hero Section
        heroKicker: "МИНАТОТО НÈ ИНСПИРИРА. ИДНИНАТА НÈ ОБЕДИНУВА.",
        heroTitle: "Наследство што продолжува да инспирира.",
        heroDescription:
            "Место каде што историјата, културата и идеите на академик Никола Кљусев живеат низ новите генерации.",

        discover: "Откриј ја нашата приказна",
        explore: "Истражи активности",
        scroll: "ИСТРАЖИ",

        // Identity
        identity: "Сеќавањето има иднина.",
        identityText:
            "Го чуваме делото на академикот, универзитетски професор, поет и прв премиер на независна Република Македонија.",

        // Mission
        mission: "Нашата мисија",
        missionText:
            "Да го зачуваме историското и интелектуалното наследство и да ги инспирираме новите генерации на знаење, слобода и солидарност.",

        // Vision
        vision: "Нашата визија",
        visionText:
            "Заедница на образовани, инспирирани и поврзани луѓе.",

        // News & Posts
        latest: "Приказни и новости",
        latestDesc:
            "Активности, проекти и книжевно наследство на едно место.",

        read: "Прочитај повеќе",
        all: "Погледни ги сите",
        noPosts: "Сè уште нема објави во оваа категорија.",

        // About Page
        aboutTitle: "Наследство што го обликува утрешниот ден.",
        aboutIntro:
            "Фондацијата „Никола Кљусев“ го одбележува животот и работата на академик, политичар, универзитетски професор, поет и прв премиер на независна Република Македонија.",

        // Biography
        bio: "Никола Кљусев",
        bioText:
            "Никола Кљусев беше академик, економист и прв претседател на Владата на независна Република Македонија (1991–1992). Неговиот научен и книжевен опус опфаќа трудови, поезија, есеи и проза.",

        history:
            "Меморијалниот центар е основан во 2008 година и придонесува за разбирање на современата македонска историја.",

        // Contact Page
        address: "Ул. Македонија, Скопје",
        write: "Контакт",

        // Post Details
        updated: "Објавено",
        back: "Назад кон објавите",
        missing: "Објавата не е пронајдена",
    },

    // English
    en: {
        // Navigation
        home: "Home",
        about: "About us",
        activities: "Activities",
        projects: "Projects",
        literature: "Literature",
        contact: "Contact",

        // Foundation
        foundation: "Nikola Kljusev Foundation",
        memorial: "Memorial Centre",

        // Hero Section
        heroKicker: "INSPIRED BY THE PAST. UNITED FOR THE FUTURE.",
        heroTitle: "A legacy that continues to inspire.",
        heroDescription:
            "A place where the history, culture and ideas of academician Nikola Kljusev live on through new generations.",

        discover: "Discover our story",
        explore: "Explore activities",
        scroll: "EXPLORE",

        // Identity
        identity: "Memory has a future.",
        identityText:
            "Honouring the legacy of the academician, university professor, poet and first Prime Minister of independent Macedonia.",

        // Mission
        mission: "Our mission",
        missionText:
            "To preserve historical and intellectual heritage and inspire new generations through knowledge, freedom and solidarity.",

        // Vision
        vision: "Our vision",
        visionText:
            "A community of educated, inspired and connected people.",

        // News & Posts
        latest: "Stories & updates",
        latestDesc:
            "Activities, projects and literary heritage in one place.",

        read: "Read more",
        all: "Explore all",
        noPosts:
            "No posts have been published in this category yet.",

        // About Page
        aboutTitle: "A legacy shaping tomorrow.",
        aboutIntro:
            "The Nikola Kljusev Foundation commemorates the life and work of an academician, politician, university professor, poet and first Prime Minister of independent Macedonia.",

        // Biography
        bio: "Nikola Kljusev",
        bioText:
            "Nikola Kljusev was an academician, economist and the first Prime Minister of independent Macedonia (1991–1992). His academic and literary work includes research, poetry, essays and prose.",

        history:
            "The Memorial Centre was founded in 2008 and contributes to the understanding of modern Macedonian history.",

        // Contact Page
        contactTitle: "Let’s stay in touch.",
        address: "Makedonija Street, Skopje",
        write: "Get in touch",

        // Footer
        footer: "History. Culture. Future.",

        // Post Details
        updated: "Published",
        back: "Back to articles",
        missing: "Post not found",
    },
} as const;

// ============================================
// NAVIGATION
// ============================================

export const navItems = [
    {
        key: "home",
        href: "",
    },
    {
        key: "about",
        href: "/about",
    },
    {
        key: "activities",
        href: "/activities",
    },
    {
        key: "projects",
        href: "/projects",
    },
    {
        key: "literature",
        href: "/literature",
    },
    {
        key: "contact",
        href: "/contact",
    },
] as const;

// ============================================
// POST CATEGORIES
// ============================================

export const categoryKeys = [
    "activities",
    "projects",
    "literature",
] as const;
