
#!/usr/bin/env python
# -*- coding: utf-8 -*-

__author__ = 'wz'

def delete(file_dir, name):
    lines = open(file_dir).readlines()
    for index,line in enumerate(lines):
        if line.startswith(name + ":"):
            del lines[index]
    open(file_dir, 'w').writelines(lines)

def add(file_dir,name):
    delete(file_dir,name)
    open(file_dir, 'a').write(name + ": " + name + ":5901" + '\n' )

if __name__ == "__main__":
    #delete('/usr/share/OSInstallTool/vnc_tokens','host2')
    add('/usr/share/OSInstallTool/vnc_tokens','10.1.81.224')
