# drag 是一款移动端，简单拖拽插件，无任何依赖！



## Bug and News

> 2022-05-28 更新在线演示地址，见文档最下面。

>2016-04-12 BEFORE

- 减少调用难度，封装功能方法
- 修复拖动到点，连续坐标输出

>2016-04-13

- 修复拖动到目标位置，移动出位，即包含 >=||<=包括边界 

# 

### 使用说明

drag 是一款移动端，简单拖拽插件，无任何依赖！用来实现目标拖拽效果，把元素拖拽到指定的位置。



#### css


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

#### html


	<div id="drag1" style="left: 10px;" class="drag">drag_1</div>
	<div id="tag1" style="left: 10px" class="target">tag_1</div>

#### js


	new Drag({
	    dragEle: "#drag1",
	    targetEle: "#tag1",
	    ondrag: function (obj) {
			    
	    }
	});

### 在线演示地址
[http://m.imok.top/git/drag/](http://m.imok.top/git/drag/)

