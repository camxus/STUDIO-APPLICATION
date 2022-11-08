const { buildSchema } = require('graphql');
const subscriptions = require('./subscriptions.gql')
const users = require('./user.gql')
const room = require('./room.gql')
const schema = require('./index.gql')

module.exports = buildSchema(subscriptions + room + users + schema);
