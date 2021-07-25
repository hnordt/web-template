import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import SitesScreen from "screens/SitesScreen"
import ControllersScreen from "screens/ControllersScreen"
import UsersScreen from "screens/UsersScreen"

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/sites" />
        </Route>
        <Route path="/sites">
          <SitesScreen />
        </Route>
        <Route path="/controllers">
          <ControllersScreen />
        </Route>
        <Route path="/users">
          <UsersScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
