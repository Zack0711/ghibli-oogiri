export const genArray = (len, init = -1) => {
  const result = []
  for(let i = 0; i < len; i += 1) result.push(init)
  return result
}
