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
// • CONSULTA 1. Una consulta que muestre los clientes y la cantidad de pedidos realizados.
export async function consult1 () {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const [results] = await connection.query(
      `SELECT 
        cl.id_cliente, 
        CONCAT(cl.nombre, ' ', cl.apellidos) AS nombre_cliente, 
        COUNT(*) AS pedidos_realizados 
      FROM compra cp
      JOIN cliente cl ON cp.id_cliente = cl.id_cliente 
      GROUP BY cl.id_cliente, cl.nombre, cl.apellidos`
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
      `SELECT 
        CONCAT(cl.nombre, ' ', cl.apellidos) AS nombre_cliente,
        pr.nombre AS nombre_producto,
        cp.cantidad,
        cp.cantidad * pr.precio_unitario AS precio_compra,
        pv.nombre AS nombre_proveedor
      FROM compra cp
      JOIN producto pr ON pr.codigo = cp.codigo_producto
      JOIN cliente cl ON cl.id_cliente = cp.id_cliente
      JOIN proveedor pv ON pv.nit = pr.nit_proveedor`
    )
    return results
  } catch (error) {
    console.error('Error al consultar la tabla: ', error)
  } finally {
    await connection.end()
  }
}


// • CONSULTA 4. Listado de los proveedores con los productos suministrados.
export async function consult4 () {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const [results] = await connection.query(
      `SELECT
        pv.nit AS nit_proveedor,
        pv.nombre AS nombre_proveedor,
        pr.codigo AS codigo_producto,
        pr.nombre AS nombre_producto
        FROM Proveedor pv
        JOIN Producto pr on pr.nit_proveedor = pv.nit`
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

export async function searchOnDB(table, PK, PKValue) {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const query = `SELECT * FROM ?? WHERE ?? = ?`
    const [results] = await connection.query(query, [table, PK, PKValue])

    return results
  } catch (error) {
    console.error('❌ Error a nivel de backend ', error)
    throw error
  } finally {
    await connection.end()
  }
}

export async function updateTable(table, column, newColumnValue, primaryKey, PKValue) {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const query = `UPDATE ?? SET ?? = ? WHERE ?? = ?`
    const [results] = await connection.query(query, [table, column, newColumnValue, primaryKey, PKValue])

    return results
  } catch (error) {
    console.error('❌ Error a nivel de backend ', error)
    throw error
  } finally {
    await connection.end()
  }
}

export async function deleteFromTable(table, PK, PKValue) {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const query = `DELETE FROM ?? WHERE ?? = ?`
    const [results] = await connection.query(query, [table, PK, PKValue])

    return results
  } catch (error) {
    console.error('❌ Error a nivel de backend ', error)
    throw error
  } finally {
    await connection.end()
  }
}

// • CONSULTA GRAFICA. Listado de los proveedores con los productos suministrados.
export async function consultGrap() {
  const connection = await mysql.createConnection(dbconfig)

  try {
    const [results] = await connection.query(
      `select p.nombre, sum(cantidad) as compras 
        from compra 
        join producto p on p.codigo = codigo_producto
        group by codigo_producto
        order by compras desc`
    )
    return results

  } catch {
    console.error('error al consultar la tabla: ', error)
  } finally {
    await connection.end()
  }
}