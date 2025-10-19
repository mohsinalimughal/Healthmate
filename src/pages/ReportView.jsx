import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Card, Typography, List, Skeleton, Space, Alert } from "antd";
const { Title, Text } = Typography;

export default function ReportView() {
  const { id } = useParams(); const { token } = useAuth();
  const [insight, setInsight] = useState(null);
  const [status, setStatus] = useState("loading");
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr(""); setStatus("loading");
        const got = await api.request(`/insights/${id}`, { token });
        setInsight(got); setStatus("done");
      } catch {
        try {
          const gen = await api.request(`/insights/${id}/generate`, { method:"POST", token });
          setInsight(gen); setStatus("done");
        } catch (e) {
          setErr(e.message); setStatus("done");
        }
      }
    })();
  }, [id, token]);

  if (status==="loading") return <Skeleton active paragraph={{ rows: 6 }} />;
  if (err) return <Alert type="error" message={err} showIcon />;
  if (!insight) return <Alert type="warning" message="No insight available." showIcon />;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <Title level={3} style={{ margin: 0 }}>AI Summary</Title>

      <Card title="English" style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <Text>{insight.summaryEn}</Text>
      </Card>

      <Card title="Roman Urdu" style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <Text>{insight.summaryUr}</Text>
      </Card>

      {!!insight.flags?.length && (
        <Card title="Flags" style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
          <List dataSource={insight.flags} renderItem={(f)=> <List.Item>{f}</List.Item>} />
        </Card>
      )}

      <Card title="Questions for Doctor" style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <List dataSource={insight.doctorQuestions} renderItem={(q)=> <List.Item>{q}</List.Item>} />
      </Card>

      <Text type="secondary" style={{ fontSize: 12 }}>{insight.disclaimer}</Text>
    </Space>
  );
}
