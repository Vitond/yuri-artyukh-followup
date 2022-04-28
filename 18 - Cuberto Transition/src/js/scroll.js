const targets = document.querySelectorAll('.section');

const options = {
    rootMargin: '0px',
    threshold: [0, 0.25, 0.75, 1]
}
const cb = (items) => {
    items.forEach((item) => {
        console.log(item.isIntersecting, item.target, item.intersectionRatio)
        if (item.isIntersecting && item.intersectionRatio > 0.5) {
            item.target.classList.add('hasArrived');
        }
    })
}

const observer = new IntersectionObserver(cb, options);
observer.observe(target);

for (let i = 0; i < targets.length ; i++) {
    observer.observe(targets[i])
}
