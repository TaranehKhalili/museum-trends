# Museum Visitor Trends Dashboard

A real-time data visualization dashboard built with Next.js, TypeScript, and Highcharts that displays museum visitor trends with live updates via Server-Sent Events (SSE).

## 🚀 Features

### ✅ Core Requirements Completed

- **Interactive Line Chart**: Highcharts visualization with zoom, tooltips, and legends
- **Real-Time Updates**: Pub/Sub architecture with SSE for live data streaming
- **API Integration**: RESTful endpoints for data updates
- **Professional Architecture**: Modular, type-safe, and scalable codebase

### 📊 Chart Features

- **Zoomable Time Periods**: Click and drag to zoom into specific time ranges
- **Toggleable Legends**: Click legend items to show/hide museum lines
- **Axis Scaling**: Logarithmic scale handles outliers effectively
- **Interactive Tooltips**: Hover for detailed visitor counts
- **Responsive Design**: Works on desktop and mobile devices

### 🔄 Real-Time Features

- **Live Connection Status**: Visual indicator with pulsing animation
- **Auto-Reconnection**: Resilient to network interruptions with configurable retry logic
- **Multiple Concurrent Users**: Supports multiple browser connections (configurable via `EVENT_MANAGER_CONFIG.MAX_LISTENERS`)
- **Smart Data Merging**: Efficiently combines initial CSV data with real-time updates
- **Stateless Architecture**: No session persistence - each browser tab connects independently

## 🏗️ Architecture

### **Frontend (React/Next.js)**

```
components/
├── VisitorTrendsChart.tsx      # Highcharts chart component
├── RealTimeChartWrapper.tsx    # Real-time data wrapper
├── StateDisplay.tsx           # Error/loading states
└── VisitorDashboard.tsx       # Main dashboard component

hooks/
└── useVisitorUpdates.ts       # SSE subscription hook
```

### **Backend (Next.js API Routes)**

```
app/api/
├── visitors/route.ts          # POST endpoint for data updates
└── visitors/stream/route.ts  # SSE streaming endpoint

lib/
├── constants/index.ts         # Centralized configuration
├── pubsub/eventManager.ts     # EventEmitter pub/sub system
├── chart/
│   ├── chartConfig.ts         # Highcharts configuration
│   └── chartUtils.ts          # Data transformation utilities
└── data/dataService.ts        # CSV parsing and data fetching
```

### **Data Flow**

```
CSV Data → DataService → Chart Utils → Highcharts
     ↓
Postman → POST API → EventManager → SSE Stream → Browser
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Charts**: Highcharts 12.4.0
- **Data Parsing**: Papa Parse 5.5.3
- **Linting**: Biome 2.2.4
- **Package Manager**: pnpm

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd museum-trends

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test:run
```

### Available Scripts

```bash
pnpm dev          # Start development server (port 3000)
pnpm build        # Build for production
pnpm start        # Run production build
pnpm test         # Run tests in watch mode
pnpm test:run     # Run tests once
pnpm test:ui      # Run tests with UI
pnpm lint         # Run Biome linter
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Format code with Biome
pnpm send-update  # Send test data to dashboard (real-time updates)
```

## 🧪 Testing Real-Time Updates

### 1. Open the Dashboard

Navigate to `http://localhost:3000` to see the museum visitor trends chart.

### 2. Send Real-Time Updates (Easy Method)

**Option A: Using the built-in script (Recommended)**

```bash
# Send sample data
pnpm send-update

# Send custom data from file
pnpm send-update --data=./my-data.json

# Send to custom URL
pnpm send-update --url=http://localhost:3000/api/visitors
```

**Option B: Using Postman**

**Endpoint**: `POST http://localhost:3000/api/visitors`

**Headers**:

```
Content-Type: application/json
```

**Body** (raw JSON):

```json
[
  { "date": "2015-01-01", "museum": "Avila Adobe", "value": 99999 },
  { "date": "2015-02-01", "museum": "Firehouse Museum", "value": 88888 },
  { "date": "2015-03-01", "museum": "Chinese American Museum", "value": 77777 }
]
```

### 3. Observe Real-Time Updates

- Chart updates instantly without page reload
- Connection status shows "Live Updates Active" with pulsing green indicator
- Multiple browser tabs receive updates simultaneously
- Each browser tab maintains its own independent connection (stateless)

### 4. Test Multiple Browser Behavior

**What happens when you open multiple browsers:**

1. **Open Browser Tab 1**: Connects to SSE stream, shows chart
2. **Open Browser Tab 2**: Creates separate connection, shows same chart
3. **Send POST from Postman**: Both tabs receive update simultaneously
4. **Close Tab 1**: Tab 2 continues working independently
5. **No Session State**: Each connection is completely independent

**Configuration Options:**

- Modify `EVENT_MANAGER_CONFIG.MAX_LISTENERS` to change max concurrent connections
- Adjust `SSE_CONFIG.RECONNECT_INTERVAL` for reconnection timing
- Update `CHART_CONFIG.HEIGHT` for chart dimensions

### 5. Custom Data Files

Create your own data files for testing:

```json
// my-data.json
[
  { "date": "2015-01-01", "museum": "Avila Adobe", "value": 50000 },
  { "date": "2015-02-01", "museum": "Firehouse Museum", "value": 75000 }
]
```

Then send with:

```bash
pnpm send-update --data=./my-data.json
```

## 📁 Project Structure

```
museum-trends/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and services
│   ├── chart/            # Chart configuration
│   ├── data/             # Data services
│   └── pubsub/           # Pub/Sub system
├── types/                 # TypeScript type definitions
├── data/                  # CSV data files
├── scripts/               # Utility scripts
│   ├── send-update.js     # Data update script
│   └── sample-data.json   # Sample test data
└── public/                # Static assets
```

## 🔧 Key Implementation Details

### **Configuration Management**

All system settings are centralized in `lib/constants/index.ts` for easy maintenance:

```typescript
// API Endpoints
API_ENDPOINTS = {
  VISITORS: "/api/visitors",
  VISITORS_STREAM: "/api/visitors/stream",
};

// SSE Configuration
SSE_CONFIG = { RECONNECT_INTERVAL: 3000, MAX_RECONNECT_ATTEMPTS: 5 };

// Chart Configuration
CHART_CONFIG = { HEIGHT: 700, ANIMATION_DURATION: 1000 };

// Event Manager Configuration
EVENT_MANAGER_CONFIG = { MAX_LISTENERS: 50, EVENT_NAME: "visitor-update" };
```

### **Pub/Sub Architecture**

- **EventManager**: Singleton EventEmitter for server-side messaging
- **SSE Streaming**: Long-lived connections for real-time updates
- **Stateless Design**: No session persistence - each browser tab connects independently
- **Auto-Reconnection**: Client-side resilience with configurable retry intervals
- **Concurrent Support**: Configurable maximum listeners (default: 50)

**How Multiple Browsers Work:**

- Each browser tab opens its own SSE connection
- All connections subscribe to the same EventManager
- When data is published, ALL connected browsers receive updates simultaneously
- No session state is maintained - each connection is independent

### **Data Processing**

- **CSV Parsing**: Robust Papa Parse integration with error handling
- **Data Transformation**: Efficient wide-to-long format conversion
- **Smart Merging**: Map-based deduplication for real-time updates
- **Configurable Paths**: CSV file location defined in constants

### **Chart Configuration**

- **Modular Design**: Separated config, utils, and components
- **Type Safety**: Full TypeScript support throughout
- **Performance**: Optimized rendering with useMemo
- **Configurable Settings**: Chart dimensions, animations, and styling in constants

## 🎯 Assignment Requirements Met

✅ **Interactive Line Chart**: Highcharts with zoom, tooltips, legends  
✅ **Real-Time Updates**: SSE pub/sub architecture  
✅ **API Endpoint**: POST /api/visitors for data updates  
✅ **No Page Reload**: Live chart updates via SSE  
✅ **Professional Architecture**: Clean, modular, type-safe code with centralized configuration  
✅ **Error Handling**: Graceful error states and recovery  
✅ **Documentation**: Comprehensive README and code comments  
✅ **Configuration Management**: Centralized constants for easy maintenance  
✅ **Stateless Design**: No session persistence - scalable concurrent connections

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The app builds successfully with `pnpm build` and can be deployed to any Node.js hosting platform.

## 📝 License

This project is created for educational purposes as part of a data visualization assignment.

---

**Built with ❤️ using Next.js, TypeScript, and Highcharts**
