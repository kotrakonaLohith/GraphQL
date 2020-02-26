import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import db from './db';
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import User from './resolvers/User'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers:{
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context:{
        db
    }
})

server.start(() => {
    console.log('The server is up!')
})