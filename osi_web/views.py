#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.template.loader import get_template
from django.template import RequestContext
from django.http import HttpResponse
from forms import ConfigForm, SystemForm

from django.http import HttpResponseRedirect
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_protect
from datetime import date, datetime
import xmlrpclib
import simplejson
import time,sys
import commands
import vnc_util
import cobbler.utils          as utils
import api.cd_action          as distro_source
import api.ksfile_action      as ksfile_source
import api.host_action        as cmd_source

from models import Host_info
reload(sys)
sys.setdefaultencoding('utf8')

ISO_DIR = "/usr/share/OSInstallTool/iso/"
HOST_KSFILE_DIR = "/usr/share/OSInstallTool/ksfile/"
VNC_TOKINS = "/usr/share/OSInstallTool/vnc_tokens"

def __default(obj):
	if isinstance(obj, datetime):
		return obj.strftime('%Y-%m-%dT%H:%M:%S')
	elif isinstance(obj, date):
		return obj.strftime('%Y-%m-%d')
	else:
		raise TypeError('%r is not JSON serializable' % obj)

def index(request):
    """
    This is the main greeting page for cobbler web.
    """
    t = get_template('index.html')
    html = t.render(RequestContext(request, {
        'version': '1.0',
    }))
    return HttpResponse(html)


import api.dhcp_template

remote = None
username = "cobbler"
password = "cobbler"
token = None
url_cobbler_api = utils.local_get_cobbler_api_url()
remote = xmlrpclib.Server(url_cobbler_api, allow_none=True)
try:
    token = remote.login(username, password)
except:
    token = None

def autologin(func):
    def _autologin(*args,**kwargs):
        global token
        if not remote.token_check(token):
            token = remote.login(username, password)
        return func(*args,**kwargs)
    return _autologin

@autologin
def dhcp(request):
    t = get_template('dhcp.html')
    if request.method == 'POST':
        form = ConfigForm(request.POST)
        if form.is_valid():
            value = form.cleaned_data
            value['subnet'] = '0.0.0.0'
            value['netmask'] = '0.0.0.0'
            value['subnet-mask'] = value['subnet_mask']
            if check_dhcp(value).get('result') == 'True':
                api.dhcp_template.dhcp_template(value).set_dhcp_template()
                return HttpResponse(get_template('success.html').render(RequestContext(request,{'message':'操作成功！'})))
            else:
                return HttpResponse(get_template('success.html').render(RequestContext(request,
                                {'message':'操作失败！'+check_dhcp(value).get('reason')})))
    else:
        dhcpsettings = api.dhcp_template.dhcp_template().get_dhcp_setting()
        dhcpsettings['subnet_mask'] = dhcpsettings['subnet-mask']
        form = ConfigForm(initial=dhcpsettings)
    html = t.render(RequestContext(request, {'config_form': form}))
    return HttpResponse(html)
@autologin
def dhcp_json(request):
    if request.method == 'GET':
        data = simplejson.dumps(api.dhcp_template.dhcp_template().get_dhcp_setting())
        return HttpResponse(data, mimetype="application/json")
@autologin
def check_dhcp(dhcp_config):
    return api.dhcp_template.dhcp_template(dhcp_config).check_dhcp_config()

@autologin
def set_dhcp(dhcp_config):
    return api.dhcp_template.dhcp_template(dhcp_config).set_dhcp_template()

@autologin
def get_distro_list(request):
    distro_list = remote.get_distros()
    data = simplejson.dumps(distro_list)
    return HttpResponse(data, mimetype="application/json")

@autologin
def get_import_source(request):
    cd_list = distro_source.get_cd_info(distro_source.get_dev())
    cd_array_list = []
    for key in cd_list:
        cd_array_list.append({"name": key, "value": cd_list[key]})
    iso_list = distro_source.get_iso_info(ISO_DIR)
    data = simplejson.dumps({"result": True, "cdList": cd_array_list, "isoList": iso_list})
    return HttpResponse(data, mimetype="application/json")

@autologin
def create_distro(request):
    data = {}
    result = {}
    for key in request.POST:
        data[key] = request.POST.get(key)
    print data
    if data["type"] == "cd":
        result = distro_source.mount(data["type"], data["path"])
    elif data["type"] == "iso":
        result = distro_source.mount(data["type"], ISO_DIR + data["path"])
    print result
    if data["type"] != "file":
        if result["result"]:
            data["path"] = result["path"]
        else:
            return HttpResponse(simplejson.dumps(result), mimetype="application/json")
    del data["type"]
    print data
    remote.background_import(data, token)
    return HttpResponse(simplejson.dumps({"result": True}), mimetype="application/json")

@autologin
def distro_rename(request):
    options = simplejson.loads(request.body)
    dis_name = options['dis_name']
    dis_newname = options['dis_newname']
    result = False
    if dis_name == None:
        result = False
    if not remote.has_item("distro", dis_name):
        result = False
    else:
        dis_id = remote.get_item_handle("distro", dis_name, token)
        remote.rename_item("distro", dis_id, dis_newname, token)
        result = True
    return HttpResponse(simplejson.dumps({"result": result}), mimetype="application/json")
@autologin
def distro_delete(request, dis_name=None):
    print dis_name
    result = False
    if dis_name == None:
        result = False
    if not remote.has_item("distro", dis_name):
        result = False
        return HttpResponse(simplejson.dumps({"result": result,'error':'not find this distro'}), mimetype="application/json")
    else:
        remote.remove_item("distro", dis_name, token)
        result = True
    return HttpResponse(simplejson.dumps({"result": result}), mimetype="application/json")
@autologin
def system_list(request):
    system_list = remote.get_systems()
    # SystemFormSet = formset_factory(SystemForm)
    # formset = SystemFormSet(initial=system_list)
    # return render_to_response('system.html', {'formset': formset})
    host_status = remote.get_status("normal",token)
    
    for ls in system_list:
	ip = ls['interfaces']['eth0']['ip_address']
	if ip in host_status.keys():
	    status = host_status['%s'%ip]
	    if status[5] == "unknown/stalled":
		ls['status'] = "init"
	    else:
		ls['status'] = status[5]
    data = simplejson.dumps(system_list)
    return HttpResponse(data, mimetype="application/json")
@autologin
def discoverhosts(request):
    if request.method == "GET":
        # data = serializers.serialize("json", Host_info.objects.all())
        # data = Host_info.objects.all().values()
        # print data
        # data = simplejson.dumps(data)
        queryset =  Host_info.objects.all()
        data = []
        for row in queryset:
            data.append({'mac':row.mac,'ip':row.ip,'status':row.status,'description':row.description})
        json_data = simplejson.dumps(data,default=__default)
        return HttpResponse(json_data, mimetype="application/json")
    #delete discover hosts
    elif request.method == "POST":
        options = simplejson.loads(request.body)
        print options
        for host in options:
            Host_info.objects.filter(pk=host).delete()
        return HttpResponse(simplejson.dumps({'result':True}), mimetype="application/json")
@autologin
def host_reboot(ip):
    """
    reboot the host from command
    """
    cmd_source.reboot(ip)
@autologin
def system_batch_add(request):
    '''
    options = {
    "name" : "",
    "hostname" : "",
    "profile" : distro,
    "kickstart" : path,
    "netmask":"","gateway":"" ,"dns":"",
    "interface":[
    {"name":"eth0","mac":"","ip":""},
    {"name":"eth1","mac":"","ip":""}
    ]
    }
    '''
    options_list = simplejson.loads(request.body)
    message_list = []
    for options in options_list:
        try:
            sid = remote.new_system(token)
            remote.modify_system(sid, 'name', options['name'], token)
            remote.modify_system(sid, 'hostname', options['hostname'], token)
            remote.modify_system(sid, 'profile', options['profile'], token)
            remote.modify_system(sid, 'netboot_enabled', True, token)
            remote.modify_system(sid, 'name_servers', options['dns'], token)
            for i in options['interface']:
                remote.modify_system(sid, 'modify_interface', {
                    "macaddress-%s" % i['name']: i['mac'],
                    "ipaddress-%s" % i['name']: i['ip'],
                    "staticroutes-%s" % i['name']: options['gateway'],
                    "static-%s" % i['name']: True,
                    "netmask-%s" % i['name']: options['netmask']
                }, token)
            new_file = HOST_KSFILE_DIR+options['name']
            ksfile_source.copy(options['kickstart'] ,new_file)
            remote.modify_system(sid, 'kickstart', new_file, token)
            remote.save_system(sid, token)
            if(options['autoreboot'] == '1'):
		data = {}
		data['ip'] = options['interface'][0]['ip']
		data['passwd'] = "neokylin123"
		remote.background_reboot(data, token)
	    init_staus("system",options['name'],options['interface'][0]['ip'])
            Host_info.objects.filter(pk=options['name']).delete()
            vnc_util.add(VNC_TOKINS,options['interface'][0]['ip'])
        except Exception, e:
            message = str(e)
            message = message.replace("<Fault 1: \"<class 'cobbler.cexceptions.CX'>:'", "")
            message = message.replace("'\">", "")
            err = {}
            err['%s' %options['name']] = message
            message_list.append(err)
            continue
    remote.background_sync({"verbose":"True"},token)
    if not message_list:
        return HttpResponse(simplejson.dumps({'result':True,'data':''}), mimetype="application/json")
    else:
        return HttpResponse(simplejson.dumps({'result':False,'error':simplejson.dumps(message_list)}), mimetype="application/json")
@autologin
def init_staus(objtype,name,ip):
    commands.getoutput("sed -i \"/%s/d\" /var/log/cobbler/install.log" %ip)
    fd = open("/var/log/cobbler/install.log","a+")
    fd.write("%s\t%s\t%s\tinit\t%s\n" % (objtype,name,ip,time.time()))
    fd.close()
	
    return 0    
@autologin
def system_edit(request):
    options = simplejson.loads(request.body)
    result = True
    error = ''
    try:
        sid = remote.get_system_handle(options['name'], token)
        sval = remote.get_system(options['name'], token)

        remote.modify_system(sid, 'name', options['name'], token)
        remote.modify_system(sid, 'hostname', options['hostname'], token)
        remote.modify_system(sid, 'profile', options['profile'], token)
        remote.modify_system(sid, 'netboot_enabled', True, token)
        remote.modify_system(sid, 'name_servers', options['dns'], token)
        for i in options['interface']:
            remote.modify_system(sid, 'modify_interface', {
                "macaddress-%s" % i['name']: i['mac'],
                "ipaddress-%s" % i['name']: i['ip'],
                "staticroutes-%s" % i['name']: options['gateway'],
                "static-%s" % i['name']: True,
                "netmask-%s" % i['name']: options['netmask']
            }, token)
        new_file = HOST_KSFILE_DIR+options['name']
        if options['kickstart']:
            ksfile_source.delete(new_file)
            ksfile_source.copy(options['kickstart'] ,new_file)
            remote.modify_system(sid, 'kickstart', new_file, token)
        remote.save_system(sid, token)
        vnc_util.delete(VNC_TOKINS,sval['interfaces']['eth0']['ip_address'])
        vnc_util.add(VNC_TOKINS,options['interface'][0]['ip'])
	init_staus("system",options['name'],options['interface'][0]['ip'])
    except Exception, e:
        result = False
        message = str(e)
        message = message.replace("<Fault 1: \"<class 'cobbler.cexceptions.CX'>:'", "")
        message = message.replace("'\">", "")
        print message
        error += message
    remote.background_sync({"verbose":"True"},token)
    if result:
        return HttpResponse(simplejson.dumps({'result':result,'data':''}), mimetype="application/json")
    else:
        return HttpResponse(simplejson.dumps({'result':result,'error':error}), mimetype="application/json")

@autologin
def system_delete(request):
    options = simplejson.loads(request.body)
    print options
    result = True
    error = ''
    for sys_name in options:
        if not remote.has_item("system", sys_name):
            result = False
            error += 'not find %s ', sys_name
        else:
            old = remote.get_system(sys_name,token)
            vnc_util.delete(VNC_TOKINS,old['interfaces']['eth0']['ip_address'])
            remote.remove_item("system", sys_name, token)
            new_file = HOST_KSFILE_DIR+sys_name
            ksfile_source.delete(new_file)

    remote.background_sync({"verbose":"True"},token)
    if result:
        return HttpResponse(simplejson.dumps({'result':result,'data':''}), mimetype="application/json")
    else:
        return HttpResponse(simplejson.dumps({'result':result,'error':error}), mimetype="application/json")


# ======================================================================
@autologin
def error_page(request, message):
    """
    This page is used to explain error messages to the user.
    """
    # FIXME: test and make sure we use this rather than throwing lots of tracebacks for
    # field errors
    t = get_template('error_page.html')
    message = message.replace("<Fault 1: \"<class 'cobbler.cexceptions.CX'>:'", "Remote exception: ")
    message = message.replace("'\">", "")
    html = t.render(RequestContext(request, {
        'version': remote.extended_version(token)['version'],
        'message': message,
        'username': username
    }))
    return HttpResponse(html)


# ======================================================================
@autologin
def ksfile_list(request, page=None):
    """
    List all kickstart templates and link to their edit pages.
    """
    ksfiles = remote.get_kickstart_templates(token)

    ksfile_list = []
    base_dir = "/var/lib/cobbler/kickstarts/"
#    ksfiles = ksfile_source.list(base_dir)
    for ksfile in ksfiles:
        if ksfile.startswith(base_dir):
	    ksfile_list.append((ksfile, ksfile.replace(base_dir, ''), 'editable'))
#        else:
#            return error_page(request, "Invalid kickstart template at %s, outside %s" % (ksfile, base_dir))
            #ksfile_list.append((ksfile, ksfile.replace(base_dir, ''), 'editable'))

    t = get_template('ksfile_list.html')
    html = t.render(RequestContext(request, {
        'ksfiles': ksfile_list,
        'version': remote.extended_version(token)['version'],
        'username': username,
        'item_count': len(ksfile_list[0]),
    }))
    return HttpResponse(html)
@autologin
def ksfile_list_json(request, page=None):
    ksfiles = remote.get_kickstart_templates(token)
    return HttpResponse(simplejson.dumps(ksfiles,default=__default), mimetype="application/json")
# ======================================================================
@autologin
@csrf_protect
def ksfile_edit(request, ksfile_name=None, editmode='edit'):
    """
    This is the page where a kickstart file is edited.
    """

    if editmode == 'edit':
        editable = False
    else:
        editable = True
    deleteable = False
    ksdata = ""
    if not ksfile_name is None:
        editable = remote.check_access_no_fail(token, "modify_kickstart", ksfile_name)
        deleteable = not remote.is_kickstart_in_use(ksfile_name, token)
        ksdata = remote.read_or_write_kickstart_template(ksfile_name, True, "", token)

    t = get_template('ksfile_edit.html')
    html = t.render(RequestContext(request, {
        'ksfile_name': ksfile_name,
        'deleteable': deleteable,
        'ksdata': ksdata,
        'editable': editable,
        'editmode': editmode,
        'version': remote.extended_version(token)['version'],
        'username': username
    }))
    return HttpResponse(html)
@autologin
def system_ksfile(request,name=None):
    if request.method == 'GET':
        # ksdata = remote.read_or_write_kickstart_template(HOST_KSFILE_DIR+name, True, "", token)
        f = open(HOST_KSFILE_DIR+name,'r')
        ksdata = f.read()
        f.close()
        return HttpResponse(simplejson.dumps(ksdata,default=__default), mimetype="application/json")
    elif request.method == 'POST':
        options = simplejson.loads(request.body)
        print options
        f = open(HOST_KSFILE_DIR+name,'w')
        f.write(options)
        f.close()
        return HttpResponse(simplejson.dumps({'result':True,'data':''},default=__default), mimetype="application/json")

# ======================================================================
@autologin
@require_POST
@csrf_protect
def ksfile_save(request):
    """
    This page processes and saves edits to a kickstart file.
    """
    # FIXME: error checking

    editmode = request.POST.get('editmode', 'edit')
    ksfile_name = request.POST.get('ksfile_name', None)
    ksdata = request.POST.get('ksdata', "").replace('\r\n', '\n')

    if ksfile_name == None or ksfile_name == '':
        return HttpResponse("NO KSFILE NAME SPECIFIED")
    if editmode != 'edit':
        ksfile_name = "/var/lib/cobbler/kickstarts/" + ksfile_name

    delete1 = request.POST.get('delete1', None)

    if delete1:
        remote.read_or_write_kickstart_template(ksfile_name, False, -1, token)
        return HttpResponseRedirect('/ksfile/list')
    else:
        remote.read_or_write_kickstart_template(ksfile_name, False, ksdata, token)
        return HttpResponseRedirect('/ksfile/list')

# ======================================================================
@autologin
def events(request):
   """
   This page presents a list of all the events and links to the event log viewer.
   """
   events = remote.get_events()

   events2 = []
   for id in events.keys():
      (ttime, name, state, read_by) = events[id]
      events2.append([id,time.asctime(time.localtime(ttime)),name,state])

   def sorter(a,b):
      return cmp(a[0],b[0])
   events2.sort(sorter)

   t = get_template('events.html')
   html = t.render(RequestContext(request,{
       'results'  : events2,
   }))
   return HttpResponse(html)

# ======================================================================
@autologin
def eventlog(request, event=0):
   """
   Shows the log for a given event.
   """
   event_info = remote.get_events()
   if not event_info.has_key(event):
      return HttpResponse("event not found")

   data       = event_info[event]
   eventname  = data[0]
   eventtime  = data[1]
   eventstate = data[2]
   eventlog   = remote.get_event_log(event)

   t = get_template('eventlog.html')
   vars = {
      'eventlog'   : eventlog,
      'eventname'  : eventname,
      'eventstate' : eventstate,
      'eventid'    : event,
      'eventtime'  : eventtime,
   }
   html = t.render(RequestContext(request,vars))
   return HttpResponse(html)

if __name__ == "__main__":
    print get_dhcp()
    config = {
        "subnet": "0.0.0.0",
        "netmask": "0.0.0.0",
        "start": "10.1.82.41",
        "end": "10.1.82.31",
        "gateway": "10.1.80.254",
        "subnet-mask": "255.255.252.0",
        "dns": "8.8.8.8"
    }
    print check_dhcp(config)
    print set_dhcp(config)
    print get_distro_list()[0]['name']
    #    distro_rename("test1","ttest1")
    print get_distro_list()[0]['name']
    options = {
        "name": "aaa",
        "hostname": "aaa",
        "profile": "redhat-x86_64",
        "kickstart": "/var/www/ks.cfg",
        "interface": [
            {"name": "eth0", "mac": "11:11:11:22:22:24", "ip": "10.1.82.211", "netmask": "255.255.252.0",
             "gateway": "10.1.80.254", "dns": "8.8.8.1"},
            {"name": "eth1", "mac": "11:11:11:22:22:23", "ip": "10.1.82.212", "netmask": "255.255.252.0",
             "gateway": "10.1.80.254", "dns": "8.8.8.1"}
        ]
    }
    system_edit(options)
    system_delete("aaa")
    print system_list()
