'use client';

import { use, useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { Queue, Wish } from '@/types';

import PageContainer from '@/components/ui/core/PageContainer';
import GlassCard from '@/components/ui/core/GlassCard';
import PrimaryButton from '@/components/ui/core/PrimaryButton';

import BirthdayCountdown from '@/components/ui/CountdownTimer';
import WishCard from '@/components/ui/WishCard';
import Confetti from '@/components/ui/FloatingPetals';

function isBirthdayToday(birthdate: string) {
    const today = new Date();

    const bd = new Date(birthdate);

    return (
        today.getMonth() === bd.getMonth() &&
        today.getDate() === bd.getDate()
    );
}

export default function BirthdayPage({
    params,
}: {
    params: Promise<{ queueId: string }>;
}) {
    const { queueId } = use(params);

    const [queue, setQueue] = useState<Queue | null>(null);

    const [wishes, setWishes] = useState<Wish[]>([]);

    const [loading, setLoading] = useState(true);

    const [started, setStarted] = useState(false);

    const [wishIdx, setWishIdx] = useState(0);

    useEffect(() => {
        api
            .getQueueByBirthdayLink(queueId)
            .then(async (q) => {
                setQueue(q);

                const w = await api.getWishes(q._id);

                setWishes(w);
            })
            .finally(() => setLoading(false));
    }, [queueId]);

    const nextWish = () => {
        if (wishIdx + 1 < wishes.length) {
            setWishIdx((i) => i + 1);
        }
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
                            Opening Candelle...
                        </p>

                        <p
                            className="text-caption"
                            style={{ marginTop: 6 }}
                        >
                            Preparing beautiful memories ✨
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
                            This birthday page may no longer exist
                            or the link is incorrect.
                        </p>
                    </GlassCard>

                </div>

            </PageContainer>
        );
    }

    const isToday = isBirthdayToday(queue.birthdate);

    const currentWish = wishes[wishIdx];

    return (
        <PageContainer>

            {isToday && <Confetti />}

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
                    Made with love & memories ✨
                </span>
            </div>

            {/* HERO */}
            <BirthdayCountdown
                birthdate={queue.birthdate}
                name={queue.name}
            />

            {/* BIRTHDAY MODE */}
            {isToday ? (
                <>
                    {!started && wishes.length > 0 && (
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
                                    fontSize: '3rem',
                                    marginBottom: 12,
                                }}
                            >
                                🎁
                            </div>

                            <h2 className="text-section">
                                Your Wishes Are Ready
                            </h2>

                            <p
                                className="text-body"
                                style={{
                                    marginTop: 12,
                                }}
                            >
                                Friends and family left beautiful
                                messages for you 💖
                            </p>

                            <PrimaryButton
                                className="mt-5"
                                onPress={() =>
                                    setStarted(true)
                                }
                            >
                                ✦ Open Birthday Wishes
                            </PrimaryButton>
                        </GlassCard>
                    )}

                    {/* WISH REVEAL */}
                    {started && currentWish && (
                        <div
                            style={{
                                width: '100%',
                                maxWidth: 420,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 18,
                            }}
                        >
                            <div
                                className="fade-up"
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <p className="text-caption">
                                    Wish {wishIdx + 1} of{' '}
                                    {wishes.length}
                                </p>

                                <h2
                                    className="text-section"
                                    style={{
                                        marginTop: 4,
                                    }}
                                >
                                    💌 A Message For You
                                </h2>
                            </div>

                            <WishCard
                                wish={currentWish}
                            />

                            {wishIdx + 1 <
                                wishes.length ? (
                                <PrimaryButton
                                    onPress={nextWish}
                                >
                                    💝 Open Next Wish
                                </PrimaryButton>
                            ) : (
                                <GlassCard
                                    variant="soft"
                                    style={{
                                        textAlign:
                                            'center',
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize:
                                                '2rem',
                                            marginBottom: 10,
                                        }}
                                    >
                                        🌸
                                    </p>

                                    <h3 className="text-section">
                                        That's All Your Wishes
                                    </h3>

                                    <p
                                        className="text-caption"
                                        style={{
                                            marginTop: 6,
                                        }}
                                    >
                                        Every message was written
                                        with love 💖
                                    </p>
                                </GlassCard>
                            )}
                        </div>
                    )}

                    {/* NO WISHES */}
                    {isToday &&
                        wishes.length === 0 && (
                            <GlassCard
                                variant="soft"
                                style={{
                                    maxWidth: 420,
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

                                <h2 className="text-section">
                                    No Wishes Yet
                                </h2>

                                <p
                                    className="text-caption"
                                    style={{
                                        marginTop: 6,
                                    }}
                                >
                                    Your candelle is still
                                    waiting for messages ✨
                                </p>
                            </GlassCard>
                        )}
                </>
            ) : (
                /* COUNTDOWN MODE */
                <GlassCard
                    variant="strong"
                    className="fade-up"
                    style={{
                        maxWidth: 420,
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: '2.4rem',
                            marginBottom: 12,
                        }}
                    >
                        🎈
                    </div>

                    <h2 className="text-section">
                        Birthday Wishes Locked
                    </h2>

                    <p
                        className="text-body"
                        style={{
                            marginTop: 10,
                            fontSize: '0.92rem',
                        }}
                    >
                        The birthday wishes will unlock
                        automatically on the special day ✨
                    </p>
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