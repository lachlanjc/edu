import { allSheets } from 'contentlayer/generated'
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'
import { orderBy } from 'lodash-es'
// import COURSES from '../../lib/courses.json'

/*
  CLEAN MDX FILES
  adapted from https://blog.maximeheckel.com/posts/building-magical-ai-powered-semantic-search/
*/
// Remove JSX syntax from a string
function removeJSX(str) {
  const regex = /<[^>]+>/g
  return str.replace(regex, '')
}

// Extract the link text from a markdown link
function extractLink(text) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  return text.replace(regex, (match, p1, p2) => p1)
}

// Replace newline characters with spaces within a string
function replaceNewlineWithSpace(str) {
  return str.replace(/\n/g, ' ')
}

function cleanMDXFile(mdxContent) {
  const lines = mdxContent.split('\n')
  let currentContent = ''
  let inCodeBlock = false

  for (let line of lines) {
    // Toggle the inCodeBlock flag when encountering code blocks
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      line = ''
    }

    if (!inCodeBlock) {
      // Remove ! from image alt text
      if (line.startsWith('![')) {
        line = line.replace('!', '')
      }
      // Extract the link text from the line, remove any JSX syntax, and append it to the current section content
      const processed = extractLink(removeJSX(line))
      currentContent += `${processed}\n`
    } else {
      // Append the line to the current section content when inside a code block
      // currentContent += `${line}\n`
    }

    // Replace newline characters with spaces in the current section content
    currentContent = replaceNewlineWithSpace(currentContent)
  }

  return currentContent
}

async function getPosts() {
  return orderBy(
    allSheets,
    ['date', 'course', 'name'],
    ['desc', 'course', 'desc'],
  ).map(sheet => {
    return {
      slug: sheet.slug,
      name: sheet.name,
      date: sheet.date,
      course: sheet.course,
      // courseName: COURSES[sheet.course],
      content: cleanMDXFile(sheet.body.raw),
    }
  })
}

export default async function handler(req, res) {
  const posts = await getPosts()
  console.log(posts)
  const client = new ChromaClient()
  console.log(await client.heartbeat())

  // special class which will be passed to client and automatically create embeddings
  const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: process.env.OPENAI_API_KEY,
  })

  const COLLECTION_NAME = 'edu'

  // delete collections to remove stale records and rebuild with up to date data.
  await client.deleteCollection({ name: COLLECTION_NAME })

  // create a collection
  // note that we pass embedder that will automtically create embeddings
  // with OpenAI Embeddings API
  const collection = await client.createCollection({
    name: COLLECTION_NAME,
    embeddingFunction: embedder,
  })

  // feed data into new collection
  // note that we don't pass embeddings, however they will be created behind the scenes
  await collection.add({
    ids: posts.map(i => i.slug),
    metadatas: posts.map(({ name, course, date }) => ({
      name,
      course,
      // courseName,
      date,
    })),
    documents: posts.map(i => i.content),
  })

  res.status(200).json({ message: `Indexing ${posts.length} posts completed` })
}
