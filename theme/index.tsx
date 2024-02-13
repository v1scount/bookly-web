"use client";

import React from "react";
import { ConfigProvider } from "antd";
const isDarkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;

const withTheme = (node: JSX.Element) => (
    <>
        <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorTextPlaceholder: isDarkModeEnabled ? "#5c5c5ce" : "black",
                }
              },

                token: {
                    colorPrimary: "#52c41a",
                },
            }}
        >
            {node}
        </ConfigProvider>
    </>
);

export default withTheme;
