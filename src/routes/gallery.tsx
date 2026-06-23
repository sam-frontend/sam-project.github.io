import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: Gallery,
})

// Curated Unsplash images — photography/architecture/design theme
const GALLERY_ITEMS = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126894/taxi1_jwwtaj.jpg',
    title: 'Urban Grid',
    category: 'Architecture',
    w: 800,
    h: 600,
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126892/weather4_x3b7pe.jpg',
    title: 'Form & Shadow',
    category: 'Abstract',
    w: 600,
    h: 800,
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126851/front1_bqr8ih.jpg',
    title: 'Horizon Light',
    category: 'Landscape',
    w: 800,
    h: 533,
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126850/f5_lceqof.jpg',
    title: 'Desert Dunes',
    category: 'Landscape',
    w: 800,
    h: 600,
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126848/EXPOGOAPP1_cntn1q.jpg',
    title: 'Interior Lines',
    category: 'Architecture',
    w: 600,
    h: 800,
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126845/weather6_fsptmc.jpg',
    title: 'Digital Network',
    category: 'Technology',
    w: 800,
    h: 600,
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126847/postman_get_request_pnsve7.jpg',
    title: 'Color Study',
    category: 'Abstract',
    w: 800,
    h: 800,
  },
  {
    id: 8,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126847/EXPOGO3_emaxlh.jpg',
    title: 'Concrete & Glass',
    category: 'Architecture',
    w: 600,
    h: 800,
  },
  {
    id: 9,
    url: 'https://res.cloudinary.com/ugonna/image/upload/v1782126893/weather2_t1yz7a.jpg',
    title: 'Typography',
    category: 'Design',
    w: 800,
    h: 600,
  },
]

const CATEGORIES = ['All', 'Architecture', 'Abstract', 'Landscape', 'Technology', 'Design']

function buildImageUrl(src: string, w: number, h: number) {
  const encoded = encodeURIComponent(src)
  return `/.netlify/images?url=${encoded}&w=${w}&h=${h}&fit=cover&q=80&fm=webp`
}

function Gallery() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '4rem 1.5rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto">
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: '#ff5500' }}
          >
            Visual Work
          </span>
          <h1
            className="font-display mt-4 mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--fg)', lineHeight: 0.95 }}
          >
            Gallery
          </h1>
          <p
            className="text-base"
            style={{ color: 'var(--fg-muted)', maxWidth: '480px', lineHeight: 1.7 }}
          >
            A curated selection of photography and visual work. Each image is
            served optimized and format-negotiated via Netlify Image CDN.
          </p>
        </div>
      </section>

      {/* Masonry-style grid */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="max-w-6xl mx-auto">
          {/* 3-column masonry-ish layout using CSS columns */}
          <div
            style={{
              columnCount: 3,
              columnGap: '1rem',
              columnFill: 'balance',
            }}
            className="columns-1 md:columns-2 lg:columns-3"
          >
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="gallery-item rounded-lg"
                style={{
                  breakInside: 'avoid',
                  marginBottom: '1rem',
                  display: 'inline-block',
                  width: '100%',
                }}
              >
                <img
                  src={buildImageUrl(item.url, item.w, item.h)}
                  alt={item.title}
                  loading="lazy"
                  width={item.w}
                  height={item.h}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '0.5rem',
                  }}
                />
                <div className="overlay" style={{ borderRadius: '0.5rem' }}>
                  <div>
                    <div
                      className="font-mono text-xs tracking-wider uppercase mb-1"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {item.category}
                    </div>
                    <div className="font-display text-lg" style={{ color: '#fff' }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image CDN info badge */}
          <div
            className="mt-12 flex items-center gap-3 p-4 rounded-lg"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', maxWidth: 'max-content' }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#ff5500', flexShrink: 0 }}
            />
            <p className="font-mono text-xs" style={{ color: 'var(--fg-muted)' }}>
              All images optimized via{' '}
              <span style={{ color: 'var(--fg)' }}>Netlify Image CDN</span>
              {' '}— WebP format, responsive sizing, edge-cached.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
