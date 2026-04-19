import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

interface Scenario {
  id: number;
  text: string;
  options: {
    text: string;
    setState?: Record<string, number>;
    nextText?: number;
  }[];
}

interface Stats {
  energy: number;
  grades: number;
  social: number;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    text: "It's Monday morning. You have a 9 AM lecture. What do you do?",
    options: [
      {
        text: "Go to the lecture",
        setState: { energy: -10, grades: 10 },
        nextText: 2,
      },
      { text: "Sleep in", setState: { energy: 20, grades: -10 }, nextText: 3 },
    ],
  },
  {
    id: 2,
    text: "You attended the lecture and took great notes. Now it's lunch time. Your friends are going to the pub.",
    options: [
      {
        text: "Join them for a drink",
        setState: { energy: -10, social: 20 },
        nextText: 4,
      },
      {
        text: "Go to the library to study",
        setState: { energy: -20, grades: 20 },
        nextText: 5,
      },
    ],
  },
  {
    id: 3,
    text: "You feel rested, but you missed important information. Your friend calls you to hang out.",
    options: [
      {
        text: "Go out with them",
        setState: { energy: -20, social: 30 },
        nextText: 4,
      },
      {
        text: "Stay in and catch up on the lecture",
        setState: { energy: -10, grades: 10 },
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: "You had a great time with your friends, but now you're behind on your work. It's the end of the week and you have an exam tomorrow.",
    options: [
      {
        text: "Cram all night",
        setState: { energy: -50, grades: 30 },
        nextText: 6,
      },
      {
        text: "Get a good night's sleep",
        setState: { energy: 30, grades: -10 },
        nextText: 6,
      },
    ],
  },
  {
    id: 5,
    text: "You're doing well academically, but you're feeling a bit lonely. It's the weekend. What's the plan?",
    options: [
      {
        text: "Go to a party",
        setState: { energy: -30, social: 40 },
        nextText: 6,
      },
      { text: "Relax at home", setState: { energy: 20, social: -10 }, nextText: 6 },
    ],
  },
  {
    id: 6,
    text: "The semester has ended. Let's see how you did!",
    options: [{ text: "See results", nextText: 7 }],
  },
  {
    id: 7,
    text: "Final results are in!",
    options: [{ text: "Restart", nextText: 1 }],
  },
];

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    energy: 100,
    grades: 100,
    social: 100,
  });
  const [currentScenarioId, setCurrentScenarioId] = useState(1);
  const [animatingStats, setAnimatingStats] = useState<string[]>([]);
  const [characterMood, setCharacterMood] = useState<"happy" | "tired">("happy");
  const [finalMessage, setFinalMessage] = useState("");

  const currentScenario = scenarios.find((s) => s.id === currentScenarioId);

  useEffect(() => {
    if (stats.energy < 40) {
      setCharacterMood("tired");
    } else {
      setCharacterMood("happy");
    }
  }, [stats.energy]);

  const handleChoice = (option: Scenario["options"][0]) => {
    if (option.setState) {
      const newStats = { ...stats };
      const changedStats: string[] = [];

      for (const key in option.setState) {
        const statKey = key as keyof Stats;
        const change = option.setState[key];
        if (change !== undefined) {
          newStats[statKey] = Math.max(0, Math.min(200, newStats[statKey] + change));
          changedStats.push(key);
        }
      }

      setAnimatingStats(changedStats);
      setStats(newStats);

      setTimeout(() => setAnimatingStats([]), 600);
    }

    if (option.nextText === 7) {
      generateFinalMessage(stats);
    }

    if (option.nextText) {
      setCurrentScenarioId(option.nextText);
    }
  };

  const generateFinalMessage = (finalStats: Stats) => {
    let message = "Game Over! ";

    if (finalStats.grades > 120 && finalStats.social > 120) {
      message += "You are a legend! Perfect balance of study and fun.";
    } else if (finalStats.grades > 120) {
      message += "You are a top student, but maybe a bit lonely.";
    } else if (finalStats.social > 120) {
      message += "You are the life of the party, but your grades suffered.";
    } else {
      message += "You survived, but it wasn't easy. Try again!";
    }

    setFinalMessage(message);
    const updatedScenario = scenarios[6];
    updatedScenario.text = message;
  };

  const resetGame = () => {
    setStats({ energy: 100, grades: 100, social: 100 });
    setCurrentScenarioId(1);
    setCharacterMood("happy");
    setFinalMessage("");
  };

  if (!currentScenario) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663322594677/9fP8B6mGoZquBqpbKiwoeC/hero-background-jdzYFiYR423XrBL6tPDdsT.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Title */}
        <div className="text-center mb-8 animate-bounce-in">
          <h1
            className="text-5xl font-bold mb-2"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              color: "#FF6B6B",
            }}
          >
            Student Life Simulator
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Energy */}
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663322594677/9fP8B6mGoZquBqpbKiwoeC/stat-energy-NSkvHVfp56BrDoeZUoeDBK.webp"
                  alt="Energy"
                  className="w-12 h-12"
                />
              </div>
              <div className="text-sm font-semibold text-gray-600 mb-2">
                Energy
              </div>
              <div
                className={`text-2xl font-bold ${
                  animatingStats.includes("energy") ? "animate-stat-pulse" : ""
                }`}
                style={{ color: "#FFE66D" }}
              >
                {stats.energy}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, stats.energy)}%` }}
                />
              </div>
            </div>

            {/* Grades */}
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663322594677/9fP8B6mGoZquBqpbKiwoeC/stat-grades-7XEZmATCqwSDD8kMyW8wgX.webp"
                  alt="Grades"
                  className="w-12 h-12"
                />
              </div>
              <div className="text-sm font-semibold text-gray-600 mb-2">
                Grades
              </div>
              <div
                className={`text-2xl font-bold ${
                  animatingStats.includes("grades") ? "animate-stat-pulse" : ""
                }`}
                style={{ color: "#457B9D" }}
              >
                {stats.grades}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, stats.grades)}%` }}
                />
              </div>
            </div>

            {/* Social */}
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <span className="text-3xl">👥</span>
              </div>
              <div className="text-sm font-semibold text-gray-600 mb-2">
                Social
              </div>
              <div
                className={`text-2xl font-bold ${
                  animatingStats.includes("social") ? "animate-stat-pulse" : ""
                }`}
                style={{ color: "#FF6B6B" }}
              >
                {stats.social}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-red-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, stats.social)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Character and Scenario */}
          <div className="flex gap-6 mb-8 items-center">
            <div className="flex-shrink-0">
              <img
                src={
                  characterMood === "happy"
                    ? "https://d2xsxph8kpxj0f.cloudfront.net/310519663322594677/9fP8B6mGoZquBqpbKiwoeC/character-happy-ZHjUrbHoBZkYp4CEwMuPTX.webp"
                    : "https://d2xsxph8kpxj0f.cloudfront.net/310519663322594677/9fP8B6mGoZquBqpbKiwoeC/character-tired-P8umt4P7qtsrxjde5DAejp.webp"
                }
                alt="Student Character"
                className="w-32 h-32 animate-character-bob"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg leading-relaxed text-gray-800 min-h-24">
                {currentScenario.text}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentScenario.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleChoice(option)}
                className="w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: "#FF6B6B",
                  color: "white",
                }}
              >
                {option.text}
              </Button>
            ))}
          </div>

          {/* Play Again Button */}
          {currentScenarioId === 7 && (
            <Button
              onClick={resetGame}
              className="w-full mt-6 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "#FFE66D",
                color: "#2C3E50",
              }}
            >
              Play Again
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-700 text-sm">
          <p>Make choices wisely to balance your student life!</p>
        </div>
      </div>
    </div>
  );
}
