'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="page-bg min-h-screen flex flex-col items-center justify-center px-6 py-10 overflow-hidden relative">

            {/* Glow blobs */}
            <div className="absolute top-[-120px] left-[-60px] w-[240px] h-[240px] rounded-full bg-pink-400/20 blur-3xl" />
            <div className="absolute bottom-[-120px] right-[-60px] w-[240px] h-[240px] rounded-full bg-violet-400/20 blur-3xl" />

            <div
                className="glass fade-up w-full max-w-[380px] rounded-[36px] px-7 py-10 text-center relative z-10"
            >

                {/* Emoji */}
                <div
                    className="float"
                    style={{
                        fontSize: '4rem',
                        marginBottom: 18,
                    }}
                >
                    🎂
                </div>

                {/* 404 */}
                <p
                    style={{
                        fontSize: '0.72rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: 10,
                        fontWeight: 700,
                    }}
                >
                    Error 404
                </p>

                {/* Heading */}
                <h1 className="text-hero-italic">
                    Oops...
                </h1>

                <p
                    className="text-body"
                    style={{
                        marginTop: 14,
                        lineHeight: 1.7,
                    }}
                >
                    This birthday memory seems to have disappeared into the stars ✨
                </p>

                {/* Divider */}
                <div
                    className="divider"
                    style={{
                        maxWidth: 160,
                        margin: '22px auto',
                    }}
                >
                    <span
                        style={{
                            color: 'var(--pink-400)',
                            fontSize: '0.85rem',
                        }}
                    >
                        ♥
                    </span>
                </div>

                {/* Button */}
                <Link
                    href="/"
                    className="btn-primary"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textDecoration: 'none',
                    }}
                >
                    ↺ Back To Home
                </Link>

                {/* Caption */}
                <p
                    className="text-caption"
                    style={{
                        marginTop: 16,
                    }}
                >
                    Maybe the link expired or never existed 💜
                </p>

            </div>

        </main>
    );
}