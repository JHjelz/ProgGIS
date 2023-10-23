# ProgGis

## Hva er ProgGIS?

ProgGIS er resultatet av en arbeidsprosess med faget TBA4251 Programmering i Geomatikk med den hensikt å utvikle en webapplikasjon som benytter kart og geografisk informasjon.

ProgGIS er en enkel GIS-plattform egnet for å lære om hva et GIS er for noe og hvordan det fungerer. Plattformen er nettbasert og trenger ingen forhåndsinnstallasjoner om en bare skal lære seg hvordan GIS fungerer - altså egnet for hvem som helst med kartinteresser!

## Hvordan fungerer det?

Plattformen nås via lenken: https://jshjelse.pages.stud.idi.ntnu.no/proggis/

Nettsiden består av en header med diverse knapper og et større kart som dekker det meste av siden. Rundt om på siden finnes en rekke knapper med ulik funksjonalitet, inkludert en tutorial som beskriver all funksjonalitet på siden. GIS-funksjonene tilrettelagt på nettsiden er som følger:

- [] Buffer
- [] Difference
- [] Dissolve
- [] Extract
- [] Intersection
- [] Union

Alt av navigasjon og filhåndtering på siden fungerer via knapper og trykk fra brukeren. Data lagres i egne knapper, select- eller input-tagger, noe som gjør siden veldig forutsigbar og enkel å bruke.

### Data

Det er en del tilrettelagt data i applikasjonen allerede som er tilpasset riktig format for sida. Det vil si at den geografiske dataen er på geojson-format med lengde- og breddegradssystemet som koordinatsystem. Denne dataen kan enkelt åpnes via en knapp i sidebaren.

Ellers er det mulig å legge til egne geojson-filer til nettsida via en annen knapp i sidebaren som åpner filutforskeren til brukeren. Det forutsetter da at en har filer på rett format. Dette kan skaffes via følgende fremgangsmåte:

- [] Last ned ønskede datasett fra geonorge.no på SOSI-format
- [] Benytt SOSI2Shape for å konvertere SOSI-filer til shape-filer
- [] Åpne shape-filene i QGIS og sett koordinatsystemet til kartet til samme som datalagene (UTM 32N, 33N eller 35N for Norge)
- [] Klipp ut et utsnitt av datasettene om ønskelig
- [] Eksporter datalagene som geojson og CRS: 4326 - globalt lengde- og breddegradssystem

Filen du nå får kan legges inn i ProgGIS via legg til-knappene i sidebaren.

## Eventuelt

Ved store eller komplekse datasett kan enkelte operasjoner ta en del tid, eventuelt ikke fungere i det hele tatt. Nettsidens funksjoner har en rekke sjekker for å sørge for at all dataen til enhver tid er gyldig i hele applikasjonen. Disse testene skal ta for seg de fleste tilfeller, men muligens ikke alle.

Enkelte verdier på parametre i noen av funksjonene nevnt under 'Hvordan fungerer det?' kan føre til feilmeldinger eller ingen respons i systemet, men dette forekommer svært sjeldent.

##

Så da ønsker jeg bare god fornøyelse, og lykke til!

Jakob S. S. Hjelseth
