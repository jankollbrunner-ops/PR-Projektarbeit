# TokRecipe

TokRecipe ist ein SvelteKit-Prototyp zum Speichern, Organisieren und Nachkochen von TikTok-Rezepten. Die Projektdokumentation folgt der vorgegebenen Kapitelstruktur in [VORLAGE_README.md](./VORLAGE_README.md).

## Lokal starten

1. Installiere die Abhängigkeiten:

   ```powershell
   npm install
   ```

2. Erstelle eine lokale Umgebungsdatei:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Trage in `.env` deine MongoDB-Atlas-URI ein. Erstelle in Atlas einen Datenbankbenutzer und erlaube den Zugriff von deiner aktuellen IP-Adresse. Zugangsdaten gehören nur in `.env`, niemals ins Repository.
4. Starte die App:

   ```powershell
   npm run dev
   ```

Die Datenbank `tokrecipe` und die Collection `recipes` werden mit dem ersten gespeicherten Rezept angelegt. In MongoDB Compass kannst du dieselbe Atlas-URI verwenden, um die gespeicherten Rezepte anzusehen.

## MongoDB Atlas einrichten

1. Erstelle in MongoDB Atlas ein Projekt und einen Cluster (Free-Tier, sofern verfügbar).
2. Unter **Database Access** erstelle einen Datenbankbenutzer mit einem eigenen Passwort.
3. Unter **Network Access** gib deine aktuelle IP-Adresse frei. Öffne den Zugriff nicht pauschal für alle IP-Adressen.
4. Wähle beim Cluster **Connect → Drivers → Node.js** und kopiere die Verbindungs-URI.
5. Ersetze in deiner lokalen `.env` die Platzhalter `USERNAME`, `PASSWORD` und `YOUR-CLUSTER` in `MONGODB_URI`. Bei Sonderzeichen im Passwort muss die URI-Codierung beachtet werden. Die URI nie in den Chat oder ins Repository kopieren.
6. Starte die App neu, speichere ein Rezept und prüfe in Compass mit derselben URI die Datenbank `tokrecipe` und Collection `recipes`.

## Projekt prüfen

```powershell
npm run build
```

Für ein Deployment müssen `MONGODB_URI` und `MONGODB_DB` als private Umgebungsvariablen beim gewählten Hosting-Anbieter hinterlegt werden.
