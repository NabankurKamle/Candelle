'use client';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

export default function Confetti() {
    const [size, setSize] = useState({ w: 0, h: 0 });

    useEffect(() => {
        setSize({ w: window.innerWidth, h: window.innerHeight });
    }, []);

    return (
        <ReactConfetti
            width={size.w}
            height={size.h}
            recycle={false}
            numberOfPieces={250}
            colors={['#FF6EB4', '#C084FC', '#60A5FA', '#FDE68A', '#34D399']}
        />
    );
}