import React from "react"
import PropTypes from "prop-types"
import cn from "classnames"

const Button = React.forwardRef(function Button(props, ref) {
  const {
    type = "button",
    variant = "primary",
    loading,
    disabled,
    children,
    ...rest
  } = props

  return (
    <button
      {...rest}
      ref={ref}
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
        variant === "primary" && "text-white bg-blue-600 border-transparent",
        variant === "secondary" &&
          "text-blue-gray-700 bg-white border-blue-gray-300",
        loading
          ? "cursor-auto"
          : disabled
          ? "opacity-75 cursor-auto"
          : {
              "hover:bg-blue-700": variant === "primary",
              "hover:bg-blue-gray-50": variant === "secondary",
            }
      )}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? (
        <img
          className="w-7 h-auto"
          src="data:image/svg+xml,%3Csvg width='120' height='30' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Ccircle cx='15' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='60' cy='15' r='9' fill-opacity='.3'%3E%3Canimate attributeName='r' from='9' to='9' begin='0s' dur='0.8s' values='9;15;9' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='.5' to='.5' begin='0s' dur='0.8s' values='.5;1;.5' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='105' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E"
          alt="Loading..."
        />
      ) : (
        children
      )}
    </button>
  )
})

Button.propTypes = {
  type: PropTypes.oneOf(["submit"]),
  variant: PropTypes.oneOf(["primary", "secondary"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Button