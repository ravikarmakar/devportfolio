import React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Star, Clock, Mail, Archive, Trash2 } from "lucide-react";
import { Message } from "../../../../types";

interface MessageCardProps {
  message: Message;
  isSelected: boolean;
  onSelect: (_id: string) => void;
  onStar: (_id: string) => void;
  onArchive: (_id: string) => void;
  onDelete: (_id: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isSelected,
  onSelect,
  onStar,
  onArchive,
  onDelete,
}) => {
  const handleAction = (e: React.MouseEvent, action: (_id: string) => void) => {
    e.stopPropagation();
    action(message._id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onClick={() => onSelect(message._id)}
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all duration-200
        ${
          message?.read
            ? "bg-white dark:bg-secondary/20"
            : "bg-accent/5 dark:bg-accent/10"
        }
        ${
          isSelected
            ? "ring-2 ring-accent"
            : "hover:bg-gray-50 dark:hover:bg-secondary/30"
        }
        ${message.archived ? "opacity-75" : "opacity-100"}
      `}
    >
      {/* Message Status Indicator */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full transition-colors duration-200">
        {!message.read && <div className="h-full bg-accent animate-pulse" />}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className={`font-medium truncate ${
                message.read
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {message.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatDistanceToNow(new Date(message.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {message.email}
          </p>

          <h4
            className={`text-sm mb-1 ${
              message.read
                ? "text-gray-600 dark:text-gray-400"
                : "text-gray-800 dark:text-gray-200 font-medium"
            }`}
          >
            {message.subject}
          </h4>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {message.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleAction(e, onStar)}
            className={`p-1.5 rounded-full transition-colors duration-200
              ${
                message.starred
                  ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500"
              }`}
          >
            <Star size={16} className={message.starred ? "fill-current" : ""} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleAction(e, onArchive)}
            className={`p-1.5 rounded-full transition-colors duration-200
              ${
                message.archived
                  ? "bg-purple-100 dark:bg-purple-500/20 text-purple-500"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-500"
              }`}
          >
            <Archive size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleAction(e, onDelete)}
            className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>

      {/* Time Indicator */}
      <div className="absolute bottom-2 right-2">
        <Clock size={12} className="text-gray-400 dark:text-gray-500" />
      </div>
    </motion.div>
  );
};

export default MessageCard;
