'use client';

interface Props {
    children: React.ReactNode;
    onPress?: () => void;
    isLoading?: boolean;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'ghost';
    className?: string;
    style?: {};
}

export default function PrimaryButton({
    children,
    onPress,
    isLoading,
    type = 'button',
    variant = 'primary',
    className = '',
    style
}: Props) {
    return (
        <button
            type={type}
            onClick={onPress}
            disabled={isLoading}
            className={`${variant === 'ghost' ? 'btn-ghost' : 'btn-primary'} ${className}`}
            style={style}
        >
            {isLoading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
                        <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    {children}
                </span>
            ) : children}
        </button>
    );
}