/* eslint-disable no-unused-vars */
import type { auth } from 'firebase-admin';
import type firebase from 'firebase';

const GOOD_TOKEN = 'GOOD_TOKEN';
const BAD_TOKEN = 'BAD_TOKEN';

export const mockFirebaseUserDelete = jest.fn();

export interface MockFirebaseUser
  extends Omit<auth.UserRecord, 'metadata' | 'multiFactor' | 'providerData'>,
    Omit<
      firebase.User,
      | 'metadata'
      | 'multiFactor'
      | 'providerData'
      | 'displayName'
      | 'email'
      | 'phoneNumber'
      | 'photoURL'
      | 'tenantId'
    > {
  metadata: firebase.auth.UserMetadata & auth.UserMetadata;
  providerData: firebase.UserInfo[] & auth.UserInfo[];
  multiFactor: firebase.User.MultiFactorUser & {
    enrolledFactors: auth.MultiFactorInfo[];
    toJSON(): Record<string, unknown>;
  };
}

function generateIdTokenResult(claims): firebase.auth.IdTokenResult {
  const now = new Date();
  const then = new Date().setDate(now.getDate() + 30);
  return {
    claims,
    expirationTime: then.toString(),
    authTime: then.toString(),
    issuedAtTime: then.toString(),
    signInProvider: null,
    signInSecondFactor: null,
    token: GOOD_TOKEN,
  };
}

export const mockDefaultUser: MockFirebaseUser = {
  uid: 'u9QdPcd7jlgFEMfY833EDwQZVR43',
  email: 'crashTestDummy@example.com',
  emailVerified: true,
  disabled: false,
  metadata: {
    lastSignInTime: 'Fri, 10 Jan 2020 07:00:00 GMT',
    creationTime: 'Fri, 10 Jan 2020 07:00:00 GMT',
    toJSON: () => this,
  },
  providerData: [
    {
      uid: 'u9QdPcd7jlgFEMfY833EDwQZVR43',
      displayName: 'Testing User',
      email: 'crashTestDummy@example.com',
      phoneNumber: '503-555-1212',
      photoURL: 'https://picsum.photos/200',
      providerId: 'email',
      toJSON: () => this,
    },
  ],
  multiFactor: {
    enrolledFactors: [],
    enroll: (
      assertion: firebase.auth.MultiFactorAssertion,
      displayName?: string | null,
    ): Promise<void> => Promise.resolve(undefined),
    unenroll: (option: firebase.auth.MultiFactorInfo | string): Promise<void> =>
      Promise.resolve(undefined),
    getSession: (): Promise<firebase.auth.MultiFactorSession> => Promise.resolve(undefined),
    toJSON: () => this,
  },
  isAnonymous: false,
  providerId: '',
  refreshToken: '',

  delete(): Promise<void> {
    mockFirebaseUserDelete();
    return Promise.resolve(undefined);
  },
  getIdToken(forceRefresh: boolean | undefined): Promise<string> {
    return Promise.resolve(GOOD_TOKEN);
  },
  getIdTokenResult(forceRefresh: boolean | undefined): Promise<firebase.auth.IdTokenResult> {
    return Promise.resolve(generateIdTokenResult(this.customClaims || this.claims || {}));
  },
  linkAndRetrieveDataWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  },
  linkWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  },
  linkWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier,
  ): Promise<firebase.auth.ConfirmationResult> {
    return Promise.resolve(undefined);
  },
  linkWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  },
  linkWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
    return Promise.resolve(undefined);
  },
  reauthenticateAndRetrieveDataWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  },
  reauthenticateWithCredential(
    credential: firebase.auth.AuthCredential,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  },
  reauthenticateWithPhoneNumber(
    phoneNumber: string,
    applicationVerifier: firebase.auth.ApplicationVerifier,
  ): Promise<firebase.auth.ConfirmationResult> {
    return Promise.resolve(undefined);
  },
  reauthenticateWithPopup(
    provider: firebase.auth.AuthProvider,
  ): Promise<firebase.auth.UserCredential> {
    return Promise.resolve(undefined);
  },
  reauthenticateWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
    return Promise.resolve(undefined);
  },
  reload(): Promise<void> {
    return Promise.resolve(undefined);
  },
  sendEmailVerification(
    actionCodeSettings: firebase.auth.ActionCodeSettings | null | undefined,
  ): Promise<void> {
    return Promise.resolve(undefined);
  },
  toJSON(): Record<string, unknown> {
    return this;
  },
  unlink(providerId: string): Promise<firebase.User> {
    return Promise.resolve(undefined);
  },
  updateEmail(newEmail: string): Promise<void> {
    return Promise.resolve(undefined);
  },
  updatePassword(newPassword: string): Promise<void> {
    return Promise.resolve(undefined);
  },
  updatePhoneNumber(phoneCredential: firebase.auth.AuthCredential): Promise<void> {
    return Promise.resolve(undefined);
  },
  updateProfile(profile: { displayName?: string | null; photoURL?: string | null }): Promise<void> {
    return Promise.resolve(undefined);
  },
  verifyBeforeUpdateEmail(
    newEmail: string,
    actionCodeSettings: firebase.auth.ActionCodeSettings | null | undefined,
  ): Promise<void> {
    return Promise.resolve(undefined);
  },
};

// export class MockFirebaseUser implements firebase.User, auth.UserRecord {
//   uid: string;
//   email: string;
//   emailVerified: boolean;
//   phoneNumber: string;
//   displayName: string;
//   photoURL: string;
//   disabled: boolean;
//   tenantId: string;
//   providerId: string;
//   isAnonymous: boolean;
//   refreshToken: string;
//   tokensValidAfterTime?: string;
//   passwordHash?: string;
//   passwordSalt?: string;
//   metadata: firebase.auth.UserMetadata & auth.UserMetadata;
//   multiFactor: firebase.User.MultiFactorUser & {
//     enrolledFactors: auth.MultiFactorInfo[];
//     toJSON(): Object;
//   };
//   providerData: firebase.UserInfo[] & auth.UserInfo[];
//   customClaims?: { [key: string]: any };
//
//   async delete(): Promise<void> {
//     mockFirebaseUserDelete();
//   }
//
//   getIdTokenResult(forceRefresh?: boolean): Promise<firebase.auth.IdTokenResult> {
//     throw new Error('Method not implemented.');
//   }
//
//   getIdToken(forceRefresh?: boolean): Promise<string> {
//     throw new Error('Method not implemented.');
//   }
//
//   linkAndRetrieveDataWithCredential(
//     credential: firebase.auth.AuthCredential,
//   ): Promise<firebase.auth.UserCredential> {
//     throw new Error('Method not implemented.');
//   }
//
//   linkWithCredential(
//     credential: firebase.auth.AuthCredential,
//   ): Promise<firebase.auth.UserCredential> {
//     throw new Error('Method not implemented.');
//   }
//
//   linkWithPhoneNumber(
//     phoneNumber: string,
//     applicationVerifier: firebase.auth.ApplicationVerifier,
//   ): Promise<firebase.auth.ConfirmationResult> {
//     throw new Error('Method not implemented.');
//   }
//
//   linkWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
//     throw new Error('Method not implemented.');
//   }
//
//   linkWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   reauthenticateAndRetrieveDataWithCredential(
//     credential: firebase.auth.AuthCredential,
//   ): Promise<firebase.auth.UserCredential> {
//     throw new Error('Method not implemented.');
//   }
//
//   reauthenticateWithCredential(
//     credential: firebase.auth.AuthCredential,
//   ): Promise<firebase.auth.UserCredential> {
//     throw new Error('Method not implemented.');
//   }
//
//   reauthenticateWithPhoneNumber(
//     phoneNumber: string,
//     applicationVerifier: firebase.auth.ApplicationVerifier,
//   ): Promise<firebase.auth.ConfirmationResult> {
//     throw new Error('Method not implemented.');
//   }
//
//   reauthenticateWithPopup(
//     provider: firebase.auth.AuthProvider,
//   ): Promise<firebase.auth.UserCredential> {
//     throw new Error('Method not implemented.');
//   }
//
//   reauthenticateWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   reload(): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   sendEmailVerification(actionCodeSettings?: firebase.auth.ActionCodeSettings): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   toJSON(): Object {
//     throw new Error('Method not implemented.');
//   }
//
//   unlink(providerId: string): Promise<firebase.User> {
//     throw new Error('Method not implemented.');
//   }
//
//   updateEmail(newEmail: string): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   updatePassword(newPassword: string): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   updatePhoneNumber(phoneCredential: firebase.auth.AuthCredential): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   updateProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
//
//   verifyBeforeUpdateEmail(
//     newEmail: string,
//     actionCodeSettings?: firebase.auth.ActionCodeSettings,
//   ): Promise<void> {
//     throw new Error('Method not implemented.');
//   }
// }
