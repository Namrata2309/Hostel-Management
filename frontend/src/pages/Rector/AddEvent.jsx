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
    setEvent(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">📅 Add Hostel Event</h2>
      <div className="space-y-4">
        <input className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" name="title" value={event.title} onChange={handleChange} placeholder="Event Title" />
        <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" name="description" value={event.description} onChange={handleChange} placeholder="Event Description" />
        <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" name="date" value={event.date} onChange={handleChange} />
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition">Add Event</button>
      </div>
    </div>
  );
};

export default AddEvent;
