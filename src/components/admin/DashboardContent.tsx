
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    FileText,
    FolderOpen,
    Landmark,
    Plus,
    Search,
    X,
} from "lucide-react";

import DeleteButton from "@/components/admin/DeleteButton";

type DashboardPost = {
    id: string;
    slug: string;
    category: string;
    titleMk: string;
    titleEn: string;
    imageUrl: string | null;
    published: boolean;
    createdAt: string;
};

type Props = {
    posts: DashboardPost[];
};

const categoryLabels: Record<string, string> = {
    activities: "Активности",
    projects: "Проекти",
    literature: "Дела од Никола Кљусев",
};

const categoryIcons = {
    activities: Landmark,
    projects: FolderOpen,
    literature: BookOpen,
};

export default function DashboardContent({ posts }: Props) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");

    const stats = useMemo(() => {
        return {
            total: posts.length,
            published: posts.filter((post) => post.published).length,
            drafts: posts.filter((post) => !post.published).length,
            categories: new Set(posts.map((post) => post.category)).size,
        };
    }, [posts]);

    const filteredPosts = useMemo(() => {
        const query = search.trim().toLocaleLowerCase();

        return posts.filter((post) => {
            const matchesSearch =
                !query ||
                post.titleMk.toLocaleLowerCase().includes(query) ||
                post.titleEn.toLocaleLowerCase().includes(query) ||
                post.slug.toLocaleLowerCase().includes(query);

            const matchesCategory =
                category === "all" || post.category === category;

            const matchesStatus =
                status === "all" ||
                (status === "published" && post.published) ||
                (status === "draft" && !post.published);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [posts, search, category, status]);

    const resetFilters = () => {
        setSearch("");
        setCategory("all");
        setStatus("all");
    };

    const statCards = [
        {
            label: "Вкупно објави",
            value: stats.total,
            icon: FileText,
            description: "Сите содржини",
        },
        {
            label: "Објавени",
            value: stats.published,
            icon: CheckCircle2,
            description: "Видливи на веб-страницата",
        },
        {
            label: "Нацрти",
            value: stats.drafts,
            icon: FileText,
            description: "Необјавени содржини",
        },
        {
            label: "Категории",
            value: stats.categories,
            icon: FolderOpen,
            description: "Со најмалку една објава",
        },
    ];

    return (
        <div className="space-y-9">

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="group relative overflow-hidden rounded-[22px] border border-[#EADFDA] bg-white/80 p-6 shadow-[0_10px_35px_rgba(80,40,40,0.035)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#A52E37]/25 hover:shadow-[0_20px_45px_rgba(80,40,40,0.075)]"
                        >
                            <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#786D71]">
                  {stat.label}
                </span>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A52E37]/[0.07] text-[#A52E37]">
                                    <Icon size={21} />
                                </div>
                            </div>

                            <p className="heading-serif text-5xl text-[#302C2E]">
                                {stat.value}
                            </p>

                            <p className="mt-3 text-xs text-[#94888B]">
                                {stat.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Posts management */}
            <section className="overflow-hidden rounded-[26px] border border-[#EADFDA] bg-white/80 shadow-[0_15px_55px_rgba(80,40,40,0.045)] backdrop-blur-xl">
                <div className="flex flex-wrap items-center justify-between gap-5 border-b border-[#EDE3DF] p-6 md:p-8">
                    <div>
                        <h2 className="heading-serif text-3xl text-[#302C2E]">
                            Управување со објави
                        </h2>

                        <p className="mt-2 text-sm text-[#817679]">
                            Објавените содржини автоматски се појавуваат во избраната категорија.
                        </p>
                    </div>

                    <Link
                        href="/adminnena/dashboard/new"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#A52E37] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(165,46,55,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#89232E] hover:shadow-lg"
                    >
                        <Plus size={18} />
                        Нова објава
                        <ArrowUpRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>

                {/* Filters */}
                <div className="grid gap-3 border-b border-[#EDE3DF] bg-[#FCFAF8]/70 p-5 md:grid-cols-[1fr_auto_auto] md:p-6">
                    <div className="relative">
                        <Search
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A52E37]/65"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Пребарај по наслов или URL..."
                            aria-label="Пребарај објави"
                            className="w-full rounded-xl border border-[#E9DEDA] bg-white/85 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-[#A52E37]/40 focus:ring-4 focus:ring-[#A52E37]/[0.05]"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        aria-label="Филтрирај по категорија"
                        className="rounded-xl border border-[#E9DEDA] bg-white/85 px-4 py-3 text-sm text-[#65595D] outline-none focus:border-[#A52E37]/40"
                    >
                        <option value="all">Сите категории</option>
                        <option value="activities">Активности</option>
                        <option value="projects">Проекти</option>
                        <option value="literature">Дела од Никола Кљусев</option>
                    </select>

                    <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        aria-label="Филтрирај по статус"
                        className="rounded-xl border border-[#E9DEDA] bg-white/85 px-4 py-3 text-sm text-[#65595D] outline-none focus:border-[#A52E37]/40"
                    >
                        <option value="all">Сите статуси</option>
                        <option value="published">Објавено</option>
                        <option value="draft">Нацрт</option>
                    </select>
                </div>

                {/* Results count */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                    <p className="text-xs text-[#817679]">
                        Прикажани <strong className="text-[#A52E37]">{filteredPosts.length}</strong> од {posts.length} објави
                    </p>

                    {(search || category !== "all" || status !== "all") && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#A52E37] transition hover:underline"
                        >
                            <X size={14} />
                            Исчисти филтри
                        </button>
                    )}
                </div>

                {/* Table */}
                {filteredPosts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[780px] text-left text-sm">
                            <thead>
                            <tr className="border-y border-[#EFE6E2] bg-[#F8F4F1] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8B7D80]">
                                <th className="px-6 py-4">Објава</th>
                                <th className="px-6 py-4">Категорија</th>
                                <th className="px-6 py-4">Датум</th>
                                <th className="px-6 py-4">Статус</th>
                                <th className="px-6 py-4 text-right">Акции</th>
                            </tr>
                            </thead>

                            <tbody>
                            {filteredPosts.map((post) => {
                                const categoryKey =
                                    post.category === "projects" ||
                                    post.category === "literature"
                                        ? post.category
                                        : "activities";

                                const CategoryIcon = categoryIcons[categoryKey];

                                const date = new Date(post.createdAt);

                                const formattedDate = Number.isNaN(date.getTime())
                                    ? "—"
                                    : new Intl.DateTimeFormat("mk-MK", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }).format(date);

                                return (
                                    <tr
                                        key={post.id}
                                        className="border-b border-[#F0E8E4] transition-colors hover:bg-[#FAF5F2]/75"
                                    >
                                        {/* Post */}
                                        <td className="px-6 py-5">
                                            <div className="flex min-w-[240px] items-center gap-4">
                                                <div className="flex h-14 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F0E6E2]">
                                                    {post.imageUrl ? (
                                                        <img
                                                            src={post.imageUrl}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <FileText
                                                            size={23}
                                                            className="text-[#A52E37]/50"
                                                        />
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="max-w-[260px] truncate font-semibold text-[#383034]">
                                                        {post.titleMk}
                                                    </p>

                                                    <p className="mt-1 max-w-[260px] truncate text-xs text-[#9C8D90]">
                                                        /post/{post.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-[#685D61]">
                          <CategoryIcon
                              size={15}
                              className="text-[#A52E37]"
                          />
                            {categoryLabels[categoryKey]}
                        </span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs text-[#817679]">
                          <CalendarDays size={15} />
                            {formattedDate}
                        </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-5">
                        <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                                post.published
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-amber-200 bg-amber-50 text-amber-700"
                            }`}
                        >
                          <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                  post.published
                                      ? "bg-emerald-500"
                                      : "bg-amber-500"
                              }`}
                          />

                            {post.published ? "Објавено" : "Нацрт"}
                        </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/adminnena/dashboard/${post.id}`}
                                                    className="rounded-full border border-[#A52E37]/15 bg-[#A52E37]/[0.05] px-4 py-2 text-xs font-semibold text-[#A52E37] transition hover:border-[#A52E37]/40 hover:bg-[#A52E37]/10"
                                                >
                                                    Уреди
                                                </Link>

                                                <DeleteButton id={post.id} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="px-6 py-16 text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A52E37]/[0.06] text-[#A52E37]">
                            <FileText size={26} />
                        </div>

                        <h3 className="heading-serif text-2xl text-[#302C2E]">
                            {posts.length === 0
                                ? "Сè уште нема објави"
                                : "Нема пронајдени објави"}
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#817679]">
                            {posts.length === 0
                                ? "Креирај ја првата објава за да започнеш со управување со содржината."
                                : "Промени ги критериумите за пребарување или исчисти ги филтрите."}
                        </p>

                        {posts.length > 0 && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-6 rounded-full border border-[#A52E37]/20 bg-white px-5 py-2.5 text-xs font-semibold text-[#A52E37]"
                            >
                                Исчисти филтри
                            </button>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
