import VideoHorizontale from "../VideoHorizontale/VideoHorizontale"
import VideoHGrid from "@/components/VideoHGrid/VideoHGrid"
import VideoProvider from "@/contexts/ApiContextVideo/ApiContextVideo"
export default function HomePage() {

    return(<>
    <h1>Je suis la page d'acceuil</h1>
    <VideoProvider>
         <VideoHGrid/>
    </VideoProvider>
    </>)
}