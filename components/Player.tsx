"use client"

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongs from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongs(song!);
    if (!song || !player || !songUrl) {
        return null;
    }
    return ( <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">Player</div> );
}
 
export default Player;