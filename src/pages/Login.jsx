import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Card, Typography, Input, Button, Alert, Space } from "antd";
const { Title, Text } = Typography;

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const nav=useNavigate();
  const { login }=useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { token, user } = await api.request("/auth/login", { method:"POST", body:{ email, password }});
      login(user, token); nav("/");
    } catch (e) { setErr(e.message); }
  };

  return (
    <Card style={{ maxWidth: 420, margin: "40px auto", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
      <form onSubmit={onSubmit}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3} style={{ marginBottom: 0 }}>Login</Title>
          {err && <Alert type="error" message={err} showIcon />}
          <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input.Password placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button type="primary" htmlType="submit" block>Login</Button>
          <Text type="secondary">
            No account? <Link to="/register">Register</Link>
          </Text>
        </Space>
      </form>
    </Card>
  );
}
