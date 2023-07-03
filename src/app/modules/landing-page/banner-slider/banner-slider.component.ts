import { Component, HostListener, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import * as cnst from 'src/app/common/constants';
import SwiperCore, { A11y, Navigation, Swiper, Thumbs, Autoplay, SwiperOptions } from "swiper/core";

SwiperCore.use([Swiper, Navigation, A11y, Thumbs, Autoplay]);

@Component({
    selector: 'app-banner-slider',
    templateUrl: './banner-slider.component.html',
    styleUrls: ['./banner-slider.component.scss'],
})
export class BannerSliderComponent implements OnInit {
    @Input() banners: any;
    bannerTop: Swiper;
    bannerThumbs: Swiper;
    bannerSlidesPerView: any = 5;
    cnst = cnst;
    currentBackgroundUrl = "";
    currentBackgroundImage: any;
    config: SwiperOptions = {
        autoHeight: true,
        allowTouchMove: true,
        speed: 600,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
    };
    isSliderPaused = false;

    constructor(private cdr: ChangeDetectorRef) { }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.configureBannerThumbNail(event.target.innerWidth);
    }

    ngOnInit(): void {
        this.configureBannerThumbNail(window.innerWidth);
        this.currentBackgroundUrl = this.banners[0].imageUrl;
    }

    configureBannerThumbNail(windowSize) {
        if (windowSize <= 300) {
            this.bannerSlidesPerView = 1;
        } else if (windowSize <= 400) {
            this.bannerSlidesPerView = 2;
        } else if (windowSize <= 500) {
            this.bannerSlidesPerView = 3;
        } else {
            this.bannerSlidesPerView = 4;
        }
    }

    onThumbsSwiper(swiper) {
        this.bannerThumbs = swiper;
    }

    onGallerySwiper(swiper) {
        this.bannerTop = swiper;
    }

    onActiveIndexChange() {
        this.currentBackgroundUrl = this.banners[this.bannerTop.activeIndex].imageUrl;
        this.cdr.detectChanges();
    }

    updateBackgroundImg() {
        const slider = <HTMLElement>document.querySelector('.hb-home');
        const style = { 'background': 'url(' + this.currentBackgroundUrl + ') no-repeat center center / cover' }
        slider.click();
        return style;
    }

    pauseSlider() {
        if (!this.isSliderPaused) {
            this.bannerTop.autoplay.stop();
            this.isSliderPaused = true;
        }
    }

    resumeSlider() {
        if (this.isSliderPaused) {
            this.bannerTop.autoplay.start();
            this.isSliderPaused = false;
        }
    }
}

