"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PublicWrapper from "@/components/PublicWrapper";

const { Title } = Typography;

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      await signOut(auth);

      message.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        message.error("Email sudah terdaftar.");
      } else if (error.code === "auth/weak-password") {
        message.error("Password terlalu lemah. Minimal 6 karakter.");
      } else {
        message.error("Registrasi gagal. Silakan coba lagi.");
      }
      console.error("Register Error:", error);
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
            Register
          </Title>
          <Form name="register" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                { type: "email", message: "Input bukan email yang valid!" },
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
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Silakan konfirmasi Password Anda!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password yang Anda masukkan tidak cocok!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register"}
              </Button>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                Sudah punya akun?{" "}
                <Link href="/login" className="text-blue-500">
                  Login sekarang!
                </Link>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PublicWrapper>
  );
};

export default Register;
