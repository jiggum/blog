import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import userType from './user.type';

const query = {
  type: new GraphQLList(userType),
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (obj, item, source, fieldASTs) => {
    // console.log(fieldASTs);
    var projections = getProjection(fieldASTs);
    console.log(fieldASTs.fieldNodes[0]);
    console.log(projections)
    // var foundItems = new Promise((resolve, reject) => {
    //     ToDoMongo.find({itemId}, projections,(err, todos) => {
    //         err ? reject(err) : resolve(todos)
    //     })
    // })

    // return foundItems
  }
}

export default query;