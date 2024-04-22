/** @jsxImportSource theme-ui */
import Layout from '../../components/layout'
import { pick, orderBy } from 'lodash-es'
import { Heading, Paragraph } from 'theme-ui'
import { allSheets } from 'contentlayer/generated'
import BackButton from 'components/back'
import SheetList from 'components/sheets'
import COURSES from '../../lib/courses.json'
import { RatingWithDetails } from 'components/rating'

export default function IndexPage({ course, sheets }) {
  return (
    <Layout>
      <BackButton text="All courses" href="/courses" />
      <Heading as="h1" variant="styles.h1" sx={{ mt: 2, mb: '0 !important' }}>
        {course.name}
      </Heading>
      <Paragraph sx={{ fontSize: 3, color: 'secondary', mt: 0, mb: 2 }}>
        with {course.prof}
      </Paragraph>
      {course.semester !== 's24' && (
        <RatingWithDetails val={course.rating} showText />
      )}
      <div sx={{ height: 48 }} />
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
      .map(sheet => pick(sheet, ['slug', 'name', 'date'])),
    ['date', 'name'],
    ['desc', 'asc'],
  )
  course = COURSES[course]

  return { props: { sheets, course } }
}
