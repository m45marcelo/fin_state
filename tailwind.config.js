/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{ts,tsx}',
        './src/app.globals.css',
    ],
    theme: {
        extend: {
            colors: {
                'sidebar': '#ffff',
                'primary': '#6366f1',
                'primaryHover': '#4f46e5',
                'secondary': '#e5e7eb',
                'secondaryHover': '#d1d5db',
                'pillGreenbg': '#dcfce7',
                'pillGreenText': '#16a34a',
                'pillRedbg': '#fee2e2',
                'pillRedText': '#ef4444',
                'pillBluebg': '#dbeafe',
                'pillBlueText': '#2563eb',
                'pillYellowbg': '#fef9c3',
                'pillYellowText': '#ca8a04',
                'pillPurplebg': '#f3e8ff',
                'pillPurpleText': '#8b5cf6',
                'alert': '#eab308'
            },
            spacing: {
                'sidebar-width': '14.0625rem',
                'sidebar-gap': '0.875rem'
            },
            borderRadius: {
                'xl': '1rem',
                'full': '624.9375rem',
            },
            fontSize: {
                'text-value-card': '1.4375rem'
            }
        },
    },
    plugins: [],
};
