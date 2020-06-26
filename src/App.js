import React from "react";
import {MainWindow} from "./components/mainWindow";
import "./main.css";
require("@babel/polyfill");

export default function App() {
    return (
        <div>
            <MainWindow isLeft={true}/>
            <MainWindow isLeft={false}/>
        </div>
    )
}
