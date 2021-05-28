import React from 'react';
// import video from './../../images/video.mp4';
import logo from './../../images/logo.png';
import './WelcomePage.scss';

export default function WelcomePage() {
    return (
        <div className="welcomePage">
            {/* <video className='logo' autoPlay loop muted>
                <source src={video} type='video/mp4' />
            </video> */}
            <img src={logo} alt="logo" className="logo" />
            <div className="watermark ">
                <div className="row">
                    <div className="command">Welcome</div>
                    <div className="spacer" />
                    <div className="keybinding">
                        <span>Ctrl</span> + <span>0</span>
                    </div>
                </div>
                <div className="row">
                    <div className="command">Single Analysis</div>
                    <div className="keybinding">
                        <span>Ctrl</span> + <span>1</span>
                    </div>
                </div>
                <div className="row">
                    <div className="command">File Analysis</div>
                    <div className="keybinding">
                        <span>Ctrl</span> + <span>2</span>
                    </div>
                </div>
                <div className="row">
                    <div className="command">Info</div>
                    <div className="keybinding">
                        <span>Ctrl</span> + <span>3</span>
                    </div>
                </div>
                <div className="row">
                    <div className="command">Developer</div>
                    <div className="keybinding">
                        <span>Ctrl</span> + <span>4</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
