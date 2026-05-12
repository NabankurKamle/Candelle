'use client';

import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export default function PageContainer({
    children,
    className = '',
}: Props) {
    return (
        <div
            className={`page-bg ${className}`}
            style={{
                height: '100dvh',
                overflow: 'hidden',
            }}
        >
            {/* FIXED APP LAYOUT */}
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* SCROLLABLE CONTENT */}
                <main
                    className="page-content"
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',

                        WebkitOverflowScrolling: 'touch',

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        paddingLeft: 22,
                        paddingRight: 22,

                        paddingTop: 90,
                        paddingBottom: 110,

                        gap: 28,
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}