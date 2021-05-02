local RunService = game:GetService("RunService")

local exports = {}

if RunService:IsServer() then
	exports.KnitServer = require(script.KnitServer)
else
	script.KnitServer:Destroy()
	exports.KnitClient = require(script.KnitClient)
end

exports.RemoteProperty = require(script.Util.Remote.RemoteProperty)
exports.RemoteSignal = require(script.Util.Remote.RemoteSignal)
exports.ClientRemoteProperty = require(script.Util.Remote.ClientRemoteProperty)
exports.ClientRemoteSignal = require(script.Util.Remote.ClientRemoteSignal)

exports.Component = require(script.Util.Component)
exports.Loader = require(script.Util.Loader)
exports.Maid = require(script.Util.Maid)
exports.Option = require(script.Util.Option)
exports.Promise = require(script.Util.Promise)
exports.Ser = require(script.Util.Ser)
exports.Signal = require(script.Util.Signal)
exports.Streamable = require(script.Util.Streamable)
exports.StreamableUtil = require(script.Util.StreamableUtil)
exports.Symbol = require(script.Util.Symbol)
exports.TableUtil = require(script.Util.TableUtil)
exports.Thread = require(script.Util.Thread)

return exports
