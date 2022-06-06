const express = require('express');
const cors = require('cors')
const itemsRouter = require("./routes/items")
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser')
const PORT = 4000;



const options = {
     definition: {
          openapi: '3.0.0',
          info: {
               title: "Building shop API",
               version: "1.0.0",
               description: "A simple Express API"
          },
          servers: [
               {
                    url: "https://localhost:4000"
               },
          ],
     },
     apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options)

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))


app.use("/items", itemsRouter)

app.listen(
     PORT,
     () => console.log(`Listening on http://localhost:${PORT}`)
);



