import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Main from './Pages/Main';
import ThemeSwitch from './Components/UI/ThemeSwitch';
import ScrollToTop from './Components/UI/ScrollToTop';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Shelter Name';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Main>
                <App {...props} />
                <ThemeSwitch/>
                <ScrollToTop/>
            </Main>
        );
    },
    progress: {
        color: '#4B5563',
    },
});