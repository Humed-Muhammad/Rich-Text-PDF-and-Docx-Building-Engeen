/**
 * The function `convertToCSSProperty` converts a camelCase string to a CSS property format by
 * inserting a hyphen between lowercase and uppercase letters and converting the result to lowercase.
 * @param {string} camelCaseString - CamelCaseString is a string in camel case format, where words are
 * concatenated together and the first letter of each word (except the first word) is capitalized.
 * @returns The function `convertToCSSProperty` takes a camelCase string as input and converts it to a
 * CSS property by inserting a hyphen between lowercase and uppercase letters, then converting the
 * whole string to lowercase. The converted CSS property string is being returned.
 */
export const convertToCSSProperty = (camelCaseString: string): string => {
  const convertedString = camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
  return convertedString;
};
