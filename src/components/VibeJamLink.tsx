const createVibeJamLink = () => () => {
  return (
    <a
      target="_blank"
      href="https://jam.pieter.com"
      style={{
        fontFamily: 'system-ui, sans-serif',
        position: 'fixed',
        bottom: -1,
        right: -1,
        padding: 7,
        fontSize: 14,
        fontWeight: 'bold',
        background: '#fff',
        color: '#000',
        textDecoration: 'none',
        borderTopLeftRadius: 12,
        zIndex: 10000,
        border: '1px solid #fff',
      }}
    >
      🕹️ Vibe Jam 2025
    </a>
  )
}

export const VibeJamLink = createVibeJamLink()
