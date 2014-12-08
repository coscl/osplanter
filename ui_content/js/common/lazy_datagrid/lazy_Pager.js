/**
 *
 * 定义分页控件数据模型
 * 定义分页控件视图对象
 *
 * @author peiqiong.yan
 *
 * 2013.11.13 updated
 */

 
 
 
/**
 *
 * 分页控件参数模型定义
 * 包括参数默认值设置和参数过滤
 *
 */
var PagerModel = Backbone.Model.extend({

	defaults : function() {
		return {
			pageNo : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30 ],
			total : 45
		};

	},
	get : function(attr) {
		if (attr == "total") {
			return this.attributes[attr] < 1 ? 0 : this.attributes[attr];

		} else {
			return this.attributes[attr] < 1 ? 1 : this.attributes[attr];
		}

	}
});


/**
 *
 * 分页控件视图对象定义
 * 
 *
 */
var Lazy_Pager= Backbone.View.extend({

			// 指定el,外层为div标签，class名为‘datagrid_pager’
			tagName : 'div',
			
			className : 'datagrid_pager',
			
			model : null,
			
			url : null,

			initialize : function(pagerModel) {
				
				// 初始化数据模型
				this.model = pagerModel;
				
				//临时解决用户分页问题
				var pageSize = this.model.get("pageSize");
				pageSize < 10 ? pagerModel.set({"pageSize":pageSize}) : pagerModel.set({"pageSize":10});
				
				this.maxIndex = 9;
				
				// 分页控件解析与绘制
				this.render();
				
				
				
				// 数据模型中的字段发生变化时，重新渲染分页控件
				this.model.bind('change', this._reRender, this);

			},
			
			events : {
				// "click a.clickabled" : "_doPage",
				// 'change select[class="pagination-page-list"]':"_autoRefresh"
				// "click #fresh" : "_doPage"
			},

			/**
			 * 分页控件的初次解析与绘制
			 */
			render : function() {
				
				// 将分页控件拼接到表格之后
				$(this.model.get("baseEl")).after($(this.el).html(this._template(this.model)));
				
				// 分页控件样式渲染
				this._doPageCss();
				
			},
			
			/**
			 * 初次渲染pager控件
			 * @param model
			 * @returns {String}
			 */
			_template : function(model) {

				var pageSize = model.get("pageSize");
				
				var pageNo = model.get("pageNo");
				
				var pageList = model.get("pageList");
				
				var total = model.get("total");

				var pageCount = Math.ceil(total / pageSize)===0?1:Math.ceil(total / pageSize);
				//console.log("page:"+pageCount);
				var startNo = (total == 0) ? 0 : (pageNo - 1) * pageSize + 1;
				
				var endNo = (pageCount == pageNo || pageCount===0) ? total : pageNo * pageSize;
				
				this.model.set({
					"pageCount" : pageCount
				});
				
				var append_elements="";
				
				append_elements = append_elements+"<span class='prev'></span>";
				
				
				/*
				 * 分3种情况：
				 * 1)当数据总数为0时：不显示分页
				 * 2）当总页数小于等于this.maxIndex：显示所有数据页的索引
				 * 3）当总页数大于this.maxIndex:
				 *     3-1)当前页pageNo>=1 并且 pageNo<=this.maxIndex-2;
				 *     3-2)当前页pageNo>this.maxIndex-4 并且 pageNo<=this.maxIndex-2
				 *     3-3)当前页pageNo>this.maxIndex-2
				 * */
				
				
				if(total===0){
					append_elements = "";
				}
				else if( pageCount<=this.maxIndex && pageCount>0){
					
					//console.log("pageCount:1~"+this.maxIndex);
					
					for(var i=0; i<pageCount; i++){
						
						var curPageIndex_element = "" ;
						var pageIndex = i+1;
						
						if(pageIndex===pageNo){
							curPageIndex_element = "<span class='pageIndex thisPage'>" + pageIndex + "</span>" ;
						}else{
							curPageIndex_element = "<span class='pageIndex'>" + pageIndex + "</span>" ;
						}
						
						append_elements  = append_elements +curPageIndex_element;
						
					}
					
					append_elements = append_elements + "<span class='next'></span>";
					
					append_elements = append_elements + "<span class='count'>(共" + total +"个结果)</span>";
					
				}else if(pageCount>this.maxIndex){
					
					//console.log("pageCount:>"+this.maxIndex);
					//3-1)当前页pageNo>=1 并且 pageNo<=this.maxIndex-4;
					//只需显示1～this.maxIndex-2的索引以及pageCount、pageCount-1的索引
					if(pageNo>=1 && pageNo<=this.maxIndex-4){
						//console.log("pageNo>=1 && pageNo<="+(this.maxIndex-4))
						
						for(var i=0; i<this.maxIndex-2; i++){
							var curPageIndex_element = "" ;
							var pageIndex = i+1;
							
							if(pageIndex===pageNo){
								curPageIndex_element = "<span class='pageIndex thisPage'>" + pageIndex + "</span>" ;
							}else{
								curPageIndex_element = "<span class='pageIndex'>" + pageIndex + "</span>" ;
							}
							
							append_elements  = append_elements + curPageIndex_element;
						}
						
						append_elements = append_elements + "<span class='break'>...</span>";
						
						append_elements = append_elements + "<span class='pageIndex'>" + (pageCount-1) + "</span>";
						append_elements = append_elements + "<span class='pageIndex'>" + pageCount + "</span>";
						
						append_elements = append_elements + "<span class='next'></span>";
						
						append_elements = append_elements + "<span class='count'>(共" + total +"个结果)</span>";
					}
					
					//3-2)当前页pageNo>this.maxIndex-4 并且 pageNo<=this.maxIndex-2
					//显示1～pageNo+2的索引页，以及pageCount、pageCount-1的索引
					else if (pageNo>(this.maxIndex-4) && pageNo<=(this.maxIndex-2)){
						//console.log("pageNo>"+(this.maxIndex-4)+"&& pageNo<="+(this.maxIndex-2))
						//如果总页数为当页数+4，则全部显示
						if(pageCount=== pageNo+4){
							for(var i=0; i<pageCount; i++){
								
								var curPageIndex_element = "" ;
								var pageIndex = i+1;
								
								if(pageIndex===pageNo){
									curPageIndex_element = "<span class='pageIndex thisPage'>" + pageIndex + "</span>" ;
								}else{
									curPageIndex_element = "<span class='pageIndex'>" + pageIndex + "</span>" ;
								}
								
								append_elements  = append_elements +curPageIndex_element;
								
							}
							
							append_elements  = append_elements +"<span class='next'></span>";
							
							append_elements = append_elements + "<span class='count'>(共" + total +"个结果)</span>";
							
							
						//如果总页数大于pageNo+4
						//
						}else{
							
							for(var i=0; i<pageNo+2; i++){
								
								var curPageIndex_element = "" ;
								var pageIndex = i+1;
								
								if(pageIndex===pageNo){
									curPageIndex_element = "<span class='pageIndex thisPage'>" + pageIndex + "</span>" ;
								}else{
									curPageIndex_element = "<span class='pageIndex'>" + pageIndex + "</span>" ;
								}
								
								append_elements  = append_elements + curPageIndex_element;
								
							}
							
							append_elements = append_elements + "<span class='break'>...</span>";
							
							append_elements = append_elements + "<span class='pageIndex'>" + (pageCount-1) + "</span>";
							append_elements = append_elements + "<span class='pageIndex'>" + pageCount + "</span>";
							
							append_elements = append_elements + "<span class='next'></span>";
							
							append_elements = append_elements + "<span class='count'>(共" + total +"个结果)</span>";
						}
												
						
					// 3-3)当前页pageNo>this.maxIndex-2
					}else if(pageNo>this.maxIndex-2){
						//console.log("pageNo>"+(this.maxIndex-2))
						
						//显示页码：1，2，...，pageNo-2,pageNo-1,pageNo ~ count,共显示9个元素
						if(pageNo>=pageCount-4){
							
							var pageIndex=pageCount;
							
							var tail_elements="";
							
							//拼接尾部元素列表：pageNo-2,pageNo-1,pageNo ~  count
							while(pageIndex>pageCount-(this.maxIndex-2)){
								var curPageIndex_element = "";
								
								if(pageIndex===pageNo){
									curPageIndex_element = "<span class='pageIndex thisPage'>" + pageIndex + "</span>" ;
								}else{
									curPageIndex_element = "<span class='pageIndex'>" + pageIndex + "</span>" ;
								}
								
								tail_elements  = curPageIndex_element + tail_elements;
								
								pageIndex=pageIndex-1;
								
							}
							
							//拼接第一页和第二页
							append_elements = append_elements + "<span class='pageIndex'>1</span>";
							append_elements = append_elements + "<span class='pageIndex'>2</span>";
							
							//拼接省略点
							append_elements = append_elements + "<span class='break'>...</span>";
							
							//拼接所有尾部页
							append_elements = append_elements + tail_elements
							
							append_elements = append_elements + "<span class='next'></span>";
							append_elements = append_elements + "<span class='count'>(共" + total +"个结果)</span>";
						
							
							
						//显示页码：1，2，... ，pageNo-2,pageNo-1,pageNo,pageNo+1,pageNo+2，... ，count-1, count
						}else{
							
							
							//拼接第一页和第二页
							append_elements = append_elements + "<span class='pageIndex'>1</span>";
							append_elements = append_elements + "<span class='pageIndex'>2</span>";
							
							//拼接省略点
							append_elements = append_elements + "<span class='break'>...</span>";
							
							//拼接中间页码
							append_elements = append_elements + "<span class='pageIndex'>"+ (pageNo-2) +"</span>";
							append_elements = append_elements + "<span class='pageIndex'>"+ (pageNo-1) +"</span>";
							append_elements = append_elements + "<span class='pageIndex thisPage'>"+ pageNo +"</span>";
							append_elements = append_elements + "<span class='pageIndex'>"+ (pageNo+1) +"</span>";
							append_elements = append_elements + "<span class='pageIndex'>"+ (pageNo+2) +"</span>";
							
							//拼接省略点
							append_elements = append_elements + "<span class='break'>...</span>";
							
							append_elements = append_elements + "<span class='pageIndex'>" + (pageCount-1) + "</span>";
							append_elements = append_elements + "<span class='pageIndex'>" + pageCount + "</span>";
							
							append_elements = append_elements + "<span class='next'></span>";
							append_elements = append_elements + "<span class='count'>(共" + total +"个结果)</span>";
							
							
						}
						
						
					}			
					
					
				}
				
				
				
				return append_elements;
			},
			
			/**
			 * 初次样式渲染
			 */
			_doPageCss : function() {
				
				var pageCount = this.model.get("pageCount");
				
				var pageNo = this.model.get("pageNo");	
				
				if(pageCount >1){
					
					if (pageNo < pageCount && pageNo > 1) {
						$(this.model.get("baseEl")).next().find(".prev").removeClass("disabled").addClass("clickabled");
						$(this.model.get("baseEl")).next().find(".next").removeClass("disabled").addClass("clickabled");
					}
					
					if (pageNo == 1) {
						$(this.model.get("baseEl")).next().find(".prev").removeClass("clickabled").addClass("disabled");
						$(this.model.get("baseEl")).next().find(".next").removeClass("disabled").addClass("clickabled");
					}
					
					if (pageNo == pageCount) {
						$(this.model.get("baseEl")).next().find(".prev").removeClass("disabled").addClass("clickabled");
						$(this.model.get("baseEl")).next().find(".next").removeClass("clickabled").addClass("disabled");
					}
					
					
				}else{
					$(this.model.get("baseEl")).next().find(".prev").removeClass("clickabled").addClass("disabled");
					$(this.model.get("baseEl")).next().find(".next").removeClass("clickabled").addClass("disabled");
				}
				
				
				
				
			},
			

			/**
			 * 当this.model数据有改动时，重新渲染分页控件
			 */
			_reRender : function() {
				
				var pageSize = this.model.get("pageSize");
				
				var pageNo = this.model.get("pageNo");
				
				var pageList = this.model.get("pageList");
				
				var total = this.model.get("total");

				// var pageCount = this.model.get("pageCount");
				var pageCount = Math.ceil(total / pageSize)===0? 1 : Math.ceil(total / pageSize);
				
				var startNo = (total == 0) ? 0 : (pageNo - 1) * pageSize + 1;
				
				var endNo = (pageCount == pageNo || pageCount===0) ? total : pageNo * pageSize;
				
				this.model.set({
					"pageCount" : pageCount
				});
				
				this.render();

			},


			
			/**
			 * 点击pager控件上的操作按钮时，执行该函数
			 */
			_doPage : function(e) {
				
				var pageNo = this.model.get("pageNo");
				
				var pageCount = this.model.get("pageCount");
				
				if($(e.currentTarget).hasClass("pageIndex")){
					this.model.set({
						"pageNo" : parseInt($(e.currentTarget).html(),10)
					});
				}else if($(e.currentTarget).hasClass("prev")){
					this.model.set({
						"pageNo" : pageNo > 1 ? (pageNo - 1) : 1
					});
				}else if($(e.currentTarget).hasClass("next")){
					this.model.set({
						"pageNo" : pageNo < pageCount ? (pageNo + 1): pageCount
					});
				}


			},
			
			/**
			 * 修改pageSize时调用该函数
			 */
			_autoRefresh : function() {
			
				//console.log(this.model.get("baseEl"));
/*				this.model.set({
					"pageSize" : Number($(this.model.get("baseEl")).next().find(".pager_list option:selected").val()),
					"pageNo" : 1
				});*/
				
			},
			
			
			
			/**
			 * 判断当前页是不是最后一页
			 */
			isLastPage:function(){
				var returnVal=false;
				var pageCount = Math.ceil(this.model.get("total") /this.model.get("pageSize"));
				if(pageCount===this.model.get("pageNo")){
					returnVal=true;
				}
				
				return returnVal;
			}
		});