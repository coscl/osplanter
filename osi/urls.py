from django.conf.urls import patterns, include, url
#from django.views.generic.simple import direct_to_template
from django.views.generic import TemplateView
import osi_web
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'osi.views.home', name='home'),
    # url(r'^osi/', include('osi.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    (r'^osi$', 'osi_web.views.index'),
    (r'^setting/dhcp$', 'osi_web.views.dhcp'),
    (r'^setting/dhcp_json$', 'osi_web.views.dhcp_json'),
    (r'^system/list$', 'osi_web.views.system_list'),
   # (r'^system/index$',  direct_to_template, {'template': 'system.html'}),
    (r'^system/index$',  TemplateView.as_view(template_name='system.html')),
    (r'^system/discoverhosts$', 'osi_web.views.discoverhosts'),
    (r'^system/system_add$', 'osi_web.views.system_batch_add'),
    (r'^system/system_delete$', 'osi_web.views.system_delete'),
    (r'^system/system_edit$', 'osi_web.views.system_edit'),
    (r'^system/system_ksfile/(?P<name>.+)$', 'osi_web.views.system_ksfile'),


    (r'^distro/index$',  TemplateView.as_view(template_name='distro.html')),
    (r'^distro/list$', 'osi_web.views.get_distro_list'),
    (r'^distro/get_import_source$', 'osi_web.views.get_import_source'),
    (r'^distro/create_distro$', 'osi_web.views.create_distro'),
    (r'^distro/distro_delete/(?P<dis_name>.+)$', 'osi_web.views.distro_delete'),
    (r'^distro/distro_rename$', 'osi_web.views.distro_rename'),

    (r'^ksfile/list$', 'osi_web.views.ksfile_list'),
    (r'^ksfile/ksfile_list_json$', 'osi_web.views.ksfile_list_json'),
    (r'^ksfile/edit/file:(?P<ksfile_name>.+)$', 'osi_web.views.ksfile_edit', {'editmode': 'edit'}),
    (r'^ksfile/edit$', 'osi_web.views.ksfile_edit', {'editmode':'new'}),
    (r'^ksfile/save$', 'osi_web.views.ksfile_save'),
    (r'^events$', 'osi_web.views.events'),
    (r'^eventlog/(?P<event>.+)$', 'osi_web.views.eventlog'),


)
