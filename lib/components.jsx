/** @jsxImportSource theme-ui */
import { Button, Themed } from 'theme-ui'
import Prism from '@theme-ui/prism'
import Link from 'next/link'
import { kebabCase } from 'lodash-es'
import YouTube from 'react-lite-youtube-embed'

const headingLink = {
  color: 'inherit',
  textDecoration: 'none',
}

const Code = ({ children, filename, ...props }) => {
  if (typeof children === 'string' && !children.includes('\n')) {
    return <code>{children}</code>
  }
  return <Prism children={children} {...props} />
}
Code.defaultProps = { className: '' }

export default {
  pre: ({ children }) => <>{children}</>,
  code: Code,
  h2: props => (
    <Themed.h2 id={kebabCase(props.children)} {...props}>
      <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
        {props.children}
      </a>
    </Themed.h2>
  ),
  h3: props => (
    <Themed.h3 id={kebabCase(props.children)} {...props}>
      <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
        {props.children}
      </a>
    </Themed.h3>
  ),
  a: ({ href, ...props }) =>
    href.startsWith('/') ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} {...props} />
    ),
  Button,
  YouTube,
}
