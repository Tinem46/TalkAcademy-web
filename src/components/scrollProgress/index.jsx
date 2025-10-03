import React, { useState, useEffect } from 'react';
import './index.scss';

const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;

            if (scrollHeight) {
                setScrollProgress((currentProgress / scrollHeight) * 100);
            }
        };

        const throttledUpdateScrollProgress = () => {
            requestAnimationFrame(updateScrollProgress);
        };

        window.addEventListener('scroll', throttledUpdateScrollProgress);

        return () => {
            window.removeEventListener('scroll', throttledUpdateScrollProgress);
        };
    }, []);

    return (
        <div
            className="scroll-progress"
            style={{ width: `${scrollProgress}%` }}
        />
    );
};

export default ScrollProgress;
