import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ isLoggedIn }) => {

    return (
        <Router>
            <Switch>
                {isLoggedIn && <Route exact path="/"><Home /></Route>}
                {!isLoggedIn && <Route exact path="/"><Auth /></Route>}
            </Switch>
        </Router>
    )
}

export default AppRouter;