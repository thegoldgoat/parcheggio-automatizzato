from socketIO_client import SocketIO, LoggingNamespace
ID_PARCHEGGIO = 1
HOSTNAME = "localhost"
PORT = 8080

def on_response(*args):
    print('on_response', args)

def invia_richiesta(json_data):
    with SocketIO(HOSTNAME, PORT, LoggingNamespace) as socketIO:
        socketIO.emit(json_data, on_response)
        socketIO.wait_for_callbacks(seconds=1)


def main():
    while True:
        print("1 - arrivo macchina\n2 - partenza macchina\n")
        scelta = int(input())

        targa = input("Inserisci targa > ")

        if scelta is 1:
            if invia_richiesta({"id_parcheggio": ID_PARCHEGGIO, "targa": targa}).status_code == 200:
                print ("Targa accettata")
            else:
                print("Targa rifiutata")
        elif scelta is 2:
            risposta = invia_richiesta({"id_parcheggio": ID_PARCHEGGIO, "targa": targa})
            if risposta.status_code == 200 :
                print(risposta.content)
            else:
                print("Targa rifiutata")


if __name__ == "__main__":
    main()
