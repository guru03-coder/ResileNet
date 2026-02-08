# ResileNet 🌐

**ResileNet** is a next-generation Crisis Response & Mesh Network Monitoring Dashboard designed with a modern "Soft UI" aesthetic. It provides real-time situational awareness for emergency operations, focusing on resilient communication networks and geospatial tracking in disaster scenarios.

![Project Status](https://img.shields.io/badge/Status-Prototype-blue)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20Leaflet-10B981)

## ✨ Key Features

### 1. 🗺️ Geospatial God View
- **Interactive Map:** Built with Leaflet & Geoapify, focused on **VIT Chennai (Mambakkam)** context.
- **Live Tracking:** Real-time simulation of mobile assets (Drones, Ambulances, Patrols).
- **Layer Management:** Toggle between Satellite, Terrain, Flood Heatmaps, and Weather Overlays.
- **Geofencing:** Visual indicators for Safe Zones, Assembly Points, and Hazard Areas.

### 2. 📡 Mesh Network Topology
- **Visual Graph:** SVG-based visualization of network nodes (Gateways, Relays, Mobile Units).
- **Health Monitoring:** Track battery levels, signal strength (RSSI), latency, and hop counts.
- **Animated Data Flow:** Visual representation of packet transmission and network healing.

### 3. 🚑 Dispatch Command
- **Unit Management:** Track availability of Fire, Medical, and NDRF units.
- **Route Visualization:** Simulated routing and ETA calculations.
- **Incident Queue:** Priority-based list of pending emergency assignments.

### 4. 🎨 Soft UI Design System
- **Neumorphism-inspired:** Clean, floating panel aesthetics with soft shadows and rounded corners (`border-radius: 40px`).
- **Responsive Layout:** Adaptive sidebar and header components.
- **Micro-interactions:** Smooth transitions, hover effects, and pulsing status indicators.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Maps:** [Leaflet.js](https://leafletjs.com/) & OpenStreetMap/Geoapify
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/resilenet-dashboard.git
   cd resilenet-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 📦 Building for Production

To create a production-ready build (optimized for Vercel/Netlify):

```bash
npm run build
```

The output will be generated in the `dist/` directory.

## 📂 Project Structure

```
resilenet/
├── src/
│   ├── components/       # UI Components (Dashboard, Maps, Sidebar, etc.)
│   ├── constants.tsx     # Mock data and configuration constants
│   ├── types.ts          # TypeScript interfaces
│   ├── App.tsx           # Main application entry
│   └── index.tsx         # React DOM rendering
├── public/               # Static assets
├── index.html            # Entry HTML (Tailwind & Leaflet CDN included)
├── vite.config.ts        # Vite configuration
└── tailwind.config.js    # Tailwind configuration (via CDN in this build)
```

## 🌍 Context

This dashboard is currently configured for a simulation scenario at **VIT Chennai, Mambakkam**, demonstrating how mesh networks can aid in flood response and campus safety.

## 📄 License

MIT License. Free to use for educational and crisis management simulation purposes.