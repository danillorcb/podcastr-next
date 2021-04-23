import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void; 
  playList: (list: Episode[], index: number) => void; 
  hasNext: boolean;
  hasPrevious: boolean;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  tooglePlay: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProvider = {
  children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProvider) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function tooglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function playNext() {
    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider 
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playList,
        hasNext,
        hasPrevious,
        playNext,
        playPrevious,
        isPlaying,
        tooglePlay,
        setPlayingState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}
