import React, { useMemo } from 'react';
import { useGetAllOrdersQuery, useGetProductsQuery } from '../../features/api/apiSlice';

const AdminDashboard = () => {
  const { data: ordersData, isLoading: isOrdersLoading } = useGetAllOrdersQuery({ limit: 1000 });
  const { data: productsData, isLoading: isProductsLoading } = useGetProductsQuery({ limit: 1 });

  const stats = useMemo(() => {
    let totalSales = 0;
    let activeOrders = 0;
    const uniqueCustomers = new Set();

    if (ordersData?.data) {
      ordersData.data.forEach((order) => {
        // Calculate Total Sales (summing up total amounts, you can exclude cancelled if needed)
        if (order.status?.toLowerCase() !== 'cancelled') {
          const amount = Number(order.total_amount);
          if (!isNaN(amount)) {
            totalSales += amount;
          }
        }

        // Calculate Active Orders
        const status = order.status?.toLowerCase() || '';
        if (['pending', 'processing'].includes(status)) {
          activeOrders += 1;
        }

        // Calculate Unique Customers
        if (order.user?._id) {
          uniqueCustomers.add(order.user._id);
        } else if (order.user?.email) {
          uniqueCustomers.add(order.user.email);
        } else if (order.user?.id) {
          uniqueCustomers.add(order.user.id);
        }
      });
    }

    const totalProducts = productsData?.meta?.total_items || 0;
    const totalCustomers = uniqueCustomers.size;

    return [
      { title: 'Total Sales', value: `$${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: 'Current', color: 'bg-blue-500' },
      { title: 'Active Orders', value: activeOrders.toString(), change: 'Pending', color: 'bg-green-500' },
      { title: 'Total Products', value: totalProducts.toString(), change: 'Catalog', color: 'bg-purple-500' },
      { title: 'Total Customers', value: totalCustomers.toString(), change: 'Unique', color: 'bg-orange-500' },
    ];
  }, [ordersData, productsData]);

  if (isOrdersLoading || isProductsLoading) {
    return (
      <div className="font-poppins flex items-center justify-center h-64 text-gray-500">
        Loading Dashboard Data...
      </div>
    );
  }

  return (
    <div className="space-y-8 font-poppins">
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

