import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import {
  App,
  ConfigProvider,
  Layout,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Typography,
  Input,
  DatePicker,
  Space,
  Table,
  Tooltip,
  Flex,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const themeConfig = {
  token: { borderRadius: 12, colorBgLayout: "#f7f8fa", colorPrimary: "#1677ff" },
  components: {
    Layout: { headerBg: "#ffffff", headerPadding: 0, bodyBg: "#f7f8fa", siderBg: "#ffffff" },
    Card: { paddingLG: 20 },
  },
};

function VitalsInner() {
  const { token } = useAuth();
  const [vitals, setVitals] = useState([]);
  const [form, setForm] = useState({ date: "", bpSys: "", bpDia: "", sugar: "", weight: "", notes: "" });

  const load = () => api.request("/vitals", { token }).then(setVitals).catch(console.error);
  useEffect(load, [token]);

  const submit = async (e) => {
    e.preventDefault();
    await api.request("/vitals", {
      method: "POST",
      token,
      body: {
        ...form,
        bpSys: +form.bpSys || null,
        bpDia: +form.bpDia || null,
        sugar: +form.sugar || null,
        weight: +form.weight || null,
      },
    });
    setForm({ date: "", bpSys: "", bpDia: "", sugar: "", weight: "", notes: "" });
    load();
  };

  const columns = [
    { title: "Date", dataIndex: "date", render: (d) => (d ? new Date(d).toDateString() : "-"), width: 180 },
    { title: "BP (Sys/Dia)", render: (_, r) => `${r.bpSys ?? "-"} / ${r.bpDia ?? "-"}`, width: 160 },
    { title: "Sugar (mg/dL)", dataIndex: "sugar", render: (v) => v ?? "-", width: 150 },
    { title: "Weight (kg)", dataIndex: "weight", render: (v) => v ?? "-", width: 140 },
    { title: "Notes", dataIndex: "notes", render: (v) => v || "-" },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: 1100, margin: "0 auto" }}>
      <Flex align="center" justify="space-between" wrap>
        <Title level={3} style={{ margin: 0 }}>
          Vitals
        </Title>
        <Tooltip title="Add a new vitals entry">
          <Button type="primary" icon={<PlusOutlined />} htmlType="submit" form="vitals-form">
            Add
          </Button>
        </Tooltip>
      </Flex>

      <Card style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)", borderRadius: 16 }}>
        <form id="vitals-form" onSubmit={submit}>
          <Space wrap size="middle">
            <DatePicker
              value={form.date ? dayjs(form.date) : null}
              onChange={(d) => setForm((f) => ({ ...f, date: d ? d.format("YYYY-MM-DD") : "" }))}
              placeholder="Date"
              style={{ width: 180 }}
            />
            <Input
              placeholder="BP Systolic"
              value={form.bpSys}
              onChange={(e) => setForm((f) => ({ ...f, bpSys: e.target.value }))}
              style={{ width: 160 }}
            />
            <Input
              placeholder="BP Diastolic"
              value={form.bpDia}
              onChange={(e) => setForm((f) => ({ ...f, bpDia: e.target.value }))}
              style={{ width: 160 }}
            />
            <Input
              placeholder="Sugar (mg/dL)"
              value={form.sugar}
              onChange={(e) => setForm((f) => ({ ...f, sugar: e.target.value }))}
              style={{ width: 180 }}
            />
            <Input
              placeholder="Weight (kg)"
              value={form.weight}
              onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
              style={{ width: 160 }}
            />
            <Input
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              style={{ minWidth: 240, flex: 1 }}
            />
          </Space>
        </form>
      </Card>

      <Card style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)", borderRadius: 16 }}>
        <Table
          rowKey={(r) => r._id || `${r.date}-${r.bpSys}-${r.bpDia}-${Math.random()}`}
          dataSource={vitals}
          columns={columns}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          scroll={{ x: 800 }}
        />
      </Card>
    </Space>
  );
}

export default function Vitals() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider theme={themeConfig}>
      <App>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint="lg"
            width={240}
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <Flex align="center" justify="center" style={{ height: 64 }}>
              <Space>
                <Avatar size={28} style={{ background: "#1677ff" }} icon={<UserOutlined />} />
                {!collapsed && <span style={{ fontWeight: 700, fontSize: 16 }}>My Admin</span>}
              </Space>
            </Flex>
            <div style={{ padding: "0 16px" }}>
              <Link to="/">
                <Button type="text" icon={<HomeOutlined />} block style={{ textAlign: "left", fontWeight: 500 }}>
                  Dashboard
                </Button>
              </Link>
              <Link to="/vitals">
                <Button type="text" block style={{ textAlign: "left", fontWeight: 500 }}>
                  Vitals
                </Button>
              </Link>
            </div>
          </Sider>

          <Layout>
            <Header
              style={{
                background: "#fff",
                paddingInline: 16,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <Flex align="center" justify="space-between">
                <Space align="center">
                  <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                  <Breadcrumb
                    items={[
                      {
                        title: (
                          <Link to="/">
                            <Space size={6}>
                              <HomeOutlined /> Home
                            </Space>
                          </Link>
                        ),
                      },
                      { title: "Vitals" },
                    ]}
                  />
                </Space>
                <Space>
                  <Input allowClear size="middle" placeholder="Search" prefix={<SearchOutlined />} style={{ width: 240 }} />
                  <Tooltip title="Notifications">
                    <Button type="text" icon={<BellOutlined />} />
                  </Tooltip>
                  <Tooltip title="Help">
                    <Button type="text" icon={<QuestionCircleOutlined />} />
                  </Tooltip>
                  <Avatar size={36} icon={<UserOutlined />} />
                </Space>
              </Flex>
            </Header>

            <Content style={{ padding: 24 }}>
              <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <VitalsInner />
              </div>
            </Content>

            <Footer
              style={{
                textAlign: "center",
                background: "transparent",
                color: "rgba(0,0,0,0.45)",
              }}
            >
              © {new Date().getFullYear()} My Admin. All rights reserved.
            </Footer>
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}
