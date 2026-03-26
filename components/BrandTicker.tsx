const brands = [
  "GOOGLE", "META", "Y COMBINATOR", "STRIPE", "TESLA",
  "OPENAI", "MICROSOFT", "ANDREESSEN HOROWITZ", "ADOBE", "TIKTOK",
];

export default function BrandTicker() {
  return (
    <section className="py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="flex gap-20 animate-infinite-scroll whitespace-nowrap items-center opacity-25 grayscale">
        {[...brands, ...brands].map((brand, i) => (
          <span key={i} className="text-lg font-black tracking-widest text-white">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
