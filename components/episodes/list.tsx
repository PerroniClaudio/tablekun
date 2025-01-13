"use client";

import Episode from "@/types/episode";
import { useState, useEffect } from "react";
import VideoPlayer from "../player";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

function EpisodesList({ episodes }: { episodes: Episode[] }) {
    const [activeEpisode, setActiveEpisode] = useState<Episode | null>(() => {
        const savedEpisode = localStorage.getItem("activeEpisode");
        return savedEpisode ? JSON.parse(savedEpisode) : null;
    });

    const [maxEpisode, setMaxEpisode] = useState<number | null>(() => {
        const savedMaxEpisode = localStorage.getItem("maxEpisode");
        return savedMaxEpisode ? JSON.parse(savedMaxEpisode) : null;
    });

    useEffect(() => {
        if (activeEpisode) {
            localStorage.setItem("activeEpisode", JSON.stringify(activeEpisode));

            if (maxEpisode) {

                let numericvalue = parseInt(activeEpisode.id);

                if (numericvalue > maxEpisode) {
                    localStorage.setItem("maxEpisode", JSON.stringify(activeEpisode.id));
                }
            } else {
                localStorage.setItem("maxEpisode", JSON.stringify(activeEpisode.id));
            }
        }
    }, [activeEpisode, maxEpisode]);

    const seasons: Episode[] = [];

    episodes.forEach((episode) => {
        seasons[episode.season] = episode;
    });

    return (
        <div className="flex flex-col gap-4">
            {activeEpisode && <VideoPlayer episode={activeEpisode} />}
            <Accordion type="single" collapsible>
                {seasons.map((season, index) => {
                    const sortedEpisodes = episodes
                        .filter((episode) => episode.season === index)
                        .sort((a, b) => a.order - b.order);

                    return (
                        <AccordionItem value={"item-" + index} key={index} className="border-tablekun-400">
                            <AccordionTrigger className="text-tablekun-400 hover:no-underline">Season {index}</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid grid-cols-2 gap-4 bg-tablekun-900 p-4 rounded">
                                    {sortedEpisodes.map((episode) => {
                                        let buttonClassname = "bg-tablekun-950";

                                        if (activeEpisode) {
                                            const activeEpisodeId = parseInt(activeEpisode.id);
                                            const episodeId = parseInt(episode.id);

                                            if (activeEpisodeId > episodeId) {
                                                buttonClassname = "bg-tablekun-600";
                                            } else if (activeEpisodeId === episodeId) {
                                                buttonClassname = "bg-tablekun-500";
                                            } else if (maxEpisode && episodeId < maxEpisode) {
                                                buttonClassname = "bg-tablekun-600";
                                            }
                                        }

                                        return (
                                            <div key={episode.id} data-order={episode.order}>
                                                <button
                                                    onClick={() => setActiveEpisode(episode)}
                                                    className={`${buttonClassname} text-tablekun-100 p-2 rounded w-full`}
                                                >
                                                    {episode.order + 1}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}

export default EpisodesList;
