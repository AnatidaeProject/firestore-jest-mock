import type { firestore } from 'firebase-admin';

export const mockTimestampToDate = jest.fn();
export const mockTimestampToMillis = jest.fn();
export const mockTimestampFromDate = jest.fn();
export const mockTimestampFromMillis = jest.fn();
export const mockTimestampNow = jest.fn();

export class Timestamp implements firestore.Timestamp {
  seconds: number;
  nanoseconds: number;

  constructor(seconds, nanoseconds) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }

  isEqual(other) {
    return (
      other instanceof Timestamp &&
      other.seconds === this.seconds &&
      other.nanoseconds === this.nanoseconds
    );
  }

  toDate() {
    const d = new Date(0);
    d.setTime(this.seconds * 1000);
    d.setMilliseconds(this.nanoseconds / 1000000);
    return mockTimestampToDate(...arguments) || d;
  }

  toMillis() {
    const d = new Date(0);
    d.setSeconds(this.seconds);
    d.setMilliseconds(this.nanoseconds / 1000000);
    return mockTimestampToMillis(...arguments) || d.getMilliseconds();
  }

  valueOf() {
    return JSON.stringify(this.toMillis());
  }

  static fromDate(date) {
    return (
      mockTimestampFromDate(...arguments) ||
      new Timestamp(date.getTime() * 0.001, date.getMilliseconds() * 1000000)
    );
  }

  static fromMillis(millis) {
    const d = new Date(0);
    d.setMilliseconds(millis);
    return mockTimestampFromMillis(...arguments) || Timestamp.fromDate(d);
  }

  static now() {
    const now = new Date();
    return mockTimestampNow(...arguments) || Timestamp.fromDate(now);
  }
}
