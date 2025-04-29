import React, { useState } from 'react';

function DrawerSubMenu({ title, links }) {
      const [open, setOpen] = useState(false);

      return (
            <div className="mb-3">
                  <button
                        className="w-full text-start py-2 px-4 flex gap-3 items-center text-lg text-dark rounded"
                        onClick={() => setOpen(!open)}
                  >
                        {title}{' '}
                        {open ? <i class="fas fa-angle-up"></i> : <i class="fas fa-angle-down"></i>}
                  </button>
                  {open && (
                        <ul className="list-unstyled ms-3 mt-2 px-3 text-base">
                              {links.map((link, index) => (
                                    <li key={index} className="mb-2">
                                          <a
                                                href={link.href}
                                                className="text-decoration-none text-dark"
                                          >
                                                {link.label}
                                          </a>
                                    </li>
                              ))}
                        </ul>
                  )}
            </div>
      );
}

export default DrawerSubMenu;
