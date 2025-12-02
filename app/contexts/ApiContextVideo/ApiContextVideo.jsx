import { createContext,  useState, useEffect } from "react";

export const VideosContext = createContext();

export default   function VideoProvider({children}) {

    const [videos , setVideos] = useState([]);
   // const[shorts , setShorts] = useState([]);
    
    
    
async function fetchVideoH(){
    let donneesVideoHorizontale = []
   //let donneeVideoVerticale = []
     try{
        const response = await fetch("https://pixabay.com/api/videos/?key=53491275-f65fe58845b72f8bb3705c835&category=nature&min_width=450&min_height=250&per_page=30&safesearch=true");

        if(!response.ok){
            console.log("erreur dans l'api PixaBay");
        }

        const datas =  await response.json();
   datas.hits.forEach(video=> {
        donneesVideoHorizontale.push ({
            "id" : video.id,
            "tags" : video.tags,
            "duration" : video.duration,
            "url" : video.videos.small.url,
            "thumbnail" : video.videos.small.thumbnail,
            "views" : video.views,
            "userImageURL" : video.userImageURL,
            "user" : video.user
        })
    });
        setVideos(donneesVideoHorizontale);
        console.log(videos);
      }catch(err){
        console.error(err);
      }
   
    }

    
  return (
    <>
        <VideosContext.Provider value ={{
            videos, fetchVideoH
        }}>
            {children}
        </VideosContext.Provider>
    </>
  );
}
