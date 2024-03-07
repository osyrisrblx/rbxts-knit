local RunService = game:GetService("RunService")

local exports = {}

if RunService:IsServer() then
	exports.KnitServer = require(script.KnitServer)
else
	script.KnitServer:Destroy()
	exports.KnitClient = require(script.KnitClient)
end

-- hack for backwards compatibility
local Resources = script.Parent
exports.RemoteProperty = require(Resources.Comm.Server.RemoteProperty)
exports.RemoteSignal = require(Resources.Comm.Server.RemoteSignal)
exports.ClientRemoteProperty = require(Resources.Comm.Client.ClientRemoteProperty)
exports.ClientRemoteSignal = require(Resources.Comm.Client.ClientRemoteSignal)
exports.Component = require(Resources.Component)
exports.Option = require(Resources.Option)
exports.Promise = require(Resources.Promise)
exports.Signal = require(Resources.Signal)
exports.Streamable = require(Resources.Streamable.Streamable)
exports.StreamableUtil = require(Resources.Streamable.StreamableUtil)
exports.TableUtil = require(Resources.TableUtil)
exports.Timer = require(Resources.Timer)

return exports

