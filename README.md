# Student Life Simulator

A fun, interactive game built with React and Tailwind CSS where you make choices to balance your student life across three key stats: Energy, Grades, and Social life.

## Features

- **Interactive Gameplay**: Make meaningful choices that affect your stats
- **Dynamic Character**: Character mood changes based on energy levels
- **Stat Tracking**: Monitor Energy, Grades, and Social stats with visual progress bars
- **Multiple Scenarios**: 7 unique scenarios with branching paths
- **Animated UI**: Smooth animations and transitions for engaging gameplay
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: Wouter
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Font**: Fredoka (Google Fonts)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/student-life-simulator.git
cd student-life-simulator

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm preview
```

## How to Play

1. Start the game and read the scenario
2. Choose one of the available options
3. Watch how your choice affects your stats
4. Continue through 6 scenarios to reach the final results
5. See your final score and play again!

## Game Mechanics

Each choice affects your stats:
- **Energy**: Decreases with activities, increases with rest
- **Grades**: Increases with studying, decreases when you skip lectures
- **Social**: Increases with social activities, decreases with isolation

Your final score depends on balancing all three stats!

## File Structure

```
client/
  public/          # Static assets
  src/
    pages/         # Page components
    components/    # Reusable UI components
    contexts/      # React contexts
    index.css      # Global styles & animations
    main.tsx       # Entry point
    App.tsx        # Router & layout
```

## Customization

### Adding New Scenarios
Edit `client/src/pages/Home.tsx` and add new scenario objects to the `scenarios` array.

### Changing Colors
Modify the color values in `Home.tsx` or update the theme in `client/src/index.css`.

### Adjusting Animations
Animation keyframes are defined in `client/src/index.css`.

## License

MIT

## Author

Built with Manus

---

**Enjoy balancing your student life!** 🎓
