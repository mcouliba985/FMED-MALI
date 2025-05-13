import { createContext, useContext, useState } from 'react';

const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
      const [overlayVisible, setOverlayVisible] = useState(false);

      const showOverlay = () => {
            setOverlayVisible(false);
      };

      return (
            <OverlayContext.Provider value={{ overlayVisible, showOverlay }}>
                  {children}
            </OverlayContext.Provider>
      );
};

export const useOverlay = () => useContext(OverlayContext);
