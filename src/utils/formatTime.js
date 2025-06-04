export function formatTime(min, sec) {
  const m = String(min).padStart(2, '0');
  const s = String(sec).padStart(2, '0');
  return `${m}:${s}`;
}
