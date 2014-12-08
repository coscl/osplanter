import re
import commands

cmd = "dmidecode | sed -n \"/System Information/,/Family:/p\""
hardware = {}
keys = ["Manufacturer","Product Name","Serial Number","UUID","Family"]
for key in keys:
    newcmd = cmd + "| sed -n \"/%s/p\" | awk -F ':' '{print $2}'" %key
    hardware['%s'%key] = commands.getoutput(newcmd)
    
cmd = "cat /proc/cpuinfo | sed -n '/model name/p' | head -n1 | awk -F ':' '{print $2}'"
hardware['cpu_model_name'] = commands.getoutput(cmd)

cmd = "cat /proc/cpuinfo | grep \"physical id\" | sort -u | wc -l"
hardware['cpu_num'] = commands.getoutput(cmd)

cmd = "cat /proc/cpuinfo | grep \"cpu cores\" | uniq | awk -F: '{print $2}'"
hardware['cpu_core'] = commands.getoutput(cmd)

cmd = "sed -n '/MemTotal:/p' /proc/meminfo | awk '{print $2}'"
hardware['mem'] = commands.getoutput(cmd)

print hardware