import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BaseStyles, Box, Card, Input } from 'theme-ui'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '../lib/components'

import ReactFlow, {
  Controls,
  Background,
  Panel,
  Position,
  NodeResizer,
  NodeToolbar,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { ColorSwitcher } from 'components/layout'
import Icon from 'components/icon'
import Link from 'next/link'

function Sheet({ id, data, style }) {
  const Content = useMDXComponent(data.text)
  console.log(data)

  return (
    <Card
      id={id}
      style={style}
      sx={{
        bg: 'elevated',
        border: '1px solid',
        borderColor: 'sunken',
        boxShadow:
          '0px 1px 1px rgba(0,0,0,.02),0px 4px 8px -4px rgba(0,0,0,.04),0px 16px 24px -8px rgba(0,0,0,.06)',
        borderRadius: 'extra',
        py: 2,
        px: 4,
        transition: 'all 0.2s ease-in-out',
        overflowY: 'auto',
        '&:hover': { cursor: 'grab' },
        '&:active': { cursor: 'grabbing', boxShadow: 'md' },
        width: 640,
        height: 512,
      }}
    >
      <BaseStyles>
        <Content components={components} />
      </BaseStyles>
      <NodeToolbar position={Position.Top} offset={2}>
        <Link href={`/${id}`}>
          <Icon glyph="external" sx={{ color: 'primary' }} />
        </Link>
      </NodeToolbar>
    </Card>
  )
}

const nodeTypes = { sheet: Sheet }

function positionSheets(sheets) {
  const width = window.innerWidth * 0.8
  const height = window.innerHeight * 0.8
  const nodes = sheets.reverse().map(sheet => ({
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
  const [nodes, setNodes, onNodesChange] = useNodesState([])

  useEffect(() => {
    if (router.query.q) {
      setQ(router.query.q)
      searchSheets(router.query.q, setNodes)
    }
  }, [router])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        elevateNodesOnSelect
        nodesFocusable={false}
        nodesConnectable={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
      >
        <Controls showInteractive={false} />
        <Background variant="dots" gap={12} size={1} />
        <Panel position="top-right">
          <ColorSwitcher />
        </Panel>
        <Panel
          position="top-center"
          style={{ margin: 0, color: 'var(--theme-ui-colors-background)' }}
        >
          <Box
            sx={{
              pointerEvents: 'none',
              width: '75vw',
              height: 'min(20vh, 200px)',
              color:
                'rgb(from var(--theme-ui-colors-background) r g b / 92.5%);',
              backgroundImage:
                'radial-gradient(ellipse at top, currentColor, currentColor 50%, transparent 70%)',
              transition: 'color 0.25s ease',
              '&:has(+ form input:focus)': {
                color:
                  'color-mix(in srgb, var(--theme-ui-colors-primary), rgb(255 255 255 / 0.925) 85%)',
              },
            }}
          />
          <form
            onSubmit={e => {
              e.preventDefault()
              if (q.trim().length === 0) {
                router.replace('/canvas')
                setNodes([])
              } else {
                router.replace('/canvas?q=' + encodeURIComponent(q))
                searchSheets(q, setNodes)
              }
            }}
            style={{
              position: 'absolute',
              left: '50%',
              translate: '-50% -100%',
            }}
          >
            <Input
              type="search"
              placeholder="Search"
              onChange={e => setQ(e.currentTarget.value)}
              value={q}
              autoFocus
              sx={{
                boxShadow:
                  '0px 1px 1px rgba(0,0,0,.02),0px 8px 16px -4px rgba(0,0,0,.04),0px 24px 32px -8px rgba(0,0,0,.06)',
                width: 'min(90vw, 360px)',
                fontSize: 3,
                fontFamily: 'heading',
                bg: 'elevated',
                color: 'text',
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
