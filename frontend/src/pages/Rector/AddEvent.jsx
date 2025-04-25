import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AddEvent = () => {
  const [event, setEvent] = useState({ title: "", description: "", date: "" });
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const backUrl = import.meta.env.VITE_BACKEND_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If user is picking a date without time (e.g., from calendar)
    if (name === "date" && value.length === 10) {
      // Append default 12:00 AM time
      const defaultTime = "T00:00";
      setEvent((prev) => ({ ...prev, [name]: value + defaultTime }));
    } else {
      setEvent((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      setEvents(res.data);
    } catch {
      toast.error("Failed to fetch events.");
    }
  };

  const resetForm = () => {
    setEvent({ title: "", description: "", date: "" });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!event.title.trim() || !event.date.trim()) {
      toast.error("Please enter both title and date.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${backUrl}/api/events/${editingId}`, event);
        toast.success("Event updated!");
      } else {
        await axios.post("/api/events", event);
        toast.success("Event added!");
      }
      resetForm();
      fetchEvents();
    } catch {
      toast.error("Failed to save event.");
    }
  };

  const handleEdit = (ev) => {
    setEvent({ title: ev.title, description: ev.description, date: ev.date });
    setEditingId(ev._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backUrl}/api/events/${id}`);
      toast.success("Event deleted!");
      fetchEvents();
    } catch {
      toast.error("Failed to delete event.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = filterDate
    ? events.filter((ev) => {
        const evDate = new Date(ev.date).toDateString();
        const selectedDate = new Date(filterDate).toDateString();
        return evDate === selectedDate;
      })
    : events;

  const paginatedEvents = filteredEvents.slice(0, page * pageSize);

  return (
    <div className="w-full px-4 py-14">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          {editingId ? "✏️ Edit Event" : "📅 Add Hostel Event"}
        </h2>
        <div className="space-y-4">
          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <input
            type="datetime-local"
             name="date"
            value={event.date || ""}
            onChange={handleChange}
            placeholder="Select date and time (defaults to 12:00 AM)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />


          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
            >
              {editingId ? "Update Event" : "Add Event"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 📋 Filter by Date */}
      <div className="max-w-2xl mx-auto mt-6">
        <label className="block text-sm mb-2 text-gray-700">Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* 📜 Events List */}
      <div className="max-w-2xl mx-auto mt-6">
        <h3 className="text-lg font-semibold text-indigo-700 mb-4">Events</h3>
        {paginatedEvents.length > 0 ? (
          <ul className="space-y-4">
            {paginatedEvents.map((ev) => (
              <li key={ev._id} className="bg-gray-50 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-indigo-600">{ev.title}</h4>
                    <p className="text-sm text-gray-600">{ev.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      📅{" "}
                      {new Date(ev.date).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(ev)}
                      className="text-indigo-500 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ev._id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No events found.</p>
        )}

        {/* 📄 Load More */}
        {filteredEvents.length > paginatedEvents.length && (
          <div className="text-center mt-4">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEvent;
