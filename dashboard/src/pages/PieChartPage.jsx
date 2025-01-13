import PieChartDisplay from "../components/Charts/PieChart";

const PieChartPage = () => {
  return (
    <div className="page">
      <h2 className="text-2xl font-semibold text-center">
        Auto Manufacturer Sales Insights
      </h2>
      <PieChartDisplay />
    </div>
  );
};

export default PieChartPage;
