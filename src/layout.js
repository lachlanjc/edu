/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { Link } from 'gatsby'
import { Box, Link as A } from 'rebass'
import Avatar from './components/avatar'
import Icon from './components/icon'
import Meta from './components/meta'
import { getName, getDescription, getImage } from './util'
// import theme from './gatsby-plugin-theme-ui'

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <button
      {...props}
      onClick={e => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Cycle Color Mode"
      sx={{
        display: 'inline-block',
        appearance: 'none',
        bg: 'transparent',
        color: 'inherit',
        p: 1,
        m: 0,
        border: 0,
        borderRadius: 9999,
        transition: 'box-shadow .125s ease-in-out',
        ':hover,:focus': {
          color: 'primary',
          boxShadow: '0 0 0 3px',
          outline: 'none'
        }
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="currentcolor"
        sx={{
          display: 'block'
        }}
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentcolor"
          strokeWidth="4"
        />
        <path d="M 16 0 A 16 16 0 0 0 16 32 z" />
      </svg>
    </button>
  )
}

export default props => {
  const path = props.location.pathname
  const home = path === '/'
  const base = '@lachlanjc/ima'
  const name = home ? base : getName(path)

  return (
    <Styled.root
      sx={{
        p: 3,
        fontSize: 1,
        maxWidth: home ? 'xl' : 'container',
        mx: 'auto'
      }}
    >
      <Meta
        title={home ? base : `${name} – ${base}`}
        name={name}
        description={getDescription(path)}
        image={getImage(path)}
      />
      <header
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: [4, 5]
        }}
      >
        <Styled.a
          href="https://lachlanjc.me"
          target="_blank"
          sx={{
            fontWeight: 'bold',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          @lachlanjc
        </Styled.a>
        <Styled.a
          as={Link}
          to="/"
          sx={{
            fontWeight: 'bold',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
          IMA @ NYU
        </Styled.a>
        <ColorSwitcher />
      </header>
      {props.children}
      <Box
        sx={{
          py: [3, 4, 5],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          a: { color: 'primary', mx: 2 }
        }}
      >
        <A
          href="https://lachlanjc.me"
          title="Personal site"
          target="_blank"
          variant="styles.navitem"
          sx={{ lineHeight: 0 }}
        >
          <Avatar />
        </A>
        <A
          href="https://twitter.com/lachlanjc"
          title="Twitter"
          target="_blank"
          variant="styles.navitem"
        >
          <Icon glyph="twitter" size={36} />
        </A>
        <A
          href="https://github.com/lachlanjc/ima"
          title="GitHub"
          target="_blank"
          variant="styles.navitem"
        >
          <Icon glyph="github" size={36} />
        </A>
        <A
          href="https://instagram.com/lachlan.jc"
          title="Instagram"
          target="_blank"
          variant="styles.navitem"
        >
          <Icon glyph="instagram" size={36} />
        </A>
        <A
          href="mailto:lachlanjc@nyu.edu"
          title="Email"
          sx={{ color: 'primary' }}
        >
          <Icon glyph="email" size={36} />
        </A>
      </Box>
    </Styled.root>
  )
}
