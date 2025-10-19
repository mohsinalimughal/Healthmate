import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Input, Select, DatePicker, Button, Alert, Space } from "antd";
import dayjs from "dayjs";
const { Title } = Typography;

export default function UploadReport() {
  const { token } = useAuth(); const nav=useNavigate();
  const [title,setTitle]=useState("");
  const [type,setType]=useState("lab");
  const [takenAt,setTakenAt]=useState("");
  const [file,setFile]=useState(null);
  const [err,setErr]=useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("type", type);
      form.append("takenAt", takenAt);
      form.append("file", file);
      const rep = await api.request("/reports", { method:"POST", isForm:true, body:form, token });
      nav(`/report/${rep._id}`);
    } catch (e) { setErr(e.message); }
  };

  return (
    <Card style={{ maxWidth: 560, margin: "24px auto", width: "100%", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
      <form onSubmit={onSubmit}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3} style={{ margin: 0 }}>Upload Report</Title>
          {err && <Alert type="error" message={err} showIcon />}

          <Input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />

          <Select
            value={type}
            onChange={setType}
            options={[
              { value: "lab", label: "Lab" },
              { value: "prescription", label: "Prescription" },
              { value: "scan", label: "Scan" },
              { value: "other", label: "Other" }
            ]}
            style={{ width: 240 }}
          />

          <DatePicker
            value={takenAt ? dayjs(takenAt) : null}
            onChange={(d)=>setTakenAt(d ? d.format("YYYY-MM-DD") : "")}
            style={{ width: 240 }}
            placeholder="Report date"
          />

          {/* native input to keep FormData logic exactly the same */}
          <input type="file" accept="application/pdf,image/*" onChange={e=>setFile(e.target.files[0])} />

          <Button type="primary" htmlType="submit">Upload</Button>
        </Space>
      </form>
    </Card>
  );
}
