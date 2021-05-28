import React, { useState, useEffect, useRef } from 'react';
import './Chart.scss';

export default function Chart(props) {
    const [value, setValue] = useState([]);
    const canvasRef = useRef();

    useEffect(() => {
        var canvas = canvasRef.current;
        canvas.height = 100;
        canvas.width = 100;

        var start = Date.now();
        var timer = setInterval(() => {
            let timePassed = Date.now() - start;
            if (timePassed >= 1000) {
                clearInterval(timer);
                setValue([props.value, 1 - props.value]);
                return;
            }
            setValue([props.value * timePassed / 1000, [1 - props.value] * timePassed / 1000]);
        }, 20)
    }, [canvasRef, props.value]);

    useEffect(() => {
        var canvas = canvasRef.current;
        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 15;
        ctx.strokeStyle = '#3bb143';
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 15) / 2, 0, Math.PI * 2 * value[0]);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#db0000';
        ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 15) / 2, Math.PI * 2 * value[0], Math.PI * 2 * (value[0] + value[1]));
        ctx.stroke();
    }, [value, props.value])

    return (
        <div className="container">
            <canvas className="canvas" ref={canvasRef}></canvas>
            <div className="value">{props.value > 0.5 ? "Positive" : "Negative"}</div>
        </div>
    )
}
