import { clerkClient } from "@clerk/nextjs/server";
import { setRole, removeRole, deleteUser } from "../actions"; // Import the new action

export default async function Admin() {
  // Fetch the list of users from Clerk.
  const client = await clerkClient();
  const users = (await client.users.getUserList()).data;

  return (
    <div className="container mx-auto px-2 py-4 ring">
      {/* Header Section (Hidden on small screens) */}
      <div className="hidden md:grid grid-cols-4 gap-4 bg-indigo-500 text-white p-4 rounded-md text-lg font-semibold">
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>Actions</div>
      </div>

      {users.map((user, index) => (
        <div
          key={user.id}
          className={`grid grid-cols-1 md:grid-cols-4 gap-4 items-center px-2 py-2  my-2 rounded-sm shadow transition-colors ${
            index % 2 === 0
              ? "bg-indigo-100 dark:bg-indigo-500"
              : "bg-indigo-200 dark:bg-indigo-400"
          }`}
        >
          {/* Name */}
          <div className=" md:border-r-2 md:border-r-white break-words md:whitespace-normal text-lg font-semibold text-gray-800 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </div>

          <div className="text-sm md:border-r-2 md:border-r-white text-gray-600 dark:text-gray-300 break-words md:whitespace-normal">
            {
              user.emailAddresses.find(
                (email) => email.id === user.primaryEmailAddressId
              )?.emailAddress
            }
          </div>

          {/* Role */}
          <div className="text-sm md:border-r-2 md:border-r-white text-gray-600 dark:text-gray-300">
            {user.publicMetadata.role || "user"}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <form action={setRole}>
              <input type="hidden" value={user.id} name="id" />
              <input type="hidden" value="admin" name="role" />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Make Admin
              </button>
            </form>
            <form action={removeRole}>
              <input type="hidden" value={user.id} name="id" />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded transition-colors"
              >
                Remove Role
              </button>
            </form>
            <form action={deleteUser}>
              <input type="hidden" value={user.id} name="id" />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
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
