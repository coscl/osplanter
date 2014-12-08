/**
 * Lazy_DatePicker V2.0
 * 
 * @author 刘曦冉 2013.08
 *
 * updated by 颜佩琼 on 2013.11.15
 *
 * 
 */

 
/**
 *
 *公共方法定义
 */
var libMethod = {

	/**
	 * 判断是否是闰年
	 * (能被4整除但不能被100整除，或者能被400整除的为闰年)
	 */
	'isLeapYear' : function(year) {		
		return (year%4===0 && year%100!==0) || (year%400===0);
	},
	
	
	/**
	 * 根据日期判断是星期几 
	 * @param date string '2013-06-25' 
	 * @return weedDay int 0-6;
	 */
	'getWeekDay' : function(date) {
		
		//根据date获取4位年份、月份、世纪、2位年份、该月的第几天
		var year = parseInt(date.substring(0, 5),10);
		var century = parseInt(date.substring(0, 2),10);
		var year2bit = parseInt(date.substring(2, 4),10);
		var month = parseInt(date.substring(5, 7),10);
		var day = parseInt(date.substring(8, 10),10);
		
		//初始化返回值
		var weedDay = 0;
		
		if (month < 3) {
			year = year - 1;
			century = parseInt(year.toString().substring(0, 2),10);
			year2bit = parseInt(year.toString().substring(2, 4),10);
			switch (month) {
				case 1:
					month = 13;
					break;
				case 2:
					month = 14;
					break;
				default:
					break;
			}
		}
		
		//获取返回值
		weedDay = (year2bit + parseInt(year2bit / 4,10) + parseInt(century / 4,10) - 2 * century + parseInt(26 * (month + 1) / 10) + day - 1) % 7;
		
		return weedDay < 0 ? weedDay + 7 : weedDay;
		
	},
	
	
	/**
	 * 判断一个月有多少天 
	 * @param date string '2013-06-25' 
	 * @return days int 这个月的天数
	 */
	'getMonthDays' : function(date) {
	
		var days=0;
		var month = parseInt(date.substring(5, 8),10);
		var year = parseInt(date.substring(0, 5),10);
		if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
			days=31;
		} else if (month === 4 || month === 6 || month === 9 || month === 11) {
			days=30;
		} else {
			days=this.isLeapYear(year) ? 29 : 28;
		}
		
		return days;
		
	},
	
	
	/**
	 * 计算日期显示表格盘
	 * 用一个6*7的二维数组来表示，属于当前月的天用>=1的数值表示，非当前月的天用0表示
	 */
	'calCalendar' : function(date) {
		
		//先声明一维
		var calendar = new Array();
		var dateArry = date.split("-");
		
		dateArry[1] = parseInt(dateArry[1],10)-1;
		if(dateArry[1] <1){
			dateArry[1] = 12;
			dateArry[0] = parseInt(dateArry[0],10)-1;
		}
		dateArry[1] = dateArry[1]>10 ? dateArry[1] : "0"+dateArry[1];
		var preDate = dateArry.join("-");
		
		dateArry[1] = parseInt(dateArry[1],10)+2;
		dateArry[1] = dateArry[1]>10 ? dateArry[1] : "0"+dateArry[1];
		if(dateArry[1] >12){
			dateArry[1] = 1;
			dateArry[0] = parseInt(dateArry[0],10)+1;
		}
		var nextDate = dateArry.join("-");
		
		//判断当前月的第一天是周几
		var currentFirstWeekDay = this.getWeekDay(date.substring(0, 8) + '01'); 
		
		// 判断当前月有多少天
		var currentDays = this.getMonthDays(date);
		var preDays = this.getMonthDays(preDate);
		
		var daytemp = nextDayYemp = 0;
		
		//初始化二维数组（6*7）
		for ( var i = 0; i < 6; i++) {
			calendar[i] = new Array(); 
			for ( var j = 0; j < 7; j++) { 
				calendar[i][j] = 0;
			}
		}
		
		for (var i = 0; i < 6; i++) {
			for (var j = 0; j < 7; j++) {
				if (i * 7 + j >= currentFirstWeekDay && i * 7 + j < currentDays + currentFirstWeekDay) {
					calendar[i][j] = ++daytemp;
				}else if(i * 7 + j < currentFirstWeekDay){
					calendar[i][j] = preDays - currentFirstWeekDay + j +1;
				}else{
					
					calendar[i][j] = ++ nextDayYemp;
				}
			}
		}
		return calendar;
	}

};


/**
 * 日期控件视图对象定义
 *
 */
var	Lazy_DatePicker = Backbone.View.extend({
		
		/**
		 * 用户自定义参数
		 */
		options : {
		
			//指定控件显示位置，如‘#id’
			baseEl : '',
			
			//指定日期显示格式,支持三种格式，即'yyyy-mm-dd'，'yyyy/mm/dd','m/d/yyyy',（日期格式 时间格式，以空格分割）
			formatter : 'yyyy-mm-dd',
			
			// 初始化时input框中是否有值 默认无false，true初始化为当前系统时间
			showInitDate : true,
			
			//是否显示时间控件
			showTimePicker : false
		},
		
		/**
		 * 初始化控件公共变量
		 */
		initialize : function() {
		
			_.bindAll(this, 'render', 'showCalendar');
			
			//触发日期控件的input元素
			this.baseEl=this.options.baseEl;
			
			//初始化年、月、日，默认为当前时间
			this.currentDate = {
					"year":new Date().getFullYear(),
					"month":new Date().getMonth() + 1,
					"day":new Date().getDate()
			};
			this.selectedDate = {
					"year":new Date().getFullYear(),
					"month":new Date().getMonth() + 1,
					"day":new Date().getDate()
			};
			
			$(this.baseEl).unbind('focus');
			
			//解析和绘制日期控件		
			this.render();
			
			//聚焦指定输入框时，显示日期控件
			$(this.baseEl).bind('focus', this.showCalendar);
			
		},
		
		/**
		 * 解析和绘制日期控件
		 */
		render : function() {
			$(this.options.baseEl).attr("readonly","readonly");
			this.mainView = new mainPickerView(this.options);
			
		},
		
		showCalendar : function() {
			this.mainView.cssPosition();
			this.mainView.container.show();
//			if (!$(this.baseEl).val()) {
//				this.mainView.showCalendar();
//				if (this.showTimePicker) {
//					this.showTimePicker.setValue();
//				}
//			} else {
//				this.mainView.container.show();
//			}
			
		},
		/**
		 * 重置
		 */
		resetPicker : function(){
			this.mainView.resetPicker();
		},
		/**
		 * 取值
		 */
		getPickerValue : function(){
			return this.mainView.getPickerValue();
		}
		
	});
	
	/**
	 * 控件显示内容控制对象定义
	 */
	var mainPickerView = Backbone.View.extend({
			
				el : '',
				
				initialize : function(options) {
					
					this.options = options;
					
					this.baseEl = options.baseEl;
					
					this.el = $(this.baseEl).parent();
					
					this.containerId = this.baseEl.split("#")[1]+"_container";
					
					this.currentDate = {
							"year":new Date().getFullYear(),
							"month":new Date().getMonth() + 1,
							"day":new Date().getDate()
					};
					this.selectedDate = {
							"year":new Date().getFullYear(),
							"month":new Date().getMonth() + 1,
							"day":new Date().getDate()
					};

					this.render();
					
					_.bindAll(this, 'render', 'setCalendarContent', 'bindEvents', 'closeBtnClick', 'showCalendar',
							'itemClick', 'todayBtnClick', 'okBtnClick', 'dateformatter',
							'setTableContent', 'yearSelected', 'cssPosition');
				},
				
				render : function() {
					
					if ($('#'+this.containerId).length === 0) {
						//创建用户显示日期控件的容器
						this.container = $('<div id="'+this.containerId+'" class="lazy_date_picker"></div>');
						
						//往容器中添加两个元素：日期头部容器和日期主体容器
						this.container.append('<div class="lazy_date_title">'
														+ '<div class="lazy_date_title_content"></div>'//id="date_title_content"  
													+ '</div>'
													+ '<div class="lazy_date_body">'
													+ '</div>' 
													+ '<span id="'+this.containerId+'_time_body" class="spinner"></span>'
													+ '<div class="date_button">' 
														+ '<button class="date_button_today">今天</button>' 
														+ '<button class="date_button_ok" style="margin-left:10px">确定</button>'
														+ '<button class="date_button_off" style="margin-left:10px">关闭</button>'
													+ '</div>'
													+ '<div style="clear:both"></div>');
					} else {
						this.container = $('#'+this.containerId);
					}
					
					//将日期控件容器放在body的最后
					$('body').append(this.container);
					

					if (this.options.showTimePicker) {
						$("#"+this.containerId+"_time_body").Lazy_TimePicker();
					}else{
						$(this.container).find(".spinner").hide();
					}
					
					this.showCalendar();
				},
				
				
				/**
				 * lib方法只接受 这个类型的 2013-06-25
				 * 调用setCalendarContent绘制日期控件所有显示内容
				 * 调用bindEvents绑定所有事件处理机制
				 */
				showCalendar : function() {
					
//					this.selectedDate.month = parseInt(this.selectedDate.month,10) >= 10 ? parseInt(this.selectedDate.month,10) : "0" + parseInt(this.selectedDate.month,10);
//					this.selectedDate.day = parseInt(this.selectedDate.day,10) >= 10 ? parseInt(this.selectedDate.day,10) : "0" + parseInt(this.selectedDate.day,10);
//					
//					this.formattedDate = this.selectedDate.year + "-" + this.selectedDate.month + "-" + this.selectedDate.day;
					//设置日期控件显示位置
					this.cssPosition();
					
					//设置日期控件的所有显示内容及样式
					this.setCalendarContent();
					
					this.bindEvents();
				},
				
				/**
				 * 设置日期控件的所有显示内容及样式
				 */
				setCalendarContent : function() {
					
					//定义日期控件表格盘的基本显示内容
					var monthlist = "",yearlist = "";
					var $dateBody = $('<div class="lazy_date_table_title">'
							+ '<table>'
								+ '<tr>'
									+ '<td>日</td>'
									+ '<td>一</td>'
									+ '<td>二</td>'
									+ '<td>三</td>'
									+ '<td>四</td>'
									+ '<td>五</td>'
									+ '<td>六</td>'
								+ '</tr>'
							+ '</table>'
							+ '</div>'
							+ '<div class="lazy_date_table_content">'
								+ '<table></table>' 
							+ '</div>');
					
					for(i=1;i<100;i++){
						var year = 2000 + parseInt(i,10);
						if(i<13){
							var month = i>=10? i:"0"+i;
							monthlist += "<li>"+month+"月</li>";
						}
						yearlist += "<li>"+year+"年</li>";
					}
					
					//定义日期头部显示内容
					var $dateTitle = $("<span class=\"lazy_datepicker_toolbar\">"+
												"<span class=\"lazy_datepicker_year\">"+
													"<span class=\"lazy_datepicker_year_text\"></span>"+
													"<img src=\"../../static/css/images/arrow_down.png\">"+
												"</span>"+
												"<span class=\"lazy_datepicker_month\">"+
													"<span class=\"lazy_datepicker_month_text\"></span>"+
													"<img src=\"../../static/css/images/arrow_down.png\">"+
												"</span>"+
											"</span>"+
											"<ul class=\"lazy_datepicker_year_list\">" +
												yearlist +
											"</ul>"+
											"<ul class=\"lazy_datepicker_month_list\">" +
												monthlist +
											"</ul>");
					
					//将日期头部内容放到头部容器中
					$(this.container).find('.lazy_date_title_content').empty().append($dateTitle);
					
					//将日期表格盘基本内容放到主体容器中
					$(this.container).find('.lazy_date_body').empty().append($dateBody);
					
					//设置日期控件表格盘显示内容及样式
					this.setTableContent();
					
				},
				
				/**
				 * 设置日期控件表格盘显示内容及样式
				 */
				setTableContent : function() {
					
					//计算控件表格盘（6x7）的初始状态：
					//即不属于当前月的天状态值为0，
					//属于当前月的天状态值为该月的第几天
					this.selectedDate.month = parseInt(this.selectedDate.month,10) >= 10 ? parseInt(this.selectedDate.month,10) : "0" + parseInt(this.selectedDate.month,10);
					this.selectedDate.day = parseInt(this.selectedDate.day,10) >= 10 ? parseInt(this.selectedDate.day,10) : "0" + parseInt(this.selectedDate.day,10);
					
					this.formattedDate = this.selectedDate.year + "-" + this.selectedDate.month + "-" + this.selectedDate.day;
					
					var calendar = libMethod.calCalendar(this.formattedDate);
					
					
					//清空表格盘内容
					$('.lazy_date_table_content').find('table').empty();
					
					for ( var i = 0; i < 6; i++) {
						var $tr = $('<tr></tr>');
						for ( var j = 0; j < 7; j++) {
							var $td = $('<td></td>');
								
								if(i === 0 && calendar[i][j] >15){
									//前一个月
									$td.addClass('prev');
									$td.html(calendar[i][j]);
								}else if(i>3 && calendar[i][j] <15){
									//后一个月
									$td.addClass('next');
									$td.html(calendar[i][j]);
								}else{
									$td.addClass('current').html(calendar[i][j]);
									if(this.selectedDate.year === this.currentDate.year &&
											this.selectedDate.month === this.currentDate.month && 
											 	parseInt(calendar[i][j],10) === parseInt(this.currentDate.day,10)){
										$td.addClass('current_day').addClass("select_day");
									}else if(parseInt(calendar[i][j],10) === parseInt(this.selectedDate.day,10)){
										$td.addClass("select_day");
									}
								}
								$tr.append($td);
						}
						$('.lazy_date_table_content').find('table').append($tr);
						
					}

					//设置日期头部中的年份和月份信息
					$(this.container).find('.lazy_datepicker_year_text').text(this.selectedDate.year +"年");
					$(this.container).find('.lazy_datepicker_month_text').text(this.selectedDate.month + "月");
				},
				
				
				/**
				 * 控件事件绑定
				 */
				bindEvents : function() {
					
					//当前月点击
					$('.lazy_date_table_content').off('click',".current");
					$('.lazy_date_table_content').on('click',".current", _(this.itemClick).bind(this));
					
					//前一个月点击
					$('.lazy_date_table_content').off('click',".prev");
					$('.lazy_date_table_content').on('click',".prev", _(function(e){
						this.selectedDate.day = $(e.currentTarget).text();
						
						this.changeMonth("left");
					}).bind(this));
					
					//后一个月点击
					$('.lazy_date_table_content').off('click',".next");
					$('.lazy_date_table_content').on('click',".next", _(function(e){
						this.selectedDate.day = $(e.currentTarget).text();
						this.changeMonth("right");
					}).bind(this));
					
					//点击年
					$(".lazy_datepicker_toolbar").on("click",".lazy_datepicker_year",_(function(e){
						$(".lazy_date_title_content ul").hide();
						$(".lazy_datepicker_year_list").show();
						var height = (parseInt($(e.currentTarget).text(),10) - 2001) * 28;
						document.getElementsByClassName("lazy_datepicker_year_list")[0].scrollTop = height;
						e.stopPropagation();
					}).bind(this));
					
					//点击月
					$(".lazy_datepicker_toolbar").on("click",".lazy_datepicker_month",_(function(e){
						$(".lazy_date_title_content ul").hide();
						$(".lazy_datepicker_month_list").show();
						var height = (parseInt($(e.currentTarget).text(),10) - 1) * 28;
						document.getElementsByClassName("lazy_datepicker_month_list")[0].scrollTop = height;
						e.stopPropagation();
					}).bind(this));
					
					//年月选择
					$(".lazy_date_title_content").on("click","li",_(function(e){
						var target = $(e.currentTarget).text();
						var parent = $(e.currentTarget).parent().attr("class");
						if(parent === "lazy_datepicker_year_list"){
							this.selectedDate.year = target.substring(0,4);
						}else{
							this.selectedDate.month = target.substring(0,2);
						}
						$(".lazy_date_title_content ul").hide();
						this.setTableContent();
					}).bind(this));
					
					//年月选择框消失
					$(document).bind('click',_(function(event) {// 点击输入框以外任意区域下拉框消失
						event = event || window.event;
						if($(".lazy_datepicker_year_list").length >0){
							var x_left = $(".lazy_datepicker_year_list").offset().left;
							var x_right = x_left + 60;
							var y_top = $(".lazy_datepicker_year_list").offset().top;
							var y_bottom = y_top + 140;
							
							if (event.clientX < x_left || event.clientX > x_right || event.clientY < y_top
									|| event.clientY > y_bottom) {
								$(".lazy_date_title_content ul").hide();
							}
						}
						
					}).bind(this));
					
					//'今天'按钮点击处理逻辑绑定
					$(this.container).find('.date_button_today').unbind('click');
					$(this.container).find('.date_button_today').bind('click', _(this.todayBtnClick).bind(this));
					
					//‘确定’按钮点击处理逻辑绑定
					$(this.container).find('.date_button_ok').unbind('click');
					$(this.container).find('.date_button_ok').bind('click', _(this.okBtnClick).bind(this));
					
					//‘关闭’按钮点击处理逻辑绑定
					$(this.container).find('.date_button_off').unbind('click');
					$(this.container).find('.date_button_off').bind('click', _(this.closeBtnClick).bind(this));
					
				},
				
				/**
				 * 包含日期和时间
				 * 格式化日期  1、例'2013-06-25' 2、例'2013/06/05' 3、例'6/5/2013' 
				 * @param year 当前年份
				 * @param month 当前月份
				 * @param day 当前日
				 * @param flag 是否在输入框中显示选中的日期
				 * 
				 * @return showDate 返回指定格式的日期
				 */
				dateformatter : function() {
				
					var showDate='';
//					console.log(this.selectedDate);
					this.selectedDate.month = parseInt(this.selectedDate.month,10) >= 10 ? parseInt(this.selectedDate.month,10) : "0" + parseInt(this.selectedDate.month,10);
					this.selectedDate.day = parseInt(this.selectedDate.day,10) >= 10 ? parseInt(this.selectedDate.day,10) : "0" + parseInt(this.selectedDate.day,10);
					
					var dateFormatter = this.options.formatter.split(" ")[0];

					switch (dateFormatter) {
						case 'yyyy-mm-dd':
							showDate = this.selectedDate.year + "-" + this.selectedDate.month + "-" + this.selectedDate.day;
							break;
						case 'yyyy/mm/dd':
							showDate = this.selectedDate.year + "/" + this.selectedDate.month + "/" + this.selectedDate.day;
							break;
						case 'm/d/yyyy':
							showDate = parseInt(this.selectedDate.month,10) + "/" + parseInt(this.selectedDate.day,10) + "/" + this.selectedDate.year; 
							break;
						default:
							showDate = this.selectedDate.year + "-" + this.selectedDate.month + "-" + this.selectedDate.day;
							break;
					}
					return showDate;
				},
				/**
				 * 时间格式化
				 */
				timeFormatter : function(){
					var selectedTime = $(this.container).find(".spinner-text").val();
					var showTime = "";
					var timeFormatter = this.options.formatter.split(" ")[1];
					switch(timeFormatter){
					case "hh:mm:ss":
						showTime = selectedTime;
						break;
					case "hh-mm-ss":
						var temp = selectedTime.split(":");
						showTime = temp.join("-");
						break;
					case "hh/mm/ss":
						var temp = selectedTime.split(":");
						showTime = temp.join("/");
						break;
					default:
						showTime = selectedTime;
						break;
					}
					return showTime;
				},
				
				/**
				 * 隐藏控件
				 */
				closeBtnClick : function() {
					this.container.hide();
				},
				
				
				/**
				 * 表格盘中方格点击处理
				 */
				itemClick : function(event) {
//					console.log("itemClick");
					var event = event || window.event;
					
					//如果点击的方格属于当前月份值，则更改全局变量dayTemp，并修改选择样式
					//否则不响应点击操作	
//					console.log($(event.currentTarget).text());				
					if($(event.currentTarget).text()){
//						console.log("true---");
						this.selectedDate.day = $(event.currentTarget).text();
						$(event.currentTarget).parent().parent().parent().find('td').removeClass('select_day');
						$(event.currentTarget).addClass('select_day');
					}
					
				},
				
				/**
				 * '今天'按钮点击处理
				 */
				todayBtnClick : function() {
					this.selectedDate.year = this.currentDate.year;
					this.selectedDate.month = this.currentDate.month;
					this.selectedDate.day = this.currentDate.day;
					this.setTableContent();
					this.bindEvents();
				},
				
				
				/**
				 * '确认'按钮点击处理
				 */
				okBtnClick : function() {
					var date = this.dateformatter();
					
					if (this.options.showTimePicker) {
						var time = this.timeFormatter();
						$(this.baseEl).val(date + " " + time);
					} 
					this.closeBtnClick();
				},
				
				changeMonth : function(flag){
					
					this.selectedDate.month = flag === "left" ? parseInt(this.selectedDate.month,10) -1 : parseInt(this.selectedDate.month,10) +1;
					
					if(this.selectedDate.month <1){
						this.selectedDate.year = parseInt(this.selectedDate.year,10) - 1;
						this.selectedDate.month = 12;
					}else if(this.selectedDate.month >12){
						this.selectedDate.year = parseInt(this.selectedDate.year,10) + 1;
						this.selectedDate.month = 1;
					}
					
					this.setTableContent();
					
				},
				
				/**
				 * 获取被选的年份
				 * 为外调接口
				 */
				yearSelected : function() {
					new monthSelectView(this.yearTemp, this.options);
				},
				
				/**
				 * 设置日期控件的显示位置
				 */
				cssPosition : function() {
					
					//根据输入框的位置和大小初始化日期控件的显示位置
					var p_y = $(this.baseEl).offset().top + $(this.baseEl).height();
					var p_x = $(this.baseEl).offset().left;
					//设置日期控件的显示位置
					this.container.css({
						left : p_x,
						top : p_y
					});
				},
				/**
				 * 对外接口：重置控件
				 */
				resetPicker : function(){
					this.selectedDate.year = this.currentDate.year;
					this.selectedDate.month = this.currentDate.month;
					this.selectedDate.day = this.currentDate.day;

					var thisDay = new Date();
					this.selectedDate.hour = thisDay.getHours();// 获取当前小时数(0-23)
					this.selectedDate.minute = thisDay.getMinutes();// 获取当前分钟数(0-59)
					this.selectedDate.second = thisDay.getSeconds();// 获取当前秒数(0-59)
					
					$(this.options.baseEl).val("");
					
					$("#"+this.containerId+"_time_body").Lazy_TimePicker(this.selectedDate.hour + ":" + this.selectedDate.minute);
					
					
					this.setTableContent();
				},
				/**
				 * 获取值
				 */
				getPickerValue : function(){
					var date = this.dateformatter();
					
					if (this.options.showTimePicker) {
						var time = this.timeFormatter();
						return date + " " + time;
					} else{
						return date;
					}
					
					
				}
			});




