import React from "react"
import { Switch, Route } from "react-router-dom"
import HomeScreen from "screens/HomeScreen"

export default function Router() {
  return (
    <Switch>
      <Route path="*" component={HomeScreen} />
    </Switch>
  )
}
