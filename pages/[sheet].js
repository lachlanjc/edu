import { BaseStyles } from 'theme-ui'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../lib/components'
import Layout from '../components/layout'
import { allSheets } from 'contentlayer/generated'
import BackButton from 'components/back'
import { formatDate } from 'lib/util'
import COURSES from 'lib/courses.json'
import { Text } from 'theme-ui'
// import type { Sheet } from 'contentlayer/generated';

export default function Sheet({ sheet, course }) {
  const Content = useMDXComponent(sheet.body.code)

  return (
    <Layout>
      <BaseStyles>
        {course && (
          <BackButton
            icon="list"
            href={`/courses/${sheet.course}`}
            text={`All ${course}`}
          />
        )}
        <Content components={components} />
        {sheet.date?.startsWith('20') && (
          <Text
            as="time"
            dateTime={sheet.date}
            sx={{
              color: 'secondary',
              fontFamily: 'heading',
              fontSize: 0,
              textAlign: 'center',
              a: { color: 'inherit' },
            }}
          >
            Posted {formatDate(new Date(sheet.date))}{' '}
            <a
              href={`https://github.com/lachlanjc/edu/blob/glitch/sheets/${sheet.slug}.mdx`}
            >
              via GitHub
            </a>
          </Text>
        )}
      </BaseStyles>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allSheets.map(({ slug }) => ({ params: { sheet: slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const sheet = allSheets.find(sheet => sheet.slug === params?.sheet)
  const course = sheet.course ? COURSES[sheet.course] : null
  return { props: { sheet, course } }
}
