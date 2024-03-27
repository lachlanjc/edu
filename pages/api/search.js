import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb'

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
  const results = await collection.query({
    nResults: 5,
    queryTexts: query,
  })

  const records = (results.ids[0] ?? []).map((id, i) => {
    const metadata = results.metadatas[0][i]
    return {
      slug: id,
      ...metadata,
    }
  })

  return res.json(records)
}
