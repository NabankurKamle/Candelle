'use client';

import { useState } from 'react';
import { Queue } from '@/types';
import PageContainer from '@/components/ui/core/PageContainer';
import GlassCard from '@/components/ui/core/GlassCard';
import PrimaryButton from '@/components/ui/core/PrimaryButton';
import CreateQueueForm from '@/components/forms/CreateQueueForm';

const LINK_META = [
  { key: 'wishLinkId', label: 'Wish Link', desc: 'For friends & family to send wishes', icon: '💌', path: 'wish', copyClass: 'btn-copy-pink' },
  { key: 'birthdayLinkId', label: 'Birthday Page', desc: 'View all the beautiful wishes', icon: '🎂', path: 'birthday', copyClass: 'btn-copy-violet' },
  { key: 'dashboardId', label: 'Dashboard', desc: 'Manage your box & wishes', icon: '⚙️', path: 'dashboard', copyClass: 'btn-copy-peach' },
] as const;

export default function HomePage() {
  const [created, setCreated] = useState<Queue | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const base = typeof window !== 'undefined' ? window.location.origin : '';

  const copy = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <PageContainer>

      {/* ── Navbar ── */}
      <div
        className="bb-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,

          zIndex: 100,

          width: '100%',

          backdropFilter: 'blur(20px)',
        }}
      >
        <span className="bb-logo">🎂 Candelle</span>
        <span className="bb-badge">Made with 💜 for someone special</span>
      </div>

      {!created ? (
        <>
          {/* ── Hero ── */}
          <div className="fade-up text-center pt-4" style={{ maxWidth: 400 }}>
            <h1 className="text-hero">A box full of</h1>
            <h1 className="text-hero-italic">love &amp; wishes</h1>

            <p className="text-body" style={{ marginTop: 16, maxWidth: 300, margin: '16px auto 0' }}>
              Create a beautiful space where your friends and family can leave
              messages, memories and birthday wishes for someone truly special.
            </p>

            {/* Divider heart */}
            <div className="divider d2 fade-up" style={{ maxWidth: 180, margin: '20px auto' }}>
              <span style={{ color: 'var(--pink-400)', fontSize: '0.8rem' }}>♥</span>
            </div>

            {/* Feature icons */}
            <div className="d3 fade-up" style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 4 }}>
              {[
                { icon: '💗', label: 'Collect', sub: 'Heartfelt wishes', cls: 'icon-pink' },
                { icon: '🎁', label: 'Save', sub: 'Beautiful memories', cls: 'icon-violet' },
                { icon: '🌸', label: 'Cherish', sub: 'Forever & always', cls: 'icon-peach' },
              ].map(f => (
                <div key={f.label} style={{ textAlign: 'center' }}>
                  <div className={`icon-circle icon-lg ${f.cls}`} style={{ margin: '0 auto 10px' }}>
                    {f.icon}
                  </div>
                  <p style={{ fontSize: '0.80rem', fontWeight: 600, color: 'var(--text-dark)' }}>{f.label}</p>
                  <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 1 }}>{f.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Form Card ── */}
          <GlassCard variant="strong" className="d4 fade-up" style={{ maxWidth: 420 }}>
            {/* Card header */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <p style={{ color: 'var(--pink-400)', fontSize: '1rem', marginBottom: 6 }}>✦</p>
              <h2 className="text-section">Create a Candelle</h2>
              <p className="text-caption" style={{ marginTop: 4 }}>Let the magic begin ✨</p>
            </div>

            <CreateQueueForm onCreated={setCreated} />

            <p className="text-caption" style={{ textAlign: 'center', marginTop: 14 }}>
              It's free, simple and beautiful ✨
            </p>
          </GlassCard>
        </>
      ) : (
        <>
          {/* ── Success Card ── */}
          <GlassCard variant="strong" className="fade-up" style={{ maxWidth: 420, marginTop: 24 }}>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div className="float" style={{ fontSize: '2.6rem', marginBottom: 12 }}>🎉</div>
              <h2 className="text-section">Yay! Your Candelle is Ready 🎊</h2>
              <p className="text-caption" style={{ marginTop: 5 }}>Share these links with your loved ones</p>
            </div>

            {/* Link rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
              {LINK_META.map(({ key, label, desc, icon, path, copyClass }) => {
                const url = `${base}/${path}/${created[key as keyof Queue]}`;
                const isCopied = copied === key;
                return (
                  <div key={key} className="link-row">

                    {/* Icon */}
                    <div className={`icon-circle icon-md ${key === 'wishLinkId' ? 'icon-pink' :
                      key === 'birthdayLinkId' ? 'icon-violet' : 'icon-peach'
                      }`}>
                      {icon}
                    </div>

                    {/* Label + desc + url */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>{label}</p>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{desc}</p>
                      <p className="link-url" style={{ marginTop: 2 }}>{url}</p>
                    </div>

                    {/* Copy button */}
                    <button
                      className={`btn-copy ${isCopied ? 'btn-copy-ok' : copyClass}`}
                      onClick={() => copy(url, key)}
                    >
                      {isCopied ? '✓' : 'Copy'}
                    </button>

                  </div>
                );
              })}
            </div>

            <PrimaryButton variant="ghost" onPress={() => setCreated(null)}>
              ↺ Create Another Box
            </PrimaryButton>

          </GlassCard>

          {/* ── Tagline ── */}
          <div className="d2 fade-up text-center" style={{ paddingBottom: 20 }}>
            <p className="font-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              It's not just a box,<br />
              <span style={{ color: 'var(--pink-400)' }}>it's a memory they'll keep ♡</span>
            </p>
          </div>
        </>
      )}

      <footer
        className="bb-footer"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,

          zIndex: 100,

          backdropFilter: 'blur(20px)',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          gap: 2,

          paddingTop: 10,
          paddingBottom:
            'calc(10px + env(safe-area-inset-bottom))',
        }}
      >
        <p
          style={{
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          Made with 💜 and birthday magic ✨
        </p>

        <p
          style={{
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            opacity: 0.92,
          }}
        >
          Designed by{' '}

          <a
            href="https://linkedin.com/in/protyusha-mahalder"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'var(--pink-400)',
              textDecoration: 'none',
              fontWeight: 600,
              transition: '0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.75';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Protyusha ✦
          </a>
        </p>
      </footer>

    </PageContainer>
  );
}