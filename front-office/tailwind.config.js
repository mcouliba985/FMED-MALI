/** @type {import('tailwindcss').Config} */
module.exports = {
      content: ['./src/**/*.{js,jsx,ts,tsx}'],
      theme: {
            extend: {
                  fontFamily: {
                        poppins: ['Poppins', 'sans-serif'],
                        nunito: ['"Nunito Sans"', 'sans-serif'],
                        roboto: ['Roboto', 'sans-serif'],
                  },

                  colors: {
                        deepgreen: '#122F2A',
                        limegold: '#CCC50E',
                        medgreen: '#2A8A39',
                        gold: '#FFC107',
                        light: 'F5F4F4',
                        blushmist: 'F3EFEF',
                  },
            },
      },
      plugins: [],
};
