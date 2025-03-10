import { withContentlayer } from 'next-contentlayer'

/**
 * @type {import('next').NextConfig}
 */
const config = withContentlayer({
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  pageExtensions: ['js', 'ts', 'tsx'],
  images: {
    domains: ['cdn.glitch.com', 'www.icloud.com'],
  },
  async rewrites() {
    return [
      {
        source: '/one_day_this_kid',
        destination:
          'https://ima-lhyksfx2l-lachlanjc.vercel.app/one_day_this_kid/',
      },
      {
        source: '/imagining_worlds_post_human',
        destination:
          'https://ima-lhyksfx2l-lachlanjc.vercel.app/imagining_worlds_post_human/',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/2025-03-04_caps_annotated_bibliography',
        destination: '/2025-03-04_caps_superfund_map_concept',
        permanent: true,
      },
    ]
  },                              
})

export default config
