import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Star, Archive, Trash2, Search } from "lucide-react";
import MessageCard from "./elements/MessageCard";
import { useContactStore } from "../../../store/useContectStore";
import toast from "react-hot-toast";

// Types
interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
  seenTimestamp: string;
}

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleString("en-GB", options);

  // Convert AM/PM to uppercase
  return formattedDate.replace(/(am|pm)/i, (match) => match.toUpperCase());
};

const MessagesTab = () => {
  // State

  const { fetchAllMessage, messages, markAsRead, deleteMessage } =
    useContactStore();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<
    "all" | "unread" | "starred" | "archived"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState("");

  // Effects
  useEffect(() => {
    fetchAllMessage();
  }, [fetchAllMessage, markAsRead]);

  // Handlers
  const handleMessageSelect = async (_id: string) => {
    if (messages) {
      const message = messages.find((m) => m._id === _id);
      if (message && !message.read) {
        try {
          // Call markAsRead from Zustand store to update backend
          await markAsRead(_id);
        } catch (error) {
          console.error("Error marking message as read:", error);
        }
      }
      setSelectedMessage(message || null);
      setReplyMode(false);
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this message?")) {
        await deleteMessage(_id);
      }
    } catch (error: any) {
      toast.error("Error deleting message:", error);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      // await fetch(`/api/messages/${selectedMessage.id}/reply`, {
      //   method: 'POST',
      //   body: JSON.stringify({ message: replyText }),
      // });

      // For demo purposes, just clear the reply
      setReplyText("");
      setReplyMode(false);

      // You might want to add the reply to the message thread
      // or refresh the messages
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleStar = async (id: string) => {
    try {
      // await fetch(`/api/messages/${id}/star`, { method: 'PUT' });
      setMessages(
        messages?.map((m) => (m._id === id ? { ...m, starred: !m.starred } : m))
      );
    } catch (error) {
      console.error("Error starring message:", error);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      // await fetch(`/api/messages/${id}/archive`, { method: 'PUT' });
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, archived: !m.archived } : m))
      );
    } catch (error) {
      console.error("Error archiving message:", error);
    }
  };

  // Filter messages
  const filteredMessages = messages?.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());

    switch (filter) {
      case "unread":
        return !message.read && matchesSearch;
      case "starred":
        return message.starred && matchesSearch;
      case "archived":
        return message.archived && matchesSearch;
      default:
        return !message.archived && matchesSearch;
    }
  });

  return (
    <div className="h-[calc(100vh-6rem)] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-96 bg-white dark:bg-secondary/20 border-r dark:border-gray-700 flex flex-col">
        {/* Search and Filter */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${
                  filter === "all"
                    ? "bg-accent text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${
                  filter === "unread"
                    ? "bg-accent text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter("starred")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${
                  filter === "starred"
                    ? "bg-accent text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              Starred
            </button>
            <button
              onClick={() => setFilter("archived")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${
                  filter === "archived"
                    ? "bg-accent text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              Archived
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {filteredMessages &&
              filteredMessages.map((message) => (
                <MessageCard
                  key={message?._id}
                  message={message}
                  isSelected={selectedMessage?._id === message?._id}
                  onSelect={handleMessageSelect}
                  onStar={handleStar}
                  onArchive={handleArchive}
                  onDelete={handleDelete}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Message Detail */}
      <div className="hidden md:flex flex-1 bg-gray-50 dark:bg-gray-900">
        {selectedMessage ? (
          <div className="flex-1 flex flex-col">
            {/* Message Header */}
            <div className="p-6 bg-white dark:bg-secondary/20 border-b dark:border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>From: {selectedMessage.name}</span>
                    <span>({selectedMessage.email})</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStar(selectedMessage._id)}
                    className={`p-2 rounded-lg transition-colors duration-200
                      ${
                        selectedMessage.starred
                          ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
                      }`}
                  >
                    <Star
                      size={20}
                      className={selectedMessage.starred ? "fill-current" : ""}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleArchive(selectedMessage._id)}
                    className={`p-2 rounded-lg transition-colors duration-200
                      ${
                        selectedMessage.archived
                          ? "bg-purple-100 dark:bg-purple-500/20 text-purple-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
                      }`}
                  >
                    <Archive size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {selectedMessage.read ? "Seen" : "Unread"} -{" "}
                {formatDate(selectedMessage.seenTimestamp)}
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            {/* Reply Section */}
            <div className="p-6 bg-white dark:bg-secondary/20 border-t dark:border-gray-700">
              {replyMode ? (
                <div className="space-y-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-accent resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setReplyMode(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReply}
                      className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors duration-200"
                    >
                      Send Reply
                    </motion.button>
                  </div>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setReplyMode(true)}
                  className="w-full p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-accent hover:text-accent transition-all duration-200"
                >
                  Click to Reply
                </motion.button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Mail className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No Message Selected
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Select a message from the list to view its contents
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesTab;
