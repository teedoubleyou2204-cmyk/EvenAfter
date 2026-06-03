import React from 'react'

const Header = () => (
  <header className="bg-ivory border-b border-sage/30 py-8 px-4 text-center">
    <h1 className="font-display text-5xl text-charcoal mb-2">EverAfter Printables</h1>
    <p className="font-body italic text-xl text-sage">Beautifully designed. Effortlessly yours.</p>
  </header>
)

const Hero = () => (
  <section className="bg-white py-20 px-4 text-center max-w-4xl mx-auto">
    <h2 className="font-display text-4xl text-charcoal mb-6">Modern Elegance for Your Special Day</h2>
    <p className="font-modern font-light text-charcoal/80 text-lg mb-8 leading-relaxed">
      Curated wedding stationery templates designed to help you organize and celebrate your love with sophistication and ease.
    </p>
    <div className="flex justify-center gap-4">
      <a href="#templates" className="bg-sage text-white px-8 py-3 rounded-sm font-modern tracking-wide hover:bg-sage/90 transition-colors">
        Browse Templates
      </a>
    </div>
  </section>
)

const TemplateCard = ({ title, category, description }) => (
  <div className="bg-ivory/30 border border-sage/20 p-6 flex flex-col items-center text-center hover:border-warm-gold/50 transition-colors">
    <div className="w-full aspect-[5/7] bg-white border border-sage/10 mb-6 shadow-sm flex items-center justify-center text-sage italic font-body">
      Preview Image
    </div>
    <span className="font-modern text-xs uppercase tracking-widest text-warm-gold mb-2">{category}</span>
    <h3 className="font-display text-xl text-charcoal mb-3">{title}</h3>
    <p className="font-modern font-light text-sm text-charcoal/70 mb-6 flex-grow">{description}</p>
    <button className="w-full border border-charcoal py-2 text-sm font-modern hover:bg-charcoal hover:text-white transition-all">
      View Details
    </button>
  </div>
)

const TemplatesList = () => (
  <section id="templates" className="bg-white py-20 px-4 max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="font-display text-3xl text-charcoal mb-4">Our Collection</h2>
      <div className="w-24 h-px bg-warm-gold mx-auto"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <TemplateCard 
        title="Classic Elegance" 
        category="Invitation" 
        description="A traditional 5x7 layout with timeless typography and refined margins."
      />
      <TemplateCard 
        title="Modern Minimalist" 
        category="Invitation" 
        description="Clean, asymmetric design for the contemporary couple who loves simplicity."
      />
      <TemplateCard 
        title="Signature Floral" 
        category="Invitation" 
        description="Delicate sage and blush motifs framing your most important details."
      />
    </div>
  </section>
)

const Footer = () => (
  <footer className="bg-charcoal text-white py-12 px-4 text-center">
    <h2 className="font-display text-2xl mb-4">EverAfter Printables</h2>
    <p className="font-modern font-light text-sm text-white/60 mb-8 max-w-md mx-auto">
      Helping DIY planners and couples create professional-quality wedding stationery without the custom studio price tag.
    </p>
    <div className="text-xs font-modern tracking-widest uppercase text-white/40">
      © 2024 EverAfter Printables. All rights reserved.
    </div>
  </footer>
)

function App() {
  return (
    <div className="min-h-screen bg-ivory/10">
      <Header />
      <main>
        <Hero />
        <TemplatesList />
      </main>
      <Footer />
    </div>
  )
}

export default App
