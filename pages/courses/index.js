/** @jsxImportSource theme-ui */
import Layout from '../../components/layout'
import { Heading, Link as A } from 'theme-ui'
import Link from 'next/link'
import BackButton from 'components/back'
import Rating from 'components/rating'
import COURSES from 'lib/courses.json'
import { formatSemester } from 'lib/util'

export default function IndexPage({ semesters }) {
  // console.log(props)
  // const semesters = []
  return (
    <Layout>
      <BackButton text="All posts" />
      <Heading as="h1" variant="styles.h1" sx={{ mt: 2, mb: 4 }}>
        Courses
      </Heading>

      {Object.keys(semesters).map((semester, i) => (
        <>
          <Heading as="h2" sx={{ fontSize: 2, mt: 4, mb: 3 }}>
            {/* {formatSemester(semester)} */}
            {semester}
          </Heading>
          <pre>{JSON.stringify(semesters[semester], null, 2)}</pre>
          <ol
            sx={{
              fontFamily: 'sans',
              listStyle: 'none',
              p: 0,
              m: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* {Object.keys(semesters[semester]).map((slug, i) => (
              <li key={slug}>
                <Link href={`/courses/${slug}`} passHref legacyBehavior>
                  <A
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px',
                      columnGap: 3,
                      alignItems: 'center',
                      color: 'primary',
                      textDecoration: 'none',
                    }}
                  >
                    <strong sx={{ lineHeight: 'title' }}>
                      {COURSES[slug].name}
                    </strong>
                    <Rating val={COURSES[slug].rating} />
                  </A>
                </Link>
              </li>
            ))} */}
          </ol>
        </>
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const semesters = []
  let semesterKeys = new Set(Object.values(COURSES).map(c => c.semester))
  const courses = Object.keys(COURSES).map(slug => {
    return {
      slug,
      ...COURSES[slug],
    }
  })

  Array.from(semesterKeys)
    .reverse()
    .forEach(semester => {
      semesters[semester] = courses
        .filter(c => c.semester === semester)
        .map(({ slug, name, rating }) => ({ slug, name, rating }))
    })

  return { props: { semesters } }
}
