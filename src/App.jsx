
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import AuthProvider from "./auth/AuthContext";
  import ProtectedRoute from "./auth/ProtectedRoute";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Dashboard from "./pages/Dashboard";
  import UploadReport from "./pages/UploadReport";
  import Vitals from "./pages/Vitals";
  import ReportView from "./pages/ReportView";
  import AppLayout from "./Layout";

  export default function App() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/upload" element={<ProtectedRoute><UploadReport /></ProtectedRoute>} />
              <Route path="/report/:id" element={<ProtectedRoute><ReportView /></ProtectedRoute>} />
              <Route path="/vitals" element={<ProtectedRoute><Vitals /></ProtectedRoute>} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    );
  }
