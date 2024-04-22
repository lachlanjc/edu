import title from 'title'
import { isEmpty, startCase } from 'lodash-es'
import COURSES from './courses.json'

export const getName = path => {
  if (path === '/courses') {
    return 'Courses'
  }
  if (path.startsWith('/courses/')) {
    const slug = path.split('/').at(-1)
    return `${COURSES[slug].name} course`
  }
  let name = startCase(
    path
      .replace('/', '')
      .replace(/(\d{4}-\d{2}-\d{2})_/, '')
      .replace(
        new RegExp(
          `^(${Object.keys(COURSES)
            .map(c => c.toLowerCase())
            .join('|')})_`,
        ),
        '',
      ),
  )
  name = title(name, {
    special: [
      // 'iPhone',
      // 'iPad',
      // 'MacBook',
      // 'iOS',
      // 'iPadOS',
      // 'macOS',
      // 'AirPods',
      // 'HomePod',
      'visionOS',
      'SwiftUI',
      'Plus',
      'DSLR',
      'MVP',
      'MDX',
      'UI',
      'COVID',
      'IRL',
      'CMS',
      'RSS',
      'AR',
      'VR',
      'XR',
      'WebXR',
    ],
  })
    .replaceAll(' and ', ' & ')
    .replaceAll(' Vs ', ' vs ')
    .replace(' Im ', ' I’m ')
    .replace(' Cant', ' Can’t')
    .replace('Theyre', 'They’re')
    .replace('on & Off', 'On & Off')
  return name
}

export const hasDate = path =>
  !isEmpty(path.toString().match(/\d{4}-\d{2}-\d{2}/))

export const getDate = path => {
  const match = path.match(/(\d{4}-\d{2}-\d{2})/)
  return match ? match[0] : ''
}

const dateFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}
export const formatDate = date =>
  new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date)

export const getDescription = path => {
  if (!path.startsWith('/20')) {
    return 'Lachlan Campbell’s coursework blog for their major at NYU, Interactive Media Arts.'
  }
  const name = getName(path.toString()).toString()
  const slug = path.split('_')[1]
  const course = COURSES[slug].name
  let date = ''
  if (hasDate(path)) {
    date = new Date(getDate(path))
    date = ` on ${formatDate(date, 'MMMM d, yyyy')}`
  }
  return `${
    course ? `Post for ${course} ` : 'Project '
  }at NYU${date}, by Lachlan Campbell.`
}

export const getImage = path => {
  const host = `https://${
    process.env.NEXT_PUBLIC_VERCEL_URL ?? 'edu.lachlanjc.com'
  }`
  if (path === '/') return `${host}/api/card`
  let theme = 'light'
  let name = getName(path.toString()).toString()
  let caption = path.toString().split('_')?.[1] ?? ''
  let params = ''
  name = name.split(' ').join(' ')
  Object.keys(COURSES).forEach(key => {
    name = name.replace(`${key} `, '')
    caption = caption.replace(key, COURSES[key].name)
  })
  if (name.includes('Midterm') || name.includes('Final')) theme = 'dark'
  if (hasDate(path)) {
    let date = new Date(getDate(path))
    date = formatDate(date, 'MM d, yyyy')
    caption += ` – ${date}`
  } else {
    caption = ''
    theme = 'dark'
    params = '&fontSize=275px'
  }
  name = encodeURIComponent(name)
  caption = encodeURIComponent(caption)
  return `${host}/api/card?title=${name}&theme=${theme}${params}&caption=${caption}`
}

export const formatSemester = semester =>
  semester.replace('f', 'Fall 20').replace('s', 'Spring 20')
