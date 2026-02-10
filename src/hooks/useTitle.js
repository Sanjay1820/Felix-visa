import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useTitle = (title) => {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = `${title} | Felix by Sagar`;
        return () => {
            document.title = prevTitle;
        };
    }, [title]);
};

export default useTitle;
