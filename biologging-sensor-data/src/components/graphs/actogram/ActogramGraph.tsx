import { useEffect, useRef, useState } from "react";
import { ActogramProps } from "./interface";

export default function ActogramGraph({ data, days, adata }: ActogramProps) {
    const w = 1000;
    const h = 800;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context) setCtx(context);
    }, []);

    useEffect(() => {
        if (!ctx) {
            return;
        }

        console.log(adata)




        // Draw 48 squares next to each other
        // for (let i = 0; i < 48; i++) {
        //     squares.push({ x: i * (squareSize + gap), y: 0, size: squareSize });
        // }

        adata?.forEach((square) => {
            ctx.fillStyle = getColor(square.value);
            ctx.strokeStyle = 'black';
            //ctx.fillStyle = 'red';
            ctx.fillRect(square.x, square.y, 10, 10);
        });



    }, [adata]);

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