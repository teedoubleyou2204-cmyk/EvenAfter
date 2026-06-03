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
        Browse Collection
      </a>
    </div>
  </section>
)

const TemplateCard = ({ title, category, description }) => (
  <div className="bg-ivory/30 border border-sage/20 p-6 flex flex-col items-center text-center hover:border-warm-gold/50 transition-colors">
    <div className="w-full aspect-[5/7] bg-white border border-sage/10 mb-6 shadow-sm flex items-center justify-center text-sage italic font-body p-4 text-center">
      {title}
    </div>
    <span className="font-modern text-xs uppercase tracking-widest text-warm-gold mb-2">{category}</span>
    <h3 className="font-display text-xl text-charcoal mb-3">{title}</h3>
    <p className="font-modern font-light text-sm text-charcoal/70 mb-6 flex-grow">{description}</p>
    <button className="w-full border border-charcoal py-2 text-sm font-modern hover:bg-charcoal hover:text-white transition-all">
      View Template
    </button>
  </div>
)

const CategorySection = ({ title, children }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-10">
      <h2 className="font-display text-2xl text-charcoal whitespace-nowrap">{title}</h2>
      <div className="h-px bg-sage/20 w-full"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {children}
    </div>
  </div>
)

const TemplatesList = () => (
  <section id="templates" className="bg-white py-20 px-4 max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="font-display text-3xl text-charcoal mb-4">Our Curated Collection</h2>
      <p className="font-modern font-light text-charcoal/60 italic">Select a category to explore our designs</p>
    </div>

    <CategorySection title="Wedding Invitations">
      <TemplateCard 
        title="Classic Elegance" 
        category="Invitation" 
        description="Traditional formal layout with ornate gold borders and floral motifs."
      />
      <TemplateCard 
        title="Modern Asymmetric" 
        category="Invitation" 
        description="Editorial style with bold whitespace and a signature sage color block."
      />
      <TemplateCard 
        title="Minimalist Line Art" 
        category="Invitation" 
        description="Clean monochrome design with hand-drawn floral corners."
      />
    </CategorySection>

    <CategorySection title="Wedding Day Essentials">
      <TemplateCard 
        title="Wedding Day Timeline" 
        category="Schedule" 
        description="Scannable time blocks with sage accents to keep your day on track."
      />
      <TemplateCard 
        title="Weekend Itinerary" 
        category="Schedule" 
        description="A multi-day guide for destination weddings and full weekend celebrations."
      />
      <TemplateCard 
        title="Display Seating Board" 
        category="Seating Chart" 
        description="Large format display with elegant typography for your reception entrance."
      />
    </CategorySection>

    <CategorySection title="Planning Tools">
      <TemplateCard 
        title="12-Month Timeline" 
        category="Checklist" 
        description="Comprehensive planning guide from 'Yes' to 'I Do'."
      />
      <TemplateCard 
        title="Vendor Coordination" 
        category="Checklist" 
        description="Track your vendors, payments, and contacts in one elegant grid."
      />
      <TemplateCard 
        title="Packing Guide" 
        category="Checklist" 
        description="The ultimate honeymoon and wedding weekend packing assistant."
      />
    </CategorySection>
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
