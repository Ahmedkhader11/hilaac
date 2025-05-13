"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function BookingActionButtons({ bookingId }) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Update the booking status to "Confirmed"
  const handleConfirmBooking = async () => {
    setPendingAction("confirm");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("bookingId", bookingId);
      formData.append("status", "Confirmed");

      const res = await fetch("/api/bookings/update", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        alert("Update failed!");
      }
      router.refresh();
      setPendingAction(null);
    });
  };

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
    <div className="flex gap-2">
      <button
        onClick={handleConfirmBooking}
        disabled={pendingAction !== null}
        className="px-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs"
      >
        {pendingAction === "confirm" ? "Confirming." : "Confirm"}
      </button>
      <button
        onClick={handleDeleteBooking}
        disabled={pendingAction !== null}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
      >
        {pendingAction === "delete" ? "Cancelling.." : "Cancel"}
      </button>
    </div>
  );
}
