/*
 * Lazy_Tree V2.0
 * @author 颜佩琼
 * started on 2013.04.12 
 * update on 2013.11.13
 * completed on ***
 *
 */

var Lazy_Tree = Backbone.View.extend({
	
	/**
	 * 可设置参数
	 */
	options : {
		
		baseEl : "",
		
		list : null,
		
		showCheckbox : true,
		
		imgPosition : "../../../static/js/common/lazy_tree/",
		
		// objName: "dtree",
		
		onItemClick : function() {
		},
		
		funcAfterDraw:function(){
			
		},
		
		rightMenu : null
	},
	
	/**
	 * 创建树形组件的初始化操作
	 * 
	 */
	initialize : function() {
		
		// 初始化全局变量
		this.el = this.options.baseEl;
		
		// 节点数据列表
		this.allNodes = [];
		
		// 根节点索引值
		this.rootNodeIndex = null;
		
		// this.objName=this.options.objName;
		
		// 被选中的节点
		this.selectedNode = null;
		
		this.imgPosition = this.options.imgPosition;
		
		// 有线条
/*		 this.icon = {
		 root : this.imgPosition + 'img/base.gif',
		
		 folder : this.imgPosition + 'img/folder.gif',
		
		 folderOpen : this.imgPosition + 'img/folderopen.gif',
		
		 page : this.imgPosition + 'img/page.gif',
		
		 empty : this.imgPosition + 'img/empty.gif',
		
		 line : this.imgPosition + 'img/line.gif',
		
		 join : this.imgPosition + 'img/join.gif',
		
		 joinBottom : this.imgPosition + 'img/joinbottom.gif',
		
		 plus : this.imgPosition + 'img/plus.gif',
		
		 plusBottom : this.imgPosition + 'img/plusbottom.gif',
		
		 minus : this.imgPosition + 'img/minus.gif',
		
		 minusBottom : this.imgPosition + 'img/minusbottom.gif',
		
		 nlPlus : this.imgPosition + 'img/nolines_plus.gif',
		
		 nlMinus : this.imgPosition + 'img/nolines_minus.gif'
		 };*/
		//../../static/js/common/lazy_tree/
		
/*		// 无线条
		this.icon = {
			root : this.imgPosition + 'img/base.gif',
			
			folder : this.imgPosition + 'img/folder.gif',
			
			folderOpen : this.imgPosition + 'img/folderopen.gif',
			
			page : this.imgPosition + 'img/page.gif',
			
			empty : this.imgPosition + 'img/empty.gif',
			
			line : this.imgPosition + 'img/empty.gif',
			
			join : this.imgPosition + 'img/empty.gif',
			
			joinBottom : this.imgPosition + 'img/empty.gif',
			
			plus : this.imgPosition + 'img/tree_arrows_close.gif',
			
			plusBottom : this.imgPosition + 'img/tree_arrows_close.gif',
			
			minus : this.imgPosition + 'img/tree_arrows_open.gif',
			
			minusBottom : this.imgPosition + 'img/tree_arrows_open.gif',
			
			nlPlus : this.imgPosition + 'img/nolines_plus.gif',
			
			nlMinus : this.imgPosition + 'img/nolines_minus.gif'
		};*/
		
		
		
/*		 this.icon = {
				 
				 //树形连接图片
				 root : this.imgPosition + 'img/latest/icon_base.png',
				
				 folder : this.imgPosition + 'img/latest/temp.png',
				
				 folderOpen : this.imgPosition + 'img/latest/temp.png',
				
				 page : this.imgPosition + 'img/latest/temp.png',
				
				 empty : this.imgPosition + 'img/latest/empty.png',
				
				 line : this.imgPosition + 'img/latest/line.png',
				
				 join : this.imgPosition + 'img/latest/join.png',
				
				 joinBottom : this.imgPosition + 'img/latest/joinbottom.png',
				
				 plus : this.imgPosition + 'img/latest/plus.png',
				
				 plusBottom : this.imgPosition + 'img/latest/plusbottom.png',
				
				 minus : this.imgPosition + 'img/latest/minus.png',
				
				 minusBottom : this.imgPosition + 'img/latest/minusbottom.png',
				 
				 
				 //节点图片
				 clusterroot_common:this.imgPosition + 'img/latest/icon_clusterroot_common.png',
				
				 clusterroot_ha:this.imgPosition + 'img/latest/icon_clusterroot_ha.png',
				 
				 clusterroot_virt:this.imgPosition + 'img/latest/icon_clusterroot_virt.png',
				
				 datacenter:this.imgPosition + 'img/latest/icon_datacenter.png',
				 
				 hacluster:this.imgPosition + 'img/latest/icon_hacluster.png',
				 
				 hahost:this.imgPosition + 'img/latest/icon_hahost.png',
				 
				 hahostIndex:this.imgPosition + 'img/latest/icon_hahostIndex.png',
				 
				 haresourceIndex:this.imgPosition + 'img/latest/icon_haresourceIndex.png',
				 
				 monitor_template:this.imgPosition + 'img/latest/icon_monitor_template.png',
				
				 monitorcluster:this.imgPosition + 'img/latest/icon_monitorcluster.png',
				 
				 monitorhost:this.imgPosition + 'img/latest/icon_monitorhost.png',
				 
				 network:this.imgPosition + 'img/latest/icon_network.png',
				 
				 storage:this.imgPosition + 'img/latest/icon_storage.png',
				 
				 virtcluster:this.imgPosition + 'img/latest/icon_virtcluster.png',
				 
				 virthost:this.imgPosition + 'img/latest/icon_virthost.png',
				 
				 virthostIndex:this.imgPosition + 'img/latest/icon_virthostIndex.png',
				 
				 virtvm:this.imgPosition + 'img/latest/icon_virtvm.png',
				 
				 virtvmIndex:this.imgPosition + 'img/latest/icon_virtvmIndex.png',
				 
				 vmtemplate:this.imgPosition + 'img/latest/icon_vmtemplate.png',
				 
				 //临时替换图片
				 notype:this.imgPosition + 'img/latest/temp.png'
				 
			
		 };*/
		
		 
		 this.icon = {
				 
				 //树形连接图片
				 root : this.imgPosition + 'img/latest/icon_empty_1.png',
				
				 folder : this.imgPosition + 'img/latest/temp.png',
				
				 folderOpen : this.imgPosition + 'img/latest/temp.png',
				
				 page : this.imgPosition + 'img/latest/temp.png',
				
				 empty : this.imgPosition + 'img/latest/empty.png',
				
				 line : this.imgPosition + 'img/latest/line.png',
				
				 join : this.imgPosition + 'img/latest/join1.png',
				
				 joinBottom : this.imgPosition + 'img/latest/joinbottom1.png',
				
				 plus : this.imgPosition + 'img/latest/plus.png',
				
				 plusBottom : this.imgPosition + 'img/latest/plusbottom.png',
				
				 minus : this.imgPosition + 'img/latest/minus.png',
				
				 minusBottom : this.imgPosition + 'img/latest/minusbottom.png',
				 
				 
				 //节点图片
				 clusterroot_common:this.imgPosition + 'img/latest/icon_empty_1.png',
				
				 clusterroot_ha:this.imgPosition + 'img/latest/icon_empty_1.png',
				 
				 clusterroot_virt:this.imgPosition + 'img/latest/icon_empty_1.png',
				
				 datacenter:this.imgPosition + 'img/latest/icon_empty_1.png',
				 
				 hacluster:this.imgPosition + 'img/latest/icon_empty_1.png',
				 
				 hahost:this.imgPosition + 'img/latest/icon_hahost.png',
				 
				 hahostIndex:this.imgPosition + 'img/latest/icon_hahost.png',
				 
				 haresourceIndex:this.imgPosition + 'img/latest/icon_haresourceIndex.png',
				 
				 monitor_template:this.imgPosition + 'img/latest/icon_monitor_template.png',
				
				 monitorcluster:this.imgPosition + 'img/latest/icon_empty_1.png',
				 
				 monitorhost:this.imgPosition + 'img/latest/icon_virthost.png',
				 
				 network:this.imgPosition + 'img/latest/icon_network.png',
				 
				 storage:this.imgPosition + 'img/latest/icon_storage.png',
				 
				 virtcluster:this.imgPosition + 'img/latest/icon_empty_1.png',
				 
				 virthost:this.imgPosition + 'img/latest/icon_virthost.png',
				 
				 virthostIndex:this.imgPosition + 'img/latest/icon_virthost.png',
				 
				 virtvm:this.imgPosition + 'img/latest/icon_virtvm.png',
				 
				 virtvmIndex:this.imgPosition + 'img/latest/icon_virtvm.png',
				 
				 vmtemplate:this.imgPosition + 'img/latest/icon_vmtemplate.png',
				 
				 freeHost:this.imgPosition + 'img/latest/icon_freehost.png',
				 
				 apartStorage:this.imgPosition + 'img/latest/icon_freestorage.png',
				 
				 //临时替换图片
				 notype:this.imgPosition + 'img/latest/temp.png',
				 
				 //临时占位图片
				 emtpy_top:this.imgPosition + 'img/latest/tree_empty_top.png',
				 
				 emtpy_other:this.imgPosition + 'img/latest/tree_empty_other.png'
				 
			
		 };
		
		
		// 解析并绘制树
		this.render();
		
	},
	
	/**
	 * 绑定事件
	 * 
	 */
	bindEvents : function() {
		
		// // 聚焦样式处理
		// $(this.el).find(".dtree_node span").unbind("mouseover");
		// $(this.el).find(".dtree_node span").bind("mouseover", _(function(e) {
		// this._addStyle(e);
		// }).bind(this));
		//		
		// // 失去焦点样式处理
		// $(this.el).find(".dtree_node span").unbind("mouseout");
		// $(this.el).find(".dtree_node span").bind("mouseout", _(function(e) {
		// this._removeStyle(e);
		// }).bind(this));
		
		// 节点点击事件处理
		$(this.el).find(".dtree_node span").unbind("click");
		$(this.el).find(".dtree_node span").bind("click", _(function(e) {
			
			this._onItemClick(e);
		}).bind(this));
		
		// 显示或隐藏孩子节点
		$(this.el).find(".dtree_node img").unbind("click");
		$(this.el).find(".dtree_node img").bind("click", _(function(e) {
			this._handleChildren(e);
		}).bind(this));
		
		// 处理选中状态
		$(this.el).find("input[type='checkbox']").unbind("click");
		$(this.el).find("input[type='checkbox']").bind("click", _(function(e) {
			this._handleSelectState(e);
		}).bind(this));
		
		if (this.options.rightMenu) {
			this._renderRightMenu();
		}
		
		// 节点点击事件处理
		$(this.el).find(".dtree_node span.prevlink").unbind("click");
		$(this.el).find(".dtree_node span.prevlink").bind("click", _(function(e) {
			
			this._prevClick();
		}).bind(this));
		
		// 节点点击事件处理
		$(this.el).find(".dtree_node span.nextlink").unbind("click");
		$(this.el).find(".dtree_node span.nextlink").bind("click", _(function(e) {
			
			this._nextClick();
		}).bind(this));
		
	},
	
	/**
	 * 渲染组件
	 */
	render : function() {
		
		$(this.el).empty();
		// 根据用户指定objName创建div
		// this.createDiv();
		this.allNodes = this.options.list();
		
		
		// 确定根节点和层级关系
		this._setChildren();
		
		// 页面渲染
		$(this.el).append(this._eletmpl(this.rootNodeIndex, this._getCurImgs(this.rootNodeIndex)));
		
		this._showChildren(this.rootNodeIndex);
		
		$(this.el).find("div.dtree_node:eq(1)").addClass("secondnode");
		// this._renderRightMenu();
	},
	
	/**
	 * 选择上一级节点
	 */
	_prevClick:function(){
		
		var curIndex = this.selectedNode;
		
		if(curIndex>=0){
			var prevIndex = this.allNodes[curIndex].pIndex;
			if(prevIndex>=0){
				this.selectNode(prevIndex, "index");
				$(this.el).find("div[name='div-node-" + this.allNodes[prevIndex].id + "'] a")[0].click();
				
			}			
		}
	},
	
	/**
	 * 选择下一级节点
	 */
	_nextClick:function(){

		var curIndex = this.selectedNode;
		if(curIndex>=0){
			if(this.allNodes[curIndex].childNum>0){
				var nextIndex=this.allNodes[curIndex].childList[0];
				this.selectNode(nextIndex, "index");
				$(this.el).find("div[name='div-node-" + this.allNodes[nextIndex].id + "'] a")[0].click();
			}
					
		}
	},
	
	
	/**
	 * 添加mouseover样式
	 */
	// _addStyle : function(e) {
	// $(e.currentTarget).addClass("node_mouseover");
	// //
	// $(e.currentTarget)[0].style.setProperty("text-decoration","underline");
	// // $(e.currentTarget)[0].style.setProperty("color","#0033FF");
	// },
	//	
	// /**
	// * 添加mouseout样式
	// */
	// _removeStyle : function(e) {
	// $(e.currentTarget).removeClass("node_mouseover");
	// // console.log($(e.currentTarget)[0])
	// // $(e.currentTarget)[0].style.setProperty("text-decoration","");
	// // $(e.currentTarget)[0].style.setProperty("color","");
	// },
	/**
	 * 凸显选中行样式
	 * @param entrance 表示入口方式：
	 * 1）event，表示当前触发事件；
	 *  2）index，表示当前节点对应的index值
	 */
	_toggleSelectStyle : function(entrance) {
		
		if(typeof entrance == 'object'){
			var curIndex = this._getIndex($(entrance.currentTarget).parent());
			var eleType = $(entrance.currentTarget)[0].tagName;
		}else{
			var curIndex = entrance;
			var eleType = "SPAN";
		}
		
		
		
		var divs = $(this.el).find("div.dtree_node");
		
		// 分两种情况：
		// 1)如果是点击节点选中,是对当前点击行进行样式突出
		if (eleType == "SPAN") {
			for ( var i = 0; i < divs.length; i++) {
				$(divs[i]).removeClass("selected");
			}
			
			$(this.el).find("div[name='div-node-" + this.allNodes[curIndex].id + "']").addClass("selected");
			
			// 如果是点击checkbox选中，则对所有选中行进行样式突出
		} else {
			// if()
			// $(this.el).find("div[name='div-node-"+this.selectedNode+"']").removeClass("selected");
			if (this.allNodes[curIndex].checked) {
				$(this.el).find("div[name='div-node-" + this.allNodes[curIndex].id + "']").addClass("selected");
			} else {
				$(this.el).find("div[name='div-node-" + this.allNodes[curIndex].id + "']").removeClass("selected");
			}
		}
		
	},
	
	/**
	 * 
	 * 节点点击处理函数
	 * @param entrance表示传入参数，可以有两种方式
	 * 1）表示event，即触发该动作的事件；
	 * 2）表示index，即节点对应的索引指
	 */
	_onItemClick : function(entrance) {
		var curIndex = null;
		if(typeof entrance == "object"){
			curIndex = this._getIndex($(entrance.currentTarget).parent());
		}else{
			curIndex = entrance;
		}
		// $(e.currentTarget)[0].style.setPropterty("background-color","#9F3");
		this.selectedNode = curIndex;
		this._toggleSelectStyle(entrance);
		
		if (this.options.onItemClick && _(this.options.onItemClick).isFunction()) {
			this.options.onItemClick(this.allNodes[curIndex]);
		}
		
	},
	
	/**
	 * 判断隐藏或显示子节点
	 */
	_handleChildren : function(e) {
		var curImg = $(e.currentTarget);
		var curIndex = this._getIndex($(curImg).parent());
		// 如果为非叶子节点，且当前当前为收缩状态，则显示该非叶子节点的一级孩子节点
		if ($(curImg).attr("src") === this.icon.plus || $(curImg).attr("src") === this.icon.plusBottom) {

			this._showChildren(curIndex);
			
		} else if ($(curImg).attr("src") === this.icon.minus || $(curImg).attr("src") === this.icon.minusBottom) {
			this._hideChildren(curIndex);
			
		}
	},
	
	/**
	 * 显示一级子节点
	 * @param curIndex 表示节点索引值
	 * @param type 表示渲染方式，默认为重新渲染该节点的所有一级子节点
	 *      当type为"insert"时，动态渲染。
	 * 
	 */
	_showChildren : function(curIndex,type) {
		if (this.allNodes[curIndex].childNum > 0) {
			
			var imgList = $($(this.el).find("div[name='div-node-" + this.allNodes[curIndex].id + "']")).find('img');
			
			var curImg = imgList[imgList.length - 2];
			
			if(curIndex!==this.rootNodeIndex){
				if($(curImg).attr("src")===this.icon.plusBottom || $(curImg).attr("src")===this.icon.joinBottom || $(curImg).attr("src")===this.icon.minusBottom){
					$(curImg).attr("src", this.icon.minusBottom);
				}else{
					$(curImg).attr("src", this.icon.minus);
				}
			}
			
			
			
			
			
			//$(curImg).next().attr("src", this.icon.folderOpen);
			
			// 逐级渲染
			this._renderNodes(curIndex,type);
		}
		
	},
	
	/**
	 * 
	 * 隐藏所有子孙节点
	 */
	_hideChildren : function(curIndex) {
		if (this.allNodes[curIndex].childNum > 0) {
			
			var imgList = $($(this.el).find("div[name='div-node-" + this.allNodes[curIndex].id + "']")).find('img');
			
			var curImg = imgList[imgList.length - 2];
			
			if($(curImg).attr("src")===this.icon.minusBottom){
				$(curImg).attr("src", this.icon.plusBottom);
			}else{
				$(curImg).attr("src", this.icon.plus);
			}
			
			
			//$(curImg).next().attr("src", this.icon.folder);
			
			// 递归删除子孙节点
			this._removeNodes(curIndex);
			
		}
		
	},
	
	/**
	 * 循环遍历this.allNodes，查找每个节点的孩子节点以及孩子个数 同时获取根节点索引（this.rootNodeIndex）
	 */
	_setChildren : function() {
		for ( var i = 0; i < this.allNodes.length; i++) {
			var childNum = 0;
			var childList = [];
			var isRoot = true;
			
			for ( var j = 0; j < this.allNodes.length; j++) {
				if (this.allNodes[i].id == this.allNodes[j].pid) {
					childNum++;
					childList.push(j);
					this.allNodes[j].pIndex = i;
				}
				
				if (this.allNodes[i].pid == this.allNodes[j].id) {
					isRoot = false;
				}
				
			}

			this.allNodes[i].childNum = childNum;
			this.allNodes[i].childList = childList;
			
			if (isRoot) {
				this.rootNodeIndex = i;
			}
			
			this.allNodes[i].model.index = i;
		}
		
		
	},
	
	/**
	 * 根据index渲染该节点的一级子节点
	 * type="insert"时为动态插入，否则整个分支重新渲染
	 */
	_renderNodes : function(index,type) {
		
		
		if(type === "insert"){
			var append_str = "";
			var prevImgs = this._getPrevImgs(index);
			var pIndex = index;
			var curIndex = this.allNodes[pIndex].childList[this.allNodes[pIndex].childNum-1];
			
			
			//获取父节点的位置
			var parent_pos = $(this.el).find("div[name='div-node-" + this.allNodes[pIndex].id + "']");	
			
			//定义插入位置
			var insert_pos = null;
			
			var curImgs = this._getCurImgs(curIndex);
			var imgs = [];
			
			for ( var k = 0; k < prevImgs.length; k++) {
				imgs.push(prevImgs[k]);
			}
			
			for ( var j = 0; j < curImgs.length; j++) {
				imgs.push(curImgs[j]);
			}
			
			append_str = this._eletmpl(curIndex, imgs);
			
			//如果父节点只有一个子节点
			if(this.allNodes[pIndex].childNum===1){
				insert_pos=parent_pos;
			}else{
				//如果父节点的子节点没有展开
				if($(this.el).find("div[name='div-node-" + this.allNodes[this.allNodes[pIndex].childList[0]].id + "']:visible").length===0){
					this._show1stLevelchildren(pIndex);
					
				//父节点的子节点展开
				}else{
					
					//插入的为优先节点
					if(this.allNodes[curIndex].priority === "top"){
						var lastTopIndex=pIndex;
						for(var i=0; i<this.allNodes[pIndex].childNum-1; i++){
							
							var childIndex = this.allNodes[pIndex].childList[i];
							var childNode = this.allNodes[childIndex];
							
							if(childNode.priority==="top"){
								lastTopIndex=childIndex;
							}
							
						}
						if(lastTopIndex!==pIndex){
							//重置前一兄弟节点的连接样式
							var imgList = $($(this.el).find("div[name='div-node-" + this.allNodes[lastTopIndex].id + "']")).find('img');
							
							var curImg = imgList[imgList.length - 2];
							
							//隐藏前置兄弟节点的所有子孙节点，以免导致样式混乱
							this._hideChildren(lastTopIndex);
							if($(curImg).attr("src")===this.icon.joinBottom){
								$(curImg).attr("src", this.icon.join);
							}
							if($(curImg).attr("src")===this.icon.plusBottom){
								$(curImg).attr("src", this.icon.plus);
							}
						}
						insert_pos=$(this.el).find("div[name='div-node-" + this.allNodes[lastTopIndex].id + "']");
					
					//插入的为非优先节点，即直接插入到同级兄弟节点的末尾
					}else{
						
						var lastNotTopIndex=this.allNodes[pIndex].childList[this.allNodes[pIndex].childNum-2];
						
						for(var i=0; i<this.allNodes[pIndex].childNum-1; i++){
							
							var childIndex = this.allNodes[pIndex].childList[i];
							var childNode = this.allNodes[childIndex];
							
							if(!childNode.priority){
								lastNotTopIndex=childIndex;
							}
							
						}
						
						
						//重置前一兄弟节点的连接样式
						var imgList = $($(this.el).find("div[name='div-node-" + this.allNodes[lastNotTopIndex].id + "']")).find('img');
						
						var curImg = imgList[imgList.length - 2];
						
						//隐藏前置兄弟节点的所有子孙节点，以免导致样式混乱
						this._hideChildren(lastNotTopIndex);
						if($(curImg).attr("src")===this.icon.joinBottom){
							$(curImg).attr("src", this.icon.join);
						}
						if($(curImg).attr("src")===this.icon.plusBottom){
							$(curImg).attr("src", this.icon.plus);
						}
						
					
						insert_pos=$(this.el).find("div[name='div-node-" + this.allNodes[lastNotTopIndex].id + "']");
					}
				}
				
				
				}
			
			$(insert_pos).after(append_str);
			
			
			var newList = $(this.el).find(".new_node");
			
			var maximum = newList.length;
			
			var i = 0;
			
			var showNode = function() {
				
				$(newList[i]).show(20);
				$(newList[i]).removeClass('new_node');
			}

			setTimeout(showNode, 20);


			
			this.bindEvents();

		}else{
			
			this._show1stLevelchildren(index);
		}
		
	},
	
	/**
	 * 显示第一级子节点
	 */
	_show1stLevelchildren:function(index){
		var str = "";
		var prevImgs = this._getPrevImgs(index);
		var pos = $(this.el).find("div[name='div-node-" + this.allNodes[index].id + "']");
		
		/*
		 * if(index === this.rootNodeIndex){ str +=
		 * this._eletmpl(index,this._getCurImgs(index)); }
		 */
		for ( var i = 0; i < this.allNodes[index].childNum; i++) {
			
			var curChIndex = this.allNodes[index].childList[i];
			var curImgs = this._getCurImgs(curChIndex);
			var imgs = [];
			
			$(this.el).find("div[name='div-node-" + this.allNodes[curChIndex].id + "']").remove();
			
			for ( var k = 0; k < prevImgs.length; k++) {
				imgs.push(prevImgs[k]);
			}
			
			for ( var j = 0; j < curImgs.length; j++) {
				imgs.push(curImgs[j]);
			}
			
			str += this._eletmpl(curChIndex, imgs);
		}
		
		$(pos).after(str);
		
		var newList = $(this.el).find(".new_node");
		
		var maximum = newList.length;
		
		var i = 0;
		
		var showNode = _(function() {
			
			$(newList[i]).show("normal");
			$(newList[i]).removeClass('new_node');
			
			if (i < maximum) {
				setTimeout(showNode, 50);
			}else{
			
				if(index===this.rootNodeIndex){
					this.options.funcAfterDraw();
				}
				
			}
			
			i++;
		}).bind(this)

		showNode();
		
		this.bindEvents();
	
	},
	
	/**
	 * 递归移除index指定的所有子孙节点
	 */
	_removeNodes : function(index) {

		for ( var i = 0; i < this.allNodes[index].childNum; i++) {
			var curIndex = this.allNodes[index].childList[i];
			var curNode = this.allNodes[curIndex];
			
			if (curNode.childNum > 0) {
				this._removeNodes(curIndex);
			}
			
			$(this.el).find("div[name='div-node-" + this.allNodes[curIndex].id + "']").hide(100);
			// var
			// temp=function(){$(this.el).find("div[name='div-node-"+curIndex+"']").remove();}
			
			// setTimeout(_(temp).bind(this),200);
			
		}
		
		// var maximum = newList.length;
		
		/*
		 * var removeNode=function(paramIndex){
		 * 
		 * var i=0; var curIndex = this.allNodes[paramIndex].childList[i]; var
		 * curNode = this.allNodes[curIndex];
		 * 
		 * if(curNode.childNum>0){ this._removeNodes(curIndex); } console.log(i)
		 * $(this.el).find("div[name='div-node-"+curIndex+"']").hide("normal");
		 * 
		 * $(this.el).find("div[name='div-node-"+curIndex+"']").remove();
		 * 
		 * if(i<this.allNodex[paramIndex].childNum){
		 * setTimeout(removeNode,200); }
		 * 
		 * i++; }
		 * 
		 * _(removeNode(index)).bind(this);
		 * 
		 */
	},
	
	/**
	 * 拼接节点元素
	 */
	_eletmpl : function(index, imgs) {
		var imgEles = "";
		var checkBoxEle = "";
		var returnVal = "";
		
		// var param=JSON.stringify(this.allNodes[index]);
		// var clickFun=this.options.onItemClick;
		
		for ( var i = 0; i < imgs.length; i++) {
			imgEles += '<img src="' + imgs[i] + '" />';
		}
		
		if (this.options.showCheckbox) {
			checkBoxEle = "<input type='checkbox'/>";
		}
		
		var tempId=this.allNodes[index].model.id?this.allNodes[index].model.id:this.allNodes[index].model.datacenterId;
		var temphref= this.allNodes[index].type?this.allNodes[index].type:"notype";
		
		if(!!tempId){
			temphref = "#/"+temphref+"/"+tempId;
		}else{
			temphref = "#/"+temphref;
		}
		
		if(index === this.rootNodeIndex){
			
			returnVal = "<div class='dtree_node new_node root_node'  name='div-node-" + this.allNodes[index].id + "' >" 
			+ '<img src="' + this.icon.emtpy_other + '" />'
			+ imgEles 
			+ checkBoxEle
			+ "<span id='node_" + this.allNodes[index].id + "' " + "><a href='" + temphref + "'>" + this.allNodes[index].content 
			+ '</a></span>' + '<span class="prevlink"></span><span class="nextlink"></span></div>';
			
		}else{
			returnVal = "<div class='dtree_node new_node'  name='div-node-" + this.allNodes[index].id + "' >" 
			+ '<img src="' + this.icon.emtpy_other + '" />'
			+ imgEles 
			+ checkBoxEle
			+ "<span id='node_" + this.allNodes[index].id + "' " + "><a href='" + temphref + "'>" + this.allNodes[index].content 
			+ '</a></span>' + '</div>';
		}
		
		return returnVal;
	},
	
	/**
	 * 返回该节点的显示图片列表, 3个分支： 1)根节点； 2)非叶子节点（中间非叶子节点和最后一个非叶子节点）
	 * 3)叶子节点（中间叶子节点和最后一个叶子节点）
	 */
	_getCurImgs : function(index) {
		
		var returnVal = [];
		
		if (index === this.rootNodeIndex) {
			returnVal.push(this.icon.root);
			
			// 如果为非叶子节点
		} else if (this.allNodes[index].childNum > 0) {
			// 判断是否为父节点的最后一个孩子节点（非叶子）
			if (this._isLast(index)) {
				returnVal.push(this.icon.plusBottom);
				//returnVal.push(this.icon.folder);
				// 为中间的非叶子节点
			} else {
				returnVal.push(this.icon.plus);
				//returnVal.push(this.icon.folder);
			}
			
			returnVal.push(this.icon[this.allNodes[index].type?this.allNodes[index].type:"notype"]);
			
			// 如果为叶子节点
		} else {
			// 如果为父节点的最后一个孩子节点（叶子）
			if (this._isLast(index)) {
				returnVal.push(this.icon.joinBottom);
				//returnVal.push(this.icon.page);
				
			} else {
				returnVal.push(this.icon.join);
				//returnVal.push(this.icon.page);
			}
			
			returnVal.push(this.icon[this.allNodes[index].type?this.allNodes[index].type:"notype"]);
		}
		
		return returnVal;
	},
	
	/**
	 * 确定显示的图片列表
	 */
	_getPrevImgs : function(index) {
		
		var tempFlag = [];
		var grandIndex = index;
		var returnVal = [];
		
		while (grandIndex != this.rootNodeIndex) {
			
			if (this._isLast(grandIndex)) {
				tempFlag.push(0);
			} else {
				tempFlag.push(1);
			}
			
			grandIndex = this.allNodes[grandIndex].pIndex;
		}
		
		for ( var i = tempFlag.length - 1; i >= 0; i--) {
			if (tempFlag[i] === 0) {
				returnVal.push(this.icon.empty);
			} else {
				returnVal.push(this.icon.line);
			}
		}
		
		return returnVal;
		
	},
	
	/**
	 * 判断是否为父节点的最后一个孩子节点
	 */
	_isLast : function(index) {
		
		var pIndex = this.allNodes[index].pIndex;
		var pIndex_childNum = this.allNodes[pIndex].childNum;
		
		//判断是否为新添加进来的节点
		var isNewNode = false;
		
		if (index == this.allNodes[pIndex].childList[this.allNodes[pIndex].childNum - 1]) {
			isNewNode = true;
		}
		
		//判断该节点的父节点是否包含非优先节点
		var hasNottopNode = false;
		for(var i=0; i<pIndex_childNum; i++){
			if(!this.allNodes[this.allNodes[pIndex].childList[i]].priority){
				hasNottopNode=true;
				break;
			}
		}
	
		//如果该节点为最新
		var returnVal = (isNewNode && !this.allNodes[index].priority)
			|| (isNewNode&&(this.allNodes[index].priority==="top")&&!hasNottopNode);
		
		
		return returnVal;
	},
	
	/**
	 * 设置对象的selected属性值
	 */
	_handleSelectState : function(e) {
		
		var curIndex = this._getIndex($(e.currentTarget).parent());
		
		if ($(e.currentTarget)[0].checked) {
			this.allNodes[curIndex].checked = true;
		} else {
			this.allNodes[curIndex].checked = false;
		}
		
		this._toggleSelectStyle(e);
	},
	
	/**
	 * 根据触发元素确定节点索引值
	 */
	_getIndex : function(el) {
		
		var tempList = $(el).attr("name").split("-");
		var curId = tempList[tempList.length - 1];
		var curIndex=null;
		
		for(var i=0; i<this.allNodes.length; i++ ){
			if(this.allNodes[i].id===curId){
				curIndex = this.allNodes[i].model.index;
				break;
			}
		}
		
		return curIndex;
		
	},
	
	/**
	 * 根据节点ID获取节点索引值
	 */
	_getIndexById:function(id){
		
		var curIndex=null;
		
		for( var i=0; i<this.allNodes.length; i++ ){
			if(this.allNodes[i].id===id){
				curIndex = this.allNodes[i].model.index;
				break;
			}
		}
		return curIndex;
	},
	
	/**
	 * 重新渲染指定节点
	 */
	_itemRender : function(index) {
		$(this.el).find("span#node_" + this.allNodes[index].id +" a").html(this.allNodes[index].content);
		//this.shine(index);
		
	},
	
	/**
	 * 渲染右键菜单： 1）为每一个节点绑定右键菜单处理事件，并把该节点对应的model作为参数传递给相应处理函数
	 * 2）使用闭包依次将节点对应的model作为参数传递到右键菜单rightMenuView
	 */
	_renderRightMenu : function() {
		
		var allSpans = $(this.el).find("span");
		var options = this.options.rightMenu;
		var el = this.el;
		
		for ( var i = 0; i < allSpans.length; i++) {
			
			var curIndex = this._getIndex($(allSpans[i]).parent());
			
			// 绑定右键处理方法
			allSpans[i].oncontextmenu = function(model) {
				return function(e) {
					// 显示右键菜单
					Lazy_RightMenu.initialize({
						"e" : e,
						"model" : model,
						"options" : options,
						"el" : el
					});
				};
			}(this.allNodes[curIndex].model);
		}
		
		if (window.Event) {
			document.captureEvents(Event.MOUSEUP);
		}
		
	},
	
	/**
	 * 根据路由获取index值
	 */
	_getIndexbyRoute:function(route){
/*		var tempId = this.allNodes[index].model.id?this.allNodes[index].model.id:this.allNodes[index].model.datacenterId;
		var temphref = this.allNodes[index].type?this.allNodes[index].type:"notype";
		temphref = "#/"+temphref+"/"+tempId;*/
		
		var list = route.split("/");
		var id = list[2];
		var type = list[1];
	
		var returnval =-1;
		for(var i=0; i<this.allNodes.length; i++){
			var curNode = this.allNodes[i];
			var curId = curNode.model.id?curNode.model.id:curNode.model.datacenterId;
			
			var curType = curNode.type?curNode.type:"notype";	
			if(String(curId)===String(id) && curType===type){
				returnval = curNode.model.index;
				break;
			}
		}
		
		return returnval;
		
	},
	
	// /////////////////////////////////////////////////////////////////////////////////////////////////////////
	// -----------------------------附加函数，供用户调用-------------------------------------------------------------------------------------------------------
	
	/**
	 * 根据index/id/route路径选中树上某个节点：
	 * 1）如果该节点处于展开显示状态则直接选中点击该节点；
	 * 2）如果该节点没有处于展开显示状态，则逐级展开直到该节点可见为止，然后选中点击该节点；
	 * 
	 * @param param 表示具体参数值，如index/id/route
	 * @param type 表示参数类型，目前支持三类"index","id"和"route"
	 */
	selectNode:function(param,type,clickable){

		var index = null;
		if(type==="index"){
			index = parseInt(param,10);
		}else if(type === "id"){
			index = this._getIndexById(param);
		}else if(type === "route"){
			index = this._getIndexbyRoute(param);
		}
		if(index>=0){
			
			var isvisible = true;
			
			//判断该节点是否展开显示
			if($(this.el).find("div[name='div-node-" + this.allNodes[index].id + "']:visible").length===0){
				isvisible = false;
			}
			
			//默认最近的可见祖节点即为当前节点
			var near_parentIndex = index;
			
			//如果当前节点不可见，则逐级向上查找，直到找到最近可见的祖节点为止
			if(!isvisible){
				
				//查找到已展开显示的最近祖节点
				//使用深度优先算法逐级展开，直到指定节点可见为止
				near_parentIndex = this._getIndexById(this.allNodes[index].pid);
				var showList = [];
				showList.push(near_parentIndex);
				while($(this.el).find("div[name='div-node-" + this.allNodes[near_parentIndex].id + "']:visible").length===0){
					near_parentIndex = this._getIndexById(this.allNodes[near_parentIndex].pid);
					showList.push(near_parentIndex);
				}
				
				//this._hideChildren(this.rootNodeIndex);
				while (showList.length>0 ) {
					
					var curIndex = showList.pop();
					this._showChildren(curIndex);
					
					if($(this.el).find("div[name='div-node-" + this.allNodes[index].id + "']:visible").length>0){
						isvisible = true;
						break;
					}	
				}	
				
				if(!isvisible){
				}
			}	
			
			this.itemClick(index);
			//$(this.el).find("div[name='div-node-" + this.allNodes[index].id + "']")[0].focus();

			
	
			if(!!clickable){
				$(this.el).find("div[name='div-node-" + this.allNodes[index].id + "'] a")[0].click();
			}
			this._setScrollPosition(index);
			//this.timer_scroll = window.setInterval(_(this._setScrollPosition).bind(this), 200, index);
		}
	},
	
	/**
	 * 设置滚动条的位置
	 */
	_setScrollPosition:function(index){
		var nodes_visible = $(this.el).find("div.dtree_node:visible");
		var count_visible = $(this.el).find("div.dtree_node:visible").length;
		var curName = "div-node-"+this.allNodes[index].id;
		var cur_element_index = 0;
		var height = 0;
		for(var i=0; i<count_visible; i++){
			if($(nodes_visible[i]).attr("name") === curName ){
				cur_element_index = i;
				break;
			}
		}
		
		if(cur_element_index>=1){
			height = (cur_element_index-1) * 27-5;
			
			/*window.clearInterval(this.timer_scroll);
			return;*/
		}
		
		var temp_subelement = $(this.el).find("div[name='"+curName+"']");
		
		//console.log("scrollTop:"+$(this.el)[0].scrollTop);
		//console.log("scrollHeight:"+$(this.el)[0].scrollHeight)
		
		if(height>=$(this.el)[0].scrollTop&&height<=($(this.el)[0].scrollTop+$(this.el).height()-55)){
			
			//console.log("看得见");
		}else{
			//console.log("看不见")
			$(this.el)[0].scrollTop = height;
		}

	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 返回指定元素的一级子节点
	 * 
	 */
	getChildren : function(model) {
		var index = model.model.index;
		var childIndexList = this.allNodes[index].childList;
		var returnVal = [];
		for ( var i = 0; i < childIndexList.length; i++) {
			returnVal.push(this.allNodes[childIndexList[i]]);
		}
		
		return returnVal;
	},
	
	/**
	 * 返回指定元素的所有子孙节点
	 */
	getAllChildren : function(model) {
		var index = model.model.index;
		var childIndexList = this.allNodes[index].childList;
		var returnVal = [];
		for ( var i = 0; i < childIndexList.length; i++) {
			var curNode = this.allNodes[childIndexList[i]]
			returnVal.push(curNode);
			if (curNode.childNum > 0) {
				returnVal = returnVal.concat(this.getAllChildren(curNode));
			}
		}
		
		return returnVal;
	},
	
	/**
	 * 返回处于选中状态的所有节点
	 */
	getSelected : function() {
		var returnVal = [];
		
		for ( var i = 0; i < this.allNodes.length; i++) {
			if (this.allNodes[i].checked) {
				returnVal.push(this.allNodes[i]);
			}
		}
		
		return returnVal;
	},
	
//	/**
//	 * 动态添加新节点
//	 */
//	addNode : function(model) {
//		
//		// 表示待处理节点
//		var handleList = [];
//		
//		// 将新节点添加到allNodes中
//		this.allNodes.push(model);
//		
//		// 重新确定节点的层状关系
//		this._setChildren();
//		// console.log(this.allNodes);
//		
//		var showIndex = model.model.index;
//		
//		while ($(this.el).find("div[name='div-node-" + showIndex + "']").length == 0) {
//			showIndex = this.allNodes[showIndex].pIndex;
//			handleList.push(showIndex);
//		}
//		
//		// console.log(handleList);
//		// 主机渲染节点，直到渲染到新添加节点为止
//		var curIndex = handleList.pop();
//		
//		// 隐藏首个可见祖节点的所有子孙节点
//		this._hideChildren(curIndex);
//		
//		while (handleList.length > 0) {
//			this._showChildren(curIndex);
//			curIndex = handleList.pop();
//		}
//		
//		this._showChildren(curIndex);
//		
//		// $(this.el).find("div[name='div-node-"+model.model.index+"']").addClass("selected");
//		this.shine(model.model.index);
//		
//	},
	
	
	/**
	 * 动态添加新节点  update 2014-05-09
	 */
	addNode : function(model) {
		
		// 将新节点添加到allNodes中
		this.allNodes.push(model);
		
		// 重新确定节点的层状关系
		this._setChildren();
		
		var showIndex = model.model.index;
		
		if ($(this.el).find("div[name='div-node-" + this.allNodes[this.allNodes[showIndex].pIndex].id + "']:visible").length !== 0) {
			
			var parentIndex = this.allNodes[showIndex].pIndex;	
			// 隐藏祖节点的所有子孙节点
			//this._hideChildren(parentIndex);
			this._showChildren(parentIndex,"insert");
		}
		
		
		// $(this.el).find("div[name='div-node-"+model.model.index+"']").addClass("selected");
		//this.shine(model.model.index);
		
	},
	
//	/**
//	 * 批量删除指定节点，只可删除叶子节点
//	 */
//	deleteNodes : function(models) {
//		console.log(models);
//		
//		for ( var i = 0; i < models.length; i++) {
//			if (models[i].childNum === 0) {
//				for ( var j = 0; j < this.allNodes.length - 1; j++) {
//					if (this.allNodes[j].model.index == models[i].model.index) {
//						var temp = this.allNodes[j];
//						this.allNodes[j] = this.allNodes[j + 1];
//						this.allNodes[j + 1] = temp;
//					}
//				}
//				
//				this.allNodes.pop();
//			}
//			
//		}
//		
//		this.openAll();
//		
//	},
	
	/**
	 * 动态删除节点
	 */
	deleteNode : function(model){
		var curIndex = model.model.index;
		var parentId = model.pid;
		var deleteIndexs=[];
		var new_allNodes=[];
		var islast = this._isLast(curIndex);
		//deleteIndexs.push(curIndex)
		this._hideChildren(curIndex);

		
		//递归查找需要删除的节点对应的索引值列表
		var pushDeleteNodes=_(function(index){
			deleteIndexs.push(index);
			$(this.el).find("div[name='div-node-"+this.allNodes[index].id+"']").remove();
			for ( var i = 0; i < this.allNodes[index].childNum; i++) {
				var tempIndex = this.allNodes[index].childList[i];
				var tempNode = this.allNodes[tempIndex];

				pushDeleteNodes(tempIndex);
				
				// var
				
				
				// setTimeout(_(temp).bind(this),200);
				
			}
		}).bind(this);
		
		//setTimeout(pushDeleteNodes(curIndex), 1000);
		pushDeleteNodes(curIndex);
		
		//将不需要删除的节点放到新数组中，并重置全局变量 this.allNodes
		for(var i=0; i<this.allNodes.length; i++){
			var tempIndex = this.allNodes[i].model.index;
			var isDeleted=false;
			for(var j=0; j<deleteIndexs.length; j++){
				if(tempIndex===deleteIndexs[j]){
					isDeleted = true;
					break;
				}
			}
			
			if(!isDeleted){
				new_allNodes.push(this.allNodes[i]);
			}
			
		}
		
		
		this.allNodes=new_allNodes;
		
		// 重新确定节点的层状关系
		this._setChildren();


		//临时添加---------------------------------------------20140724-----------------------------------
		
		var hasSecondClass = $(this.el).find("div[name='div-node-" + this.allNodes[this.rootNodeIndex].id + "']").next().hasClass("secondnode");
		//console.log(hasSecondClass);
		//console.log($(this.el).find("div[name='div-node-" + this.allNodes[this.rootNodeIndex].id + "']").next().find("a").html());
		if(!hasSecondClass){
			$(this.el).find("div[name='div-node-" + this.allNodes[this.rootNodeIndex].id + "']").next().addClass("secondnode");
		}
		/**
		 * 如果被删除节点的父节点已没有子节点，修改父节点的展示样式
		 */
		if(this.allNodes[this._getIndexById(parentId)].childNum===0){
			var imgList = $($(this.el).find("div[name='div-node-" + this.allNodes[this._getIndexById(parentId)].id + "']")).find('img');
			
			var curImg = imgList[imgList.length - 2];
			
			if($(curImg).attr("src")===this.icon.minus || $(curImg).attr("src")===this.icon.plus){
				$(curImg).attr("src", this.icon.join );
			}
			if($(curImg).attr("src")===this.icon.minusBottom || $(curImg).attr("src")===this.icon.plusBottom){
				$(curImg).attr("src", this.icon.joinBottom );
			}
			
			
			//$(curImg).next().attr("src", this.icon.page);
			
			//如果被删除的是父节点的最后一个子节点，且父节点还包含其他子节点
		}else if(islast){
			//隐藏前置兄弟节点的所有子孙节点，以免导致样式混乱
			var parentIndex = this._getIndexById(parentId);
			var prevNodeIndex = this.allNodes[parentIndex].childList[this.allNodes[parentIndex].childNum-1];
			var imgList = $($(this.el).find("div[name='div-node-" + this.allNodes[prevNodeIndex].id + "']")).find('img');			
			var curImg = imgList[imgList.length - 2];
			
			//隐藏前置兄弟的子节点
			this._hideChildren(prevNodeIndex);
			if($(curImg).attr("src")===this.icon.join){
				$(curImg).attr("src", this.icon.joinBottom);
			}
			if($(curImg).attr("src")===this.icon.plus){
				$(curImg).attr("src", this.icon.plusBottom);
			}
		}

	},
	
	
	
	/**
	 * 对指定行进行闪烁处理
	 */
	shine : function(index) {
		this.timerCount = 0;
		$(this.el).find(".dtree_node").removeClass("selected");
		this.timerId1 = window.setInterval(_(this.shining).bind(this), 1000, index);
		this.timerId2 = window.setInterval(_(this.closeShining).bind(this), 700, index);
	},
	
	/**
	 * 高亮显示
	 */
	shining : function(index) {
		$(this.el).find("div[name='div-node-" + this.allNodes[index].idse + "']").addClass("selected");
		if (this.timerCount == 2) {
			window.clearInterval(this.timerId1);
			return;
		}
	},
	
	/**
	 * 取消高亮显示
	 */
	closeShining : function(index) {
		
		$(this.el).find("div[name='div-node-" + this.allNodes[index].id + "']").removeClass("selected");
		this.timerCount++;
		if (this.timerCount == 2) {
			window.clearInterval(this.timerId2);
			return;
		}
	},
	
	/**
	 * 关闭树
	 */
	closeAll : function() {
		this.render();
		
	},
	
	/**
	 * 展开指定元素的所有子孙节点（广度优先算法）
	 */
	openAll : function() {
		var showList = [];
		this.render();
		this._hideChildren(this.rootNodeIndex);
		// this.renderAll(this.rootNodeIndex);
		showList.push(this.rootNodeIndex);
		while (showList.length > 0) {
			
			var curIndex = showList.shift();
			this._showChildren(curIndex);
			
			if (this.allNodes[curIndex].childNum > 0) {
				for ( var i = 0; i < this.allNodes[curIndex].childNum; i++) {
					showList.push(this.allNodes[curIndex].childList[i]);
				}
			}
		}
	},
	
	/**
	 * 指定点击某一节点
	 * @param index表示要点击节点对应的索引指
	 */
	itemClick : function(index){
		this._onItemClick(index);
		
		/*var evt = document.createEvent("MouseEvents");
	    evt.initEvent("click", false, true);	
	    alink.dispatchEvent(evt);*/
	},
	
	/**
	 * 根据节点ID点击某一个节点
	 */
	itemClickById:function(id){
		this._onItemClick(this._getIndexById(id));
	},
	
	getCurrentNode : function(){
		return this.allNodes[this.selectedNode];
	},
	
	/**
	 * 更新数据
	 */
	updateNode : function(model) {
		/*var curIndex = model.model.index;		
		this.allNodes[curIndex] = model;
		this._itemRender(curIndex);*/
		
		
		var curId = model.id;
		var curIndex = -1;
		
		for(var i=0; i<this.allNodes.length; i++){
			if(this.allNodes[i].id ===  curId){
				curIndex = i;
				break;
			}
		}
		
		if(curIndex>-1){
			this.allNodes[curIndex].content = model.content;
			
			for(var attr in model.model){
				this.allNodes[curIndex].model[attr] = model.model[attr];
			}
			
			this._itemRender(curIndex);
		}
		
		
	},
	
	/**
	 * 动态刷新整棵树，即在不重新渲染树的情况下动态添加新节点或删除旧节点，且当前点击行节点被删除后能自动定位到最近的祖节点上
	 */
	dynamicUpdate : function(){
		//保存最原始的数据
		var oldNodes = JSON.parse(JSON.stringify(this.allNodes));
		
		var currentNode = this.getCurrentNode();
		
		//新数据
		var newNodes = this.options.list();
		
		
		//删除this.allNodes中存在，但newNodes中不存在的节点
		while(this._getNodesNotinAnother(this.allNodes,newNodes).length>0){
			this.deleteNode(this._getNodesNotinAnother(this.allNodes,newNodes)[0]);
		}
		
		var timer;
		
		
		//添加newNodes中存在，但this.allNodes中不存在的节点		
		var tempNodes= this._getNodesNotinAnother(newNodes, this.allNodes);
		var func1=function(){
			
			if(tempNodes.length>0){
				var curNode = tempNodes.shift();
				//如果当前节点的父节点在当前树中，则添加，否则，暂时缓存
				if(this.isIdInAllNodes(curNode.pid)){
					this.addNode(curNode);
					
				}else{
					tempNodes.push(curNode);
				}
			}else{
				window.clearInterval(timer);
				return;
			}
			
			
		}
		
		timer=setInterval(_(func1).bind(this),100);
		
		
		//如果更新树之前有选中行，且选中行数据已被删除，则找到最近的祖节点，并点击
		if( currentNode && (!this.isIdInAllNodes(currentNode.id)) ){
			var tempId=currentNode.pid;
			while(!this.isIdInAllNodes(tempId)){
				tempId = this.getNodeById(tempId,oldNodes).pid;
			}
			
			this.itemClickById(tempId);
		}
		
		
		for(var i=0; i<newNodes.length; i++){
			this.updateNode(newNodes[i]);
		}
		
	},
	
	/**
	 * 判断数组array1是不是数组array2的子集，只判断ID
	 */
	_isSubArray:function(array1,array2){
		
		var array1_ids=[];
		var array2_ids=[];
		var returnVal = true;
		
		for(var i=0; i<array1.length; i++){
			array1_ids.push(array1[i].id);
		}
		
		for(var i=0; i<array2.length; i++){
			array2_ids.push(array2[i].id);
		}
		
		for(var i=0; i<array1_ids.length; i++){
			
			var isInArray2 = false;
			
			for(var j=0; j<array2_ids.length; j++){
				if(array1_ids[i]===array2_ids[j]){
					isInArray2 = true;
					break;
				}
			}
			
			if (!isInArray2){
				returnVal = false;
				break;
			}
		}
		
		return returnVal;
		
	},
	
	/**
	 * 获取array1中第一个不在array2中的节点
	 */
	_getNodesNotinAnother:function(array1,array2){
		var array1_ids=[];
		var array2_ids=[];
		var returnVal = [];
		
		for(var i=0; i<array1.length; i++){
			array1_ids.push(array1[i].id);
		}
		
		for(var i=0; i<array2.length; i++){
			array2_ids.push(array2[i].id);
		}
		
		for(var i=0; i<array1_ids.length; i++){
			
			var isInArray2 = false;
			
			for(var j=0; j<array2_ids.length; j++){
				if(array1_ids[i]===array2_ids[j]){
					isInArray2 = true;
					break;
				}
			}
			
			if (!isInArray2){
				returnVal.push(array1[i]);
			}
		}
		
		return returnVal;
		
	},
	
	/**
	 * 判断ID是否在this.allNodes中
	 */
	isIdInAllNodes:function(id){
		var returnVal=false;
		
		for(var i=0; i<this.allNodes.length; i++){
			
			if(id===this.allNodes[i].id){
				returnVal = true;
				break;
			}
			
		}
		
		return returnVal;
	},
	
	/**
	 * 根据ID获取在nodellist的相应节点
	 * @param id
	 * @param nodelist
	 */
	getNodeById:function(id,nodelist){
		var returnNode=null;
		for(var i=0; i<nodelist.length; i++){
			if(nodelist[i].id===id){
				returnNode=nodelist[i];
				break;
			}
		}
		
		return returnNode;
	}
	
	
	
	

});