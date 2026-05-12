'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { api } from '@/lib/api';

import PrimaryButton from '@/components/ui/core/PrimaryButton';
import DrawingCanvas from '../ui/DrawingCanvas';

/* ───────────────── FIELD ───────────────── */

function Field({
    label,
    hint,
    children,
}: {
    label: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
            }}
        >
            <label
                style={{
                    fontSize: '0.66rem',
                    fontWeight: 600,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    paddingLeft: 4,
                }}
            >
                {label}
            </label>

            {children}

            {hint && (
                <p
                    style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        paddingLeft: 4,
                        lineHeight: 1.5,
                    }}
                >
                    {hint}
                </p>
            )}
        </div>
    );
}

interface Props {
    wishLinkId: string;
    onPosted: () => void;
}

interface FormData {
    senderName: string;
    message: string;
    attachedLink: string;
}

export default function WishForm({
    wishLinkId,
    onPosted,
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormData>();

    const [loading, setLoading] = useState(false);

    const [drawing, setDrawing] =
        useState<string | null>(null);

    const [file, setFile] =
        useState<File | null>(null);

    const [showCanvas, setShowCanvas] =
        useState(false);

    const onSubmit = async (data: FormData) => {
        setLoading(true);

        const fd = new FormData();

        fd.append('senderName', data.senderName);

        fd.append('message', data.message);

        if (data.attachedLink) {
            fd.append(
                'attachedLink',
                data.attachedLink
            );
        }

        if (drawing) {
            fd.append('drawingData', drawing);
        }

        if (file) {
            fd.append('attachment', file);
        }

        try {
            await api.postWish(wishLinkId, fd);

            reset();

            setDrawing(null);

            setFile(null);

            setShowCanvas(false);

            onPosted();
        } catch {
            alert('Failed to post wish 😢');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
            }}
        >

            {/* NAME */}
            <Field
                label="Your Name"
                hint="Let them know who sent this 💕"
            >
                <div className="field-shell">

                    <span className="field-icon">
                        👤
                    </span>

                    <input
                        className="field-input"
                        placeholder="Enter your name"
                        {...register('senderName', {
                            required: true,
                        })}
                    />

                </div>
            </Field>

            {/* MESSAGE */}
            <Field
                label="Your Message"
                hint="Write something unforgettable ✨"
            >
                <div className="field-shell field-textarea">

                    <span className="field-icon">
                        💌
                    </span>

                    <textarea
                        className="field-input"
                        placeholder="Write your birthday wish..."
                        rows={5}
                        style={{
                            resize: 'none',
                            minHeight: 90,
                            lineHeight: 1.75,
                        }}
                        {...register('message', {
                            required: true,
                        })}
                    />

                </div>
            </Field>

            {/* LINK */}
            <Field
                label="Special Link"
                hint="Playlist, reel, photo album or memory ✨"
            >
                <div className="field-shell">

                    <span className="field-icon">
                        🔗
                    </span>

                    <input
                        className="field-input"
                        placeholder="https://..."
                        {...register('attachedLink')}
                    />

                </div>
            </Field>

            {/* FILE */}
            <Field
                label="Attachment"
                hint="Photos, screenshots or memories 📸"
            >
                <div className="field-shell field-upload">

                    <span className="field-icon">
                        📎
                    </span>

                    <input
                        type="file"
                        className="field-file"
                        onChange={(e) =>
                            setFile(
                                e.target.files?.[0] ||
                                null
                            )
                        }
                    />

                </div>

                {file && (
                    <div className="soft-chip">
                        📎 {file.name}
                    </div>
                )}
            </Field>

            {/* DRAWING */}
            <Field
                label="Drawing"
                hint="Add doodles or cute sketches 🎨"
            >
                <button
                    type="button"
                    className="btn-ghost"
                    onClick={() =>
                        setShowCanvas(!showCanvas)
                    }
                    style={{
                        minHeight: 54,
                    }}
                >
                    🎨{' '}
                    {showCanvas
                        ? 'Hide'
                        : 'Add'}{' '}
                    Drawing
                </button>

                {showCanvas && (
                    <div
                        style={{
                            marginTop: 12,

                            overflow: 'hidden',

                            borderRadius: 24,

                            border:
                                '1.5px solid rgba(255,255,255,0.7)',

                            background:
                                'rgba(255,255,255,0.65)',

                            backdropFilter:
                                'blur(14px)',

                            boxShadow:
                                '0 4px 18px rgba(220,145,175,0.08)',
                        }}
                    >
                        <DrawingCanvas
                            onSave={(url) =>
                                setDrawing(url)
                            }
                            onClear={() =>
                                setDrawing(null)
                            }
                        />
                    </div>
                )}

                {drawing && !showCanvas && (
                    <div className="soft-chip">
                        🎨 Drawing saved
                    </div>
                )}
            </Field>

            <PrimaryButton
                type="submit"
                isLoading={loading}
                style={{
                    marginTop: 6,
                }}
            >
                ✦ Send Birthday Wish
            </PrimaryButton>

        </form>
    );
}