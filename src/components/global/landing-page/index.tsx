"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Types
type Star = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

type Planet = Star // same fields

type Particle = {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  moveX: number
}

type ShootingStar = {
  id: number
  x: number
  y: number
  delay: number
}

export function AnimatedBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [largePlanets, setLargePlanets] = useState<Planet[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  // Helper functions
  const generateStars = (count: number): Star[] =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))

  const generatePlanets = (count: number): Planet[] =>
    generateStars(count)

  const generateParticles = (count: number): Particle[] =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 2,
      duration: 15 + Math.random() * 10,
      moveX: Math.random() * 50 - 25,
    }))

  const generateShootingStars = (count: number): ShootingStar[] =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 8 + Math.random() * 5,
    }))

  // Only generate random data on the client
  useEffect(() => {
    setStars(generateStars(50))
    setLargePlanets(generatePlanets(8))
    setParticles(generateParticles(15))
    setShootingStars(generateShootingStars(3))
  }, [])

  // Optionally: render nothing until state is hydrated
  if (
    stars.length === 0 ||
    largePlanets.length === 0 ||
    particles.length === 0 ||
    shootingStars.length === 0
  ) {
    return null
  }

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
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-transparent rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
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
            delay: star.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute w-1 h-1 bg-orange-300 rounded-full opacity-40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, p.moveX, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
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

