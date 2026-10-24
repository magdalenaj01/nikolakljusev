
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

export default function SectionReveal({
                                          children,
                                          delay = 0,
                                          className = "",
                                      }: SectionRevealProps) {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={
                reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 32,
                    }
            }
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: 0.12,
            }}
            transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
