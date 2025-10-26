export const formatUSD = (n?: number | null) =>
  n == null ? null :
  new Intl.NumberFormat("en-US",{ style:"currency", currency:"USD", maximumFractionDigits:0 }).format(n)
