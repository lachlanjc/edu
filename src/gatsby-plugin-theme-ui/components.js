/** @jsx jsx */
 import { jsx } from 'theme-ui'
 import React from 'react'
 import Prism from '@theme-ui/prism'
 import { kebabCase } from 'lodash'

 const wavy = {
   textDecoration: 'underline',
   textUnderlinePosition: 'under',
   WebkitTextUnderlinePosition: 'under',
   textDecorationStyle: 'wavy',
   WebkitTextDecorationStyle: 'wavy'
 }
 const headingLink = {
   color: 'inherit',
   textDecoration: 'none',
   ':hover, :focus': wavy
 }

 export default {
   pre: props => props.children,
   code: Prism,
   h2: props => (
     <h2 {...props}>
       <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
         {props.children}
       </a>
     </h2>
   ),
   h3: props => (
     <h3 {...props}>
       <a href={`#${kebabCase(props.children)}`} sx={headingLink}>
         {props.children}
       </a>
     </h3>
   ),
   a: props => <a {...props} sx={{ ...wavy, ...props.sx }} />,
   // Button: props => <a {...props} target="_blank" sx={{
   //    fontFamily: 'inherit',
   //    fontSize: 1,
   //    fontWeight: 'bold',
   //    m: 0,
   //    px: 2,
   //    py: 2,
   //    color: 'text',
   //    bg: 'primary',
   //    border: 0,
   //    borderRadius: 6,
   //    ':focus': {
   //      outline: '2px solid',
   //    },
   //   }} />
 }
