export default function formatNumber(number, options) {
  return new Intl.NumberFormat("en-US", options).format(
    isNaN(number) ? 0 : number
  )
}
