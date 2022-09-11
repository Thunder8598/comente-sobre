import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./home/Home";

class Routes extends React.Component {
    render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Home} />
            </BrowserRouter>
        );
    }
}

export default Routes;