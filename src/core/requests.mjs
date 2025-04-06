import { error } from 'console'
import mysql from 'mysql2/promise'

// configuracion para acceder a la base de datos
const dbconfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Robot_System.47',
  database: 'simplex'
}
// ------------------------------------------------------------------------------------------
// --------------- template para consultas en la base de datos :P ---------------------------
//
// async function getRowsFromTable(table){ // <- funcion para consultar una tabla
//     const connection = await mysql.createConnection(dbconfig) // <- establecer conexion con la base de datos
//
//     try{
//         const [results] = await connection.query(
//             `select * from ??`, [table] // <- consulta
//         )
//         return results
//     }
//     catch{
//         console.error('error al consultar la tabla: ', error)
//     }
//     finally{
//         await connection.end() // <- cerrar la conexion al finalizar la consulta
//     }
// }
// ------------------------------------------------------------------------------------------

// • CONSULTA 1. Una consulta que muestre los clientes y la cantidad de pedidos realizados.
export async function consult1 () {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const [results] = await connection.query(
      `select 
        id_cliente, 
        concat(nombre, ' ', apellido) as nombre, 
        count(*) as pedidos_realizados 
      from compra 
      join cliente on id = id_cliente 
      group by id_cliente, nombre`
    )
    return results
  } catch {
    console.error('error al consultar la tabla: ', error)
  } finally {
    await connection.end()
  }
}

// • CONSULTA 2. Un listado de los clientes que no realizaron ningún pedido.
export async function consult2 () {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const [results] = await connection.query(
      `select * from cliente 
      where id_cliente not in (select id_cliente from compra)`
    )
    return results
  } catch {
    console.error('error al consultar la tabla: ', error)
  } finally {
    await connection.end()
  }
}

// • CONSULTA 3. Un listado que muestre el nombre del cliente, el nombre del producto,
// la cantidad comprada, el precio de compra y el nombre del proveedor que suministró el producto
export async function consult3 () {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const [results] = await connection.query(
      `select 
        concat(cl.nombre, ' ', cl.apellido) as nombre_cliente,
        pr.nombre as nombre_producto,
        cantidad,
        cantidad * pr.precio_unitario as precio_compra,
        pv.nombre as nombre_proveedor
      from compra cp
      join producto pr on pr.codigo = cp.codigo_producto
      join cliente cl on cl.id = cp.id_cliente
      join suministros sm on sm.codigo_producto = pr.codigo
      join proveedor pv on pv.nit = sm.nit_proveedor`
    )
    return results
  } catch {
    console.error('error al consultar la tabla: ', error)
  } finally {
    await connection.end()
  }
}

// • CONSULTA 4. Listado de los proveedores con los productos suministrados.
export async function consult4 () {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const [results] = await connection.query(
      `select
        pv.nit as nit_proveedor,
        pv.nombre as nombre_proveedor,
        pr.codigo as codigo_producto,
        pr.nombre as nombre_producto
      from suministros sm
      join proveedor pv on pv.nit = sm.nit_proveedor
      join producto pr on pr.codigo = sm.codigo_producto`
    )
    return results

  } catch {
    console.error('error al consultar la tabla: ', error)
  } finally {
    await connection.end()
  }
}

//* CONSULTA 5. Listado de los productos que no han sido comprados por ningún cliente.
export async function insertinto (table, data) {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const keys = Object.keys(data)
    const values = Object.values(data)

    const placeholders = keys.map(() => '?').join(', ') // reemplaza cada elemento con ? para evitar inyeccion
    const columns = keys.join(', ')

    const query = `INSERT INTO ?? (${columns}) VALUES (${placeholders})` // aqui le pasamos los placeholders para posteriormente insertar los values

    const [results] = await connection.query(query, [table, ...values])
    return results

  } catch {
    // console.error('error al insertar en la tabla: ', error)
    throw error
  } finally {
    await connection.end()
  }
}

export async function getTable(table) {
    const connection = await mysql.createConnection(dbconfig)
  
    try {
      const query = `SELECT * FROM ??`
      const [results] = await connection.query(query, [table])
  
      return results
    } catch {
      throw error
    } finally {
      await connection.end()
    }
  }