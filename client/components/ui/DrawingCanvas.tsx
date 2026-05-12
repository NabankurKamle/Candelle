'use client';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';

interface Props {
    onSave: (dataUrl: string) => void;
    onClear: () => void;
}

export default function DrawingCanvas({ onSave, onClear }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawing = useRef(false);
    const [color, setColor] = useState('#FF6EB4');
    const [size, setSize] = useState(4);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'transparent';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, []);

    const getPos = (e: React.TouchEvent | React.MouseEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
            };
        }
        return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
    };

    const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
        drawing.current = true;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        const pos = getPos(e, canvas);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e: React.TouchEvent | React.MouseEvent) => {
        if (!drawing.current) return;
        e.preventDefault();
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        const pos = getPos(e, canvas);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };

    const stopDraw = () => {
        drawing.current = false;
    };

    const handleSave = () => {
        onSave(canvasRef.current!.toDataURL('image/png'));
    };

    const handleClear = () => {
        const canvas = canvasRef.current!;
        canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
        onClear();
    };

    const colors = ['#FF6EB4', '#C084FC', '#60A5FA', '#34D399', '#FBBF24', '#F87171', '#000'];

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap">
                {colors.map(c => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                        style={{
                            background: c,
                            borderColor: color === c ? '#fff' : 'transparent',
                            transform: color === c ? 'scale(1.2)' : undefined,
                        }}
                    />
                ))}
                <input
                    type="range" min={2} max={20} value={size}
                    onChange={e => setSize(+e.target.value)}
                    className="w-24 accent-pink-400"
                />
            </div>
            <canvas
                ref={canvasRef}
                width={320} height={200}
                className="rounded-2xl border-2 border-dashed border-pink-300 dark:border-purple-500 bg-white/30 dark:bg-white/5 touch-none"
                onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw}
                onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
            />
            <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn-primary" style={{ padding: '9px 18px', fontSize: '0.8rem' }} onClick={handleSave}>
                    💾 Save Drawing
                </button>
                <button type="button" className="btn-ghost" style={{ padding: '9px 16px', fontSize: '0.8rem' }} onClick={handleClear}>
                    🗑 Clear
                </button>
            </div>
        </div>
    );
}