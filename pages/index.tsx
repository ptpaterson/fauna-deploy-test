import { useEffect, useState } from 'react'
import faunadb from 'faunadb'

const q = faunadb.query

const secret = process.env.NEXT_PUBLIC_FAUNA_KEY
if (!secret) {
  throw new Error('env not defined')
}

const client = new faunadb.Client({ secret })

export default function Home() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client
      .query<any>(
        q.Map(q.Paginate(q.Documents(q.Collection('products'))), (ref) =>
          q.Get(ref)
        )
      )
      .then((res) => setData(res.data))
  }, [])

  if (!data) return 'loading...'

  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}
