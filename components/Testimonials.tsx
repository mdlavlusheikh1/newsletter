const testimonials = [
  {
    quote: "This newsletter saves me 3+ hours of research every week. The AI tool breakdowns are incredibly practical.",
    name: "Marcus T.",
    role: "Product Manager, San Francisco",
    avatar: "MT",
  },
  {
    quote: "I've tried dozens of AI newsletters. This is the only one I actually read every single Monday.",
    name: "Sarah K.",
    role: "Founder, Austin TX",
    avatar: "SK",
  },
  {
    quote: "The automation workflows alone are worth 10x the subscription price. And it's free. Insane value.",
    name: "David R.",
    role: "Operations Lead, New York",
    avatar: "DR",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-3">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">What readers are saying</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map(({ quote, name, role, avatar }) => (
            <div
              key={name}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-white/60 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-white/35 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
