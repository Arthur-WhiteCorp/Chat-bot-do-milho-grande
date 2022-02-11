export function normalizeString(text: string) {
  const textWithoutTypographicalAccents = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const textWithoutExtraSpaces = textWithoutTypographicalAccents
    .split(" ")
    .filter((string) => string !== "")
    .join(" ");

  const textToLowerCase = textWithoutExtraSpaces.toLowerCase();

  const textFormatted = `${textToLowerCase[0].toUpperCase()}${textToLowerCase.slice(
    1
  )}`;

  return textFormatted;
}
