import React, {useEffect, useState} from "react";
import {loadFilesByPath} from "./loadFiles";
import {Spinner, ArrowUpIcon, toaster} from "evergreen-ui";
import path from "path";
import osenv from "osenv";
import directorySVG from "../assets/directory.svg";
import fileSVG from "../assets/file.svg";

export function MainWindow(props) {
    const [url, setUrl] = useState(getHomePath());
    const [files, setFiles] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    function getHomePath() {
        return osenv.home() || path.sep;
    }

    function loadFiles(err, files) {
        if (err) {
            toaster.danger(err);
            gotoUpperDirectory();
        } else {
            setFiles(files);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true)
        loadFilesByPath(url, loadFiles);
    }, [url])

    function handleDoubleClick(file) {
        if (file.type === "directory") {
            setUrl(file.path);
        }
    }

    function gotoUpperDirectory() {
        if (checkPath()) return;
        setUrl(url.substring(0, url.lastIndexOf(path.sep)));
    }

    function checkPath() {
        return url.lastIndexOf(path.sep) === url.indexOf(path.sep);
    }

    return (
        <div>
            <div className={"toolBar" + (props.isLeft ? " left-toolBar" : " right-toolBar")}>
                <button
                    className={"toolBar-button" + (checkPath() ? " disabled" : "")}
                    disabled={checkPath()}
                    onClick={() => gotoUpperDirectory()}
                >
                    <ArrowUpIcon size={15}/>
                </button>
                <div className={"current-folder"} title={url}>
                    {url.substring(url.lastIndexOf(path.sep))}
                </div>
            </div>
            <div className={"main-area"  + (props.isLeft ? " left-area" : " right-area")}>
                {
                    isLoading
                        ? (
                            <div
                                className={"loading-container"}
                                style={{
                                    position: "absolute",
                                    top: "2em",
                                    left: "calc(50% - 50px)",
                                }}
                            >
                                <div className={"opblock-loading-animation"}>
                                    <Spinner marginX={"auto"} size={100} />
                                </div>
                            </div>
                        )
                        : (
                            files.sort((a, b) => a.type === b.type ? (a.file > b.file ? 1 : -1) : (a.type > b.type ? 1 : -1))
                                .map((file, index) => (
                                    <div key={index} className="item" title={file.file}>
                                        <img src={String(file.type) === "file" ? fileSVG : directorySVG } className="icon" onDoubleClick={() => handleDoubleClick(file)}/>
                                        <div className="filename">{file.file}</div>
                                    </div>
                                ))
                        )
                }
            </div>
        </div>
    )
}