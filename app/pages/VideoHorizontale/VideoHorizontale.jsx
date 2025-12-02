import VideoHGrid from "@/components/VideoHGrid/VideoHGrid";7
import VideoVGrid from "@/components/VideoVGrid/VideoVGrid";
import ShortsProvider from "@/contexts/ApiContextShorts/ApiContextShorts";
import VideoProvider from "@/contexts/ApiContextVideo/ApiContextVideo"



export default function VideoHorizontale() {
  return (
    <>
    <VideoProvider>
         <VideoHGrid/>
    </VideoProvider>
    
    
    </>
  );
}
