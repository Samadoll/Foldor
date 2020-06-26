import React, {useEffect, useState} from "react";
require("@babel/polyfill");
import ReactDom from "react-dom";
import osenv from "osenv"
import {loadFilesByPath} from "./js/loadFiles";
import {Spinner} from "evergreen-ui";

function App() {
    const [url, setUrl] = useState(getHomePath());
    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    function getHomePath() {
        return osenv.home() || "";
    }

    function loadFiles(err, files) {
        if (err) {
            alert("Cannot Load Files")
        } else {
            setFiles(files);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true)
        loadFilesByPath(url, loadFiles);
    }, [url])

    return (
        <div>
            <div id="toolBar">
                <div id="current-folder">
                    {url}
                </div>
            </div>
            <div id="main-area">
                {
                    isLoading
                        ? (
                            <div
                                className={"loading-container"}
                                style={{
                                    position: "absolute",
                                    top: "calc(50% - 50px)",
                                    left: "calc(50% - 50px)",
                                }}
                            >
                                <div className={"opblock-loading-animation"}>
                                    <Spinner marginX={"auto"} size={100} />
                                </div>
                            </div>
                        )
                        : (
                            files.sort((a, b) => a.type > b.type ? 1 : -1).map((file, index) => (
                                <div key={index} className="item">
                                    <img src={`images/${file.type}.svg`} className="icon"/>
                                    <div className="filename">{file.file}</div>
                                </div>
                            ))
                        )
                }
            </div>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("root"));
