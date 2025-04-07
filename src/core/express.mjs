import express from 'express'
import cors from 'cors'
import { consult1, insertinto, getTable, searchOnDB, updateTable, deleteFromTable, consult2, consult3, consult4, consultGrap } from './requests.mjs'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

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

app.post('/searchOnDB', async (req, res) => {
  const { table, PK, PKValue } = req.body

  try {
    const result = await searchOnDB(table, PK, PKValue)
    res.status(200).json( result )
  } catch (error) {
    console.log('❌ No se encontro este registro', error)
    res.status(400).json({error: 'error al buscar registro', error})
  }
})

app.post('/updateTable', async (req, res) => {
  const { table, column, newColumnValue, primaryKey, PKValue } = req.body

  try {
    const result = await updateTable(table, column, newColumnValue, primaryKey, PKValue)
    res.status(200).json({ message: 'Actualizado correctamente: ', result })
  } catch (error) {
    console.log('❌ Error a nivel de servidor: ', error)
    res.status(400).json({error: 'error al insertar los datos', error})
  }
})

app.post('/deleteFromTable', async (req, res) => {
  const { table, PK, PKValue } = req.body

  try {
    if (table == 'cliente') {
      await deleteFromTable('compra', 'id_cliente', PKValue)
    }

    const result = await deleteFromTable(table, PK, PKValue)
    res.status(200).json({ message: 'Fila eliminada correctamente: ', result })
  } catch (error) {
    console.log('❌ Error a nivel de servidor: ', error)
    res.status(400).json({error: 'error al insertar los datos', error})
  }
})

app.get('/op2', async (req, res) => {
  try {
    const results = await consult2()
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: 'error al obtener los datos' })
  }
})

app.get('/op3', async (req, res) => {
  try {
    const results = await consult3()
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: 'error al obtener los datos' })
  }
})

app.get('/op4', async (req, res) => {
  try {
    const results = await consult4()
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: 'error al obtener los datos' })
  }
})

app.get('/op12', async (req, res) => {
  try {
    const results = await consultGrap()
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: 'error al obtener los datos' })
  }
})