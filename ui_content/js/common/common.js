/**
 * 定义前端公共方法和公共变量
 *
 * @author peiqiong.yan
 */

var common = {};

/*
 * 定义公共变量集
 */
common.vars = {
	loadingMsg : "正在处理，请稍侯..."
};

/*
 * 定义公共方法集
 */
common.funcs = {
	/**
	 * 全局遮罩设置
	 */
	mask : function() {
		$("body").Lazy_Mask(common.vars.loadingMsg);
	},

	/**
	 * 取消全局遮罩
	 */
	unMask : function() {
		$("body").Lazy_unMask();
	},

	initHostStatus : function(hostStatus) {
		switch (hostStatus) {
			case 0:
				hostStatus = "正常";
				break;
			case 1:
				hostStatus = "不可达";
				break;
			default:
				hostStatus = "未知";
				break;
		}
		return hostStatus;
	},

	initServiceStatus : function(serviceStatus) {
		switch (serviceStatus) {
			case 0:
				serviceStatus = "正常";
				break;
			case 1:
				serviceStatus = "警告";
				break;
			case 2:
				serviceStatus = "严重";
				break;
			default:
				serviceStatus = "未知";
				break;
		}
		return serviceStatus;
	},

	/**
	 * 检查时间段转化
	 */
	initTimePeriod : function(timePeriod) {
		switch(parseInt(timePeriod,10)) {
			case 5:
				return "24*5";
				break;
			case 1:
				return "24*7";
				break;
			case 3:
				return "none";
				break;
			case 2:
				return "workhours";
				break;
		}
	},

	/**
	 * 存储类型转化
	 */
	initStorageType : function(storageType) {
		switch(storageType) {
			case "nfs":
				return "NFS";
				break;
			case "iscsi":
				return "iSCSI";
				break;
			case "fcp":
				return "Fibre Channel";
				break;
		}
	},

	/**
	 * 存储域类型转化
	 */
	initStorageDomainType : function(storageDomainType, master) {
		switch (storageDomainType) {
			case "data":
				if (master) {
					storageDomainType = "Data(Master)";
				} else {
					storageDomainType = "Data";
				}
				break;
			case "iso":
				storageDomainType = "ISO";
				break;
			case "export":
				storageDomainType = "Export";
				break;
		}
		return storageDomainType;
	},

	initStorageDomainType1 : function(storageDomainType, storageType) {
		switch (storageDomainType) {
			case "data":
				if (storageType == "nfs") {
					storageDomainType = "Data/NFS";
				} else if (storageType == "iscsi") {
					storageDomainType = "Data/iSCSI";
				} else {
					storageDomainType = "Data/Fibre Channel";
				}
				break;
			case "iso":
				storageDomainType = "ISO/NFS";
				break;
			case "export":
				storageDomainType = "Export/NFS";
				break;
		}
		return storageDomainType;
	},
	/**
	 * 虚拟机timezone转化
	 */
	initVirtTimeZome : function(time) {
		switch(time) {
			case "Central Standard Time Mexico":
				return "Central Standard Time (Mexico)";
				break;
			case "E South America Standard Time":
				return "E. South America Standard Time";
				break;
			case "Mid Atlantic Standard Time":
				return "Mid-Atlantic Standard Time";
				break;
			case "W Europe Standard Time":
				return "W. Europe Standard Time";
				break;
			case "W Central Africa Standard Time":
				return "W. Central Africa Standard Time";
				break;
			case "E Europe Standard Time":
				return "E. Europe Standard Time";
				break;
			case "E Africa Standard Time":
				return "E. Africa Standard Time";
				break;
			case "N Central Asia Standard Time":
				return "N. Central Asia Standard Time";
				break;
			case "W Australia Standard Time":
				return "W. Australia Standard Time";
				break;
			case "Cen Australia Standard Time":
				return "Cen. Australia Standard Time";
				break;
			case "E Australia Standard Time":
				return "E. Australia Standard Time";
				break;
			case "Atlantic/Cape/Verde":
				return "Atlantic/Cape_Verde";
				break;
			case "America/Mexico/City":
				return "America/Mexico_City";
				break;
			case "Etc/GMT/12":
				return "Etc/GMT+12";
				break;
			case "America/Sao/Paulo":
				return "America/Sao_Paulo";
				break;
			case "America/St/Johns":
				return "America/St_Johns";
				break;
			case "America/Los/Angeles":
				return "America/Los_Angeles";
				break;
			case "Pacific/Port/Moresby":
				return "Pacific/Port_Moresby";
				break;
			default:
				return time;
		}
	},
	changeVirtTimeZome : function(time){
		switch(time) {
		case "Central Standard Time (Mexico)":
			return "Central Standard Time Mexico";
			break;
		case "E. South America Standard Time":
			return "E South America Standard Time";
			break;
		case "Mid-Atlantic Standard Time":
			return "Mid Atlantic Standard Time";
			break;
		case "W. Europe Standard Time":
			return "W Europe Standard Time";
			break;
		case "W. Central Africa Standard Time":
			return "W Central Africa Standard Time";
			break;
		case "E. Europe Standard Time":
			return "E Europe Standard Time";
			break;
		case "E. Africa Standard Time":
			return "E Africa Standard Time";
			break;
		case "N. Central Asia Standard Time":
			return "N Central Asia Standard Time";
			break;
		case "W. Australia Standard Time":
			return "W Australia Standard Time";
			break;
		case "Cen. Australia Standard Time":
			return "Cen Australia Standard Time";
			break;
		case "E Australia Standard Time":
			return "E. Australia Standard Time";
			break;
		case "Atlantic/Cape_Verde":
			return "Atlantic/Cape/Verde";
			break;
		case "America/Mexico_City":
			return "America/Mexico/City";
			break;
		case "Etc/GMT+12":
			return "Etc/GMT/12";
			break;
		case "America/Sao_Paulo":
			return "America/Sao/Paulo";
			break;
		case "America/St_Johns":
			return "America/St/Johns";
			break;
		case "America/Los_Angeles":
			return "America/Los/Angeles";
			break;
		case "Pacific/Port_Moresby":
			return "Pacific/Port/Moresby";
			break;
		default:
			return time;
		}
	},
	initVmOs : function(os) {
		switch (os) {
			case "NKAS5" :
				return "NeoKylin Linux Advanced Server V5";
				break;
			case "NKAS5x64" :
				return "NeoKylin Linux Advanced Server V5 X64";
				break;
			case "NKAS6" :
				return "NeoKylin Linux Advanced Server V6";
				break;
			case "NKAS6x64" :
				return "NeoKylin Linux Advanced Server V6 X64";
				break;
			case "rhel_3" :
				return "Red Hat Enterprise Linux 3.x";
				break;
			case "rhel_3x64" :
				return "Red Hat Enterprise Linux 3.x X64";
				break;
			case "rhel_4" :
				return "Red Hat Enterprise Linux 4.x";
				break;
			case "rhel_4x64" :
				return "Red Hat Enterprise Linux 4.x X64";
				break;
			case "rhel_5" :
				return "Red Hat Enterprise Linux 5.x";
				break;
			case "rhel_5x64" :
				return "Red Hat Enterprise Linux 5.x X64";
				break;
			case "rhel_6" :
				return "Red Hat Enterprise Linux 6.x";
				break;
			case "rhel_6x64" :
				return "Red Hat Enterprise Linux 6.x X64";
				break;
			case "sles_11" :
				return "SUSE Linux Enterprise Server 11";
				break;
			case "ubuntu_12_04" :
				return "Ubuntu Precise Pangolin LTS";
				break;
			case "ubuntu_12_10" :
				return "Ubuntu Quantal Quetzal";
				break;
			case "ubuntu_13_04" :
				return "Ubuntu Raring Ringtails";
				break;
			case "ubuntu_13_10" :
				return "Ubuntu Saucy Salamander";
				break;
			case "other_linux" :
				return "Other Linux";
				break;
			case "windows_2003" :
				return "Windows 2003";
				break;
			case "windows_2003x64" :
				return "Windows 2003 X64";
				break;
			case "windows_2008" :
				return "Windows 2008";
				break;
			case "windows_2008R2x64" :
				return "Windows 2008 R2 X64";
				break;
			case "windows_2008x64" :
				return "Windows 2008 X64";
				break;
			case "windows_2012x64" :
				return "Windows 2012 X64";
				break;
			case "windows_7" :
				return "Windows 7";
				break;
			case "windows_7x64" :
				return "Windows 7 X64";
				break;
			case "windows_8" :
				return "Windows 8";
				break;
			case "windows_8x64" :
				return "Windows 8 X64";
				break;
			case "windows_xp" :
				return "Windows XP";
				break;
			case "other" :
				return "Other OS";
				break;
			default :
				return os;
		}
	},
	/**
	 * 虚拟机迁移选项汉化
	 */
	initVmMigration : function(type) {
		switch (type) {
			case "migratable":
				return "允许手动迁移和自动迁移";
				break;
			case "user_migratable":
				return "只允许手动迁移";
				break;
			case "pinned":
				return "不允许迁移";
				break;
		}
	},
	/**
	 * 虚拟机运行/迁移优先级汉化
	 */
	initVmMigrationRun : function(priority) {
		switch (priority) {
			case "1":
				return "低";
				break;
			case "50":
				return "中";
				break;
			case "100":
				return "高";
				break;
		}
	},


	/**
	 * 格式化IPMI远程控制返回值
	 */
	initIpmiData : function(remotectlresult) {
		switch (remotectlresult) {
			case "remotectlresult0":
				return "远程主机处于关机状态";
				break;
			case "remotectlresult1":
				return "远程主机处于开机状态";
				break;
			case "remotectlresult2":
				return "远程主机正在关机";
				break;
			case "remotectlresult3":
				return "远程主机已开机";
				break;
			case "remotectlresult4":
				return "远程主机已重新启动";
				break;
			case "remotectlresult5":
				return "远程主机已关机，不可重启";
				break;
			case "remotectlresult6":
				return "IPMI地址、IPMI用户名或IPMI密码错误";
				break;
			case "remotectlresult7":
				return "远程主机没有注册BMC硬件信息";
				break;
			case "remotectlresult8":
				return "远程主机没有配置IPMI，不支持远程控制";
				break;
		}
	},
	/**
	 * 跳转方法
	 */
	pageJump : function(flag) {
		/**
		 * 此处为前端内部定义
		 * 具体数据中心：dataCenterLabel
		 *
		 * 普通集群：monClusterLabel
		 * 普通集群模板：monClusterTemplate
		 * 具体普通集群：monCluster
		 * 普通集群主机：monClusterHost
		 *
		 * 虚拟化集群：virtClusterLabel
		 * 具体虚拟化集群：virtCluster
		 * 虚拟化集群主机：virtClusterHost
		 * 虚拟化集群虚拟机： virtClusterVm
		 * 虚拟化集群网络：virtClusterNet
		 * 虚拟化集群存储：virtClusterStorage
		 * 虚拟化集群模板：virtClusterTemplate
		 * 具体虚拟机：virtClusterVmInfo
		 *
		 * 高可用集群：haClusterLabel
		 * 具体高可用集群：haCluster
		 * 高可用集群节点：haClusterHost
		 * 具体高可用节点：haClusterHostInfo
		 * 高可用集群资源： haClusterResourse
		 */
		var positionStr = "<a class=\"crumbs_monclusterlabel\" href=\"#/clusterroot_ha/" + sessionStorage.dataCenterId + "\">高可用集群</a> &gt&gt";
		switch(flag) {
			
			case "monClusterTemplate":
				positionStr += " 监控配置模板";
				if ($(".sc_body_content_main").length === 0) {
					this.jumpToPageDefaultCase();
				} else {
					$.get("cluster_monitor/monitor_template.html", function(result) {
						$(".sc_body_content_main").html(result);
						clusterVar.clusterTree.selectNode("#/monitor_template/" + sessionStorage.dataCenterId, "route");
					});
				}
				break;
			
			
			case "haClusterLabel":
				positionStr = "<a class=\"crumbs_monclusterlabel\" href=\"#/clusterroot_ha/" + sessionStorage.dataCenterId + "\">高可用集群</a>";
				if ($(".sc_body_content_main").length === 0) {
					this.jumpToPageDefaultCase();
				} else {
					$.get("cluster_ha/ha_index.html", function(result) {
						$(".sc_body_content_main").html(result);
						clusterVar.clusterTree.selectNode("#/clusterroot_ha/" + sessionStorage.dataCenterId, "route");
					});
				}
				break;
			case "haCluster":
				positionStr += " " + sessionStorage.clusterName;
				if ($(".sc_body_content_main").length === 0) {
					this.jumpToPageDefaultCase();
				} else {
					$.get("cluster_ha/ha_cluster.html", function(result) {
						$(".sc_body_content_main").html(result);
						clusterVar.clusterTree.selectNode("#/hacluster/" + sessionStorage.clusterId, "route");
					});
				}
				break;
			case "haClusterHost":
				positionStr += " <a class=\"crumbs_haClusterLabel\" href=\"#/hacluster/" + sessionStorage.clusterId + "\">" + sessionStorage.clusterName + "</a> &gt&gt 节点";
				if ($(".sc_body_content_main").length === 0) {
					this.jumpToPageDefaultCase();
				} else {
					$.get("cluster_ha/ha_nodemanage.html", function(result) {
						$(".sc_body_content_main").html(result);
						clusterVar.clusterTree.selectNode("#/hahostIndex/" + sessionStorage.clusterId, "route");
					});
				}
				break;
			case "haClusterResourse":
				positionStr += " <a class=\"crumbs_haClusterLabel\" href=\"#/hacluster/" + sessionStorage.clusterId + "\">" + sessionStorage.clusterName + "</a> &gt&gt 资源";
				if ($(".sc_body_content_main").length === 0) {
					this.jumpToPageDefaultCase();
				} else {
					$.get("cluster_ha/ha_resource.html", function(result) {
						$(".sc_body_content_main").html(result);
						clusterVar.clusterTree.selectNode("#/haresourceIndex/" + sessionStorage.clusterId, "route");
					});
				}
				break;
			
			case "haClusterHostInfo":
				positionStr += " <a class=\"crumbs_haClusterLabel\" href=\"#/hacluster/" + sessionStorage.clusterId + "\">" + sessionStorage.clusterName + "</a> &gt&gt " + "<a class=\"crumbs_haClusterLabel\" href=\"#/hahostIndex/" + sessionStorage.clusterId + "\">节点</a> &gt&gt " + sessionStorage.hostName;
				if ($(".sc_body_content_main").length === 0) {
					this.jumpToPageDefaultCase();
				} else {
					$.get("cluster_ha/ha_nodemanageInfo.html", function(result) {
						$(".sc_body_content_main").html(result);
						clusterVar.clusterTree.selectNode("#/hahost/" + sessionStorage.hostId, "route");
					});
				}
				break;
			
			default:
				break;
		}
		$(".setposition").html(positionStr);

	},
	jumpToPageDefaultCase : function (){
		indexVar.router.common(1);
		$.get("system/cluster_index.html", function(result) {
			$(".sc_body_content").html(result);
			$(".setposition").html("高可用集群");
			indexVar.router.navigate("/root/system", {
				trigger : true
			});
		});
	},
	/**
	 * 退出登录或者超时登出时，清空sessionStorage中的内容，终止整个router过程
	 */
	destoryCommonSettings : function() {
		Backbone.history.stop();
		sessionStorage.clear();
		localStorage.isLogin = "false";
		indexVar.router.navigate("");
	},
	/**
	 * 树形结构与二级树形结构相互转化
	 */
	treeVSSubtree : function(flag) {
		switch(flag) {
			case "tree":
				//显示树形结构
				$("#cluste_tree").show();
				$(".left_nav .tree_arrow_left").hide();
				$(".left_nav .cs2c_tab").hide();
				$("#sub_tree_menu").html("");
				break;
			case "subtree":
				$("#cluste_tree").hide();
				$(".left_nav .tree_arrow_left").show();
				$(".left_nav .cs2c_tab").show();
				break;
			default:
				break;
		}
	},
	/**
	 * 指定验证块父元素，直接创建块中的所有验证框。
	 * 整块验证,页面创建元素时，需要给 class="cs2c_validatebox",datatype="common.validateReg中对应的属性名，比如name"
	 */
	createValidates : function(parentEl) {
		//每次初始化的时候清空
		this.validates = [];
		var that = this;
		var validates = $(parentEl).find(".cs2c_validatebox");
		$.each(validates, function(index, item) {

			var validateType = this.getAttribute("validatetype");
			if (!!validateType) {
				var reg_exp = common.validateReg[validateType], tipmsg = common.validateMsg[validateType];

			} else {
				var reg_exp = null, tipmsg = "必填项";
			}
			var validateItem = new Lazy_ValidateBox({
				"selector" : $(item),
				"tipmsg" : tipmsg,
				"reg_exp" : reg_exp
			});
			that.validates.push(validateItem);
		});
		return that.validates;
	},
	/**
	 * 整块验证
	 */
	blockValidate : function(validateObjs) {
		var validateFlag = true;

		$.each(validateObjs, function(index, item) {

			return validateFlag = item.inputValidate();
		});

		return validateFlag;
	},
	/**
	 * ip转number
	 */
	ip2number : function(ip) {
		var tokens = ip.split('.');
		var numval = 0
		for (num in tokens) {
			numval = (numval << 8) + parseInt(tokens[num],10);
		}
		return numval
	},
};

/**
 * 验证规则
 */
common.validateReg = {

	name : /^[a-zA-Z][a-zA-Z0-9\_\-]{3,19}$/,
	vmName : /^[a-zA-Z][a-zA-Z0-9\_\-]{3,14}$/,
	resourcename : /^[a-zA-Z][a-zA-Z0-9\_\-]{1,19}$/,
	vnetname : /^[a-zA-Z][a-zA-Z0-9\_\-]{0,14}$/,
	userName : /^[a-zA-Z][a-zA-Z0-9\_\-]{3,19}$/,
    hostName : /^[a-zA-Z][a-zA-Z0-9\_\-]{0,19}$/,
	passWord : /^[^\s]{6,20}$/,
	email : /^[a-zA-Z0-9]([a-zA-Z0-9\.]*[-_]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(([\.][a-zA-Z0-9]{2,8}){1,5}){1}?$/,
	telephone : /^[1]\d{10}$/,
	description : /^[^\u4e00-\u9fa5]{1,255}$/,
	number : /^\d*$/,
	nonChineseDescription : /^[^\u4e00-\u9fa5]{1,255}$/,
	monitorServerName : /^[a-zA-Z](\s*[a-zA-Z0-9\-\_\/]){1,39}$/,
	monitorTemplateName : /^[a-zA-Z][a-zA-Z0-9\_\-]{3,19}$/,
	monitorTemplateCheckAttempts : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 1 && value <= 10;
	},
	monitorTemplateCheckInterval : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 1 && value <= 10080;
	},
	ovrtCpuOverCommitDurationMinutes : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 1 && value <= 9;
	},
	ovrtLowUtilization : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 10 && value <= 49;
	},
	ovrtHighUtilization : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 50 && value <= 99;
	},
	ip : /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/,
	subnet : /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/,
	netmask : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
	port : /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
	smtp : /^([a-zA-Z0-9])+(\.[a-zA-Z0-9])+/,
	netSegment : /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){2}\.0$/,
	multiCastIp : /^(22[5-9]|23[0-9])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/,
	monitorServiceAddCheckcommand : /^[0-9]*$/,
	vmAddHaCluster : /^[0-9]*$/,
	haDirs : /^\//,
	haDiverDirs : /^\/dev\//,
	haLockNum : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && parseInt(value, 10) >= 3 && parseInt(value, 10) <= 32;
	},
	haPort : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && parseInt(value, 10) >= 1025 && parseInt(value, 10) <= 65535;
	},
	haConfig : function(value) {
		return /^([0-9]*)|(-[0-9]*)$/.test(value) && value.indexOf(".") === -1 && parseInt(value, 10) >= -1000000 && parseInt(value, 10) <= 1000000;
	},
	vlan : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 0 && value <= 4094;
	},
	mtu : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 68 && value <= 9000;
	},
	storageDomainName : /^[a-zA-Z][a-zA-Z0-9\_\-]{3,19}$/,
	powerOptions : /^([a-zA-Z][a-zA-Z0-9]{0,9}\=[a-zA-Z0-9]{1,10})(\,[a-zA-Z][a-zA-Z0-9]{0,9}\=[a-zA-Z0-9]{1,10})*$/,
	vmMemory : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 256 && value <= 20480;
	},
	vmCpuNum : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && value >= 1 && value <= 160;
	},
	mac : /[A-F\d\a-f]{2}:[A-F\d\a-f]{2}:[A-F\d\a-f]{2}:[A-F\d\a-f]{2}:[A-F\d\a-f]{2}:[A-F\d\a-f]{2}$/,
	vmDiskSize : function(value) {
		return /^[0-9]*$/.test(value) && value.indexOf(".") === -1 && parseInt(value, 10) >= parseInt($("#virt_vm_add_disk_size").attr("name"),10) && parseInt(value, 10) <= 2147483647;
	},
	haGfsNum : function(value) {
		var re = /^[0-9]+$/;
		//判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
		return re.test(value) && parseInt(value,10) > 1 && parseInt(value,10) <= parseInt(sessionStorage.nfsNum,10);
	},
	vmCD : function(value){
		return value != -1;
	}
};

/**
 * 验证提示语
 */
common.validateMsg = {

	name : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为4~20。",
	vmName : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为4~15。",
	resourcename : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为2~20。",
	vnetname : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为1~15。",
	userName : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为4~20。",
    hostName : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为1~20。",
	passWord : "请勿输入空格，字符长度为6~20。",
	equalTo : "请保持两次输入内容一致。",
	email : "请输入有效的邮件地址。",
	telephone : "请输入有效的手机号码。",
	description : "请输入不长于255个非中文字符。",
	number : "请输入正整数。",
	nonChineseDescription : "请输入不长于255个非中文字符。",
	monitorServerName : "服务名称请以字母开头，中间不能包含特殊字符（“/”、“-”、“_”、“空格”除外），字符长度为2~40。",
	monitorTemplateName : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为4~20。",
	monitorTemplateCheckAttempts : "请输入1~10的正整数。",
	ovrtCpuOverCommitDurationMinutes : "请输入1~9的正整数。",
	ovrtHighUtilization : "请输入50~99的正整数。",
	ovrtLowUtilization : "请输入10~49的正整数。",
	monitorTemplateCheckInterval : "请输入1~10080的正整数。",
	monitorTemplateRetryInterval : "请输入1~10080的正整数。",
	monitorTemplateNotifiInterval : "请输入1~10080的正整数。",
	haDirs : "请输入/开头的字符串。",
	haDiverDirs : "请输入/dev/开头的字符串。",
	haLockNum : "请输入3~32的正整数",
	haPort : "请输入1025~65535之间的UDP端口。",
	haConfig : "请输入-1000000~1000000之间整数。",
	ip : "请输入有效的IP地址。",
	subnet : "请输入有效的子网入口地址。",
	netmask : "请输入有效的掩码地址。",
	port : "请输入0~65535的整数。",
	smtp : "请输入合法的SMTP服务器名称。",
	netSegment : "合法IP地址，且必须以0结尾。",
	multiCastIp : "D类多播地址，范围为225.0.0.0~239.255.255.255",
	monitorServiceAddCheckcommand : "请选择检查命令。",
	vmAddHaCluster : "请选择高可用集群",
	vlan : "请输入0~4094的整数。",
	mtu : "请输入68~9000的整数。",
	storageDomainName : "请勿输入除英文字母、数字、-、_之外的字符，且必须以英文字母开头，字符长度为4~20。",
	exportPath : "请输入正确的导出路径。",
	storageDomainHostName : "请选择该存储域使用的主机。",
	powerOptions : "请输入以逗号隔开的‘key=value’列表，其中key和value为英文字母或数字，且必须以英文字母开头",
	datacenterName : "请选择数据中心",
	vmMemory : "请输入256~20480的正整数。",
	vmCpuNum : "请输入1~160的正整数。",
	storagefctarget : "请选择LUN ID。",
	mac : "请输入有效的MAC地址。",
	vmDiskSize : function(){
		return "请输入"+ $("#virt_vm_add_disk_size").attr("name") +"~2147483647的正整数。";
	},
	haGfsNum : function() {
		return "请输入2~" + sessionStorage.nfsNum + "的正整数。";
	},
	vmCD : "请选择CD",
	haClusterTemplateList: "请选择监控模板"

};

$(function() {
	//设置全局ajax配置选项

	$.ajaxSetup({
		contentType : "application/json;charset=utf-8",
		cache : false,
		//		timeout : 5000, //前端设定ajax超时时间为5秒，根据情况时间还要调整
		error : function(XMLHttpReauest, textStatus, errorThrown) {//
			common.funcs.unMask();
			switch(XMLHttpReauest.status) {
//				case 0:
//					Lazy_Message("服务器异常，请联系管理员。");
//					common.funcs.destoryCommonSettings();
////					window.location.href = window.location.protocol + "//" + window.location.host + "/login";
//					location.reload();
//					break;
				case 401:
					//无权限，此处后期要将菜单栏图标屏蔽
					Lazy_Message("您无权访问此页面。");
					top.location.href = window.location.protocol + "//" + window.location.host + "/index.html?time=" + new Date().getTime() +"#/home";
					break;
				case 410:
					//sessioin过期
					common.funcs.destoryCommonSettings();
					
					window.location.href = window.location.protocol + "//" + window.location.host + "/login";
					break;
				case 500:
					//服务器错误
					Lazy_Message("服务器错误。");
					break;
			}
		}
	});

});
