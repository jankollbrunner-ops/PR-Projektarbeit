# Projektdokumentation - TokRecipe

## Projektübersicht & Zugänge

| Angabe | Inhalt |
|---|---|
| Projekttitel | TokRecipe – TikTok-Rezept-Manager |
| Verfasser/in | Jan Kollbrunner, BIS VZ B |
| GitHub-Repository | _[Link]_ |
| Aktuelle App | _[Link]_ |
| Getestete Version | _[Link; Commit/Tag]_ |
| Testzugänge | _[Testkonten je Rolle oder Bereitstellungsweg; andernfalls «Nicht erforderlich»]_ |
| Ursprüngliches Mockup (ohne KI) | [Rezept-Manager in Figma](https://www.figma.com/proto/8hAzFUaj6PIxLZ8Yh4tYLs/Rezept-Manager?node-id=0-1&t=3nkpRtnEPffGPvk9-1) |
| Überarbeitetes Mockup (Figma Make, KI) | [TokRecipe Recipe Manager](https://www.figma.com/make/Bx2pNObWdH60wCJHXJLxu2/TokRecipe-Recipe-Manager?fullscreen=1&t=nlKcPK5rSBOiUjvu-1) |
| Weitere Artefakte [Optional] | Projektideen-Rezepte-Manager.pdf, Übung 9.pdf und PO Skizze.jpg (Arbeitsunterlagen; für die Abgabe noch im Repository oder über zugängliche Links bereitstellen) |

> **Zugriff:** Stellt sicher, dass alle Dozierenden auf das Repository, die App und die verlinkten Artefakte zugreifen können.

> **Testzugänge:** Verwendet eigens eingerichtete Testkonten mit unkritischen Daten. Bei einem öffentlichen Repository gebt ihr hier nur den vereinbarten Bereitstellungsweg an. Persönliche Passwörter, API-Schlüssel und andere Geheimnisse dürfen nicht im Repository stehen.

<!-- Zentrale Projektlinks ausschliesslich in der Projektübersicht pflegen. Spezifische Nachweise wie Codestellen oder Testprotokolle direkt im jeweiligen Fachkapitel verlinken. -->

## Inhaltsverzeichnis

[Projektübersicht & Zugänge](#projektübersicht--zugänge)

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. -->

<!-- WICHTIG: Reihenfolge, Nummerierung und Benennung der vorgegebenen Kapitel beibehalten. Als [Optional] gekennzeichnete Abschnitte dürfen entfallen, sofern in den Übungen nichts anderes verlangt wird. Ohne KI-Einsatz dürfen zudem die Unterkapitel 6.1–6.3 entfallen; die ausdrückliche Angabe dazu in Kap. 6 bleibt verpflichtend. Die in Kap. 4 vorgesehenen Einträge für einzelne Erweiterungen sind entsprechend zu ergänzen. -->

## 1. Ausgangslage
Kurz beschreiben, welches Problem adressiert wird und welches Ergebnis angestrebt ist. Wem nützt die Lösung, wer ist beteiligt oder betroffen?
- **Problem:** Gespeicherte TikTok-Kochvideos sind in App-Listen schwer wiederzufinden, beim Kochen oft zu schnell geschnitten und enthalten nicht immer klare Zutatenlisten oder Mengenangaben.
- **Ziele:** TikTok-Rezepte zentral speichern, nach Kategorien und Suchbegriffen wiederfinden und als strukturierte Schritt-für-Schritt-Anleitung nachkochen.
- **Primäre Zielgruppe:** Social-Media-affine Personen, insbesondere Studierende und WG-Köch:innen.
- **Weitere Stakeholder [Optional]:** _[z. B. Verwaltung, Geschäftsleitung]_  


## 2. Lösungsidee
Beschreibt die Lösungsidee.
- **Kernfunktionalität:** Rezepte mit Zutaten, optionaler Zubereitung und TikTok-Link erfassen, auf dem Dashboard kategorisiert suchen, Details ansehen, bearbeiten und löschen. Nach dem Kochen können weitere Bewertungen abgegeben werden; angezeigt wird der Durchschnitt aller Bewertungen.
- **Annahmen [Optional]:** Eine strukturierte, schnell durchsuchbare Rezeptsammlung erleichtert das Wiederfinden und Nachkochen gespeicherter Kurzvideos.
- **Abgrenzung [Optional]:** _[Was gehört explizit nicht zum Umfang?]_

## 3. Vorgehen & Artefakte
Die Durchführung erfolgt phasenbasiert; dokumentiert die wichtigsten Ergebnisse je Phase.

### 3.1 Understand & Define
- **Zielgruppenverständnis:** Die drei Proto-Personas konkretisieren unterschiedliche Nutzungssituationen: Lisa, die spontane Studentin, sucht abends schnelle Kochinspiration in ihrer WG; Kevin, der strukturierte Meal-Prepper, möchte Rezepte und Einkäufe planen; Sarah, die experimentierfreudige WG-Köchin, kocht für mehrere Personen und möchte eigene Anpassungen festhalten. Die Persona-Ausarbeitung ist in «Übung 9.pdf» dokumentiert.
- **Wesentliche Erkenntnisse:** Gespeicherte Videos sind in App-Listen schwer wiederzufinden, zum parallelen Kochen oft zu schnell und enthalten nicht immer genaue Zutaten oder Mengen. Die How-Might-We-Fragen fokussieren darauf, Video-Rezepte dauerhaft und strukturiert zu speichern und den Kochprozess mit ihnen stressfreier zu gestalten. Gewünscht sind ausserdem gut lesbare Mengen und Schritte, die beim Kochen ohne ständiges Pausieren nutzbar sind.

### 3.2 Sketch
- **Variantenüberblick:** Eine handgezeichnete UI-Skizze untersucht Dashboard, Rezept-Erfassung und Rezeptdetails; sie liegt als «PO Skizze.jpg» vor. Weitere Skizzen und Artefakte sind in «Übung 9.pdf» dokumentiert.
- **Skizzen:** Das Dashboard zeigt kategorisierte Rezeptkarten, Bewertungen und ein Random-Rezept. Die Erfassungsansicht enthält Name, Zutaten, Rezepttext und Link; die Detailansicht kombiniert Video, Zutaten und Kochanleitung.

### 3.3 Decide
- **Gewählte Variante & Begründung:** Das ursprüngliche Figma-Mockup wurde ohne KI erstellt. Danach wurde es mit Figma Make KI-unterstützt überarbeitet. Die überarbeitete Variante mit Navigation, Suche, kategorisierten Rezeptkarten und Zufallsrezept diente als Referenz für den Prototyp.
- **End-to-End-Ablauf:** Die User Journey Map beschreibt vier Phasen: TikTok-Rezept entdecken, Link und Rezeptangaben speichern, Rezepte in der Übersicht auswählen und beim Kochen die Detailansicht mit Video nutzen. Als Risiken sind unter anderem verlorene oder nicht auflösbare Links, eine unübersichtliche Sammlung und ein nicht verfügbares Video festgehalten.
- **Mockups:** Links zu beiden Versionen siehe [Projektübersicht](#projektübersicht--zugänge). Die Konzeptunterlagen und Journey Map sind in «Projektideen-Rezepte-Manager.pdf» und «Übung 9.pdf» enthalten.

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** Die gemeinsame Navigation enthält Home, Rezept hinzufügen und eine Rezeptsuche. Das Dashboard zeigt kategorisierte Rezeptkarten und ein Zufallsrezept; Erfassungsformular und Detailseite unterstützen das Speichern, Bearbeiten und Löschen.
- **User Interface Design:** Helles, warmes Dashboard mit korallroten Aktionen, salbeigrüner Hero-Fläche und TikTok-Player-Vorschauen in den Rezeptkarten. Die Detailseite bindet den Player ebenfalls ein und bietet einen externen TikTok-Link als Ausweichmöglichkeit.
- **Designentscheidungen:** Klare Typografie und sichtbare Aktionen unterstützen die spontane Nutzung. Zutaten, optionale schriftliche Kochschritte und optionale Portionenzahl sind getrennt und schnell erfassbar; wenn eine schriftliche Anleitung fehlt, hilft das eingebettete Video beim Nachkochen. Bewertungen können nach jedem erneuten Kochen ergänzt werden; Karten und Detailansicht zeigen den Durchschnitt sowie die Anzahl der Bewertungen.

#### 3.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie-Stack:** SvelteKit 3, Svelte 5, JavaScript und MongoDB Node.js Driver.
- **Tooling:** Visual Studio Code, Git, MongoDB Compass und MongoDB Atlas. KI-Unterstützung ist in Kap. 6 dokumentiert.
- **Vorgehen bei der Implementierung:** Iterative Umsetzung der Dashboard-Oberfläche, Formular- und Detail-Workflows sowie der serverseitigen MongoDB-Anbindung. Die Verbindung zu MongoDB Atlas wurde eingerichtet und vom Studierenden als funktionsfähig bestätigt. Das Löschen eines Rezepts erfordert ein serverseitig geprüftes Admin-Passwort aus `ADMIN_DELETE_PASSWORD`. TikTok-Videos werden über den offiziellen Embed Player eingebunden; für noch nicht auflösbare Kurzlinks wird die Video-ID über TikToks oEmbed-Schnittstelle ermittelt.
- **Struktur & Komponenten:** `src/routes/+page.svelte` und `+page.server.js` zeigen und suchen Rezepte. `/recipes/new` erfasst ein Rezept; `/recipes/[id]` zeigt, bearbeitet und löscht es. `src/lib/server/mongodb.js` kapselt den Datenbankzugriff; `recipe-form.js` validiert Formulareingaben.
- **Daten & Schnittstellen:** Rezepte werden serverseitig in der MongoDB-Datenbank `tokrecipe`, Collection `recipes`, gespeichert und von dort geladen. Einzelbewertungen werden als Liste gespeichert; der angezeigte Bewertungswert ist ihr Durchschnitt. Ältere Rezepte mit einer einzelnen Bewertung werden weiterhin unterstützt. Die Verbindungsdaten liegen lokal in `.env` und werden nicht versioniert. Die Datenbank und Collection entstehen mit dem ersten gespeicherten Rezept.
- **Deployment:** Link siehe «Aktuelle App» in der [Projektübersicht](#projektübersicht--zugänge).
- **Besondere Entscheidungen:** _[z. B. Trade-offs, Vereinfachungen]_  

### 3.5 Validate

> **Hinweis:** Die Evaluation muss nachvollziehbar dokumentiert sein. Belegt die beschriebenen Beobachtungen und Resultate durch geeignete Nachweise und verlinkt diese im Feld «Nachweise». Die Materialien können im Repository abgelegt oder im Anhang aufgeführt werden. Personenbezogene Angaben sind zu anonymisieren.

- **Getestete Version:** Separat deployt; Link und Commit/Tag siehe «Getestete Version» in der [Projektübersicht](#projektübersicht--zugänge).
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
- **Vorgehen:** _[moderiert/unmoderiert; remote/on-site]_  
- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_  
- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
- **Nachweise:** _[Verweise auf anonymisierte Testprotokolle, Beobachtungsnotizen, Auswertungstabellen oder andere geeignete Belege für die beschriebenen Beobachtungen und Resultate]_
- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2-4 Sätze]_  
- **Abgeleitete Verbesserungen:** _[Anforderungen, die als nächstes umgesetzt werden sollten, priorisiert, kurz begründet. Umgesetzte Verbesserungen hier kurz beschreiben. Gehen sie über den Mindestumfang hinaus, zusätzlich nach dem Schema in Kap. 4 dokumentieren.]_

## 4. Erweiterungen [Optional]
Dokumentiert hier Erweiterungen über den Mindestumfang hinaus. Ordnet jede Erweiterung einem der beiden Unterkapitel zu und beschreibt sie einzeln.

> **Hinweis zur Bewertung:** Nur dokumentierte Erweiterungen werden bewertet. Für nicht dokumentierte Erweiterungen oder Erweiterungen, deren Beschreibung bzw. Nachweise die folgenden Vorgaben nicht erfüllen, werden keine Punkte vergeben.

> **Verbindliche Struktur:** Jede Erweiterung muss vollständig und exakt nach dem Schema des jeweiligen Unterkapitels beschrieben werden. Alle Felder sind mit unveränderten Bezeichnungen und in der vorgegebenen Reihenfolge auszufüllen. Wiederholt das Schema für jede weitere Erweiterung und nummeriert die Einträge fortlaufend (4.1.2, 4.1.3 bzw. 4.2.2, 4.2.3). Zusätzliche Erläuterungen innerhalb der Felder sind möglich.

> **Erforderliche Nachweise:** Fügt zu jeder Erweiterung nach Möglichkeit mindestens einen aussagekräftigen Screenshot mit kurzer Erläuterung ein. Falls ein Screenshot nicht sinnvoll möglich ist, begründet dies kurz im Feld «Nachweise» und gebt einen anderen geeigneten Nachweis an. Bei Erweiterungen mit Code sind zusätzlich die relevanten Codestellen zu referenzieren, beispielsweise durch Links auf Dateien und die betreffenden Funktionen oder Zeilenbereiche.

### 4.1 Software-Erweiterungen
Hierzu gehören zusätzliche Funktionen und technische Verbesserungen am Prototyp.

#### 4.1.1 [Titel der Erweiterung]
- **Beschreibung & Nutzen:** _[Was wurde erweitert und welchen Mehrwert bietet es?]_
- **Abgrenzung zum Mindestumfang:** _[Was geht konkret über die verbindlichen Anforderungen hinaus?]_
- **Umsetzung:** _[Wie und wo wurde die Erweiterung umgesetzt?]_
- **Nachweise:** _[Screenshot(s) mit Erläuterung; Referenzen auf die relevanten Codestellen; gegebenenfalls weitere Belege]_
- **Bezug zur Evaluation:** _[Wurde die Erweiterung aus der Evaluation abgeleitet? Falls ja: auf die betreffende Beobachtung bzw. das Issue verweisen. Andernfalls: «Nein».]_

### 4.2 Weitere Erweiterungen
Hierzu gehören beispielsweise zusätzliche Methoden, Planungs- und Analyseartefakte, Verbesserungen der Projektorganisation oder Anpassungen eines KI-Agenten-Workflows.

#### 4.2.1 [Titel der Erweiterung]
- **Beschreibung & Nutzen:** _[Was wurde zusätzlich erarbeitet oder verbessert und welchen Mehrwert bietet es?]_
- **Abgrenzung zum Mindestumfang:** _[Was geht konkret über die verbindlichen Anforderungen hinaus?]_
- **Umsetzung:** _[Wie wurde vorgegangen und was ist das Ergebnis?]_
- **Nachweise:** _[Screenshot(s) mit Erläuterung; Links auf Artefakte, Konfigurationen oder andere Ergebnisse; bei Code zusätzlich Referenzen auf die relevanten Codestellen]_
- **Bezug zur Evaluation:** _[Wurde die Erweiterung aus der Evaluation abgeleitet? Falls ja: auf die betreffende Beobachtung bzw. das Issue verweisen. Andernfalls: «Nein».]_

## 5. Projektorganisation [Optional]

> **Hinweis:** Verbesserungen der Projektorganisation, für die Erweiterungspunkte beansprucht werden, müssen nach dem Schema in Kap. 4.2 dokumentiert werden. Verweist dort bei Bedarf auf die Beschreibung in diesem Kapitel, um Wiederholungen zu vermeiden.

Beispiele:
- **Repository & Struktur:** Repository-Link siehe [Projektübersicht](#projektübersicht--zugänge). _[Kurze Strukturübersicht]_
- **Issue-Management:** _[Vorgehen kurz beschreiben]_  
- **Commit-Praxis:** _[z. B. sprechende Commits]_

## 6. KI-Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

> **Hinweis:** Dokumentiert den KI-Einsatz im gesamten Projekt, einschliesslich der Implementierung und eines allfälligen Einsatzes von KI-Agenten (Agentic Coding). Beschreibt die tatsächlich praktizierte Arbeitsweise. Falls keine KI eingesetzt wurde, gebt dies ausdrücklich an; die Unterkapitel 6.1–6.3 können dann entfallen.

### 6.1 KI-Tools
- **Eingesetzte Tools**: GitHub Copilot in Visual Studio Code sowie Figma Make.
- **Zweck & Umfang**: Figma Make wurde zur KI-unterstützten Überarbeitung des ursprünglichen Mockups verwendet. GitHub Copilot unterstützte die Umsetzung des SvelteKit-Prototyps, die MongoDB-Anbindung, Formularvalidierung, Gestaltung und Dokumentation.
- **Eigene Leistung (Abgrenzung):** Projektidee, Problemraumanalyse, Personas, Papier-Skizze und ursprüngliches Figma-Mockup stammen vom Studierenden. Das überarbeitete Mockup und der Code wurden mit KI-Unterstützung erstellt; Anforderungen, Vorschläge und Änderungen werden vom Studierenden geprüft.

### 6.2 Vorgehen mit KI
- **Arbeitsablauf & Aufgabenverteilung:** Das ursprüngliche Mockup wurde ohne KI erstellt und anschliessend mit Figma Make KI-unterstützt überarbeitet. Copilot wurde danach schrittweise für die Implementierung und Dokumentation eingesetzt. Datenbankzugang und Verbindungsdaten richtet der Studierende selbst ein; Ergebnisse sind vor Abgabe zu prüfen.
- **Prompt-Vorgehen & Kontext:** Anforderungen, Zielgruppen, Workflows, Mockup-Links und Modulvorgaben wurden als Kontext für die KI-Unterstützung bereitgestellt. Änderungen wurden schrittweise auf den jeweils vereinbarten Umfang begrenzt.
- **Konfiguration & Werkzeuge:** MongoDB-Verbindungsparameter sind in `.env.example` dokumentiert und werden lokal über `.env` bereitgestellt. Keine projektspezifischen Agenten, MCP-Tools oder zusätzlichen KI-Konfigurationen.
- **Prüfung & Überarbeitung:** Der Produktions-Build wurde ausgeführt; ein Fehler mit dem projektspezifischen `#lib`-Alias wurde behoben und erneut geprüft. Die Atlas-Verbindung wurde vom Studierenden als funktionsfähig bestätigt. Die geänderten Formulare, Player-Einbettungen und Workflows werden mit dem Projekt-Build geprüft; die Player-Anzeige hängt zusätzlich von TikTok und der Verfügbarkeit des jeweiligen Videos ab. KI-Ergebnisse werden vor der Abgabe vom Studierenden geprüft und angepasst.

### 6.3 Reflexion
_[Nutzen, Grenzen, Risiken/Qualitätssicherung, ...]_

## 7. Anhang [Optional]

> **Hinweis zu Quellen und Urheberrecht:** Bei Verwendung fremder Inhalte (z. B. Code, Texte, Bilder, Icons, Vorlagen oder Modelle) sind die Quellen und die geltenden Lizenzen bzw. Nutzungsbedingungen anzugeben und einzuhalten. Diese Angaben sind verpflichtend, auch wenn der Anhang weggelassen wird. Sie können alternativ an den betreffenden Stellen der Dokumentation oder in einer verlinkten Quellenübersicht im Repository stehen. Erforderliche Hinweise direkt im Code oder bei verwendeten Inhalten bleiben zusätzlich bestehen.

Beispiele:
- **Quellen:** Die TikTok-Videos werden über den [offiziellen TikTok Embed Player](https://developers.tiktok.com/docs/en/embed-player) eingebettet und nicht lokal kopiert. Der Original-Link bleibt pro Rezept gespeichert und ist auf der jeweiligen Detailseite erreichbar. Für Videos, die in Screenshots oder im Walkthrough konkret gezeigt werden, Creator/Account und Original-Link ergänzen; Nutzungsbedingungen der Plattform und Rechte der Urheber beachten.
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_  

