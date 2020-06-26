import * as async from "async";
import path from "path"
import fs from "fs";

export function loadFilesByPath(url, callback) {
    getFilesInFolder(url, (err, files) => {
        if (err) {
            return callback("Cannot Load Files", null);
        }
        describeFiles(url, files, callback);
    });
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
