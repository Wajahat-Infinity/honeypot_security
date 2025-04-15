"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function ThreatMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // This would be where we'd initialize a real map library
    // For now, we'll just add some visual elements
    const createAttackPoint = () => {
      const point = document.createElement("div")
      point.className = "absolute w-2 h-2 rounded-full bg-red-500 animate-ping"

      // Random position on the map
      const left = Math.random() * 90 + 5 // 5-95%
      const top = Math.random() * 80 + 10 // 10-90%

      point.style.left = `${left}%`
      point.style.top = `${top}%`

      // Remove after animation
      setTimeout(() => {
        point.remove()
      }, 3000)

      return point
    }

    // Add random attack points periodically
    const interval = setInterval(() => {
      if (mapRef.current) {
        mapRef.current.appendChild(createAttackPoint())
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="aspect-[16/9] w-full rounded-lg cyber-grid relative overflow-hidden">
      <div ref={mapRef} className="relative w-full h-full">
        <Image src="/world-map.png" alt="World Map" fill className="object-cover opacity-40" />

        {/* Fixed attack points for initial render */}
        <div
          className="absolute w-2 h-2 rounded-full bg-red-500 animate-ping"
          style={{ left: "30%", top: "40%" }}
        ></div>
        <div
          className="absolute w-2 h-2 rounded-full bg-red-500 animate-ping"
          style={{ left: "70%", top: "30%" }}
        ></div>
        <div
          className="absolute w-2 h-2 rounded-full bg-red-500 animate-ping"
          style={{ left: "80%", top: "60%" }}
        ></div>
        <div
          className="absolute w-2 h-2 rounded-full bg-red-500 animate-ping"
          style={{ left: "20%", top: "50%" }}
        ></div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <line x1="30%" y1="40%" x2="70%" y2="30%" stroke="rgba(255, 0, 0, 0.5)" strokeWidth="1" />
          <line x1="70%" y1="30%" x2="80%" y2="60%" stroke="rgba(255, 0, 0, 0.5)" strokeWidth="1" />
          <line x1="80%" y1="60%" x2="20%" y2="50%" stroke="rgba(255, 0, 0, 0.5)" strokeWidth="1" />
        </svg>

        <div className="absolute bottom-4 right-4 bg-black/70 text-xs text-cyan-400 p-2 rounded font-mono">
          LIVE ATTACKS: 24 | BLOCKED: 1,458 | ACTIVE THREATS: 17
        </div>
      </div>
    </div>
  )
}
