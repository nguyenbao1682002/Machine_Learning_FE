export const generateAlphaBackgroundStyles = (alpha: number) => {
  return {
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0,
    '&::after': {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      content: '""',
      backgroundColor: `rgba(0, 0, 0, ${alpha / 100})`,
      zIndex: -1,
    },
  }
}
