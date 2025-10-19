import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import {
  List,
  Card,
  Button,
  Space,
  Typography,
  Divider,
  Tag,
  Tooltip,
  Empty,
} from "antd";
import {
  FileTextOutlined,
  EyeOutlined,
  LogoutOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.request("/reports", { token }).then(setReports).catch(console.error);
  }, [token]);

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}
    >
      {/* Header row */}
      <Space
        align="center"
        style={{ justifyContent: "space-between", width: "100%" }}
      >
        <Title level={3} style={{ margin: 0 }}>
          My Reports
        </Title>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={logout}
          style={{ fontWeight: 500 }}
        >
          Logout
        </Button>
      </Space>

      {/* Content card */}
      <Card
        bordered
        style={{
          boxShadow:
            "0 10px 30px rgba(16,24,40,0.04), 0 4px 10px rgba(16,24,40,0.03)",
          borderRadius: 16,
        }}
        bodyStyle={{ padding: 0 }}
      >
        <List
          itemLayout="vertical"
          dataSource={reports}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>
                    No reports yet —{" "}
                    <Link to="/upload">upload your first report</Link>
                  </span>
                }
                style={{ padding: "32px 0" }}
              />
            ),
          }}
          renderItem={(r) => (
            <List.Item
              key={r._id}
              style={{
                padding: 16,
                borderBottom: "1px solid #f0f2f5",
              }}
              actions={[
                // keeps behavior: open raw file + view insight
                <Tooltip title="Open original file" key="open-file">
                  <Button
                    type="link"
                    href={r.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    icon={<CloudDownloadOutlined />}
                    style={{ paddingLeft: 0 }}
                  >
                    Open file
                  </Button>
                </Tooltip>,
                <Divider type="vertical" key="div" />,
                <Tooltip title="View AI insights" key="view-insight">
                  <Link to={`/report/${r._id}`} style={{ fontWeight: 500 }}>
                    <EyeOutlined style={{ marginRight: 6 }} />
                    View insight
                  </Link>
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background:
                        "linear-gradient(135deg,#e6f4ff 0%, #f6ffed 100%)",
                      display: "grid",
                      placeItems: "center",
                      border: "1px solid #eef2f6",
                    }}
                  >
                    <FileTextOutlined />
                  </div>
                }
                title={
                  <Space size="small" wrap>
                    <Text strong style={{ fontSize: 16 }}>
                      {r.title || "Untitled"}
                    </Text>
                    <Tag color="blue" style={{ borderRadius: 6, marginLeft: 6 }}>
                      {r.type}
                    </Tag>
                  </Space>
                }
                description={
                  <Text type="secondary">
                    {new Date(r.takenAt).toDateString()}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
}
