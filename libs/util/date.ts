export const toLocalISOString = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000
  console.log('tzoffset', tzoffset)
  console.log(date)

  console.log('dat.gettime', date.getTime())

  const localISOTime = new Date(date.getTime() - tzoffset).toISOString()
  return localISOTime
}
