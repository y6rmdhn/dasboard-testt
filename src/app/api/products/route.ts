import { NextResponse, NextRequest } from "next/server";
import api from "@/lib/axiosInstance";

export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    const headers: { [key: string]: string } = {};
    if (authorizationHeader) {
      headers["authorization"] = authorizationHeader;
    }

    const { searchParams } = new URL(req.url);
    const response = await api.get("/products", {
      headers,
      params: searchParams,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error in GET /api/products:", error.message);
    return NextResponse.json(
      { error: "Gagal mengambil data dari API eksternal" },
      { status: 500 }
    );
  }
}
