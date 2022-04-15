import Barba from "barba.js";
import { gsap } from "gsap";

Barba.Pjax.start();

let lastClicked;

Barba.Dispatcher.on('linkClicked', (el) => {
    lastClicked = el;
});

var ExpandTransition = Barba.BaseTransition.extend({
    start: function () {
        Promise.all([this.newContainerLoading, this.zoom()]).then(
            this.showNewPage.bind(this)
        );
    },

    zoom: function () {
        var deferred = Barba.Utils.deferred();
        const timeline = new gsap.timeline();

        let left = lastClicked.getBoundingClientRect().left;
        let cloned = lastClicked.cloneNode(true);
        cloned.classList.add('is-cloned');
        let screenWidth = window.innerWidth;
        let bg = cloned.querySelector('.item__bg');
        this.oldContainer.appendChild(cloned);
        timeline.set(cloned, {x: left})
        timeline.to(cloned, 1, {x: 0, width: screenWidth, onComplete: () => {
            deferred.resolve();
        }}, 0)
        timeline.to(bg, 1, {x: 0}, 0)
        return deferred.promise;
    },

    showNewPage: function () {
        this.done();
    },
});

Barba.Pjax.getTransition = function () {
    var transitionObj = ExpandTransition;
    //53:39
    //Barba.HistoryManager.prevStatus().namespace
    return transitionObj;
};
