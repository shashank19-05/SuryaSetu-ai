export default function Admin() {
  const users = [
    { name: 'Rahul Sharma', email: 'rahul@gmail.com', city: 'Bangalore', date: '10-Sep-2026' },
    { name: 'Priya Patel', email: 'priya@gmail.com', city: 'Mumbai', date: '10-Sep-2026' },
    { name: 'Arjun Singh', email: 'arjun@gmail.com', city: 'Delhi', date: '10-Sep-2026' },
    { name: 'Sneha Reddy', email: 'sneha@gmail.com', city: 'Hyderabad', date: '10-Sep-2026' },
    { name: 'Kiran Kumar', email: 'kiran@gmail.com', city: 'Chennai', date: '10-Sep-2026' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-orange-500 text-xl">☀️ Surya Setu AI — Admin</div>
        <span className="text-sm text-gray-500">Admin Panel</span>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">👤 Registered Users</h1>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-orange-50">
              <tr>
                <th className="text-left px-6 py-3 text-orange-600">#</th>
                <th className="text-left px-6 py-3 text-orange-600">Name</th>
                <th className="text-left px-6 py-3 text-orange-600">Email</th>
                <th className="text-left px-6 py-3 text-orange-600">City</th>
                <th className="text-left px-6 py-3 text-orange-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{i + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-gray-500">{user.city}</td>
                  <td className="px-6 py-4 text-gray-500">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}