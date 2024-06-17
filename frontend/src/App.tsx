import "./App.css";

import { CronRecords } from "./componenets/CronRecords";
import { Logs } from "./componenets/Logs";

function App() {
  return (
    <div className="side-by-side">
      <CronRecords />
      <Logs />
    </div>
  );
}

export default App;
