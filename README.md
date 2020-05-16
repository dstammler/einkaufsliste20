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
Auf dieser Seite kann man sich einloggen und anschließend auf die eigenen Listen zugreifen. Hier wird unterschieden, ob man sich als Hilfesuchender oder Helfender eingeloggt hat. Als Hilfesuchender sieht man Überblick über seine angelegten Listen. Zu Beginn werden die offenen Listen angezeigt, und falls erledigte Listen vorhanden sind, kann man diese mit einem Klick auf erledigte Listen anzeigen.

Als eingeloggter Helfer sieht man zuerst die offenen, angenommenen Einkaufslisten (falls vorhanden) und wiederum die erledigten Listen (falls vorhanden), durch einen Klick auf den Button, darunter.  

### Offene Einkaufslisten
Hier erhalten alle User (auch nicht eingeloggte) eine Übersicht über alle nicht angenommene Einkaufslisten. Eine Einkaufs

### Einkaufsliste - Detailseite

### Administration

#### Liste bearbeiten

#### Neue Liste anlegen


## Datenbankschema
![alt text](https://github.com/dstammler/einkaufsliste20/blob/master/model_er.png "ER Diagram")

### Einkaufsliste
Eine Einkaufsliste besitzt einen Ersteller, der automatisch als Hilfesuchender fungiert, und einen Helfenden, der sich über die Seite "Offene Einkaufslisten" bei einer Einkaufsliste registrieren kann. Hier bestehen zwei 1:1 Beziehungen zur User Tabelle.
Eine Einkaufsliste beinhaltet mehrere Items, die Zuweisung erfolgt aber über die Items Tablele. 

### Items


### User



### Userrolle
Bei diesem Schema wurde eine N:M Beziehung zwischen dem User und der Rolle gewählt, da evtl. für zukünftig Nutzung mehrere Rollen wie beispielsweise ein Administrator oder Moderator hinzukommen und ein User mehrere Rollen besitzen kann. Für die Grundanwendung ist eine 1:N Beziehung besser geeignet, falls ein Benutzer nur eine Rolle besitzen kann. Hiermit würde man sich die Zuweisungstabelle User_Role sparen. Ebenso wurde eine N:M Beziehung für eigen Übungszwecke eingesetzt. 


### Rolle
In dieser Tabelle werden Rollen mit den Rollennamen und der Beschreibung gespeichert. 

## Rest-Api Methoden

## Routingkonzept

## Styling
Das CSS wurde selbst entwickelt und die Formularfelder mithilfe des Material Designs umgesetzt. 
