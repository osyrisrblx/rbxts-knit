## **`@rbxts/knit`**

A roblox-ts package for Sleitnick's [Knit](https://atollstudios.github.io/Knit/) framework.

## Differences from the Luau version of Knit

### **1. Importing Knit**

Knit must be imported differently on the server and client.

On the server-side, you should use:
```ts
import { KnitServer as Knit } from "@rbxts/knit";
// Use Knit
```

On the client-side, you should use:
```ts
import { KnitClient as Knit } from "@rbxts/knit";
// Use Knit
```

### **2. Services and Controllers must be registered.**

You can register a service like this:
```ts
declare global {
	interface KnitServices {
		MyService: typeof MyService;
	}
}
```

Or for a controller:
```ts
declare global {
	interface KnitControllers {
		MyController: typeof MyController;
	}
}
```

### **3. The entire Service or Controller definition must be an object.**

You must describe your service as a single object with fields, events, methods, etc. all together. Full example below.

### **4. Components**

Components should defined using `implements Component.ComponentClass`. Here's an example:

```ts
import { Component, Janitor } from "@rbxts/knit";

class Lava implements Component.ComponentClass {
    public static Tag = "Lava";

    private janitor = new Janitor();

    constructor(instance: Instance) {
        assert(instance.IsA("BasePart"));
        this.janitor.Add(
            instance.Touched.Connect((otherPart) =>
                otherPart.Parent?.FindFirstChildOfClass("Humanoid")?.TakeDamage(100),
            ),
        );
    }

    public Destroy() {
        this.janitor.Destroy();
    }
}

export = Lava;
```

## Complete Example

**`PointsService.ts`**
```ts
import { KnitServer as Knit, Signal, RemoteProperty, RemoteSignal } from "@rbxts/knit";
import { Players } from "@rbxts/services";

declare global {
	interface KnitServices {
		PointsService: typeof PointsService;
	}
}

const PointsService = Knit.CreateService({
	Name: "PointsService",

	// Server-exposed signals/fields:
	PointsPerPlayer: new Map<Player, number>(),
	PointsChanged: new Signal<(player: Player, points: number) => void>(),

	Client: {
		// Client exposed signals:
		PointsChanged: new RemoteSignal<(points: number) => void>(),
		GiveMePoints: new RemoteSignal<() => void>(),

		// Client exposed properties:
		MostPoints: new RemoteProperty(0),

		// Client exposed GetPoints method:
		GetPoints(player: Player) {
			return this.Server.GetPoints(player);
		},
	},

	// Add Points:
	AddPoints(player: Player, amount: number) {
		let points = this.GetPoints(player);
		points += amount;
		this.PointsPerPlayer.set(player, points);
		if (amount !== 0) {
			this.PointsChanged.Fire(player, points);
			this.Client.PointsChanged.Fire(player, points);
		}
		if (points > this.Client.MostPoints.Get()) {
			this.Client.MostPoints.Set(points);
		}
	},

	// Get Points:
	GetPoints(player: Player) {
		const points = this.PointsPerPlayer.get(player);
		return points ?? 0;
	},

	// Initialize
	KnitInit() {
		const rng = new Random();

		this.Client.GiveMePoints.Connect(player => {
			const points = rng.NextInteger(0, 10);
			this.AddPoints(player, points);
			print(`Gave ${player.Name} ${points} points`);
		});

		Players.PlayerRemoving.Connect(player => this.PointsPerPlayer.delete(player));
	},
});

export = PointsService;
```

**`test.client.ts`**
```ts
import { KnitClient as Knit } from "@rbxts/knit";

const PointsService = Knit.GetService("PointsService");

function PointsChanged(points: number) {
	print("My points:", points);
}

// Get points and listen for changes:
const initialPoints = PointsService.GetPoints();
PointsChanged(initialPoints);
PointsService.PointsChanged.Connect(PointsChanged);

// Ask server to give points randomly:
PointsService.GiveMePoints.Fire();

// Grab MostPoints value:
let mostPoints = PointsService.MostPoints.Get();

// Keep MostPoints value updated:
PointsService.MostPoints.Changed.Connect(newMostPoints => {
	mostPoints = newMostPoints;
});

// Advanced example, using promises to get points:
PointsService.GetPointsPromise().then(points => {
	print("Got points:", points);
});
```

## Snippets

This repository provides VSCode snippets for constructing Services, Controllers, and Components.

Simply copy [this file](./snippets/knit.code-snippets) into `.vscode/knit.code-snippets`.
