import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setEvent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/events", event);
      toast.success("Event added!");
      setEvent({ title: "", description: "", date: "" });
    } catch {
      toast.error("Failed to add event.");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-6 text-center">
          📅 Add Hostel Event
        </h2>
        <div className="space-y-5">
          <input
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Event Title"
          />
          <textarea
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows={4}
          />
          <input
            type="date"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            name="date"
            value={event.date}
            onChange={handleChange}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition text-sm sm:text-base"
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
