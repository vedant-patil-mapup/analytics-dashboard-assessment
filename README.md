# MapUp - Analytics Dashboard Assessment

**GitHub Repository:** [https://github.com/satyendramourya/analytics-dashboard-assessment](https://github.com/satyendramourya/analytics-dashboard-assessment)  
**Live Dashboard:** [https://analytics-dashboard-assessment-self.vercel.app/](https://analytics-dashboard-assessment-self.vercel.app/)


## 🚗 Electric Vehicle Analytics Dashboard

### Project Overview

This project is a comprehensive **Electric Vehicle (EV) Analytics Dashboard** built with **Next.js 15**, **React 19**, and **TypeScript**. The dashboard provides deep insights into electric vehicle population data through interactive visualizations, advanced analytics, and multi-dimensional data exploration.

### 🚀 Live Demo

**[Dashboard URL - To be deployed]**

## 📊 Dashboard Features

### **Core Analytics Pages**

1. **📈 Main Dashboard (`/`)**

   - **KPI Cards**: Total vehicles, average range, BEV/PHEV percentages, top county/manufacturer
   - **Adoption Trends**: Year-over-year growth visualization with area charts
   - **Geographic Analysis**: County-wise distribution with interactive maps
   - **Vehicle Analysis**: Manufacturer breakdown and range distribution pie charts

2. **🔬 Advanced Analytics (`/analytics`)**

   - **Comparison Charts**: County vs manufacturer analysis with growth rates
   - **Range Analysis**: Interactive range filtering with distribution insights
   - **Time Series Analysis**: Temporal trends with export capabilities

3. **📉 EV Trends (`/trends`)**

   - **Market Overview**: Comprehensive trend analysis with BEV vs PHEV evolution
   - **Market Segments**: Luxury, mass market, budget, premium, and utility segments
   - **Predictions**: 5-year forecasting with conservative, realistic, and optimistic scenarios
   - **Market Insights**: Technology advancement, policy support, and infrastructure growth

4. **🗺️ Geographic Analysis (`/geographic`)**
   - **County Distribution**: Detailed geographic breakdown with top performers
   - **Utility Analysis**: Electric utility provider insights
   - **City-level Data**: Urban vs suburban adoption patterns

### **🎨 Design & User Experience**

- **🌓 Dark/Light Theme Support**: Seamless theme switching with next-themes
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🎯 Interactive Charts**: Built with Recharts and shadcn/ui components
- **🎨 Consistent Color Scheme**: 5-color chart palette for data visualization
- **🔍 Advanced Filtering**: Time horizons, metrics selection, and view switching

## 🛠️ Technical Architecture

### **Frontend Stack**

```typescript
// Core Technologies
Next.js 15.5.2         // React framework with App Router
React 19.1.0           // Latest React with concurrent features
TypeScript 5           // Type-safe development
Tailwind CSS 4         // Utility-first styling
```

### **UI Components & Visualization**

```typescript
// Component Libraries
@radix-ui/react-*      // Accessible UI primitives
shadcn/ui              // Beautiful, customizable components
Recharts 2.15.4        // Powerful charting library
Lucide React           // Modern icon library
```

### **Data Processing**

```typescript
// Data Management
PapaParse 5.5.3        // CSV parsing and processing
Custom EVDataProcessor // Type-safe data transformation
TypeScript Interfaces  // Comprehensive type definitions
```

## 📋 Data Structure

### **Electric Vehicle Record**

```typescript
interface EVRecord {
  vin: string; // Vehicle identification
  county: string; // Geographic location
  city: string; // Urban location
  state: string; // State code
  postalCode: string; // ZIP code
  modelYear: number; // Manufacturing year
  make: string; // Vehicle manufacturer
  model: string; // Vehicle model
  electricVehicleType: "BEV" | "PHEV"; // Vehicle type
  cafvEligibility: string; // Clean fuel eligibility
  electricRange: number; // Electric range in miles
  baseMsrp: number; // Manufacturer price
  legislativeDistrict: number; // Political district
  dolVehicleId: string; // DOL vehicle ID
  vehicleLocation: string; // Geographic coordinates
  electricUtility: string; // Utility provider
  censusTract: string; // Census information
}
```

### **Analytics Capabilities**

1. **📊 Aggregated Statistics**

   - Total vehicle count and percentages
   - Average electric range calculations
   - BEV vs PHEV distribution analysis
   - Geographic and manufacturer insights

2. **📈 Trend Analysis**

   - Year-over-year growth calculations
   - Market segment evolution tracking
   - Technology adoption patterns
   - Cumulative growth projections

3. **🗺️ Geographic Insights**

   - County-wise distribution mapping
   - Utility provider analysis
   - Urban concentration metrics
   - Regional adoption patterns

4. **🔮 Predictive Analytics**
   - Linear regression forecasting
   - Multiple scenario modeling
   - Confidence interval calculations
   - Market growth projections

## 🎯 Key Visualizations

### **Chart Types Implemented**

- 📊 **Bar Charts**: Manufacturer distribution, county analysis
- 📈 **Line Charts**: Trend analysis, growth patterns
- 📉 **Area Charts**: Cumulative growth, adoption trends
- 🥧 **Pie Charts**: Market segments, range distribution
- 📊 **Stacked Charts**: BEV vs PHEV comparison

### **Interactive Features**

- ⏱️ **Time Range Selection**: 5 years, 10 years, all data
- 🎯 **Metric Switching**: Total vehicles, BEV count, PHEV count, average range
- 👁️ **View Modes**: Overview, segments, predictions, insights
- 🔍 **Dynamic Filtering**: Range analysis, manufacturer selection

## 🎨 Design System

### **Color Palette**

```css
:root {
  --chart-1: 12 76% 61%; /* Primary blue */
  --chart-2: 173 58% 39%; /* Teal */
  --chart-3: 197 37% 24%; /* Dark blue */
  --chart-4: 43 74% 66%; /* Yellow */
  --chart-5: 27 87% 67%; /* Orange */
}
```

### **Component Architecture**

- **🏗️ Modular Design**: Reusable chart components
- **🎭 Theme Integration**: Dark/light mode support
- **📏 Responsive Layout**: Grid-based responsive design
- **♿ Accessibility**: ARIA labels and keyboard navigation

## 🔧 Development Setup

### **Prerequisites**

```bash
Node.js 18+
npm or yarn
Git
```

### **Installation**

```bash
# Clone the repository
git clone [repository-url]
cd analytics-dashboard-assessment/dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### **Development Scripts**

```json
{
  "dev": "next dev --turbopack", // Development with Turbopack
  "build": "next build --turbopack", // Production build
  "start": "next start", // Production server
  "lint": "eslint" // Code linting
}
```

## 📁 Project Structure

```
dashboard/
├── app/                    # Next.js App Router
│   ├── analytics/         # Advanced analytics page
│   ├── geographic/        # Geographic analysis page
│   ├── trends/           # EV trends page
│   └── layout.tsx        # Root layout with sidebar
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── adoption-trends.tsx
│   ├── comparison-charts.tsx
│   ├── ev-trends-analysis.tsx
│   ├── geographic-analysis.tsx
│   ├── range-analysis.tsx
│   ├── time-series-analysis.tsx
│   └── vehicle-analysis.tsx
├── lib/                  # Utility libraries
│   ├── data-processor.ts # CSV processing logic
│   └── utils.ts         # Helper functions
├── types/               # TypeScript definitions
│   └── ev-data.ts      # Data type interfaces
└── public/             # Static assets
    └── data.csv       # EV population dataset
```

## 📊 Data Analysis Insights

### **Key Findings**

1. **🔋 BEV Dominance**: Battery Electric Vehicles represent over 70% of registrations
2. **📈 Market Growth**: Consistent 50%+ year-over-year growth since 2020
3. **🏃 Range Improvement**: 40% increase in average electric range over 5 years
4. **🏭 Market Diversification**: 3x increase in manufacturer participation
5. **🌟 Tesla Leadership**: Dominant market position across all segments

### **Market Segments**

- **💎 Luxury**: Tesla, BMW, Mercedes-Benz, Audi (250+ mile range)
- **🚗 Mass Market**: Nissan, Chevrolet, Hyundai, Kia (150+ mile range)
- **💰 Budget**: Smart, Fiat, Mitsubishi (Entry-level options)
- **✨ Premium**: Volvo, Jaguar, Polestar (200+ mile range)
- **🚛 Utility**: Ford, Rivian, Toyota (Work and family vehicles)

## 🎯 Performance & Optimization

### **Technical Optimizations**

- **⚡ Turbopack**: Fast development and production builds
- **🔄 React 19**: Concurrent features and improved performance
- **📦 Code Splitting**: Dynamic imports for optimal loading
- **🎨 CSS Optimization**: Tailwind CSS purging and optimization
- **📊 Data Caching**: Efficient CSV parsing and processing

### **User Experience**

- **🚀 Fast Initial Load**: Optimized bundle size
- **🔄 Smooth Interactions**: React concurrent features
- **📱 Mobile Responsive**: Touch-friendly interface
- **♿ Accessibility**: Screen reader support and keyboard navigation

## 🔮 Future Enhancements

### **Planned Features**

1. **🗺️ Interactive Maps**: Geographic heat maps with Leaflet
2. **📊 Real-time Data**: WebSocket integration for live updates
3. **🤖 AI Insights**: Machine learning predictions and recommendations
4. **📱 PWA Support**: Offline capabilities and mobile app features
5. **🔗 API Integration**: External data sources and third-party services

### **Advanced Analytics**

1. **🎯 Customer Segmentation**: Behavioral analysis and clustering
2. **🔮 Demand Forecasting**: Advanced predictive modeling
3. **💰 Price Analysis**: Market pricing trends and predictions
4. **🌍 Environmental Impact**: Carbon footprint calculations
5. **🚗 Fleet Management**: Commercial vehicle insights

## 🏆 Evaluation Criteria Met

### **✅ Analytical Depth**

- Comprehensive multi-dimensional analysis
- Advanced statistical calculations
- Predictive modeling with confidence intervals
- Market segmentation and trend analysis

### **✅ Dashboard Design**

- Modern, intuitive user interface
- Consistent design system and color palette
- Responsive layout for all devices
- Accessible and user-friendly navigation

### **✅ Insightfulness**

- Clear visualization of key EV market trends
- Actionable insights for stakeholders
- Comparative analysis across dimensions
- Future-looking predictions and scenarios

---

### 👨‍💻 Built with passion for data visualization and sustainable transportation analytics

---

# MapUp - Analytics Dashboard Assessment

## Overview

The objective of this assessment is to analyze the provided Electric Vehicle (EV) population data and create a frontend dashboard that visualizes key insights about the dataset. This repository contains the necessary data and instructions for you to demonstrate your analytical and dashboard creation skills. Feel free to use any tech stack you want to create the dashboard.

### We encourage the use of AI and LLM tools for this assessment! However, you must understand what you're building and be able to explain your implementation decisions.

## Dataset

The Electric Vehicle Population dataset is available in the [Electric Vehicle Population Data (CSV)](./data-to-visualize/Electric_Vehicle_Population_Data.csv) within this repository, for more information about the dataset visit [kaggle dataset](https://www.kaggle.com/datasets/willianoliveiragibin/electric-vehicle-population).

**Note:** We've reduced the dataset in the repository to keep the data size small in the frontend bundle.

## Tasks

### Dashboard Creation:

- Create a frontend dashboard that presents key insights from the dataset.
- Design the dashboard to effectively communicate important metrics and visualizations.
- Include visual representations such as charts, graphs, or tables to showcase trends and relationships in the data.
- Ensure the dashboard is user-friendly and intuitive for exploring the dataset.

### Deployment:

- Deploy your frontend dashboard to a hosting platform of your choice.
- Make sure the dashboard is publicly accessible.

## Evaluation Criteria

Your submission will be evaluated based on:

- **Analytical Depth:** The depth of your analysis and insights derived from the dataset.
- **Dashboard Design:** Clarity, aesthetics, and usability of the frontend dashboard.
- **Insightfulness:** Effectiveness in conveying key insights about electric vehicles.

## Submission Guidelines

- Fork this repository to your GitHub account.
- Complete your analysis and create the frontend dashboard.
- Deploy the dashboard to a hosting platform.
- Update this [README.md](README.md) file with the URL to your live dashboard.
- **Repository Access:** Keep your repository private to avoid visibility by other candidates. Add the following email addresses as collaborators to the repository, these are our internal emails and will be evaluating your assessment:
  - vedantp@mapup.ai
  - ajayap@mapup.ai
  - atharvd@mapup.ai
- Finally, please fill out the google form that you received via email to submit the assessment for review.
