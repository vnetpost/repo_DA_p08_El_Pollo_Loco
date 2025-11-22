# repo_DA_p08_El_Pollo_Loco

## Klassen-Struktur

```
Scene (Game Manager)
├─ Sprite
│  ├─ DynamicSprite
│  │  ├─ Hero
│  │  ├─ Mob (Gallinitas)
│  │  ├─ BigBoss (Jefa)
│  │  ├─ SkyLayer
│  │  ├─ DesertLayer
│  │  └─ Collectible
│  │     └─ Projectile
│  └─ StaticSprite
│     └─ Coin
├─ IntervalHub
├─ ImgHub
└─ Joystick
```

Scene erstellt und verwaltet alle Sprites, während `Sprite` die Basisklasse für alle Zeichenobjekte bildet. `DynamicSprite` bündelt Bewegung und Animation, daher erben Hero, Jefa, Gallinitas und auch die Hintergrund-Layer direkt davon. Hilfsklassen wie `ImgHub`, `IntervalHub` und `Joystick` liefern Ressourcen, Timer und Eingaben.
