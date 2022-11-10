const { buildSchema } = require('graphql');
const subscriptions = require('./subscriptions.gql')
const users = require('./user.gql')
const room = require('./room.gql')
const schema = require('./index.gql')
const booking = require('./booking.gql')

module.exports = buildSchema(booking + subscriptions + room + users + schema);
