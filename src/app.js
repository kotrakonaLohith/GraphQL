import { GraphQLServer } from "graphql-yoga";

// type definitions
// string, Boolean, Int, Float, ID (scalar types)

const typeDefs = `
type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
    id: ID!
    age: Int!
    employed: Boolean!
    gpa: Float
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
}
`;

// resolvers

const resolvers = {
  Query: {
    hello() {
      return "This is my first query";
    },
    name() {
      return "Lohith";
    },
    location() {
      return "chicago,Illinois";
    },
    bio() {
      return "I'm a Front end developer";
    },
    id() {
      return "asdasdasdrbvcdfv1234";
    },
    age() {
      return 26;
    },
    employed() {
      return true;
    },
    gpa() {
      return 3.3;
    },
    title() {
      return "stickers";
    },
    price() {
      return 3.56;
    },
    releaseYear() {
      return 2021;
    },
    rating() {
      return null;
    },
    inStock() {
      return true;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("the server is up");
});
