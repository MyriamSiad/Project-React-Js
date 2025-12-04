import { createContext,  useState, useEffect } from "react";

export const ShortsContext = createContext();

export default   function ShortsProvider({children}) {

  
   const[shorts , setShorts] = useState([]);
    
    
    
async function fetchShorts(){

   let shortsVideos = [];

     try{
        const response = await fetch("https://pixabay.com/api/videos/?key=53491275-f65fe58845b72f8bb3705c835&category=computer&min_width=720&min_height=1280&per_page=30&safesearch=true");

        if(!response.ok){
            console.log("erreur dans l'api PixaBay");
        }

        const datas =  await response.json();
   datas.hits.forEach(video=> {
        shortsVideos.push ({
            "id" : video.id,
            "tags" : video.tags,
            "duration" : video.duration,
            "url" : video.videos.small.url,
            "thumbnail" : video.videos.medium.thumbnail,
            "views" : video.views,
            "userImageURL" : video.userImageURL,
            "user" : video.user
        })
    });
        setShorts(shortsVideos);
        console.log(shorts);
      }catch(err){
        console.error(err);
      }
   
    }

// Exemple d'appel :
// addVideoToHistory('abc123def456');
    
  return (
    <>
        <ShortsContext.Provider value ={{
            shorts, fetchShorts
        }}>
            {children}
        </ShortsContext.Provider>
    </>
  );
}
