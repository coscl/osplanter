# -*- coding: utf-8 -*-
from django import forms
import sys
#from models import Host
reload(sys)
sys.setdefaultencoding("utf-8")

# class HostForm(forms.ModelForm):
# 	class Meta:
# 		model = Host

class ConfigForm(forms.Form):
	start = forms.GenericIPAddressField(label='IP起始地址')
	end = forms.GenericIPAddressField(label='IP结束地址')
	subnet_mask = forms.GenericIPAddressField(label='子网掩码')
	gateway = forms.GenericIPAddressField(label='网关')
	dns = forms.GenericIPAddressField(label='DNS')

class SystemForm(forms.Form):
	name = forms.CharField()
	profile = forms.CharField()
