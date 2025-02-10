import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Future = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.3,
      },
    },
  };

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.nav 
        className="fixed top-0 left-0 right-0 bg-black/30 backdrop-blur-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <motion.div
              className="text-white text-xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FusionEra
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="h-screen bg-fixed bg-cover bg-center flex items-center justify-center font-space-grotesk"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="text-center text-white px-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold mb-4">Journey to the Future</h1>
          <p className="text-xl">
            Experience tomorrow's wonders today through time travel
          </p>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Future Tech Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="#" className="block hover:shadow-xl transition duration-300">
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 rounded-lg shadow-lg overflow-hidden border border-indigo-500/30 h-full">
              <div className="flex flex-col">
                <div>
                  <img
                    className="h-48 w-full object-cover opacity-90"
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
                    alt="Robotics Event"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <div className="uppercase tracking-wide text-sm text-cyan-400 font-semibold">
                    March 15, 2150
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-white">Global Robotics Olympics</h3>
                  <p className="mt-2 text-gray-300">
                    Watch advanced humanoid robots compete in various athletic disciplines. 
                    Experience the pinnacle of AI-powered robotics as they showcase 
                    superhuman agility and precision.
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a href="#" className="block hover:shadow-xl transition duration-300">
            <div className="bg-gradient-to-r from-violet-900 via-violet-800 to-violet-900 rounded-lg shadow-lg overflow-hidden border border-violet-500/30 h-full">
              <div className="flex flex-col">
                <div>
                  <img
                    className="h-48 w-full object-cover opacity-90"
                    src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d"
                    alt="VR Gaming Event"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <div className="uppercase tracking-wide text-sm text-fuchsia-400 font-semibold">
                    April 20, 2200
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Neural-Link VR Championship
                  </h3>
                  <p className="mt-2 text-gray-300">
                    Join the world's elite gamers in the first full-dive virtual reality
                    tournament. Experience next-gen gaming with direct neural interfaces
                    and photorealistic environments.
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a href="#" className="block hover:shadow-xl transition duration-300">
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-lg shadow-lg overflow-hidden border border-blue-500/30 h-full">
              <div className="flex flex-col">
                <div>
                  <img
                    className="h-48 w-full object-cover opacity-90"
                    src="/images/quantum.jpg"
                    alt="Quantum Computing Event"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <div className="uppercase tracking-wide text-sm text-sky-400 font-semibold">
                    July 8, 2175
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Quantum Computing Breakthrough Summit
                  </h3>
                  <p className="mt-2 text-gray-300">
                    Witness the unveiling of the first room-temperature quantum computer.
                    Join leading scientists as they demonstrate quantum supremacy in
                    solving complex global challenges.
                  </p>
                </div>
              </div>
            </div>
          </a>

          <a href="#" className="block hover:shadow-xl transition duration-300">
            <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 rounded-lg shadow-lg overflow-hidden border border-purple-500/30 h-full">
              <div className="flex flex-col">
                <div>
                  <img
                    className="h-48 w-full object-cover opacity-90"
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                    alt="Biotech Event"
                  />
                </div>
                <div className="p-8 flex-grow">
                  <div className="uppercase tracking-wide text-sm text-purple-400 font-semibold">
                    September 30, 2180
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Neuralink Enhancement Expo
                  </h3>
                  <p className="mt-2 text-gray-300">
                    Explore the latest in human-computer integration technology.
                    Experience live demonstrations of memory enhancement, skill transfer,
                    and direct brain-to-brain communication.
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Future;
