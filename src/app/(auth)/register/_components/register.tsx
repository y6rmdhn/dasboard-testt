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
      <Card>
        <Title level={2} className="text-center mb-6">
          Register
        </Title>
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Input bukan email yang valid!" },
              { required: true, message: "Silakan masukkan Email Anda!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Silakan masukkan Password Anda!" },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
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
              size="large"
            />
          </Form.Item>
          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full h-10 font-semibold"
              disabled={isLoading}
              loading={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </Form.Item>
          <div className="text-center mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-600">Sudah punya akun? </span>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Login sekarang!
            </Link>
          </div>
        </Form>
      </Card>
    </PublicWrapper>
  );
};

export default Register;
