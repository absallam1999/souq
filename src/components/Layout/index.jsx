import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'

const Layout = ({ children }) => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  // Handle scroll events for navbar transparency and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Set navbar background when scrolled
      setIsScrolled(window.scrollY > 20)
      
      // Show scroll-to-top button after scrolling down 500px
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navbar with dynamic background */}
      <Navbar isScrolled={isScrolled} />
      
      {/* Main content with proper spacing */}
      <main className="flex-grow pt-16 md:pt-20">
        {/* Page transition animation */}
        <div className="animate-fade-in-up">
          {children}
        </div>
      </main>
      
      {/* Footer with wave decoration */}
      <Footer />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5 animate-bounce-slow group-hover:animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
      
      {/* Loading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50">
        <div className="h-full bg-primary-600 animate-pulse" style={{ width: '0%' }} id="progress-bar" />
      </div>
    </div>
  )
}

export const LayoutWithTransition = ({ children }) => {
  const location = useLocation()
  
  return (
    <Layout>
      <div key={location.pathname} className="page-transition">
        {children}
      </div>
    </Layout>
  )
}

export default Layout