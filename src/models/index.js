let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2],
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',			// this field is ONLY the relation not reflect in output
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

export default{
  users,
  messages
}