export function convertDate(date: Date) {
  let eventDate = new Date(date);

  let hours: string;
  let minutes: string;

  if (eventDate.getHours() < 10) {
    hours = "0" + eventDate.getHours();
  } else {
    hours = eventDate.getHours().toString();
  }

  if (eventDate.getMinutes() < 10) {
    minutes = "0" + eventDate.getMinutes();
  } else {
    minutes = eventDate.getMinutes().toString();
  }

  return hours + ":" + minutes + " - " + eventDate.toDateString();
}
