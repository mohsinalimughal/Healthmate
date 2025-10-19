import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Input,
  Select,
  DatePicker,
  Button,
  Alert,
  Space,
  Divider,
  Tag,
  Tooltip,
} from "antd";
import {
  FileAddOutlined,
  CalendarOutlined,
  EditOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;

export default function UploadReport() {
  const { token } = useAuth(); const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("lab");
  const [takenAt, setTakenAt] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("type", type);
      form.append("takenAt", takenAt);
      form.append("file", file);
      const rep = await api.request("/reports", { method: "POST", isForm: true, body: form, token });
      nav(`/report/${rep._id}`);
    } catch (e) { setErr(e.message); }
  };

  return (
    <Card
      style={{
        maxWidth: 680,
        margin: "32px auto",
        width: "100%",
        borderRadius: 18,
        border: "1px solid #eef2f6",
        boxShadow: "0 12px 40px rgba(16,24,40,0.06), 0 6px 18px rgba(16,24,40,0.04)",
      }}
      bodyStyle={{ padding: 28 }}
    >
      <form onSubmit={onSubmit}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Heading */}
          <Space align="center" style={{ width: "100%", justifyContent: "space-between" }}>
            <Space>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(135deg,#e6f4ff 0%, #f6ffed 100%)",
                  border: "1px solid #eef2f6",
                }}
              >
                <FileAddOutlined />
              </div>
              <div>
                <Title level={3} style={{ margin: 0 }}>Upload Report</Title>
                <Text type="secondary">PDFs or images — add a title, type, and date.</Text>
              </div>
            </Space>
          </Space>

          {err && <Alert type="error" message={err} showIcon />}

          {/* Title */}
          <div>
            <div style={{ marginBottom: 6 }}>
              <Text strong>Title</Text>
              <Tag color="blue" style={{ marginLeft: 8, borderRadius: 6 }}>Required</Tag>
            </div>
            <Input
              size="large"
              placeholder="e.g., CBC Panel, Chest X-ray, MRI Brain"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              prefix={<EditOutlined />}
            />
          </div>

          {/* Type & Date row */}
          <Space size="middle" wrap>
            <div>
              <div style={{ marginBottom: 6 }}><Text strong>Type</Text></div>
              <Select
                value={type}
                onChange={setType}
                options={[
                  { value: "lab", label: "Lab" },
                  { value: "prescription", label: "Prescription" },
                  { value: "scan", label: "Scan" },
                  { value: "other", label: "Other" },
                ]}
                style={{ width: 240 }}
                size="large"
              />
            </div>

            <div>
              <div style={{ marginBottom: 6 }}><Text strong>Date taken</Text></div>
              <DatePicker
                value={takenAt ? dayjs(takenAt) : null}
                onChange={(d) => setTakenAt(d ? d.format("YYYY-MM-DD") : "")}
                style={{ width: 240 }}
                placeholder="Select date"
                size="large"
                suffixIcon={<CalendarOutlined />}
              />
            </div>
          </Space>

          {/* File input — same native input, just styled wrapper */}
          <div>
            <div style={{ marginBottom: 6 }}>
              <Text strong>Report file</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>(PDF or image)</Text>
            </div>

            <label
              htmlFor="report-file"
              style={{
                display: "block",
                border: "1px dashed #dbe3ec",
                background: "#fafcff",
                borderRadius: 14,
                padding: 20,
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c4d4ea")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#dbe3ec")}
            >
              <Space align="center" style={{ width: "100%", justifyContent: "space-between" }}>
                <Space>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: "grid",
                      placeItems: "center",
                      background: "#f0f7ff",
                      border: "1px solid #e5efff",
                    }}
                  >
                    <InboxOutlined />
                  </div>
                  <div>
                    <Text strong>{file ? file.name : "Click to choose a file"}</Text>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Max size depends on server settings • Accepted: .pdf, .png, .jpg
                      </Text>
                    </div>
                  </div>
                </Space>
                <Tooltip title="Pick a file from your device">
                  <Button type="default" size="large">Browse</Button>
                </Tooltip>
              </Space>
            </label>

            <input
              id="report-file"
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }} // visually hide, keep exact native behavior
            />
          </div>

          <Divider style={{ margin: "8px 0 0" }} />

          {/* Submit */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button size="large">Cancel</Button>
            <Button type="primary" htmlType="submit" size="large">
              Upload
            </Button>
          </div>
        </Space>
      </form>
    </Card>
  );
}
