import React, { createContext, useState, useContext } from 'react'

const AITripPlannerContext = createContext()

export const useAITripPlanner = () => {
  const context = useContext(AITripPlannerContext)
  if (!context) {
    throw new Error('useAITripPlanner must be used within an AITripPlannerProvider')
  }
  return context
}

export const AITripPlannerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const openAITripPlanner = () => {
    console.log('openAITripPlanner called, setting isOpen to true')
    setIsOpen(true)
  }

  const closeAITripPlanner = () => {
    setIsOpen(false)
    setIsMaximized(false) // Reset to normal size when closing
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const value = {
    isOpen,
    isMaximized,
    openAITripPlanner,
    closeAITripPlanner,
    toggleMaximize
  }

  return (
    <AITripPlannerContext.Provider value={value}>
      {children}
    </AITripPlannerContext.Provider>
  )
}

export default AITripPlannerContext 