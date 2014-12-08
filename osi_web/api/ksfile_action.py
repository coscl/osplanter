import os
import shutil

def copy(oldfile ,newfile):
    shutil.copy(oldfile ,newfile)


def delete(file):
    if os.path.exists(file):
        os.remove(file)
    
def list(dir):
    return os.listdir(dir)
    
if __name__ == "__main__":
    copy("/opt/aa","/opt/bb")
    print list("/var/lib/cobbler/kickstarts/")
