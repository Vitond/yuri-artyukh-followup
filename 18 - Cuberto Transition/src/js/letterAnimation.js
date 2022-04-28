import gsap from "gsap";

const tl = new gsap.timeline();

tl.fromTo('#maskrectall', 1, {y: 420}, {y: 0})
tl.to('#maskrect', 1, {x: -130})