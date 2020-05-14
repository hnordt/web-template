import React from "react"
import { CSSTransition } from "react-transition-group"

export default function Transition(props) {
  let [xTiming, xDelay, ...xTransforms] = props.from.split(" ")
  let [yTiming, yDelay, ...yTransforms] = props.to.split(" ")

  return (
    <CSSTransition
      classNames={{
        enterActive: `transform ${xTransforms.join(" ")}`,
        enterDone: `transform ${yTransforms.join(
          " "
        )} transition ${xTiming} ${xDelay}`,
        exitActive: `transform ${yTransforms.join(" ")}`,
        exitDone: `transform ${xTransforms.join(
          " "
        )} transition ${yTiming} ${yDelay}`,
      }}
      in={props.active}
      timeout={{
        enter: Number(xDelay.replace("duration-", "")),
        exit: Number(yDelay.replace("duration-", "")),
      }}
      mountOnEnter
    >
      {props.children}
    </CSSTransition>
  )
}
