import { useEffect, useRef, useState } from "react";
import { ActogramProps } from "./interface";
import { A_WIDTH, DAY_NUMBER_X, DEF_STROKE_STYLE, D_LINE_OFFSET, FONT_SIZE, MONTH_LABEL_OFFSET, M_LABEL_OFFSET, M_LINE_OFFSET, RIGHT_SIDE_OFFSET, S, T_LABEL_OFFSET } from "./const";

export default function ActogramGraph({ data, mCounts, days, config, errorValue, notMeasuredValue }: ActogramProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

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
            ctx.strokeStyle = DEF_STROKE_STYLE;
            const x = square.x + M_LABEL_OFFSET;
            const y = square.y + T_LABEL_OFFSET;
            ctx.fillRect(x, y, S, S);
        });
    }

    function _drawRightSide() {
        if (!ctx) return;
        const sliced_data = data?.slice(24, data.length); // remove first day 
        sliced_data?.forEach((square) => {
            ctx.fillStyle = getColor(square.value);
            ctx.strokeStyle = DEF_STROKE_STYLE;
            const x = square.x + RIGHT_SIDE_OFFSET;
            const y = square.y + T_LABEL_OFFSET - S;
            ctx.fillRect(x, Math.floor(y), S, S);
        });

    }

    function _drawMonthLabels() {
        if (!ctx) return;

        let y = T_LABEL_OFFSET;
        ctx.fillStyle = DEF_STROKE_STYLE;
        ctx.font = FONT_SIZE;

        // top line
        _drawLine(M_LINE_OFFSET, M_LABEL_OFFSET, y, y);

        mCounts?.forEach((value: number, key: string) => {
            const days = value / 24;
            const mSpace = days * S + S;
            let end = y + mSpace;

            // draw days line - every 5 days
            let day = 5;
            for (let start = y + (5 * S); start < end; start += (5 * S)) {
                ctx.fillText(day.toString(), DAY_NUMBER_X, start - 5, start);
                _drawLine(D_LINE_OFFSET, M_LABEL_OFFSET, start, start);
                day += 5;
            }

            // draw text
            const month = key.replace(/[0-9]/g, '');
            ctx.fillText(month, MONTH_LABEL_OFFSET, y + (mSpace / 2) + S / 2);

            // draw bottom line
            _drawLine(M_LINE_OFFSET, M_LABEL_OFFSET, end, end + 1);

            // set new y
            y = end;
        })
    }


    function _drawTimeLabels() {
        if (!ctx) return;
        const y = T_LABEL_OFFSET - S;
        let x = M_LABEL_OFFSET;
        const times = ["0:00", "12:00"];

        for (let i = 0; i < 5; i++) {
            ctx.fillText(times[i % 2], x, y);
            _drawLine(x, x, y, y + S);
            x += 12 * S;
        }
    }

    function _drawBorderLines() {
        if (!ctx) return;
        // left
        let x = M_LABEL_OFFSET;
        let y1 = T_LABEL_OFFSET;
        let y2 = T_LABEL_OFFSET + (days * S) + S;
        _drawLine(x, x, y1, y2);

        //middle 
        x = RIGHT_SIDE_OFFSET;
        y1 = T_LABEL_OFFSET;
        y2 = T_LABEL_OFFSET + (days * S) + S;
        _drawLine(x, x, y1, y2);
    }

    function _drawLine(x1: number, x2: number, y1: number, y2: number) {
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = DEF_STROKE_STYLE;
        ctx.stroke();

    }

    function getColor(score: number): string {
        if (!config) return '';

        if (score === errorValue) {
            return config.errorCase?.color ?? 'yellow';
        }

        if (score === notMeasuredValue) {
            return config.notMeasuredCase?.color ?? 'grey';
        }

        for (let item of config.config) {
            if (!item.to && item.from >= score) {
                return item.color;
            }

            if (item.from <= score && item.to! >= score) {
                return item.color;
            }
        }
        return '';
    }

    return (
        <div>
            {/* height - number of days * size of square + top_offset + S*/}
            <canvas ref={canvasRef} width={A_WIDTH} height={days * S + T_LABEL_OFFSET + S} />
        </div>
    )
}