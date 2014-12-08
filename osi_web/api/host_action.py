import paramiko

def runcommand(ip ,passwd ,cmd):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, 22, "root" ,passwd)
    stdin, stdout, stderr = ssh.exec_command(cmd)
    ssh.close()

def reboot(ip ,passwd = "neokylin123"):
    runcommand(ip ,passwd ,"reboot")

if __name__ == "__main__":
    ip = "192.168.30.7"
    reboot(ip)
    print 1111