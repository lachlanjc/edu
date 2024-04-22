import { withContentlayer } from 'next-contentlayer2'

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
})

export default config
