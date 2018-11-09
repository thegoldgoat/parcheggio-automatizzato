import requests
ID_PARCHEGGIO = 1
API_URL = "http://localhost:8080/"



def invia_richiesta(url, json_data):
    return requests.post(url, verify=False, json=json_data)


def main():
    while True:
        print("1 - arrivo macchina\n2 - partenza macchina\n")
        scelta = int(input())

        targa = input("Inserisci targa > ")

        if scelta is 1:
            if invia_richiesta(API_URL + 'arrivoMacchina', {"id_parcheggio": ID_PARCHEGGIO, "targa": targa}).status_code == 200:
                print ("Targa accettata")
            else:
                print("Targa rifiutata")
        elif scelta is 2:
            risposta = invia_richiesta(API_URL + 'uscitaMacchina', {"id_parcheggio": ID_PARCHEGGIO, "targa": targa})
            if risposta.status_code == 200 :
                print(risposta.content)
            else:
                print("Targa rifiutata")


if __name__ == "__main__":
    main()
