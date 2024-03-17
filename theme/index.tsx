"use client";

import React from "react";
import { ConfigProvider } from "antd";
import { useTheme } from "next-themes";
const withTheme = (node: JSX.Element) => {
  const { theme } = useTheme();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 4,
          },
          components: {
            Button: {
              colorPrimary: "#52c41a",
              defaultColor: theme === "dark" ? "#fff" : "#373D3F",
              defaultBg: theme === "dark" ? "#1f2937" : "#fff",
              defaultHoverBg: theme === "dark" ? "#253142" : "#c5c5c5",
            },
          },
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#52c41a",
                defaultColor: theme === "dark" ? "#fff" : "#373D3F",
                defaultBg: theme === "dark" ? "#1f2937" : "#fff",
                defaultHoverBg: theme === "dark" ? "#253142" : "#c5c5c5",
              },
            },
          }}
        >
          {node}
        </ConfigProvider>
      </ConfigProvider>
    </>
  );
};

export default withTheme;
