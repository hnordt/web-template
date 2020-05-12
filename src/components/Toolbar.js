import React from "react"
import Grid from "components/Grid"
import { ToolbarPropTypes } from "utils/propTypes"

export default function Toolbar(props) {
  return (
    <Grid
      flow="col"
      gap={
        {
          xs: 2,
          md: 3,
          lg: 4,
        }[props.gap]
      }
      alignItems="center"
      inline={props.inline}
    >
      {props.children}
    </Grid>
  )
}

Toolbar.propTypes = ToolbarPropTypes
