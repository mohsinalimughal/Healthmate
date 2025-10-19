import { useState } from "react";
import { api } from "../api";
import { useNavigate, Link } from "react-router-dom";
import { Card, Typography, Input, Button, Alert, Space } from "antd";
const { Title, Text } = Typography;

export default function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [ok,setOk]=useState(false);
  const nav=useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk(false);
    try {
      await api.request("/auth/register", { method:"POST", body:{ name, email, password }});
      setOk(true); setTimeout(()=>nav("/login"), 700);
    } catch (e) { setErr(e.message); }
  };

  return (
    <Card style={{ maxWidth: 460, margin: "40px auto", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
      <form onSubmit={onSubmit}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3} style={{ marginBottom: 0 }}>Create account</Title>
          {err && <Alert type="error" message={err} showIcon />}
          {ok && <Alert type="success" message="Registered! Please log in." showIcon />}
          <Input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input.Password placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button type="primary" htmlType="submit" block>Create account</Button>
          <Text type="secondary">
            Have an account? <Link to="/login">Login</Link>
          </Text>
        </Space>
      </form>
    </Card>
  );
}
