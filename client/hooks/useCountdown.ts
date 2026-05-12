import { useState, useEffect } from 'react';

interface CountdownResult {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthday: boolean;
}

export const useCountdown = (birthdate: string): CountdownResult => {
    const getTarget = () => {
        const now = new Date();
        const bday = new Date(birthdate);
        const next = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
        if (next < now) next.setFullYear(now.getFullYear() + 1);
        // Check if today is birthday
        const isToday =
            now.getMonth() === bday.getMonth() && now.getDate() === bday.getDate();
        return { target: next.getTime(), isBirthday: isToday };
    };

    const [state, setState] = useState<CountdownResult>({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: false });

    useEffect(() => {
        const tick = () => {
            const { target, isBirthday } = getTarget();
            const diff = target - Date.now();
            setState({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
                isBirthday,
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [birthdate]);

    return state;
};