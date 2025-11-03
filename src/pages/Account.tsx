import { User } from "../models/User";
import "../styles/buttons.css";
import "../styles/account.css";

export function AccountPage() {
  const user = new User(
    "1234-abcd-4567-efgh-7890",
    "eckofox",
    "Richard",
    "Nixon",
    "r.nawdwwdwixon@us.gov",
    [],
    "user",
    ""
  );

  return (
    <main>
      <h1>Account page</h1>
      <i>User ID: {user.userID}</i>
      <section className="user-section">
        <div className="user-details">
          <div className="user-detail">
            <b>Username: </b>
            <p>{user.username}</p>
          </div>
          <div className="user-detail">
            <b>Name: </b>
            <p>
              {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="user-detail">
            <b>E-mail: </b>
            <p>{user.email}</p>
          </div>
        </div>
        <button className="menu-button">Edit</button>
      </section>
      <section className="user-bookings">//TODO: implement bookings</section>
    </main>
  );
}
