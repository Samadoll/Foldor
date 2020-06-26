import React, {useEffect, useState} from "react";
require("@babel/polyfill");
import ReactDom from "react-dom";
import * as async from "async";
const osenv = require("osenv")
const fs = require("fs");
import path from "path"

function App() {
    const [url, setUrl] = useState(getHomePath());
    const [files, setFiles] = useState([])

    function getHomePath() {
        return osenv.home() || "";
    }

    function getFilesInFolder(folderPath, callback) {
        fs.readdir(folderPath, callback);
    }

    function describeFile(filePath, callback) {
        let result = {
            file: path.basename(filePath),
            path: filePath,
            type: ""
        };
        fs.stat(filePath, (err, stat) => {
            if (err) {
                callback(err);
            } else {
                if (stat.isFile()) {
                    result.type = "file";
                }
                if (stat.isDirectory()) {
                    result.type = "directory";
                }
                callback(err, result);
            }
        })
    }

    function describeFiles(folderPath, files, callback) {
        async.map(files, (file, asyncCallback) => {
            let resolvedFilePath = path.resolve(folderPath, file);
            describeFile(resolvedFilePath, asyncCallback);
        }, callback);
    }

    function displayFiles(err, files) {
        if (err) {
            return alert("Cannot Load Files");
        }
        setFiles(files);
    }

    useEffect(() => {
        getFilesInFolder(url, (err, files) => {
            if (err) {
                return alert("Cannot Load Files");
            }
            describeFiles(url, files, displayFiles);
        });
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
                    files.sort((a, b) => a.type > b.type ? 1 : -1).map((file, index) => (
                        <div key={index} className="item">
                            <img src={`images/${file.type}.svg`} className="icon"/>
                            <div className="filename">{file.file}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("root"));
