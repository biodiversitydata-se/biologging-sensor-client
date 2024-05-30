import { useEffect, useRef, useState } from "react";
import { ActogramProps } from "./interface";
import { S } from "./const";
import { ActogramC } from "@/config/model";
import { datasetConfig, sensorTypes, valuesMeasured } from "@/config/config";

export default function ActogramGraph({ data, mCounts, days, config }: ActogramProps) {
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

        // top line
        _drawLine(50, 100, y, y);

        mCounts?.forEach((value: number, key: string) => {
            const days = value / 24;
            const mSpace = days * S + S;
            let end = y + mSpace;

            // draw days line
            for (let start = y + (5 * S); start < end; start += (5 * S)) {
                _drawLine(80, 100, start, start);
            }

            // draw text
            const month = key.replace(/[0-9]/g, '');
            ctx.fillText(month, 50, y + (mSpace / 2) + S / 2);

            // draw bottom line
            _drawLine(50, 100, end, end);

            // set new y
            y = end;
        })
    }


    function _drawTimeLabels() {
        if (!ctx) return;
        const y = T_OFFSET - 10;
        let x = M_OFFSET;
        const times = ["0:00", "12:00"];

        for (let i = 0; i < 5; i++) {
            ctx.fillText(times[i % 2], x, y);
            _drawLine(x, x, y, y + 10);
            x += 12 * S;
        }
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
        //const actogramConfig = (valuesMeasured['activity'] as ActogramC).config;

        if (!config) return '';

        if (score === -10) {
            return 'grey';
        }


        for (let item of config) {
            if (!item.to && item.from >= score) {
                return item.color;
            }

            if (item.from <= score && item.to! >= score) {
                return item.color;
            }

        }

        return 'grey';
    }
    return (
        <div>
            <canvas ref={canvasRef} width={w} height={h} />
        </div>
    )
}