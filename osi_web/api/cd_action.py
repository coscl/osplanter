import os
import re
import glob
import commands
import random

def get_dev():
    dev_dir = []
    for i in range(0,10):
        dev = "/dev/sr%s"%i
        if os.path.exists(dev):
            dev_dir.append(dev)
    return dev_dir


def get_cd_info(dev_dir):
    cd_info = {}
    for dev in dev_dir:
        output = commands.getoutput("blkid %s" %dev)
        if output:
            RE = re.compile(r'.*LABEL=\"(.*)\"\s+TYPE',re.IGNORECASE)
            match = RE.match(output)
            if match:
                cd_info[dev] = match.group(1)
    return cd_info

def get_iso_info(iso_dir):
    os.chdir(iso_dir)
    iso_list = glob.glob('*.iso')
    return iso_list

def mount(os_type,path):
    m_path = random.randint(1,10000)
    os.mkdir("/opt/%s" %m_path)
    if os_type == "cd":
        (status,output) = commands.getstatusoutput("mount %s /opt/%s" %(path,m_path))
        if status != 0:
            return {"result":False , "reason":output}
        else:
            return {"result":True , "path":"/opt/%s"%m_path}
    if os_type == "iso":
        (status,output) = commands.getstatusoutput("mount -o loop %s /opt/%s" %(path,m_path))
        if status != 0:
            return {"result":False , "reason":output}
        else:
            return {"result":True , "path":"/opt/%s"%m_path}
    
if __name__ == "__main__":
    a = get_cd_info(get_dev())
    print get_iso_info("/opt/ovirt-deploy/upload/iso/")
    print mount("cd","/dev/sr0")
