import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartOption } from "echarts";
import { Container } from "./Container";

interface DatabaseStats {
  datname: string;
  xact_commit: number;
  xact_rollback: number;
  numbackends: number;
}

interface Props {
  data: DatabaseStats[];
}

const DatabaseStatsChart: React.FC<Props> = ({ data }) => {
  const chartRef1 = useRef<HTMLDivElement>(null);
  const chartRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart1 = echarts.init(chartRef1.current!);
    const chart2 = echarts.init(chartRef2.current!);

    const option1: EChartOption = {
      animation: false,
      title: { text: "Транзакции базы данных" },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.datname),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Transactions Committed",
          type: "bar",
          data: data.map((item) => item.xact_commit),
        },
        {
          name: "Transactions Rolled Back",
          type: "bar",
          data: data.map((item) => item.xact_rollback),
        },
      ],
    };

    const option2: EChartOption = {
      title: { text: "Количество текущих активных подключений" },
      animation: false,
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.datname),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Number of Backends",
          type: "line",
          data: data.map((item) => item.numbackends),
        },
      ],
    };

    chart1.setOption(option1);
    chart2.setOption(option2);

    return () => {
      chart1.dispose();
      chart2.dispose();
    };
  }, [data]);

  return (
    <Container>
      <div ref={chartRef1} style={{ width: "100%", height: "400px" }}></div>
      <p className="textSecondary" style={{ marginBottom: "50px" }}>
        * Transactions Committed - это количество транзакций, которые были
        успешно завершены и зафиксированы в базе данных. Когда транзакция
        фиксируется, все изменения, сделанные в рамках этой транзакции,
        становятся постоянными и видимыми для других транзакций.
      </p>
      <div ref={chartRef2} style={{ width: "100%", height: "400px" }}></div>
      <p className="textSecondary">
        * Number of Backends — это метрика, которая показывает количество
        текущих активных подключений к базе данных. В PostgreSQL, каждое
        подключение от клиента к серверу базы данных создаёт отдельный процесс
        бэкенда. Эта метрика полезна для мониторинга нагрузки на базу данных,
        так как большое количество активных подключений может указывать на
        высокую нагрузку и потенциальные проблемы с производительностью.
      </p>
    </Container>
  );
};

export default DatabaseStatsChart;
// latency, network traffic, request per second, user
