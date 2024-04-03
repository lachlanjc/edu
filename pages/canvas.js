import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { BaseStyles, Card, Input } from 'theme-ui'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../lib/components'

import ReactFlow, { Controls, Background, Panel } from 'reactflow'
import 'reactflow/dist/style.css'
import { ColorSwitcher } from 'components/layout'

function Sheet({ id, data, style }) {
  const Content = useMDXComponent(data.text)

  return (
    <Card
      id={id}
      style={style}
      sx={{
        bg: 'elevated',
        border: '1px solid',
        borderColor: 'sunken',
        boxShadow:
          // '0px 2px 2px rgba(0,0,0,.04),0px 8px 16px -4px rgba(0,0,0,.04)',
          // '0px 1px 1px rgba(0,0,0,.02),0px 4px 8px rgba(0,0,0,.04)',
          '0px 1px 1px rgba(0,0,0,.02),0px 4px 8px -4px rgba(0,0,0,.04),0px 16px 24px -8px rgba(0,0,0,.06)',
        borderRadius: 'base',
        py: 2,
        px: 4,
        maxWidth: 512,
        maxHeight: 512,
        transition: 'all 0.2s ease-in-out',
        overflowY: 'auto',
        '&:hover': { cursor: 'grab' },
        '&:active': { cursor: 'grabbing', boxShadow: 'md' },
      }}
    >
      <BaseStyles>
        <Content components={components} />
      </BaseStyles>
    </Card>
  )
}

const nodeTypes = { sheet: Sheet }

function positionSheets(sheets) {
  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.8
  const nodes = sheets.map(sheet => ({
    id: sheet.slug,
    type: 'sheet',
    data: { text: sheet.source },
    position: {
      x: sheet.fitting[0] * width,
      y: sheet.fitting[1] * height,
    },
  }))
  console.log(nodes)
  return nodes
}

function searchSheets(q, setSheets) {
  fetch(`/api/search-canvas?q=${q}`)
    .then(res => res.json())
    .then(data => setSheets(positionSheets(data)))
}

export default function Page() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [sheets, setSheets] = useState([])

  useEffect(() => {
    if (router.query.q) {
      setQ(router.query.q)
      searchSheets(router.query.q, setSheets)
    }
  }, [router])

  // const content = {
  //   edges: [],
  //   initialNodes: allSheets.map(sheet => ({
  //     id: sheet.slug,
  //     type: 'text',
  //     data: { text: sheet.body.raw },
  //     position: { x: getRandomBetween(0, 1024), y: getRandomBetween(0, 768) },
  //     dimensions: { width: 320, height: 256 },
  //   })),
  // }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={sheets} edges={[]} nodeTypes={nodeTypes}>
        <Controls showInteractive={false} />
        {/* <MiniMap /> */}
        <Background variant="dots" gap={12} size={1} />
        <Panel position="top-right">
          <ColorSwitcher />
        </Panel>
        <Panel position="top-center">
          <form
            onSubmit={e => {
              e.preventDefault()
              if (q.trim().length === 0) {
                router.replace('/canvas')
                setSheets([])
              } else {
                router.replace('/canvas?q=' + encodeURIComponent(q))
                searchSheets(q, setSheets)
              }
            }}
          >
            <Input
              type="search"
              placeholder="Search"
              onChange={e => setQ(e.currentTarget.value)}
              value={q}
              sx={{
                mt: '10vh',
                boxShadow:
                  '0 0 0 1px rgba(0,0,0,.08),0px 1px 1px rgba(0,0,0,.02),0px 8px 16px -4px rgba(0,0,0,.04),0px 24px 32px -8px rgba(0,0,0,.06)',
                width: 'min(90vw, 360px)',
                fontSize: 3,
                fontFamily: 'heading',
                bg: 'elevated',
                borderColor: 'sunken',
                borderRadius: 'extra',
                px: 3,
                ':focus': { borderColor: 'primary', outline: 'none' },
              }}
            />
          </form>
        </Panel>
      </ReactFlow>
    </div>
  )
}
