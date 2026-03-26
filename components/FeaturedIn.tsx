const logos = [
  "Product Hunt",
  "Hacker News",
  "Dev.to",
  "Indie Hackers",
  "Morning Brew",
];

export default function FeaturedIn() {
  return (
    <section className="py-14 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/20 text-xs uppercase tracking-widest mb-8 font-medium">
          Trusted by professionals from
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos.map((name) => (
            <span
              key={name}
              className="text-white/20 text-sm font-semibold tracking-wide hover:text-white/40 transition-colors"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
