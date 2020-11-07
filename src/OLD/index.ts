import { MockFirebaseAuth } from './mock-firebase-auth';
import { MockFirestore } from '../mock-firestore';
import * as admin from 'firebase-admin';

export const mockInitializeApp = jest.fn();
export const mockCredentialApplicationDefault = jest.fn();
export const mockCredentialCert = jest.fn();

const mockAuth = new MockFirebaseAuth();
const mockFirestore = new MockFirestore();
const realAdmin = jest.requireActual<typeof admin>('firebase-admin');

export const initializeApp = (options?: admin.AppOptions, name?: string): unknown => {
  mockInitializeApp(options, name);
  return {
    auth: () => mockAuth,
  };
};

export const credential = {
  cert: mockCredentialCert,
  applicationDefault: mockCredentialApplicationDefault,
};

export const auth = (): MockFirebaseAuth => mockAuth;

export const firestore = Object.assign(() => mockFirestore, {
  Timestamp: realAdmin.firestore.Timestamp,
});
