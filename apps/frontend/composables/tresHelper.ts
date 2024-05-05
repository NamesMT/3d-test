export function recursiveShadow(obj: any, { cast = false, receive = false } = {}) {
  if (obj.type === 'Mesh') {
    if (cast)
      obj.castShadow = true
    if (receive)
      obj.receiveShadow = true
  }

  if (obj.children?.length)
    obj.children.forEach((o: any) => recursiveShadow(o, { cast, receive }))
}
