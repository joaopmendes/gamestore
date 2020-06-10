const { User } = require('../../Models');

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user || null;
  } catch (err) {
    return null;
  }
};
const getUserInformation = (user) => {
  return User.findOne({ identifier: user.identifier })
    .select('name email admin token cart -_id')
    .populate({
      path: 'cart',
      select: '-__v -owner',
      populate: { path: 'items.item', select: '-__v', default: [] },
    })
    .populate({
      path: 'addresses',
      select: '-__v', default: [],
    })
    .populate({
      path: 'orders',
      select: '-__v -user', default: [],
      populate: [
        {
          path: 'currentCart',
          select: '-__v -owner',
          populate: { path: 'items.item', select: '-__v', default: [] },
        },
        { path: 'mailingAddress', select: '-__v' },
        { path: 'billingAddress', select: '-__v' },
      ],
    })
    .exec();
};
const getUserInformationByIdentification = async (identifier) => {
  return await User.findOne({ identifier: identifier })
    .populate({
      path: 'cart',
      select: '-__v',
      populate: { path: 'items.item', select: '-__v -owner' },
    })
    .populate({
      path: 'addresses',
      select: '-__v',
    })
    .populate({
      path: 'orders',
      select: '-__v -user',
      populate: [
        {
          path: 'currentCart',
          select: '-__v -owner',
          populate: { path: 'items.item', select: '-__v' },
        },
        { path: 'mailingAddress', select: '-__v' },
        { path: 'billingAddress', select: '-__v' },
      ],
    })
    .exec();
};
module.exports = {
  getUserByEmail,
  getUserInformation,
  getUserInformationByIdentification,
};
