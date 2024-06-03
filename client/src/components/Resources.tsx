import React from "react";
import image from "../assets/cpu.png";
import { Container } from "./Container";

export const Resources = () => {
  return (
    <Container>
      {/* <img width={800} src={image} /> */}
      <iframe
        src="http://localhost:3000/d-solo/edmbagetv9gqod/new-dashboard?orgId=1&refresh=1s&theme=light&panelId=5"
        width="800"
        height="200"
        style={{ marginBottom: "50px", marginTop: "20px" }}
        frameBorder="0"
      ></iframe>
      <iframe
        src="http://localhost:3000/d-solo/edmbagetv9gqod/new-dashboard?orgId=1&refresh=1s&theme=light&panelId=2"
        width="800"
        height="200"
        frameBorder="0"
        style={{ marginBottom: "50px" }}
      ></iframe>
    </Container>
  );
};
