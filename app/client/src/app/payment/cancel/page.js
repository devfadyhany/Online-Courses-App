"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function CancelPayment() {
  const router = useRouter();

  useEffect(()=>{
    toast.error("Payment Cancelled", {
      closeOnClick: true,
      autoClose: 3000,
      theme: "dark",
      onClose: router.push("/"),
    });
  },[])

  return (
    <div>Payment Cancelled</div>
  )
}

export default CancelPayment