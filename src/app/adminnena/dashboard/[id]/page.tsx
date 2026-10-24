
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    FilePenLine,
    ShieldCheck,
    Languages,
} from "lucide-react";

import { getAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import PostEditor from "@/components/admin/PostEditor";
import SectionReveal from "@/components/animations/SectionReveal";

export const dynamic = "force-dynamic";

export default async function Edit({
                                       params,
                                   }: {
    params: Promise<{ id: string }>;
}) {
    const admin = await getAdmin();

    if (!admin) {
        redirect("/adminnena/login");
    }

    const { id } = await params;

    const post = await db.post.findUnique({
        where: { id },
    });

    if (!post) {
        notFound();
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5] text-[#302C2E]">

            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-48 top-10 h-[530px] w-[530px] rounded-full border border-[#A52E37]/10" />

            <div className="pointer-events-none absolute -right-24 top-24 h-[400px] w-[400px] rounded-full border border-[#A52E37]/10" />

            <div className="pointer-events-none absolute -left-40 top-[45%] h-[500px] w-[500px] rounded-full bg-[#A52E37]/[0.035] blur-[100px]" />

            <div className="container-wide relative z-10 py-12 md:py-16">

                <SectionReveal>
                    {/* Back navigation */}
                    <Link
                        href="/adminnena/dashboard"
                        className="group mb-10 inline-flex items-center gap-3 rounded-full border border-[#A52E37]/15 bg-white/70 px-5 py-3 text-sm font-semibold text-[#922D39] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 hover:bg-white hover:shadow-md"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />
                        Назад кон контролна табла
                    </Link>

                    {/* Page heading */}
                    <div className="mb-10">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-[2px] w-10 bg-[#A52E37]" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A52E37]">
                Администрација · Содржина
              </span>
                        </div>

                        <h1 className="heading-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.1] tracking-[-0.05em]">
                            Уреди <span className="text-[#A52E37]">објава.</span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-8 text-[#766C70]">
                            Измени го насловот, текстот, фотографијата или категоријата.
                            Промените ќе бидат видливи на веб-страницата откако ќе ја зачуваш објавата.
                        </p>
                    </div>
                </SectionReveal>

                {/* Information indicators */}
                <SectionReveal delay={0.08}>
                    <div className="mb-8 flex flex-wrap gap-3">

                        <div className="flex items-center gap-2 rounded-full border border-[#A52E37]/10 bg-white/75 px-4 py-2.5 text-xs font-medium text-[#766C70] shadow-sm backdrop-blur-xl">
                            <FilePenLine size={15} className="text-[#A52E37]" />
                            Уредување содржина
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-[#A52E37]/10 bg-white/75 px-4 py-2.5 text-xs font-medium text-[#766C70] shadow-sm backdrop-blur-xl">
                            <Languages size={15} className="text-[#A52E37]" />
                            Македонски / English
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-[#A52E37]/10 bg-white/75 px-4 py-2.5 text-xs font-medium text-[#766C70] shadow-sm backdrop-blur-xl">
                            <ShieldCheck size={15} className="text-[#A52E37]" />
                            Администраторски пристап
                        </div>

                    </div>
                </SectionReveal>

                {/* Editor glass container */}
                <SectionReveal delay={0.12}>
                    <div className="relative overflow-hidden rounded-[28px] border border-[#EADFDA] bg-white/80 p-5 shadow-[0_20px_70px_rgba(80,40,40,0.055)] backdrop-blur-2xl sm:p-8 lg:p-10">

                        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                        <div className="relative mb-8 border-b border-[#EDE2DE] pb-6">
                            <h2 className="heading-serif text-2xl text-[#302C2E]">
                                Податоци за објавата
                            </h2>

                            <p className="mt-2 text-sm leading-7 text-[#807578]">
                                Пополни ги или измени ги полињата подолу.
                            </p>
                        </div>

                        <PostEditor
                            id={id}
                            initial={{
                                slug: post.slug,
                                category: post.category,
                                titleMk: post.titleMk,
                                titleEn: post.titleEn,
                                excerptMk: post.excerptMk,
                                excerptEn: post.excerptEn,
                                contentMk: post.contentMk,
                                contentEn: post.contentEn,
                                imageUrl: post.imageUrl ?? "",
                                published: post.published,
                            }}
                        />
                    </div>
                </SectionReveal>
            </div>
        </main>
    );
}
