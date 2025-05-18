"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function BookingActionButtons({ bookingId }) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Delete the booking completely
  const handleDeleteBooking = async () => {
    setPendingAction("delete");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("bookingId", bookingId);

      const res = await fetch("/api/bookings/delete", {
        method: "DELETE",
        body: formData,
      });

      if (!res.ok) {
        alert("Deletion failed!");
      }

      router.refresh();
      setPendingAction(null);
    });
  };

  return (
    <button
      onClick={handleDeleteBooking}
      disabled={isPending}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs cursor-pointer"
    >
      {pendingAction === "delete" && isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
