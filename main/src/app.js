import React from "react";
require("@babel/polyfill");
import ReactDom from "react-dom";
import {MainWindow} from "./js/mainWindow";

function App() {
    return (
        <div>
            <MainWindow isLeft={true}/>
            <MainWindow isLeft={false}/>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("root"));
