import { supabase } from "../../lib/initSupabase";


export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}