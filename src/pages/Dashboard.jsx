export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-700 mb-2">
        Welcome to the admin dashboard. Here you can manage concerts, users, and
        view analytics.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Concerts</h2>
          <p>Manage all concerts and events.</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p>View and manage registered users.</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p>See statistics and reports.</p>
        </div>
      </div>
    </div>
  );
}
