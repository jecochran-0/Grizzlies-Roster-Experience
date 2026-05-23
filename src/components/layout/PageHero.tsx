interface PageHeroProps {
  title: string
  subtitle: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-20"
      style={{
        backgroundImage: [
          'linear-gradient(to right, #102037 20%, rgba(16,32,55,0.6) 45%, transparent 70%)',
          "url('/court.webp')",
        ].join(', '),
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-smoke md:text-base">{subtitle}</p>
      </div>
    </section>
  )
}
