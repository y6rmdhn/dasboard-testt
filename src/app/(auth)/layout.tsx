import Title from "antd/es/typography/Title";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Title level={3} className="m-0 !text-white">
            Welcome to MyApp
          </Title>
        </div>
        <div className="flex flex-col gap-4 rounded-lg bg-white/10 p-6 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
