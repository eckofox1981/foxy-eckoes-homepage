import type { Booking } from "./Booking";

export class User {
  userID: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  bookings: Booking[];
  role: string;
  openIdProvider: string;

  constructor(
    userID: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    bookings: Booking[],
    role: string,
    openIdProvider: string
  ) {
    this.userID = userID;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.bookings = bookings;
    this.role = role;
    this.openIdProvider = openIdProvider;
  }
}
