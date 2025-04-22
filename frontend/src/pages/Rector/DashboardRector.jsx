import { FaHome, FaUserGraduate, FaTools, FaCheckCircle } from "react-icons/fa";

export default function DashboardRector() {
  const cards = [
    {
      title: "View Assigned Hostels",
      icon: <FaHome className="text-blue-500 text-4xl" />,
      description: "See the hostels allocated to you and manage them efficiently.",
    },
    {
      title: "Manage Students",
      icon: <FaUserGraduate className="text-green-500 text-4xl" />,
      description: "Add, remove, or update student data under your hostels.",
    },
    {
      title: "Check Complaints",
      icon: <FaTools className="text-yellow-500 text-4xl" />,
      description: "Review and resolve student complaints regarding facilities.",
    },
    {
      title: "Approve Leaves",
      icon: <FaCheckCircle className="text-purple-500 text-4xl" />,
      description: "View leave requests and approve or reject them quickly.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">👨‍🏫 Rector Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex items-start gap-4"
            >
              {card.icon}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-1">{card.title}</h2>
                <p className="text-gray-500 text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
