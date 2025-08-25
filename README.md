# kanban-nastenka-projekt

## Spuštění:

V kořenové složce projektu spustit příkaz (vše je vyřešeno v rámci kontejnerizace):

```bash
docker compose up
```

- frontend na portu 5173

- backend na portu 5001

- DB na portu 27018

v rámci DB je potřeba založit databázi s názvem "backend" a uvnitř kolekci s názvem "tasks"

Pro testy pak ve složce "backend" spustit:

```bash
npm run test:e2e
```


Co všechno aplikace umí:

- CRUD operace ohledně kanban kartiček

- validace formuláře při založení kartičky

- drag & drop kartičky z místa A do místa B

- backend je pokryt integračním testováním

Komponenty a funkcionality jsou dělány co nejgeneričtěji (pokud se nejedná o čistě specifické) a také tak, aby byly lehce rozšířitelné



## Můj postup:

Prvně jsem vytvořil frontend, kdy jsem využil dummy data, která kopírovaly strukturu budoucí odpovědi z volání API. Vytvořil jsem prvně hlavní stránku, kde jsem zakomponoval prvně nástěnkovou komponentu, poté komponentu jednotlivých sloupců (skrze v-for) a nakonec komponentu jednotlivých kartiček (skrze v-for v konkrétním sloupci). Po tomto všem jsem zakomponoval drag & drop vlastnost.

Po frontentu jsem vytvořil backend, kdy jsem prvně programoval základní nastavení pro server a spojení s DB. Následně jsem začal tvořit jednotlivé endpointy a k nim potřebné okolní aspekty, tedy kontrolery, servisy, atd. Ke každému endpointu jsem také vytvořil i testovací případ.

Po dokončení backendu jsem se vrátil zase zpět na frontend, kde jsem dummy data nahradil opravdovým voláním API.

## Možné zlepšení postupu:

Pro rychlejší zpracování by bylo lepší začít backendem a až poté následně frontendem, protože by se pak nemusely řešit dummy data a "vracet se" k frontendu dvakrát.