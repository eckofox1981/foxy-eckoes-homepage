import classNames from "classnames";
import { useEffect, useState } from "react";
import "../../styles/modal.css";
import { ControlReport } from "../../models/Event";
import { useToastStore } from "../../store/ToastStore";
import { seatAvailibilityControl } from "../../api/EventRequests";

export function SeatAvailibityControl({
  show,
  close,
}: {
  show: string;
  close: () => void;
}) {
  const [display, setDisplay] = useState<string>("hidden");
  const [report, setReport] = useState<ControlReport | null>(null);
  const showToast = useToastStore((store) => store.showToast);
  useEffect(() => {
    setDisplay(show);
  }, [show]);

  const handleCancel = () => {
    close();
    setReport(null);
  };

  const handleConfirm = async () => {
    try {
      const newReport = await seatAvailibilityControl();
      setReport(newReport);
    } catch (error: any) {
      showToast("Error performing report:", error.message, "red");
    }
  };

  const PublishReport = () => {
    if (report) {
      return (
        <div>
          <h3>{report.title}</h3>
          {report.eventsUpdated.length === 0 ? (
            <p>No events changed. Database up to date.</p>
          ) : (
            <>
              <ul>
                {report.eventsUpdated.map((r) => (
                  <li>{r}</li>
                ))}
              </ul>
              <p>{report.text}</p>
            </>
          )}
          <button className="menu-button" onClick={handleCancel}>
            Close
          </button>
        </div>
      );
    }
  };

  return (
    <section className={classNames("modal", "seat-control", display)}>
      <h1>Seat Availibility Control</h1>
      <p>
        This function allows you to make sure the number of seats booked and the
        number of seats available match.
      </p>
      <p>
        The purpose of this is to make sure no discrepancies exists in the
        database.
      </p>
      <p>
        The program checks each booking against each event and correct the
        number of seats available for each.
      </p>
      <div>
        <p>Do you want to perform the control?</p>
        <button className="menu-button" onClick={handleConfirm}>
          Perform
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <PublishReport />
    </section>
  );
}
