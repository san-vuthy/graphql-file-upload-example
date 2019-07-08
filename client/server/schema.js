const graphql = require("graphql");
const fs = require('fs');
const path = require('path');
const { GraphQLUpload } = require('graphql-upload');
const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean, GraphQLString } = graphql;

const FileType = new GraphQLObjectType({
    name: "File",
    fields: ()=>({
        name: { type: GraphQLString }
    })
});

const HelloType = new GraphQLObjectType({
    name: "Hello",
    fields: ()=>({
        name: { type: GraphQLString }
    })
})
const Query = new GraphQLObjectType({
    name: "Query",
    fields:()=>( {
        hi: {
            type: HelloType,
            resolve: ()=> ("Hi")
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: ()=>({
      upload_image: {
        description: "Uploads an image.",
        type: FileType,
        args: {
          file: {
            description: "Image file.",
            type: GraphQLUpload
          }
        },
        resolve: async (root, { file }) => {
          const { filename, mimetype, createReadStream } = await file;
          const stream = createReadStream();
  
          // Promisify the stream and store the file, then…
          const img_dir = path.join(__dirname, "./public/images");
          const writeStream = fs.createWriteStream(`${img_dir}/${filename}`, {
            flags: "w"
          });
          stream.pipe(writeStream);
          writeStream.on("close", function() {
            console.log("All done!");
          });
          console.log(filename);
          return { name: `${filename}` };
        }
      },
    })
})
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})
module.exports = schema