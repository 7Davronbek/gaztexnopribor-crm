import { HashRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  AccountantLayout,
  // NotFound,
  ReceivingLayout,
  SpecialistLayout,
} from "./components";
import {
  AccountantClientListPage,
  AccountantToolsPage,
  ClientHistoryPage,
  ClientListPage,
  Main,
  MonitoringPage,
  SpecialistClientHistory,
  SpecialistCliestListPage,
} from "./pages";
import { useSelector } from "react-redux";
import Inspector1Page from "./pages/INSPECTOR1/Inspector1Page";
import IncpectorsLayout from "./components/IncpectorsLayout";
import Inspector2Page from "./pages/INSPECTOR2/Inspector2Page";
import ClientLayout from "./components/ClientLayout";
import ClientPage1 from "./pages/CLIENT/ClientPage1";

const App = () => {
  const { userRole } = useSelector((state) => state.auth);
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main />} />

          {userRole === "CLIENT" && (
            <>
              {/* CLIENT */}
              <Route element={<ClientLayout />}>
                <Route path="/client" element={<ClientPage1 />} />
                <Route path="/client-2" element={<ClientPage1 />} />
              </Route>
              {/* CLIENT */}
            </>
          )}

          {userRole === "RECEIVER" && (
            <>
              {/* RECEIVING */}
              <Route element={<ReceivingLayout />}>
                <Route path="/monitoring" element={<MonitoringPage />} />
                <Route path="/client-list" element={<ClientListPage />} />
                <Route path="/client-history" element={<ClientHistoryPage />} />
              </Route>
              {/* RECEIVING */}
            </>
          )}

          {userRole === "SPECIALIST" && (
            <>
              {/* SPECIALIST */}
              <Route element={<SpecialistLayout />}>
                <Route
                  path="/specialist-client-list"
                  element={<SpecialistCliestListPage />}
                />
                <Route
                  path="/specialist-client-history"
                  element={<SpecialistClientHistory />}
                />
              </Route>
              {/* SPECIALIST */}
            </>
          )}

          {userRole === "ACCOUNTANT" && (
            <>
              {/* ACCOUNTANT */}
              <Route element={<AccountantLayout />}>
                <Route
                  path="/accountant-client-list"
                  element={<AccountantClientListPage />}
                />
                <Route
                  path="/accountant-tools"
                  element={<AccountantToolsPage />}
                />
              </Route>
              {/* ACCOUNTANT */}
            </>
          )}

          {userRole === "INSPECTOR_1" && (
            <>
              {/* INSPECTOR_1 */}
              <Route element={<IncpectorsLayout />}>
                <Route path="/inspector_1" element={<Inspector1Page />} />
              </Route>
              {/* INSPECTOR_1 */}
            </>
          )}

          {userRole === "INSPECTOR_2" && (
            <>
              {/* INSPECTOR_2 */}
              <Route element={<IncpectorsLayout />}>
                <Route path="/inspector_2" element={<Inspector2Page />} />
              </Route>
              {/* INSPECTOR_2 */}
            </>
          )}

          <Route path="*" element={<Main />} />
        </Routes>
        <ToastContainer />
      </HashRouter>
    </>
  );
};

export default App;
