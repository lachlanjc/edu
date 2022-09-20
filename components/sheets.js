/** @jsxImportSource theme-ui */
import Link from 'next/link'
import { Link as A } from 'theme-ui'
import { isEmpty } from 'lodash-es'

const SheetList = ({ sheets, hideCourses = false }) => (
  <ol
    sx={{
      fontFamily: 'heading',
      listStyle: 'none',
      p: 0,
      m: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    {sheets.map(({ name, course, date, slug }) => (
      <li key={slug}>
        <Link href={`/${slug}`} passHref>
          <A
            sx={{
              display: 'grid',
              gridTemplateColumns: hideCourses
                ? ['1fr', '1fr 12ch']
                : ['4em 1fr', '4em 1fr 12ch'],
              columnGap: 3,
              alignItems: 'center',
              // flexDirection: ['column', 'row'],
              color: 'primary',
              textDecoration: 'none',
            }}
          >
            {!hideCourses && (
              <strong
                sx={{
                  border: '2px solid currentColor',
                  px: 1,
                  borderRadius: '4px',
                  fontSize: 0,
                  width: 'fit-content',
                  ml: 'auto',
                }}
              >
                {course.toUpperCase()}
              </strong>
            )}
            <strong sx={{ lineHeight: 'title' }}>{name}</strong>
            {!isEmpty(date) && (
              <small
                sx={{
                  ml: [null, 'auto'],
                  fontVariantNumeric: 'tabular-nums',
                  color: 'secondary',
                  whiteSpace: 'nowrap',
                  gridColumn: ['2', 'unset'],
                }}
              >
                {date}
              </small>
            )}
          </A>
        </Link>
      </li>
    ))}
  </ol>
)

export default SheetList
