import React from "react";
import ReactDOM from "react-dom/client";
import AppRoot from "./App.jsx";
import { App, ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 12,
          fontSize: 14,
          colorBgLayout: "#f5f7fb",
          colorText: "#1f2737",
          colorTextSecondary: "#6b7280",
          colorBorder: "#eef2f6",
          colorLink: "#1677ff",
          colorLinkHover: "#0958d9",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
            footerBg: "transparent",
            bodyBg: "#f5f7fb",
          },
          Menu: {
            itemBorderRadius: 10,
            itemMarginInline: 8,
            horizontalItemSelectedColor: "#1677ff",
            horizontalItemSelectedBg: "rgba(22,119,255,0.06)",
          },
          Button: {
            borderRadius: 8,
            controlHeight: 38,
            controlOutlineWidth: 0,
          },
          Card: {
            borderRadiusLG: 16,
            boxShadowTertiary:
              "0 4px 12px rgba(16,24,40,0.04), 0 2px 6px rgba(16,24,40,0.03)",
          },
          Input: {
            borderRadius: 8,
          },
          Table: {
            borderRadiusLG: 12,
            headerBg: "#ffffff",
          },
          Typography: {
            titleMarginBottom: 8,
          },
        },
      }}
    >
      <App>
        <AppRoot />
      </App>
    </ConfigProvider>
  </React.StrictMode>
);
