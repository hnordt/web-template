import PropTypes from "prop-types"
import baseRange from "lodash/range"

function range(end, start = 1) {
  return baseRange(start, end + 1)
}

export let GridPropTypes = {
  flow: PropTypes.oneOf(["col", "row"]),
  cols: PropTypes.oneOf(range(12)),
  gap: PropTypes.oneOf(range(12)),
}

export let ToolbarPropTypes = {
  gap: PropTypes.oneOf(["xs", "md", "lg"]),
}
