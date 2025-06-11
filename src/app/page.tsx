"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Sparkles,
  Palette,
  Play,
  DropletsIcon as DragDropIcon,
  Zap,
  Code,
  FileText,
  BarChart3,
  ImageIcon,
  Table,
  List,
  Lightbulb,
  Rocket,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedBackground } from "@/components/global/landing-page";
import FooterAnimatedBubbles from "@/components/global/landing-page/footer-animated-bubbles";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export default function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // animation duration in ms
    let start: number | null = null;

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const timeElapsed = timestamp - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="container mx-auto px-4 py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Slide Genie</span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("components")}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Components
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                How it Works
              </button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="border-[#5C5C5C] text-gray-300 hover:bg-[#1F1F1F] hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/sign-up">
                  <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            </div>
          </nav>
        </motion.header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <div className="space-y-4">
                <motion.div variants={fadeInUp}>
                  <Badge className="bg-orange-900/30 text-orange-300 hover:bg-orange-900/40 border border-orange-500/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered Presentations
                  </Badge>
                </motion.div>
                <motion.h1
                  className="text-4xl lg:text-6xl font-bold text-white leading-tight"
                  variants={fadeInUp}
                >
                  Create Stunning
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                    {" "}
                    Presentations{" "}
                  </span>
                  in Minutes
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-300 leading-relaxed"
                  variants={fadeInUp}
                >
                  Transform your ideas into professional presentations with AI.
                  Just enter a topic, and watch as our intelligent system
                  creates outlines, designs slides, and brings your vision to
                  life.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <motion.div {...scaleOnHover}>
                  <Link href="/sign-in">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
                    >
                      Start Creating
                      <Zap className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center space-x-6 text-sm text-gray-400"
                variants={fadeInUp}
              >
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                  Save hours of work
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                  No installation required{" "}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                  AI does the heavy lifting{" "}
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial="initial"
              animate="animate"
              variants={fadeInRight}
            >
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/LandingPage/hero-image.png"
                    alt="Person creating presentations with AI"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>
              </div>
              <motion.div
                className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2,
                }}
              ></motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From idea to presentation in just a few simple steps
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {[
              {
                number: "1",
                title: "Enter Your Topic",
                description: "Simply type in your presentation topic or idea",
                image: "/LandingPage/builder-interface.png",
              },
              {
                number: "2",
                title: "AI Creates Outline",
                description:
                  "Our AI generates a comprehensive outline for your presentation",
                image: "/LandingPage/ai-assistant.png",
              },
              {
                number: "3",
                title: "Choose Theme & Create",
                description:
                  "Select from beautiful themes and generate your slides",
                image: "/LandingPage/presentation-work.png",
              },
              {
                number: "4",
                title: "Customize & Present",
                description:
                  "Drag, drop, and customize components, then present with confidence",
                image: "/LandingPage/forest-components.png",
              },
            ].map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="h-full">
                <motion.div {...scaleOnHover} className="h-full">
                  <Card className="text-center bg-[#1F1F1F] border-[#3A3A3A] hover:bg-[#3A3A3A] transition-colors h-full flex flex-col">
                    <CardHeader className="flex-grow">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </motion.div>
                      <CardTitle className="text-lg text-white">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      <motion.div
                        className="mt-auto"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Image
                          src={step.image || "/placeholder.svg"}
                          alt={step.title}
                          width={200}
                          height={150}
                          className="rounded-lg mx-auto"
                        />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to create professional presentations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              className="space-y-8"
              initial="initial"
              whileInView="animate"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {[
                  {
                    icon: Sparkles,
                    title: "AI-Powered Content Generation",
                    description:
                      "Let AI create intelligent outlines and content suggestions based on your topic.",
                  },
                  {
                    icon: DragDropIcon,
                    title: "Drag & Drop Components",
                    description:
                      "Easily add headings, paragraphs, tables, lists, images, code blocks, and more with simple drag and drop.",
                  },
                  {
                    icon: Palette,
                    title: "Beautiful Themes",
                    description:
                      "Choose from a variety of professionally designed themes to match your brand and style.",
                  },
                  {
                    icon: Play,
                    title: "Present Mode",
                    description:
                      "Full-screen presentation mode with smooth transitions and professional controls.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    variants={fadeInLeft}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial="initial"
              whileInView="animate"
              variants={fadeInRight}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/LandingPage/floating-islands.png"
                  alt="Floating presentation components"
                  width={600}
                  height={400}
                  className="rounded-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Rich Component Library
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Build engaging presentations with our comprehensive set of
              components
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {[
              {
                icon: FileText,
                name: "Text & Headings",
                description:
                  "Rich text formatting with multiple heading styles",
              },
              {
                icon: ImageIcon,
                name: "Images",
                description: "High-quality images with automatic optimization",
              },
              {
                icon: BarChart3,
                name: "Charts & Graphs",
                description: "Interactive charts and data visualizations",
              },
              {
                icon: Table,
                name: "Tables",
                description: "Responsive tables with sorting and filtering",
              },
              {
                icon: List,
                name: "Lists",
                description: "Bullet points, numbered lists, and custom lists",
              },
              {
                icon: Code,
                name: "Code Blocks",
                description: "Syntax-highlighted code with multiple themes",
              },
            ].map((component, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div {...scaleOnHover}>
                  <Card className="bg-[#1F1F1F] border-[#3A3A3A] hover:bg-[#3A3A3A] transition-colors p-6 text-center">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <component.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {component.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {component.description}
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose Slide Genie?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of presentation creation
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            {[
              {
                icon: Lightbulb,
                title: "AI-Powered Intelligence",
                description:
                  "Our advanced AI understands your content and suggests the best layouts, themes, and components for maximum impact.",
              },
              {
                icon: Rocket,
                title: "Lightning Fast",
                description:
                  "Create professional presentations in minutes, not hours. Our streamlined workflow gets you from idea to presentation instantly.",
              },
              {
                icon: Shield,
                title: "Professional Quality",
                description:
                  "Every presentation looks polished and professional with our carefully crafted themes and components.",
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div
                  className="text-center p-8 rounded-2xl bg-[#1F1F1F] border border-[#3A3A3A] hover:bg-[#3A3A3A] transition-colors"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Fun Footer */}
        <footer className="container mx-auto px-4 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                viewport={{ once: true }}
              >
                <Image
                  src="/LandingPage/footer-image.png"
                  alt="Floating presentation elements"
                  width={400}
                  height={300}
                  className="rounded-2xl opacity-80"
                />
              </motion.div>

              <motion.div
                className="flex items-center justify-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  Slide Genie
                </span>
              </motion.div>

              <motion.p
                className="text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Where ideas become beautiful presentations ✨
              </motion.p>

              {/* Floating Animation Elements */}
              <FooterAnimatedBubbles />

            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}
