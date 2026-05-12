'use client';

import { useEffect, useState } from 'react';

interface Props {
    birthdate: string;
    name: string;
}

function getNextBirthday(birthdate: string) {
    const today = new Date();

    const bd = new Date(birthdate);

    const next = new Date(
        today.getFullYear(),
        bd.getMonth(),
        bd.getDate()
    );

    if (next < today) {
        next.setFullYear(today.getFullYear() + 1);
    }

    return next;
}

function isBirthdayToday(birthdate: string) {
    const today = new Date();

    const bd = new Date(birthdate);

    return (
        today.getMonth() === bd.getMonth() &&
        today.getDate() === bd.getDate()
    );
}

export default function CountdownTimer({
    birthdate,
    name,
}: Props) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const isToday = isBirthdayToday(birthdate);

    useEffect(() => {
        if (isToday) return;

        const update = () => {
            const diff =
                getNextBirthday(
                    birthdate
                ).getTime() - Date.now();

            setTimeLeft({
                days: Math.floor(diff / 86400000),

                hours: Math.floor(
                    (diff % 86400000) / 3600000
                ),

                minutes: Math.floor(
                    (diff % 3600000) / 60000
                ),

                seconds: Math.floor(
                    (diff % 60000) / 1000
                ),
            });
        };

        update();

        const t = setInterval(update, 1000);

        return () => clearInterval(t);
    }, [birthdate, isToday]);

    /* ───────────────── TODAY ───────────────── */

    if (isToday) {
        return (
            <div
                className="fade-up text-center"
                style={{
                    maxWidth: 420,
                    paddingTop: 8,
                }}
            >
                <div
                    className="float"
                    style={{
                        fontSize: '4rem',
                        marginBottom: 14,
                    }}
                >
                    🎂
                </div>

                <h1 className="text-hero">
                    Happy Birthday
                </h1>

                <h1
                    className="text-hero-italic"
                    style={{ marginTop: -4 }}
                >
                    {name} ✨
                </h1>

                <p
                    className="text-body"
                    style={{
                        marginTop: 16,
                        maxWidth: 300,
                        marginInline: 'auto',
                    }}
                >
                    Today is all about love,
                    memories, happiness and beautiful
                    surprises 💖
                </p>
            </div>
        );
    }

    /* ───────────────── COUNTDOWN ───────────────── */

    const units = [
        {
            label: 'Days',
            value: timeLeft.days,
            icon: '🌸',
        },
        {
            label: 'Hours',
            value: timeLeft.hours,
            icon: '✨',
        },
        {
            label: 'Mins',
            value: timeLeft.minutes,
            icon: '🎀',
        },
        {
            label: 'Secs',
            value: timeLeft.seconds,
            icon: '💖',
        },
    ];

    return (
        <div
            className="fade-up text-center"
            style={{
                width: '100%',
                maxWidth: 420,
                paddingTop: 10,
            }}
        >
            <p className="text-caption">
                Countdown to something magical ✨
            </p>

            <h1
                className="text-hero-italic"
                style={{
                    marginTop: 8,
                    fontSize: '2.6rem',
                }}
            >
                {name}'s Birthday
            </h1>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(2, minmax(0,1fr))',
                    gap: 14,
                    marginTop: 26,
                }}
            >
                {units.map((u) => (
                    <div
                        key={u.label}
                        className="glass-sm"
                        style={{
                            padding: '20px 14px',
                            textAlign: 'center',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '1.3rem',
                                marginBottom: 6,
                            }}
                        >
                            {u.icon}
                        </p>

                        <p
                            className="font-display"
                            style={{
                                fontSize: '2rem',
                                color:
                                    'var(--text-dark)',
                                lineHeight: 1,
                            }}
                        >
                            {u.value}
                        </p>

                        <p
                            className="text-caption"
                            style={{
                                marginTop: 8,
                            }}
                        >
                            {u.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}