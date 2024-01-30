export function pad(input: number | null) {
  if (!input) return '00';
  return input < 10 ? `0${input}` : input.toString();
}
