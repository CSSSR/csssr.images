// https://stackoverflow.com/a/27232658

const canUseWebp = (): boolean => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  return Boolean(canvas.toDataURL &&
    canvas.toDataURL('image/webp') &&
    canvas.toDataURL('image/webp').indexOf('image/webp') === 5)
}

if (canUseWebp()) {
  document.documentElement.classList.add('webp')
}
