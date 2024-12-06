export const updateObject = (
  obj: Record<string, any>,
  [head, ...rest]: string[],
  value: any
): Record<string, any> => {
  return {
    ...obj,
    [head]: rest.length ? updateObject(obj[head] || {}, rest, value) : value,
  };
};
