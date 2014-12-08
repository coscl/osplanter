install:
	mkdir -p $(DESTDIR)/usr/share/OSInstallTool/
	cp -r * $(DESTDIR)/usr/share/OSInstallTool/
	mkdir -p $(DESTDIR)/etc/httpd/conf.d/
	\cp -r osi.conf $(DESTDIR)/etc/httpd/conf.d/
	mkdir -p $(DESTDIR)/var/lib/tftpboot
	mv $(DESTDIR)/usr/share/OSInstallTool/tftpboot $(DESTDIR)/var/lib/tftpboot/
	mkdir -p /var/lib/cobbler/
	\cp -r cobbler/distro_signatures.json $(DESTDIR)/var/lib/cobbler/
	mkdir -p /usr/lib/python2.6/site-packages/cobbler/
	\cp -r cobbler/remote.py $(DESTDIR)/usr/lib/python2.6/site-packages/cobbler/ 
