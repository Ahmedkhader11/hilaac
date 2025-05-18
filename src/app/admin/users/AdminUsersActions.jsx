"use client";
import { useState } from "react";

export default function AdminUsersActions({ userId, currentRole }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRoleChange = async (newRole) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint =
        newRole === "remove" ? "/api/admin/remove-role" : "/api/admin/set-role";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          role: newRole === "remove" ? null : newRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Update failed");
      }

      // Refresh the page after successful update
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={() => handleRoleChange("admin")}
        disabled={loading || currentRole === "admin"}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Updating..." : "Make Admin"}
      </button>

      <button
        onClick={() => handleRoleChange("moderator")}
        disabled={loading || currentRole === "moderator"}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Updating..." : "Make Moderator"}
      </button>

      <button
        onClick={() => handleRoleChange("remove")}
        disabled={loading || currentRole === "user"}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Updating..." : "Remove Role"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
