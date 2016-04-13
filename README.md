#Bug and News
>2016-04-12 BEFORE

- 减少调用难度，封装功能方法
- 修复拖动到点，连续坐标输出

>2016-04-13

- 修复拖动到目标位置，移动出位，即包含 >=||<=包括边界 

# DRAG
>drag 是一款移动端，简单拖拽插件

##examplae
>css


	.drag {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 200px;
        line-height: 50px;
        font-size: 1rem;
        color: #fff;
        left: 0;
        text-align: center;
        background-color: #000;
    }
    .target {
        position: absolute;
        width: 50px;
        height: 50px;
        background-color: #007aff;
        left: 0;
        line-height: 50px;
        font-size: 1rem;
        color: #fff;
        text-align: center;
    }

>html


	<div id="drag1" style="left: 10px;" class="drag">drag_1</div>
    <div id="tag1" style="left: 10px" class="target">tag_1</div>

>js

    
	new Drag({
	    dragEle: "#drag1",
	    targetEle: "#tag1",
	    ondrag: function (obj) {
			    
	    }
	});


##演示地址
[http://v5cy.cn:8088/git/drag/](http://v5cy.cn:8088/git/drag/)

