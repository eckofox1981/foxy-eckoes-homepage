import { User } from "../models/User";
import "../styles/buttons.css";
import "../styles/account.css";
import { Bars } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { getUser } from "../api/UserRequests";
import { deleteToken, getToken } from "../localstorage/Token";
import { useNavigate } from "react-router-dom";
import { UserBookings } from "../components/UserBookings";
import { AdminControls } from "../components/AdminControls";
import { useLoginBtnStore } from "../store/LoginBtnStore";

export function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const setLoginBtnToLogin = useLoginBtnStore((store) => store.setToLogin);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token: string | undefined = getToken();
      if (token === undefined) {
        navigate("/login");
        //todo: toast?
        console.log("not logged in");

        return;
      }
      const fetched: User = await getUser(token);
      setUser(fetched);
    };

    fetchUser();
  }, []);

  const handleLogOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      deleteToken();
      setLoginBtnToLogin();
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <main>
      {user === null ? (
        <div className="loadingList">
          <Bars
            height={80}
            width={80}
            color="var(--special-color)"
            ariaLabel="Fetching list"
          />
          <p>Loading...</p>
        </div>
      ) : (
        <>
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
            <div>
              <button className="menu-button">Edit</button> <br />
              <button
                className="cancel-button"
                style={{ height: "3rem", fontSize: "1.25rem" }}
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          </section>
          <section className="user-bookings">
            <UserBookings bookings={user.bookings} />
          </section>
          {user.role === "admin" && <AdminControls />}
        </>
      )}
    </main>
  );
}
