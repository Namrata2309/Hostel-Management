import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PostNotice = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = async () => {
    if (!title || !message) return toast.error("Please fill in both fields");

    try {
      await axios.post("/api/notice", {
        title,
        message,
        createdAt: new Date(),
      });

      toast.success("📢 Notice posted!");
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to post notice.");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-6 text-center">
          📢 Post a New Notice
        </h2>

        <div className="space-y-4 sm:space-y-5">
          <input
            type="text"
            placeholder="Notice Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows="5"
            placeholder="Notice Message"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handlePost}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 text-sm sm:text-base"
          >
            Post Notice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostNotice;
