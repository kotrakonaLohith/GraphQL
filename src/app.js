import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '2'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]

const comments = [{
  id: '122',
  text:'This is my first text',
  author:'1',
  post:'asdshasghd62378324'
}, {
  id: '113',
  text:'Hey you are awesome',
  author:'1',
  post:'234sfsdfsdf32342342'
}, {
  id: '125',
  text:'you want some come get some',
  author:'2',
  post:'edwrewe423543563rewf3'
}]
// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
        comments:[Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
      id: ID!
      text: String!
      author: User!
      posts:[Post!]!
  }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent,args,ctx,info){
return comments
        },

        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            }
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            }
        }
    },

    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent,args,ctx,info){
          return comments.find((comment) => {
            return comment.post === parent.id
          })
        }
    },

    Comment:{
      author(parent,args,ctx,info){
        return users.find((user) => {
          return user.id === parent.author
        }) 
      },
      post(parent,args,ctx,info){
        return posts.find((post)=>{
          return post.id === parent.post
        })
      }
    },

    User:{
      posts(parent,args,ctx,info){
        return posts.filter((post)=>{
          return post.author === parent.id
        })
      },
      comments(parent,args,ctx,info){
        return comments.filter((comment) => {
          return comment.author === parent.id
        })
      }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})