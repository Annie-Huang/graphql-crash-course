import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
// https://stackoverflow.com/questions/65551383/typescript-node-error-err-module-not-found-cannot-find-module
// Have to use .js file in order to by pass the error below
// Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\react\graphql-crash-course\dist\_db' imported from C:\react\graphql-crash-course\dist\index.js
import db from './_db.js';
// import { games, authors, reviews } from './_db.ts';
// import games from './_db';

// types
import { typeDefs } from './schema.js';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs1 = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
};

// Example of the query from frontend:
/*
games {
  title
}
*/

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
//
// sever setup
const server = new ApolloServer({
  // typeDefs -- definitions of the types of data author
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at port`, 4000);
