"use client";
import Episode from '@/types/episode';
import MuxPlayer from '@mux/mux-player-react';

export default function VideoPlayer({
    episode
}: {
    episode: Episode
}) {
  return (
    <>
    
    <div className='bg-tablekun-900 p-4 rounded'>
        <MuxPlayer
            playbackId={episode.mux_id}
            metadata={{
                video_id: episode.id,
                video_title: episode.filename,
                viewer_user_id: "user-id-007",
            }}
        />

        <p>{episode.filename}</p>
    </div>

    </>
  );
}