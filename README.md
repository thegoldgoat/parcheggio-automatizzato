# parcheggio-automatizzato per un agenzia con tanti parcheggi nel mondo
parcheggio automatizzato. server nodejs e client python

# Client
invio delle targhe quando arrivano e quando escono

# Server
ricevi le targhe, e all'uscita manda quanto c'e' da pagare

# API_URL
## Arrivo
server/arrivoMacchina -> JSON
{
   id_parcheggio: id,
   targa: targa
} risposta: bool -> accettata o meno

## Uscita
server/uscitaMacchina -> JSON
{
   id_parcheggio: id,
   targa: targa
} risposta: JSON
{
  dataoraIngresso: tempo1,
  dataoraUscita: tempo2,
  costo_totale: eur
}
