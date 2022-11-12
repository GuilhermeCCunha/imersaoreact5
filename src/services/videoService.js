import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://agiddpqoamxrqnawgipv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnaWRkcHFvYW14cnFuYXdnaXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1ODM2MTQsImV4cCI6MTk4MjE1OTYxNH0.aH02ulyAWA-Z4U3Z1LhFnxOrAZEILXrh4vKsK8S9zPg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}