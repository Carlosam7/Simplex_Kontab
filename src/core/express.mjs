import express from 'express'
import cors from 'cors'
import { consult1, insertinto, getTable } from './requests.mjs'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors()) // ← permite que tu frontend acceda
app.use(express.json()) // ← permite leer JSON del body

app.get('/', (req, res) => {
  res.send('Hola esteban')
})

app.get('/op1', async (req, res) => {
  try {
    const results = await consult1()
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: 'error al obtener los datos' })
  }
})

app.post('/insert', async (req, res) => {
  const { table, data } = req.body

  try {
    const result = await insertinto(table, data)

    res.status(201).json({ message: 'Insertado correctamente: ', result })
  } catch (err) {
    res.status(400).json({error: 'error al insertar los datos', err})
  }
})

app.listen(PORT, () => {
  console.log(`server listeninig on port http://localhost:${PORT}`)
})

app.post('/getTable', async (req, res) => {
    const { table } = req.body
  
    try {
      const result = await getTable(table)
      res.status(200).json({ message: 'tabla obtenida con exito: ', result})
    } catch (err) {
      res.status(500).json({error: 'error', err})
    }
})