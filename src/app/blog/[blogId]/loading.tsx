import { Container } from "@/components/custom/container";
import { Spinner } from "@/components/custom/spinner";
import React from "react";

export default function Loading() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}