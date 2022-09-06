import { withContentlayer } from 'next-contentlayer'
import withMDX from '@next/mdx'

/**
 * @type {import('next').NextConfig}
 */
const config = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})(
  withContentlayer({
    swcMinify: true,
    compiler: {
      emotion: true,
    },
    pageExtensions: ['js', 'ts', 'tsx', 'mdx'],
    images: {
      domains: ['cdn.glitch.com', 'www.icloud.com'],
    },
    experimental: {
      images: {
        allowFutureImage: true,
      },
    },
    async rewrites() {
      return [{ source: '/feed.xml', destination: '/_next/static/feed.xml' }]
    },
  }),
)

export default config
