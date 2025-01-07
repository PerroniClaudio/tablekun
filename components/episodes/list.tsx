"use client";

import Episode from "@/types/episode";
import { useState, useEffect } from "react";
import VideoPlayer from "../player";


function EpisodesList({
    episodes
}: {
    episodes: Episode[]
}) {

    let [activeEpisode, setActiveEpisode] = useState<Episode | null>(() => {
        const savedEpisode = localStorage.getItem("activeEpisode");
        return savedEpisode ? JSON.parse(savedEpisode) : null;
    });

    useEffect(() => {
        if (activeEpisode) {
            localStorage.setItem("activeEpisode", JSON.stringify(activeEpisode));
        }
    }, [activeEpisode]);

    let sortedEpisodes = episodes.sort((a, b) => a.order - b.order);

    return (
        <div className="flex flex-col gap-4">
            {activeEpisode && (
                <VideoPlayer
                    episode={activeEpisode}
                />
            )}
            <div className="grid grid-cols-2 gap-4">
                {sortedEpisodes.map((episode) => {

                    let buttonClassname = "bg-tablekun-900"

                    if(activeEpisode) {
                        if(activeEpisode.order > episode.order) {
                            buttonClassname = "bg-tablekun-700"
                        } else if (activeEpisode.order === episode.order) {
                            buttonClassname = "bg-tablekun-500"
                        }
                    }

                    return (
                        <div key={episode.id} data-order={episode.order}>
                            <button onClick={() => setActiveEpisode(episode)} className={`${buttonClassname} text-tablekun-100 p-2 rounded w-full`}>
                                {episode.order + 1}
                            </button>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}
export default EpisodesList