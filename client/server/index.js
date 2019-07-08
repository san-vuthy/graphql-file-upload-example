const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser =  require('body-parser');
const GraphQLHTTP = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const schema = require("./schema")

const app = express();

app.use(cors("*"));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")))

app.use(
    "/api", 
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    GraphQLHTTP({
        schema: schema,
        graphiql: true
    }
))

app.listen(4000)

