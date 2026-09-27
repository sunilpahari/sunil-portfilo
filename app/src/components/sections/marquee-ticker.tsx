const tickerItems = [
  "Branding",
  "UI/UX",
  "Motion",
  "Print",
  "Identity",
  "Web Design",
]

function TickerContent() {
  return (
    <>
      {tickerItems.map((item) => (
        <span key={item} className="mx-4 inline-flex items-center gap-8 sm:mx-6">
          {item}
          <span aria-hidden="true">&mdash;</span>
        </span>
      ))}
    </>
  )
}

export default function MarqueeTicker() {
  return (
    <section
      aria-label="Design services ticker"
      className="overflow-hidden border-y border-[#222222] bg-surface py-4 text-accent sm:py-5"
    >
      <div className="marquee-track flex w-max whitespace-nowrap font-heading text-5xl leading-none tracking-normal sm:text-6xl md:text-7xl">
        <div className="shrink-0" aria-hidden="true">
          <TickerContent />
          <TickerContent />
        </div>
        <div className="shrink-0" aria-hidden="true">
          <TickerContent />
          <TickerContent />
        </div>
      </div>
    </section>
  )
}
