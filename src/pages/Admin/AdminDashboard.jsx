import React from 'react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Sales', value: '$45,285', change: '+12%', color: 'bg-blue-500' },
    { title: 'Active Orders', value: '156', change: '+5%', color: 'bg-green-500' },
    { title: 'Total Products', value: '1,245', change: '+18%', color: 'bg-purple-500' },
    { title: 'Total Customers', value: '8,432', change: '+7%', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <span className="text-xs font-bold">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex items-center justify-center text-gray-400">
          Sales Chart Placeholder
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96 flex items-center justify-center text-gray-400">
          Recent Activities Placeholder
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
