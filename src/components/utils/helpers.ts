export const convertToCSSProperty = (camelCaseString: string): string => {
  const convertedString = camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
  return convertedString;
};
