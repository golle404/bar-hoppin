import React from "react";
import ReactDom from "react-dom";

import Main from "./components/Main.js";

ReactDom.render(<Main search={config}/>, document.getElementById("app"));