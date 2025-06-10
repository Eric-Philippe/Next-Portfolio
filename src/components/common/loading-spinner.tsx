"use client";

import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative">
        {/* Main spinner */}
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-gray-600"
          style={{
            borderTopColor: "#3b82f6",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner pulse */}
        <motion.div
          className="absolute inset-0 m-2 rounded-full bg-blue-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute mt-24 text-xl font-light text-gray-300"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading Portfolio...
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
