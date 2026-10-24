
"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    Check,
    CheckCircle2,
    Eye,
    FileText,
    ImagePlus,
    Languages,
    Loader2,
    Save,
    Trash2,
    UploadCloud,
    X,
} from "lucide-react";

type PostInput = {
    slug: string;
    category: string;
    titleMk: string;
    titleEn: string;
    excerptMk: string;
    excerptEn: string;
    contentMk: string;
    contentEn: string;
    imageUrl: string;
    published: boolean;
};

const empty: PostInput = {
    slug: "",
    category: "activities",
    titleMk: "",
    titleEn: "",
    excerptMk: "",
    excerptEn: "",
    contentMk: "",
    contentEn: "",
    imageUrl: "",
    published: false,
};

const inputClass = `
  w-full rounded-xl border border-[#E9DEDA]
  bg-[#FAF8F6]/85 px-4 py-3.5
  text-[14px] text-[#383135]
  outline-none transition-all duration-300
  placeholder:text-[#B0A4A5]
  focus:border-[#A52E37]/45
  focus:bg-white
  focus:ring-4 focus:ring-[#A52E37]/[0.055]
`;

function createSlug(value: string) {
    const map: Record<string, string> = {
        а: "a", б: "b", в: "v", г: "g", д: "d",
        ѓ: "gj", е: "e", ж: "zh", з: "z", ѕ: "dz",
        и: "i", ј: "j", к: "k", л: "l", љ: "lj",
        м: "m", н: "n", њ: "nj", о: "o", п: "p",
        р: "r", с: "s", т: "t", ќ: "kj", у: "u",
        ф: "f", х: "h", ц: "c", ч: "ch",
        џ: "dzh", ш: "sh",
    };

    return value
        .toLowerCase()
        .split("")
        .map((char) => map[char] || char)
        .join("")
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function PostEditor({
                                       id,
                                       initial,
                                   }: {
    id?: string;
    initial?: PostInput;
}) {
    const router = useRouter();

    const [data, setData] = useState<PostInput>(initial ?? empty);
    const [language, setLanguage] = useState<"mk" | "en">("mk");
    const [busy, setBusy] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(false);
    const [slugEdited, setSlugEdited] = useState(Boolean(initial?.slug));
    const [savedSnapshot, setSavedSnapshot] = useState(
        JSON.stringify(initial ?? empty)
    );

    const hasChanges = JSON.stringify(data) !== savedSnapshot;

    useEffect(() => {
        if (!hasChanges) return;

        const beforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", beforeUnload);

        return () => {
            window.removeEventListener("beforeunload", beforeUnload);
        };
    }, [hasChanges]);

    function change<K extends keyof PostInput>(
        key: K,
        value: PostInput[K]
    ) {
        setData((previous) => ({
            ...previous,
            [key]: value,
        }));
    }

    function updateTitleMk(value: string) {
        setData((previous) => ({
            ...previous,
            titleMk: value,
            slug: slugEdited ? previous.slug : createSlug(value),
        }));
    }

    async function upload(file?: File) {
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
            setError("Дозволени се JPG, PNG, WebP и GIF фотографии.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Фотографијата не смее да биде поголема од 5 MB.");
            return;
        }

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Грешка при прикачување.");
            }

            change("imageUrl", result.url);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Грешка при прикачување."
            );
        } finally {
            setUploading(false);
        }
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!data.titleMk.trim() || !data.titleEn.trim()) {
            setError("Внеси наслов на македонски и англиски.");
            return;
        }

        if (!data.slug.trim()) {
            setError("Потребно е URL име за објавата.");
            return;
        }

        setBusy(true);
        setError("");

        try {
            const response = await fetch(
                id ? `/api/admin/posts/${id}` : "/api/admin/posts",
                {
                    method: id ? "PATCH" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Грешка при зачувување на објавата."
                );
            }

            setSavedSnapshot(JSON.stringify(data));

            router.push("/adminnena/dashboard");
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Неуспешно зачувување."
            );
        } finally {
            setBusy(false);
        }
    }

    const isMk = language === "mk";

    const currentTitle = isMk ? data.titleMk : data.titleEn;
    const currentExcerpt = isMk ? data.excerptMk : data.excerptEn;
    const currentContent = isMk ? data.contentMk : data.contentEn;

    function textField(
        label: string,
        value: string,
        onChange: (value: string) => void,
        options?: {
            multiline?: boolean;
            large?: boolean;
            placeholder?: string;
        }
    ) {
        const fieldId = `field-${label.replace(/\W/g, "-")}`;

        return (
            <div className="space-y-2">
                <label
                    htmlFor={fieldId}
                    className="block text-xs font-semibold text-[#65595D]"
                >
                    {label}
                </label>

                {options?.multiline ? (
                    <textarea
                        id={fieldId}
                        className={`${inputClass} resize-y ${
                            options.large ? "min-h-[260px]" : "min-h-[110px]"
                        }`}
                        value={value}
                        required
                        placeholder={options.placeholder}
                        onChange={(e) => onChange(e.target.value)}
                    />
                ) : (
                    <input
                        id={fieldId}
                        className={inputClass}
                        value={value}
                        required
                        placeholder={options?.placeholder}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}
            </div>
        );
    }

    return (
        <>
            <form onSubmit={submit} className="space-y-9">

                {/* Main settings */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label
                            htmlFor="post-category"
                            className="block text-xs font-semibold text-[#65595D]"
                        >
                            Категорија
                        </label>

                        <select
                            id="post-category"
                            className={inputClass}
                            value={data.category}
                            onChange={(e) => change("category", e.target.value)}
                        >
                            <option value="activities">Активности</option>
                            <option value="projects">Проекти</option>
                            <option value="literature">Дела од Никола Кљусев</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="post-slug"
                            className="block text-xs font-semibold text-[#65595D]"
                        >
                            URL адреса (slug)
                        </label>

                        <input
                            id="post-slug"
                            className={inputClass}
                            value={data.slug}
                            required
                            placeholder="primer-naslov"
                            onChange={(e) => {
                                setSlugEdited(true);
                                change("slug", createSlug(e.target.value));
                            }}
                        />

                        <p className="text-[11px] text-[#9B8D8E]">
                            Автоматски се генерира од македонскиот наслов.
                        </p>
                    </div>
                </div>

                {/* Language switcher */}
                <div className="rounded-[24px] border border-[#EADFDA] bg-white/75 p-5 shadow-sm backdrop-blur-xl sm:p-7">
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-[#A52E37]">
                                <Languages size={19} />
                                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Двојазична содржина
                </span>
                            </div>

                            <h2 className="heading-serif text-2xl text-[#302C2E]">
                                Содржина на објавата
                            </h2>
                        </div>

                        <div className="flex rounded-full border border-[#A52E37]/15 bg-[#FAF7F5] p-1">
                            {(["mk", "en"] as const).map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => setLanguage(lang)}
                                    className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 ${
                                        language === lang
                                            ? "bg-[#A52E37] text-white shadow-md"
                                            : "text-[#786B70] hover:bg-white"
                                    }`}
                                >
                                    {lang === "mk" ? "Македонски" : "English"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {textField(
                            isMk ? "Наслов на македонски" : "Title in English",
                            currentTitle,
                            (value) =>
                                isMk
                                    ? updateTitleMk(value)
                                    : change("titleEn", value),
                            {
                                placeholder: isMk
                                    ? "Внеси наслов..."
                                    : "Enter title...",
                            }
                        )}

                        {textField(
                            isMk ? "Краток опис (МК)" : "Short description (EN)",
                            currentExcerpt,
                            (value) =>
                                change(isMk ? "excerptMk" : "excerptEn", value),
                            {
                                multiline: true,
                                placeholder: "Краток опис на објавата...",
                            }
                        )}

                        {textField(
                            isMk ? "Содржина (МК)" : "Content (EN)",
                            currentContent,
                            (value) =>
                                change(isMk ? "contentMk" : "contentEn", value),
                            {
                                multiline: true,
                                large: true,
                                placeholder: "Внеси ја целосната содржина...",
                            }
                        )}
                    </div>
                </div>

                {/* Image upload */}
                <div className="rounded-[24px] border border-[#EADFDA] bg-white/75 p-5 shadow-sm backdrop-blur-xl sm:p-7">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#A52E37]/[0.07] text-[#A52E37]">
                            <ImagePlus size={21} />
                        </div>

                        <div>
                            <h2 className="heading-serif text-2xl text-[#302C2E]">
                                Главна фотографија
                            </h2>
                            <p className="text-xs text-[#918486]">
                                JPG, PNG, WebP или GIF
                            </p>
                        </div>
                    </div>

                    <label
                        htmlFor="image-upload"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#A52E37]/20 bg-[#FAF7F5] px-5 py-10 text-center transition-all duration-300 hover:border-[#A52E37]/50 hover:bg-[#A52E37]/[0.025]"
                    >
                        {uploading ? (
                            <Loader2
                                size={28}
                                className="mb-3 animate-spin text-[#A52E37]"
                            />
                        ) : (
                            <UploadCloud
                                size={30}
                                className="mb-3 text-[#A52E37]"
                            />
                        )}

                        <span className="text-sm font-semibold text-[#554A4E]">
              {uploading
                  ? "Се прикачува фотографијата..."
                  : "Избери фотографија"}
            </span>

                        <span className="mt-2 text-xs text-[#9C8F91]">
              Максимална големина 5 MB
            </span>
                    </label>

                    <input
                        id="image-upload"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="sr-only"
                        disabled={uploading}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            upload(e.target.files?.[0])
                        }
                    />

                    <div className="mt-6 space-y-2">
                        <label
                            htmlFor="image-url"
                            className="block text-xs font-semibold text-[#65595D]"
                        >
                            Или внеси URL адреса
                        </label>

                        <input
                            id="image-url"
                            type="text"
                            className={inputClass}
                            value={data.imageUrl}
                            placeholder="/uploads/photo.jpg"
                            onChange={(e) => change("imageUrl", e.target.value)}
                        />
                    </div>

                    {data.imageUrl && (
                        <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#E9DEDA] bg-[#F3ECE8]">
                            <img
                                src={data.imageUrl}
                                alt="Преглед на фотографијата"
                                className="h-[240px] w-full object-contain"
                            />

                            <button
                                type="button"
                                onClick={() => change("imageUrl", "")}
                                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#A52E37] shadow-md backdrop-blur-xl transition hover:bg-[#A52E37] hover:text-white"
                                aria-label="Отстрани фотографија"
                            >
                                <Trash2 size={17} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Publication status */}
                <div className="rounded-[24px] border border-[#EADFDA] bg-white/75 p-5 shadow-sm backdrop-blur-xl sm:p-7">
                    <h2 className="heading-serif mb-5 text-2xl text-[#302C2E]">
                        Статус на објавата
                    </h2>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => change("published", false)}
                            className={`flex items-center gap-3 rounded-2xl border p-5 text-left transition-all ${
                                !data.published
                                    ? "border-[#A52E37]/50 bg-[#A52E37]/[0.055]"
                                    : "border-[#E9DEDA] bg-[#FAF8F6]"
                            }`}
                        >
                            <FileText size={22} className="text-[#A52E37]" />

                            <div className="flex-1">
                                <p className="text-sm font-semibold">Зачувај како нацрт</p>
                                <p className="mt-1 text-xs text-[#918486]">
                                    Не се прикажува јавно
                                </p>
                            </div>

                            {!data.published && (
                                <CheckCircle2
                                    size={19}
                                    className="text-[#A52E37]"
                                />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => change("published", true)}
                            className={`flex items-center gap-3 rounded-2xl border p-5 text-left transition-all ${
                                data.published
                                    ? "border-[#A52E37]/50 bg-[#A52E37]/[0.055]"
                                    : "border-[#E9DEDA] bg-[#FAF8F6]"
                            }`}
                        >
                            <CheckCircle2 size={22} className="text-[#A52E37]" />

                            <div className="flex-1">
                                <p className="text-sm font-semibold">Објави веднаш</p>
                                <p className="mt-1 text-xs text-[#918486]">
                                    Видливо на веб-страницата
                                </p>
                            </div>

                            {data.published && (
                                <Check
                                    size={19}
                                    className="text-[#A52E37]"
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div
                        role="alert"
                        className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <X size={18} className="shrink-0" />
                        {error}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EADFDA] pt-7">
                    <div className="flex items-center gap-2 text-xs text-[#918486]">
                        {hasChanges ? (
                            <>
                                <span className="h-2 w-2 rounded-full bg-amber-500" />
                                Незачувани промени
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={15} />
                                Нема нови промени
                            </>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setPreview(true)}
                            className="inline-flex items-center gap-2 rounded-full border border-[#A52E37]/20 bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#A52E37] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md"
                        >
                            <Eye size={17} />
                            Преглед
                        </button>

                        <Link
                            href="/adminnena/dashboard"
                            onClick={(e) => {
                                if (
                                    hasChanges &&
                                    !window.confirm(
                                        "Имаш незачувани промени. Дали сакаш да излезеш?"
                                    )
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-[#E9DEDA] bg-white px-6 py-3.5 text-sm font-semibold text-[#6B6063] transition-all hover:bg-[#F5EFED]"
                        >
                            <ArrowLeft size={17} />
                            Откажи
                        </Link>

                        <button
                            type="submit"
                            disabled={busy || uploading}
                            className="inline-flex items-center gap-2 rounded-full bg-[#A52E37] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(165,46,55,0.18)] transition-all hover:-translate-y-1 hover:bg-[#89232E] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {busy ? (
                                <Loader2 size={17} className="animate-spin" />
                            ) : (
                                <Save size={17} />
                            )}

                            {busy
                                ? "Се зачувува..."
                                : id
                                    ? "Зачувај промени"
                                    : data.published
                                        ? "Објави"
                                        : "Зачувај нацрт"}
                        </button>
                    </div>
                </div>
            </form>

            {/* Preview modal */}
            {preview && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#25191D]/50 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Преглед на објавата"
                >
                    <div className="max-h-[90vh] w-full max-w-[900px] overflow-y-auto rounded-[26px] border border-white/80 bg-[#FAF8F5] p-6 shadow-2xl sm:p-10">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="heading-serif text-2xl">
                                Преглед на објавата
                            </h2>

                            <button
                                type="button"
                                onClick={() => setPreview(false)}
                                className="rounded-full border border-[#E9DEDA] bg-white p-2 text-[#A52E37]"
                                aria-label="Затвори"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-5 flex gap-2">
                            {(["mk", "en"] as const).map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => setLanguage(lang)}
                                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                                        language === lang
                                            ? "bg-[#A52E37] text-white"
                                            : "bg-white text-[#A52E37]"
                                    }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {data.imageUrl && (
                            <img
                                src={data.imageUrl}
                                alt="Преглед"
                                className="mb-8 max-h-[400px] w-full rounded-2xl object-cover"
                            />
                        )}

                        <h2 className="heading-serif text-4xl text-[#302C2E]">
                            {currentTitle || "Наслов на објавата"}
                        </h2>

                        <p className="mt-5 text-lg text-[#786F72]">
                            {currentExcerpt}
                        </p>

                        <div className="mt-8 border-t border-[#E9DEDA] pt-8 whitespace-pre-wrap text-base leading-8 text-[#51494C]">
                            {currentContent}
                        </div>

                        <div className="mt-9 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setPreview(false)}
                                className="rounded-full bg-[#A52E37] px-6 py-3 text-sm font-semibold text-white"
                            >
                                Затвори преглед
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
