import React from 'react'

const colors = {
  black: '#1f2d3d',
  steel: '#273444',
  slate: '#3c4858',
  muted: '#8492a6',
  smoke: '#e0e6ed',
  snow: '#f9fafc',
  white: '#ffffff',
  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',
  violet: '#8067C3'
}
 
export default (p) => {
  p.setup = () => {
    p.createCanvas(512, 192)
  }
  
  p.draw = () => {
    p.background(245)
    p.noStroke()
    p.textFont('AvenirNext-Medium')
    p.fill(colors.red)
    p.rect(0, 0, 128, 16)
    p.fill(colors.orange)
    p.rect(0, 16, 128, 16)
    p.fill(colors.yellow)
    p.rect(0, 32, 128, 16)
    p.fill(colors.green)
    p.rect(0, 48, 128, 16)
    p.fill(colors.blue)
    p.rect(0, 64, 128, 16)
    p.fill(colors.violet)
    p.rect(0, 80, 128, 16)
    p.fill(colors.black)
    p.rect(128, 0, 96, 96)
    p.fill(colors.white)
    p.textSize(52)
    p.rotate(120)
    p.text('NB', 128 + 8, -40)
    p.rotate(-120)
    p.fill(colors.cyan)
    p.text('Lachlan', 256, 84)
    p.text('Campbell', 256, 142)
    p.fill(colors.blue)
    p.circle(64, 144, 96, 96)
    p.fill(colors.white)
    p.text('D', 46, 164)
    p.fill(colors.red)
    p.circle(175, 144, 96, 96)
    p.fill(colors.white)
    p.textSize(24)
    p.text('HACK', 140, 140)
    p.text('CLUB', 140, 165)
    // p.fill('#1f5927')
  }
}
