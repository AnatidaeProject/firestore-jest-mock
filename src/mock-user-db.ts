import type { auth } from 'firebase-admin';
import { mockDefaultUser, MockFirebaseUser } from './mock-firebase-user';

// export interface MockFirebaseUser extends Omit<auth.UserRecord, 'metadata' | 'providerData'> {
//   metadata: auth.UserMetadata;
//   providerData: auth.UserInfo[];
// }

export interface UserData {
  getDefaultUser: () => MockFirebaseUser;
  getUser: (uid?: string) => MockFirebaseUser;
  selectUserId: (uid?: string) => number;
  selectUserIndex: (uid?: number) => number;
  addUser: (user: Partial<MockFirebaseUser>) => MockFirebaseUser;
  updateUser: (user: Partial<MockFirebaseUser>) => MockFirebaseUser;
}

export class MockUserDb {
  private users: MockFirebaseUser[];
  private selected: number;

  constructor(users: MockFirebaseUser[] = [mockDefaultUser], selectedIndex = 0) {
    this.users = users;
    this.selected = selectedIndex;
  }

  get selectedIndex() {
    return this.selected;
  }

  set selectedIndex(index: number) {
    this.selected = index;
  }

  // Requires at least the uid and email in each new user record
  addUsers(
    users: Array<Partial<MockFirebaseUser> & Pick<MockFirebaseUser, 'uid' | 'email'>>,
  ): MockFirebaseUser[] {
    this.users = users.map(user => ({ ...mockDefaultUser, ...user }));
    return this.users;
  }

  addUser(
    user: Partial<MockFirebaseUser> & Pick<MockFirebaseUser, 'uid' | 'email'>,
  ): MockFirebaseUser[] {
    this.users.push({ ...mockDefaultUser, ...user });
    return this.users;
  }

  updateUser(user: Partial<MockFirebaseUser>): MockFirebaseUser {
    const index = user.uid
      ? this.users.findIndex(foundUser => foundUser.uid === user.uid)
      : this.selected;
    this.users[index] = { ...this.users[index], ...user };
    return this.users[index];
  }

  getAllUsers(): MockFirebaseUser[] {
    return this.users;
  }

  getUser(index = this.selected): MockFirebaseUser {
    return this.users[index];
  }

  getUserById(uid?: string): MockFirebaseUser {
    return uid === undefined
      ? this.users[this.selected]
      : this.users.find(user => user.uid === uid);
  }

  getUserByEmail(email?: string): MockFirebaseUser {
    return email === undefined
      ? this.users[this.selected]
      : this.users.find(user => user.email === email);
  }

  getUserByPhone(phoneNumber?: string): MockFirebaseUser {
    return phoneNumber === undefined
      ? this.users[this.selected]
      : this.users.find(user => user.phoneNumber === phoneNumber);
  }
}
