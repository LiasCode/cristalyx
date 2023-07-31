export function mergeObjects(target: {}, ...objs: {}[]) {
  Object.assign(target, ...objs);
}

