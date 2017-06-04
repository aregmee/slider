//navigation function implementation
function Slider(divClassName) {

    this.sliderDiv = document.getElementsByClassName(divClassName)[0];
    this.img = this.sliderDiv.children;

    this.currentIndex = 0;
    this.interval = 1;
    this.dynamicMarginLeft = 0;
    this.mainSlideInterval = 3000;

    var that = this;

    this.goTo = function(index) {

        if (index > (this.img.length - 1))
            index = (index - 1) - (this.img.length - 1);
        else if (index < 0)
            index = this.img.length - 1 + (index + 1);

        if (index == this.currentIndex)
            return

        this.index = index;
        this.percentageToChange = (this.currentIndex - this.index) * 100;
        this.speed = 1;
        this.direction = -this.speed;
        if (this.percentageToChange > 0) {
            this.direction = +this.speed;
        }
        this.goToSlideIntervalId = setInterval(function() {

            that.dynamicMarginLeft += that.direction;
            that.sliderDiv.style.marginLeft = that.dynamicMarginLeft + '%';

            if (Math.abs(that.dynamicMarginLeft) == (that.index * 100)) {
                that.stopGoToSlide();
            }
        }, this.interval);
    }

    this.goToPrev = function() {

        this.mainSlideDirection = 1;
        this.goTo(this.currentIndex - 1);
    }

    this.goToNext = function() {

        this.mainSlideDirection = -1;
        this.goTo(this.currentIndex + 1);
    }

    this.startMainSlide = function() {

        if (!this.mainSlideId) {
            this.mainSlideId = setInterval(function() {

                if (that.currentIndex == 0)
                    that.mainSlideDirection = -1;
                else if (that.currentIndex == that.img.length - 1)
                    that.mainSlideDirection = 1;
                if (that.mainSlideDirection == -1) {
                    that.goToNext();
                } else {
                    that.goToPrev();
                }
            }, this.mainSlideInterval);
        }
    }

    this.stopMainSlide = function() {

        if (this.mainSlideId) {
            clearInterval(this.mainSlideId);
            this.mainSlideId = false;
            this.stopGoToSlide();
        }
    }

    this.stopGoToSlide = function() {

        //stop sliding
        clearInterval(this.goToSlideIntervalId);
        this.goToSlideIntervalId = false;
        this.currentIndex = this.index ? this.index : 0;
        this.highlightSliderChange();

        if (Math.abs(this.dynamicMarginLeft) % 100 != 0) {
            if (this.direction == -1) {
                this.dynamicMarginLeft = Math.floor(this.dynamicMarginLeft / 100) * 100;
            } else {
                this.dynamicMarginLeft = Math.ceil(this.dynamicMarginLeft / 100) * 100;
            }
        }
    }

    this.highlightSliderChange = function() {

        var sliderChanges = document.getElementsByClassName('slider-change');
        var currentSliderChange = sliderChanges[this.currentIndex];

        for (var i = 0; i < sliderChanges.length; i++) {

            sliderChanges[i].style.width = '10px';
            sliderChanges[i].style.height = '10px';
            sliderChanges[i].style.borderRadius = '5px';
        }

        currentSliderChange.style.width = '20px';
        currentSliderChange.style.height = '20px';
        currentSliderChange.style.borderRadius = '10px';
    }

    this.highlightSliderChange();
}

//assign onclick events on all the navigation icons
function Navigation(slider) {

    var that = this;
    this.slider = slider;
    this.sliderChanges = document.getElementsByClassName('slider-change');

    for (var i = 0; i < this.sliderChanges.length; i++) {

        this.sliderChanges[i].addEventListener('click', function() {
            that.slider.stopMainSlide();
            that.slider.goTo(this.href.match(/\d+/)[0] - 1);
            that.slider.startMainSlide();
        }, false);
    }

    this.leftNavigation = document.getElementsByClassName('left')[0];
    this.leftNavigation.addEventListener('click', function() {
        that.slider.stopMainSlide();
        that.slider.goToPrev();
        that.slider.startMainSlide();
    }, false);

    this.rightNavigation = document.getElementsByClassName('right')[0];
    this.rightNavigation.addEventListener('click', function() {
        that.slider.stopMainSlide();
        that.slider.goToNext();
        that.slider.startMainSlide();
    }, false);

    document.addEventListener('keydown', function(e) {
        switch (e.which) {
            case 37: // left
                that.slider.stopMainSlide();
                that.slider.goToPrev();
                that.slider.startMainSlide();
                break;

            case 39: // right
                that.slider.stopMainSlide();
                that.slider.goToNext();
                that.slider.startMainSlide();
                break;

            default:
                return; // exit this handler for other keys
        }
    }, false);

    this.viewport = document.getElementsByClassName('view-port')[0];

    this.viewport.addEventListener('mouseover', function() {

        console.log("mouse over");
        that.slider.stopMainSlide();
    });

    this.viewport.addEventListener('mouseout', function() {

        console.log("mouse out");
        that.slider.startMainSlide();
    });
}

var slider = new Slider('slider');
slider.startMainSlide();
var navigation = new Navigation(slider);

window.addEventListener('blur', function() {
    slider.stopMainSlide();
}, false);

window.addEventListener('focus', function() {
    slider.startMainSlide();
}, false);
