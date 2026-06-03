import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import templatesData from './data/templates.json'

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

const TemplateCard = ({ template, onViewDetails }) => (
  <div className="bg-ivory/30 border border-sage/20 p-6 flex flex-col items-center text-center hover:border-warm-gold/50 transition-colors h-full">
    <div className="w-full aspect-[5/7] bg-white border border-sage/10 mb-6 shadow-sm flex items-center justify-center text-sage italic font-body p-4 text-center">
      {template.preview}
    </div>
    <span className="font-modern text-xs uppercase tracking-widest text-warm-gold mb-2">{template.category}</span>
    <h3 className="font-display text-xl text-charcoal mb-3">{template.title}</h3>
    <p className="font-modern font-light text-sm text-charcoal/70 mb-6 flex-grow">{template.description}</p>
    <button 
      onClick={() => onViewDetails(template)}
      className="w-full border border-charcoal py-2 text-sm font-modern hover:bg-charcoal hover:text-white transition-all"
    >
      View Details
    </button>
  </div>
)

const CategorySection = ({ title, templates, onViewDetails }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-10">
      <h2 className="font-display text-2xl text-charcoal whitespace-nowrap">{title}</h2>
      <div className="h-px bg-sage/20 w-full"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {templates.map(template => (
        <TemplateCard key={template.id} template={template} onViewDetails={onViewDetails} />
      ))}
    </div>
  </div>
)

const Modal = ({ template, onClose }) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (template) {
      fetch(template.path)
        .then(res => res.text())
        .then(text => {
          setContent(text)
          setLoading(false)
        })
    }
  }, [template])

  if (!template) return null

  return (
    <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-sage/20 bg-ivory/30">
          <div>
            <span className="font-modern text-xs uppercase tracking-widest text-warm-gold">{template.category}</span>
            <h2 className="font-display text-2xl text-charcoal">{template.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-charcoal/40 hover:text-charcoal transition-colors p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-8 prose prose-sage max-w-none">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-sage border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ReactMarkdown className="markdown-content font-modern font-light text-charcoal/80">
              {content}
            </ReactMarkdown>
          )}
        </div>

        <div className="p-6 border-t border-sage/20 bg-white flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-charcoal font-modern text-sm hover:bg-ivory/50 transition-colors"
          >
            Close
          </button>
          <button className="px-8 py-2 bg-sage text-white font-modern text-sm hover:bg-sage/90 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

const TemplatesList = ({ onViewDetails }) => {
  const categories = [
    { title: "Wedding Invitations", name: "Invitation" },
    { title: "Wedding Day Essentials", name: "Schedule" },
    { title: "Seating Charts", name: "Seating Chart" },
    { title: "Planning Tools", name: "Checklist" }
  ]

  return (
    <section id="templates" className="bg-white py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl text-charcoal mb-4">Our Curated Collection</h2>
        <p className="font-modern font-light text-charcoal/60 italic">Select a template to explore detailed design specifications</p>
      </div>

      {categories.map(cat => (
        <CategorySection 
          key={cat.name}
          title={cat.title} 
          templates={templatesData.filter(t => t.category === cat.name)}
          onViewDetails={onViewDetails}
        />
      ))}
    </section>
  )
}

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
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  return (
    <div className="min-h-screen bg-ivory/10">
      <Header />
      <main>
        <Hero />
        <TemplatesList onViewDetails={setSelectedTemplate} />
      </main>
      <Footer />
      <Modal 
        template={selectedTemplate} 
        onClose={() => setSelectedTemplate(null)} 
      />
    </div>
  )
}

export default App
