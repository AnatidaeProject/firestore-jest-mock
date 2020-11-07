import {
  createAuthMock,
  GOOD_TOKEN,
  BAD_TOKEN,
  mockGenerateEmailVerificationLink,
} from '../mock-firebase-auth';
import { MockUserDb } from '../mock-user-db';
import mock = jest.mock;

describe('MockFirebaseAuth', () => {
  let userDb: MockUserDb;

  beforeAll(() => {
    userDb = new MockUserDb();
  });

  test('Can initialize', () => {
    const mockAuth = createAuthMock(userDb);
    expect(mockAuth).toBeDefined();
  });

  test('Verify a token', async () => {
    const mockAuth = createAuthMock(userDb);
    const result = await mockAuth.verifyIdToken(GOOD_TOKEN);
    expect(result.uid).toBeDefined();
  });

  test('Throw on a bad token', async () => {
    const mockAuth = createAuthMock(userDb);
    await expect(mockAuth.verifyIdToken(BAD_TOKEN)).rejects.toBeDefined();
  });

  test('Can mock email verification link', async () => {
    mockGenerateEmailVerificationLink.mockReturnValueOnce('test url link');
    const mockAuth = createAuthMock(userDb);
    const result = await mockAuth.generateEmailVerificationLink('email@example.com');
    expect(result).toEqual('test url link');
  });
});
