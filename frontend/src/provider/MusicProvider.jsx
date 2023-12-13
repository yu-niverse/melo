import { createContext, useContext, useMemo, useState } from "react";

export const MusicContext = createContext();

const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong_] = useState(null);

  const setCurrentSong = (song) => {
    setCurrentSong_(song);
  };

  const contextValue = useMemo(
    () => ({
      currentSong,
      setCurrentSong,
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
