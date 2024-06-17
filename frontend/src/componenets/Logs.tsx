import { useEffect, useState } from "react";
import { Log, getLogs } from "../api/logs";

export const Logs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await getLogs();
        setLoading(false);
        setLogs(logs);
      } catch (error) {
        console.error("Failed to fetch logs", error);
        alert(
          "Failed to fetch logs, please reload the page or contact the developer."
        );
      }
    };

    const logFetchingInterval = setInterval(fetchLogs, 5000);

    return () => clearInterval(logFetchingInterval);
  }, []);

  const headLine = <h1>Logs</h1>;
  if (loading) {
    return (
      <div>
        {headLine}
        Loading...
      </div>
    );
  }

  return (
    <>
      {headLine}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Time</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.timestamp}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
