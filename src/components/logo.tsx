export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-foreground ${className}`}
      aria-hidden
    >
      <span
        className="font-serif text-base leading-none text-background"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        S
      </span>
    </div>
  );
}
