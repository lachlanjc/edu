/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { Link } from 'gatsby'
import { Box, Link as A } from 'rebass'
import Avatar from './components/avatar'
import Icon from './components/icon'
import theme from './gatsby-plugin-theme-ui'

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
  const home = props.location.pathname === '/'
  const dev = props.location.hostname === 'lachlanjc-ima.glitch.me'

  return (
    <Styled.root
      sx={{
        p: 3,
        fontSize: 1,
        maxWidth: home ? 'xl' : 'container',
        mx: 'auto'
      }}
    >
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
      {!dev &&
        <p variant="container" sx={{ display: 'flex', alignItems: 'center', color: 'secondary', my: 0 }}>
          <Icon glyph="view" sx={{ mr: 2 }} />
          Page views:
          <img
            src={`https://lachlanjc-analytics.glitch.me/counter.png?fallback=ima.lachlanjc.me&color=%23${theme.colors.secondary.replace('#', '')}`}
            alt="View counter"
            style={{ verticalAlign: 'bottom' }}
          />
        </p>
      }
      {props.children}
      <Box
        sx={{
          py: 3,
          display: 'grid',
          gridGap: [2, 3],
          gridTemplateColumns: 'auto repeat(3, 36px)',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <A
          href="https://lachlanjc.me"
          title="Personal site"
          target="_blank"
          variant="styles.navitem"
          sx={{ color: 'primary', lineHeight: 0 }}
        >
          <Avatar />
        </A>
        <A
          href="https://twitter.com/lachlanjc"
          title="Twitter"
          target="_blank"
          variant="styles.navitem"
          sx={{ color: 'primary' }}
        >
          <Icon glyph="twitter" size={36} />
        </A>
        <A
          href="https://github.com/lachlanjc/ima"
          title="GitHub"
          target="_blank"
          variant="styles.navitem"
          sx={{ color: 'primary' }}
        >
          <Icon glyph="github" size={36} />
        </A>
        <A
          href="mailto:ljc451@nyu.edu"
          title="Email"
          variant="styles.navitem"
          sx={{ color: 'primary' }}
        >
          <Icon glyph="email-fill" size={36} />
        </A>
      </Box>
    </Styled.root>
  )
}
