import { useState } from 'react';

const useHeaderMenu = () => {
      const [isOpen, setIsOpen] = useState(false);

      const toogleMenu = () => setIsOpen((prev) => !prev);
      const closeMenu = () => setIsOpen(false);

      return { isOpen, toogleMenu, closeMenu };
};

export default useHeaderMenu;
