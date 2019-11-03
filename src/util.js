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

export const hasDate = path => !isEmpty(path.match(/\d{4}-\d{2}-\d{2}/))

export const getDate = path => path.match(/(\d{4}-\d{2}-\d{2})/)[0]

