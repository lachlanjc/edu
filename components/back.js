import Link from 'next/link'
import { Flex } from 'theme-ui'
import Icon from 'components/icon'

const BackButton = ({ icon = 'back', text = 'Back', href = '/' }) => (
  <Link href={href} passHref legacyBehavior>
    <Flex
      as="a"
      sx={{
        alignItems: 'center',
        gap: 1,
        fontFamily: 'sans',
        color: 'primary',
        textDecoration: 'none',
        fontSize: 2,
        '& + h1, & + div > h1:first-child': {
          mt: 2,
          mb: 4,
        },
      }}
    >
      <Icon glyph={icon} aria-hidden />
      {text}
    </Flex>
  </Link>
)

export default BackButton
