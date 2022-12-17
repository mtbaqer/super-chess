import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

console.log(process.env.SUPABASE_URL!);

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export default supabase;
