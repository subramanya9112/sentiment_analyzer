import React, { useState, useRef } from 'react';
import axios from 'axios';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from './../Button/Button';
import Chart from './../Chart/Chart';
import './FileAnalysis.scss';
const { dialog } = window.require('electron').remote;
const { ipcRenderer } = window.require('electron');

export default function FileAnalysis() {
    const [result, setResult] = useState([]);
    const [error, setError] = useState([0, 0]);
    const upload = useRef(null);

    return (
        <div className="fileAnalysis">
            {result.length !== 0 ?
                <>
                    <div className="buttons">
                        <Button name="Open File" onClick={() => {
                            dialog.showOpenDialog({
                                title: "Open Dataset",
                                properties: ['openFile', 'showHiddenFiles'],
                                filters: [
                                    { name: 'Comma Seperated files', extensions: ['csv'] },
                                    { name: 'Tab Seperated files', extensions: ['tsv'] },
                                ]
                            }).then(result => {
                                if (!result.canceled) {
                                    var port = ipcRenderer.sendSync('getPort');
                                    axios.post("http://localhost:" + port + "/multipleRating", {
                                        filePath: result.filePaths[0]
                                    }).then(response => {
                                        setResult(response.data.data)
                                    }).catch(error => {
                                        console.log(error)
                                    })
                                }
                            }).catch(e => {
                                setError([0, 1]);
                                setResult([]);
                            })
                        }} />
                        {result.length !== 0 ?
                            <Button name="Clear" onClick={() => {
                                setResult([]);
                            }} />
                            : <></>}
                    </div>
                    <div className="result">
                        {result.map((val, index) => (
                            <div key={index} className="tableRow">
                                <div className="review">
                                    <div>{val.review}</div>
                                </div>
                                <div className="chart">
                                    <Chart value={parseFloat(parseFloat(val.value).toFixed(2))} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
                :
                <div className="upload"
                    ref={upload}
                    onDragOver={(e) => {
                        upload.current.classList.add('dragged');
                    }}
                    onMouseEnter={(e) => {
                        upload.current.classList.add('dragged');
                    }}
                    onDragLeave={(e) => {
                        upload.current.classList.remove('dragged');
                    }}
                    onMouseLeave={(e) => {
                        upload.current.classList.remove('dragged');
                    }}
                >
                    <input className="fileUpload" accept=".csv, .tsv" type="file" title='' onChange={(e) => {
                        if (e.target.files[0]) {
                            var file = e.target.files[0].path;
                            if (file.endsWith(".csv") || file.endsWith(".tsv")) {
                                var port = ipcRenderer.sendSync('getPort');
                                axios.post("http://localhost:" + port + "/multipleRating", {
                                    filePath: file
                                }).then(response => {
                                    setResult(response.data.data);
                                }).catch(e => {
                                    setError([0, 1]);
                                })
                            } else {
                                setError([1, 0]);
                            }
                        }
                    }} />
                    <div className="uploadText">
                        <GetAppIcon className="icon" />
                        <p>Choose file or drag here</p>
                        <p style={{ color: error[0] ? "red" : "" }}>* upload a file with csv or tsv extension</p>
                        <p style={{ color: error[1] ? "red" : "" }}>* file should have a column named review</p>
                    </div>
                </div>
            }
        </div>
    )
}