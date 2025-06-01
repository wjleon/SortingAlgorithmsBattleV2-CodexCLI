# Sorting Algorithms Battle V2

A modern, interactive visualization tool that allows you to compare different sorting algorithms side-by-side in real-time. Watch as two algorithms compete to sort the same data set, complete with visual animations and sound effects.

> **Note**: This repository is part of the blog post ["What a Comeback: Google Firebase Studio Strikes Back This Time, Lovable Still Performs Flawlessly"](https://medium.com/@wjleon/what-a-comeback-google-firebase-studio-strikes-back-this-time-lovable-still-performs-flawlessly-cc9aafabaf6c) on Medium.

## 🚀 Features

- **Side-by-side Comparison**: Compare two sorting algorithms simultaneously
- **10 Sorting Algorithms**: Choose from:
  - Bubble Sort
  - Quick Sort
  - Merge Sort
  - Heap Sort
  - Insertion Sort
  - Selection Sort
  - Shell Sort
  - Tim Sort
  - Radix Sort
  - Counting Sort
- **Data Distribution Options**:
  - Random
  - Ascending (already sorted)
  - Descending (reverse sorted)
  - Split Ascending
  - Split Descending
- **Interactive Controls**:
  - Adjustable array size (10-100 elements)
  - Variable sorting speed
  - Pause/Resume functionality
  - Sound effects toggle
- **Real-time Visualization**: Watch the algorithms work with color-coded comparisons and swaps
- **Modern UI**: Built with React, Next.js, and Tailwind CSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SortingAlgorithmsBattleV2-CodexCLI.git
cd SortingAlgorithmsBattleV2-CodexCLI
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

1. **Select Algorithms**: Choose two different sorting algorithms from the dropdown menus
2. **Configure Array**: 
   - Set the number of elements using the slider
   - Choose a data distribution pattern
3. **Adjust Settings**:
   - Set the visualization speed (lower = faster)
   - Toggle sound effects on/off
4. **Start the Battle**: Click "Start Battle" to begin the visualization
5. **Control Playback**: Use Pause/Resume to control the visualization, or Reset to start over

## 🏗️ Project Structure

```
SortingAlgorithmsBattleV2-CodexCLI/
├── components/
│   ├── ControlPanel.tsx      # Main control interface
│   └── VisualizationPanel.tsx # Sorting visualization component
├── pages/
│   ├── _app.tsx             # Next.js app configuration
│   └── index.tsx            # Main page component
├── styles/
│   └── globals.css          # Global styles
├── utils/                   # Utility functions (if any)
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🛡️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: Next.js built-in

## 🎯 Future Enhancements

- Add more sorting algorithms
- Performance metrics and comparisons
- Step-by-step mode
- Algorithm complexity information
- Export visualization as GIF/video
- Mobile responsive improvements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by various sorting algorithm visualizers
- Built with modern web technologies
- Special thanks to the open-source community

---

Made with ❤️ by [Your Name] 