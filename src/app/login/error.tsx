"use client"; // Error boundaries must be Client Components

import { Container } from "@/components/custom/container";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // In client projects you may want to log the error to an error reporting service.
    console.error(error);
  }, [error]);

  return (
    <Container>
      <p className="mb-4">Something went wrong, {error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Container>
  );
}