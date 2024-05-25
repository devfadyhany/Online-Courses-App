"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();

  return (
    <>
      <div style={{margin: 100+`px`, color: "white"}}>Details For Course:{params.id}</div>
    </>
  );
}
