import VideoVGrid from "@/components/VideoVGrid/VideoVGrid";
import ShortsProvider from "@/contexts/ApiContextShorts/ApiContextShorts";

import React from 'react';

export default function ShortsPage() {
  return (
    <>
    <ShortsProvider>
        <VideoVGrid/>
    </ShortsProvider>
    </>
  );
}

