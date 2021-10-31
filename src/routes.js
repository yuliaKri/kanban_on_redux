import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";
import AuthPage from "./pages/AuthPage";
/*class Switch extends React.Component {/!*todo что такое render(), promise, callback() from react и с чем это едят? cardModel как задать время и ссылку на пользователя*!/
    render() {
        return null;
    }
}*/

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}