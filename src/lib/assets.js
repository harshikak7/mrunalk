const modules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

// Map of "file-name" (no folder, no extension) -> URL
const assets = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const name = path.split('/').pop().replace(/\.[^.]+$/, '')
    return [name, url]
  }),
)

export function getAsset(name) {
  const url = assets[name]
  if (!url) console.warn(`[assets] Missing asset "${name}" in src/assets/`)
  return url
}

export function getAssetsByPrefix(prefix) {
  const trailingNumber = (name) => Number(name.match(/(\d+)$/)?.[1] ?? 0)
  return Object.keys(assets)
    .filter((name) => name.startsWith(prefix))
    .sort((a, b) => trailingNumber(a) - trailingNumber(b))
    .map((name) => assets[name])
}
