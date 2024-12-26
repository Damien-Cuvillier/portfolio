import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const useLocoScroll = () => {
  useEffect(() => {
    const scrollEl = document.querySelector('#main-container');
    if (!scrollEl) {
      console.warn('Locomotive Scroll: Main container not found');
      return;
    }

    const locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      smoothMobile: true,
    });

    console.log('Locomotive Scroll initialized');

    locoScroll.on('scroll', (args) => {
      console.log('Scrolling', args);
    });

    return () => {
      if (locoScroll) locoScroll.destroy();
    };
  }, []);
};

export default useLocoScroll;
