import base from '@theme-ui/preset-base'
import nightOwl from '@theme-ui/prism/presets/shades-of-purple.json'
import { merge } from 'theme-ui'

export const palette = {
  darker: '#121217',
  dark: '#17171d',
  darkless: '#252429',
  black: 'hsl(277deg 25.36% 15.13%)',
  muted: 'hsl(277deg 11.61% 47.96%)',
  white: 'hsl(270deg 60% 98.04%)',
  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',
  violet: '#57068c',
  violetBright: '#8900e1',
}

const theme = merge(base, {
  config: {
    initialColorModeName: 'light',
    printColorModeName: 'light',
    useColorSchemeMediaQuery: true,
    useRootStyles: true,
  },
  fonts: {
    body: 'Gramercy, ui-serif, Charter, Georgia, Times, serif',
    sans: '"Mona Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  fontSizes: [14, 18, 24, 28, 36, 48, 64, 72, 96, 128],
  fontWeights: {
    heading: 600,
    body: 400,
  },
  lineHeights: {
    title: 1.25,
    body: 1.625,
  },
  sizes: {
    container: 680,
    xl: 1024,
  },
  radii: {
    base: 6,
    extra: 9,
    circle: 9999,
  },
  colors: {
    text: 'hsl(277deg 25.36% 15.13%)',
    secondary: 'hsl(277deg 11.61% 47.96%)',
    background: 'hsl(270deg 60% 98.04%)',
    elevated: palette.white,
    sunken: 'hsl(270deg 65.95% 90.76%)',
    primary: palette.violetBright,
    accent: '#fb0f78',
    modes: {
      dark: {
        text: 'hsl(277deg 60% 98.04%)',
        background: 'hsl(277deg 100% 7.45%)',
        elevated: 'hsl(277deg 21.69% 16.84%)',
        sunken: 'hsl(277deg 21.69% 16.84%)',
        primary: '#c975ff',
        secondary: 'hsl(277deg 12.16% 51.16%)',
        accent: '#fb0f78',
      },
    },
  },
  buttons: {
    primary: {
      borderRadius: 'circle',
      transition:
        'text-shadow 0.125s ease-in, background-color 0.5s ease-in-out',
      color: 'white !important', // prevent child a selector from overwriting
      ':hover,:focus': {
        bg: 'accent',
        textShadow: '0 0 6px currentColor',
      },
    },
  },
  cards: {
    secondary: {
      borderRadius: 'extra',
      color: 'secondary',
      border: '1px solid',
      borderColor: 'border',
      p: 3,
      my: 0,
      lineHeight: 'caption',
      strong: {
        display: 'block',
        fontSize: 2,
      },
      a: {
        display: 'block',
        textDecoration: 'none',
      },
    },
  },
  variants: {
    sheet: {
      bg: 'sunken',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.0625)',
      overflow: 'hidden',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'text',
      fontSize: 2,
    },
    h1: {
      fontWeight: 500,
      textWrap: 'balance',
      mb: 3,
    },
    h2: {
      textWrap: 'balance',
      fontSize: 3,
      mt: [3, 4],
      mb: 2,
    },
    hr: {
      border: 0,
      height: 3,
      bg: 'sunken',
      mx: 'auto',
      my: [4, 5],
    },
    pre: {
      p: 3,
      mx: [null, -3],
      bg: 'sunken',
      color: 'white',
      borderRadius: 'base',
      lineHeight: 1.375,
      fontSize: 0,
      ...nightOwl,
      // '.plain, .parameter, .imports, .maybe-class-name, .interpolation': {
      //   color: 'primary',
      // },
      // '.comment, .prolog, .doctype, .cdata, .punctuation, .operator, .entity, .url':
      //   {
      //     color: 'secondary',
      //   },
      // '.comment': {
      //   fontStyle: 'italic',
      // },
      // '.property, .property-access, .tag, .boolean, .number, .constant, .symbol, .deleted, .function, .class-name, .regex, .important, .variable':
      //   {
      //     color: 'blue',
      //   },
      // '.atrule, .attr-value, .keyword': {
      //   color: 'accent',
      // },
      // '.selector, .attr-name, .string, .char, .builtin, .inserted': {
      //   color: 'green',
      // },
    },
    inlineCode: {
      fontFamily: 'monospace',
    },
    'p > code, li > code': {
      fontSize: '0.875em',
      color: 'accent',
      ':before,:after': { content: '"`"' },
    },
    kbd: {
      fontFamily: 'monospace',
      color: 'accent',
      fontSize: '0.875em',
    },
    mark: {
      color: 'dark',
      bg: 'yellow',
      px: 2,
      mr: -1,
      borderRadius: '1em 0.5em',
    },
    blockquote: {
      borderLeft: '5px dotted',
      borderLeftColor: 'rose',
      ml: [0, -3],
      pl: 3,
      p: { color: 'rose' },
    },
    a: {
      overflowWrap: 'break-word',
      color: 'primary',
      transition: 'color 0.125s ease-in-out',
      ':hover,:focus': {
        color: 'accent',
      },
    },
    'th, td': {
      borderColor: 'border',
      py: 2,
      ':not(:first-of-type)': {
        pl: 3,
      },
    },
    [[
      'p > img:first-of-type:last-of-type',
      'p > a:first-child:last-child > img',
      'video',
    ]]: {
      display: 'block',
      transform: ['translateX(-0.5rem)', null, 'translateX(-1.5rem)'],
      width: ['calc(100% + 1rem)', null, 'calc(100% + 3rem)'],
      maxWidth: 'unset',
      maxHeight: '75vh',
      objectPosition: 'center',
      objectFit: 'contain',
      mx: 'auto',
      borderRadius: 'extra',
    },
    ul: {
      listStyleType: 'disc',
      pl: '1.375rem',
      '&.contains-task-list': {
        listStyle: 'none',
        pl: 3,
      },
    },
    li: {
      my: 2,
      '::marker': {
        fontSize: 'inherit',
        color: 'secondary',
      },
      li: {
        mt: 1,
        mb: 1,
        '&:last-of-type': {
          mb: 2,
        },
      },
      '&.task-list-item': {
        my: 1,
        input: {
          mr: 2,
        },
      },
    },
    '.rehype-code-title h1': {
      display: 'inline-block',
      bg: 'accent',
      color: 'background',
      fontSize: 1,
      textAlign: 'center',
      borderTopLeftRadius: 'base',
      borderTopRightRadius: 'base',
      px: 3,
      py: 2,
      m: 0,
      '+ pre': { mt: 0 },
    },
  },
})

export default theme
