import React from 'react'
import Helmet from 'react-helmet'

export default ({
  title = '@lachlanjc/ima',
  name = '@lachlanjc/ima',
  description = 'Lachlan Campbell’s coursework blog for their major, Interactive Media Arts, at NYU.'
  // image = 'https://ima-cards.lachlanjc.now.sh/Coursework.png'
}) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={name} />
    <meta name="twitter:title" content={name} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="@lachlanjc/ima" />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
  </Helmet>
)
