
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertTriangle,
    Loader2,
    Trash2,
    X,
} from "lucide-react";

export default function DeleteButton({
                                         id,
                                     }: {
    id: string;
}) {
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    const cancelRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const focusTimer = window.setTimeout(() => {
            cancelRef.current?.focus();
        }, 100);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !deleting) {
                setOpen(false);
            }

            if (event.key === "Tab") {
                const dialog = document.getElementById(`delete-dialog-${id}`);
                if (!dialog) return;

                const focusable = Array.from(
                    dialog.querySelectorAll<HTMLElement>(
                        'button:not([disabled]), a[href], input:not([disabled])'
                    )
                );

                if (!focusable.length) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === last
                ) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
            triggerRef.current?.focus();
        };
    }, [open, deleting, id]);

    async function deletePost() {
        if (deleting) return;

        setDeleting(true);
        setError("");

        try {
            const response = await fetch(
                `/api/admin/posts/${encodeURIComponent(id)}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                const result = await response.json().catch(() => null);

                throw new Error(
                    result?.error || "Неуспешно бришење на објавата."
                );
            }

            setOpen(false);

            // Refresh dashboard and statistics
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Настана грешка при бришењето."
            );
        } finally {
            setDeleting(false);
        }
    }

    function closeModal() {
        if (deleting) return;

        setOpen(false);
        setError("");
    }

    return (
        <>
            {/* Delete trigger */}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => {
                    setError("");
                    setOpen(true);
                }}
                className="
          group inline-flex items-center
          justify-center gap-2
          rounded-full
          border border-[#A52E37]/15
          bg-white/75
          px-4 py-2
          text-xs font-semibold
          text-[#A52E37]
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-0.5
          hover:border-[#A52E37]/40
          hover:bg-[#A52E37]
          hover:text-white
          hover:shadow-[0_8px_20px_rgba(165,46,55,0.15)]
        "
            >
                <Trash2
                    size={15}
                    className="transition-transform duration-300 group-hover:scale-110"
                />
                Избриши
            </button>

            {/* Confirmation modal */}
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="
                  fixed inset-0 z-[9999]
                  flex items-center justify-center
                  bg-[#25191D]/35
                  p-4 backdrop-blur-md
                "
                                onMouseDown={(event) => {
                                    if (event.target === event.currentTarget) {
                                        closeModal();
                                    }
                                }}
                            >
                                <motion.div
                                    id={`delete-dialog-${id}`}
                                    role="alertdialog"
                                    aria-modal="true"
                                    aria-labelledby={`delete-title-${id}`}
                                    aria-describedby={`delete-description-${id}`}
                                    initial={{
                                        opacity: 0,
                                        y: 25,
                                        scale: 0.96,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 15,
                                        scale: 0.97,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="
                    relative w-full max-w-[460px]
                    overflow-hidden
                    rounded-[28px]
                    border border-white/80
                    bg-[#FFFCFA]/95
                    p-7
                    shadow-[0_30px_100px_rgba(45,20,25,0.18)]
                    backdrop-blur-2xl
                    sm:p-9
                  "
                                >
                                    {/* Top accent */}
                                    <div
                                        className="
                      absolute inset-x-0 top-0
                      h-[3px] bg-[#A52E37]
                    "
                                    />

                                    {/* Close button */}
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        disabled={deleting}
                                        aria-label="Затвори"
                                        className="
                      absolute right-5 top-5
                      flex h-9 w-9 items-center
                      justify-center rounded-full
                      border border-[#EADFDA]
                      bg-white/80 text-[#8C7478]
                      transition-all
                      hover:bg-[#F8E9E8]
                      hover:text-[#A52E37]
                      disabled:opacity-40
                    "
                                    >
                                        <X size={18} />
                                    </button>

                                    {/* Warning icon */}
                                    <div
                                        className="
                      mb-7 flex h-[68px] w-[68px]
                      items-center justify-center
                      rounded-[20px]
                      border border-[#A52E37]/15
                      bg-[#A52E37]/[0.065]
                      text-[#A52E37]
                    "
                                    >
                                        <AlertTriangle
                                            size={30}
                                            strokeWidth={1.6}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h2
                                        id={`delete-title-${id}`}
                                        className="
                      heading-serif
                      text-[30px] leading-tight
                      text-[#302C2E]
                    "
                                    >
                                        Избриши ја <span className="text-[#A52E37]">објавата?</span>
                                    </h2>

                                    {/* Description */}
                                    <p
                                        id={`delete-description-${id}`}
                                        className="
                      mt-4 text-sm leading-7
                      text-[#786F72]
                    "
                                    >
                                        Дали си сигурна дека сакаш да ја избришеш
                                        оваа објава? Ова дејство не може да се
                                        врати назад.
                                    </p>

                                    {/* Warning notice */}
                                    <div
                                        className="
                      mt-6 rounded-2xl
                      border border-[#A52E37]/10
                      bg-[#A52E37]/[0.045]
                      px-4 py-3.5
                    "
                                    >
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle
                                                size={17}
                                                className="mt-0.5 shrink-0 text-[#A52E37]"
                                            />

                                            <p className="text-xs leading-6 text-[#8D4850]">
                                                Објавата ќе биде отстранета од
                                                админ-панелот и повеќе нема да
                                                биде достапна на веб-страницата.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Error message */}
                                    {error && (
                                        <div
                                            role="alert"
                                            className="
                        mt-5 rounded-xl
                        border border-red-200
                        bg-red-50 p-4
                        text-sm text-red-700
                      "
                                        >
                                            {error}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-8 flex flex-wrap justify-end gap-3">
                                        <button
                                            ref={cancelRef}
                                            type="button"
                                            disabled={deleting}
                                            onClick={closeModal}
                                            className="
                        rounded-full
                        border border-[#E9DEDA]
                        bg-white/85
                        px-6 py-3
                        text-sm font-semibold
                        text-[#65595D]
                        transition-all duration-300
                        hover:bg-[#F5EFED]
                        disabled:opacity-50
                      "
                                        >
                                            Откажи
                                        </button>

                                        <button
                                            type="button"
                                            disabled={deleting}
                                            onClick={deletePost}
                                            className="
                        inline-flex items-center
                        justify-center gap-2
                        rounded-full
                        bg-[#A52E37]
                        px-6 py-3
                        text-sm font-semibold
                        text-white
                        shadow-[0_8px_25px_rgba(165,46,55,0.2)]
                        transition-all duration-300
                        hover:-translate-y-0.5
                        hover:bg-[#89232E]
                        hover:shadow-lg
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                                        >
                                            {deleting ? (
                                                <Loader2
                                                    size={17}
                                                    className="animate-spin"
                                                />
                                            ) : (
                                                <Trash2 size={17} />
                                            )}

                                            {deleting
                                                ? "Се брише..."
                                                : "Избриши објава"}
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
    );
}
