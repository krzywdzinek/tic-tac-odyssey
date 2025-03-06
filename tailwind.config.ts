
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				fira: ['Fira Sans Condensed', 'sans-serif'],
				display: ['Oxanium', 'Fira Sans Condensed', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				game: {
					'x': '#395AA2', // Blue - R56,G90,B162
					'o': '#CC4E60', // Pink - R204,G78,B96
					'neutral': '#98A2B3',
					'bg': '#121218',
					'card': '#1A1A24',
					'gradient1': '#B67E3A', // R182,G62,B40
					'gradient2': '#D4462D', // R212,G70,B45
					'gradient3': '#D44B40', // R212,G75,B64
					'gradient4': '#CC4E60', // R204,G78,B96
					'gradient5': '#C64E72', // R198,G78,B114
					'gradient6': '#B54B91', // R181,G75,B145
					'gradient7': '#8E4B96', // R142,G75,B150
					'gradient8': '#395AA2', // R56,G90,B162
					'gradient9': '#39718F', // R57,G113,B143
					'gradient10': '#4D9A8E', // R77,G154,B142
					'gradient11': '#5B9D96', // R91,G157,B150
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' },
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' },
				},
				'slide-up': {
					from: { transform: 'translateY(10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-down': {
					from: { transform: 'translateY(-10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				'draw-line': {
					from: { width: '0%' },
					to: { width: '100%' },
				},
				'draw-circle': {
					from: { 'stroke-dashoffset': '283' },
					to: { 'stroke-dashoffset': '0' },
				},
				'draw-x': {
					from: { 'stroke-dashoffset': '100' },
					to: { 'stroke-dashoffset': '0' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'ping-small': {
					'75%, 100%': {
						transform: 'scale(1.1)',
						opacity: '0',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.25s ease-out',
				'fade-out': 'fade-out 0.15s ease-in',
				'scale-in': 'scale-in 0.15s ease-out',
				'scale-out': 'scale-out 0.15s ease-in',
				'slide-up': 'slide-up 0.2s ease-out',
				'slide-down': 'slide-down 0.2s ease-out',
				'draw-line': 'draw-line 0.4s ease-in-out forwards',
				'draw-circle': 'draw-circle 0.4s ease-in-out forwards',
				'draw-x': 'draw-x 0.4s ease-in-out forwards',
				'float': 'float 2.5s ease-in-out infinite',
				'ping-small': 'ping-small 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
			},
			backdropBlur: {
				xs: '2px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
