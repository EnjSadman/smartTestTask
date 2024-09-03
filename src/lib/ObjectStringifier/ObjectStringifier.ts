export function objectStringifier(obj: { [key: string]: any }): string {
  let result = '';
  for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
          result += `${key}: ${objectStringifier(obj[key])}\n`;
      } else if (typeof obj[key] !== "undefined") {
          result += `${key}: ${obj[key]}\n`;
      }
  }
  return result;
}