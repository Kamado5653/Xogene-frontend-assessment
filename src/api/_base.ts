const BASE_URL = "https://rxnav.nlm.nih.gov";

export function getUrl(part: string) {
  const url = new URL(part.trim(), BASE_URL);
  return url.toString();
}
