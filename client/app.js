import React from "react";
import ReactDom from "react-dom";

import Main from "./components/Main.js";
import injectTapEventPlugin from 'react-tap-event-plugin'; 

ReactDom.render(<Main />, document.getElementById("app"));