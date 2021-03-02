# `@rbxts/knit`

A roblox-ts package for Sleitnick's [Knit](https://sleitnick.github.io/Knit/) framework.

### Notes

Services and controllers must be "registered" using a special syntax so that the entire code base can see them.

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

`this.Server` in Client methods is not supported. As a workaround, you can access your service directly via `Knit.Services.*`

### Complete Example

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
			return Knit.Services.PointsService.GetPoints(player);
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
