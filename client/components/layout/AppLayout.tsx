import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main className="content-area">{children}</main>
        </div>
      </div>
    </div>
  );
}
