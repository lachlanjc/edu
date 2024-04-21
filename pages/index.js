import Layout from '../components/layout'
import { pick, orderBy, groupBy } from 'lodash-es'
import { Heading, Paragraph } from 'theme-ui'
import { allSheets } from 'contentlayer/generated'
import SheetList from 'components/sheets'
import COURSES from 'lib/courses.json'
import { formatSemester } from 'lib/util'

export default function IndexPage({ semesters }) {
  console.log(semesters)
  return (
    <Layout xl>
      <Heading as="h1" variant="styles.h1" sx={{ m: 0 }}>
        Coursework
      </Heading>
      <Paragraph
        sx={{ color: 'secondary', mt: 1, mb: 4, a: { color: 'inherit' } }}
      >
        <a href="https://lachlanjc.com">@lachlanjc</a>’s coursework at NYU,
        majoring in Interactive Media Arts.
      </Paragraph>
      {Object.entries(semesters).map(([semester, sheets]) => (
        <>
          <Heading as="h2" sx={{ fontSize: 2, mt: 4, mb: 3 }}>
            {formatSemester(semester)}
          </Heading>
          <SheetList sheets={sheets} />
        </>
      ))}
    </Layout>
  )
}

export const getStaticProps = () => {
  const sheets = orderBy(
    allSheets.map(sheet => {
      return pick(sheet, ['slug', 'name', 'date', 'course'])
    }),
    ['date', 'course', 'name'],
    ['desc', 'course', 'desc'],
  )
  const semesters = groupBy(sheets, sheet => COURSES[sheet.course].semester)
  Object.keys(semesters).forEach(semester => {
    semesters[semester] = semesters[semester].map(sheet => {
      sheet.course = COURSES[sheet.course].name
      return sheet
    })
  })

  return { props: { semesters } }
}
