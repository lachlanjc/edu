/** @jsxImportSource theme-ui */
import Link from 'next/link'
import { Link as A, Text } from 'theme-ui'
import { isEmpty } from 'lodash-es'

const SheetList = ({ sheets, hideCourses = false, sx }) => (
  <ol
    sx={{
      listStyle: 'none',
      p: 0,
      m: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      ...sx,
    }}
  >
    {sheets.map(({ name, course, date, slug }) => (
      <li key={slug}>
        <Link href={`/${slug}`} passHref legacyBehavior>
          <A
            sx={{
              display: 'grid',
              gridTemplateColumns: hideCourses
                ? ['1fr', '6ch 1fr']
                : ['1fr', '6ch 1fr 32ch'],
              columnGap: 4,
              alignItems: 'center',
              color: 'primary',
              textDecoration: 'none',
            }}
          >
            {!isEmpty(date) && (
              <small
                sx={{
                  fontFamily: 'sans',
                  fontVariantNumeric: 'tabular-nums',
                  color: 'secondary',
                  whiteSpace: 'nowrap',
                  gridRow: [2, 'unset'],
                  textAlign: [null, 'right'],
                }}
              >
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                {!hideCourses && (
                  <Text sx={{ display: ['inline', 'none'] }}> – {course}</Text>
                )}
              </small>
            )}
            <strong
              sx={{
                fontFamily: 'body',
                fontWeight: '600',
                lineHeight: 'title',
              }}
            >
              {name}
            </strong>

            {!hideCourses && (
              <small
                sx={{
                  fontFamily: 'sans',
                  color: 'secondary',
                  textAlign: [null, 'right'],
                  display: ['none', 'block'],
                }}
              >
                {course}
              </small>
            )}
          </A>
        </Link>
      </li>
    ))}
  </ol>
)

export default SheetList
