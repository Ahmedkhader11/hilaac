import { clerkClient } from "@clerk/nextjs/server";
import { setRole, removeRole, deleteUser } from "../actions"; // Import the new action

export default async function Admin() {
  // Fetch the list of users from Clerk.
  const client = await clerkClient();
  const users = (await client.users.getUserList()).data;

  return (
    <div className="container mx-auto px-4 py-4 ring">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-500 text-white">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`${
                index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-200"
              } text-gray-800`}
            >
              <td className="border border-gray-300 px-4 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.publicMetadata.role || "user"}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <form action={setRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors cursor-pointer"
                  >
                    Make Admin
                  </button>
                </form>
                <form action={removeRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded transition-colors cursor-pointer"
                  >
                    Remove Role
                  </button>
                </form>
                <form action={deleteUser} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
