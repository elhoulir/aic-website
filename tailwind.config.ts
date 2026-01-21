import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - Deep teal/navy blue (#01476b)
        primary: {
          50: '#e6f3f8',
          100: '#cce7f1',
          200: '#99cfe3',
          300: '#66b7d5',
          400: '#339fc7',
          500: '#0187b9',
          600: '#016c94',
          700: '#01476b', // Main primary color
          800: '#013a56',
          900: '#012d42',
          950: '#001a27',
        },
        // Secondary palette - Vibrant green (#00ad4c)
        green: {
          50: '#e6f9ed',
          100: '#ccf3db',
          200: '#99e7b7',
          300: '#66db93',
          400: '#33cf6f',
          500: '#00ad4c', // Main green color
          600: '#008a3d',
          700: '#00682e',
          800: '#00451f',
          900: '#002310',
          950: '#001108',
        },
        // Accent - Lime green (#98c93c)
        lime: {
          50: '#f5fbe8',
          100: '#ebf7d1',
          200: '#d7efa3',
          300: '#c3e775',
          400: '#afdf47',
          500: '#98c93c', // Main lime color
          600: '#7aa130',
          700: '#5b7924',
          800: '#3d5018',
          900: '#1e280c',
          950: '#0f1406',
        },
        // Gold for CTAs and important highlights
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        // Teal mapped to primary for backward compatibility
        teal: {
          50: '#e6f3f8',
          100: '#cce7f1',
          200: '#99cfe3',
          300: '#66b7d5',
          400: '#339fc7',
          500: '#0187b9',
          600: '#016c94',
          700: '#01476b',
          800: '#013a56',
          900: '#012d42',
          950: '#001a27',
        },
        // Sage mapped to green for backward compatibility
        sage: {
          50: '#e6f9ed',
          100: '#ccf3db',
          200: '#99e7b7',
          300: '#66db93',
          400: '#33cf6f',
          500: '#00ad4c',
          600: '#008a3d',
          700: '#00682e',
          800: '#00451f',
          900: '#002310',
          950: '#001108',
        },
        // Warm stone/beige for backgrounds
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Keep neutral for utility
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'islamic-pattern': "url('/patterns/islamic-pattern.svg')",
        'geometric-pattern': "url('/patterns/geometric.svg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-down': 'fadeDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(234, 179, 8, 0.6)' },
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 20px 0 rgb(0 0 0 / 0.1)',
        'glow': '0 0 40px rgba(234, 179, 8, 0.3)',
        'glow-gold': '0 0 40px rgba(234, 179, 8, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
