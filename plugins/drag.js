
function Drag(opts){
    this.opts={
        dragEle: '',
        targetEle: '',
        maxTop: 100,
        ondrag: function (obj) {}
    };

    for (var i in opts) {
        this.opts[i] = opts[i];
    }

    this.init();
    this.setEvent();
}

Drag.prototype =  {
    $:function (o,p) {
        return (p||document).querySelector(o);
    }
};

Drag.prototype.init = function () {
    this.dragEle = typeof this.opts.dragEle=='string' ? this.$(this.opts.dragEle) : this.opts.dragEle ;//获得外层元素
    this.targetEle = typeof this.opts.targetEle=='string' ? this.$(this.opts.targetEle) : this.opts.targetEle ;//获得外层元素

    this.targetLeft = this.targetEle.offsetLeft;
    this.targetTop = this.targetEle.offsetTop;
    this.targetWidth = this.targetEle.offsetWidth || this.targetEle.clientWidth || this.targetEle.style.width;
    this.targetHeight = this.targetEle.offsetHeight || this.targetEle.clientHeight || this.targetEle.style.height;


    this.offsetY = 0;
    this.offsetX = 0;
    this.bLeft = this.dragEle.offsetLeft;
    this.bTop = this.dragEle.offsetTop;
    this.left = this.bLeft;
    this.top = this.bTop;
    this.width = this.dragEle.offsetWidth || this.dragEle.clientWidth || this.dragEle.style.width;
    this.height = this.dragEle.offsetHeight || this.dragEle.clientHeight || this.dragEle.style.height;
    this.dragEle.style.cssText += 'position:absolute;-webkit-transform: translate3d(0,0,0);-webkit-backface-visibility: hidden;';
    this.dragEle.setAttribute('pos', this.left+'-' + this.top);

    //this.opts.ondrag.call(this, {left: this.left,top: this.top});
    this.checkHit({left: this.left,top: this.top});
};

Drag.prototype.setEvent = function(){
    var self = this;

    var startHandler = function(e){
        e.preventDefault();
        e.stopPropagation();
        self.startY = e.touches[0].pageY;
        self.startX = e.touches[0].pageX;

        self.offsetY = 0;
        self.offsetX = 0;


        var pos = self.dragEle.getAttribute('pos'),
            left = parseInt(pos.split('-')[0]),
            top = parseInt(pos.split('-')[1]);

        self.left = left;
        self.top = top;

        //self.opts.ondrag.call(self, {left: left, top: top, offsetX: self.offsetX, type: 'start'});
        self.checkHit({left: left, top: top, offsetX: self.offsetX, type: 'start'});

    };

    var moveHandler = function(e){
        e.preventDefault();
        e.stopPropagation();
        self.offsetY = e.targetTouches[0].pageY - self.startY;
        self.offsetX = e.targetTouches[0].pageX - self.startX;

        var pos = self.dragEle.getAttribute('pos'),
            left = self.left + self.offsetX,
            top = self.top + self.offsetY;

        self.dragEle.style.cssText += '-webkit-transform: translate3d('+self.offsetX+'px,'+self.offsetY+'px,0);';
        self.dragEle.setAttribute('pos', left+'-' + top);
        //self.opts.ondrag.call(self, {left: left, top: top, offsetX: self.offsetX, type: 'move'});
        self.checkHit({left: left, top: top, offsetX: self.offsetX, type: 'move'});
    };

    var endHandler = function(e){
        var pos = self.dragEle.getAttribute('pos'),
            left = self.left + self.offsetX,
            top = self.top + self.offsetY;

        self.dragEle.setAttribute('pos', left+'-' + top);
        self.dragEle.style.cssText += '-webkit-transform: translate3d(0,0,0);left: '+ left + 'px; ' + 'top: ' + top + 'px;right:auto;bottom:auto;';
        //self.opts.ondrag.call(self, {left: left,top: top, offsetX: self.offsetX, type: 'end'});
        self.checkHit({left: left,top: top, offsetX: self.offsetX, type: 'end'});

        self.offsetX = self.offsetY = 0;
        self.left = left;
        self.top = top;
    };


    this.dragEle.addEventListener('touchstart', startHandler);
    this.dragEle.addEventListener('touchmove', moveHandler);
    this.dragEle.addEventListener('touchend', endHandler);
};

Drag.prototype.reset = function () {
    var self = this;

    this.offsetX = this.offsetY = 0;
    this.left = this.bLeft;
    this.top = this.bTop;
    this.dragEle.setAttribute('pos', this.bLeft+'-' + this.bTop);
    this.dragEle.style.cssText += '-webkit-transform: translate3d(0,0,0);left: '+ this.bLeft + 'px; ' + 'top: ' + this.bTop + 'px;right:auto;bottom:auto;';
    //this.opts.ondrag.call(this, {left: this.left,top: this.top, offsetX: this.offsetX, type: 'start'});
    this.checkHit({left: this.left,top: this.top, offsetX: this.offsetX, type: 'start'})

};


Drag.prototype.checkHit = function (obj) {
    var self = this;

    if (obj.left >= self.targetLeft && obj.left <= self.targetLeft + self.targetWidth &&
        ((obj.top >= self.targetTop && obj.top <= self.targetTop + self.targetHeight)||(obj.top + self.height >= self.targetTop &&
        obj.top + self.height <= self.targetTop + self.targetHeight)) ||
        (obj.left + self.width <= self.targetLeft + self.targetWidth && obj.left + self.width >= self.targetLeft &&
        ((obj.top >= self.targetTop && obj.top <= self.targetTop + self.targetHeight)||(obj.top + self.height >= self.targetTop &&
        obj.top + self.height <= self.targetTop + self.targetHeight)))) {

        self.targetEle.style.cssText += 'background-color: #f40';
        obj.isHit = true;
        self.opts.ondrag.call(self, obj);

        if (obj.type == 'end') {
            self.pos({
                l: self.targetLeft,
                t: self.targetTop
            });
        }
    } else {
        self.opts.ondrag.call(self, obj);
        self.targetEle.style.cssText += 'background-color: #007aff';
    }

    if (obj.type == 'end' &&
        !(obj.left > self.targetLeft &&
        obj.left < self.targetLeft + self.targetWidth &&
        obj.top > self.targetTop &&
        obj.top < self.targetTop + self.targetHeight) &&
        !(obj.left + self.width < self.targetLeft + self.targetWidth &&
        obj.left + self.width > self.targetLeft &&
        obj.top > self.targetTop &&
        obj.top < self.targetTop + self.targetHeight) &&
        !(obj.top + self.height > self.targetTop &&
        obj.top + self.height < self.targetTop + self.targetHeight &&
        obj.left > self.targetLeft &&
        obj.left < self.targetLeft + self.targetWidth) &&
        !(obj.top + self.height > self.targetTop &&
        obj.top + self.height < self.targetTop + self.targetHeight &&
        obj.left + self.width < self.targetLeft + self.targetWidth &&
        obj.left + self.width > self.targetLeft)) {

        self.reset();
    }
};

Drag.prototype.pos = function (obj) {
    this.offsetX = this.offsetY = 0;
    this.left = obj.l;
    this.top = obj.t;
    this.dragEle.setAttribute('pos', this.left+'-' + this.top);
    this.dragEle.style.cssText += '-webkit-transform: translate3d(0,0,0);left: '+ obj.l + 'px; ' + 'top: ' + obj.t + 'px;right:auto;bottom:auto;';
};

window.Drag = Drag;
