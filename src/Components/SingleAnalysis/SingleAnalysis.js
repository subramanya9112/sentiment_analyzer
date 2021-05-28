import React, { useState } from 'react';
import axios from 'axios';
import Chart from './../Chart/Chart';
import Button from './../Button/Button';
import './SingleAnalysis.scss';
const { ipcRenderer } = window.require('electron');

export default function SingleAnalysis() {
    const [review, setReview] = useState('');
    const [result, setResult] = useState([false, 0]);

    return (
        <div className="singleAnalysis">
            <textarea className="textArea" placeholder="Enter the text..." onChange={(e) => {
                setReview(e.target.value)
            }} />
            <Button name="Calculate" onClick={() => {
                setResult([false, 0]);
                var port = ipcRenderer.sendSync('getPort');
                axios.post("http://localhost:" + port + "/singleRating", {
                    review: review
                }).then(response => {
                    setResult([true, parseFloat(parseFloat(response.data.value).toFixed(2))]);
                }).catch(error => {
                    console.log(error);
                })
            }} />
            {
                result[0] ? <Chart value={result[1]} /> : <></>
            }
        </div>
    )
}
