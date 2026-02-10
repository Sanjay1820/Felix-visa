import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles = {
    '/': 'Home',
    '/about': 'About Us',
    '/services': 'Visa Services',
    '/services/study': 'Study Visa',
    '/services/work': 'Work Visa',
    '/services/tourist': 'Tourist Visa',
    '/services/business': 'Business Visa',
    '/services/pr': 'Permanent Residency',
    '/countries': 'Countries We Serve',
    '/process': 'Visa Process',
    '/why-us': 'Why Choose Us',
    '/testimonials': 'Client Testimonials',
    '/blog': 'Knowledge Center',
    '/contact': 'Contact Us'
};

const TitleUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = routeTitles[path];

        // Handle dynamic routes if exact match not found
        if (!title && path.startsWith('/services/')) {
            const type = path.split('/')[2];
            title = type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Visa` : 'Visa Service';
        }

        document.title = title ? `${title} | Felix by Sagar` : 'Felix by Sagar | Global Visa & Immigration';
    }, [location]);

    return null;
};

export default TitleUpdater;
