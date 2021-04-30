import React from "react"
import cn from "classnames"

function Button(props, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
        props.variant === "primary" &&
          `text-white bg-blue-600 ${
            props.loading || props.disabled ? "" : "hover:bg-blue-700"
          } border-transparent`,
        props.variant === "secondary" &&
          `text-gray-700 ${
            props.loading || props.disabled ? "" : "hover:bg-gray-50"
          } bg-white border-gray-300`,
        props.loading
          ? "cursor-auto"
          : props.disabled && "opacity-60 cursor-auto"
      )}
      type={props.type ?? "button"}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? (
        <img
          className="w-7 h-auto"
          src="data:image/svg+xml,%3Csvg width='120' height='30' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Ccircle cx='15' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='60' cy='15' r='9' fill-opacity='.3'%3E%3Canimate attributeName='r' from='9' to='9' begin='0s' dur='0.8s' values='9;15;9' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='.5' to='.5' begin='0s' dur='0.8s' values='.5;1;.5' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='105' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E"
          alt="Loading..."
        />
      ) : (
        props.children
      )}
    </button>
  )
}

export default React.forwardRef(Button)
