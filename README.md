# El Pollo Loco

2D Jump-and-Run Browsergame auf Basis von HTML5 Canvas und Vanilla JavaScript.

## Ueber das Projekt
In diesem Projekt steuerst du den Charakter Pepe durch eine Wuestenwelt, sammelst Muenzen und Flaschen und kaempfst gegen Huhn-Gegner bis zum Endboss.  
Das Spiel laeuft komplett im Browser ohne Build-Tooling oder externe Frameworks.

## Features
- 2D Side-Scroller im Canvas (`720x480`, responsive skaliert)
- Start-, Restart- und Endscreen (Win/Lose)
- Gegner-System mit normalen Gegnern und Endboss
- Sammelobjekte: Coins und Flaschen
- HUD mit Health-, Coin-, Bottle- und Endboss-Statusbar
- Audio-System mit Lautstaerke-Slider (Wert wird in `localStorage` gespeichert)
- Fullscreen-Button
- Keyboard- und Mobile-Steuerung (Touch-Buttons)
- Eigene Impressumsseite (`Project/impressum.html`)

## Steuerung
- Links: `ArrowLeft` oder `A`
- Rechts: `ArrowRight` oder `D`
- Springen: `ArrowUp`, `W` oder `Space`
- Werfen: `F`
- Mobile: On-Screen Buttons fuer links, rechts, springen, werfen

## Projekt lokal starten
Da ES-Module verwendet werden, sollte das Projekt ueber einen lokalen Webserver gestartet werden.

1. Ins Projektverzeichnis wechseln: `cd Project`
2. Lokalen Server starten, z. B. `python3 -m http.server 8000`
3. Im Browser oeffnen: `http://localhost:8000`

## Wichtige Dateien
- `Project/index.html`: Einstiegspunkt der App
- `Project/scripts/game.js`: Spielstart, UI-Events, Overlay-Logik
- `Project/scripts/models/world.class.js`: Render-Loop, Spawning, Kamera, HUD
- `Project/scripts/models/keyboard.class.js`: Keyboard- und Touch-Input
- `Project/scripts/models/audioHub.class.js`: Zentrales Sound-Management
- `Project/scripts/levels/level1.js`: Levelaufbau und Background-Layer

## Autor
Babak Anvari Bavandpouri
