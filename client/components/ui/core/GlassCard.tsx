'use client';

import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
    variant?: 'base' | 'soft' | 'strong';
    style?: {}
}

export default function GlassCard({ children, className = '', variant = 'base', style = {} }: Props) {
    const variantClass = {
        base: 'glass',
        soft: 'glass-sm',
        strong: 'glass',
    }[variant];

    return (
        <div className={`w-full ${variantClass} p-6 ${className}`} style={style}>
            {children}
        </div>
    );
}