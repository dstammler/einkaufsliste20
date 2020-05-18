# einkaufsliste20
Einkaufsliste "KWM gegen Corona" von Dominik Stammler im Zuge der Lehrveranstaltung KWM351: Web-Entwicklung: Architekturen, Frameworks (6. Semester KWM Bachelor). Kurz erklärt können in dieser Webapplikation hilfesuchende User verschiedene Einkaufslisten anlegen und ein Helfer kann sich um eine Einkaufsliste annehmen. Zum Testen stehen zwei User mit den unterschiedlichen Rollen zur Verfügung (Registrierung wurde nicht entwickelt). 

URL: http://shoppinglist.s1710456031.student.kwmhgb.at/

## Zugangsdaten
__Super Mario als Hilfesuchender__

Mail: super@mario.com 
Passwort: plsHelp

__Bernd Gruber als Helfender__

Mail: bernd@gruber.com
Passwort: asdf123


## Seiten 
Die Applikation teilt sich auf die drei Seiten "Home", "Offene Einkaufslisten" und "Administration" auf. 

### Home
Diese Seite wird als einzige angezeigt, egal ob man eingeloggt ist oder nicht. Auf dieser Seite kann man sich einloggen und anschließend auf die eigenen Listen zugreifen. Hier wird unterschieden, ob man sich als Hilfesuchender oder Helfender eingeloggt hat. Als Hilfesuchender sieht man Überblick über seine angelegten Listen. Zu Beginn werden die offenen Listen angezeigt, und falls erledigte Listen vorhanden sind, kann man diese mit einem Klick auf erledigte Listen anzeigen.

Als eingeloggter Helfer sieht man zuerst die offenen, angenommenen Einkaufslisten (falls vorhanden) und wiederum die erledigten Listen (falls vorhanden), durch einen Klick auf den Button, darunter.  

### Offene Einkaufslisten
Der Helfende kann auf dieser Seite offene Einkaufslisten annehmen. Er erhält eine Übersicht über alle nicht angenommene und bevorstehende Einkäufe.  

### Administration
Der hilfesuchende User kann über den Administrationsbereich eine Seite anlegen, oder über Detailseite --> Liste bearbeiten, die Liste anpassen. Eine Liste kann nur dann bearbeitet werden, wenn sich noch kein Hilfesuchender registriert hat. 

### Einkaufsliste - Detailseite
Die Detailseite zeigt nähere Infos einer Einkaufsliste an. Items und Kommentare werden nur den beteiligten angezeigt, sprich dem Listenersteller und dem registrierten Helfer. Dem Helfenden wird zusätzlich die Anschrift + Button zur Navigation angezeigt.

Falls noch kein Helfender registriert ist, können sich solche über die Detailseite für den Einkauf registrieren. Der Button wird klarerweise nur für offene Einkaufslisten angezeigt, und ändert sich für den zugehörigen Helfenden in einen Button zum Abmelden der Liste. 


## Datenbankschema
![alt text](https://github.com/dstammler/einkaufsliste20/blob/master/model_er.png "ER Diagram")

### Einkaufsliste
Eine Einkaufsliste besitzt einen Ersteller, der automatisch als Hilfesuchender fungiert, und einen Helfenden, der sich über die Seite "Offene Einkaufslisten" bei einer Einkaufsliste registrieren kann. Hier bestehen zwei 1:1 Beziehungen zur User Tabelle.
Eine Einkaufsliste beinhaltet mehrere Items, die Zuweisung erfolgt aber über die Items Tablele. 

### Items
Jedes Item zeigt auf eine Einkaufsliste und beinhaltet nähere Informationen zum Artikel. In dieser Tabelle wird der Artikelname, die Menge, die Einheit, der maximale Preis und der erledigt Zustand neben den initialen Attributen gespeichert. 

### User
Ein User speichert verpflichtend neben seiner eMail und seinem Passwort den Vornamen, Nachnamen und die Stadt/den Ort. Optional können Straße Hausnummer und PLZ angegeben werden. Diese Infos können beispielsweise in den Kommentaren abgefragt werden. 


### Userrolle
Bei diesem Schema wurde eine N:M Beziehung zwischen dem User und der Rolle gewählt, da evtl. für zukünftig Nutzung mehrere Rollen wie beispielsweise ein Administrator oder Moderator hinzukommen und ein User mehrere Rollen besitzen kann. Für die Grundanwendung ist eine 1:N Beziehung besser geeignet, falls ein Benutzer nur eine Rolle besitzen kann. Hiermit würde man sich die Zuweisungstabelle User_Role sparen. Ebenso wurde eine N:M Beziehung für eigen Übungszwecke eingesetzt. 


### Rolle
In dieser Tabelle werden Rollen mit den Rollennamen und der Beschreibung gespeichert. Der Rollenname unterscheidet schließlich den Hilfesuchenden vom Helfenden. 

## REST-Api Methoden
In der Applikation stehen REST-Api Methoden zu User, Einkaufslisten, Items und Kommentare zur Verfügung. Die Routen werden allesamt, außer Login Methode, durch die Middleware auth.jwt geladen. Unangemeldet bekommen User keine Infos über die Listen, User, etc. Sobald User eingeloggt sind, werden einige Routen durch die Middlewares "auth.seeker" und "auth.helper" auf Berechtigung überprüft. 

### User
* getUserById: Userinformationen werden anhand der Id abgerufen

### Einkaufsliste
* getListById: Liste wird mittels Id abgerufen
* getOpenLists: liefert alle offenen (nicht angenommene) Listen
* getDoneLists: liefert alle Listen die älter als das Enddatum sind zurück
* getOpenListsById: getOpenLists Methode mit zusätzlichem Id Filter
* getDoneListsById: getDoneLists Methode mit zusätzlichem Id Filter

* save: speichert eine neue Einkaufsliste mit Artikel (nur Hilfesuchende)
* update: aktualisiert eine Einkaufsliste (nur Hilfesuchende)
* delete: löscht eine Einkaufsliste (nur Hilfesuchende)

* registerHelper: registriert einen Helfer zu einer Einkaufsliste (nur für Helfende)
* unregisterHelper: meldet einen Einkaufsliste einer Liste ab (nur für Helfende)
* updateFinalPrice: speichert den bezahlten Preis einer Einkaufsliste (nur für Helfende)

### Items
* save: speichert ein neues Item (nur Hilfesuchende)
* deleteItem: löscht ein Item (nur Hilfesuchende)
* Update: aktualisiert ein Item (nur Hilfesuchende)

* togglecheck: toggled den "erledigt" Zustand eines Artikels

### Kommentare
* postComment: Speichert einen neuen Kommentar zu einer Einkaufsliste
* getComments: ruft alle Kommentare einer Einkaufsliste ab
* deleteComment: löscht ein Kommentar einer Einkaufsliste 

### Authentication
* login: loggt einen Benutzer ein ...
* logout: loggt einen Benutzer aus ...

## Styling
Das CSS wurde selbst erstellt und die Formularfelder mithilfe des Material Designs umgesetzt. 
