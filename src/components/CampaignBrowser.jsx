import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { getCampaigns } from '../api/campaigns'
import { createApplication, getApplications } from '../api/applications'
import PlatformBadge from './PlatformBadge'
import LoadingSpinner from './LoadingSpinner'
import './CampaignBrowser.css'

const PLATFORMS = ['All', 'Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Facebook', 'Pinterest', 'Snapchat']
const MAX_PITCH = 500

// ─── Apply Modal ──────────────────────────────────────────────────────────────

function ApplyModal({ campaign, onSubmit, onClose, submitting }) {
  const [pitch, setPitch] = useState('')
  const textareaRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    textareaRef.current?.focus()

    function onKey(e) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll('button:not([disabled]), textarea, a[href]')
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(pitch.trim())
  }

  const dl = campaign.deadline
    ? new Date(campaign.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl flex flex-col"
        style={{ backgroundColor: '#16161f', border: '1px solid #2a2a38', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-6 pb-4">
          <div className="min-w-0">
            <p className="text-xs font-medium mb-1" style={{ color: '#9494aa' }}>Applying to</p>
            <h2 id="apply-modal-title" className="text-lg font-bold text-white leading-snug">
              {campaign.campaignTitle}
            </h2>
            <p className="text-sm mt-0.5 font-medium" style={{ color: '#a78bfa' }}>
              {campaign.brandName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close apply modal"
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all mt-0.5"
            style={{ color: '#9494aa', backgroundColor: '#1a1a28', border: '1px solid #2a2a38' }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Campaign details */}
        <div className="px-6 overflow-y-auto" style={{ flex: '1 1 auto' }}>
          {/* Key meta */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <PlatformBadge platform={campaign.platform} />
            {campaign.budget && (
              <span
                className="text-xs px-2.5 py-1 rounded-md font-medium"
                style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                ${Number(campaign.budget).toLocaleString()} budget
              </span>
            )}
            {dl && (
              <span
                className="text-xs px-2.5 py-1 rounded-md font-medium"
                style={{ backgroundColor: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}
              >
                Due {dl}
              </span>
            )}
          </div>

          {/* Description */}
          {campaign.description && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: '#7878a0' }}>About</p>
              <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{campaign.description}</p>
            </div>
          )}

          {/* Requirements */}
          {campaign.requirements && (
            <div className="mb-4">
              <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: '#7878a0' }}>Requirements</p>
              <div
                className="p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap"
                style={{ backgroundColor: '#0f0f18', color: '#9ca3af', border: '1px solid #2a2a38' }}
              >
                {campaign.requirements}
              </div>
            </div>
          )}

          {/* Pitch form */}
          <form id="apply-form" onSubmit={handleSubmit}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <label htmlFor="pitch" className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7878a0' }}>
                Your Pitch <span style={{ color: '#9494aa', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
              </label>
              <span className="text-xs" style={{ color: pitch.length > MAX_PITCH * 0.9 ? '#fbbf24' : '#7878a0' }}>
                {pitch.length}/{MAX_PITCH}
              </span>
            </div>
            <textarea
              id="pitch"
              ref={textareaRef}
              value={pitch}
              onChange={e => e.target.value.length <= MAX_PITCH && setPitch(e.target.value)}
              rows={4}
              placeholder="Tell the brand why you're a great fit — your niche, audience size, past work, or anything that makes you stand out…"
              className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all resize-none"
              style={{ backgroundColor: '#1a1a28', border: '1px solid #2a2a38', color: 'white' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.6)')}
              onBlur={e => (e.target.style.borderColor = '#2a2a38')}
            />
          </form>
        </div>

        {/* Footer actions */}
        <div className="p-6 pt-4 flex gap-3" style={{ borderTop: '1px solid #2a2a38' }}>
          <button
            type="submit"
            form="apply-form"
            disabled={submitting}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? 'Submitting…' : 'Submit Application'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-5 py-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: '#1a1a28', color: '#9ca3af', border: '1px solid #2a2a38' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

ApplyModal.propTypes = {
  campaign: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

// ─── CampaignBrowser ──────────────────────────────────────────────────────────

export default function CampaignBrowser({ creatorName }) {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [platform, setPlatform] = useState('All')
  const [applied, setApplied] = useState({})
  const [applyingTo, setApplyingTo] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      getCampaigns({ status: 'open' }),
      getApplications({ creatorName }),
    ])
      .then(([fetchedCampaigns, existingApps]) => {
        setCampaigns(fetchedCampaigns)
        const alreadyApplied = {}
        for (const app of existingApps) alreadyApplied[app.campaignId] = true
        setApplied(alreadyApplied)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [creatorName])

  async function handleApply(pitch) {
    if (!applyingTo) return
    setSubmitting(true)
    try {
      await createApplication({
        campaignId: applyingTo._id,
        campaignTitle: applyingTo.campaignTitle,
        brandName: applyingTo.brandName,
        creatorName,
        message: pitch,
      })
      setApplied(prev => ({ ...prev, [applyingTo._id]: true }))
      toast.success(`Applied to ${applyingTo.campaignTitle}!`)
      setApplyingTo(null)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const filtered = platform === 'All' ? campaigns : campaigns.filter(c => c.platform === platform)

  if (loading) return <LoadingSpinner text="Loading open campaigns..." />

  return (
    <div className="max-w-6xl">
      {applyingTo && (
        <ApplyModal
          campaign={applyingTo}
          onSubmit={handleApply}
          onClose={() => !submitting && setApplyingTo(null)}
          submitting={submitting}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Browse Campaigns</h1>
        <p style={{ color: '#9494aa' }}>Discover open brand campaigns and apply</p>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {PLATFORMS.map(p => (
          <button
            key={p}
            type="button"
            onClick={() => setPlatform(p)}
            aria-pressed={platform === p}
            aria-label={p === 'All' ? 'Show all platforms' : `Filter by ${p}`}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={
              platform === p
                ? { background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', border: '1px solid transparent' }
                : { backgroundColor: '#16161f', color: '#9494aa', border: '1px solid #2a2a38' }
            }
          >
            {p}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl text-sm"
          style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
          {error}
        </div>
      )}

      <div className="campaign-browser__grid">
        {filtered.map(c => {
          const isApplied = applied[c._id]
          return (
            <div
              key={c._id}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ backgroundColor: '#16161f', border: '1px solid #2a2a38' }}
            >
              <div>
                <p className="text-sm font-semibold text-white leading-snug">{c.campaignTitle}</p>
                <p className="text-xs mt-1" style={{ color: '#9494aa' }}>{c.brandName}</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <PlatformBadge platform={c.platform} />
                {c.budget && (
                  <span className="text-xs px-2 py-0.5 rounded-md font-medium"
                    style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                    ${Number(c.budget).toLocaleString()}
                  </span>
                )}
              </div>

              {c.description && (
                <p className="text-xs leading-relaxed campaign-browser__desc" style={{ color: '#9ca3af' }}>
                  {c.description}
                </p>
              )}

              <div className="flex items-center gap-3 flex-wrap">
                {c.deadline && (
                  <p className="text-xs" style={{ color: '#9494aa' }}>
                    Deadline: {new Date(c.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
                {c.requirements && (
                  <span className="text-xs px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' }}>
                    Has brief
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => !isApplied && setApplyingTo(c)}
                disabled={isApplied}
                aria-label={isApplied ? `Already applied to ${c.campaignTitle}` : `Apply to ${c.campaignTitle}`}
                className="mt-auto w-full py-2 rounded-xl text-xs font-semibold text-white transition-all"
                style={
                  isApplied
                    ? { backgroundColor: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', cursor: 'default' }
                    : { background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }
                }
              >
                {isApplied ? 'Applied ✓' : 'Apply'}
              </button>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 rounded-2xl"
            style={{ backgroundColor: '#16161f', border: '1px solid #2a2a38', gridColumn: '1 / -1' }}>
            <p className="text-2xl mb-3">🔍</p>
            <p className="text-white font-medium text-sm">
              {platform === 'All' ? 'No open campaigns right now' : `No open ${platform} campaigns right now`}
            </p>
            <p className="text-xs mt-1" style={{ color: '#9494aa' }}>
              {platform === 'All'
                ? 'Check back soon — brands post new campaigns regularly.'
                : 'Try selecting a different platform — new campaigns are added regularly.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

CampaignBrowser.propTypes = {
  creatorName: PropTypes.string.isRequired,
}
