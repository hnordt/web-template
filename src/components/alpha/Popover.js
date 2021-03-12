import React from "react"
import PropTypes from "prop-types"
import {
  Popover as BasePopover,
  PopoverDisclosure,
  usePopoverState,
} from "reakit"
import theme from "utils/theme"

export default function Popover(props) {
  const popoverState = usePopoverState({
    placement: props.placement ?? "bottom-start",
    gutter: parseInt(theme.borderWidth[props.gutter ?? 4], 10),
  })

  return (
    <>
      <BasePopover
        {...popoverState}
        className={
          props.className ??
          "rounded-md bg-white shadow-lg py-2 px-3 ring-1 ring-black ring-opacity-5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border border-transparent"
        }
        tabIndex={0}
        aria-label={props["aria-label"]}
      >
        {props.children}
      </BasePopover>
      <PopoverDisclosure
        ref={props.disclosure.ref}
        as={props.disclosure.type}
        {...popoverState}
        {...props.disclosure.props}
      />
    </>
  )
}

Popover.propTypes = {
  "className": PropTypes.any,
  "disclosure": PropTypes.element.isRequired,
  "placement": PropTypes.string,
  "gutter": PropTypes.number,
  "aria-label": PropTypes.string.isRequired,
  "children": PropTypes.node.isRequired,
}
