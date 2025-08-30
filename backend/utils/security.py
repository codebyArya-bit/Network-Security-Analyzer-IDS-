# Security utilities for Network Security Analyzer

import re
import ipaddress
import socket
from typing import Optional, Union
from urllib.parse import urlparse


def validate_ip(ip_string: str) -> bool:
    """
    Validate if a string is a valid IP address (IPv4 or IPv6).
    
    Args:
        ip_string: String to validate as IP address
        
    Returns:
        bool: True if valid IP address, False otherwise
    """
    try:
        ipaddress.ip_address(ip_string)
        return True
    except ValueError:
        return False


def validate_ipv4(ip_string: str) -> bool:
    """
    Validate if a string is a valid IPv4 address.
    
    Args:
        ip_string: String to validate as IPv4 address
        
    Returns:
        bool: True if valid IPv4 address, False otherwise
    """
    try:
        ipaddress.IPv4Address(ip_string)
        return True
    except ValueError:
        return False


def validate_ipv6(ip_string: str) -> bool:
    """
    Validate if a string is a valid IPv6 address.
    
    Args:
        ip_string: String to validate as IPv6 address
        
    Returns:
        bool: True if valid IPv6 address, False otherwise
    """
    try:
        ipaddress.IPv6Address(ip_string)
        return True
    except ValueError:
        return False


def validate_hostname(hostname: str) -> bool:
    """
    Validate if a string is a valid hostname or domain name.
    
    Args:
        hostname: String to validate as hostname
        
    Returns:
        bool: True if valid hostname, False otherwise
    """
    if not hostname or len(hostname) > 253:
        return False
    
    # Remove trailing dot if present
    if hostname.endswith('.'):
        hostname = hostname[:-1]
    
    # Check each label
    labels = hostname.split('.')
    if not labels:
        return False
    
    for label in labels:
        if not label or len(label) > 63:
            return False
        
        # Check if label contains only allowed characters
        if not re.match(r'^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$', label):
            return False
    
    return True


def validate_port(port: Union[str, int]) -> bool:
    """
    Validate if a port number is valid (1-65535).
    
    Args:
        port: Port number to validate
        
    Returns:
        bool: True if valid port, False otherwise
    """
    try:
        port_int = int(port)
        return 1 <= port_int <= 65535
    except (ValueError, TypeError):
        return False


def validate_port_range(port_range: str) -> bool:
    """
    Validate if a port range string is valid (e.g., "80-443", "22").
    
    Args:
        port_range: Port range string to validate
        
    Returns:
        bool: True if valid port range, False otherwise
    """
    if not port_range:
        return False
    
    # Single port
    if '-' not in port_range:
        return validate_port(port_range)
    
    # Port range
    parts = port_range.split('-')
    if len(parts) != 2:
        return False
    
    try:
        start_port = int(parts[0])
        end_port = int(parts[1])
        
        if not (validate_port(start_port) and validate_port(end_port)):
            return False
        
        return start_port <= end_port
    except ValueError:
        return False


def validate_url(url: str) -> bool:
    """
    Validate if a string is a valid URL.
    
    Args:
        url: URL string to validate
        
    Returns:
        bool: True if valid URL, False otherwise
    """
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except Exception:
        return False


def sanitize_input(input_string: str, max_length: int = 1000) -> str:
    """
    Sanitize user input by removing potentially dangerous characters.
    
    Args:
        input_string: String to sanitize
        max_length: Maximum allowed length
        
    Returns:
        str: Sanitized string
    """
    if not input_string:
        return ""
    
    # Truncate to max length
    sanitized = input_string[:max_length]
    
    # Remove null bytes and control characters
    sanitized = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', sanitized)
    
    # Remove potentially dangerous characters for command injection
    dangerous_chars = ['&', '|', ';', '$', '`', '>', '<', '(', ')', '{', '}', '[', ']']
    for char in dangerous_chars:
        sanitized = sanitized.replace(char, '')
    
    return sanitized.strip()


def is_private_ip(ip_string: str) -> bool:
    """
    Check if an IP address is in a private network range.
    
    Args:
        ip_string: IP address to check
        
    Returns:
        bool: True if private IP, False otherwise
    """
    try:
        ip = ipaddress.ip_address(ip_string)
        return ip.is_private
    except ValueError:
        return False


def is_loopback_ip(ip_string: str) -> bool:
    """
    Check if an IP address is a loopback address.
    
    Args:
        ip_string: IP address to check
        
    Returns:
        bool: True if loopback IP, False otherwise
    """
    try:
        ip = ipaddress.ip_address(ip_string)
        return ip.is_loopback
    except ValueError:
        return False


def resolve_hostname(hostname: str) -> Optional[str]:
    """
    Resolve a hostname to its IP address.
    
    Args:
        hostname: Hostname to resolve
        
    Returns:
        Optional[str]: IP address if resolution successful, None otherwise
    """
    try:
        return socket.gethostbyname(hostname)
    except socket.gaierror:
        return None


def get_ip_version(ip_string: str) -> Optional[int]:
    """
    Get the IP version (4 or 6) of an IP address.
    
    Args:
        ip_string: IP address string
        
    Returns:
        Optional[int]: 4 for IPv4, 6 for IPv6, None if invalid
    """
    try:
        ip = ipaddress.ip_address(ip_string)
        return ip.version
    except ValueError:
        return None


def normalize_ip(ip_string: str) -> Optional[str]:
    """
    Normalize an IP address to its canonical form.
    
    Args:
        ip_string: IP address to normalize
        
    Returns:
        Optional[str]: Normalized IP address, None if invalid
    """
    try:
        ip = ipaddress.ip_address(ip_string)
        return str(ip)
    except ValueError:
        return None


def is_valid_cidr(cidr_string: str) -> bool:
    """
    Validate if a string is a valid CIDR notation.
    
    Args:
        cidr_string: CIDR string to validate
        
    Returns:
        bool: True if valid CIDR, False otherwise
    """
    try:
        ipaddress.ip_network(cidr_string, strict=False)
        return True
    except ValueError:
        return False


def get_network_info(cidr_string: str) -> Optional[dict]:
    """
    Get network information from a CIDR string.
    
    Args:
        cidr_string: CIDR notation string
        
    Returns:
        Optional[dict]: Network information or None if invalid
    """
    try:
        network = ipaddress.ip_network(cidr_string, strict=False)
        return {
            "network_address": str(network.network_address),
            "broadcast_address": str(network.broadcast_address),
            "netmask": str(network.netmask),
            "prefix_length": network.prefixlen,
            "num_addresses": network.num_addresses,
            "is_private": network.is_private,
            "version": network.version
        }
    except ValueError:
        return None