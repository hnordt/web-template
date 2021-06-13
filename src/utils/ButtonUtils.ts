export type ButtonTypes = "submit" | "reset"

export type ButtonIntents =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "info"

export type ButtonShapes =
  | "solid"
  | "flat"
  | "plain"
  | "circular"
  | "round"
  | "outline"

interface ButtonParams {
  type?: ButtonTypes
  // intent: ButtonIntents
  shape?: ButtonShapes
  size: ButtonSizes // TODO
  // fill: boolean
}

export type ButtonSizes = "xs" | "sm" | "md" | "lg" | "xl"

export interface ButtonProps {
  type?: ButtonTypes
  intent: ButtonIntents
  shape?: ButtonShapes
  size: ButtonSizes
  fill?: boolean
  children: React.ReactNode
}

interface ButtonUtilsProps {
  type: "button" | "submit" | "reset"
  className: string
}

export function getProps(params: ButtonParams): ButtonUtilsProps {
  return {
    type: params.type ?? "button",
    className: [
      getBaseClassNames(),
      getSolidStyleClassNames(),
      getPrimaryVariantClassNames(params.shape),
      sizeClassNames[params.size],
    ].join(" "),
  }
}

function getBaseClassNames() {
  return "inline-flex items-center font-medium focus:outline-none focus:ring-offset-2 focus:ring-2"
}

const sizeClassNames = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2 text-base",
  xl: "px-6 py-3 text-base",
}

function getPrimaryVariantClassNames(shape?: ButtonShapes) {
  switch (shape) {
    default:
      return "bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent focus:ring-indigo-500"
  }
}

function getSolidStyleClassNames() {
  return "rounded-md shadow-sm"
}
