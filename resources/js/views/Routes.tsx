import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./home/Home";
import Topic from "./topic/Topic";

class Routes extends React.Component {
    render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route exact path="/topic/:permalink" component={Topic} />
            </BrowserRouter>
        );
    }
}

export default Routes;