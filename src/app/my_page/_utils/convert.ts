type ENUM = { [name: string]: any };
export function convertEnumToKeyValuesObject<T extends ENUM>(
  enumType: T
): { key: keyof T; value: number }[] {
  return Object.keys(enumType)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: enumType[key],
    }));
}
