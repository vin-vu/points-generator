const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Item {
    shortDescription: String!
    price: String!
  }

  type Receipt {
    id: ID!
    retailer: String!
    purchaseDate: String!
    purchaseTime: String!
    items: [Item!]!
    total: String!
  }

  type Query {
    receipt(id: ID!): Receipt
    points(id: ID!): Int
  }

  type Mutation {
    processReceipt(
      retailer: String!
      purchaseDate: String!
      purchaseTime: String!
      items: [ItemInput!]!
      total: String!
    ): Receipt
  }

  input ItemInput {
    shortDescription: String!
    price: String!
  }
`;

const resolvers = {
  Query: {
    receipt: async (_, { id }, { dataSources }) => {
      return dataSources.receiptsController.getReceipt(id);
    },
    points: async (_, { id }, { dataSources }) => {
      return dataSources.receiptsController.getPoints(id);
    },
  },
  Mutation: {
    processReceipt: async (
      _,
      { retailer, purchaseDate, purchaseTime, items, total },
      { dataSources }
    ) => {
      const receipt = {
        retailer,
        purchaseDate,
        purchaseTime,
        items,
        total,
      };
      return dataSources.receiptsController.saveReceipt(receipt);
    },
  },
};

module.exports = { typeDefs, resolvers };
