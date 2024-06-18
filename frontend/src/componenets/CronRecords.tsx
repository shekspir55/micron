import { useEffect, useState } from "react";

import {
  CronRecord,
  bombardCronRecord,
  createCronRecord,
  deleteCronRecord,
  getCronRecords,
  updateCronRecord,
} from "../api/cron-record.api";

export const CronRecords = () => {
  const [cronRecords, setCronRecords] = useState<CronRecord[]>([]);
  const [editingCronRecord, setEditingCronRecord] =
    useState<CronRecord | null>();
  const [schedule, setSchedule] = useState("30 5 * * 1,6");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await deleteCronRecord(id);
        setCronRecords(cronRecords.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete cron record", error);
      alert(
        "Failed to delete cron record, please reload the page or contact the developer."
      );
    }
  };

  const handleUpdate = async () => {
    if (!editingCronRecord) {
      return;
    }

    try {
      const updatedRecord = await updateCronRecord(
        editingCronRecord.id,
        schedule
      );

      setCronRecords(
        cronRecords.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
      );
      setEditingCronRecord(null);
    } catch (error) {
      console.error("Failed to update cron record", error);
      alert(
        "Failed to update cron record, please reload the page or contact the developer."
      );
    }
  };

  const handleCreate = async () => {
    try {
      const newRecord = await createCronRecord(schedule);
      setCronRecords([newRecord, ...cronRecords]);
    } catch (error) {
      console.error("Failed to create new cron record", error);
      alert(
        "Failed to create new cron record, please reload the page or contact the developer."
      );
    }
  };

  const handleBombard = async () => {
    try {
      window.confirm("Are you sure you want to bombard with 10000 records?");
      setLoading(true);
      const records = await bombardCronRecord();
      setCronRecords(records);
      setLoading(false);
    } catch (error) {
      console.error("Failed to bombard", error);
      alert(
        "Failed to bombard, please reload the page or contact the developer."
      );
    }
  };

  useEffect(() => {
    const fetchCronRecords = async () => {
      try {
        const cronRecords = await getCronRecords();
        setCronRecords(cronRecords);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cron records", error);
        alert(
          "Failed to fetch cron records, please reload the page or contact the developer."
        );
      }
    };

    fetchCronRecords();
  }, []);

  const headLine = <h1>Cron Records</h1>;
  if (loading) {
    return (
      <div>
        {headLine}
        Loading...
      </div>
    );
  }

  return (
    <div>
      {headLine}
      <h3>In order to create 10K cron jobs click the button below.</h3>
      <button className="big-button" onClick={() => handleBombard()}>
        ‼️ bombard with a 10000 records‼️
      </button>
      <hr />
      <div>
        <h2>
          {editingCronRecord?.id
            ? "✏️ Editing record with ID: " + editingCronRecord.id
            : "➕ Create record"}{" "}
          Cron Record
        </h2>{" "}
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button
          className="big-button"
          onClick={() =>
            editingCronRecord?.id ? handleUpdate() : handleCreate()
          }
        >
          💾 {editingCronRecord?.id ? "Update" : "Create"}
        </button>{" "}
        {editingCronRecord?.id && (
          <button
            className="big-button"
            onClick={() => setEditingCronRecord(null)}
          >
            🚫 Cancel
          </button>
        )}
      </div>
      <hr />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Schedule</th>
            <th>Next Run Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cronRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.schedule}</td>
              <td>{record.nextRunTime}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingCronRecord(record);
                    setSchedule(record.schedule);
                  }}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(record.id)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p> Visible limit is 20K records.</p>
    </div>
  );
};
