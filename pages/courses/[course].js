/** @jsxImportSource theme-ui */
import Layout from '../../components/layout'
import { pick, orderBy } from 'lodash-es'
import { Heading } from 'theme-ui'
import { allSheets } from 'contentlayer/generated'
import BackButton from 'components/back'
import SheetList from 'components/sheets'
import { COURSES } from 'lib/util'

export default function IndexPage({ course, sheets }) {
  return (
    <Layout>
      <BackButton text="All posts" />
      <Heading as="h1" variant="styles.h1" sx={{ mt: 2, mb: 4 }}>
        {course}
      </Heading>
      <SheetList sheets={sheets} hideCourses />
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(COURSES).map(course => ({ params: { course } })),
    fallback: false,
  }
}

export const getStaticProps = ({ params }) => {
  let { course } = params

  const sheets = orderBy(
    allSheets
      .filter(sheet => sheet.course === course)
      .map(sheet => pick(sheet, ['slug', 'course', 'name', 'date'])),
    ['date', 'course', 'name'],
    ['desc', 'desc', 'asc'],
  )
  course = COURSES[course]

  return { props: { sheets, course } }
}
