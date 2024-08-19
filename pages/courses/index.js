/** @jsxImportSource theme-ui */
import { Heading, Link as A } from 'theme-ui'
import Link from 'next/link'
import BackButton from 'components/back'
import Rating from 'components/rating'
import COURSES from 'lib/courses.json'
import { formatSemester } from 'lib/util'
import { Fragment } from 'react'

export default function IndexPage({ semesters }) {
  return (
    <>
      <BackButton text="All posts" />
      <Heading as="h1" variant="styles.h1" sx={{ mt: 2, mb: 4 }}>
        Courses
      </Heading>

      {Object.keys(semesters).map((semester, i) => (
        <Fragment key={semester}>
          <Heading
            as="h2"
            sx={{
              fontSize: 1,
              fontFamily: 'sans',
              color: 'secondary',
              mt: 4,
              mb: 3,
            }}
          >
            {formatSemester(semester)}
          </Heading>
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
            {semesters[semester].map(({ slug, name, rating }, i) => (
              <li key={slug}>
                <Link href={`/courses/${slug}`} passHref legacyBehavior>
                  <A
                    sx={{
                      display: 'flex',
                      columnGap: 3,
                      alignItems: 'center',
                      color: 'primary',
                      textDecoration: 'none',
                      lineHeight: 'title',
                    }}
                  >
                    {semester !== 'f24' && <Rating val={rating} />}
                    {name}
                  </A>
                </Link>
              </li>
            ))}
          </ol>
        </Fragment>
      ))}
    </>
  )
}

export const getStaticProps = async () => {
  const semesters = {}
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
