import SubscribeForm from "./SubscribeForm";

const companies = ["Google", "Meta", "Stripe", "OpenAI", "Microsoft", "Notion", "Figma", "Vercel"];

export default function HeroSection() {
  return (
    <section id="subscribe" className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Subtle radial bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(37,99,235,0.08),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Issue badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          New issue every Tuesday — Free forever
        </div>

        {/* Headline — Rundown AI style: massive, clean */}
        <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-black text-[#0f172a] leading-[1.05] tracking-tight mb-6">
          The AI newsletter
          <br />
          <span className="text-blue-600">serious professionals</span>
          <br />
          actually read.
        </h1>

        {/* Sub — Morning Brew style: short, punchy */}
        <p className="text-lg sm:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          5-minute weekly briefing on AI tools, automation workflows, and strategies used by top operators in the USA.
        </p>

        {/* Form */}
        <SubscribeForm variant="hero" />

        {/* Social proof numbers */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">5,200+</span> subscribers
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">94%</span> open rate
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">45+</span> countries
          </span>
        </div>

        {/* Company logos — Rundown AI style */}
        <div className="mt-14">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
            Read by professionals at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {companies.map((c) => (
              <span key={c} className="text-slate-300 font-bold text-sm tracking-wide hover:text-slate-500 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
