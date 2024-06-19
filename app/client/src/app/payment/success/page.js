"use client";

import { API_URL } from "@/app/layout";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

function successPayment() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const StoreEnroll = async () => {
    await fetch(`${API_URL}enroll/StoreEnroll`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user_id: searchParams.get("user_id"),
        course_id: searchParams.get("course_id"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message, {
            closeOnClick: true,
            autoClose: 3000,
            theme: "dark",
            onClose: router.push(`/courses/${searchParams.get("course_id")}`),
          });
        }
      });
  };

  useEffect(() => {
    StoreEnroll();
  }, [searchParams]);

  return <div>successPayment</div>;
}

export default successPayment;
