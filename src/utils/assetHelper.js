export function withAssets(items) {
  return items.map(item => ({
    ...item,
    image: item.image ? new URL(`../assets/${item.image}`, import.meta.url).href : item.image,
    file: item.file ? new URL(`../assets/${item.file}`, import.meta.url).href : item.file,
  }));
}
