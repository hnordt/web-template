import React from "react"
import * as ButtonUtils from "utils/ButtonUtils"

// loading
//     ? "cursor-auto"
//     : disabled
//     ? "opacity-75 cursor-auto"
//     : {
//         "hover:bg-blue-700": variant === "primary",
//         "hover:bg-gray-50": variant === "secondary",
//       }
// )}
// disabled={loading || disabled}
/* <img
  className="w-7 h-auto"
  src="data:image/svg+xml,%3Csvg width='120' height='30' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Ccircle cx='15' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='60' cy='15' r='9' fill-opacity='.3'%3E%3Canimate attributeName='r' from='9' to='9' begin='0s' dur='0.8s' values='9;15;9' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='.5' to='.5' begin='0s' dur='0.8s' values='.5;1;.5' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='105' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E"
  alt="Loading..."
/> */

const Button = React.forwardRef<HTMLButtonElement, ButtonUtils.ButtonProps>(
  function Button(props, ref) {
    return (
      <button
        ref={ref}
        {...ButtonUtils.getProps({
          type: props.type,
          shape: props.shape,
          size: props.size,
        })}
      >
        {props.children}
      </button>
    )
  }
)

export default Button
