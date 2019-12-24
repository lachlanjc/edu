import React from 'react'
import { Box, Text, Image, Grid } from '@theme-ui/components'
import base from '../gatsby-plugin-theme-ui/index'

const theme = JSON.parse(JSON.stringify(base))

theme.fonts.body = '"Lyon Text Web", ' + theme.fonts.body
theme.fonts.title = '"Folsom Web", ' + theme.fonts.heading

export const Banner = props => (
  <Box
    sx={{
      px: [4, 5],
      py: [null, 3, 4],
      width: '100vw',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)'
    }}
  >
    <Box
      {...props}
      sx={{
        width: '100%',
        maxWidth: '64rem',
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: [null, 'repeat(2, 1fr)'],
        gridColumnGap: [null, 3],
        gridRowGap: [3, 4, 5],
        h1: {
          fontFamily: theme.fonts.title,
          fontSize: [5, 6, 7, 8],
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 'tight',
          color: 'orange',
          my: 0,
          '&:last-of-type': {
            textAlign: [null, 'right'],
            color: 'red'
          }
        },
        h2: {
          gridColumn: [null, 'span 2'],
          color: 'secondary',
          fontFamily: theme.fonts.heading,
          fontSize: [0, 1],
          fontWeight: 'body',
          letterSpacing: '.04em',
          lineHeight: 'body',
          textAlign: [null, 'center'],
          textTransform: 'uppercase',
          'a:hover,a:focus': {
            textDecoration: 'none'
          }
        }
      }}
    />
  </Box>
)

export const Container = ({ wide, ...props }) => (
  <Box
    {...props}
    sx={{
      maxWidth: '40rem',
      mx: 'auto',
      p: {
        fontFamily: theme.fonts.body,
        fontSize: '105%',
        lineHeight: '1.8',
        mb: [2, 3, 4]
      },
      a: { color: 'red' },
      '> img': {
        borderRadius: 'extra',
        transform: 'scale(1)',
        transition: 'transform .25s ease',
        ':hover': {
          transform: 'scale(1.1)'
        }
      },
      '@supports (-webkit-initial-letter: 2)': {
        'section:first-letter': {
          WebkitInitialLetter: '3',
          fontFamily: theme.fonts.title,
          fontWeight: 900,
          color: 'red',
          mr: 2
        }
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
      p: [3, 4],
      overflow: 'hidden',
      borderRadius: 'extra',
      boxShadow: 'sheet',
      fontSize: [2, 3],
      mb: [4, 5],
      ...props.sx
    }}
  />
)

export const Listen = props => (
  <Callout
    {...props}
    sx={{
      display: 'grid',
      gridTemplateColumns: [null, '1fr 256px'],
      gridGap: 3,
      alignItems: 'center',
      mx: [null, -3, -4],
      '> p': {
        fontFamily: 'inherit',
        fontWeight: 'bold',
        fontSize: 2,
        m: 0
      },
      audio: {
        width: '100%',
        minWidth: 256
      }
    }}
  />
)

export const Special = props => (
  <Box
    as="section"
    {...props}
    sx={{
      position: 'relative',
      '@supports (-webkit-initial-letter: 2) and (-webkit-background-clip: text)': {
        ':first-letter': {
          backgroundImage:
            'url(https://d2wkqk610zk1ag.cloudfront.net/items/233Q0M0R1q2V2z1c362T/b33ahv11hz3z0qm6cn2be44ueqr3y0we.jpeg)',
          backgroundSize: '210% 210%',
          backgroundPosition: '10% 35%',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent'
        }
      }
    }}
  />
)

export const FullBleed = ({ src, alt, sx }) => (
  <Box
    as="figure"
    sx={{
      width: '100vw',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
      my: [3, 4, 5]
    }}
  >
    <Image
      as="img"
      src={src}
      alt={alt}
      sx={{
        width: '100%',
        ...sx
      }}
    />
    <Text
      as="figcaption"
      children={alt}
      sx={{ color: 'secondary', textAlign: 'center', mt: 1, fontSize: 0 }}
    />
  </Box>
)

export const ImgGrid = props => (
  <Grid
    columns={[null, 3]}
    gap={4}
    {...props}
    sx={{
      width: '100vw',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
      px: [3, 4, 5, 6],
      my: [4, 5],
      img: { borderRadius: 'extra' },
      ...props.sx,
      p: { m: 0, lineHeight: 0, width: '100%' },
      h3: {
        gridColumn: [null, 'span 3'],
        fontFamily: theme.fonts.title,
        fontSize: 2,
        letterSpacing: '.09em',
        lineHeight: 'body',
        textAlign: 'center',
        m: 0,
        'a:hover,a:focus': {
          textDecoration: 'none'
        },
        small: {
          color: 'secondary',
          display: 'block',
          mt: 1,
          letterSpacing: 0,
          fontFamily: theme.fonts.body,
          fontSize: 1,
          fontWeight: '400'
        }
      },
      'img, video': {
        bg: 'muted',
        boxShadow: 'card',
        borderRadius: 'extra',
        objectFit: 'cover',
        maxWidth: '100%'
      }
    }}
  />
)

export const Citations = props => (
  <Box
    {...props}
    sx={{
      bg: 'sunken',
      px: [3, 4, 5],
      py: [2, 3, 4],
      mt: [4, 5],
      borderRadius: 'extra',
      fontSize: 0,
      h2: {
        mt: 0,
        color: 'secondary',
        fontFamily: theme.fonts.title,
        fontSize: 1,
        letterSpacing: '.09em',
        lineHeight: 'body',
        textTransform: 'uppercase',
        'a:hover,a:focus': {
          textDecoration: 'none'
        }
      },
      ul: {
        listStyle: 'none',
        pl: 0,
        mt: 0
      },
      li: {
        mt: 2,
        color: 'secondary',
        pl: '1.75rem',
        textIndent: '-1.75rem',
        a: {
          color: 'inherit',
          textDecoration: 'underline',
          textDecorationStyle: 'initial',
          whiteSpace: [null, null, 'nowrap']
        }
      }
    }}
  />
)
