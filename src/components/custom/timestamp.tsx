"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";

type Props = {
  date: Date;
};

export default function Timestamp({ date }: Props) {
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  return (
    <p className="text-sm text-gray-800">
      {timeAgo.replace("about", "").trim()}
    </p>
  );
}