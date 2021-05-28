import React from 'react'
import "./CardView.scss";

export default function CardView(props) {
    return (
        <div className="card-container"
            onClick={props.onClick}>
            <div className="card">
                <figure className="front">
                    {props.front}
                </figure>
                <figure className="back">
                    {props.back}
                </figure>
            </div>
        </div>
    )
}
