# MapUp - Analytics Dashboard Assessment

* EV Analytics Dashboard :
An interactive analytics dashboard for exploring Electric Vehicle (EV) registration data with filtering, insights, and visualizations. The project is designed with performance, scalability, and user experience in mind.

🔗 Live Dashboard Link: https://evdataanalysis.netlify.app/

* Features

1.  Advanced Filtering – Filter EV data by state, county, city, make, model, year, EV type, and more.

2. Interactive Charts & Metrics – Visual breakdown of EV adoption trends, manufacturers, states, and categories.

3. Dynamic Insights Banner – Auto-rotating banner with key EV adoption highlights.

4. Dark/Light Theme Support – Toggle between light and dark modes.

5. Export Data – Download filtered results as CSV using PapaParse.

6. Lazy Loading & Suspense – Improves performance by loading heavy components only when needed.

7. Responsive UI – Optimized for desktop and mobile experiences.


* Tech Stack

1. Frontend Framework: React + TypeScript
2. Styling: Tailwind CSS
3. Icons: Lucide React
4. CSV Handling: PapaParse
5. Custom Hooks – For state management and data processing (useEVData, useProcessedData, useChartData, etc.)
6. Reusable Components – Header, MetricCard, SummaryCards, ErrorDisplay, etc.


* Performance Optimizations

1. Code Splitting & Lazy Loading :
FilterPanel and ChartsGrid are loaded lazily with React.lazy + Suspense to reduce initial bundle size.

2. Memoization & Callbacks :
Used useMemo and useCallback to prevent unnecessary re-renders in filters, insights, and data processing.

3. Data Export Optimization :
CSV export handled efficiently with Blob & URL.createObjectURL to avoid memory leaks.

4. Auto-rotating Insights :
Lightweight interval-based rotating insights with clearInterval cleanup for performance safety.

5. Responsive Design :
Optimized layouts with Tailwind grid and flex utilities to avoid heavy CSS computations.

6. Theming Optimization :
Centralized theme constants (LIGHT_COLORS, DARK_COLORS, getThemeClasses) for consistent styling without redundant re-renders.