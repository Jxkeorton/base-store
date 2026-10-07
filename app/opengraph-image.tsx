import { ImageResponse } from 'next/og'

export const alt = 'Traverse Base: the first UK BASE store'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'linear-gradient(110deg, #1c2b3a 0%, #324d67 100%)',
          color: 'white',
          fontStyle: 'italic',
          fontWeight: 800,
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', fontSize: 150, lineHeight: 0.95, letterSpacing: -4 }}>
          Traverse&nbsp;<span style={{ color: '#f02d34' }}>Base</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 44, fontStyle: 'normal', fontWeight: 600, letterSpacing: 6, color: '#dde3ea' }}>
          The first UK BASE store
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 24, background: '#f02d34' }} />
      </div>
    ),
    size,
  )
}
