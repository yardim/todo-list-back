const {MongoClient, ObjectID} = require('mongodb');

// const objID = new ObjectID();
// console.log(objID);

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if(err) return console.log(err.message);
  console.log('Connected to DB');

  // creating collection
  const db = client.db('TodoList');

  // C - create
  // db.collection('Users').insertOne({
  //   name: 'Dmitriy',
  //   password: '123',
  //   email: 'test@mail.com'
  // }, (err, result) => {
  //   if (err) return console.log(err.message);
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  // R - read
  // db.collection('Users').find({ _id: new ObjectID('5acda697ec932708689f89c3') }).toArray().then(docs => {
  //   console.log('Docs found');
  //   // console.log(docs);
  // }).catch(err => {
  //   console.log(err.message);
  // });

  // D - delete
  // db.collection('Users').findOneAndDelete({ _id: new ObjectID('5acdaa1ddde5861f24a0a3f4') }).then(docs => {
  //   console.log(docs);
  // }).catch(err => {
  //   console.log(err.message);
  // });

  // db.collection('Users').deleteMany({ name: 'Dmitriy' });

  // Close connection
  // client.close();
});