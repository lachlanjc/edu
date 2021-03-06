import React from 'react'
import { Box } from 'axs'
import { Heading } from 'axs-ui'
import { colors } from '../config'
import { UL, LI, B, G } from './More'

const WaitTemp = () => (
  <Box
    p={[2, 3]}
    mx="auto"
    css={{
      backgroundColor: colors.snow,
      border: `1px solid ${colors.smoke}`,
      borderRadius: 8,
      '@media screen and (min-width: 40em)': {
        maxWidth: 32 * 16,
        transform: 'rotate(2deg)',
        marginTop: '-12rem',
        marginRight: 0
      }
    }}
  >
    <Heading
      level={3}
      color={colors.pink}
      mt0
      mb2
      css={{
        fontWeight: 300,
        fontStyle: 'italic'
      }}
    >
      Wait, 2 ºF difference?
    </Heading>
    <UL>
      <LI mb1>
        1º is the difference between <B>ice</B> & <B>water</B>
      </LI>
      <LI>
        Temperature rose <B>7-12 ºF over ~5,000 years</B> when the ice&nbsp;age
        ended
      </LI>
      <LI>
        We’re now seeing a <B>2+ ºF rise in 2% of the time</B>{' '}
        <G>(130&nbsp;years)</G>, when the climate should be cooling
      </LI>
    </UL>
  </Box>
)
export default WaitTemp
