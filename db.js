const express = require("express");

const app = express();
const getDB = require("./dbGet");
const port = 3000;
//Home

//Home
// Obtenemos todos los items
app.get("/api/items", async (req, res) => {
  let connection;
  try {
    // Conseguimos una conexión con la base de datos
    connection = await getDB();

    // El primer elemento del array que nos devuelve es el resultado de nuestra query
    const [resp] = await connection.query(`SELECT * FROM users`);

    //Enviamos la respuesta en un objeto
    res.send({ status: "ok", data: resp });
  } catch (err) {
    // Si sucede algún error lo mostramos en consola
    console.error(err);
  } finally {
    // Siempre liberamos la conexión tanto si la consulta es satisfactoria o si hubo un error
    if (connection) connection.release();
  }
});

// Página no encontrada - 404 page
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not Found");
});

// Página de error en el servidor - 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; ` +
      `press Ctrl-C to terminate.`
  )
);
