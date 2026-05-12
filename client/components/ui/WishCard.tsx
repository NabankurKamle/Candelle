'use client';

import { Wish } from '@/types';

interface Props {
    wish: Wish;
    onDelete?: (id: string) => void;
    showActions?: boolean;
}

export default function WishCard({
    wish,
    onDelete,
    showActions,
}: Props) {
    return (
        <div className="glass p-5 w-full">

            {/* HEADER */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 12,
                    marginBottom: 14,
                }}
            >
                <div>
                    <p
                        style={{
                            fontWeight: 700,
                            color: 'var(--text-dark)',
                            fontSize: '0.95rem',
                        }}
                    >
                        💌 {wish.senderName}
                    </p>

                    <p
                        className="text-caption"
                        style={{
                            marginTop: 2,
                            fontSize: '0.70rem',
                        }}
                    >
                        {new Date(
                            wish.createdAt
                        ).toLocaleDateString(
                            'en-IN',
                            {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }
                        )}
                    </p>
                </div>

                {showActions && onDelete && (
                    <button
                        onClick={() =>
                            onDelete(wish._id)
                        }
                        className="btn-copy btn-copy-peach"
                        style={{
                            minWidth: 44,
                            height: 38,
                            padding: 0,
                        }}
                    >
                        🗑
                    </button>
                )}
            </div>

            {/* MESSAGE */}
            <p
                style={{
                    fontSize: '0.92rem',
                    lineHeight: 1.8,
                    color: 'var(--text-dark)',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {wish.message}
            </p>

            {/* DRAWING */}
            {wish.drawingData && (
                <div style={{ marginTop: 16 }}>
                    <p
                        className="text-caption"
                        style={{ marginBottom: 8 }}
                    >
                        🎨 Drawing
                    </p>

                    <img
                        src={wish.drawingData}
                        alt="drawing"
                        style={{
                            width: '100%',
                            borderRadius: 20,
                            border:
                                '1px solid rgba(255,255,255,0.55)',
                        }}
                    />
                </div>
            )}

            {/* ATTACHMENT */}
            {wish.attachmentPath && (
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${wish.attachmentPath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    style={{
                        marginTop: 14,
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    📎 View Attachment
                </a>
            )}

            {/* LINK */}
            {wish.attachedLink && (
                <a
                    href={wish.attachedLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                    style={{
                        marginTop: 10,
                        textDecoration: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    🔗 Open Shared Link
                </a>
            )}

        </div>
    );
}