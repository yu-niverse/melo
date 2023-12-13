import { createContext, useContext, useMemo, useState } from "react";

export const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const setCurrentSong_ = (song) => {
    setCurrentSong(song);
  };

  const contextValue = useMemo(
    () => ({
      currentSong,
      setCurrentSong_,
    }),
    [currentSong]
  );

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  return useContext(MusicContext);
};

export default MusicProvider;
