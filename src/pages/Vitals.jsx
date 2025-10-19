import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { Card, Typography, Input, DatePicker, Button, Space, Table } from "antd";
import dayjs from "dayjs";
const { Title } = Typography;

export default function Vitals() {
  const { token } = useAuth();
  const [vitals,setVitals]=useState([]);
  const [form,setForm]=useState({ date:"", bpSys:"", bpDia:"", sugar:"", weight:"", notes:"" });

  const load = () => api.request("/vitals", { token }).then(setVitals).catch(console.error);
  useEffect(load, [token]);

  const submit = async (e) => {
    e.preventDefault();
    await api.request("/vitals",{ method:"POST", token, body:{
      ...form, bpSys:+form.bpSys||null, bpDia:+form.bpDia||null,
      sugar:+form.sugar||null, weight:+form.weight||null
    }});
    setForm({ date:"", bpSys:"", bpDia:"", sugar:"", weight:"", notes:"" });
    load();
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (d) => d ? new Date(d).toDateString() : "-"
    },
    {
      title: "BP (Sys/Dia)",
      render: (_,r)=> `${r.bpSys ?? "-"} / ${r.bpDia ?? "-"}`
    },
    { title: "Sugar (mg/dL)", dataIndex: "sugar", render: v => v ?? "-" },
    { title: "Weight (kg)", dataIndex: "weight", render: v => v ?? "-" },
    { title: "Notes", dataIndex: "notes", render: v => v || "-" },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", maxWidth: 1000, margin: "0 auto" }}>
      <Title level={3} style={{ margin: 0 }}>Vitals</Title>

      <Card style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <form onSubmit={submit}>
          <Space wrap size="middle">
            <DatePicker
              value={form.date ? dayjs(form.date) : null}
              onChange={(d)=>setForm(f=>({...f, date: d? d.format("YYYY-MM-DD") : ""}))}
              placeholder="Date"
            />
            <Input placeholder="BP Systolic" value={form.bpSys} onChange={e=>setForm(f=>({...f,bpSys:e.target.value}))} style={{ width: 150 }} />
            <Input placeholder="BP Diastolic" value={form.bpDia} onChange={e=>setForm(f=>({...f,bpDia:e.target.value}))} style={{ width: 150 }} />
            <Input placeholder="Sugar (mg/dL)" value={form.sugar} onChange={e=>setForm(f=>({...f,sugar:e.target.value}))} style={{ width: 160 }} />
            <Input placeholder="Weight (kg)" value={form.weight} onChange={e=>setForm(f=>({...f,weight:e.target.value}))} style={{ width: 150 }} />
            <Input placeholder="Notes" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{ minWidth: 220 }} />
            <Button type="primary" htmlType="submit">Add</Button>
          </Space>
        </form>
      </Card>

      <Card style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
        <Table
          rowKey={(r) => r._id || `${r.date}-${r.bpSys}-${r.bpDia}-${Math.random()}`}
          dataSource={vitals}
          columns={columns}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </Space>
  );
}
