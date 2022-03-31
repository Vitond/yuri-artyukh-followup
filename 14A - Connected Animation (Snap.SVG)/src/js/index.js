import Snap from 'snapsvg-cjs';

const paths = [
    "M-95 2637.88L133 2569.51L434.99 2879.17L669.43 2552.51L1002.38 2768.5L1275.48 2546",
    "M-19 2698.48L294.18 2727L486.2 2489.19L736.77 2727L859 2480L1033 2540.21",
]
const path = Snap.select('#graph');

let c = 0;
const step = () => {
    const id = (c + 1)%paths.length
    const newPath = paths[id];
    path.animate({d: newPath}, 1000, () => {
        step();
    });;
    c++;
};
step();



