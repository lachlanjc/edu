import Head from 'next/head'

const Meta = ({
  title = '@lachlanjc/edu',
  name = '@lachlanjc/edu',
  description = 'Lachlan Campbell’s coursework blog for their major, Interactive Media Arts, at NYU.',
  image = 'https://ima-cards.lachlanjc.vercel.app/Coursework.png',
}) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={name} />
    <meta name="twitter:title" content={name} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="@lachlanjc/ima" />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />
    <link
      rel="alternate"
      type="application/rss+xml"
      href="https://edu.lachlanjc.com/feed.xml"
    />
  </Head>
)

export default Meta
