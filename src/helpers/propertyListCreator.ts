export function createObjectProperties<T>(
  target: Object,
  metaname: string | symbol,
  propertyName: string,
  metadata: T
) {
  // define metadata if not exists
  if (!Reflect.hasMetadata(metaname, target)) {
    Reflect.defineMetadata(metaname, {}, target);
  }

  // insert metadata item in the list
  const metadataList = extractObjectProperties(target, metaname);
  metadataList[propertyName] = Object.assign({}, metadata);
}

export function extractObjectProperties<T>(target: Object, metaname: string | symbol): MetaList<T> {
  return Reflect.getMetadata(metaname, target) || {};
}

export function extractObjectList<T>(target: object, metaname: string | symbol, typeName: 'function' | 'object'): T[] {
  const metadataList = extractObjectProperties<T>(target, metaname);
  const result = [];

  for (const key in metadataList) {
    if (target.hasOwnProperty(key) || typeof target[key] === typeName) {
      result.push(metadataList[key]);
    }
  }

  return result;
}

type MetaList<T> = { [key: string]: T };

export function breakReferences(obj: any) {
  const breaked = JSON.stringify(obj);
  return JSON.parse(breaked);
}
