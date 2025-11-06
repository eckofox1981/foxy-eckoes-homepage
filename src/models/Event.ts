export class Event {
  eventId: string;
  date: Date;
  performer: string;
  description: string;
  location: string;
  pictureUrl: string;
  tags: string[];
  numberOfSeats: number;
  numberOfSeatsLeft: number;
  numberOfBookings: number;

  constructor(
    eventId: string,
    date: Date,
    performer: string,
    description: string,
    location: string,
    pictureUrl: string,
    tags: string[],
    numberOfSeats: number,
    numberOfSeatsLeft: number,
    numberOfBookings: number
  ) {
    this.eventId = eventId;
    this.date = date;
    this.performer = performer;
    this.description = description;
    this.location = location;
    this.pictureUrl = pictureUrl;
    this.tags = tags;
    this.numberOfSeats = numberOfSeats;
    this.numberOfSeatsLeft = numberOfSeatsLeft;
    this.numberOfBookings = numberOfBookings;
  }
}

export class EventFilterDTO {
  fromDate: Date;
  toDate: Date;
  performer: string;
  location: string;
  tags: string[];

  constructor(
    fromDate: Date,
    toDate: Date,
    performer: string,
    location: string,
    tags: string[]
  ) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.performer = performer;
    this.location = location;
    this.tags = tags;
  }
}

export class NewEvent {
  date: Date;
  performer: string;
  description: string;
  location: string;
  pictureUrl: string;
  tags: string[];
  numberOfSeats: number;

  constructor(
    date: Date,
    performer: string,
    description: string,
    location: string,
    pictureUrl: string,
    tags: string[],
    numberOfSeats: number
  ) {
    this.date = date;
    this.performer = performer;
    this.description = description;
    this.location = location;
    this.pictureUrl = pictureUrl;
    this.tags = tags;
    this.numberOfSeats = numberOfSeats;
  }
}

export class ControlReport {
  title: string;
  eventsUpdated: string[];
  text: string;

  constructor(title: string, eventsUpdated: string[], text: string) {
    this.title = title;
    this.eventsUpdated = eventsUpdated;
    this.text = text;
  }
}
