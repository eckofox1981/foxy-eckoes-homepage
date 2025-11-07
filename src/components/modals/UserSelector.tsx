import classNames from "classnames";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/UserRequests";
import { useToastStore } from "../../store/ToastStore";
import "../../styles/user-selector.css";
import { AdminUserBooking } from "../AdminUserBooking";

export function UserSelector({
  show,
  close,
}: {
  show: string;
  close: () => void;
}) {
  const [display, setDisplay] = useState<string>("hidden");
  const [allUsers, setAllUsers] = useState<Record<string, string> | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<Record<
    string,
    string
  > | null>(null);
  const [query, setQuery] = useState<string>("");
  const showToast = useToastStore((store) => store.showToast);

  useEffect(() => {
    setDisplay(show);
    const fetchAllUsers = async () => {
      try {
        const json: Record<string, string> = await getAllUsers();
        setAllUsers(json);
      } catch (error: any) {
        showToast("Error fetching users", error.message, "red");
      }
    };
    fetchAllUsers();
  }, [show]);

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  const filterUsers = () => {
    if (!allUsers) return;

    if (query === "") {
      setFilteredUsers(allUsers);
      return;
    }

    const filtered = Object.entries(allUsers).reduce(
      (acc, [userId, username]) => {
        if (username.toLowerCase().includes(query.toLowerCase())) {
          acc[userId] = username;
        }
        return acc;
      },
      {} as Record<string, string> //this is the initial value of the accumulator, set to empty
    );

    setFilteredUsers(filtered);
  };

  return (
    <section className={classNames("modal", display)}>
      <h2>
        Filter through the users or select one to see and manage their bookings
      </h2>
      <div className="user-selector">
        <label htmlFor="name-filter">Search by username:</label>
        <input
          type="text"
          id="name-filter"
          placeholder="search for a username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={filterUsers}>Search</button>
        <ul className="scrollable">
          {filteredUsers &&
            Object.entries(filteredUsers).map(([userId, username]) => (
              <AdminUserBooking
                key={userId}
                userId={userId}
                username={username}
              />
            ))}
        </ul>
        <button className="menu-button" onClick={close}>
          Close
        </button>
      </div>
    </section>
  );
}
