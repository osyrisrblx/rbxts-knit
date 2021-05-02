-- hack to use roblox-ts's copy of roblox-lua-promise

local TS = _G[script.Parent.Parent]
local Promise = TS.Promise

-- Knit modifies roblox-lua-promise to add PascalCase API
Promise.Defer = Promise.defer
Promise.Async = Promise.defer
Promise.Resolve = Promise.resolve
Promise.Reject = Promise.reject
Promise.Try = Promise.try
Promise.All = Promise.all
Promise.Some = Promise.some
Promise.Any = Promise.any
Promise.AllSettled = Promise.allSettled
Promise.Race = Promise.race
Promise.Each = Promise.each
Promise.Is = Promise.is
Promise.Promisify = Promise.promisify
Promise.Delay = Promise.delay
Promise.prototype.Timeout = Promise.prototype.timeout
Promise.prototype.GetStatus = Promise.prototype.getStatus
Promise.prototype.AndThen = Promise.prototype.andThen
Promise.prototype.Then = Promise.prototype.andThen
Promise.prototype.Catch = Promise.prototype.catch
Promise.prototype.Tap = Promise.prototype.tap
Promise.prototype.AndThenCall = Promise.prototype.andThenCall
Promise.prototype.ThenCall = Promise.prototype.andThenCall
Promise.prototype.AndThenReturn = Promise.prototype.andThenReturn
Promise.prototype.ThenReturn = Promise.prototype.andThenReturn
Promise.prototype.Cancel = Promise.prototype.cancel
Promise.prototype.Finally = Promise.prototype.finally
Promise.prototype.FinallyCall = Promise.prototype.finallyCall
Promise.prototype.FinallyReturn = Promise.prototype.finallyReturn
Promise.prototype.Done = Promise.prototype.done
Promise.prototype.DoneCall = Promise.prototype.doneCall
Promise.prototype.DoneReturn = Promise.prototype.doneReturn
Promise.prototype.AwaitStatus = Promise.prototype.awaitStatus
Promise.prototype.Await = Promise.prototype.await
Promise.prototype.Expect = Promise.prototype.expect
Promise.prototype.AwaitValue = Promise.prototype.expect
Promise.prototype.Now = Promise.prototype.now
Promise.Retry = Promise.retry
Promise.FromEvent = Promise.fromEvent

return Promise
