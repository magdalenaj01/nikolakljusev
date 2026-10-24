
import { notFound } from "next/navigation";
import { isLocale, translations } from "@/lib/i18n";
import {
    Mail,
    MapPin,
    Phone,
    ExternalLink,
} from "lucide-react";

export default async function Contact({
                                          params,
                                      }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!isLocale(locale)) {
        notFound();
    }

    const t = translations[locale];

    // Google Maps - Memorial Center Nikola Kljusev
    const mapUrl =
        "https://maps.app.goo.gl/Ash9btaeHagYz3vN6";

    const mapEmbedUrl =
        "https://maps.google.com/maps?q=41.9934206,21.4315239&z=17&output=embed";

    return (
        <section className="container-wide min-h-[70vh] py-16 md:py-24">

            {/* Page Heading */}
            <div className="mb-12">


            </div>

            {/* Contact Cards */}
            <div className="grid gap-6 lg:grid-cols-2">

                {/* ===============================
            LOCATION AND GOOGLE MAPS
        =============================== */}
                <div className="flex flex-col overflow-hidden rounded-3xl border border-[#eadbd6] bg-[#f9eeeb] p-6 md:p-8">

                    {/* Location Heading */}
                    <div className="mb-6 flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#a52e37]">
                            <MapPin size={27} strokeWidth={1.7} />
                        </div>

                        <div>
                            <h2 className="font-serif text-2xl text-[#302c2e] md:text-3xl">
                                {locale === "mk"
                                    ? "Нашата локација"
                                    : "Our Location"}
                            </h2>

                            <p className="mt-2 text-sm text-[#716662]">
                                {t.address}
                            </p>
                        </div>
                    </div>

                    {/* Google Maps */}
                    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-[#e9dfda] md:h-[360px]">
                        <iframe
                            src={mapEmbedUrl}
                            title={
                                locale === "mk"
                                    ? "Локација на Меморијалниот центар Никола Кљусев"
                                    : "Nikola Kljusev Memorial Centre Location"
                            }
                            className="h-full w-full border-0"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* Open Maps Link */}
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              mt-6 inline-flex items-center
              justify-center gap-3
              rounded-xl bg-[#a52e37]
              px-6 py-4
              text-sm font-semibold text-white
              transition-colors duration-200
              hover:bg-[#84252c]
            "
                    >
                        <MapPin size={18} />

                        {locale === "mk"
                            ? "Отвори во Google Maps"
                            : "Open in Google Maps"}

                        <ExternalLink size={16} />
                    </a>
                </div>

                {/* ===============================
            CONTACT INFORMATION
        =============================== */}
                <div className="flex flex-col rounded-3xl border border-[#eadbd6] bg-[#fff6f2] p-6 md:p-10">

                    {/* Contact Heading */}
                    <div className="mb-10">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#a52e37]">
                            <Mail size={27} strokeWidth={1.7} />
                        </div>

                        <h2 className="font-serif text-3xl text-[#302c2e] md:text-4xl">
                            {t.write}
                        </h2>

                        <p className="mt-4 text-base leading-7 text-muted">
                            {locale === "mk"
                                ? "За информации, прашања и соработка, слободно контактирајте нè."
                                : "For information, questions or collaboration, feel free to contact us."}
                        </p>
                    </div>

                    {/* Email */}
                    <div className="border-t border-[#e6d7d1] py-7">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5e3df] text-[#a52e37]">
                                <Mail size={21} strokeWidth={1.7} />
                            </div>

                            <div className="min-w-0">
                                <p className="mb-2 text-sm text-[#81726e]">
                                    {locale === "mk"
                                        ? "Електронска пошта"
                                        : "Email Address"}
                                </p>

                                <a
                                    href="mailto:info@nikolakljusev.org.mk"
                                    className="break-all text-base font-medium text-[#302c2e] transition-colors hover:text-[#a52e37]"
                                >
                                    info@nikolakljusev.org.mk
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="border-t border-[#e6d7d1] py-7">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f5e3df] text-[#a52e37]">
                                <Phone size={21} strokeWidth={1.7} />
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-[#81726e]">
                                    {locale === "mk"
                                        ? "Телефонски број"
                                        : "Phone Number"}
                                </p>

                                <a
                                    href="tel:+38978479776"
                                    className="text-lg font-medium text-[#302c2e] transition-colors hover:text-[#a52e37]"
                                >
                                    +389 78 479 776
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
