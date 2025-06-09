"use client"

import { motion } from "framer-motion"

export function AnimatedBackground() {
  // Generate random positions for stars
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  }

  const stars = generateStars(50)
  const largePlanets = generateStars(8)

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Small twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      {largePlanets.map((planet) => (
        <motion.div
          key={`planet-${planet.id}`}
          className="absolute rounded-full"
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: `${planet.size * 8}px`,
            height: `${planet.size * 8}px`,
            background: `radial-gradient(circle, ${
              planet.id % 3 === 0
                ? "rgba(251, 146, 60, 0.1)"
                : planet.id % 3 === 1
                  ? "rgba(250, 204, 21, 0.1)"
                  : "rgba(168, 85, 247, 0.1)"
            } 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: planet.duration * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: planet.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 200],
            y: [0, 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 8 + Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Galaxy spiral effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(251, 146, 60, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(250, 204, 21, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 40%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)
          `,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
