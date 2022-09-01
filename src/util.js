import { isEmpty, startCase } from 'lodash'
import { format } from 'date-fns'

export const getName = path =>
  startCase(
    path
      .replace(/(\d{4}-\d{2}-\d{2})/, '')
      .replace('-', ' ')
      .replace('/', '')
  )
    .replace('To', 'to')
    .replace('Via', 'via')
    .replace('Dslr', 'DSLR')
    .replace('And', '&')
    .replace('Ar ', 'AR ')
    .replace('Post ', 'Post-')
    .replace(/^Cc/, 'CC')
    .replace(/^Cl/, 'CL')
    .replace(/^Obj/, 'OBJ')
    .replace(/^Wte/, 'WTE')
    .replace(/^Bit/, 'BIT')
    .replace(/^Cw/, 'CW')
    .replace(/^Ast/, 'AST')
    .replace(/^Pcomp/, 'PComp')

export const hasDate = path =>
  !isEmpty(path.toString().match(/\d{4}-\d{2}-\d{2}/))

export const getDate = path => {
  const match = path.match(/(\d{4}-\d{2}-\d{2})/)
  return match ? match[0] : ''
}

const courses = {
  CC: 'Creative Comp',
  CL: 'Comm Lab',
  WTE: 'Writing the Essay',
  OBJ: 'Objectivity',
  BIT: 'Big Ideas in Tech',
  DV: 'Data Viz',
  CW: 'Creative Writing',
  AST: 'Assistive Tech',
  PCOMP: 'Physical Computing',
}

export const getDescription = path => {
  if (path === '/') {
    return 'Lachlan Campbell’s coursework blog for their major at NYU, Interactive Media Arts.'
  }
  const name = getName(path.toString()).toString()
  const course = courses[name.split(' ')[0]]
  let date = ''
  if (hasDate(path)) {
    date = new Date(getDate(path))
    date = ` on ${format(date, 'MMMM d, yyyy')}`
  }
  return `${
    course ? `Blog post for ${course} ` : 'Project '
  }at NYU${date}, by Lachlan Campbell.`
}

export const getImage = path => {
  if (path === '/') return 'https://ima-cards.lachlanjc.now.sh/Coursework.png'
  let theme = 'light'
  let name = getName(path.toString()).toString()
  let caption = name.split(' ')[0]
  let params = ''
  name = name.split(' ').join(' ')
  Object.keys(courses).forEach(key => {
    name = name.replace(`${key} `, '')
    caption = caption.replace(key, courses[key])
  })
  if (name.includes('Midterm') || name.includes('Final')) theme = 'dark'
  if (hasDate(path)) {
    let date = new Date(getDate(path))
    date = format(date, 'MMM d, yyyy')
    caption += ` – ${date}`
  } else {
    caption = ''
    theme = 'dark'
    params = '&fontSize=275px'
  }
  name = encodeURIComponent(name)
  caption = encodeURIComponent(caption)
  return `https://ima-cards.lachlanjc.now.sh/${name}.png?theme=${theme}${params}&caption=${caption}`
}
