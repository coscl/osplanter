#!/usr/bin/env python

import re
from socket import inet_aton, inet_ntoa
from struct import unpack, pack

def _check_ip(ip_add):
    p = re.compile(r'^(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))(\.(([01]?[\d]{1,2})|(2[0-4][\d])|(25[0-5]))){3}(\/(\d+))?$')  
  
    return p.search (str (ip_add)) is not None

def isValidMask(mask):
    try:  
        if _check_ip(mask):  
            mask_num, = unpack("!I", inet_aton(mask))  
            if mask_num == 0:  
                return False  
  
            # get inverted  
            mask_num = ~mask_num + 1  
            binstr = bin (mask_num)[3:]  
            # convert to positive integer  
            binstr = '0b%s' % ''.join('1' if b == '0' else '0' for b in binstr)  
            mask_num = int (binstr, 2) + 1  
            # check 2^n  
            return (mask_num & (mask_num - 1) == 0)  
        return False  
    except Exception:  
        return False

def calcSubnet(ip_add, mask):  
    """ 
    Return the sub net of the network 
 
    >>>eisoopylib.calcSubnet("192.168.0.1", "255.255.255.0") 
    192.168.0.0 
 
    etc. 
    """  
    if _check_ip(ip_add) and _check_ip (mask):  
        ip_num, = unpack("!I", inet_aton(ip_add))  
        mask_num, = unpack("!I", inet_aton(mask))  
        subnet_num = ip_num & mask_num  
        return inet_ntoa (pack ("!I", subnet_num))  
    else:  
        return False

def isInSameNetwork (ip_add1, ip_add2, mask):  
    """ 
    Return ip_add1 and ip_add2 in same network 
 
    >>>eisoopylib.isInSameNetwork("192.168.77.1", "192.168.77.2", "255.255.255.0") 
    True 
 
    >>>eisoopylib.isInSameNetwork("192.168.77.1", "192.168.8.2", "255.255.0.0") 
    True 
 
    >>>eisoopylib.isInSameNetwork("192.168.77.1", "192.168.8.2", "255.255.255.0") 
    False 
 
    """  
    if _check_ip (ip_add1) and _check_ip (ip_add2) and _check_ip (mask) and isValidMask (mask):  
        ip1_num, = unpack("!I", inet_aton(ip_add1))  
        ip2_num, = unpack("!I", inet_aton(ip_add2))  
        mask_num, = unpack("!I", inet_aton(mask))  
        if ip1_num & mask_num != ip2_num & mask_num:  
            return False  
        else:  
            return True 

def ip2int(ip_add):  
    """ 
    Return the decimal number of the IP 
 
    >>>eisoopylib.ip2int("192.168.0.1") 
    3232235521 
 
    etc. 
    """  
    try:  
        if _check_ip(ip_add):  
            result = unpack("!I", inet_aton(ip_add))  
            return result[0]  
        else:  
            return False  
    except ValueError:  
        return False


def ip_compare(ip_add1,ip_add2):
    """
    return True if ip_add1 <= ip_add2
    else
    return False
    """
    ip1 = ip2int(ip_add1)
    ip2 = ip2int(ip_add2)

    return ip1 <= ip2


if __name__=="__main__":
    print _check_ip("0.0.0.0")
    print isValidMask("255.255.252.0")
    print calcSubnet("192.168.20.100","255.255.252.0")
    print isInSameNetwork("192.168.1.1","192.168.10.100","255.255.255.0")
    print ip_compare("10.1.82.33","10.1.82.32")

