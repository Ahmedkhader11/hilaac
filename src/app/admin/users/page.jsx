import { clerkClient } from "@clerk/nextjs/server";
import { setRole, removeRole, deleteUser } from "../actions"; // Import the new action

export default async function Admin() {
  // Fetch the list of users from Clerk.
  const client = await clerkClient();
  const users = (await client.users.getUserList()).data;

  return (
    <div className="container mx-auto px-4 py-4 ring">
      {users.map((user, index) => (
        <div
          key={user.id}
          className={`flex flex-col md:flex-row items-center justify-between gap-4 p-6 my-2 rounded-sm shadow transition-colors
            ${
              index % 2 === 0
                ? "bg-indigo-100 dark:bg-indigo-500"
                : "bg-indigo-200 dark:bg-indigo-400"
            }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {user.publicMetadata.role || "user"}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <form action={setRole} className="inline">
              <input type="hidden" value={user.id} name="id" />
              <input type="hidden" value="admin" name="role" />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors cursor-pointer"
              >
                Make Admin
              </button>
            </form>
            <form action={removeRole} className="inline">
              <input type="hidden" value={user.id} name="id" />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded transition-colors cursor-pointer"
              >
                Remove Role
              </button>
            </form>
            <form action={deleteUser} className="inline">
              <input type="hidden" value={user.id} name="id" />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white  bg-red-600 hover:bg-red-700  rounded transition-colors cursor-pointer"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
