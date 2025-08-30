# Dashboard Components

This directory contains all the reusable components for the Electric Vehicle Analytics Dashboard.

## Component Structure

### Core Components

- **`SummaryCards`** - Displays summary statistics in card format
- **`ChartContainer`** - Wrapper component for consistent chart styling
- **`VehicleTypesChart`** - Pie chart for vehicle type distribution
- **`YearlyChart`** - Line chart for vehicle count by model year
- **`Filters`** - Filter controls for data filtering
- **`DataTable`** - Data table with sorting and pagination
- **`LoadingSpinner`** - Loading state component
- **`ErrorDisplay`** - Error state component

### Utility Components

- **`ChartContainer`** - Provides consistent styling and structure for all charts
- **`LoadingSpinner`** - Reusable loading spinner with customizable message
- **`ErrorDisplay`** - Error display with optional retry functionality

## Usage

All components are exported from the main index file:

```tsx
import {
  SummaryCards,
  ChartContainer,
  VehicleTypesChart,
  YearlyChart,
  Filters,
  DataTable,
  LoadingSpinner,
  ErrorDisplay
} from '../../components';
```

## Component Props

### SummaryCards
```tsx
interface SummaryCardsProps {
  stats: SummaryStats;
}
```

### ChartContainer
```tsx
interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
```

### VehicleTypesChart
```tsx
interface VehicleTypesChartProps {
  data: TypeChartData[];
  totalVehicles: number;
}
```

### YearlyChart
```tsx
interface YearlyChartProps {
  data: YearChartData[];
}
```

### Filters
```tsx
interface FiltersProps {
  makeFilter: string;
  cityFilter: string;
  yearFilter: string;
  typeFilter: string;
  onMakeFilterChange: (value: string) => void;
  onCityFilterChange: (value: string) => void;
  onYearFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  data: VehicleData[];
}
```

### DataTable
```tsx
interface DataTableProps {
  data: VehicleData[];
  currentPage: number;
  pageSize: number;
  sortField: keyof VehicleData;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof VehicleData) => void;
  onPageSizeChange: (size: number) => void;
  onPageChange: (page: number) => void;
}
```

### LoadingSpinner
```tsx
interface LoadingSpinnerProps {
  message?: string;
}
```

### ErrorDisplay
```tsx
interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}
```

## Benefits

- **Reusability**: Components can be used across different parts of the application
- **Maintainability**: Each component has a single responsibility
- **Type Safety**: Full TypeScript support with proper interfaces
- **Consistency**: Consistent styling and behavior across components
- **Testing**: Easy to test individual components in isolation
