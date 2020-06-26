"use strict";

const {app, BrowserWindow} = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", function () {
        mainWindow = null
    })
}

app.on("ready", () => createWindow());

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit()
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow()
    }
});
