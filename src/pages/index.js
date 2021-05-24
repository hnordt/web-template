import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import HomeScreen from "screens/HomeScreen"

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="*" component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  )
}
