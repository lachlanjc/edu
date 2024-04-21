import { Flex, Text } from 'theme-ui'
import Icon from './icon'

const TEXTS = ['Do not recommend', 'Recommend', 'Highly recommend']

const ICONS = ['thumbsdown', 'thumbsup', 'sticker']
const COLORS = ['secondary', 'secondary', 'primary']

export default function Rating({ val = 1, size = 24, sx }) {
  return (
    <Icon
      glyph={ICONS[val]}
      size={size}
      sx={{ color: COLORS[val], ...sx }}
      aria-role="img"
      aria-label={TEXTS[val]}
    />
  )
}

export function RatingWithDetails({ val = 1, size = 24, sx }) {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        gap: 2,
        bg: 'sunken',
        pl: 2,
        pr: 3,
        py: 1,
        borderRadius: 'base',
        width: 'fit-content',
        ...sx,
      }}
    >
      <Icon glyph={ICONS[val]} size={size} sx={{ color: COLORS[val] }} />
      <Text sx={{ color: COLORS[val] }}>{TEXTS[val]}</Text>
    </Flex>
  )
}
