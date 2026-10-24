
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

import { getAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import LogoutButton from "@/components/admin/LogoutButton";
import DashboardContent from "@/components/admin/DashboardContent";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
    const admin = await getAdmin();

    if (!admin) {
        redirect("/adminnena/login");
    }

    const posts = await db.post.findMany({
        orderBy: { createdAt: "desc" },
    });

    // Convert dates to serializable strings for Client Component
    const serializedPosts = posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        category: post.category,
        titleMk: post.titleMk,
        titleEn: post.titleEn,
        imageUrl: post.imageUrl,
        published: post.published,
        createdAt: new Date(post.createdAt).toISOString(),
    }));

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#FAF8F5] text-[#302C2E]">

            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full border border-[#A52E37]/10" />

            <div className="pointer-events-none absolute -left-40 top-80 h-[480px] w-[480px] rounded-full bg-[#A52E37]/[0.035] blur-[100px]" />

            <div className="container-wide relative z-10 py-10 md:py-14">

                {/* Dashboard header */}
                <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-[2px] w-10 bg-[#A52E37]" />

                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A52E37]">
                Content Management
              </span>
                        </div>

                        <h1 className="heading-serif text-[clamp(2.8rem,5vw,4.6rem)] leading-[1.1] tracking-[-0.055em]">
                            Контролна <span className="text-[#A52E37]">табла</span>
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-[#766C70]">
                            Управувај со објавите, активностите, проектите и книжевното
                            наследство на Фондацијата „Никола Кљусев“.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/mk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full border border-[#A52E37]/15 bg-white/75 px-5 py-3 text-sm font-semibold text-[#922D39] shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                        >
                            Види ја страницата
                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </Link>

                        <LogoutButton />
                    </div>
                </div>

                {/* Admin indicator */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#A52E37]/10 bg-white/70 px-4 py-2 text-xs text-[#766C70] backdrop-blur-xl">
                    <ShieldCheck size={15} className="text-[#A52E37]" />
                    Администраторски пристап
                </div>

                {/* Interactive content */}
                <DashboardContent posts={serializedPosts} />
            </div>
        </main>
    );
}
