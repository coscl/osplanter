Summary:    OS install tool
Name:		osi
Version:	1.0
%define     ns_dist ns6
Release:	%{?ns_dist}.01
Group:		Administration/System
License:	GPL2
Source0:	%{name}-%{version}.tar.gz
BuildRoot:	%(mktemp -ud %{_tmppath}/%{name}-%{version}-%{release}-XXXXXX)

Requires: cobbler
%if 0%{?fedora} || 0%{?rhel} >= 7
Requires: python-django
%else
Requires: Django
%endif
Requires: mod_wsgi
Requires: mod_ssl
Requires(post): openssl


%description


%prep
%setup -q

%post
sed -i 's/filename \"pxelinux.0\"/filename \"tftpboot\/pxelinux.0\"/g' /etc/cobbler/dhcp.template

%install
rm -rf %{buildroot}/*
make install DESTDIR=%{buildroot}


%clean
rm -rf %{buildroot}
rm -rf /etc/httpd/conf.d/osi.conf
rm -rf /var/lib/tftpboot/tftpboot/
sed -i 's/filename \"tftpboot\/pxelinux.0\"/filename \"pxelinux.0\"/g' /etc/cobbler/dhcp.template

%files
%defattr(-,apache,apache,-)
/usr/share/OSInstallTool/
/etc/httpd/conf.d/osi.conf
%defattr(-,root,root,-)
/var/lib/tftpboot/tftpboot/
/var/lib/cobbler/distro_signatures.json
/usr/lib/python2.6/site-packages/cobbler/remote.py

%changelog

