import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Analytics } from '@vercel/analytics/react'
import templatesData from './data/templates.json'

const Header = () => (
  <header className="bg-ivory border-b border-sage/30 py-8 px-4 text-center">
    <h1 className="font-display text-5xl text-charcoal mb-2 cursor-pointer" onClick={() => window.location.reload()}>EverAfter Printables</h1>
    <p className="font-body italic text-xl text-sage">Beautifully designed. Effortlessly yours.</p>
  </header>
)

const Hero = () => (
  <section className="bg-white py-20 px-4 text-center max-w-4xl mx-auto">
    <h2 className="font-display text-4xl text-charcoal mb-6">Modern Elegance for Your Special Day</h2>
    <p className="font-modern font-light text-charcoal/80 text-lg mb-8 leading-relaxed">
      Curated wedding stationery templates designed to help you organize and celebrate your love with sophistication. Fully customizable colors and layouts to match your unique vision.
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
    <div className="flex items-center gap-2 mb-4">
      <div className="w-3 h-3 rounded-full bg-sage"></div>
      <div className="w-3 h-3 rounded-full bg-blush"></div>
      <div className="w-3 h-3 rounded-full bg-warm-gold"></div>
      <span className="text-[10px] font-modern uppercase tracking-tighter text-charcoal/50">Customizable Colors</span>
    </div>
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

const DetailsModal = ({ template, onClose, onBuyNow }) => {
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
            <span className="font-modern text-xs uppercase tracking-widest text-warm-gold">{template.category} • Fully Customizable Colors</span>
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
          <button 
            onClick={() => onBuyNow(template)}
            className="px-8 py-2 bg-sage text-white font-modern text-sm hover:bg-sage/90 transition-colors"
          >
            Buy Now - $15
          </button>
        </div>
      </div>
    </div>
  )
}

const CheckoutModal = ({ template, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSimulatePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess(template)
    }, 2000)
  }

  if (!template) return null

  return (
    <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-3xl text-charcoal">Checkout</h2>
          <button onClick={onClose} className="text-charcoal/40 hover:text-charcoal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>

        <div className="mb-8 border-b border-sage/20 pb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-modern text-charcoal/60 uppercase tracking-widest text-xs">Item</span>
            <span className="font-modern text-charcoal/60 uppercase tracking-widest text-xs">Price</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-display text-xl text-charcoal">{template.title} ({template.category})</span>
            <span className="font-modern text-xl text-charcoal font-bold">$15.00</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-modern text-sm uppercase tracking-widest text-warm-gold mb-4">Payment Method</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setPaymentMethod('paypal')}
              className={`p-4 border font-modern text-sm transition-all ${paymentMethod === 'paypal' ? 'border-sage bg-ivory/30' : 'border-sage/20 hover:border-sage/50'}`}
            >
              PayPal
            </button>
            <button 
              onClick={() => setPaymentMethod('bank')}
              className={`p-4 border font-modern text-sm transition-all ${paymentMethod === 'bank' ? 'border-sage bg-ivory/30' : 'border-sage/20 hover:border-sage/50'}`}
            >
              Bank Transfer
            </button>
          </div>
        </div>

        {paymentMethod === 'paypal' ? (
          <div className="bg-ivory/30 p-6 rounded-sm text-center mb-8 border border-sage/10">
            <p className="font-modern text-sm text-charcoal/70 mb-6 italic">Securely pay with your PayPal account or credit card.</p>
            <button 
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full bg-[#0070ba] text-white py-3 rounded-sm font-bold flex items-center justify-center gap-2 hover:bg-[#003087] transition-colors"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="italic">PayPal</span>
                  <span>Checkout</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-ivory/30 p-6 rounded-sm mb-8 border border-sage/10">
            <h4 className="font-display text-lg text-charcoal mb-3">Bank Transfer Details</h4>
            <div className="font-modern text-sm text-charcoal/70 space-y-2 mb-6">
              <p><span className="font-bold">Bank Name:</span> EverAfter Global Bank</p>
              <p><span className="font-bold">Account Name:</span> EverAfter Printables Ltd.</p>
              <p><span className="font-bold">Account Number:</span> 1234 5678 9012</p>
              <p><span className="font-bold">Reference:</span> {template.id.toUpperCase()}-ORDER</p>
              <p className="text-xs mt-4 italic text-sage">* Please send a confirmation once transferred.</p>
            </div>
            <button 
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full bg-charcoal text-white py-3 rounded-sm font-modern hover:bg-charcoal/90 transition-colors"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Confirm Transfer Sent"}
            </button>
          </div>
        )}

        <p className="text-center font-modern text-[10px] text-charcoal/40 uppercase tracking-widest">
          Secure encrypted transaction
        </p>
      </div>
    </div>
  )
}

const SuccessModal = ({ template, onClose }) => {
  return (
    <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl text-center p-12 shadow-2xl relative">
        <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CAF88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="font-display text-4xl text-charcoal mb-4">Thank You!</h2>
        <p className="font-body italic text-xl text-sage mb-8">Your template is ready for download.</p>
        
        <div className="bg-ivory/30 p-8 border border-sage/10 mb-8">
          <h3 className="font-display text-2xl text-charcoal mb-2">{template.title}</h3>
          <p className="font-modern text-xs text-warm-gold uppercase tracking-widest mb-6">{template.category}</p>
          <a 
            href={template.path} 
            download
            className="inline-block bg-charcoal text-white px-10 py-4 font-modern tracking-widest uppercase text-sm hover:bg-charcoal/90 transition-all shadow-lg"
          >
            Download Markdown
          </a>
        </div>
        
        <p className="font-modern font-light text-charcoal/60 text-sm mb-8 leading-relaxed">
          A confirmation email with the download link and editing instructions has also been sent to your inbox.
        </p>
        
        <button 
          onClick={onClose}
          className="text-warm-gold font-modern text-sm uppercase tracking-widest hover:text-warm-gold/70 transition-colors"
        >
          Return to Store
        </button>
      </div>
    </div>
  )
}

const HowItWorks = () => (
  <section className="bg-ivory/30 py-20 px-4 border-y border-sage/10">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="font-display text-3xl text-charcoal mb-12">Your Journey to Perfect Stationery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="text-warm-gold font-display text-4xl mb-4">01</div>
          <h3 className="font-modern font-bold uppercase tracking-widest text-xs mb-3 text-charcoal">Choose Your Design</h3>
          <p className="font-modern font-light text-sm text-charcoal/70">Browse our curated collection and select the templates that speak to your wedding style.</p>
        </div>
        <div>
          <div className="text-warm-gold font-display text-4xl mb-4">02</div>
          <h3 className="font-modern font-bold uppercase tracking-widest text-xs mb-3 text-charcoal">Download Instantly</h3>
          <p className="font-modern font-light text-sm text-charcoal/70">Complete your purchase and receive immediate access to your high-resolution templates.</p>
        </div>
        <div>
          <div className="text-warm-gold font-display text-4xl mb-4">03</div>
          <h3 className="font-modern font-bold uppercase tracking-widest text-xs mb-3 text-charcoal">Personalize & Print</h3>
          <p className="font-modern font-light text-sm text-charcoal/70">Easily swap colors, fonts, and photos in Canva to match your wedding palette perfectly, then print anywhere.</p>
        </div>
      </div>
    </div>
  </section>
)

const TemplatesList = ({ onViewDetails }) => {
  const categories = [
    { title: "Wedding Invitations", name: "Invitation" },
    { title: "Stationery Expansion", name: "Stationery Expansion" },
    { title: "Ceremony Essentials", name: "Ceremony Essentials" },
    { title: "Reception Pack", name: "Reception Pack" },
    { title: "Event Signage", name: "Signage Pack" },
    { title: "Seating Charts", name: "Seating Chart" },
    { title: "Schedules & Timelines", name: "Schedule" },
    { title: "Planning Tools", name: "Checklist" },
    { title: "Social Media Announcements", name: "Social Media" }
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
  const [viewState, setViewState] = useState('browse') // 'browse', 'details', 'checkout', 'success'
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleViewDetails = (template) => {
    setSelectedTemplate(template)
    setViewState('details')
  }

  const handleBuyNow = (template) => {
    setSelectedTemplate(template)
    setViewState('checkout')
  }

  const handlePaymentSuccess = (template) => {
    setSelectedTemplate(template)
    setViewState('success')
  }

  const handleClose = () => {
    setSelectedTemplate(null)
    setViewState('browse')
  }

  return (
    <div className="min-h-screen bg-ivory/10">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <TemplatesList onViewDetails={handleViewDetails} />
      </main>
      <Footer />
      
      {viewState === 'details' && (
        <DetailsModal 
          template={selectedTemplate} 
          onClose={handleClose} 
          onBuyNow={handleBuyNow}
        />
      )}

      {viewState === 'checkout' && (
        <CheckoutModal 
          template={selectedTemplate} 
          onClose={() => setViewState('details')} 
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {viewState === 'success' && (
        <SuccessModal 
          template={selectedTemplate} 
          onClose={handleClose} 
        />
      )}
      <Analytics />
    </div>
  )
}

export default App
