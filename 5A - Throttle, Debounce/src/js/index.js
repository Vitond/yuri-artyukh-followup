import {throttle, debounce} from 'throttle-debounce';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const checkScrollSpeed = ((settings) => {
    settings = settings || {};

    var lastPos, newPos, timer, delta, 
        delay = settings.delay || 50; //50 === default measuring interval

    function clear() {
      lastPos = null;
      delta = 0;
    }

    clear();

    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){
        delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };

})();
const paragraphs = document.querySelectorAll('p');

const skew = throttle(16, true, (speed) => {
   
    let value = speed / 10;
    if (value > 6) {
        value = 6;
    }
    if (value < -6) {
        value = -6;
    }
    paragraphs.forEach((p) => {
        p.style.transform = `skewX(${value}deg)`;   
    });
});

const setBack = debounce(100, false, () => {
    paragraphs.forEach((p) => {
        p.style.transform = `skewX(0deg)`;   
    });
});

window.onscroll = () => {
    const speed = checkScrollSpeed();
    skew(speed);
    setBack();
}