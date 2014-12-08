var systemVar = {
	systemView : null,
    systemAddView : null,
    kseditView : null
};

var systemAPI = {
	getSystems : function(func) {
		$.ajax({
//			url : window.location.protocol + "//" + window.location.host + "/system/list",
            url : "/system/list",
			type : "get",
			success : function(resp) {
                alert(resp);
				resp.action ? func(resp.data) : Lazy_Message(resp.error);
			}
		});
	},
    getSystems_url : window.location.protocol + "//" + window.location.host + "/system/list",
    discoverhosts_url : window.location.protocol + "//" + window.location.host + "/system/discoverhosts",
    get_distros: function (func) {
        $.ajax({
            url: "/distro/list",
            type: "get",
            success: function (resp) {
                func(resp);
            }
        });
    },
    add_system : function(param, func) {
		$.ajax({
            url : "/system/system_add",
			type : "post",
            data : param,
			success : function(resp) {
//				resp.result ? func(resp.result) : Lazy_Message(resp.error);
                func(resp);
			}
		});
	},
    delete_system : function(param,func){
        $.ajax({
            url : "/system/system_delete",
			type : "post",
            data : param,
			success : function(resp) {
                func(resp);
			}
		});
    },
        delete_discoverhosts : function(param,func){
        $.ajax({
            url : this.discoverhosts_url,
			type : "post",
            data : param,
			success : function(resp) {
                func(resp);
			}
		});
    },
    edit_system : function(param,func){
        $.ajax({
            url : "/system/system_edit",
			type : "post",
            data : param,
			success : function(resp) {
                func(resp);
			}
		});
    },
    getSystem_ksfile_url : window.location.protocol + "//" + window.location.host + "/system/system_ksfile/"
}


systemVar.systemView = {
    init : function() {
        this.showDiscoverHosts();
        this.showSystems();
    },

    showSystems : function() {
    this.systems = new Lazy_Table({
			isFrontPagination : true,
            datagrid_height : 200,
			baseEl : "#systems",
			url : systemAPI.getSystems_url,
            isMultiSelect : true,
			param : {},
			parse : function(resp) {
				return {
					list : resp
				};
			},
            showCheckbox : true,
			clickable: true,
			onItemClick : function(model) {
				sessionStorage.systemId = model.id;
			},
        toolbar : [{
				id : "btn_system_create",
				text : "添加",
				disabled : false,
				iconCls : "icon-add",
				handler : _(function() {
					this.initCreateView('system');
				}).bind(this)
			},{
				id : "btn_system_delete",
				text : "删除",
				disabled : false,
				iconCls : "icon-add",
				handler : _(function() {
					this.delete_system();
				}).bind(this)
			},{
				id : "btn_system_edit",
				text : "编辑",
				disabled : false,
				iconCls : "icon-add",
				handler : _(function() {
					this.initCreateView(this.systems.getSelectedModels()[0]);
				}).bind(this)
			},
            {
				id : "btn_ksfile_edit",
				text : "编辑模板",
				disabled : false,
				iconCls : "icon-add",
				handler : _(function() {
					this.initksfileView(this.systems.getSelectedModels()[0]);
				}).bind(this)
			},
        {
				id : "btn_vnc",
				text : "远程连接",
				disabled : false,
				iconCls : "icon-add",
				handler : _(function() {
					this.initvncView(document.location.hostname,this.systems.getSelectedModels()[0]['interfaces']['eth0']['ip_address']);
				}).bind(this)
			}],
        columns : [
            {
				sortable : true,
				width : 18,
				title : "主机名",
				content : "hostname",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			},
        {
				sortable : true,
				width : 18,
				title : "发行版本",
				content : "profile",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			},
        {
				sortable : true,
				width : 18,
				title : "状态",
				content : "status",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			},
        {
				sortable : true,
				width : 18,
				title : "mac地址",
				content : "name",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			},{
				sortable : true,
				width : 18,
				title : "ip地址",
				content : "interfaces",
				formatter : function(value, rowData, rowIndex) {
					return value['eth0']['ip_address'];
				}
			}],
        pager : {
				pageNo : 1,
				pageSize : 15,
				pageList : [15, 30, 45]
			},
        onCheckboxClick : _(function(models){
                if(models.length === 1){
                    this.systems.showbuttons("btn_system_delete,btn_system_edit,btn_ksfile_edit,btn_vnc");//,btn_system_edit
                }else if(models.length >1){
                    this.systems.showbuttons("btn_system_delete");
                }else{
                   this.systems.showbuttons("btn_system_create");
                }
            }).bind(this)

    });
        this.systems.showbuttons("btn_system_create");
    },
    showDiscoverHosts : function() {
    this.discoverhosts = new Lazy_Table({
			isFrontPagination : true,
            datagrid_height : 200,
			baseEl : "#discover_hosts",
			url : systemAPI.discoverhosts_url,
			param : {},
			parse : function(resp) {
				return {
					list : resp
				};
			},
            showCheckbox : true,
			clickable: true,
            isMultiSelect : true,
			onItemClick : function(model) {
				sessionStorage.discovermac = model.mac;
			},
        toolbar : [{
				id : "btn_discoverhost_add",
				text : "添加",
				disabled : false,
				iconCls : "icon-add",
				handler : _(function() {
					this.initCreateView('discover');
				}).bind(this)
			},{
				id : "btn_discoverhost_delete",
				text : "删除",
				disabled : false,
				iconCls : "icon-add",
				handler : _(function() {
					this.delete_discoverhosts();
				}).bind(this)
			}],
        columns : [{
				sortable : true,
				width : 18,
				title : "mac地址",
				content : "mac",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			},
        {
				sortable : true,
				width : 18,
				title : "ip地址",
				content : "ip",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			},
        {
				sortable : true,
				width : 18,
				title : "状态",
				content : "status",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			},
        {
				sortable : true,
				width : 18,
				title : "描述",
				content : "description",
				formatter : function(value, rowData, rowIndex) {
					return value;
				}
			}],
        pager : {
				pageNo : 1,
				pageSize : 15,
				pageList : [15, 30, 45]
			},

            onCheckboxClick : _(function(models){
                if(models.length >= 1){
                    this.discoverhosts.showbuttons("btn_discoverhost_delete,btn_discoverhost_add");//,btn_system_edit
                }else{
                   this.discoverhosts.showbuttons("");
                }
            }).bind(this)
    });
        this.discoverhosts.showbuttons("");
    },
    delete_system : function(){
        var deleteObj = [];
        var deleteModles = this.systems.getSelectedModels();

          $.each(deleteModles,function(index,item){
               deleteObj.push(item.name);
            });
            Lazy_Confirm("您确定要删除该主机吗？",_(function(r){
                if(r){
                    common.funcs.mask();
                    systemAPI.delete_system(JSON.stringify(deleteObj),this.deleteRespone);
                }
            }).bind(this));

    },
    delete_discoverhosts : function(){
        var deleteObj = [];
        var deleteModles = this.discoverhosts.getSelectedModels();

          $.each(deleteModles,function(index,item){
               deleteObj.push(item.mac);
            });
            Lazy_Confirm("您确定要删除吗？",_(function(r){
                if(r){
                    common.funcs.mask();
                    systemAPI.delete_discoverhosts(JSON.stringify(deleteObj),this.deletediscoverRespone);
                }
            }).bind(this));

    },
     deleteRespone : function(resp){

        if (resp.result) {
            Lazy_Message("主机删除成功。");
           systemVar.systemView.systems.updateTable();
        } else {
            Lazy_Message(resp.error);
        }
        common.funcs.unMask();
    },
    deletediscoverRespone : function(resp){

        if (resp.result) {
            Lazy_Message("删除成功。");
           systemVar.systemView.discoverhosts.updateTable();
        } else {
            Lazy_Message(resp.error);
        }
        common.funcs.unMask();
    },

    initCreateView : function(from){

            systemVar.systemAddView.init(from);

    },
     initksfileView : function(){

            systemVar.kseditView.init();

    },
    initvncView : function(requestAddr,ip){

            window.open("http://"+requestAddr+":6080/vnc_auto.html?path=websockify/?token=" + ip);
           // http://10.1.81.224:6080/vnc_auto.html?path=websockify/?token=ip
    }

}
systemVar.kseditView = {
    el : "#system_ksfile_dialog",
    init : function() {

		//初始化数据对象
		this.addModels = [];

		//创建组件
		this.createComps();

		//添加对话框渲染
		this.render();

		//事件绑定
		this.bindEvents();

	},
     createComps : function() {

		//创建对话框，并避免重复创建
		if ($(this.el).parent().parent().attr("class") !== "cs2c_dialog") {

			this.dialog = new Lazy_Dialog({
				baseEl : this.el,
				title_icon:"icon_add",
				title : "编辑模板",
				width : 825,
				height : 480,
				closable : true
			}).render();

		}
     },
        	render : function() {

		//显示添加对话框
		$(this.el).show();

		//打开对话框
		this.dialog.openDialog();

		//初始化对话框显示内容
		this.initDialog();

		//指定“确定”按钮处理事件

            this.dialog.okPressed = _(function() {
                this.editSubmit();
            }).bind(this);
        },


    	bindEvents : function() {

	},
     initDialog : function() {
         system = systemVar.systemView.systems.getSelectedModels();
         $.ajax({
            url: systemAPI.getSystem_ksfile_url + system[0].name,
            type: "get",
            success: function (resp) {
                $("#ks_data").val(resp);
            }
        });
     },
        editSubmit : function() {
            that = this;
            $.ajax({
            url: systemAPI.getSystem_ksfile_url + system[0].name,
            type: "post",
            data :  JSON.stringify($("#ks_data").val()),

            success: function (resp) {
                common.funcs.mask();
                if (resp.result) {
                    Lazy_Message("修改成功。")
                    that.dialog.closeDialog();
                } else {
                    Lazy_Message(resp.error);
                }
                common.funcs.unMask();
            }
        });
        }
}
systemVar.systemAddView = {
    	el : "#system_add_dialog",

	init : function(from) {
        this.from = from;

		//初始化数据对象
		this.addModels = [];

		//创建组件
		this.createComps();

		//添加对话框渲染
		this.render();

		//事件绑定
		this.bindEvents();

	},
    createComps : function() {

		//创建对话框，并避免重复创建
		if ($(this.el).parent().parent().attr("class") !== "cs2c_dialog") {

			this.dialog = new Lazy_Dialog({
				baseEl : this.el,
				title_icon:"icon_add",
				title : "添加主机",
				width : 550,
				height : 300,
				closable : true
			}).render();

		}

        typeof this.from === "object" ? this.dialog.changeTitle("编辑主机") :this.dialog.changeTitle("添加主机");


		//创建数据验证格式
		this.valids = common.funcs.createValidates("#system_add_dialog");
    },
    	render : function() {

		//显示添加对话框
		$(this.el).show();

		//打开对话框
		this.dialog.openDialog();

		//初始化对话框显示内容
		this.initDialog();

		//指定“确定”按钮处理事件
        if(typeof this.from === "object"){
            this.dialog.okPressed = _(function() {

                this.editSubmit();

            }).bind(this);
        }else{
            this.dialog.okPressed = _(function() {

                this.addSubmit();

            }).bind(this);
        }


	},
    	bindEvents : function() {

	},
    initDialog : function() {
        $("#profile").html('');
        $("#ksfile").html('');
        $("#hostname").val("");
        $("#ip").val("");
        $("#mac").val("");
        if(typeof this.from === "object" || this.from == 'system'){
             $("#div_autoreboot").hide();
        }else{
            $("#div_autoreboot").show();
        }
        $("input[name='autoreboot'][value='1']").attr("checked","checked");
        $.ajaxSetup({
					async : false
				});
        that = this;
        $.ajax({
            url: "/distro/list",
            type: "get",
            success: function (resp) {
                for (index in resp){
                $("#profile").append("<option value=\"" + resp[index].name + "\">" + resp[index].name + "</option>")
                }
            }
        });

        $.ajax({
            url: "/ksfile/ksfile_list_json",
            type: "get",
            success: function (resp) {
                that.kslist = resp;
                 for (index in resp){
                    $("#ksfile").append("<option value=\"" + index + "\">" + resp[index] + "</option>")
                }
            }
        });

        $.ajax({
            url: "/setting/dhcp_json",
            type: "get",
            success: function (resp) {
                 that.dhcp = resp;
            }
        });
        discoverhosts = systemVar.systemView.discoverhosts.getSelectedModels();
        // 0 未选择自动发现的主机，1选择里一个自动发现的主机 其他：批量添加
        if(this.from == 'discover'){
            if(discoverhosts.length == 1){
                $("#hostname").val('localhost');
                $("#ip").val(discoverhosts[0].ip);
                $("#mac").val(discoverhosts[0].mac);
                $('#mac').attr("disabled",true);
                $("#div_ip").show();
                $("#div_mac").show();
            }else if(discoverhosts.length == 0){
                this.dialog.closeDialog();
                Lazy_Message('请选择需要添加的主机');
             }else {
                $("#div_ip").hide();
                $("#div_mac").hide();
            }
        }else if(this.from == 'system'){
            $('#mac').removeAttr("disabled");
            $("#div_ip").show();
            $("#div_mac").show();
        }else {

            $('#mac').removeAttr("disabled");
            $("#div_ip").show();
            $("#div_mac").show();

            $("#hostname").val(this.from.hostname);
            $("#ip").val(this.from.interfaces.eth0.ip_address);
            $("#mac").val(this.from.interfaces.eth0.mac_address);
            $("#profile").find("option[value="+this.from.profile+"]").attr("selected","selected");
            for(index in this.kslist){
                if(this.kslist[index] === this.from.kickstart){
                    var ksindex = index;
                }
            }
            $("#ksfile").find("option[value="+ksindex+"]").attr("selected","selected");
        }

        $.ajaxSetup({
					async : true
				});
    },
    addSubmit : function() {
        var validateFlag = common.funcs.blockValidate(this.valids);
        if(!validateFlag){
            return false;
        }
        discoverhosts = systemVar.systemView.discoverhosts.getSelectedModels();
        this.addModels = [];
        if(this.from == 'discover'){
            for (index in discoverhosts){
            addModel = {}
            addModel.hostname =  $("#hostname").val();
            addModel.name =  discoverhosts[index].mac;
            addModel.profile =  $("#profile").val();
            addModel.kickstart =  this.kslist[$("#ksfile").val()];
            addModel.netmask = that.dhcp.netmask;
            addModel.gateway = that.dhcp.gateway;
            addModel.dns = that.dhcp.dns;
            addModel.interface = [];
            interface_temp = {'ip':discoverhosts[index].ip,'mac':discoverhosts[index].mac};
            interface_temp.name = 'eth0';
            addModel.interface.push(interface_temp);
            addModel.autoreboot =  $("input[name='autoreboot']:checked").val();
            this.addModels.push(addModel);
            }
        }else{
            addModel = {}
            addModel.hostname =  $("#hostname").val();
            addModel.name =  $("#mac").val();
            addModel.profile =  $("#profile").val();
            addModel.kickstart =  this.kslist[$("#ksfile").val()];
            addModel.netmask = that.dhcp.netmask;
            addModel.gateway = that.dhcp.gateway;
            addModel.dns = that.dhcp.dns;
            addModel.autoreboot =  0;
            addModel.interface = [];
            interface_temp = {'ip':$("#ip").val(),'mac':$("#mac").val()};
            interface_temp.name = 'eth0';
            addModel.interface.push(interface_temp);
            this.addModels.push(addModel);
        }


        console.log(this.addModels);
        systemAPI.add_system(JSON.stringify(this.addModels),_(function (resp) {
            common.funcs.mask();
            if (resp.result) {
                Lazy_Message("添加成功。")
                this.dialog.closeDialog();
                systemVar.systemView.discoverhosts.updateTable();
                systemVar.systemView.systems.updateTable();
            } else {
                Lazy_Message(resp.error);
            }
            common.funcs.unMask();
        }).bind(this)
        );
    },
    editSubmit:function(){

        var validateFlag = common.funcs.blockValidate(this.valids);
        if(!validateFlag){
            return false;
        }

        var editModel = {};

        editModel.hostname =  $("#hostname").val();
        editModel.name =  $("#mac").val();
        editModel.profile =  $("#profile").val();
        editModel.kickstart =  this.kslist[$("#ksfile").val()];
        editModel.netmask = that.dhcp.netmask;
        editModel.gateway = that.dhcp.gateway;
        editModel.dns = that.dhcp.dns;
        editModel.interface = [];
        interface_temp = {'ip':$("#ip").val(),'mac':$("#mac").val()};
        interface_temp.name = 'eth0';
        editModel.interface.push(interface_temp);
        console.log("in edit");
        systemAPI.edit_system(JSON.stringify(editModel),_(function (resp) {
            common.funcs.mask();
            if (resp.result) {
                Lazy_Message("编辑成功。");
                this.dialog.closeDialog();
                systemVar.systemView.systems.updateTable();
            } else {
                Lazy_Message(resp.error);
            }
            common.funcs.unMask();
        }).bind(this));

    }
}

$(function($) {
	systemVar.systemView.init();
    setInterval( "systemVar.systemView.systems.updateTable()",30000);
    setInterval( "systemVar.systemView.discoverhosts.updateTable()",30000);
});