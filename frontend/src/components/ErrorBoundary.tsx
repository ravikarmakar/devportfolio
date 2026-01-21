import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

// Error fallback component
function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md"
            >
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Oops! Something went wrong
                </h2>

                <p className="text-gray-400 mb-6">
                    We encountered an unexpected error. Please try again.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        onClick={resetErrorBoundary}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RefreshCw className="h-5 w-5" />
                        Try Again
                    </motion.button>

                    <Link to="/">
                        <motion.button
                            onClick={resetErrorBoundary}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors w-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Home className="h-5 w-5" />
                            Go Home
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

// Export wrapped ErrorBoundary with our custom fallback
export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
        >
            {children}
        </ReactErrorBoundary>
    );
}
