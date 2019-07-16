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

export function extractObjectList<T>(target: Object, metaname: string | symbol): T[] {
  const metadataList = extractObjectProperties<T>(target, metaname);
  return Object.keys(metadataList).map(key => metadataList[key]);
}

type MetaList<T> = { [key: string]: T };

export function breakReferences(obj: any) {
  const breaked = JSON.stringify(obj);
  return JSON.parse(breaked);
}
