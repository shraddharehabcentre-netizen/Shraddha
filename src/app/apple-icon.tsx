import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F0FDFA",
          borderRadius: "40px",
          border: "6px solid #0F766E",
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="26" r="10" fill="#D97706" />
          <path
            d="M50 32C40 44 40 58 50 68C60 58 60 44 50 32Z"
            fill="#0F766E"
          />
          <path
            d="M47 67C32 61 25 48 30 36C38 42 44 54 47 67Z"
            fill="#0D9488"
          />
          <path
            d="M53 67C68 61 75 48 70 36C62 42 56 54 53 67Z"
            fill="#0D9488"
          />
          <path
            d="M21 58C25 75 37 83 50 83C63 83 75 75 79 58"
            stroke="#0F766E"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}