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
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const response = await api.get("/product", {
      headers,
      params: { productId },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error in GET /api/product:", error.message);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    const headers: { [key: string]: string } = {};
    if (authorizationHeader) {
      headers["authorization"] = authorizationHeader;
    }

    const body = await req.json();
    const response = await api.post("/product", body, { headers });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error in POST /api/product:", error.message);
    return NextResponse.json(
      { error: "Gagal membuat produk" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    const headers: { [key: string]: string } = {};
    if (authorizationHeader) {
      headers["authorization"] = authorizationHeader;
    }

    const body = await req.json();
    const response = await api.put("/product", body, { headers });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error in PUT /api/product:", error.message);
    return NextResponse.json(
      { error: "Gagal mengupdate produk" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    const headers: { [key: string]: string } = {};
    if (authorizationHeader) {
      headers["authorization"] = authorizationHeader;
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const response = await api.delete("/product", {
      headers,
      params: { productId },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error in DELETE /api/product:", error.message);
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}
