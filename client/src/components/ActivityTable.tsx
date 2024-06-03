import React from "react";
import { Container } from "./Container";

interface Activity {
  pid: number;
  usename: string;
  application_name: string;
  client_addr: string;
  state: string;
  query: string;
}

interface Props {
  data: Activity[];
}

const ActivityTable: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>Username</th>
            <th>Application</th>
            <th>Client Address</th>
            <th>State</th>
            <th>Query</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.pid}>
              <td>{row.pid}</td>
              <td>{row.usename}</td>
              <td>{row.application_name}</td>
              <td>{row.client_addr}</td>
              <td>{row.state}</td>
              <td>{row.query}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ActivityTable;
