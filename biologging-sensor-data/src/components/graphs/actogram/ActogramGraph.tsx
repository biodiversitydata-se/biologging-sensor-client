import { useEffect, useRef, useState } from "react";
import { ActogramProps, AData } from "./interface";
import { S } from "./const";

export default function ActogramGraph({ data, mCounts, days }: ActogramProps) {
    const w = 1000;
    const h = 800;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    const M_OFFSET = 100;
    const D_OFFSET = 24 * S;
    const T_OFFSET = 100;
    const OFFSET = M_OFFSET + D_OFFSET;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context) setCtx(context);
    }, []);

    useEffect(() => {
        if (!ctx) return;

        _drawLeftSide();
        _drawRightSide();
        _drawMonthLabels();
        _drawBorderLines();
        _drawTimeLabels();
    }, [data]);

    function _drawLeftSide() {
        if (!ctx) return;
        data?.forEach((square) => {
            ctx.fillStyle = getColor(square.value);
            ctx.strokeStyle = 'black';
            const x = square.x + M_OFFSET;
            const y = square.y + T_OFFSET;
            ctx.fillRect(x, y, S, S);
        });
    }

    function _drawRightSide() {
        if (!ctx) return;
        const sliced_data = data?.slice(24, data.length);
        sliced_data?.forEach((square) => {
            ctx.fillStyle = getColor(square.value);
            ctx.strokeStyle = 'black';
            const x = square.x + OFFSET;
            const y = square.y + T_OFFSET - S;
            ctx.fillRect(x, Math.floor(y), S, S);
        });

    }

    function _drawMonthLabels() {
        if (!ctx) return;

        let y = T_OFFSET;
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        let day = 0;

        _drawLine(50, 100, y, y);

        mCounts?.forEach((value: number, key: string) => {
            const days = value / 24;
            day += days;
            const d = days / 2 * S;
            y += d;
            const month = key.replace(/[0-9]/g, '');
            ctx.fillText(month, 0, y + S);
            y += d + S;
            _drawLine(50, 100, y, y);
        })
    }


    function _drawTimeLabels() {

    }

    function _drawBorderLines() {
        if (!ctx) return;
        // left
        let x = M_OFFSET;
        let y1 = T_OFFSET;
        let y2 = T_OFFSET + (days * S) + S;
        _drawLine(x, x, y1, y2);

        //middle 
        x = OFFSET;
        y1 = T_OFFSET;
        y2 = T_OFFSET + (days * S) + 10;
        _drawLine(x, x, y1, y2);
    }

    function _drawLine(x1: number, x2: number, y1: number, y2: number) {
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'black';
        ctx.stroke();

    }


    function getColor(score: number): string {
        if (score == 0) {
            //return '#FFFFFF';
            return 'yellow';
        } else if (score >= 1 && score <= 10) {
            //return '#66FF66';
            return 'red';
        } else if (score >= 11 && score <= 20) {
            //return '#33FF33';
            return 'green';
        } else if (score >= 21 && score <= 30) {
            // return '#00CC00';
            return 'blue';
        } else if (score >= 31 && score <= 40) {
            //return '#009900';
            return 'pink';
        } else if (score >= 41 && score <= 50) {
            // return '#006600';
            return '#006600';
        } else if (score >= 51 && score < 60) {
            //return '#660066';
            return 'purple';
        } else if (score == 60) {
            return 'black';
        }

        return 'grey';
    }
    return (
        <div>
            <canvas ref={canvasRef} width={w} height={h} />
        </div>
    )
}