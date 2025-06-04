export function formatTime(min, sec) {
  const mm = Number.isFinite(min) ? min : 0;
  const ss = Number.isFinite(sec) ? sec : 0;
  const m = String(mm).padStart(2, '0');
  const s = String(ss).padStart(2, '0');
  return `${m}:${s}`;
}
