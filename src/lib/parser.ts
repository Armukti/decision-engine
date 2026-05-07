export function injectName(text: string, name: string) {
  if (!text) return text
  return text.replaceAll("{name}", name)
}