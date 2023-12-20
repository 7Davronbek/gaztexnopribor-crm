import {HashRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {
    AccountantLayout,
    ClientLayout,
    IncpectorsLayout,
    ReceivingLayout,
    SpecialistLayout,
    UzStandardLayout,
} from "./components";
import {
    AccountantClientListPage,
    AccountantToolsPage,
    AddUserPage,
    ClientAccountantPage,
    ClientDocsPage,
    ClientEndPage,
    ClientHistoryPage,
    ClientListPage,
    ClientPaymentPage,
    ClientReceiverPage,
    ClientSpecialist2Page,
    ClientSpecialistPage,
    ClientTestPage,
    Inspector1Page,
    Inspector2Page,
    Main,
    MonitoringPage,
    SpecialistClientHistory,
    SpecialistCliestListPage,
    StandartClientListPage,
} from "./pages";
import SpecialistPaid from "./pages/SPECIALIST/specialist-paid/SpecialistPaid";
import StenClientHistory from "./pages/STEN/StenClientHistory";
import StenClientList from "./pages/STEN/StenClientList";
import StenLayout from "./components/StenLayout";
import DocumentationPage from "./pages/RECEIVING/docs/DocumentationPage";
import ClientPaymeParol from "./pages/CLIENT/ClientPaymeParol";
import ClientPayme from "./pages/CLIENT/ClientPayme";

const App = () => {
    const {userRole} = useSelector((state) => state.auth);
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/client-payme" element={<ClientPayme/>}/>
                    <Route path="/client-payme-parol" element={<ClientPaymeParol/>}/>
                    {userRole === "CLIENT" && (
                        <>
                            {/* CLIENT */}
                            <Route element={<ClientLayout/>}>
                                <Route
                                    path="/client-receiver"
                                    element={<ClientReceiverPage/>}
                                />
                                <Route
                                    path="/client-spesialist"
                                    element={<ClientSpecialistPage/>}
                                />
                                <Route
                                    path="/client-accountant"
                                    element={<ClientAccountantPage/>}
                                />
                                <Route path="/client-payment" element={<ClientPaymentPage/>}/>
                                <Route
                                    path="/client-specialist-2"
                                    element={<ClientSpecialist2Page/>}
                                />
                                <Route path="/client-test" element={<ClientTestPage/>}/>
                                <Route path="/client-docs" element={<ClientDocsPage/>}/>
                                <Route path="/client-end" element={<ClientEndPage/>}/>
                            </Route>
                            {/* CLIENT */}
                        </>
                    )}

                    {userRole === "RECEIVER" && (
                        <>
                            {/* RECEIVING */}
                            <Route element={<ReceivingLayout/>}>
                                <Route path="/monitoring" element={<MonitoringPage/>}/>
                                <Route path="/client-list" element={<ClientListPage/>}/>
                                <Route path="/client-history" element={<ClientHistoryPage/>}/>
                                <Route path="/add-user" element={<AddUserPage/>}/>
                                <Route path="/documentation" element={<DocumentationPage/>}/>
                            </Route>
                            {/* RECEIVING */}
                        </>
                    )}

                    {userRole === "SPECIALIST" && (
                        <>
                            {/* SPECIALIST */}
                            <Route element={<SpecialistLayout/>}>
                                <Route
                                    path="/specialist-client-list"
                                    element={<SpecialistCliestListPage/>}
                                />
                                <Route
                                    path="/specialist-client-history"
                                    element={<SpecialistClientHistory/>}
                                />
                                <Route
                                    path="/specialist-client-paid"
                                    element={<SpecialistPaid/>}
                                />
                            </Route>
                            {/* SPECIALIST */}
                        </>
                    )}
                    {userRole === "STEN" && (
                        <>
                            {/* STEN */}
                            <Route element={<StenLayout/>}>
                                <Route path="/sten-client-list" element={<StenClientList/>}/>
                                <Route
                                    path="/sten-client-history"
                                    element={<StenClientHistory/>}
                                />
                            </Route>
                            {/* STEN */}
                        </>
                    )}
                    {userRole === "ACCOUNTANT" && (
                        <>
                            {/* ACCOUNTANT */}
                            <Route element={<AccountantLayout/>}>
                                <Route
                                    path="/accountant-client-list"
                                    element={<AccountantClientListPage/>}
                                />
                                <Route
                                    path="/accountant-tools"
                                    element={<AccountantToolsPage/>}
                                />
                            </Route>
                            {/* ACCOUNTANT */}
                        </>
                    )}

                    {userRole === "INSPECTOR_1" && (
                        <>
                            {/* INSPECTOR_1 */}
                            <Route element={<IncpectorsLayout/>}>
                                <Route path="/inspector_1" element={<Inspector1Page/>}/>
                            </Route>
                            {/* INSPECTOR_1 */}
                        </>
                    )}

                    {userRole === "INSPECTOR_2" && (
                        <>
                            {/* INSPECTOR_2 */}
                            <Route element={<IncpectorsLayout/>}>
                                <Route path="/inspector_2" element={<Inspector2Page/>}/>
                            </Route>
                            {/* INSPECTOR_2 */}
                        </>
                    )}

                    {userRole === "UZ_STANDARD" && (
                        <>
                            {/* UZ_STANDARD */}
                            <Route element={<UzStandardLayout/>}>
                                <Route
                                    path="/standard-client-list"
                                    element={<StandartClientListPage/>}
                                />
                            </Route>
                            {/* UZ_STANDARD */}
                        </>
                    )}

                    <Route path="*" element={<Main/>}/>
                </Routes>
                <ToastContainer/>
            </HashRouter>
        </>
    );
};

export default App;
