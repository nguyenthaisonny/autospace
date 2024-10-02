export const toLocalISOString = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000
  const localISOTime = new Date(date.getTime() - tzoffset).toISOString()
  return localISOTime
}
