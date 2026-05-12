'use client';

import { use, useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Queue } from '@/types';

import PageContainer from '@/components/ui/core/PageContainer';
import GlassCard from '@/components/ui/core/GlassCard';
import PrimaryButton from '@/components/ui/core/PrimaryButton';

import WishForm from '@/components/forms/WishForm';

export default function WishPage({
    params,
}: {
    params: Promise<{ queueId: string }>;
}) {
    const { queueId } = use(params);

    const [queue, setQueue] = useState<Queue | null>(null);
    const [posted, setPosted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .getQueueByWishLink(queueId)
            .then(setQueue)
            .finally(() => setLoading(false));
    }, [queueId]);

    /* ───────────────── LOADING ───────────────── */

    if (loading) {
        return (
            <PageContainer>

                <div className="flex-1 flex items-center justify-center w-full">

                    <GlassCard
                        variant="strong"
                        className="fade-up"
                        style={{
                            maxWidth: 320,
                            textAlign: 'center',
                        }}
                    >
                        <div className="float" style={{ fontSize: '2.4rem' }}>
                            🎁
                        </div>

                        <p
                            className="text-section"
                            style={{
                                marginTop: 10,
                                fontSize: '1.1rem',
                            }}
                        >
                            Preparing celebration...
                        </p>

                        <p
                            className="text-caption"
                            style={{ marginTop: 6 }}
                        >
                            Just a little birthday magic ✨
                        </p>
                    </GlassCard>

                </div>

            </PageContainer>
        );
    }

    /* ───────────────── NOT FOUND ───────────────── */

    if (!queue) {
        return (
            <PageContainer>

                <div className="flex-1 flex items-center justify-center w-full">

                    <GlassCard
                        variant="strong"
                        style={{
                            maxWidth: 360,
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>
                            😢
                        </div>

                        <h2 className="text-section">
                            Candelle Not Found
                        </h2>

                        <p
                            className="text-body"
                            style={{
                                marginTop: 10,
                                fontSize: '0.92rem',
                            }}
                        >
                            This candelle may have been removed,
                            expired or the link is incorrect.
                        </p>
                    </GlassCard>

                </div>

            </PageContainer>
        );
    }

    /* ───────────────── MAIN ───────────────── */

    return (
        <PageContainer>

            {/* Top navbar */}
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

                <span className="bb-badge">
                    Make someone smile today ✨
                </span>
            </div>

            {/* Hero */}
            <div
                className="fade-up text-center"
                style={{
                    maxWidth: 420,
                    paddingTop: 12,
                }}
            >
                <p className="text-caption">
                    Send a heartfelt birthday message to
                </p>

                <h1
                    className="text-hero-italic"
                    style={{
                        marginTop: 8,
                        fontSize: '2.6rem',
                    }}
                >
                    {queue.name}
                </h1>

                <p
                    className="text-body"
                    style={{
                        marginTop: 16,
                        maxWidth: 300,
                        marginInline: 'auto',
                    }}
                >
                    Write something sweet, funny,
                    emotional or unforgettable 💖
                </p>
            </div>

            {/* CONTENT */}
            {posted ? (
                <GlassCard
                    variant="strong"
                    className="fade-up"
                    style={{
                        maxWidth: 420,
                        textAlign: 'center',
                    }}
                >
                    <div
                        className="float"
                        style={{
                            fontSize: '2.8rem',
                            marginBottom: 12,
                        }}
                    >
                        🎊
                    </div>

                    <h2 className="text-section">
                        Wish Sent Successfully
                    </h2>

                    <p
                        className="text-body"
                        style={{
                            marginTop: 10,
                            fontSize: '0.92rem',
                        }}
                    >
                        Your message has been added
                        to the candelle 💕
                    </p>

                    <PrimaryButton
                        variant="ghost"
                        className="mt-5"
                        onPress={() => setPosted(false)}
                    >
                        ↺ Send Another Wish
                    </PrimaryButton>
                </GlassCard>
            ) : (
                <GlassCard
                    variant="strong"
                    className="fade-up"
                    style={{
                        maxWidth: 420,
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            marginBottom: 22,
                        }}
                    >
                        <p
                            style={{
                                color: 'var(--pink-400)',
                                fontSize: '1rem',
                                marginBottom: 6,
                            }}
                        >
                            ✦
                        </p>

                        <h2 className="text-section">
                            Leave Your Wish
                        </h2>

                        <p
                            className="text-caption"
                            style={{ marginTop: 4 }}
                        >
                            Make it beautiful ✨
                        </p>
                    </div>

                    <WishForm
                        wishLinkId={queueId}
                        onPosted={() => setPosted(true)}
                    />
                </GlassCard>
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