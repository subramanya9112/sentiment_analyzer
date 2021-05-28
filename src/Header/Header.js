import React, { useEffect, useState } from 'react';
import './header.scss';
import minimize from './../svg/minimize_icon.svg';
import restore from './../svg/restore_icon.svg';
import maximize from './../svg/maximize_icon.svg';
import close from './../svg/close_icon.svg';
const { ipcRenderer } = window.require('electron');

export default function Header() {
    const [maxRestoreIcon, setMaxRestoreIcon] = useState(restore);

    useEffect(() => {
        ipcRenderer.on('maximized', () => {
            setMaxRestoreIcon(restore);
        });
        ipcRenderer.on('unmaximized', () => {
            setMaxRestoreIcon(maximize);
        });
    }, []);

    return (
        <div className="headerBar">
            <div className="dragger"></div>
            <div className="header">
                <p>Sentiment Analyzer</p>
            </div>
            <div className="icons">
                <div className="iconDiv" onClick={() => ipcRenderer.send('minimizeApp')} >
                    <img src={minimize} className="minimize" alt="logo" />
                </div>
                <div className="iconDiv" onClick={() => ipcRenderer.send('maximizeApp')} >
                    <img src={maxRestoreIcon} className="maximize" alt="logo" />
                </div>
                <div className="iconDiv closeRed" onClick={() => ipcRenderer.send('closeApp')}>
                    <img src={close} className="close" alt="logo" />
                </div>
            </div>
        </div>
    )
}


