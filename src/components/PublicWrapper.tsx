"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spin } from "antd";

const PublicWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Jika loading selesai DAN user sudah ada (login), redirect ke halaman utama
    if (!loading && user) {
      router.replace("/products");
    }
  }, [user, loading, router]);

  // Selama loading, tampilkan spinner
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  // Jika tidak ada user (belum login), tampilkan konten halaman (form login/register)
  if (!user) {
    return <>{children}</>;
  }

  // Jika ada user (dan akan di-redirect), jangan render apa-apa agar tidak ada flash content
  return null;
};

export default PublicWrapper;
