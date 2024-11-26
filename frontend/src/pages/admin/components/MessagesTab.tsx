import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Star, Trash2, Archive, Clock } from "lucide-react";
import ActionButton from "./elements/ActionButton";

interface Message {
  id: number;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  starred: boolean;
}

const MessagesTab = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: "John Doe",
      email: "john@example.com",
      subject: "Project Inquiry",
      message: "Hi, I'm interested in working with you on a project...",
      date: "2024-03-10 14:30",
      read: false,
      starred: false,
    },
    {
      id: 2,
      sender: "Jane Smith",
      email: "jane@example.com",
      subject: "Collaboration Opportunity",
      message:
        "Hello, I came across your portfolio and would love to discuss...",
      date: "2024-03-09 09:15",
      read: true,
      starred: true,
    },
  ]);

  const MessageCard = ({ message }: { message: Message }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => setSelectedMessage(message)}
      className={`p-4 rounded-lg cursor-pointer transition-colors ${
        message.read
          ? "bg-white dark:bg-secondary/20"
          : "bg-accent/5 dark:bg-accent/10"
      } ${
        selectedMessage?.id === message.id
          ? "border-2 border-accent"
          : "border border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              message.read ? "bg-gray-300" : "bg-accent"
            }`}
          />
          <h3 className="font-medium dark:text-white">{message.sender}</h3>
        </div>
        <div className="flex items-center gap-2">
          {message.starred && (
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          )}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4 inline mr-1" />
            {new Date(message.date).toLocaleDateString()}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {message.subject}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
        {message.message}
      </p>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold dark:text-white mb-4">Messages</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex gap-2 mb-4">
              <ActionButton
                label="All"
                variant="secondary"
                icon={<Mail size={16} />}
              />
              <ActionButton
                label="Starred"
                variant="secondary"
                icon={<Star size={16} />}
              />
              <ActionButton
                label="Archived"
                variant="secondary"
                icon={<Archive size={16} />}
              />
            </div>
            <div className="space-y-3">
              {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white dark:bg-secondary/20 rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white mb-2">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>From: {selectedMessage.sender}</span>
                      <span>({selectedMessage.email})</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(selectedMessage.date).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <ActionButton
                      label=""
                      variant="secondary"
                      icon={<Star size={16} />}
                      onClick={() => console.log("Star message")}
                    />
                    <ActionButton
                      label=""
                      variant="secondary"
                      icon={<Archive size={16} />}
                      onClick={() => console.log("Archive message")}
                    />
                    <ActionButton
                      label=""
                      variant="danger"
                      icon={<Trash2 size={16} />}
                      onClick={() => console.log("Delete message")}
                    />
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <ActionButton
                    label="Reply"
                    icon={<Mail size={16} />}
                    onClick={() => console.log("Reply to message")}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-secondary/20 rounded-xl p-6 text-center">
                <Mail className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium dark:text-white mb-2">
                  No Message Selected
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Select a message from the list to view its contents
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;
