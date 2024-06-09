/** @format */

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
				slideIn: {
					'0%': { opacity: 0, transform: 'translateX(100%)' },
					'100%': { opacity: 1, transform: 'translateX(0)' },
				},
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out infinite',
				slideIn: 'slideIn .5s ease-in-out forwards ',
			},
		},
	},
	plugins: [],
}
