"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AIInput,
  SpecialCard,
  AnimatedNumber,
  SkiperMarquee,
  MarqueeItem,
  SlideButton,
  TextScroll,
  ImageRipple,
  MinimalCard,
  Flipper,
  MaksedDivDemo,
} from "@/components/skiper-ui";
import {
  Trophy,
  Star,
  Heart,
  Target,
  Globe,
  Award,
  Crown,
  Goal,
  Sparkles,
} from "lucide-react";
import HoverExpand from "@/components/ui/hover-expand";
import { CardCarousel } from "@/components/ui/card-carousel";
import { ContentCarousel } from "@/components/ui/content-carousel";

export default function MessiLanding() {
  // Generate stars only on client side to avoid hydration errors
  const [stars, setStars] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // Generate stars after component mounts (client-side only)
    const generatedStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  // Messi's career highlights for carousel
  const careerHighlights = [
    {
      id: "1",
      content: (
        <SpecialCard
          title="Barcelona Legend"
          description="21 seasons of pure magic"
          icon={<Crown className="w-8 h-8 text-yellow-400" />}
          gradient="from-blue-600 to-red-600"
        >
          <div className="space-y-2">
            <p>🏆 10 La Liga titles</p>
            <p>🏆 4 Champions League titles</p>
            <p>⚽ 672 goals in 778 appearances</p>
          </div>
        </SpecialCard>
      ),
    },
    {
      id: "2",
      content: (
        <SpecialCard
          title="World Cup Champion"
          description="The ultimate dream achieved"
          icon={<Trophy className="w-8 h-8 text-yellow-400" />}
          gradient="from-blue-400 to-cyan-400"
        >
          <div className="space-y-2">
            <p>🏆 2022 FIFA World Cup Winner</p>
            <p>🥇 Golden Ball Award</p>
            <p>⚽ 7 goals, 3 assists</p>
          </div>
        </SpecialCard>
      ),
    },
    {
      id: "3",
      content: (
        <SpecialCard
          title="Inter Miami Era"
          description="New chapter in MLS"
          icon={<Star className="w-8 h-8 text-pink-400" />}
          gradient="from-pink-500 to-purple-600"
        >
          <div className="space-y-2">
            <p>🏆 Leagues Cup Champion</p>
            <p>⚽ 11 goals in 14 games</p>
            <p>🌟 MLS revolution</p>
          </div>
        </SpecialCard>
      ),
    },
    {
      id: "4",
      content: (
        <SpecialCard
          title="Inter Miami Era"
          description="New chapter in MLS"
          icon={<Star className="w-8 h-8 text-pink-400" />}
          gradient="from-pink-500 to-purple-600"
        >
          <div className="space-y-2">
            <p>🏆 Leagues Cup Champion</p>
            <p>⚽ 11 goals in 14 games</p>
            <p>🌟 MLS revolution</p>
          </div>
        </SpecialCard>
      ),
    },
    {
      id: "5",
      content: (
        <SpecialCard
          title="Inter Miami Era"
          description="New chapter in MLS"
          icon={<Star className="w-8 h-8 text-pink-400" />}
          gradient="from-pink-500 to-purple-600"
        >
          <div className="space-y-2">
            <p>🏆 Leagues Cup Champion</p>
            <p>⚽ 11 goals in 14 games</p>
            <p>🌟 MLS revolution</p>
          </div>
        </SpecialCard>
      ),
    },
  ];

  const messiAchievements = [
    "GOAT",
    "World Cup Winner",
    "8x Ballon d'Or",
    "PSG Superstar",
    "Barcelona Legend",
  ];

  const messiQuotes = [
    "You have to fight to reach your dream. You have to sacrifice and work hard for it.",
    "I start early and I stay late, day after day, year after year.",
    "The best decisions aren't made with your mind, but with your instinct.",
  ];

  // Messi hover expand images - Using available local images
  const messiHoverImages = [
    "/images/Lionel Messi.jpeg",
    "/images/messi-football.jpeg",
    "/images/55ca9bc1-1696-4e45-a4ef-bc62a25e412e.jpeg",
    "/images/b2e747bc-0d57-4177-9b37-09c9081dbb17.jpeg",
    "/images/fbea51dc-e98d-4390-b539-9b56e06b3814.jpeg",
    "/images/03922098-df85-4749-90c1-3a7ef016b457.jpeg",
    "/images/Learn about collection Apps Every Messi Fan Needs….jpeg",
  ];

  const imagesCarousel = [
    { src: "/images/Lionel Messi.jpeg", alt: "Image 1" },
    { src: "/images/messi-football.jpeg", alt: "Image 2" },
    {
      src: "/images/55ca9bc1-1696-4e45-a4ef-bc62a25e412e.jpeg",
      alt: "Image 3",
    },
    {
      src: "/images/b2e747bc-0d57-4177-9b37-09c9081dbb17.jpeg",
      alt: "Image 4",
    },
    {
      src: "/images/fbea51dc-e98d-4390-b539-9b56e06b3814.jpeg",
      alt: "Image 5",
    },
    {
      src: "/images/03922098-df85-4749-90c1-3a7ef016b457.jpeg",
      alt: "Image 6",
    },
    {
      src: "/images/Learn about collection Apps Every Messi Fan Needs….jpeg",
      alt: "Image 7",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Mystical overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90 animate-ghostly-pulse pointer-events-none"></div>
      {/* Hero Section - Side by Side Layout */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background stars animation */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8 text-left lg:pr-8"
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <span className="text-gradient-mystical">Lionel</span>
                </motion.h1>

                <TextScroll
                  texts={messiAchievements}
                  className="text-3xl md:text-5xl lg:text-6xl h-20"
                />

                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  <span className="text-gradient-mystical">Messi</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl"
              >
                The greatest footballer of all time. A legend whose magic
                transcends the beautiful game.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <SlideButton
                  size="lg"
                  icon={<Goal className="w-6 h-6" />}
                  onClick={() =>
                    document
                      .getElementById("stats")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore the Legend
                </SlideButton>

                <SlideButton
                  size="lg"
                  variant="outline"
                  icon={<Star className="w-6 h-6" />}
                  onClick={() =>
                    document
                      .getElementById("carousel")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  View Gallery
                </SlideButton>
              </motion.div>

              {/* Stats Preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700/50"
              >
                <div className="text-center">
                  <AnimatedNumber
                    value={800}
                    suffix="+"
                    className="text-2xl md:text-3xl font-bold text-blue-400"
                  />
                  <p className="text-gray-400 text-sm mt-1">Goals</p>
                </div>
                <div className="text-center">
                  <AnimatedNumber
                    value={8}
                    className="text-2xl md:text-3xl font-bold text-yellow-400"
                  />
                  <p className="text-gray-400 text-sm mt-1">Ballon d Or</p>
                </div>
                <div className="text-center">
                  <AnimatedNumber
                    value={44}
                    suffix="+"
                    className="text-2xl md:text-3xl font-bold text-green-400"
                  />
                  <p className="text-gray-400 text-sm mt-1">Trophies</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Image with Ripple Effect */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative flex justify-center items-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Mystical glowing background effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-600/10 via-white/5 to-gray-400/10 rounded-3xl blur-3xl animate-ghostly-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-500/5 via-white/10 to-gray-300/5 rounded-2xl blur-xl animate-mystical-shimmer"></div>

                {/* Main image with ripple effect */}
                <ImageRipple
                  src="/images/messi-football.jpeg"
                  alt="Lionel Messi with Football"
                  className="relative w-full h-[600px] rounded-2xl shadow-2xl border border-white/10"
                />

                {/* Mystical floating achievement badges */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 glass-mystical text-white px-4 py-2 rounded-full font-bold text-sm shadow-2xl border border-gray-500/20"
                >
                  🏆 GOAT
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-4 -left-4 glass-mystical text-gray-200 px-4 py-2 rounded-full font-bold text-sm shadow-2xl border border-gray-400/20"
                >
                  ⚽ World Cup Winner
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Input Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ask About{" "}
              <Flipper
                words={["Messi", "The GOAT", "La Pulga", "Leo"]}
                className="text-blue-400"
              />
            </h2>
            <p className="text-gray-300 text-lg">
              Discover everything about Lionel Messis incredible journey
            </p>
          </motion.div>

          <AIInput
            placeholder="Ask me anything about Messi's career, records, or achievements..."
            onSubmit={(query) => console.log("Query:", query)}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <MaksedDivDemo />

      {/* Statistics Section */}
      <section
        id="stats"
        className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50"
      >
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Career in Numbers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <SpecialCard
              icon={<Target className="w-8 h-8 text-green-400" />}
              title="Goals"
              gradient="from-green-500 to-emerald-600"
            >
              <AnimatedNumber
                value={800}
                suffix="+"
                className="text-4xl font-bold"
              />
              <p className="text-sm text-gray-300 mt-2">Career Goals</p>
            </SpecialCard>

            <SpecialCard
              icon={<Trophy className="w-8 h-8 text-yellow-400" />}
              title="Ballon d'Or"
              gradient="from-yellow-500 to-orange-600"
            >
              <AnimatedNumber value={8} className="text-4xl font-bold" />
              <p className="text-sm text-gray-300 mt-2">Record Holder</p>
            </SpecialCard>

            <SpecialCard
              icon={<Award className="w-8 h-8 text-blue-400" />}
              title="Trophies"
              gradient="from-blue-500 to-indigo-600"
            >
              <AnimatedNumber
                value={44}
                suffix="+"
                className="text-4xl font-bold"
              />
              <p className="text-sm text-gray-300 mt-2">Major Titles</p>
            </SpecialCard>

            <SpecialCard
              icon={<Globe className="w-8 h-8 text-purple-400" />}
              title="Appearances"
              gradient="from-purple-500 to-pink-600"
            >
              <AnimatedNumber
                value={1000}
                suffix="+"
                className="text-4xl font-bold"
              />
              <p className="text-sm text-gray-300 mt-2">Career Games</p>
            </SpecialCard>
          </div>
        </div>
      </section>

      {/* Hover Expand Gallery Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-mystical">
              Messi Through the Years
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Experience the evolution of greatness. Hover over any image to
              explore different moments in Messis legendary career.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.3,
            }}
          >
            <HoverExpand
              images={messiHoverImages}
              initialSelectedIndex={0}
              thumbnailHeight={160}
              modalImageSize={500}
              maxThumbnails={7}
            />
          </motion.div>
        </div>
      </section>

      {/* Messi Image Carousel - Modern Style */}
      <section
        id="carousel"
        className="py-24 px-4 bg-gradient-to-br from-slate-50/5 via-white/5 to-slate-100/5 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Through the Years
            </h2>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
              A visual journey through Messis incredible career milestones
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CardCarousel
              images={imagesCarousel}
              autoplayDelay={4000}
              showPagination={true}
              showNavigation={true}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center space-x-6 text-gray-300 text-sm bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Swipe to explore</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Auto-plays every 4s</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Highlights Cards */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-900/50 to-black/50">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-mystical"
          >
            Career Highlights
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.2,
            }}
          >
            <ContentCarousel
              items={careerHighlights}
              autoplayDelay={5000}
              showPagination={true}
              showNavigation={true}
            />
          </motion.div>
        </div>
      </section>

      {/* Scene */}
      {/* <ImageRippleDemo /> */}

      {/* Achievements Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Hall of Fame
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MinimalCard
              title="FIFA World Cup"
              subtitle="Qatar 2022"
              image="/images/b2e747bc-0d57-4177-9b37-09c9081dbb17.jpeg"
            >
              <p>
                Finally achieved his ultimate dream, leading Argentina to World
                Cup glory after a thrilling final against France.
              </p>
            </MinimalCard>

            <MinimalCard
              title="8x Ballon d'Or"
              subtitle="2009-2023"
              image="/images/03922098-df85-4749-90c1-3a7ef016b457.jpeg"
            >
              <p>
                Record-breaking eight Ballon d Or awards, cementing his status
                as the greatest player of all time.
              </p>
            </MinimalCard>

            <MinimalCard
              title="Barcelona Legacy"
              subtitle="2004-2021"
              image="/images/fbea51dc-e98d-4390-b539-9b56e06b3814.jpeg"
            >
              <p>
                672 goals in 778 games, 34 trophies, and countless magical
                moments at Camp Nou.
              </p>
            </MinimalCard>
          </div>
        </div>
      </section>

      {/* Inspirational Quotes Marquee */}
      <section className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto">
          <SkiperMarquee speed={60} className="py-8">
            {messiQuotes.map((quote, index) => (
              <MarqueeItem key={index} className="mx-8">
                <div className="flex items-center space-x-4 text-lg text-gray-300">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <span className="italic">{quote}</span>
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              </MarqueeItem>
            ))}
          </SkiperMarquee>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-black/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-3xl md:text-4xl font-bold">
              The Legend Continues
            </h3>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Lionel Messis journey is far from over. Every match, every goal,
              every moment adds to his incredible legacy.
            </p>

            <div className="flex justify-center space-x-4">
              <SlideButton
                variant="outline"
                icon={<Heart className="w-5 h-5" />}
              >
                Follow the Journey
              </SlideButton>
              <SlideButton icon={<Star className="w-5 h-5" />}>
                Join the Legacy
              </SlideButton>
            </div>

            <div className="pt-8 border-t border-gray-700">
              <p className="text-gray-400">
                Built with Skiper-ui • A tribute to the greatest footballer of
                all time
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
