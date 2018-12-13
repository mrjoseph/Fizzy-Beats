import mockingoose from 'mockingoose';
import User from '../graphql/user/userModel';

describe('User Model', () => {
  const data = [
    {
      _id: '5b83f995f6049ab5803645ad',
      username: 'name',
      email: 'name@email.com',
      salt: '123456',
      password: 'password',
    },
    {
      _id: '507f191e810c19729de860ea',
      username: 'name',
      email: 'name@email.com',
      salt: '123456',
      password: 'password',
    },
  ];
  beforeEach(() => {
    mockingoose.resetAll();
  })
  describe('Find all users', () => {
    it('should return a list of users with', async () => {
      mockingoose.User.toReturn(data, 'find');
      const result = await User.find({});
      expect(JSON.parse(JSON.stringify(result))).toMatchObject(data);
    })

    it('Should find username by id', async () => {
      mockingoose.User.toReturn(data, 'findOne');
      const result = await User.findById({ _id: '507f191e810c19729de860ea'});
      expect(JSON.parse(JSON.stringify(result[0].username))).toEqual('name');
    });

    it('should create user mock', async () => {
      mockingoose.User.toReturn({
          username: 'the thing',
          email: 'ben@grim.com',
          salt: '123456',
          password: 'password',
      }, 'save');
      const response = await User.create({});
      const { email, username, salt, password } = response;
      expect(email).toEqual('ben@grim.com');
      expect(username).toEqual('the thing');
      expect(password).toEqual('password');
      expect(salt).toEqual('123456');
    });
    it('should update with callback', (done) => {
      mockingoose.User.toReturn({
        username: 'the thing',
        email: 'ben@grim.com',
        salt: '123456',
        password: 'password',
      }, 'update');

      User
        .update({ name: 'namesdfsdf' }, { email: 'name@mail.com' }, {}, (err, result) => {
          expect(result).toEqual({
            username: 'the thing',
            email: 'ben@grim.com',
            salt: '123456',
            password: 'password',
          });
          done();
        });
    });
  });
});
