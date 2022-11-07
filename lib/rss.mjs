import RSS from 'rss'
import { allSheets } from '../.contentlayer/generated/Sheet/_index.mjs'
import { remark } from 'remark'
import strip from 'remark-mdx-to-plain-text'
import { writeFileSync } from 'fs'

async function generateFeed() {
  const feed = new RSS({
    title: '@lachlanjc/edu',
    site_url: 'https://edu.lachlanjc.com',
    feed_url: 'https://edu.lachlanjc.com/feed.xml',
    image_url: 'https://github.com/lachlanjc.png',
    language: 'en_US',
  })

  const capitalLetter = /^[A-Z]/

  await Promise.all(
    allSheets
      .filter(sheet => sheet.date != null)
      .map(async sheet => {
        feed.item({
          title: sheet.name,
          url: `https://edu.lachlanjc.com/${sheet.slug}`,
          guid: sheet.slug,
          date: sheet.date,
          description: await remark()
            .use(strip)
            .process(
              sheet.body.raw
                .split('\n\n')
                .filter(text => text.match(capitalLetter))?.[0],
            )
            .then(file => String(file).trim()),
        })
      }),
  )

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }))
  console.log(
    `Wrote ${
      allSheets.filter(sheet => sheet.date != null).length
    } items to RSS feed`,
  )
}

console.log('[postbuild] Generating RSS feed')
generateFeed()
