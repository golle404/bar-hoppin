import React from "react";
import ReactDom from "react-dom";
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from "./components/Main.js";

injectTapEventPlugin();

ReactDom.render(<Main search={config}/>, document.getElementById("app"));