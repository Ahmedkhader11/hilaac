"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
export default function AdminReportsPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = [];
    if (startDate) params.push(`start=${startDate}`);
    if (endDate) params.push(`end=${endDate}`);
    const query = params.length ? `?${params.join("&")}` : "";
    fetch(`/api/admin/reports${query}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading)
    return (
      <div className="flex justify-center items-center text-2xl text-center text-white">
        Loading report...
      </div>
    );
  if (!report)
    return (
      <div className="flex justify-center items-center text-2xl text-center text-white">
        Failed to load report.
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Admin Reports</h1>
      {/* Date Range Filter */}
      <div className="flex flex-wrap gap-4 justify-end mb-6">
        <h3 className="text-lg font-bold leading-18">Filter: </h3>
        <div>
          <label className="block mb-1 text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1 rounded border"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-2 py-1 rounded border"
          />
        </div>
        {(startDate || endDate) && (
          <button
            className="px-3 py-2 ml-2 text-sm font-medium bg-red-500 rounded hover:bg-gray-400"
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
          >
            Clear
          </button>
        )}
      </div>
      {/* 1. Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 text-black bg-white rounded shadow">
          <h2 className="font-semibold">Total Users</h2>
          <p className="text-3xl">{report.totalUsers}</p>
        </div>
        <div className="p-4 text-black bg-white rounded shadow">
          <h2 className="font-semibold">Total Bookings</h2>
          <p className="text-3xl">{report.totalBookings}</p>
        </div>
        <div className="p-4 text-black bg-white rounded shadow">
          <h2 className="font-semibold">Total Revenue</h2>
          <p className="text-3xl">${report.totalRevenue}</p>
        </div>
        <div className="p-4 text-black bg-white rounded shadow">
          <h2 className="font-semibold">Active Users (30 days)</h2>
          <p className="text-3xl">{report.activeUsersCount}</p>
        </div>
      </div>
      {/* Bookings Per Month Chart */}
      {report.bookingsPerMonth && report.bookingsPerMonth.length > 0 && (
        <div className="p-4 mt-8 text-black bg-white rounded shadow">
          <h2 className="mb-4 font-semibold">Bookings Per Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={report.bookingsPerMonth.map((item) => ({
                month: item._id,
                count: item.count,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* Most Popular Rooms */}
      {report.popularRooms && report.popularRooms.length > 0 && (
        <div className="p-4 mt-8 text-black bg-white rounded shadow">
          <h2 className="mb-4 font-semibold">Most Popular Rooms</h2>
          <ul>
            {report.popularRooms.map((room, idx) => (
              <li
                key={room._id || idx}
                className="flex justify-between py-2 border-b last:border-b-0"
              >
                <span>{room._id || "Unknown Room"}</span>
                <span>Bookings: {room.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Recent Bookings */}
      {report.recentBookings && report.recentBookings.length > 0 && (
        <div className="p-4 mt-8 text-black bg-white rounded shadow">
          <h2 className="mb-4 font-semibold">Recent Bookings</h2>
          <ul>
            {report.recentBookings.map((booking) => (
              <li
                key={booking._id}
                className="flex flex-col py-2 border-b last:border-b-0 md:flex-row md:justify-between"
              >
                <span>
                  <strong>Room:</strong> {booking.room?.name || "Unknown"}
                </span>
                <span>
                  <strong>User:</strong> {booking.userId}
                </span>
                <span>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
