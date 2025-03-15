import { BarChart3, Package, ShoppingCart, Users } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";

const Admin = () => {

  const stats = [
    {
      name: 'Total Products',
      value: '120',
      change: '+12%',
      icon: Package,
    },
    {
      name: 'Total Orders',
      value: '450',
      change: '+24%',
      icon: ShoppingCart,
    },
    {
      name: 'Total Users',
      value: '2.4k',
      change: '+8%',
      icon: Users,
    },
    {
      name: 'Revenue',
      value: '$45.2k',
      change: '+16%',
      icon: BarChart3,
    },
  ];

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">
                {stat.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {/* Placeholder for recent orders */}
            <p className="text-muted-foreground">No recent orders to display</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Popular Products</h3>
          <div className="space-y-4">
            {/* Placeholder for popular products */}
            <p className="text-muted-foreground">No popular products to display</p>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Admin;
