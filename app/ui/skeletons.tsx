import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ContentLoader from "react-content-loader";
import Image from "next/image";

const BooksSkeleton = (props: any) => (
  <>
    {Array.from({ length: 6 }, (_, index) => (
      <ContentLoader
        key={index}
        speed={2}
        width={192}
        height={320}
        viewBox="0 0 200 320"
        backgroundColor="#f3f3f3"
        foregroundColor="#c0c0c0"
        {...props}
      >
        <rect x="4" y="285" rx="4" ry="4" width="152" height="12" />
        <rect x="4" y="305" rx="4" ry="4" width="122" height="12" />
        <rect x="4" y="1" rx="4" ry="4" width="192" height="274" />
      </ContentLoader>
    ))}
  </>
);

export default BooksSkeleton;
