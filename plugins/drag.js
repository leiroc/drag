
function Drag(opts){
    this.opts={
        dom: '.drag',
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
    },
    addClass:function (o,cls) {
        if (o.classList) {
            o.classList.add(cls)
        }else {
            o.className+=' '+cls;
        }
    },
    removeClass:function (o,cls) {
        if (o.classList) {
            o.classList.remove(cls)
        }else {
            o.className=o.className.replace(new RegExp('\\s*\\b'+cls+'\\b','g'),'')
        }
    },
    isiPhone: /iPhone|iPod|iPad/.test(navigator.userAgent)
};

Drag.prototype.init = function () {
    this.dom = typeof this.opts.dom=='string' ? this.$(this.opts.dom) : this.opts.dom ;//获得外层元素
    this.offsetY = 0;
    this.offsetX = 0;
    this.bLeft = this.dom.offsetLeft;
    this.bTop = this.dom.offsetTop;
    this.left = this.bLeft;
    this.top = this.bTop;
    this.width = this.dom.offsetWidth || this.dom.clientWidth || this.dom.style.width;
    this.height = this.dom.offsetHeight || this.dom.clientHeight || this.dom.style.height;
    this.dom.style.cssText += 'position:absolute;-webkit-transform: translate3d(0,0,0);-webkit-backface-visibility: hidden;';
    this.dom.setAttribute('pos', this.left+'-' + this.top);
    this.opts.ondrag.call(this, {left: this.left,top: this.top});
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


        var pos = self.dom.getAttribute('pos'),
            left = parseInt(pos.split('-')[0]),
            top = parseInt(pos.split('-')[1]);

        self.left = left;
        self.top = top;

        self.opts.ondrag.call(self, {left: left, top: top, offsetX: self.offsetX, type: 'start'});
    };

    var moveHandler = function(e){
        e.preventDefault();
        e.stopPropagation();
        self.offsetY = e.targetTouches[0].pageY - self.startY;
        self.offsetX = e.targetTouches[0].pageX - self.startX;

        var pos = self.dom.getAttribute('pos'),
            left = self.left + self.offsetX,
            top = self.top + self.offsetY;

        self.dom.style.cssText += '-webkit-transform: translate3d('+self.offsetX+'px,'+self.offsetY+'px,0);';
        self.dom.setAttribute('pos', left+'-' + top);
        self.opts.ondrag.call(self, {left: left, top: top, offsetX: self.offsetX, type: 'move'});
    };

    var endHandler = function(e){
        var pos = self.dom.getAttribute('pos'),
            left = self.left + self.offsetX,
            top = self.top + self.offsetY;

        self.dom.setAttribute('pos', left+'-' + top);
        self.dom.style.cssText += '-webkit-transform: translate3d(0,0,0);left: '+ left + 'px; ' + 'top: ' + top + 'px;right:auto;bottom:auto;';
        self.opts.ondrag.call(self, {left: left,top: top, offsetX: self.offsetX, type: 'end'});
        self.offsetX = self.offsetY = 0;
        self.left = left;
        self.top = top;
    };


    this.dom.addEventListener('touchstart', startHandler);
    this.dom.addEventListener('touchmove', moveHandler);
    this.dom.addEventListener('touchend', endHandler);
};

Drag.prototype.reset = function () {
    var self = this;

    this.offsetX = this.offsetY = 0;
    this.left = this.bLeft;
    this.top = this.bTop;
    this.dom.setAttribute('pos', this.bLeft+'-' + this.bTop);
    this.dom.style.cssText += '-webkit-transform: translate3d(0,0,0);left: '+ this.bLeft + 'px; ' + 'top: ' + this.bTop + 'px;right:auto;bottom:auto;';
    this.opts.ondrag.call(this, {left: this.left,top: this.top, offsetX: this.offsetX, type: 'start'});

};


Drag.prototype.pos = function (obj) {

    this.offsetX = this.offsetY = 0;
    this.left = obj.l;
    this.top = obj.t;
    this.dom.setAttribute('pos', this.left+'-' + this.top);
    this.dom.style.cssText += '-webkit-transform: translate3d(0,0,0);left: '+ obj.l + 'px; ' + 'top: ' + obj.t + 'px;right:auto;bottom:auto;';
};






window.Drag = Drag;
