import { Layout, Menu, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export default function AppLayout({ children }) {
  const { pathname } = useLocation();
  const rootKey = pathname === "/" ? "/" : `/${pathname.split("/")[1] ?? ""}`;
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      <Header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <Title level={4} style={{ margin: 0, color: "#1677ff" }}>HealthMate</Title>
          <Menu
            mode="horizontal"
            selectedKeys={[rootKey]}
            items={[
              { key: "/", label: <Link to="/">Dashboard</Link> },
              { key: "/upload", label: <Link to="/upload">Upload</Link> },
              { key: "/vitals", label: <Link to="/vitals">Vitals</Link> },
            ]}
            style={{ flex: 1, borderBottom: "none" }}
          />
        </div>
      </Header>
      <Content style={{ padding: "24px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", minHeight: "calc(100vh - 64px - 80px)" }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", background: "transparent" }}>
        HealthMate © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
