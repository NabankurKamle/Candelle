'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePicker } from '@nextui-org/react';
import { CalendarDate, today } from '@internationalized/date';
import { api } from '@/lib/api';
import { Queue } from '@/types';
import PrimaryButton from '@/components/ui/core/PrimaryButton';

interface Props { onCreated: (queue: Queue) => void; }
interface FormData { name: string; creatorName: string; }

/* ── Shared field wrapper ── */
function Field({ label, hint, error, children }: {
    label: string; hint?: string; error?: string; children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <label style={{
                fontSize: '0.66rem', fontWeight: 600,
                letterSpacing: '0.10em', textTransform: 'uppercase',
                color: 'var(--text-muted)', paddingLeft: 4,
            }}>
                {label}
            </label>
            {children}
            {hint && !error && (
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingLeft: 4 }}>{hint}</p>
            )}
            {error && (
                <p style={{ fontSize: '0.72rem', color: 'var(--pink-500)', paddingLeft: 4 }}>⚠ {error}</p>
            )}
        </div>
    );
}

export default function CreateQueueForm({ onCreated }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [birthdate, setBirthdate] = useState<CalendarDate | null>(today('Asia/Kolkata'));

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const queue = await api.createQueue({ ...data, birthdate: birthdate?.toString() || '' });
            onCreated(queue);
        } catch {
            alert('Something went wrong 😢');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Birthday Person */}
            <Field
                label="Birthday Person"
                hint="Who is this special box for?"
                error={errors.name ? 'Please enter their name' : undefined}
            >
                <div className="input-wrap">
                    <span className="input-icon">🎂</span>
                    <input
                        className="bb-input"
                        placeholder="Enter name"
                        {...register('name', { required: true })}
                    />
                </div>
            </Field>

            {/* Birthdate — NextUI DatePicker, re-skinned */}
            <Field label="Birthdate">
                <div style={{
                    background: 'rgba(255,255,255,0.70)',
                    border: '1.5px solid rgba(255,255,255,0.90)',
                    borderRadius: 999,
                    height: 52,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 16,
                    paddingRight: 8,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 10px rgba(220,145,175,0.08)',
                    overflow: 'hidden',
                }}>
                    <span style={{ fontSize: '0.95rem', color: 'var(--pink-300)', marginRight: 10, flexShrink: 0 }}>📅</span>
                    <DatePicker
                        value={birthdate}
                        onChange={setBirthdate}
                        variant="underlined"

                        popoverProps={{
                            placement: 'top',
                            portalContainer:
                                typeof window !== 'undefined'
                                    ? document.body
                                    : undefined,
                        }}

                        calendarProps={{
                            classNames: {
                                base: 'z-[9999]',
                            },
                        }}

                        classNames={{
                            base: 'w-full',

                            inputWrapper:
                                '!bg-transparent !border-none !shadow-none !px-0 !h-full',

                            input:
                                '!text-[var(--text-dark)] !font-[Poppins]',

                            segment:
                                '!text-[var(--text-dark)] !font-[Poppins] text-[0.9rem]',

                            selectorButton:
                                '!text-[var(--pink-400)] hover:!text-[var(--violet-400)]',

                            popoverContent:
                                '!z-[9999]',
                        }}
                    />
                </div>
            </Field>

            {/* Your Name */}
            <Field
                label="Your Name"
                hint="What should we call you?"
                error={errors.creatorName ? 'Please enter your name' : undefined}
            >
                <div className="input-wrap">
                    <span className="input-icon">👤</span>
                    <input
                        className="bb-input"
                        placeholder="Enter your name"
                        {...register('creatorName', { required: true })}
                    />
                </div>
            </Field>

            <PrimaryButton type="submit" isLoading={loading}>
                ✦ Create My Candelle
            </PrimaryButton>

        </form>
    );
}