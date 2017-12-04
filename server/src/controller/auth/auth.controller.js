import User from '../../mongoose/user';

function register({email, password}) {
  let newUser = null;
  User.findOneByUsername(email)
  .then(
    // check email duplication
    user => {
      if(user) {
        throw new Error('duplicated email');
      } else {
        return User.create(email, password);
      }
    }
  )
}