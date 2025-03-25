const objectIds = new WeakMap()
let nextId = 0

export const getObjectIds = (...objs: any[]) => {
  return objs
    .map((obj) => {
      if (!objectIds.has(obj)) {
        objectIds.set(obj, ++nextId)
      }
      return objectIds.get(obj)
    })
    .join('-')
}
