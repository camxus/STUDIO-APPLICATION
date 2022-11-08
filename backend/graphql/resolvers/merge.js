const DataLoader = require('dataloader');

const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});


const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
    };
  } catch (err) {
    throw err;
  }
};

exports.user = user;