import requests

url = 'http://localhost:8080/arrivoMacchina'
data = {"name": "Value"}
r = requests.post(url, verify=False, json=data)
print(r.status_code)