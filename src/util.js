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
    .replace(/^Cc/, 'CC')
    .replace(/^Cl/, 'CL')
    .replace('Wte', 'WTE')

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
  OBJ: 'Objectivity'
}

export const getDescription = path => {
  if (path === '/') {
    return 'Lachlan Campbell’s coursework blog for their major, Interactive Media Arts, at NYU.'
  }
  const name = getName(path.toString()).toString()
  const course = courses[name.split(' ')[0]]
  let date = ''
  if (hasDate(path)) {
    date = new Date(getDate(path))
    date = ` on ${format(date, 'MMMM d, yyyy')}`
  }
  return `Post for ${course} at NYU${date}, by Lachlan Campbell.`
}

export const getImage = path => {
  if (path === '/') return 'https://ima-cards.lachlanjc.now.sh/Coursework.png'
  let theme = 'light'
  let name = getName(path.toString()).toString()
  let caption = name.split(' ')[0]
  let tail = ''
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
    tail = '&fontSize=300px'
  }
  console.log(path, name, caption)
  name = encodeURIComponent(name)
  caption = encodeURIComponent(caption)
  return `https://ima-cards.lachlanjc.now.sh/${name}.png?caption=${caption}&theme=${theme}${tail}`
}
