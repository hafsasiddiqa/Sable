"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AnimatedHero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-24 pb-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-semibold tracking-tight"
      >
        Turn every meeting into searchable knowledge
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-lg text-muted-foreground max-w-xl"
      >
        Sable transcribes, summarizes, and tracks action items from your meetings automatically 
        so nothing important gets lost again.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="flex items-center gap-3"
      >
        <Button asChild size="lg">
          <Link href="/dashboard">Get Started Free</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="#features">See Features</Link>
        </Button>
      </motion.div>
    </section>
  );
}
