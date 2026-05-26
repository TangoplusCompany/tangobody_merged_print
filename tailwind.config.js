/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SUIT Variable"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'cursive'],
      },
      colors: {
        'accent' : '#5B93FF',
        'blackk' : '#7A828A',
        'redd': {
          400: '#FF7474',
          600: '#FF4A4A',
          500: '#FF766C',
          800: '#953442'
        },
        'orangee' : {
          400: '#FFD7A5',
          600: '#FFA73A',
          500: '#FFA546',
          800: '#CC7B1C'
        },
        'greenn': '#00E006',
        'sub': {
          800: '#454545',
          600: '#7E7E7E',
          400: '#AEAEAE',
          300: '#BFBFBF',
          200: '#DCDCDC',
          150: '#EDEDED',
          100: '#F8F8F8',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

    },
  },
  plugins: [require("tailwindcss-animate")],
}

