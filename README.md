# EV Analytics Dashboard

A production-ready frontend dashboard to analyze and visualize Electric Vehicle (EV) population data. This project provides key insights into EV adoption trends, manufacturer dominance, and geographic distribution.

## Live Demo
[View Live Dashboard](https://ev-analytics-dashboard-demo.vercel.app) *(Note: This is a placeholder URL for the assessment)*

## Key Insights Derived
- **Adoption Trends**: There is a clear exponential growth in EV adoption starting from around 2011, accelerating significantly in recent years (2018-2023).
- **Market Dominance**: Tesla is the dominant manufacturer in this dataset, followed by Nissan and Chevrolet.
- **EV Types**: Battery Electric Vehicles (BEVs) significantly outnumber Plug-in Hybrid Electric Vehicles (PHEVs), indicating a strong shift towards fully electric solutions.
- **Range Evolution**: Average electric range has improved over time, though some newer PHEVs still keep the average lower compared to pure BEVs.

## Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Data Parsing**: PapaParse (CSV Parsing)
- **Icons**: Lucide React

## Project Structure
The project is located in the `dashboard` directory.
- `src/hooks/useEVData.ts`: Custom hook for fetching and parsing the CSV data.
- `src/components/Charts.tsx`: Reusable chart components.
- `src/components/DashboardStats.tsx`: Key metrics summary cards.
- `src/components/DataTable.tsx`: Interactive data table with search and pagination.

## Local Setup Instructions

1. **Navigate to the dashboard directory**:
   ```bash
   cd dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *Note: Ensure you have Node.js installed.*

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Assumptions & Limitations
- **Dataset Size**: The dashboard performs client-side processing. With ~50,000 records, this is performant on modern devices. For significantly larger datasets (e.g., millions of rows), server-side aggregation or a database would be required.
- **Data Quality**: The application assumes the CSV format remains consistent. Rows with missing VINs are filtered out.
- **Location**: The project assumes the CSV file is located at `/public/data/Electric_Vehicle_Population_Data.csv`.

## Evaluation Notes
- **Analytical Depth**: The dashboard computes aggregations on the fly to show top manufacturers and trends.
- **Design**: Focused on a clean, professional "corporate dashboard" aesthetic using a slate color palette.
- **Explainability**: Code is modular and typed with TypeScript for clarity.

---
*Original Assessment README follows below*
[Link to original instructions if needed]
