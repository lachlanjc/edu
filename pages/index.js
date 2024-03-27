/** @jsxImportSource theme-ui */
import Layout from '../components/layout'
import { pick, orderBy } from 'lodash-es'
import { Heading, Paragraph, Input, Alert } from 'theme-ui'
import { allSheets } from 'contentlayer/generated'
import SheetList from 'components/sheets'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function IndexPage({ sheets: initialSheets }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [sheets, setSheets] = useState(initialSheets)

  useEffect(() => {
    if (router.query.q) {
      setQ(router.query.q)
      fetch(`/api/search?q=${router.query.q}`)
        .then(res => res.json())
        .then(data => setSheets(data))
    }
  }, [router])

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
      <Alert
        sx={{
          bg: 'red',
          fontFamily: 'heading',
          fontWeight: 'body',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          pl: 2,
        }}
      >
        This search only functions in development.
      </Alert>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (q.trim().length === 0) {
            router.replace('/')
            setSheets(initialSheets)
          } else {
            router.replace('/?q=' + encodeURIComponent(q))
            fetch(`/api/search?q=${q}`)
              .then(res => res.json())
              .then(data => setSheets(data))
          }
        }}
      >
        <Input
          type="search"
          placeholder="Search"
          onChange={e => setQ(e.currentTarget.value)}
          value={q}
          sx={{
            mb: 4,
            fontFamily: 'heading',
            bg: 'elevated',
            borderColor: 'sunken',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            ':focus': { borderColor: 'primary', outline: 'none' },
          }}
        />
      </form>
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
