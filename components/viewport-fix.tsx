'use client'

import { useEffect } from 'react'

export function ViewportFix() {
  useEffect(() => {
    // Force viewport settings for GitHub Pages
    const setViewport = () => {
      let viewportMeta = document.querySelector('meta[name="viewport"]')
      
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta')
        viewportMeta.setAttribute('name', 'viewport')
        document.head.appendChild(viewportMeta)
      }
      
      viewportMeta.setAttribute(
        'content', 
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover'
      )
    }

    // Set viewport immediately
    setViewport()
    
    // Force body width
    const forceBodyWidth = () => {
      document.documentElement.style.width = '100%'
      document.documentElement.style.minWidth = '100%'
      document.body.style.width = '100%'
      document.body.style.minWidth = '100%'
      document.body.style.overflowX = 'hidden'
    }
    
    forceBodyWidth()
    
    // Re-apply on resize
    const handleResize = () => {
      setViewport()
      forceBodyWidth()
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return null
}
