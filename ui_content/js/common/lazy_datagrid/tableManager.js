/**
 * 
 * 定义表格组件
 *
 * Lazy_Table V2.0
 * 
 * 作者:颜佩琼
 *
 * 版本更新时间：2013.11.07
 * 
 */

var Lazy_Table = Backbone.View.extend({

	//el : 'body',

	options : {
		
		isFrontPagination : false, //是否需要前端分页

		baseEl : 'body', //指定表格控件渲染的位置
		
		url : null, 	//指定获取远程数据的url
		
		param : {}, 	//指定获取远程数据时所需的参数
		
		parse : function(resp){return {list:resp}}, 	//指定解析元数据的方法，可重写，默认返回原始数据
		
		data : null,	//指定本地数据列表
		
		columns : [], 	//指定表格数据列的具体显示内容与格式
		
		showNumber : false, //指定是否显示序号咧

		showCheckbox : false, //指定是否显示checkbox列
		
		isMultiSelect:false,	//指定checkbox是否为多选功能，默认为单选
		
		emptyContent : '暂无数据', //当无数据时的显示信息

		onItemClick : Backbone.UI.noop, //指定点击单行数据的处理逻辑

		onCheckboxClick : Backbone.UI.noop, //指定点击checkbox的处理逻辑
		
		pager : null,	//如需分页，指定分页控件参数对象

		sortable : false, //

		onSort : null,

		itemView : null, // refer to the element type and style of one item

		maxHeight : null, 

		pagerModel : null,
		
		childrenAttr: "children", //孩子节点的字段名，默认为“children”
			
		datagrid_height : 410,	//指定datagrid_body的高度，默认为410px;
		
		clickable:false //表示表格行是否可点击
	
	},

	datagridView : null, //表示数据列表对应的视图对象

	pagerView : null, //表示分页控件对应的视图对象

	/**
	 * 
	 * 根据参数options初始化pagerView对象和datagridView对象
	 * 
	 * pagerView、datagridView以及本对象共享一个数据对象options
	 * 
	 * 其中一个View改变options中的值，则其他的View也会相应地进行重新渲染
	 * 
	 * 由此完成pagerView和datagridView的一致性渲染
	 * 
	 */

	initialize : function() {

		//如果需要显示分页控件，则根据用户指定参数初始化分页对象pagerModel
		if (this.options.pager) {

			this.options.pagerModel = new PagerModel();

			this.options.pagerModel.set({

				pageNo : this.options.pager.pageNo,

				pageSize : 10,

				pageList : [10,20,30],

				baseEl : this.options.baseEl

			});

		}

		//在用户指定的位置外包一层class名为'lazy_table'的div
		$(this.options.baseEl).wrap("<div class='lazy_datagrid'></div>");

		//根据用户指定参数options初始化datagridView
		if (this.datagridView) {

			this.datagridView.undelegateEvents();

		}

		this.datagridView = new DatagridView(this.options);

		if (this.options.pager) {

			if (this.pagerView) {

				this.pagerView.undelegateEvents();

			}

			this.pagerView = new Lazy_Pager(this.options.pagerModel);

		}

		// 绑定事件

		this.bindEvents();
	},

	/**
	 * 
	 * 事件绑定
	 * 
	 */

	bindEvents : function() {
		if (this.options.pager) {

			// 分页控件上操作扭的事件处理绑定
			$(this.options.baseEl).next().find("span.disabled").unbind("click");
			$(this.options.baseEl).next().find("span.clickabled").unbind("click").bind("click", _(function(e) {
				this._doPage(e);

			}).bind(this));
			$(this.options.baseEl).next().find("span.pageIndex").unbind("click").bind("click", _(function(e) {
				this._doPage(e);

			}).bind(this));
			
			
			/*// 分页控件上的pageSize改变时的事件处理绑定

			$(this.options.baseEl).next().find('select[class="pager_list"]').unbind("change").bind("change",
					_(function() {

						this._autoRefresh();

					}).bind(this));*/

		}
		
		//工具栏上刷新按钮的事件处理绑定，xiran 从条件分支中抽出
		$(this.options.baseEl).prev().find(".datagrid_refresh").unbind("click").bind("click",_(function(e){
			/*console.log("bind_refresh")*/
			this._autoRefresh();
		}).bind(this));

	},

	/**
	 * 
	 * 分页控件操作按钮处理函数：通过调用pagerView的同名函数_doPage来完成
	 * 
	 */

	_doPage : function(e) {

		// 重新计算pagerModel的各项属性值，并重新渲染分页控件
		// console.log($(e.currentTarget))
		this.pagerView._doPage(e);

		// 后端数据已经分好页了，执行该分支

		// 根据pagerModel重新获取数据，重置datagridView.allModels

		// this.options.pagerModel.set({{total:tal}});

		this.updateTable();

		// 相应样式添加

		// console.log($(this.options.baseEl).parent().next())
//		if ($(this.options.baseEl).next().find(".pager_loading")) {
//
//			$(this.options.baseEl).next().find(".pager_loading").removeClass("pager_loading");
//
//		}

	},

	/**
	 * 
	 * 分页控件pageSize更改处理函数：通过调用pagerView的同名函数_autoRefresh来完成
	 * 
	 */

	_autoRefresh : function() {
		/*$(this.options.baseEl).parent().find(".datagrid_toolbar .toolbar_btn").removeClass("toolbar_btn_clicked");
		$(this.options.baseEl).parent().find(".datagrid_toolbar .datagrid_refresh").addClass("toolbar_btn_clicked");*/
		
		// 重新计算pagerModel的各项属性值，并重新渲染分页控件
		if(this.options.pager){
			this.pagerView._autoRefresh();
		}
		

		// 后端数据已经分好页了，执行该分支

		// 根据pagerModel重新获取数据，重置datagridView.allModels

		// this.options.pagerModel.set({{total:tal}});

		this.updateTable();

		// commonOpt.createDatagridScrollBar();//渲染表格滚动条(xiran)

	},

	/**
	 * 
	 * 获取选中的model列表
	 * 
	 * @returns 返回一个model数组
	 * 
	 */

	getSelectedModels : function() {

		return this.datagridView.getSelectedModels();

	},

	/**
	 * 
	 * 调用datagridView中的getData()和setCollection()方法重新获取数据并渲染表格
	 * 
	 */

	updateTable : function() {

		// if(this.options.pagination){

		this.datagridView.getData();

		// }

		this.datagridView.setCollection();

		this.datagridView.resizeTable();

		this.bindEvents();
		
		if(this.options.showCheckbox&&this.options.onCheckboxClick){
			this.options.onCheckboxClick(this.getSelectedModels());
		}
		

	},

	/**
	 * 
	 * 判断当前页是否为最后一页
	 * 
	 * @returns
	 * 
	 */

	isLastPage : function() {

		return this.pagerView.isLastPage();

	},
	
	/**
	 * 获取当前页的数据个数，主要用于最后一页数据个数判断
	 */
	getCurrentPageCount:function(){
		return this.datagridView.collection.length;
	},
	
	/**
	 * 根据ids显示指定的操作按钮列表，同时隐藏工具栏中的其他操作按钮
	 * @param ids 表示需要显示的操作按钮的ID列表，以‘，’隔开
	 */
	showbuttons:function(ids){
		this.datagridView.showbuttons(ids);
	},
	
	/**
	 * 返回一次请求获取的所有数据
	 */
	getAllModels:function(){
		var models = this.datagridView.allModels.models;
		var returnModels=[];
		
		for(var i=0; i<models.length; i++){
			returnModels.push(models[i].attributes);
		}
		
		return returnModels;
	},
	
	/**
	 * 返回当前页对应的数据列表
	 */
	getCurrentPageModels:function(){
		//return this.datagridView.collection;
		var models = this.datagridView.collection.models;
		var returnModels=[];
		
		for(var i=0; i<models.length; i++){
			returnModels.push(models[i].attributes);
		}
		
		return returnModels;
	}

});