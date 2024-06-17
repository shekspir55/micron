import { useEffect, useState } from "react";
import { Log, getLogs } from "../api/logs";

const fiveSeconds = 5000;
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


    // Done it this way, because the logs are not updated in real time
    // and the logs are limited by 10000 records
    // no need to websocket or long polling
    const logFetchingInterval = setInterval(fetchLogs, fiveSeconds);

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
      <h2>Note: logs limited by 10000 records</h2>
      <hr />
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
