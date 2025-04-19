/** @jsx jsx */
import { jsx } from 'theme-ui'
import theme, { palette } from '../lib/theme'
import CodePenEmbed from 'react-codepen-embed'

export const Container = ({ wide, ...props }) => (
  <div
    {...props}
    sx={{
      maxWidth: wide ? 'wide' : 'container',
    }}
  />
)

export const Embed = ({ src, sx, ...props }) => (
  <div
    variant="sheet"
    {...props}
    sx={{ p: 0, maxHeight: 512, width: '100%', mt: [3, 4], ...sx }}
  >
    <iframe
      src={src}
      frameBorder={0}
      onMouseWheel=""
      width="100%"
      height={512}
      style={{ display: 'block', maxWidth: '100%' }}
    />
  </div>
)

export const P5 = props => (
  <iframe
    sx={{ minHeight: '100%', width: '100%', border: 0, ...props.sx }}
    {...props}
  />
)

export const Glitch = ({ title, ...props }) => (
  <div
    className="glitch-embed-wrap"
    sx={{ height: 420, width: '100%', my: [3, 4], ...props.sx }}
  >
    <iframe
      title={title}
      sx={{ height: '100%', width: '100%', border: 0 }}
      allow="geolocation; microphone; camera; midi; vr; encrypted-media"
      {...props}
    />
  </div>
)

export const CodePen = props => <CodePenEmbed user="lachlanjc" {...props} />

export const CommitList = props => (
  <div
    {...props}
    sx={{
      ul: {
        pl: 0,
        py: 2,
        my: -3,
        listStyle: 'none',
        position: 'relative',
        ':before': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '6px',
          width: '4px',
          height: '100%',
          borderRadius: '2px',
          bg: 'sunken',
          zIndex: 0,
        },
      },
      li: {
        py: 1,
        pl: 4,
        position: 'relative',
        fontWeight: '600',
        ':before': {
          content: '""',
          width: '12px',
          height: '12px',
          bg: 'sunken',
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: 'muted',
          borderRadius: '12px',
          display: 'inline-block',
          zIndex: 1,
          position: 'absolute',
          left: 0,
          top: '.75em',
        },
        a: { textDecoration: 'none' },
      },
      ...props.sx,
    }}
  />
)

export const MLA = props => (
  <div
    {...props}
    sx={{
      'p, li, h2': {
        fontFamily: '"Times New Roman", serif',
        lineHeight: 2,
      },
      h2: {
        fontSize: 'inherit',
        fontWeight: 'inherit',
        textAlign: 'center',
        my: 0,
      },
      p: {
        my: 0,
        textIndent: '3em',
      },
      blockquote: {
        pl: '3em',
        fontStyle: 'italic',
        p: { textIndent: 0 },
      },
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
        my: 0,
      },
      'h2:first-child': {
        mt: 0,
      },
    }}
  />
)

export const List = props => (
  <div
    {...props}
    sx={{
      'ul, ol': {
        p: 0,
        mx: 0,
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
        gridGap: 4,
      },
      'li img': {
        my: 3,
        borderRadius: 'base',
      },
      a: {
        fontWeight: 'bold',
      },
      ...props.sx,
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
        mb: 4,
      },
      p: { my: 0 },
      a: {
        bg: theme.colors.primary,
        color: 'background',
        p: 3,
        borderRadius: 6,
        fontWeight: 'bold',
        lineHeight: 'sans',
        textDecoration: 'none',
        display: 'block',
        wordBreak: 'break-word',
      },
      ...props.sx,
    }}
  />
)
