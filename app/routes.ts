import { type RouteConfig, index,route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("/playlist" , "routes/playlist.tsx"),
    route("/historique" , 'routes/historique.tsx'),
    route("/shorts" , "routes/shorts.tsx"),
    //("*", "routes/error.tsx")
] satisfies RouteConfig;
