import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'
import { allSheets } from 'contentlayer/generated'
import { UMAP } from 'umap-js'

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function normalize(arrayOfNumbers) {
  // find max and min in the array
  let max = [0, 0]
  let min = [0, 0]
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    for (let j = 0; j < 2; j++) {
      if (arrayOfNumbers[i][j] > max[j]) {
        max[j] = arrayOfNumbers[i][j]
      }
      if (arrayOfNumbers[i][j] < min[j]) {
        min[j] = arrayOfNumbers[i][j]
      }
    }
  }
  // normalize
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    for (let j = 0; j < 2; j++) {
      arrayOfNumbers[i][j] = (arrayOfNumbers[i][j] - min[j]) / (max[j] - min[j])
    }
  }
  return arrayOfNumbers
}

export default async function handler(req, res) {
  const query = req.query.q

  const client = new ChromaClient()
  const COLLECTION_NAME = 'edu'

  // initialize embedder to create embeddings from user query
  const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: process.env.OPENAI_API_KEY ?? '',
  })

  // note that instead of `createCollection` we use `getCollection`
  const collection = await client.getCollection({
    name: COLLECTION_NAME,
    embeddingFunction: embedder,
  })

  // through an error if query param is not defined
  if (!query) {
    return res
      .statusCode(403)
      .json({ error: 'Please provide search query phrase' })
  }

  // don'send empty reponse if query is less than 3 chars
  if (query.length < 3) {
    return new Response()
  }

  // query items in ChromaDB with give query phrase
  const items = await collection.query({
    nResults: 8,
    queryTexts: query,
    include: ['embeddings', 'metadatas'],
  })

  const records = (items.ids[0] ?? []).map((id, i) => {
    const metadata = items.metadatas[0][i]
    // const embeddings = items.embeddings[0][i]
    return {
      slug: id,
      distance: items[i],
      ...metadata,
      // embeddings,
      source: allSheets.find(sheet => sheet.slug === id).body.code,
    }
  })

  console.log(`records: ${records.length}`)

  // const embeddings = []
  const umap = new UMAP({
    nNeighbors: 2,
    minDist: 50,
    spread: 5,
    nComponents: 2, // dimensions
    // random: () => 0.5, // library seeded random so it is the same random numbers every time
    //distanceFn: 'cosine',
  })
  let fittings = umap.fit(items.embeddings[0])
  fittings = normalize(fittings) //normalize to 0-1

  const results = records.map((record, i) => ({
    ...record,
    fitting: fittings[i],
  }))

  return res.json(results)
}
