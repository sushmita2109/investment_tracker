import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import InvestorsPage from "./Pages/Investors/InvestorsPage";
import MainLayout from "./Layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import InvesmentPage from "./Pages/Invesment/InvesmentPage";
import PayoutPage from "./Pages/Payout/PayoutPage";
import Reports from "./Pages/Reports/Reports";

function App() {
  return (
    <>
      <Routes>
        {/* Without Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* With Navbar */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/investors"
          element={
            <MainLayout>
              <InvestorsPage />
            </MainLayout>
          }
        />
        <Route
          path="/invesment"
          element={
            <MainLayout>
              <InvesmentPage />
            </MainLayout>
          }
        />
        <Route
          path="/payout"
          element={
            <MainLayout>
              <PayoutPage />
            </MainLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <MainLayout>
              <Reports />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
