export const typeDefs = `#graphql
  type Game {
    id: ID,
    title: String!,
    platform: [String!]!,
    reviews: [Review!],
  }
  type Review {
    id: ID!,
    rating: Int!,
    content: String!,
    game: Game!,
    author: Author!,  
  }
  type Author {
    id: ID!,
    name: String!,
    verified: Boolean!,
    reviews: [Review!],
  }
  type Query {
    reviews: [Review],     
    review(id: ID!): Review,     
    games: [Game],
    game(id: ID!): Game,
    authors: [Author],
    author(id: ID!): Author,
  }
  type Mutation {
    addGame(game: AddGameInput!): Game,  
    deleteGame(id: ID!): [Game],
    updateGame(id: ID!, edit: EditGameInput!): Game,  
  }
  input AddGameInput {
    title: String!,
    platform: [String!]!,
  }
  input EditGameInput {
    title: String,
    platform: [String!],      
  }
`;

// int, float, string, boolean, ID

// id: ID!, '!' means it's compulsory.

// reviews: [Review!], This means each game may not have any reviews, e.g. empty list. But if it has review, it has to be with the Review type.

// The relationship among the 3 tables are:
// a Author can link to multiple reviews but a review can only belong 1 author.
// a Game can link to multiple reviews but a review can only belong to 1 game.
// each review must specify which author and game it belongs to.
