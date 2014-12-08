import re
import check_ip

default_config = {
    "subnet":"0.0.0.0",
    "netmask":"0.0.0.0",
    "start":"0.0.0.0",
    "end":"0.0.0.0",
    "gateway":"0.0.0.0",
    "subnet-mask":"0.0.0.0",
    "dns":"0.0.0.0"
}

DHCP_TEMPLATE = "/etc/cobbler/dhcp.template"

class dhcp_template():
    def __init__(self,dhcp_config=default_config):
        self.dhcp_config = dhcp_config

    def get_dhcp_setting(self):
        f = open(DHCP_TEMPLATE,'r')
        data = f.read()
        ipre = r'[0-9a-f.:]+'
        ifRE = re.compile(r'\s*subnet\s*('+ipre+')\s+netmask\s+('+ipre+r')',re.IGNORECASE)
        lines = data.split('\n')
        for line in lines:
            match = ifRE.match(line)
            if match:
                self.dhcp_config["subnet"] =  match.group(1)
                self.dhcp_config["netmask"] =  match.group(2)
                break
        ifRE = re.compile(r'\s*option\s+routers\s*('+ipre+r')',re.IGNORECASE)
        for line in lines:
            match = ifRE.match(line)
            if match:
                self.dhcp_config["gateway"] =  match.group(1)
                break
        ifRE = re.compile(r'\s*option\s+domain-name-servers\s*('+ipre+r')',re.IGNORECASE)
        for line in lines:
            match = ifRE.match(line)
            if match:
                self.dhcp_config["dns"] =  match.group(1)
                break
        ifRE = re.compile(r'\s*option\s+subnet-mask\s*('+ipre+r')',re.IGNORECASE)
        for line in lines:
            match = ifRE.match(line)
            if match:
                self.dhcp_config["subnet-mask"] =  match.group(1)
                break
        ifRE = re.compile(r'\s*range\s+dynamic-bootp\s*('+ipre+')\s+('+ipre+r')',re.IGNORECASE)
        for line in lines:
            match = ifRE.match(line)
            if match:
                self.dhcp_config["start"] =  match.group(1)
                self.dhcp_config["end"] =  match.group(2)
                break
        return self.dhcp_config

    def check_dhcp_config(self):
        for (key,value) in self.dhcp_config.items():
            if not check_ip._check_ip(value):
                return {"result":"False","reason":"%s format is not correct"%key}
        if not check_ip.isInSameNetwork(self.dhcp_config['start'],self.dhcp_config['end'],self.dhcp_config['subnet-mask']):
            return {"result":"False","reason":"The start ip and end ip is not in the same network"}
        if not check_ip.ip_compare(self.dhcp_config['start'],self.dhcp_config['end']):
            return {"result":"False","reason":"The start ip must less than end ip"}
        self.dhcp_config['netmask'] = self.dhcp_config['subnet-mask']
        self.dhcp_config['subnet'] = check_ip.calcSubnet(self.dhcp_config['start'],self.dhcp_config['subnet-mask'])
        return {"result":"True","reason":""}

    def set_dhcp_template(self):
        f = open(DHCP_TEMPLATE,"r")
        con = f.read()
        f.close()
        self.dhcp_config['netmask'] = self.dhcp_config['subnet-mask']
        self.dhcp_config['subnet'] = check_ip.calcSubnet(self.dhcp_config['start'],self.dhcp_config['subnet-mask'])        
        ipre = '[0-9.]+'
        ifRE = re.compile(r'subnet\s*('+ipre+')\s+netmask\s+('+ipre+r')') 
        con = ifRE.sub('subnet %s netmask %s' %(self.dhcp_config["subnet"],self.dhcp_config["netmask"]),con)
        ifRE = re.compile(r'option\s+routers\s*('+ipre+r')',re.IGNORECASE)
        con = ifRE.sub('option routers             %s' %self.dhcp_config["gateway"],con)
        ifRE = re.compile(r'option\s+domain-name-servers\s*('+ipre+r')')
        con = ifRE.sub('option domain-name-servers %s' %self.dhcp_config["dns"],con)
        ifRE = re.compile(r'option\s+subnet-mask\s*('+ipre+r')')
        con = ifRE.sub('option subnet-mask         %s' %self.dhcp_config["subnet-mask"],con)
        ifRE = re.compile(r'range\s+dynamic-bootp\s*('+ipre+')\s+('+ipre+r')')
        con = ifRE.sub('range dynamic-bootp        %s %s' %(self.dhcp_config["start"],self.dhcp_config["end"]),con)

        f = open(DHCP_TEMPLATE,"w")
        f.write(con)
        f.close()
        return {"result":"True","reason":""}

if __name__=="__main__":
    config = {
    "subnet":"0.0.0.0",
    "netmask":"0.0.0.0",
    "start":"10.1.82.41",
    "end":"10.1.82.31",
    "gateway":"10.1.80.254",
    "subnet-mask":"255.255.252.0",
    "dns":"8.8.8.8"
}
    a = dhcp_template(config)
    print a.set_dhcp_template()
