const stats = [
  { value: "94%", label: "Retention Rate", note: '"The most dense, high-value AI resource on the market."' },
  { value: "45+", label: "Active Territories", note: "Join a borderless network of high-performance builders." },
  { value: "5,200+", label: "Subscribers", note: "Founders, engineers, and operators worldwide." },
];

export default function StatsBento() {
  return (
    <section className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[48px] bg-gradient-to-r from-blue-700/20 to-blue-500/10 border border-blue-500/10 p-10 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-white/10">
          {stats.map(({ value, label, note }) => (
            <div key={label} className="text-center md:px-10">
              <h4 className="text-6xl font-black text-white mb-2 tracking-tighter">{value}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">{label}</p>
              <p className="text-slate-600 text-xs italic font-medium leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
