# Munich District Timeline - Interactive Map

An interactive web application for visualizing Munich's city districts with demographic data over time. Built with modern web technologies including Vite, D3.js, and TypeScript.

## Features

- **Interactive Map**: Click on any Munich district to view detailed information
- **Time-based Data**: Use the year slider to see how demographics change over time
- **Color-coded Visualization**: Districts are color-coded based on average population age
- **Detailed Side Panel**: View district-specific information and historical trends
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Stack**: Built with Vite for fast development and TypeScript for type safety

## Technology Stack

- **Vite** - Fast build tool and dev server
- **D3.js v7** - Data-driven visualization library
- **TypeScript** - Type-safe JavaScript
- **Modern CSS** - Clean, responsive styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd district-timeline-muc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Data Sources

### Geographic Data (District Boundaries)
The map uses SVG path data for Munich's 25 city districts. The district boundaries are rendered using D3.js.

### Statistical/Demographic Data
The data is retrieved from Munich's Open Data portal:
- **Source**: https://www.opengov-muenchen.de
- **Dataset**: Indikatorenatlas - Bevölkerung Altersdurchschnitt
- **Metrics**: Average age by district from 2000-2019
- **File**: `data.csv` in the project root

### District Images
District images should be placed in the `img/districts/` directory. If an image is not available, the app gracefully handles the missing image.

## Project Structure

```
district-timeline-muc/
├── src/
│   ├── components/          # UI components
│   │   ├── MapComponent.ts        # Main map visualization
│   │   ├── LegendComponent.ts     # Color legend
│   │   └── SidePanelComponent.ts  # District details panel
│   ├── data/                # Data and constants
│   │   └── districts.ts           # District names and mappings
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── dataUtils.ts           # Data loading and processing
│   ├── styles/              # CSS styles
│   │   └── main.css
│   └── main.ts             # Application entry point
├── data.csv                 # Demographic data
├── map.svg                  # SVG map with district paths
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies

```

## Usage

1. **View the Map**: The application loads with a map of Munich's 25 districts
2. **Select a District**: Click on any district to view its details in the side panel
3. **Adjust Time Period**: Use the year slider at the bottom to view data from different years
4. **View Trends**: The side panel shows a chart of how the selected metric changes over time for that district
5. **Color Legend**: The legend at the bottom of the map explains the color coding

## Development

### Adding New Metrics

To add additional metrics beyond average age:

1. Update the data loading in `src/utils/dataUtils.ts`
2. Add a selector UI element in `index.html`
3. Update the color scale and legend accordingly

### Customizing Styles

Edit `src/styles/main.css` to customize colors, fonts, and layout.

### Adding District Images

Place images in `img/districts/` with filenames matching the pattern defined in `src/data/districts.ts`.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

ISC

## Acknowledgments

- Data provided by the City of Munich Open Data portal
- Map visualizations powered by D3.js