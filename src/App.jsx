import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import AuthProvider from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadReport from "./pages/UploadReport";
import Vitals from "./pages/Vitals";
import ReportView from "./pages/ReportView";

import { ConfigProvider, Layout, Menu, Typography } from "antd";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function Nav() {
  const { pathname } = useLocation();
  const rootKey = pathname === "/" ? "/" : `/${pathname.split("/")[1] ?? ""}`;

  return (
    <Header
      style={{
        background: "#ffffffaa",
        backdropFilter: "saturate(180%) blur(10px)",
        WebkitBackdropFilter: "saturate(180%) blur(10px)",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: 0,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 16px",
          height: 64,
        }}
      >
        <Title
          level={4}
          style={{
            margin: 0,
            background:
              "linear-gradient(90deg, #1677ff 0%, #52c41a 45%, #13c2c2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: 0.2,
          }}
        >
          HealthMate
        </Title>

        <Menu
          mode="horizontal"
          selectedKeys={[rootKey]}
          items={[
            { key: "/", label: <Link to="/">Dashboard</Link> },
            { key: "/upload", label: <Link to="/upload">Upload</Link> },
            { key: "/vitals", label: <Link to="/vitals">Vitals</Link> },
          ]}
          style={{
            flex: 1,
            borderBottom: "none",
            background: "transparent",
            marginLeft: 8,
          }}
        />
      </div>
    </Header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff",
              borderRadius: 12,
              colorBgLayout: "#f5f7fb",
              colorText: "#1f2737",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji','Segoe UI Emoji'",
            },
            components: {
              Menu: {
                itemBorderRadius: 10,
                itemMarginInline: 6,
                itemPaddingInline: 14,
                horizontalItemSelectedColor: "#1677ff",
                horizontalItemHoverColor: "#1677ff",
                horizontalItemSelectedBg: "rgba(22,119,255,0.06)",
                horizontalItemHoverBg: "transparent",
                itemColor: "#475569",
              },
              Typography: {
                titleMarginTop: 0,
                titleMarginBottom: 0,
              },
              Layout: {
                headerPadding: 0,
                bodyBg: "#f5f7fb",
              },
            },
          }}
        >
          <Layout
            style={{
              minHeight: "100vh",
              background:
                "linear-gradient(180deg, #f7f9ff 0%, #f5f7fb 40%, #f5f7fb 100%)",
            }}
          >
            <Nav />
            <Content style={{ padding: "24px 16px" }}>
              <div
                style={{
                  maxWidth: 1100,
                  margin: "0 auto",
                  width: "100%",
                  display: "block",
                  minHeight: "calc(100vh - 64px - 80px)",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #eef2f6",
                    borderRadius: 16,
                    boxShadow:
                      "0 10px 30px rgba(16,24,40,0.04), 0 4px 10px rgba(16,24,40,0.03)",
                    padding: 24,
                  }}
                >
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/upload"
                      element={
                        <ProtectedRoute>
                          <UploadReport />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/report/:id"
                      element={
                        <ProtectedRoute>
                          <ReportView />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/vitals"
                      element={
                        <ProtectedRoute>
                          <Vitals />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
                background: "transparent",
                color: "#6b7280",
              }}
            >
              <span style={{ opacity: 0.9 }}>
                HealthMate © {new Date().getFullYear()}
              </span>
            </Footer>
          </Layout>
        </ConfigProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
