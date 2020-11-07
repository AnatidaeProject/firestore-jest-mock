import { merge } from 'lodash';

export const mockFirebaseSettings = jest.fn();
export const mockCollection = jest.fn();
export const mockCollectionGroup = jest.fn();
export const mockDoc = jest.fn();
export const mockWhere = jest.fn();
export const mockBatch = jest.fn();
export const mockGet = jest.fn();
export const mockGetAll = jest.fn();
export const mockUpdate = jest.fn();
export const mockAdd = jest.fn();
export const mockSet = jest.fn();
export const mockDelete = jest.fn();
export const mockOrderBy = jest.fn();
export const mockLimit = jest.fn();

export const mockBatchDelete = jest.fn();
export const mockBatchCommit = jest.fn();
export const mockBatchUpdate = jest.fn();
export const mockBatchSet = jest.fn();

export class AutoId {
  static newId(): string {
    // Alphanumeric characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  }
}

export function buildDocFromHash(hash: any = {}) {
  const id = hash.id || AutoId.newId();
  return {
    exists: !!hash || false,
    id,
    data() {
      const copy = { ...hash };
      // delete copy.id
      copy.id = id;
      return copy;
    },
  };
}

export function idHasCollectionName(id: string) {
  return id.match('/');
}

export function buildQuerySnapShot(requestedRecords: any[]) {
  const multipleRecords = requestedRecords.filter((rec: any) => !!rec);
  const docs = multipleRecords.map(buildDocFromHash);

  return {
    empty: multipleRecords.length < 1,
    docs,
    forEach(
      callback: (
        value: { exists: boolean; id: any; data(): any },
        index: number,
        array: { exists: boolean; id: any; data(): any }[],
      ) => void,
    ) {
      return docs.forEach(callback);
    },
  };
}

export interface MockFirestoreDatabase<T = any> {
  getDatabase: () => T;
  setDatabase: (newData: T) => T;
  mergeDatabase: (updateData: Partial<T>) => T;
}

export const mockDatabaseConstructor = jest.fn(
  (startData: any = {}): MockFirestoreDatabase => {
    let data = startData;
    return {
      getDatabase: () => data,
      setDatabase: newData => {
        data = newData;
        return data;
      },
      mergeDatabase: updateData => {
        data = merge(data, updateData); // deep merge
        return data;
      },
    };
  },
);
const mockDatabase = mockDatabaseConstructor();

export class MockFirestore {
  isFetchingSingle: boolean;
  database: MockFirestoreDatabase;
  _collectionName: string;
  recordToFetch: any;

  // static Timestamp = realAdmin.firestore.Timestamp
  static get Timestamp() {
    const realAdmin = jest.requireActual('firebase-admin');
    return realAdmin.firestore.Timestamp;
  }

  constructor(stubbedDatabase: MockFirestoreDatabase = mockDatabase) {
    this.isFetchingSingle = false;
    this.database = stubbedDatabase;
  }

  set collectionName(collectionName: string) {
    this._collectionName = collectionName;
    this.recordToFetch = null;
  }

  get collectionName() {
    return this._collectionName;
  }

  collection(collectionName: string, ...args: any[]) {
    this.isFetchingSingle = false;
    this.collectionName = collectionName;
    mockCollection([collectionName, ...args]);
    return this;
  }

  collectionGroup(collectionName: string, ...args: any[]) {
    this.isFetchingSingle = false;
    this.collectionName = collectionName;
    mockCollectionGroup([collectionName, ...args]);
    return this;
  }

  where(fieldPath: any, opStr: any, value: any) {
    this.isFetchingSingle = false;
    mockWhere(fieldPath, opStr, value);
    return this;
  }

  get(...args: any[]) {
    const result = mockGet(...args);
    if (!!result) {
      return Promise.resolve(buildDocFromHash(result));
    }
    if (this.recordToFetch) {
      return Promise.resolve(buildDocFromHash(this.recordToFetch));
    }
    let contentToReturn;
    const database = this.database.getDatabase();
    const requestedRecords = database[this.collectionName] || [];
    if (this.isFetchingSingle) {
      if (requestedRecords.length < 1 || !this.recordToFetch) {
        contentToReturn = { exists: false };
      } else if (Array.isArray(requestedRecords)) {
        contentToReturn = buildDocFromHash(requestedRecords[0]);
      } else {
        contentToReturn = buildDocFromHash(requestedRecords);
      }
    } else {
      contentToReturn = buildQuerySnapShot(requestedRecords);
    }

    return Promise.resolve(contentToReturn);
  }

  getAll(...args: any[]) {
    const database = this.database.getDatabase();
    const requestedRecords = database[this.collectionName];

    mockGetAll(...args);

    const records = requestedRecords
      .map((record: any) => buildDocFromHash(record))
      .filter((record: any) => !!record.id);

    return Promise.resolve(records);
  }

  batch(...args: any[]) {
    mockBatch(...args);
    return {
      delete() {
        mockBatchDelete(...args);
      },
      set() {
        mockBatchSet(...args);
      },
      update() {
        mockBatchUpdate(...args);
      },
      commit() {
        mockBatchCommit(...args);
        return Promise.resolve();
      },
    };
  }

  doc(id: string) {
    if (idHasCollectionName(id)) {
      const pathArray = id.split('/');
      id = pathArray.pop();
      this.collectionName = pathArray.join('/');
    }

    const result = mockDoc(id);
    this.isFetchingSingle = true;
    const database = this.database.getDatabase();
    const records = database[this.collectionName] || [];
    this.recordToFetch = result || records.find((record: any) => record.id === id);
    return this;
  }

  update(object: any, ...args: any[]) {
    mockUpdate([object, ...args]);
    return Promise.resolve(buildDocFromHash(object));
  }

  set(object: any, ...args: any[]) {
    mockSet([object, ...args]);
    return Promise.resolve(buildDocFromHash(object));
  }

  add(object: any, ...args: any[]) {
    mockAdd([object, ...args]);
    return Promise.resolve(buildDocFromHash(object));
  }

  delete(...args: any[]) {
    mockDelete(...args);
    return Promise.resolve();
  }

  orderBy(...args: any[]) {
    mockOrderBy(...args);
    return this;
  }

  limit(...args: any[]) {
    mockLimit(...args);
    return this;
  }

  settings(...args: any[]) {
    mockFirebaseSettings(args);
  }
}
