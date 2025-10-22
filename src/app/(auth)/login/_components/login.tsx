"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import PublicWrapper from "@/components/PublicWrapper";
import Link from "next/link";

const { Title } = Typography;

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      message.success("Login berhasil!");
      router.push("/products");
    } catch (error) {
      message.error("Login gagal. Periksa kembali email dan password Anda.");
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f0f2f5",
        }}
      >
        <Card style={{ width: 400 }}>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            Login
          </Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Silakan masukkan Email Anda!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Silakan masukkan Password Anda!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Log in"}
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
              <Typography.Text>
                Belum punya akun? <Link href="/register">Daftar di sini</Link>
              </Typography.Text>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PublicWrapper>
  );
};

export default Login;
