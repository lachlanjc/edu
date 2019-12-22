import React from 'react'
import { Avatar } from '@theme-ui/components'

export default ({ size = 32, ...props }) => (
  <Avatar
    {...props}
    src="https://cdn.glitch.com/4d99d0f7-c364-44a5-b1b9-2c3c3f5cb333%2FIMG_2040-2.jpeg?v=1565688136581"
    alt="Lachlan’s avatar"
    width={size}
    height={size}
    sx={{ mr: 3, ...props.sx }}
  />
)
