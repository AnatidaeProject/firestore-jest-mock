import faker from 'faker';
import { MockUserDb } from '../mock-user-db';
import { mockDefaultUser, MockFirebaseUser } from '../mock-firebase-user';

describe('Mock User Database', () => {
  const testingMock = jest.fn();

  test('Will default construct & getUser (selected)', () => {
    const mockUsers = new MockUserDb();
    expect(mockUsers).toBeDefined();
    expect(mockUsers.getUser()).toEqual(mockDefaultUser);
  });

  test('addUsers & get methods', () => {
    const mockUsers = new MockUserDb();
    const userData: MockFirebaseUser[] = Array.from({ length: 10 }, user => ({
      ...mockDefaultUser,
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      displayName: faker.internet.userName(),
      uid: faker.random.uuid(),
    }));
    mockUsers.addUsers(userData);
    expect(mockUsers.getAllUsers()).toEqual(userData);
    expect(mockUsers.getUserById(userData[3].uid)).toEqual(userData[3]);
    expect(mockUsers.getUserByEmail(userData[5].email)).toEqual(userData[5]);
    expect(mockUsers.getUserByPhone(userData[7].phoneNumber)).toEqual(userData[7]);
  });

  test('addUser & getUserById', () => {
    const mockUsers = new MockUserDb();
    const user = {
      ...mockDefaultUser,
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      displayName: faker.internet.userName(),
      uid: faker.random.uuid(),
    };
    mockUsers.addUser(user);
    expect(mockUsers.getUserById(user.uid)).toEqual(user);
  });

  test('updateUser', () => {
    const mockUsers = new MockUserDb();
    const userData: MockFirebaseUser[] = Array.from({ length: 10 }, user => ({
      ...mockDefaultUser,
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      displayName: faker.internet.userName(),
      uid: faker.random.uuid(),
    }));
    mockUsers.addUsers(userData);
    const updatedUser: MockFirebaseUser = {
      ...userData[4],
      displayName: faker.internet.userName(),
    };
    mockUsers.updateUser(updatedUser);
    expect(mockUsers.getUserById(updatedUser.uid).displayName).toEqual(updatedUser.displayName);
  });
});
