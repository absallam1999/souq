import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaSearch,
  FaExclamationTriangle,
  FaCompass,
  FaMapSigns,
  FaHeart,
  FaStar,
  FaUser,
  FaFolder,
} from "react-icons/fa";
import Button from "../../components/ui/Button";

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const popularServices = [
    { name: "تصميم شعار", path: "/services?category=logo" },
    { name: "هوية بصرية", path: "/services?category=branding" },
    { name: "تسويق رقمي", path: "/services?category=marketing" },
    { name: "تطوير مواقع", path: "/services?category=web" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl mx-auto relative"
      >
        {/* Background Decorative Elements */}
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"
        />

        {/* Animated 404 with Floating Elements */}
        <motion.div variants={itemVariants} className="relative mb-8">
          {/* Background Triangle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: [0, 5, -5, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Main Triangle */}
              <FaExclamationTriangle className="text-[14rem] md:text-[16rem] text-amber-500/15 dark:text-amber-400/15" />

              {/* Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl -z-10"
                style={{
                  width: "70%",
                  height: "70%",
                  left: "-10%",
                  top: "-10%",
                }}
              />
            </motion.div>
          </div>

          {/* Main 404 Text */}
          <motion.h1
            className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 dark:from-primary-400 dark:via-primary-300 dark:to-secondary-400 relative z-10"
            style={{ lineHeight: 1 }}
          >
            404
          </motion.h1>

          {/* Floating Decorative Icons */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute -top-10 right-1/4 text-primary-300/30 dark:text-primary-600/20 text-4xl z-20"
          >
            <FaCompass />
          </motion.div>
        </motion.div>

        {/* Error Message with Gradient Text */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
            عفواً! الصفحة غير موجودة
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto"
          >
            يبدو أنك قد ضللت الطريق في فضاء خدماتنا. الصفحة التي تبحث عنها غير
            متوفرة أو ربما تم نقلها.
          </motion.p>
        </motion.div>

        {/* Search with Suggestions */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خدمة..."
              className="w-full px-6 py-4 pr-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-300 shadow-lg"
            />
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />

            {/* Search Suggestions */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-10"
              >
                {popularServices.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    className="block px-4 py-3 text-right hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors border-b last:border-0 border-gray-100 dark:border-gray-700"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          {/* Popular Searches */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center mt-4"
          >
            <span className="text-sm text-gray-500 dark:text-gray-500 ml-2">
              مقترحات:
            </span>
            {popularServices.map((service, index) => (
              <Link
                key={index}
                to={service.path}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all hover:scale-105"
              >
                {service.name}
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Action Buttons with Enhanced Styling */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link to="/" className="sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="primary"
                size="lg"
                icon={<FaHome />}
                iconPosition="right"
                className="w-full shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
              >
                العودة للرئيسية
              </Button>
            </motion.div>
          </Link>

          <Link to="/services" className="sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                icon={<FaMapSigns />}
                iconPosition="right"
                className="w-full border-2 hover:bg-gradient-to-r hover:from-primary-600 hover:to-secondary-600 hover:text-white hover:border-transparent"
              >
                استكشف الخدمات
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Quick Links with Icons */}
        <motion.div variants={itemVariants} className="relative">
          {/* Decorative Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

          <p className="text-gray-500 dark:text-gray-500 mb-6 pt-6">
            روابط سريعة قد تهمك:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: "الرئيسية", path: "/", icon: <FaHome /> },
              { name: "الخدمات", path: "/services", icon: <FaMapSigns /> },
              { name: "التصنيفات", path: "/categories", icon: <FaFolder /> },
              { name: "من نحن", path: "/about", icon: <FaUser /> },
              { name: "اتصل بنا", path: "/contact", icon: <FaCompass /> },
            ].map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.path}
                  className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-lg hover:shadow-primary-500/10 transition-all group"
                >
                  <span className="text-xl text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {link.icon}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {link.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-gray-400 dark:text-gray-600"
        >
          إذا كنت تعتقد أن هناك خطأ، يرجى{" "}
          <Link
            to="/contact"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            التواصل مع الدعم الفني
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
