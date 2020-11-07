import type { admin } from 'firebase-admin/lib/auth';
import type firebase from 'firebase';
import { MockUserDb } from './mock-user-db';
import { MockFirebaseUser } from './mock-firebase-user';

export const GOOD_TOKEN = 'GOOD_TOKEN';
export const BAD_TOKEN = 'BAD_TOKEN';

export const mockApplyActionCode = jest.fn() as jest.Mock<void>;
export const mockCheckActionCode = jest.fn() as jest.Mock<firebase.auth.ActionCodeInfo>;
export const mockConfirmPasswordReset = jest.fn() as jest.Mock<void>;
export const mockCreateUserWithEmailAndPassword = jest.fn() as jest.Mock<
  firebase.auth.UserCredential
>;
export const mockDeleteUser = jest.fn();
export const mockDeleteUsers = jest.fn() as jest.Mock<admin.auth.DeleteUsersResult>;
// export const mockSendVerificationEmail = jest.fn();
export const mockSignInWithEmailAndPassword = jest.fn();
export const mockSignInWithEmailLink = jest.fn();
export const mockSignInWithPhoneNumber = jest.fn();
export const mockSignInWithPopup = jest.fn();
export const mockSignInWithRedirect = jest.fn();
export const mockSignOut = jest.fn();
export const mockVerifyIdToken = jest.fn() as jest.Mock<admin.auth.DecodedIdToken>;
export const mockGetUser = jest.fn() as jest.Mock<MockFirebaseUser>;
export const mockGetUserByEmail = jest.fn() as jest.Mock<MockFirebaseUser>;
export const mockGetUserByPhoneNumber = jest.fn() as jest.Mock<MockFirebaseUser>;
export const mockGetUsers = jest.fn();
export const mockSetCustomUserClaims = jest.fn();
export const mockCreateCustomToken = jest.fn() as jest.Mock<string>;
export const mockSetPersistence = jest.fn();
export const mockCreateUser = jest.fn() as jest.Mock<MockFirebaseUser>;
export const mockDeleteProviderConfig = jest.fn();
export const mockCreateProviderConfig = jest.fn() as jest.Mock<admin.auth.AuthProviderConfig>;
export const mockFetchSignInMethodsForEmail = jest.fn() as jest.Mock<string[]>;
export const mockGenerateEmailVerificationLink = jest.fn() as jest.Mock<string>;
export const mockGeneratePasswordResetLink = jest.fn() as jest.Mock<string>;
export const mockGenerateSignInWithEmailLink = jest.fn() as jest.Mock<string>;
export const mockGetProviderConfig = jest.fn() as jest.Mock<admin.auth.AuthProviderConfig>;
export const mockGetRedirectResult = jest.fn() as jest.Mock<firebase.auth.UserCredential>;
export const mockCreateSessionCookie = jest.fn() as jest.Mock<string>;
export const mockImportUsers = jest.fn();
export const mockIsSignInWithEmailLink = jest.fn();
export const mockListProviderConfigs = jest.fn();
export const mockListUsers = jest.fn();
export const mockOnAuthStateChangedNext = jest.fn();
export const mockOnIdTokenChanged = jest.fn();
export const mockRevokeRefreshTokens = jest.fn();
export const mockSendPasswordResetEmail = jest.fn();
export const mockSendSignInLinkToEmail = jest.fn();
export const mockSignInAndRetrieveDataWithCredential = jest.fn();
export const mockSignInAnonymously = jest.fn();
export const mockSignInWithCredential = jest.fn();
export const mockSignInWithCustomToken = jest.fn();
export const mockTenantManager = jest.fn();
export const mockUpdateUser = jest.fn();
export const mockUpdateCurrentUser = jest.fn();
export const mockUpdateProviderConfig = jest.fn();
export const mockUseDeviceLanguage = jest.fn();
export const mockUseEmulator = jest.fn();
export const mockVerifyPasswordResetCode = jest.fn();
export const mockVerifySessionCookie = jest.fn();

export interface MockFirebaseAuth extends admin.auth.Auth, firebase.auth.Auth {
  app: any;
}

export const createAuthMock = (userDb: MockUserDb = new MockUserDb()): MockFirebaseAuth => ({
  app: undefined,
  languageCode: undefined,
  settings: undefined,
  tenantId: undefined,
  get currentUser() {
    return (mockGetUser() as firebase.User) || (userDb.getUser() as firebase.User);
  },
  applyActionCode(code: string): Promise<void> {
    return Promise.resolve(mockApplyActionCode(code));
  },
  checkActionCode(code: string): Promise<firebase.auth.ActionCodeInfo> {
    return Promise.resolve(mockCheckActionCode(code));
  },
  confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    return Promise.resolve(mockConfirmPasswordReset(code, newPassword));
  },
  createCustomToken(uid: string, developerClaims?: any): Promise<string> {
    return Promise.resolve(mockCreateCustomToken(uid, developerClaims));
  },
  createProviderConfig(
    config: admin.auth.AuthProviderConfig,
  ): Promise<admin.auth.AuthProviderConfig> {
    return Promise.resolve(mockCreateProviderConfig(config));
  },
  createSessionCookie(
    idToken: string,
    sessionCookieOptions: admin.auth.SessionCookieOptions,
  ): Promise<string> {
    return Promise.resolve(mockCreateSessionCookie(idToken, sessionCookieOptions));
  },
  createUser(properties: admin.auth.CreateRequest): Promise<admin.auth.UserRecord> {
    return Promise.resolve(mockCreateUser(properties) || userDb.getUser());
  },
  createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(
      mockCreateUserWithEmailAndPassword(email, password) || {
        additionalUserInfo: null,
        credential: null,
        operationType: null,
        user: userDb.getUser() as firebase.User,
      },
    );
  },
  deleteProviderConfig(providerId: string): Promise<void> {
    return Promise.resolve(mockDeleteProviderConfig(providerId));
  },
  deleteUser(uid: string): Promise<void> {
    return Promise.resolve(mockDeleteUser(uid));
  },
  deleteUsers(uids: string[]): Promise<admin.auth.DeleteUsersResult> {
    return Promise.resolve(mockDeleteUsers(uids));
  },
  fetchSignInMethodsForEmail(email: string): Promise<Array<string>> {
    return Promise.resolve(mockFetchSignInMethodsForEmail(email));
  },
  generateEmailVerificationLink(
    email: string,
    actionCodeSettings?: admin.auth.ActionCodeSettings,
  ): Promise<string> {
    return Promise.resolve(mockGenerateEmailVerificationLink(email, actionCodeSettings));
  },
  generatePasswordResetLink(
    email: string,
    actionCodeSettings?: admin.auth.ActionCodeSettings,
  ): Promise<string> {
    return Promise.resolve(mockGeneratePasswordResetLink(email, actionCodeSettings));
  },
  generateSignInWithEmailLink(
    email: string,
    actionCodeSettings: admin.auth.ActionCodeSettings,
  ): Promise<string> {
    return Promise.resolve(mockGenerateSignInWithEmailLink(email, actionCodeSettings));
  },
  getProviderConfig(providerId: string): Promise<admin.auth.AuthProviderConfig> {
    return Promise.resolve(mockGetProviderConfig(providerId));
  },
  getRedirectResult(): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockGetRedirectResult());
  },
  getUser(uid: string): Promise<admin.auth.UserRecord> {
    return Promise.resolve(mockGetUser(uid) || userDb.getUserById(uid));
  },
  getUserByEmail(email: string): Promise<admin.auth.UserRecord> {
    return Promise.resolve(mockGetUserByEmail(email) || userDb.getUserByEmail(email));
  },
  getUserByPhoneNumber(phoneNumber: string): Promise<admin.auth.UserRecord> {
    return Promise.resolve(
      mockGetUserByPhoneNumber(phoneNumber) || userDb.getUserByPhone(phoneNumber),
    );
  },
  getUsers(identifiers: admin.auth.UserIdentifier[]): Promise<admin.auth.GetUsersResult> {
    const users: admin.auth.UserRecord[] = [];
    const notFound: admin.auth.UserIdentifier[] = [];
    identifiers.forEach(item => {
      let found: admin.auth.UserRecord;
      if ('uid' in item) {
        found = this.userDb.getUserById(item.uid);
      } else if ('email' in item) {
        found = this.userDb.getUserByEmail(item.email);
      } else if ('phoneNumber' in item) {
        found = this.userDb.getUserByPhone(item.phoneNumber);
      }
      if (found) {
        users.push(found);
      } else {
        notFound.push(item);
      }
    });
    return Promise.resolve(
      mockGetUsers(identifiers) || {
        users,
        notFound,
      },
    );
  },
  importUsers(
    users: admin.auth.UserImportRecord[],
    options?: admin.auth.UserImportOptions,
  ): Promise<admin.auth.UserImportResult> {
    return Promise.resolve(mockImportUsers(users, options));
  },
  isSignInWithEmailLink(emailLink: string): boolean {
    return mockIsSignInWithEmailLink(emailLink);
  },
  listProviderConfigs(
    options: admin.auth.AuthProviderConfigFilter,
  ): Promise<admin.auth.ListProviderConfigResults> {
    return Promise.resolve(mockListProviderConfigs(options));
  },
  listUsers(maxResults?: number, pageToken?: string): Promise<admin.auth.ListUsersResult> {
    return Promise.resolve(mockListUsers(maxResults, pageToken));
  },
  onAuthStateChanged(
    nextOrObserver: firebase.Observer<any> | ((a: firebase.User | null) => any),
    error?: (a: firebase.auth.Error) => any,
    completed?: firebase.Unsubscribe,
  ): firebase.Unsubscribe {
    return mockOnAuthStateChangedNext(nextOrObserver, error, completed);
  },
  onIdTokenChanged(
    nextOrObserver: firebase.Observer<any> | ((a: firebase.User | null) => any),
    error?: (a: firebase.auth.Error) => any,
    completed?: firebase.Unsubscribe,
  ): firebase.Unsubscribe {
    mockOnIdTokenChanged(nextOrObserver, error, completed);
    return undefined;
  },
  revokeRefreshTokens(uid: string): Promise<void> {
    return Promise.resolve(mockRevokeRefreshTokens(uid));
  },
  sendPasswordResetEmail(
    email: string,
    actionCodeSettings?: firebase.auth.ActionCodeSettings | null,
  ): Promise<void> {
    return Promise.resolve(mockSendPasswordResetEmail(email, actionCodeSettings));
  },
  sendSignInLinkToEmail(
    email: string,
    actionCodeSettings: firebase.auth.ActionCodeSettings,
  ): Promise<void> {
    return Promise.resolve(mockSendSignInLinkToEmail(email, actionCodeSettings));
  },
  setCustomUserClaims(uid: string, customUserClaims: any | null): Promise<void> {
    return Promise.resolve(mockSetCustomUserClaims(uid, customUserClaims));
  },
  setPersistence(persistence: firebase.auth.Auth.Persistence): Promise<void> {
    return Promise.resolve(mockSetPersistence(persistence));
  },
  signInAndRetrieveDataWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockSignInAndRetrieveDataWithCredential(credential));
  },
  signInAnonymously(): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockSignInAnonymously());
  },
  signInWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockSignInWithCredential(credential));
  },
  signInWithCustomToken(token: string): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockSignInWithCustomToken(token));
  },
  signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockSignInWithEmailAndPassword(email, password));
  },
  signInWithEmailLink(email: string, emailLink?: string): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockSignInWithEmailLink(email, emailLink));
  },
  signInWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier,
  ): Promise<firebase.auth.ConfirmationResult> {
    return Promise.resolve(mockSignInWithPhoneNumber(phoneNumber, applicationVerifier));
  },
  signInWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(mockSignInWithPopup(provider));
  },
  signInWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
    return Promise.resolve(mockSignInWithRedirect(provider));
  },
  signOut(): Promise<void> {
    return Promise.resolve(mockSignOut());
  },
  tenantManager(): admin.auth.TenantManager {
    return mockTenantManager();
  },
  updateCurrentUser(user: firebase.User | null): Promise<void> {
    return Promise.resolve(
      mockUpdateCurrentUser(user) || userDb.updateUser(user as MockFirebaseUser),
    );
  },
  updateProviderConfig(
    providerId: string,
    updatedConfig: admin.auth.UpdateAuthProviderRequest,
  ): Promise<admin.auth.AuthProviderConfig> {
    return Promise.resolve(mockUpdateProviderConfig(providerId, updatedConfig));
  },
  updateUser(uid: string, properties: admin.auth.UpdateRequest): Promise<admin.auth.UserRecord> {
    return Promise.resolve(
      mockUpdateUser(uid, properties) ||
        userDb.updateUser({ uid, ...properties } as MockFirebaseUser),
    );
  },
  useDeviceLanguage(): void {
    mockUseDeviceLanguage();
  },
  useEmulator(url: string): void {
    mockUseEmulator(url);
  },
  verifyIdToken(idToken: string, checkRevoked?: boolean): Promise<admin.auth.DecodedIdToken> {
    return new Promise((resolve, reject) => {
      const result = mockVerifyIdToken(idToken, checkRevoked);
      if (result) {
        return resolve(result);
      }
      if (idToken === BAD_TOKEN) {
        return reject(generateVerifyError());
      }
      resolve(generateToken(userDb.getUser()));
    });
  },
  verifyPasswordResetCode(code: string): Promise<string> {
    return Promise.resolve(mockVerifyPasswordResetCode(code));
  },
  verifySessionCookie(
    sessionCookie: string,
    checkForRevocation?: boolean,
  ): Promise<admin.auth.DecodedIdToken> {
    return Promise.resolve(mockVerifySessionCookie(sessionCookie, checkForRevocation));
  },
});

function generateVerifyError() {
  return {
    errorInfo: {
      code: 'auth/argument-error',
      message:
        'Decoding Firebase ID token failed. Make sure you passed the entire string JWT which represents an ID token. See https://firebase.google.com/docs/auth/admin/verify-id-tokens for details on how to retrieve an ID token.',
    },
    codePrefix: 'auth',
  };
}

function generateToken(user: MockFirebaseUser): admin.auth.DecodedIdToken {
  return {
    iss: `https://securetoken.google.com/PROJECT_ID`,
    aud: 'PROJECT_ID',
    auth_time: 1576133251,
    iat: 1576133251,
    exp: 1576136851,
    firebase: {
      identities: {
        email: [user.email],
      },
      sign_in_provider: 'password',
      sign_in_second_factor: undefined,
      second_factor_identifier: undefined,
      tenant: undefined,
    },
    sub: user.uid,
    uid: user.uid,
    // Firebase custom claims
    email: user.email,
    email_verified: user.emailVerified,
    ...user.customClaims,
  };
}
