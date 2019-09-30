/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { Component } from 'react'
import p5 from '../sketches/p5'
// import prettier from 'prettier/standalone'
// import parser from 'prettier/parser-flow'
import theme from '../gatsby-plugin-theme-ui'

export class SketchPreview extends Component {
  constructor(props) {
    super(props)
    this.sketchRef = React.createRef()
    this.canvas = null
  }

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.sketchRef.current)
  }

  componentDidUpdate() {
    this.canvas.remove()
    this.canvas = new p5(this.props.sketch, this.sketchRef.current)
  }

  componentWillUnmount() {
    this.canvas.remove()
  }

  render() {
    return <div ref={this.sketchRef} />
  }
}

export const SketchSource = props => (
  <pre
    sx={{
      ...theme.styles.pre,
      display: 'block',
      wordWrap: 'break-word',
      my: 3
    }}
    children={
      props.sketch
        .toString()
        .replace('function _default(p){', '')
        .replace(/;\}$/, '')
        .replace(
          /=function\(\)\{/g,
          ` = () => {
  `
        )
      // { parser: 'flow', plugins: [parser], semi: false, singleQuote: true }
    }
  />
)
