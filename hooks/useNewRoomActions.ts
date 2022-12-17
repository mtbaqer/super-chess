import { useRouter } from "next/router";
import supabase from "../supabase";

export default function useNewRoomActions() {
  const router = useRouter();

  async function navigateToNewRoom() {
    try {
      const roomId = await generateNewRoom();
      router.push(`/room/${roomId}`);
    } catch (e) {
      alert("Something went wrong dude.");
    }
  }

  async function generateNewRoom() {
    const { data, error } = await supabase.from("rooms").insert({}).select();
    if (data) {
      return data[0].id;
    }
    if (error) {
      console.error(error);
      throw new Error("Something went wrong dude.");
    }
  }

  return { navigateToNewRoom };
}
