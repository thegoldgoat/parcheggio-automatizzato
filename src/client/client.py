import requests

url = "http://localhost:8080/arrivoMacchina"
data = {"id_parcheggio": 1, "targa": "AB123CD"}
r = requests.post(url, verify=False, json=data)
print(r.status_code)