import { motion } from "framer-motion";
import {
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  Briefcase,
  Wrench,
  FileText,
  Mail,
} from "lucide-react";

const StatCard = ({ icon: Icon, label, value, trend }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-secondary/20 p-6 rounded-xl shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <h3 className="text-2xl font-bold mt-1 dark:text-white">{value}</h3>
      </div>
      <div className="p-3 bg-accent/10 rounded-lg">
        <Icon className="w-6 h-6 text-accent" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        <span className="text-green-500">{trend}</span>
      </div>
    )}
  </motion.div>
);

const QuickAction = ({ icon: Icon, label, onClick }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className="flex items-center p-4 bg-white dark:bg-secondary/20 rounded-lg hover:shadow-md transition-shadow"
  >
    <div className="p-2 bg-accent/10 rounded-lg mr-3">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <span className="text-sm font-medium dark:text-white">{label}</span>
  </motion.button>
);

const Dashboard = () => {
  const stats = [
    {
      icon: Users,
      label: "Total Visitors",
      value: "1,234",
      trend: "+12.5% this week",
    },
    {
      icon: Eye,
      label: "Page Views",
      value: "5,678",
      trend: "+8.2% this week",
    },
    { icon: MessageSquare, label: "Messages", value: "25", trend: "3 unread" },
    { icon: Briefcase, label: "Projects", value: "12", trend: "2 in progress" },
  ];

  const quickActions = [
    { icon: Briefcase, label: "Add New Project", onClick: () => {} },
    { icon: Wrench, label: "Update Skills", onClick: () => {} },
    { icon: FileText, label: "Write Blog Post", onClick: () => {} },
    { icon: Mail, label: "Check Messages", onClick: () => {} },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold dark:text-white mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <QuickAction key={action.label} {...action} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-secondary/20 p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center py-2 border-b dark:border-secondary/30 last:border-0"
              >
                <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                <div>
                  <p className="text-sm dark:text-white">
                    Updated project details
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-secondary/20 p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold dark:text-white mb-4">
            Performance Overview
          </h2>
          <div className="space-y-4">
            {["Page Load Time", "Bounce Rate", "Session Duration"].map(
              (metric) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="dark:text-white">{metric}</span>
                    <span className="text-accent">Good</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-secondary/40 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-4/5 rounded-full" />
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
