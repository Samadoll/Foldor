import React from "react";
require("@babel/polyfill");
import ReactDom from "react-dom";

function App() {
    return (
        <div>
            <h1>Welcome</h1>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("root"));
