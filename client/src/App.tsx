import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import { Header } from "./components/Header";
import DatabaseStatsChart from "./components/DatabaseStatsChart";
import ActivityTable from "./components/ActivityTable";
import { Sidebar } from "./components/Sidebar";
import styles from "./App.module.scss";
import { Container } from "./components/Container";
import { Resources } from "./components/Resources";
import { Network } from "./components/Network";

interface DatabaseStats {
  datname: string;
  xact_commit: number;
  xact_rollback: number;
  numbackends: number;
}

interface Activity {
  pid: number;
  usename: string;
  application_name: string;
  client_addr: string;
  state: string;
  query: string;
}

const socket = io("ws://localhost:3001");

const App: React.FC = () => {
  const [databaseStats, setDatabaseStats] = useState<DatabaseStats[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("database-stats", (data: DatabaseStats[]) => {
      console.log("Received database stats:", data);
      setDatabaseStats(data);
    });

    socket.on("activity", (data: Activity[]) => {
      console.log("Received activity:", data);
      setActivity(data);
    });

    return () => {
      socket.off("database-stats");
      socket.off("activity");
    };
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main className={styles.content}>
        <Sidebar />
        <div className={styles.stats}>
          <Routes>
            <Route
              path="/"
              element={
                <Container>
                  <p className={styles.choose}>Выберите категорию</p>
                </Container>
              }
            />
            <Route
              path="/databases"
              element={<DatabaseStatsChart data={databaseStats} />}
            />
            <Route path="/users" element={<ActivityTable data={activity} />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/network" element={<Network />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
