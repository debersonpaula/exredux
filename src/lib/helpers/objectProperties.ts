/**
 * Decorate property in object or class
 * @param metaName Name of metadata
 */
export function createObjectProperties(metaName: string | symbol, data?: any) {
  return (target, key) => {
    // define metadata if not exists
    if (!Reflect.hasMetadata(metaName, target)) {
      Reflect.defineMetadata(metaName, {}, target);
    }
    // get connection props from target
    const connProps: ComponentProps = Reflect.getMetadata(metaName, target);
    // define info for prop
    const props: ComponentPropInfo = {
      name: key,
      data: data || {}
    };
    // copy prop to connection properties
    connProps[key] = Object.assign({}, props);
  };
}

/**
 * Extract decorated properties from object or class
 * @param ctor Constructor of class
 * @param metaName Name of metada
 */
export function extractObjectProperties(
    ctor: {
      prototype: any;
    },
    metaName: string | symbol
  ): ComponentProps | undefined {
    return Reflect.getMetadata(metaName, ctor.prototype);
  }
// --------------------------------------------------------------------
// --- SUPPORT FUNCTIONS FOR DECORATORS -------------------------------
// --------------------------------------------------------------------
interface ComponentPropInfo {
  name: string;
  data?: any;
}
export interface ComponentProps {
  [k: string]: ComponentPropInfo;
}
// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------

