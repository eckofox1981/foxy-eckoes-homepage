import classNames from "classnames";
import { useEffectEvent, useState } from "react";
import { User } from "../models/User";
import { useToastStore } from "../store/ToastStore";
import { getUser } from "../api/UserRequests";

export function AdminUserCard({
  userId,
  show,
  close,
}: {
  userId: string;
  show: string;
  close: string;
}) {
  const [user, setUser] = useState<User | null>(null);
  const showToast = useToastStore((store) => store.showToast);

  useEffectEvent(() => {
    const fetchUser = async () => {
      try {
        const fetched = await getUser();
      } catch (error: any) {
        showToast(
          "Error fetching user",
          "User: " + userId + " could not be fetched \n" + error.message,
          "red"
        );
      }
    };
  });

  return (
    <section className={classNames("admin-user-card", "modal", show)}>
      <h2></h2>
    </section>
  );
}
