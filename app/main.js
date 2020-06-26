"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${app.getAppPath()}/app/main.html`);
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
