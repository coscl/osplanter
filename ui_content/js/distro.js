var distroVar = {
    distroView: null,
    distroAddView: null,
    distroRenameView: null
};

var distroAPI = {
    getDistros: function (func) {
        $.ajax({
            url: "/distro/list",
            type: "get",
            success: function (resp) {
                alert(resp);
                resp.action ? func(resp.data) : Lazy_Message(resp.error);
            }
        });
    },
    get_import_source: function (func) {
        $.ajax({
            url: "/distro/get_import_source",
            type: "get",
            success: function (resp) {
                func(resp);
            }
        });
    },
    create: function (param, func) {
        $.ajax({
            url: "/distro/create_distro",
            type: "post",
            data: param,
            success: function (resp) {
                func(resp);
            }
        });
    },
    delete : function(param,func){
        $.ajax({
            url: "/distro/distro_delete/" + param,
            type: "delete",
            success: function (resp) {
                func(resp);
            }
        });
    },
    rename :function(param,func){
        $.ajax({
            url: "/distro/distro_rename",
            type: "post",
            data: param,
            success: function (resp) {
                func(resp);
            }
        });
    },
    getDistros_url: window.location.protocol + "//" + window.location.host + "/distro/list"
}


distroVar.distroView = {
    init: function () {
        this.showDistros();
    },

    showDistros: function () {
        this.distros = new Lazy_Table({
            isFrontPagination: true,
            baseEl: "#distros",
            url: distroAPI.getDistros_url,
            param: {},
            parse: function (resp) {
                return {
                    list: resp
                };
            },
            showCheckbox: true,
            clickable: true,
            onItemClick: function (model) {
                sessionStorage.distroId = model.id;
            },
            toolbar: [
                {
                    id: "btn_distro_create",
                    text: "添加",
                    disabled: false,
                    //iconCls: "icon-add",
                    handler: _(function () {
                        this.initCreateView();
                    }).bind(this)
                },
                {
                    id: "btn_distro_del",
                    text: "删除",
                    disabled: false,
                    //iconCls: "icon-add",
                    handler: _(function () {
                        this.deleteDistro();
                    }).bind(this)
                },
                {
                    id: "btn_distro_rename",
                    text: "重命名",
                    disabled: false,
                    //iconCls: "icon-add",
                    handler: _(function () {
                        this.initRenameDialog();
                    }).bind(this)
                }
            ],
            columns: [
                {
                    title: "name",
                    content: "name"
                },
                {
                    title: "arch",
                    content: "arch"
                },
                {
                    title: "breed",
                    content: "breed"
                },
                {
                    title: "os_version",
                    content: "os_version"
                }
            ],
            pager: {
                pageNo: 1,
                pageSize: 15,
                pageList: [15, 30, 45]
            },
            onCheckboxClick : _(function(models){
                if(models.length === 1){
                    this.distros.showbuttons("btn_distro_del,btn_distro_rename");
                }else{
                   this.distros.showbuttons("btn_distro_create");
                }
            }).bind(this)

        });

        this.distros.showbuttons("btn_distro_create");
    },
    initCreateView: function () {
        distroAPI.get_import_source(function (resp) {
            distroVar.distroAddView.init(resp);
        })
    },
    deleteDistro: function(){
        var deleteObj = [];
        var deleteModles = this.distros.getSelectedModels();

        $.each(deleteModles,function(index,item){
           deleteObj.push(item.name);
        });

        Lazy_Confirm("您确定要删除该发行版本吗？",_(function(r){
            if(r){
                common.funcs.mask();
                distroAPI.delete(deleteObj[0].toString(),this.deleteRespone);
            }
        }).bind(this))


    },
    deleteRespone : function(resp){

        if (resp.result) {
            Lazy_Message("发行版本删除成功。");
            distroVar.distroView.distros.updateTable();
        } else {
            Lazy_Message(resp.error);
        }
        common.funcs.unMask();
    },
    initRenameDialog : function(){
        var selectName = this.distros.getSelectedModels()[0].name;
        distroVar.distroRenameView.init(selectName);
    }
};

distroVar.distroAddView = {
    el: "#distro_add_dialog",

    init: function (resp) {
        this.data = resp;
        //初始化数据对象
        this.addModel = {};

        //创建组件
        this.createComps();

        //添加对话框渲染
        this.render();

        //事件绑定
        this.bindEvents();

    },
    createComps: function () {

        //创建对话框，并避免重复创建
        if ($(this.el).parent().parent().attr("class") !== "cs2c_dialog") {

            this.dialog = new Lazy_Dialog({
                baseEl: this.el,
                title_icon: "icon_add",
                title: "添加发行版本",
                width: 550,
                height: 300,
                closable: true
            }).render();
        }

        //创建数据验证格式
        this.valids = {};

        this.valids.distroName = new Lazy_ValidateBox({
            "baseEl": "#distro_name",
            "tipmsg": common.validateMsg.userName,
            "reqmsg": "必填项",
            "reg_exp": common.validateReg.userName
        });
        this.valids.path1 = new Lazy_ValidateBox({
            "baseEl": "#distro_path_1",
            "reqmsg": "必填项"
        });

    },
    render: function () {

        //显示添加对话框
        $(this.el).show();

        //打开对话框
        this.dialog.openDialog();

        //初始化对话框显示内容
        this.initDialog();

        //指定“确定”按钮处理事件
        this.dialog.okPressed = _(function () {

            this.addSubmit();

        }).bind(this);

    },
    bindEvents: function () {
        $(this.el).find("input[name=path_radio]").click(function () {
            if (this.value === "file") {
                $("#distro_div_path_1").show();
                $("#distro_div_path_2").hide();
                $("#distro_div_path_3").hide();
            } else if (this.value === "cd") {
                $("#distro_div_path_1").hide();
                $("#distro_div_path_2").show();
                $("#distro_div_path_3").hide();
            } else {
                $("#distro_div_path_1").hide();
                $("#distro_div_path_2").hide();
                $("#distro_div_path_3").show();
            }
        });
    },
    initDialog: function () {
        $("#distro_name").val("");
        $("#distro_arch").find("option[value=i386]").attr("selected", "selected");
        $("#distro_breed").find("option[value=redhat]").attr("selected", "selected");
        $(this.el).find("input[name=path_radio]").eq(0).attr("checked", "checked")
        $("#distro_div_path_1").show();
        $("#distro_div_path_2").hide();
        $("#distro_div_path_3").hide();
        if (this.data.result && this.data.cdList.length > 0) {
            $(this.el).find("input[name=path_radio]").eq(1).removeAttr("disabled")
            $("#distro_path_2").empty();
            $.each(this.data.cdList, _(function (index, item) {
                $("#distro_path_2").append("<option value=\"" + item.name + "\">" + item.value + "</option>")
            }).bind(this));
        } else {
            $(this.el).find("input[name=path_radio]").eq(1).attr("disabled")
        }
        if (this.data.result && this.data.isoList.length > 0) {
            $(this.el).find("input[name=path_radio]").eq(2).removeAttr("disabled")
            $("#distro_path_3").empty();
            $.each(this.data.isoList, _(function (index, item) {
                $("#distro_path_3").append("<option value=\"" + item + "\">" + item + "</option>")
            }).bind(this));
        } else {
            $(this.el).find("input[name=path_radio]").eq(2).attr("disabled")
        }
    },
    addSubmit: function () {

        var validate = this.valids.distroName.inputValidate()
        var distroModel = {};
        distroModel.name = $("#distro_name").val();
        distroModel.arch = $("#distro_arch").find("option:selected").attr("value");
        distroModel.breed = $("#distro_breed").find("option:selected").attr("value");
        distroModel.type = $(this.el).find("input[name=path_radio]:checked").attr("value");
        switch (distroModel.type) {
            case "file" :
                distroModel.path = $("#distro_path_1").val();
                validate = validate && this.valids.path1.inputValidate();
                break;
            case "cd" :
                distroModel.path = $("#distro_path_2").find("option:selected").attr("value");
                break;
            case "iso" :
                distroModel.path = $("#distro_path_3").find("option:selected").attr("value");
                break;
        }

        if (!validate) {
            return false;
        }
        common.funcs.mask();
        distroAPI.create(distroModel, _(function (resp) {
            common.funcs.unMask();
            if (resp.result) {
                Lazy_Message("发行版本添加成功,请在事件中心查看进度。");
                this.dialog.closeDialog();
                distroVar.distroView.distros.updateTable();
            } else {
                Lazy_Message(resp.reason);
            }
            common.funcs.unMask();
        }).bind(this))
    }
}

distroVar.distroRenameView = {
    el: "#distro_rename_dialog",

    init: function (name) {
        this.distroName = name;
        //初始化数据对象
        this.renameModel = {};

        //创建组件
        this.createComps();

        //添加对话框渲染
        this.render();

    },
    createComps: function () {

        //创建对话框，并避免重复创建
        if ($(this.el).parent().parent().attr("class") !== "cs2c_dialog") {

            this.dialog = new Lazy_Dialog({
                baseEl: this.el,
                title_icon: "icon_edit",
                title: "重命名发行版本",
                width: 550,
                height: 150,
                closable: true
            }).render();
        }

        //创建数据验证格式
        this.valids = common.funcs.createValidates("#distro_rename_dialog");

    },
    render: function () {

        //显示添加对话框
        $(this.el).show();

        //初始化对话框显示内容
         $("#distro_rename").val(this.distroName);

        //打开对话框
        this.dialog.openDialog();

        //指定“确定”按钮处理事件
        this.dialog.okPressed = _(function () {

            this.submit();

        }).bind(this);

    },
    submit: function () {

        var validate = common.funcs.blockValidate(this.valids);
        var renameModel = {};
        renameModel.dis_name = this.distroName;
        renameModel.dis_newname = $("#distro_rename").val();

        if (!validate) {
            return false;
        }
        common.funcs.mask();
        distroAPI.rename(JSON.stringify(renameModel), _(function (resp) {
            common.funcs.unMask();
            if (resp.result) {
                Lazy_Message("发行版本重命名成功。")
                this.dialog.closeDialog();
                distroVar.distroView.distros.updateTable();
            } else {
                Lazy_Message(resp.reason);
            }
            common.funcs.unMask();
        }).bind(this))
    }
}

$(function ($) {
    distroVar.distroView.init();
});