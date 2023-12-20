import EmploeesTable from "./components/EmployeesTable";
import Statistics from "./components/Statistics";

const MonitoringPage = () => {
  return (
    <>
      <div className="MonitoringPage RightStyle">
        <Statistics />
        <EmploeesTable />
      </div>
    </>
  );
};

export default MonitoringPage;
