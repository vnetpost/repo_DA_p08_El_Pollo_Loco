# repo_DA_p08_El_Pollo_Loco

## Class Structure

```
Scene (Game Manager) → ImgHub · IntervalHub · Keyboard
Scene (spawnt) → Sprite (Basisklasse)
Sprite → DynamicSprite → Hero · Mob (Gallinitas) · BigBoss (Jefa) · SkyLayer · DesertLayer · Collectible → Projectile · Coin
Sprite → StatusBar (HUD)
```

```
Scene (Game Manager)
├─ Sprite (base)
│  ├─ DynamicSprite
│  │  ├─ Hero
│  │  ├─ Mob (Gallinitas)
│  │  ├─ BigBoss (Jefa)
│  │  ├─ SkyLayer
│  │  ├─ DesertLayer
│  │  └─ Collectible
│  │     ├─ Projectile
│  │     └─ Coin
│  ├─ StaticSprite (currently empty)
│  └─ StatusBar (HUD)
├─ IntervalHub
├─ ImgHub
└─ Keyboard
```
