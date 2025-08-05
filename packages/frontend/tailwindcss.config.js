/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './packages/frontend/index.html',
        './packages/frontend/src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/line-clamp')
    ],
}
