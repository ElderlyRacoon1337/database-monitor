import React from "react";
import image from "../assets/memory.png";
import { Container } from "./Container";

export const Network = () => {
  return (
    <Container>
      {/* <img width={800} src={image} /> */}
      <iframe
        src="http://localhost:3000/d-solo/edmbagetv9gqod/new-dashboard?orgId=1&refresh=1s&theme=light&panelId=6"
        width="800"
        height="200"
        frameBorder="0"
        style={{ marginBottom: "50px", marginTop: "20px" }}
      ></iframe>
      <iframe
        src="http://localhost:3000/d-solo/edmbagetv9gqod/new-dashboard?orgId=1&refresh=1s&theme=light&panelId=7"
        width="800"
        height="200"
        frameBorder="0"
      ></iframe>
    </Container>
  );
};
