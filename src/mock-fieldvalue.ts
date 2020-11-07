import type { firestore } from 'firebase-admin';

export const mockArrayUnionFieldValue = jest.fn();
export const mockArrayRemoveFieldValue = jest.fn();
export const mockDeleteFieldValue = jest.fn();
export const mockIncrementFieldValue = jest.fn();
export const mockServerTimestampFieldValue = jest.fn();

export class FieldValue implements firestore.FieldValue {
  type: string;
  value: unknown;

  constructor(type, value?) {
    this.type = type;
    this.value = value;
  }

  isEqual(other) {
    return other instanceof FieldValue && other.type === this.type && other.value === this.value;
  }

  static arrayUnion(elements = []) {
    mockArrayUnionFieldValue(...arguments);
    if (!Array.isArray(elements)) {
      elements = [elements];
    }
    return new FieldValue('arrayUnion', elements);
  }

  static arrayRemove(elements) {
    mockArrayRemoveFieldValue(...arguments);
    if (!Array.isArray(elements)) {
      elements = [elements];
    }
    return new FieldValue('arrayRemove', elements);
  }

  static increment(amount = 1) {
    mockIncrementFieldValue(...arguments);
    return new FieldValue('increment', amount);
  }

  static serverTimestamp() {
    mockServerTimestampFieldValue(...arguments);
    return new FieldValue('serverTimestamp');
  }

  static delete() {
    mockDeleteFieldValue(...arguments);
    return new FieldValue('delete');
  }
}
