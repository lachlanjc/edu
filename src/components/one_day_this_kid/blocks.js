import { Box } from 'rebass'
import theme from './theme'

export const Banner = props => (
  <Box
    sx={{
      backgroundImage:
      `linear-gradient(${theme.colors.primary}, ${theme.colors.primaryDark})`,
      color: 'white',
      py: [4, 5, 6, 7],
      mb: [4, 5]
    }}
  >
    <Box
      {...props}
      variant="container"
      sx={{
        maxWidth: 'wide',
        h1: {
          fontSize: [5, 6, 7],
            display: 'flex',
            flexDirection: 'column',
          lineHeight: 'tight',
            my:0,
          'span:nth-child(2)': {
            textTransform: 'uppercase',
            bg: 'white',
            color: 'primaryDark',
            width: 'min-content',
            py: 2,
            px: 3,
            fontSize: [3,4,5],
            my: [3,4],
            ml: [3,4],
            transform: 'rotate(-4deg)'
          }
        },
        h2: {
          fontSize: [2, 3, 4],
          fontFamily: 'mono',
          lineHeight: 'body',
          fontWeight: 'body',
          mb: 2
        }
      }}
    />
  </Box>
)

export const Container = ({ wide, ...props }) => (
  <Box
    {...props}
    variant="container"
    sx={{
      maxWidth: wide ? 'wide' : 'container',
      h2: {
        fontSize: [3, 4, 5],
        mt: [4, 5],
        mb: [2, 3]
      },
      h3: {
        fontSize: [2, 3, 4],
        mt: [3, 4],
        mb: [2, 3]
      },
      ...props.sx
    }}
  />
)

export const Callout = props => (
  <Box
    {...props}
    sx={{
      bg: 'elevated',
      px: [3, 4],
      py: [2, 3, 4],
      borderRadius: 'extra',
      boxShadow: 'sheet',
      fontSize: [2, 3],
      mb: [4, 5],
      ...props.sx
    }}
  />
)

export const List = props => (
  <Box
    {...props}
    sx={{
      ul: {
        p: 0,
        m: 0,
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        gridGap: [3, 4]
      },
      a: {
        fontWeight: 'bold',
        color: 'primary',
        textDecoration: 'none'
      },
      em: {
        display: 'block',
        color: 'muted',
        fontFamily: 'mono',
        fontWeight: 'body',
        fontStyle: 'normal',
        fontSize: 0
      },
      ...props.sx
    }}
  />
)

export const Gallery = props => (
  <Box
    {...props}
    sx={{
      display: 'grid',
      gridTemplateColumns: ['auto', null, 'repeat(2, 1fr)'],
      gridGap: [3, 4, null, 5],
      width: '100%',
      px: [3, 4, null, 5],
      mb: [3, 4, 5, 6],
      'ul, ol': {
        textAlign: [null, 'right'],
        listStyle: 'none',
        pl: 0
      },
      'p, ol, ul': {
        maxWidth: 1080 / 2,
        p: [3, 4]
      },
      'p, li': {
        color: 'muted',
        fontFamily: 'mono',
        fontSize: [2, 3],
        mt: 0,
        mb: 2
      },
      ...props.sx
    }}
  />
)

export const Team = props => (
  <Box
    {...props}
    sx={{
      ul: {
        p: 0,
        m: 0,
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        gridGap: [3, 4]
      },
      li: {
        display: 'flex',
        alignItems: 'center'
      },
      p: {
        my: 0,
        '&:first-child': {
          lineHeight: 0
        }
      },
      strong: {
        fontSize: [1, 2]
      },
      em: {
        display: 'block',
        color: 'muted',
        fontFamily: 'mono',
        fontWeight: 'body',
        fontStyle: 'normal',
        fontSize: [0, 1],
        my: 0,
        a: {
          color: 'primary'
        }
      },
      img: {
        flexShrink: 'none',
        borderRadius: 'circle',
        width: [64, 72],
        height: [64, 72],
        objectFit: 'cover',
        objectPosition: 'center',
        mr: 3
      },
      ...props.sx
    }}
  />
)
