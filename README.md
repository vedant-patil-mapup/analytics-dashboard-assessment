# MapUp - Analytics Dashboard Assessment

## Overview


This project implements a modern, interactive dashboard for analyzing Electric Vehicle (EV) population data. The dashboard is built using React and TypeScript, with Vite as the build tool. It visualizes key insights from the dataset, allowing users to filter, explore, and understand trends in EV adoption.

### Key Features
- Interactive charts and tables for EV data exploration
- Filtering by make, type, and year range
- Responsive, user-friendly UI
- Modular component architecture

### Technology Stack
- **React** (UI library)
- **TypeScript** (type safety)
- **Vite** (build tool)
- **ApexCharts** (data visualization)

## Dataset

The Electric Vehicle Population dataset is available in the [Electric Vehicle Population Data (CSV)](./data-to-visualize/Electric_Vehicle_Population_Data.csv) within this repository, for more information about the dataset visit [kaggle dataset](https://www.kaggle.com/datasets/willianoliveiragibin/electric-vehicle-population).

**Note:** We've reduced the dataset in the repository to keep the data size small in the frontend bundle.

## Tasks


## Component Breakdown & Use Cases

### Main Components

#### `App.tsx`
Root component that renders the `Dashboard` page.

#### `Dashboard.tsx`
Central page that orchestrates data loading, filtering, and visualization. It:
- Loads and parses EV data from CSV
- Manages filter state
- Passes filtered data to child components
- Renders analytics cards, charts, and tables

#### `Header.tsx`
Displays the dashboard title and a brief description.

#### `Filters.tsx`
Provides dropdowns and inputs for filtering EV data by make, type, and year range. Updates dashboard views based on user selection.

#### `AnalyticsCard.tsx`
Shows key metrics (e.g., total EVs, average range, top make) in a compact, visually distinct card format.

#### `ChartCard.tsx`
Reusable wrapper for charts. Uses ApexCharts to visualize:
- EV population by make
- Type distribution
- EVs by year
- Stacked EV types over time
- CAFV eligibility breakdown
- Electric range buckets
- MSRP distribution
- Year vs. range scatter
- Top makes trend

#### `DataTable.tsx`
Displays tabular data for top models and top counties, with sorting and responsive design.

#### `useEVData.ts`
Custom React hook for loading, parsing, and aggregating EV data. Handles CSV fetch, parsing, and computes domain values for filters.

#### `evAggregations.ts`
Selector logic for aggregating and filtering EV data based on user-selected filters.

#### `ev.ts` (types)
Type definitions for EV records, aggregates, and filter objects.

## Example User Flow
1. User lands on dashboard, sees summary cards and charts
2. User filters by make/type/year, dashboard updates instantly
3. User explores trends, distributions, and top models/counties
4. All visualizations and tables update based on filters

## Deployment
- Deployed on Vercel


## Evaluation Criteria

Your submission will be evaluated based on:

- **Analytical Depth:** The depth of your analysis and insights derived from the dataset.
- **Dashboard Design:** Clarity, aesthetics, and usability of the frontend dashboard.
- **Insightfulness:** Effectiveness in conveying key insights about electric vehicles.

## Submission Guidelines


## Live Dashboard
Add your deployed dashboard URL here: `https://analytics-dashboard-assessment-xi.vercel.app/`

## Repository Access
Keep your repository private. Add the following emails as collaborators:
- vedantp@mapup.ai
- ajayap@mapup.ai
- atharvd@mapup.ai

## Submission
Fill out the Google form received via email to submit your assessment for review.
