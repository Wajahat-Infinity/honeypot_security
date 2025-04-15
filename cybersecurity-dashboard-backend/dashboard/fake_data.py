from datetime import datetime, timedelta
import random
from typing import List, Dict, Any
import uuid

class FakeDataGenerator:
    def __init__(self):
        self.locations = [
            {"city": "New York", "lat": 40.7128, "lng": -74.0060},
            {"city": "London", "lat": 51.5074, "lng": -0.1278},
            {"city": "Tokyo", "lat": 35.6762, "lng": 139.6503},
            {"city": "Singapore", "lat": 1.3521, "lng": 103.8198},
            {"city": "Sydney", "lat": -33.8688, "lng": 151.2093},
            {"city": "Paris", "lat": 48.8566, "lng": 2.3522},
            {"city": "Moscow", "lat": 55.7558, "lng": 37.6173},
            {"city": "Hong Kong", "lat": 22.3193, "lng": 114.1694},
            {"city": "Rio", "lat": -22.9068, "lng": -43.1729},
            {"city": "New Delhi", "lat": 28.6139, "lng": 77.2090},
        ]
        
        self.threat_types = [
            "DDoS Attack",
            "Malware Infection",
            "Brute Force Attempt",
            "SQL Injection",
            "Cross-Site Scripting",
            "Data Breach",
            "Unauthorized Access",
            "Phishing Attempt",
            "Ransomware",
            "Zero-Day Exploit"
        ]
        
        self.vulnerability_types = [
            "Outdated Software",
            "Weak Encryption",
            "Misconfigured Firewall",
            "Exposed API",
            "Unpatched System",
            "Default Credentials",
            "Insecure Protocols",
            "Missing Security Headers",
            "Open Ports",
            "Insufficient Logging"
        ]

    def generate_threat(self) -> Dict[str, Any]:
        location = random.choice(self.locations)
        threat_type = random.choice(self.threat_types)
        severity = random.choice(["low", "medium", "high"])
        
        return {
            "id": str(uuid.uuid4()),
            "type": "threat",
            "severity": severity,
            "description": f"{threat_type} detected in {location['city']}",
            "timestamp": datetime.now().isoformat(),
            "location": {
                "lat": location["lat"] + (random.random() - 0.5) * 0.1,
                "lng": location["lng"] + (random.random() - 0.5) * 0.1
            },
            "details": {
                "source_ip": f"192.168.{random.randint(1, 255)}.{random.randint(1, 255)}",
                "target_port": random.randint(1, 65535),
                "protocol": random.choice(["TCP", "UDP", "ICMP"]),
                "duration": random.randint(1, 3600),
                "attempts": random.randint(1, 1000)
            }
        }

    def generate_vulnerability(self) -> Dict[str, Any]:
        location = random.choice(self.locations)
        vuln_type = random.choice(self.vulnerability_types)
        severity = random.choice(["low", "medium", "high"])
        
        return {
            "id": str(uuid.uuid4()),
            "type": "vulnerability",
            "severity": severity,
            "description": f"{vuln_type} found in {location['city']}",
            "timestamp": datetime.now().isoformat(),
            "location": {
                "lat": location["lat"] + (random.random() - 0.5) * 0.1,
                "lng": location["lng"] + (random.random() - 0.5) * 0.1
            },
            "details": {
                "affected_systems": random.randint(1, 10),
                "cvss_score": round(random.uniform(0, 10), 1),
                "exploit_available": random.choice([True, False]),
                "patch_available": random.choice([True, False]),
                "last_scan": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat()
            }
        }

    def generate_honeypot_data(self) -> Dict[str, Any]:
        return {
            "id": str(uuid.uuid4()),
            "name": f"Honeypot-{random.randint(1000, 9999)}",
            "type": random.choice(["http", "ftp", "ssh", "smtp", "mysql"]),
            "status": random.choice(["active", "inactive", "maintenance"]),
            "location": random.choice(self.locations),
            "metrics": {
                "attacks_blocked": random.randint(0, 1000),
                "data_collected": random.randint(0, 1000),
                "uptime": random.randint(0, 100),
                "last_activity": (datetime.now() - timedelta(minutes=random.randint(0, 60))).isoformat()
            }
        }

    def generate_alert(self) -> Dict[str, Any]:
        threat = self.generate_threat()
        return {
            "id": str(uuid.uuid4()),
            "type": "alert",
            "severity": threat["severity"],
            "title": f"Security Alert: {threat['description']}",
            "description": f"Detected {threat['type']} from {threat['details']['source_ip']}",
            "timestamp": datetime.now().isoformat(),
            "status": random.choice(["new", "investigating", "resolved"]),
            "source": "honeypot",
            "details": threat["details"]
        }

    def generate_dashboard_stats(self) -> Dict[str, Any]:
        return {
            "total_threats": random.randint(100, 1000),
            "active_threats": random.randint(0, 100),
            "total_vulnerabilities": random.randint(50, 500),
            "critical_vulnerabilities": random.randint(0, 50),
            "honeypots_active": random.randint(5, 20),
            "honeypots_total": random.randint(20, 50),
            "alerts_today": random.randint(0, 100),
            "incidents_resolved": random.randint(0, 50),
            "average_response_time": random.randint(1, 60),
            "threat_trend": [random.randint(0, 100) for _ in range(24)],
            "vulnerability_trend": [random.randint(0, 50) for _ in range(24)]
        } 