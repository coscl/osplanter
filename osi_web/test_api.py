import xmlrpclib
import time
import simplejson
import string
import distutils
import exceptions
import time
import re

import cobbler.item_distro    as item_distro
import cobbler.item_profile   as item_profile
import cobbler.item_system    as item_system
import cobbler.item_repo      as item_repo
import cobbler.item_image     as item_image
import cobbler.item_mgmtclass as item_mgmtclass
import cobbler.item_package   as item_package
import cobbler.item_file      as item_file
import cobbler.settings       as item_settings
import cobbler.field_info     as field_info
import cobbler.utils          as utils
import api.cd_action          as distro_source

ISO_DIR = "/usr/share/OSInstallTool/iso/"

import api.dhcp_template

remote = None
username = "cobbler"
password = "cobbler"
url_cobbler_api = utils.local_get_cobbler_api_url()
remote = xmlrpclib.Server(url_cobbler_api, allow_none=True)
try:
    token = remote.login(username, password)
except:
    token = None
    
distro_list = remote.get_distros()

for i in distro_list:
    print i['name']
    
print remote.has_item("distro", "redhat-x86_64")


dis_name = "redhat-x86_64"
result = False
if dis_name == None:
    print 3333
if not remote.has_item("distro", dis_name):
    print 22222
else:
    print 11111
    result = True