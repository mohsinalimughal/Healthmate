import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { List, Card, Button, Space, Typography, Divider } from "antd";
const { Title, Text } = Typography;

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [reports,setReports]=useState([]);

  useEffect(() => {
    api.request("/reports", { token }).then(setReports).catch(console.error);
  }, [token]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      <Space align="center" style={{ justifyContent: "space-between", width: "100%" }}>
        <Title level={3} style={{ margin: 0 }}>My Reports</Title>
        <Button onClick={logout}>Logout</Button>
      </Space>

      <Card style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <List
          itemLayout="vertical"
          dataSource={reports}
          locale={{ emptyText: "No reports yet" }}
          renderItem={(r) => (
            <List.Item key={r._id}>
              <List.Item.Meta
                title={
                  <Space size="small">
                    <Text strong>{r.title || "Untitled"}</Text>
                    <Text type="secondary">• {r.type}</Text>
                  </Space>
                }
                description={<Text type="secondary">{new Date(r.takenAt).toDateString()}</Text>}
              />
              <Space>
                <a href={r.fileUrl} target="_blank" rel="noreferrer">Open file</a>
                <Divider type="vertical" />
                <Link to={`/report/${r._id}`}>View insight</Link>
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
}
