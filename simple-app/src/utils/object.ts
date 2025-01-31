// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Retrieves a nested property value from an object based on a dot-separated path.
 * 
 * @param obj - The object to retrieve the property from.
 * @param path - The dot-separated path representing the nested property.
 * @returns The value of the nested property, or undefined if the path is invalid.
 * 
 * @example
 * const obj = { a: { b: { c: 42 } } };
 * console.log(getNestedProperty(obj, "a"));   // Outputs: { b: { c: 42 } }
 * console.log(getNestedProperty(obj, "a.b.c")); // Outputs: 42
 * console.log(getNestedProperty(obj, "a.b.x")); // Outputs: undefined
 * console.log(getNestedProperty(obj, "a.b"));   // Outputs: { c: 42 }
 */
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNestedProperty(obj: Record<string, any>, path: string): any {
  const keys = path.split(".");
  return keys.reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

