/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    const mapNumber = (X,A,B,C,D) => (X-A)*(D-C)/(B-A)+C;
    // from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
            posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
        return { x : posx, y : posy }
    }
    // Generate a random float.
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    /**
     * One class per effect.
     * Lots of code is repeated, so that single effects can be easily used.
     */

    // Effect 20
    class HoverImgFx20 {
        constructor(el) {
            this.DOM = {el: el};

            this.DOM.reveal = document.createElement('div');
            this.DOM.reveal.className = 'hover-reveal';
            this.totalImages = 10;
            let inner = '';
            for (let i = 0; i <= this.totalImages-1; ++i) {
                inner += i === this.totalImages-1 ? `<div class="hover-reveal__img" style="position: absolute; background-image:url(${this.DOM.el.dataset.img})"></div>` :
                                                    `<div class="hover-reveal__img" style="filter: hue-rotate(60deg) saturate(5); position: absolute; background-image:url(${this.DOM.el.dataset.img})"></div>`;
            }
            this.DOM.reveal.innerHTML = inner;
            this.DOM.el.appendChild(this.DOM.reveal);
            this.DOM.revealImgs = [...this.DOM.reveal.querySelectorAll('.hover-reveal__img')];
            charming(this.DOM.el);
            this.DOM.letters = [...this.DOM.el.querySelectorAll('span')];
            this.letterColor = getComputedStyle(this.DOM.el).color;
            this.initEvents();
        }
        initEvents() {
            this.positionElement = (ev) => {
                const mousePos = getMousePos(ev);
                const docScrolls = {
                    left : document.body.scrollLeft + document.documentElement.scrollLeft,
                    top : document.body.scrollTop + document.documentElement.scrollTop
                };
                this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
                this.DOM.reveal.style.left = `${mousePos.x-250-docScrolls.left}px`;
            };
            this.mouseenterFn = (ev) => {
                this.positionElement(ev);
                this.showImage();
            };
            this.mousemoveFn = ev => requestAnimationFrame(() => {
                this.positionElement(ev);
            });
            this.mouseleaveFn = () => {
                this.hideImage();
            };

            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        showImage() {
            TweenMax.killTweensOf(this.DOM.revealImgs);
            this.tl = new TimelineMax({
                onStart: () => {
                    this.DOM.reveal.style.opacity = 1;
                    TweenMax.set(this.DOM.el, {zIndex: 1000});
                }
            })
            .set([this.DOM.revealImgs], {opacity: 0});
            for (let i = 0; i <= this.totalImages-1; ++i) {
                TweenMax.set(this.DOM.revealImgs[i], {
                    x: i === this.totalImages-1 ? '0%' : `${getRandomFloat(-5,5)}%`,
                    y: i === this.totalImages-1 ? '0%' : `${getRandomFloat(-5,5)}%`
                });

                this.tl.add(new TweenMax(this.DOM.revealImgs[i], 0.25, {
                    ease: Quad.easeOut,
                    startAt: {opacity: 1},
                    opacity: i === this.totalImages-1 ? 1 : 0
                }), i*0.04);
            }
        }
        hideImage() {
            TweenMax.killTweensOf(this.DOM.revealImgs);
            this.tl = new TimelineMax({
                onStart: () => {
                    TweenMax.set(this.DOM.el, {zIndex: 999});
                },
                onComplete: () => {
                    TweenMax.set(this.DOM.el, {zIndex: ''});
                    TweenMax.set(this.DOM.reveal, {opacity: 0});
                }
            })
            .add(new TweenMax(this.DOM.revealImgs[this.totalImages-1], 0.15, {
                ease: Sine.easeOut,
                opacity: 0
            }))
        }
    }


    [...document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')].forEach(link => new HoverImgFx1(link));
    [...document.querySelectorAll('[data-fx="2"] > a, a[data-fx="2"]')].forEach(link => new HoverImgFx2(link));
    [...document.querySelectorAll('[data-fx="3"] > a, a[data-fx="3"]')].forEach(link => new HoverImgFx3(link));
    [...document.querySelectorAll('[data-fx="4"] > a, a[data-fx="4"]')].forEach(link => new HoverImgFx4(link));
    [...document.querySelectorAll('[data-fx="5"] > a, a[data-fx="5"]')].forEach(link => new HoverImgFx5(link));
    [...document.querySelectorAll('[data-fx="6"] > a, a[data-fx="6"]')].forEach(link => new HoverImgFx6(link));
    [...document.querySelectorAll('[data-fx="7"] > a, a[data-fx="7"]')].forEach(link => new HoverImgFx7(link));
    [...document.querySelectorAll('[data-fx="8"] > a, a[data-fx="8"]')].forEach(link => new HoverImgFx8(link));
    [...document.querySelectorAll('[data-fx="9"] > a, a[data-fx="9"]')].forEach(link => new HoverImgFx9(link));
    [...document.querySelectorAll('[data-fx="10"] > a, a[data-fx="10"]')].forEach(link => new HoverImgFx10(link));
    [...document.querySelectorAll('[data-fx="11"] > a, a[data-fx="11"]')].forEach(link => new HoverImgFx11(link));
    [...document.querySelectorAll('[data-fx="12"] > a, a[data-fx="12"]')].forEach(link => new HoverImgFx12(link));
    [...document.querySelectorAll('[data-fx="13"] > a, a[data-fx="13"]')].forEach(link => new HoverImgFx13(link));
    [...document.querySelectorAll('[data-fx="14"] > a, a[data-fx="14"]')].forEach(link => new HoverImgFx14(link));
    [...document.querySelectorAll('[data-fx="15"] > a, a[data-fx="15"]')].forEach(link => new HoverImgFx15(link));
    [...document.querySelectorAll('[data-fx="16"] > a, a[data-fx="16"]')].forEach(link => new HoverImgFx16(link));
    [...document.querySelectorAll('[data-fx="17"] > a, a[data-fx="17"]')].forEach(link => new HoverImgFx17(link));
    [...document.querySelectorAll('[data-fx="18"] > a, a[data-fx="18"]')].forEach(link => new HoverImgFx18(link));
    [...document.querySelectorAll('[data-fx="19"] > a, a[data-fx="19"]')].forEach(link => new HoverImgFx19(link));
    [...document.querySelectorAll('[data-fx="20"] > a, a[data-fx="20"]')].forEach(link => new HoverImgFx20(link));
    [...document.querySelectorAll('[data-fx="21"] > a, a[data-fx="21"]')].forEach(link => new HoverImgFx21(link));
    [...document.querySelectorAll('[data-fx="22"] > a, a[data-fx="22"]')].forEach(link => new HoverImgFx22(link));
    [...document.querySelectorAll('[data-fx="23"] > a, a[data-fx="23"]')].forEach(link => new HoverImgFx23(link));

    // Demo purspose only: Preload all the images in the page..
    const contentel = document.querySelector('.content');
    [...document.querySelectorAll('.block__title, .block__link, .content__text-link')].forEach((el) => {
        const imgsArr = el.dataset.img.split(',');
        for (let i = 0, len = imgsArr.length; i <= len-1; ++i ) {
            const imgel = document.createElement('img');
            imgel.style.visibility = 'hidden';
            imgel.style.width = 0;
            imgel.src = imgsArr[i];
            imgel.className = 'preload';
            contentel.appendChild(imgel);
        }
    });
    imagesLoaded(document.querySelectorAll('.preload'), () => document.body.classList.remove('loading'));
}
