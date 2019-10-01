/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import theme from '../gatsby-plugin-theme-ui'
import YouTubePlayer from 'react-player/lib/players/YouTube'

export const Container = ({ wide, ...props }) => (
  <div
    {...props}
    sx={{
      maxWidth: wide ? 'wide' : 'container'
    }}
  />
)

export const Tiles = props => (
  <div
    {...props}
    sx={{
      ul: {
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gridGap: 4,
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))'
      },
      h2: {
        fontSize: 2
      },
      img: {
        display: 'block',
        width: 128,
        maxWidth: '100%',
        height: 'auto',
        m: 'auto'
      },
      ...props.sx
    }}
  />
)

export const YouTube = ({ url, ...props }) => (
  <YouTubePlayer
    url={url}
    width="100%"
    height={400}
    controls
    config={{ youtube: { playerVars: { showinfo: 1 } } }}
  />
)

export const P5 = props => (
  <iframe
    sx={{ minHeight: '100%', width: '100%', border: 0, ...props.sx }}
    {...props}
  ></iframe>
)

export const Glitch = ({ title, ...props }) => (
  <div
    className="glitch-embed-wrap"
    sx={{ height: 420, width: '100%', ...props.sx }}
  >
    <iframe
      title={title}
      sx={{ height: '100%', width: '100%', border: 0 }}
      allow="geolocation; microphone; camera; midi; vr; encrypted-media"
      {...props}
    />
  </div>
)

export const MLA = props => (
  <div
    {...props}
    sx={{
      'p, li, h2': {
        fontFamily: '"Times New Roman", serif',
        lineHeight: 2
      },
      h2: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        textAlign: 'center',
        my: 0
      },
      p: {
        my: 0,
        textIndent: '3em'
      },
      blockquote: {
        pl: '3em',
        fontStyle: 'italic',
        p: { textIndent: 0 }
      }
    }}
  />
)

export const Columns = props => (
  <div
    {...props}
    sx={{
      columnWidth: 256,
      columnGap: theme.space[4],
      p: {
        my: 0
      },
      'h2:first-child': {
        mt: 0
      }
    }}
  />
)

export const List = props => (
  <div
    {...props}
    sx={{
      ul: {
        p: 0,
        m: 0,
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        gridGap: 4
      },
      a: {
        fontWeight: 'bold'
      },
      ...props.sx
    }}
  />
)

export const LinkList = props => (
  <List
    {...props}
    sx={{
      mb: 4,
      ul: {
        gridGap: 3,
        mb: 4
      },
      p: { my: 0 },
      a: {
        bg: 'primary',
        color: 'background',
        p: 3,
        borderRadius: 6,
        fontWeight: 'bold',
        lineHeight: 'heading',
        textDecoration: 'none',
        display: 'block'
      },
      ...props.sx
    }}
  />
)

const { red, orange, cyan, green, blue, violet } = theme.colors
const rainbow = { red, orange, cyan, green, blue, violet }

const rainbowKids = {}
Object.entries(rainbow).map(([name, bg], i) => {
  rainbowKids[`&:nth-child(${Object.keys(rainbow).length}n + ${i + 1}) a`] = {
    bg
  }
  return bg
})

export const ShortcutsList = props => (
  <List
    {...props}
    sx={{
      ul: {
        gridGap: 3,
        mb: 4
      },
      li: {
        display: 'flex',
        ...rainbowKids,
        p: { my: 0 }
      },
      a: {
        bg: 'primary',
        px: 3,
        py: [3, null, 4],
        borderRadius: 6,
        fontWeight: 'bold',
        lineHeight: 'heading',
        color: 'white',
        textDecoration: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        svg: {
          m: '-6px',
          mr: 2
        }
      },
      ...props.sx
    }}
  />
)
