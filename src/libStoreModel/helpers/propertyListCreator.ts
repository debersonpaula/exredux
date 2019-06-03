import { DECORATOR_IS_METHOD } from '../base/Consts';

export function createObjectProperties<T>(target: Object, metaname: string | symbol, metadata: T) {
  // define metadata if not exists
  if (!Reflect.hasMetadata(metaname, target.constructor)) {
    Reflect.defineMetadata(metaname, [], target.constructor);
  }

  // insert metadata item in the list
  const metadataList = extractObjectProperties(target, metaname);
  metadataList.push(metadata);

  Reflect.defineMetadata(DECORATOR_IS_METHOD, true, target);
}

export function extractObjectProperties<T>(target: Object, metaname: string | symbol): T[] {
  return Reflect.getMetadata(metaname, target.constructor) || [];
}
