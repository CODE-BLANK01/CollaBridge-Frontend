import { useState } from 'react'
import { Link } from 'react-router-dom'

const BRAND_STEPS = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: 'Post a Campaign',
    desc: 'Set your platform, budget, content brief, and go live. Creators can discover and apply immediately.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    title: 'Review Applications',
    desc: 'Read every creator\'s pitch in your inbox. Move them through your pipeline — review, approve, or request revisions.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Close the Deal',
    desc: 'Approve the creator\'s draft and close the deal. Everything tracked in one place — no spreadsheets needed.',
  },
]

const CREATOR_STEPS = [
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Browse Open Campaigns',
    desc: 'Filter by platform, see budgets and deadlines upfront. Read the full brief before you commit to applying.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: 'Apply with a Pitch',
    desc: 'Write a short pitch explaining why you\'re the right fit. The brand receives it directly in their inbox.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Submit & Get Paid',
    desc: 'Upload your draft link once approved. The brand reviews, confirms, and closes the deal. You\'re done.',
  },
]

const FEATURES = [
  {
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))',
    border: 'rgba(124,58,237,0.3)',
    iconColor: '#a78bfa',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Real-Time Dashboard',
    desc: 'Brands see active campaigns, new applications, and deals closing. Creators track every application and its status.',
  },
  {
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.2), rgba(249,115,22,0.1))',
    border: 'rgba(236,72,153,0.3)',
    iconColor: '#f9a8d4',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Role-Based Workspaces',
    desc: 'Brands and creators each get a tailored experience. No clutter, no confusion — just the tools you need.',
  },
  {
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
    border: 'rgba(16,185,129,0.3)',
    iconColor: '#34d399',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Draft & Revision Flow',
    desc: 'Creators submit draft links directly in the app. Brands approve, request changes, or close the deal — all in one thread.',
  },
]

function StepCard({ step, accent }) {
  return (
    <div className="flex gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent, color: 'white' }}
      >
        {step.icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-1">{step.title}</p>
        <p className="text-sm leading-relaxed" style={{ color: '#9494aa' }}>{step.desc}</p>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('brand')
  const isBrand = activeTab === 'brand'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f18', color: 'white' }}>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: 'rgba(15,15,24,0.85)', borderBottom: '1px solid rgba(42,42,56,0.6)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-2.5">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="36" height="36" rx="10" fill="url(#nav-grad)" />
            <circle cx="13" cy="18" r="6" fill="white" fillOpacity="0.25" />
            <circle cx="23" cy="18" r="6" fill="white" fillOpacity="0.25" />
            <path d="M18 12.6a6 6 0 0 1 0 10.8A6 6 0 0 1 18 12.6z" fill="white" fillOpacity="0.45" />
            <rect x="11" y="17" width="14" height="2" rx="1" fill="white" fillOpacity="0.9" />
            <defs>
              <linearGradient id="nav-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-semibold text-white">CollaBridge</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium px-4 py-2 rounded-xl transition-all"
            style={{ color: '#9494aa' }}>
            Sign in
          </Link>
          <Link to="/register" className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-32 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ backgroundColor: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
            Brand × Creator OS
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-5 tracking-tight">
            Where Brands &amp; Creators{' '}
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f9a8d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Actually Collab
            </span>
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: '#9494aa' }}>
            CollaBridge handles everything from campaign creation to deal close — applications, draft reviews, revisions, and sign-off. All in one clean workspace.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/register"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', boxShadow: '0 0 24px rgba(124,58,237,0.3)' }}>
              Start for free →
            </Link>
            <Link to="/login"
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: '#16161f', color: '#9ca3af', border: '1px solid #2a2a38' }}>
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">How it works</h2>
          <p className="text-sm" style={{ color: '#9494aa' }}>Pick your role to see your journey</p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex p-1 rounded-xl gap-1"
            style={{ backgroundColor: '#16161f', border: '1px solid #2a2a38' }}>
            {[
              { key: 'brand', label: '◈ I\'m a Brand' },
              { key: 'creator', label: '✦ I\'m a Creator' },
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={activeTab === tab.key}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                style={activeTab === tab.key
                  ? { background: tab.key === 'brand' ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'linear-gradient(135deg, #ec4899, #be185d)', color: 'white' }
                  : { color: '#9494aa', backgroundColor: 'transparent' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div
          className="rounded-2xl p-8 space-y-8"
          style={{
            background: isBrand
              ? 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.04))'
              : 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(249,115,22,0.04))',
            border: `1px solid ${isBrand ? 'rgba(124,58,237,0.2)' : 'rgba(236,72,153,0.2)'}`,
          }}
        >
          {(isBrand ? BRAND_STEPS : CREATOR_STEPS).map((step, i) => (
            <StepCard
              key={i}
              step={step}
              accent={isBrand
                ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                : 'linear-gradient(135deg, #ec4899, #be185d)'}
            />
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Everything you need, nothing you don&apos;t</h2>
          <p className="text-sm" style={{ color: '#9494aa' }}>Built for the modern creator economy</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="rounded-2xl p-6"
              style={{ background: f.gradient, border: `1px solid ${f.border}` }}>
              <div className="mb-3" style={{ color: f.iconColor }}>{f.icon}</div>
              <p className="text-sm font-semibold text-white mb-1.5">{f.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: '#9494aa' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center rounded-2xl p-12 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))', border: '1px solid rgba(124,58,237,0.25)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-20"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', filter: 'blur(60px)', transform: 'translate(30%, -30%)' }} />
          <div className="relative">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to collab?</h2>
            <p className="text-sm mb-8" style={{ color: '#9494aa' }}>
              Join CollaBridge free. Set up your profile in minutes and start connecting.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link to="/register"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }}>
                Create your account
              </Link>
              <Link to="/login"
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' }}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-6 text-center" style={{ borderTop: '1px solid #2a2a38' }}>
        <p className="text-xs" style={{ color: '#7878a0' }}>
          © 2025 CollaBridge — Brand × Creator OS
        </p>
      </footer>
    </div>
  )
}
