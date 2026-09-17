"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/lib/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        </Reveal>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <Reveal
                key={faq.question}
                delay={index * 0.05}
                className="overflow-hidden rounded-xl border border-border bg-background"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`flex w-full items-center justify-between gap-4 p-5 text-left text-base font-semibold text-brand-navy transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-teal ${
                      isOpen ? "bg-brand-teal-light/40" : "hover:bg-brand-teal-light/20"
                    }`}
                  >
                    {faq.question}
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-xl leading-none text-brand-teal-dark"
                    >
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden bg-brand-teal-light/40"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
