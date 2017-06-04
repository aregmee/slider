var transitionTime = 1000;
var waitTime = 3000;
var interval = 1;
var imageWidth = 200;
var imageCount = document.getElementsByClassName('slider-img').length;
var viewportWidth = document.getElementsByClassName('view-port')[0].offsetWidth;
var marginLeft = transitionTime / viewportWidth;
var marginRight = transitionTime / viewportWidth;
var sliderWidth = document.getElementsByClassName('slider')[0].offsetWidth;

function Slider(elementClassName) {

    this.element = document.getElementsByClassName(elementClassName)[0];
    this.marginLeft = 0;
    this.marginRight = 0;
    var that = this;

    this.slideRight = function(main) {

        this.intervalId = setInterval(function() {
            if (that.marginLeft == -(viewportWidth * (imageCount - 1))) {
                that.stopSlide();
                that.slideToLeft(main);
                main.stopRightSlide();
            }
            that.marginLeft -= marginLeft;
            console.log(that.marginLeft);
            that.element.style.marginLeft = that.marginLeft + 'px';
            if (that.marginLeft % viewportWidth == 0) {
                that.stopSlide();
            }
        }, interval);
        console.log(((imageWidth * (viewportWidth / imageWidth)) / marginLeft) * interval);
    }

    this.slideToLeft = function(main) {

        this.intervalId = setInterval(function() {
            if (that.marginLeft == 0) {
                that.stopSlide();
                main.startRightSlide();
            }
            that.marginLeft += marginLeft;
            console.log(that.marginLeft);
            that.element.style.marginLeft = that.marginLeft + 'px';
        }, interval);
        console.log(((imageWidth * (sliderWidth / imageWidth)) / marginLeft) * interval);
    }

    this.stopSlide = function() {
      
        clearInterval(this.intervalId);
    }
}

function Main() {

    var that = this;

    this.startRightSlide = function() {
        this.slider = new Slider('slider');
        this.rightSliderIntervalId = setInterval(function() { that.slider.slideRight(that) }, waitTime);
    }

    this.stopRightSlide = function() {

        clearInterval(this.rightSliderIntervalId);
    }
}

var main = new Main();
main.startRightSlide();