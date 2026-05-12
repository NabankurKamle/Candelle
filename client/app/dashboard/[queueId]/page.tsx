'use client';

import { use, useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Queue, Wish } from '@/types';

import PageContainer from '@/components/ui/core/PageContainer';
import GlassCard from '@/components/ui/core/GlassCard';
import PrimaryButton from '@/components/ui/core/PrimaryButton';

import WishCard from '@/components/ui/WishCard';

export default function DashboardPage({
    params,
}: {
    params: Promise<{ queueId: string }>;
}) {
    const { queueId } = use(params);

    const [queue, setQueue] = useState<Queue | null>(null);

    const [wishes, setWishes] = useState<Wish[]>([]);

    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);

    const [editName, setEditName] = useState('');

    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        api.getQueueByDashboard(queueId)
            .then(async (q) => {
                setQueue(q);

                setEditName(q.name);

                const w = await api.getWishes(q._id);

                setWishes(w);
            })
            .finally(() => setLoading(false));
    }, [queueId]);

    const handleSaveName = async () => {
        if (!queue) return;

        const updated = await api.updateQueue(queueId, {
            name: editName,
        });

        setQueue(updated);

        setEditing(false);
    };

    const handleDeleteWish = async (id: string) => {
        await api.deleteWish(id);

        setWishes((w) => w.filter((x) => x._id !== id));
    };

    const handleDeleteQueue = async () => {
        if (!confirm('Delete this entire candelle? 💔')) {
            return;
        }

        await api.deleteQueue(queueId);

        window.location.href = '/';
    };

    const base =
        typeof window !== 'undefined'
            ? window.location.origin
            : '';

    const copy = (text: string, key: string) => {
        navigator.clipboard.writeText(text);

        setCopied(key);

        setTimeout(() => setCopied(null), 1800);
    };

    /* ───────────────── LOADING ───────────────── */

    if (loading) {
        return (
            <PageContainer>

                <div className="flex-1 flex items-center justify-center w-full">

                    <GlassCard
                        variant="strong"
                        style={{
                            maxWidth: 320,
                            textAlign: 'center',
                        }}
                    >
                        <div
                            className="float"
                            style={{ fontSize: '2.4rem' }}
                        >
                            🎂
                        </div>

                        <p
                            className="text-section"
                            style={{
                                marginTop: 10,
                                fontSize: '1.1rem',
                            }}
                        >
                            Loading dashboard...
                        </p>

                        <p
                            className="text-caption"
                            style={{ marginTop: 5 }}
                        >
                            Gathering all the birthday magic ✨
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
                        <div
                            style={{
                                fontSize: '2.8rem',
                                marginBottom: 12,
                            }}
                        >
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
                            This dashboard link may no longer exist.
                        </p>
                    </GlassCard>

                </div>

            </PageContainer>
        );
    }

    return (
        <PageContainer>

            {/* NAVBAR */}
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
                    Manage your birthday memories ✨
                </span>
            </div>

            {/* HERO */}
            <div
                className="fade-up text-center"
                style={{
                    maxWidth: 420,
                    paddingTop: 12,
                }}
            >
                <p className="text-caption">
                    Managing candelle for
                </p>

                <h1
                    className="text-hero-italic"
                    style={{
                        marginTop: 8,
                        fontSize: '2.5rem',
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
                    Edit details, manage wishes and
                    share your birthday links 💖
                </p>
            </div>

            {/* DASHBOARD CARD */}
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
                        marginBottom: 24,
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
                        Candelle Settings
                    </h2>

                    <p
                        className="text-caption"
                        style={{ marginTop: 4 }}
                    >
                        Customize your celebration ✨
                    </p>
                </div>

                {/* EDIT NAME */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                    }}
                >
                    <div>
                        <label className="field-label">
                            Birthday Person
                        </label>

                        <div className="input-wrap">
                            <span className="input-icon">
                                🎂
                            </span>

                            <input
                                className="bb-input"
                                value={editName}
                                onChange={(e) =>
                                    setEditName(
                                        e.target.value
                                    )
                                }
                                disabled={!editing}
                            />
                        </div>
                    </div>

                    {!editing ? (
                        <PrimaryButton
                            variant="ghost"
                            onPress={() =>
                                setEditing(true)
                            }
                        >
                            ✏️ Edit Name
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton
                            onPress={handleSaveName}
                        >
                            ✦ Save Changes
                        </PrimaryButton>
                    )}

                    {/* META */}
                    <div
                        className="divider"
                        style={{ margin: '4px 0' }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                        }}
                    >
                        <p className="text-caption">
                            Created by{' '}
                            <span
                                style={{
                                    color:
                                        'var(--text-dark)',
                                    fontWeight: 600,
                                }}
                            >
                                {queue.creatorName}
                            </span>
                        </p>

                        <p className="text-caption">
                            Created on{' '}
                            <span
                                style={{
                                    color:
                                        'var(--text-dark)',
                                    fontWeight: 600,
                                }}
                            >
                                {new Date(
                                    queue.createdAt
                                ).toLocaleDateString(
                                    'en-IN',
                                    {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    }
                                )}
                            </span>
                        </p>
                    </div>

                    {/* LINKS */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            marginTop: 6,
                        }}
                    >
                        {[
                            {
                                key: 'wish',
                                label: 'Wish Link',
                                path: `wish/${queue.wishLinkId}`,
                                icon: '💌',
                            },
                            {
                                key: 'birthday',
                                label: 'Birthday Page',
                                path: `birthday/${queue.birthdayLinkId}`,
                                icon: '🎂',
                            },
                        ].map((item) => {
                            const url = `${base}/${item.path}`;

                            const isCopied =
                                copied === item.key;

                            return (
                                <div
                                    key={item.key}
                                    className="link-row"
                                >
                                    <div className="icon-circle icon-md icon-pink">
                                        {item.icon}
                                    </div>

                                    <div
                                        style={{
                                            flex: 1,
                                            minWidth: 0,
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize:
                                                    '0.82rem',
                                                fontWeight: 600,
                                                color:
                                                    'var(--text-dark)',
                                            }}
                                        >
                                            {item.label}
                                        </p>

                                        <p className="link-url">
                                            {url}
                                        </p>
                                    </div>

                                    <button
                                        className={`btn-copy ${isCopied
                                            ? 'btn-copy-ok'
                                            : 'btn-copy-pink'
                                            }`}
                                        onClick={() =>
                                            copy(
                                                url,
                                                item.key
                                            )
                                        }
                                    >
                                        {isCopied
                                            ? '✓'
                                            : 'Copy'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* DELETE */}
                    <button
                        onClick={handleDeleteQueue}
                        className="btn-ghost"
                        style={{
                            marginTop: 6,
                            borderColor:
                                'rgba(255,120,120,0.25)',
                            color: '#d85b7a',
                        }}
                    >
                        🗑 Delete Candelle
                    </button>
                </div>
            </GlassCard>

            {/* WISHES */}
            <div
                className="fade-up"
                style={{
                    width: '100%',
                    maxWidth: 420,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <h2 className="text-section">
                        💌 Birthday Wishes
                    </h2>

                    <p
                        className="text-caption"
                        style={{ marginTop: 4 }}
                    >
                        {wishes.length} beautiful messages
                    </p>
                </div>

                {wishes.length === 0 && (
                    <GlassCard
                        variant="soft"
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '2rem',
                                marginBottom: 10,
                            }}
                        >
                            🌸
                        </p>

                        <p className="text-body">
                            No wishes yet...
                        </p>

                        <p
                            className="text-caption"
                            style={{ marginTop: 4 }}
                        >
                            Share your wish link with friends
                            and family ✨
                        </p>
                    </GlassCard>
                )}

                {wishes.map((w) => (
                    <WishCard
                        key={w._id}
                        wish={w}
                        onDelete={handleDeleteWish}
                        showActions
                    />
                ))}
            </div>

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