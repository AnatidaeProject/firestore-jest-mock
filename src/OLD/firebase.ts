import type admin from 'firebase-admin';

export const mockInitializeApp = jest.fn();
export const mockCert = jest.fn();
export const mockCredentialApplicationDefault = jest.fn();

export const firebaseStub = overrides => {
  const { FakeFirestore, FakeAuth } = require('firestore-jest-mock');

  // Prepare namespaced classes
  function firestoreConstructor() {
    return new FakeFirestore(overrides.database);
  }

  firestoreConstructor.Query = FakeFirestore.Query;
  firestoreConstructor.CollectionReference = FakeFirestore.CollectionReference;
  firestoreConstructor.DocumentReference = FakeFirestore.DocumentReference;
  firestoreConstructor.FieldValue = FakeFirestore.FieldValue;
  firestoreConstructor.Timestamp = FakeFirestore.Timestamp;
  firestoreConstructor.Transaction = FakeFirestore.Transaction;

  const auth = (): FakeAuth => mockAuth;

  const initializeApp = (options?: admin.AppOptions, name?: string): unknown => {
    mockInitializeApp(options, name);
    return {
      auth: () => mockAuth,
    };
  };

  // The Firebase mock
  return {
    initializeApp,

    credential: {
      cert: mockCert,
      applicationDefault: mockCredentialApplicationDefault,
    },

    auth() {
      return new FakeAuth(overrides.currentUser);
    },

    firestore: firestoreConstructor,
  };
};

export const mockFirebase = (overrides = {}) => {
  mockModuleIfFound('firebase', overrides);
  mockModuleIfFound('firebase-admin', overrides);
};

function mockModuleIfFound(moduleName, overrides) {
  try {
    require.resolve(moduleName);
    jest.doMock(moduleName, () => firebaseStub(overrides));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.info(`Module ${moduleName} not found, mocking skipped.`);
  }
}
