/** @jsxImportSource theme-ui */
import Layout from '../components/layout'
import { pick, orderBy } from 'lodash-es'
import { Heading, Paragraph } from 'theme-ui'
import { allSheets } from 'contentlayer/generated'
import SheetList from 'components/sheets'

export default function IndexPage({ sheets }) {
  return (
    <Layout>
      <Heading as="h1" variant="styles.h1" sx={{ m: 0 }}>
        Coursework
      </Heading>
      <Paragraph
        sx={{ color: 'secondary', mt: 1, mb: 4, a: { color: 'inherit' } }}
      >
        <a href="https://lachlanjc.com">@lachlanjc</a>’s coursework at NYU,
        majoring in Interactive Media Arts.
      </Paragraph>
      <SheetList sheets={sheets} />
    </Layout>
  )
}

export const getStaticProps = () => {
  const sheets = orderBy(
    allSheets.map(sheet => pick(sheet, ['slug', 'course', 'name', 'date'])),
    ['date', 'course', 'name'],
    ['desc', 'course', 'desc'],
  )

  return { props: { sheets } }
}
