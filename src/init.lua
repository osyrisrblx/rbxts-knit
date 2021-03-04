local RunService = game:GetService("RunService")

local exports = {}

if RunService:IsServer() then
	exports.KnitServer = require(script.Knit.KnitServer)
else
	script.Knit.KnitServer:Destroy()
	exports.KnitClient = require(script.Knit.KnitClient)
end

exports.RemoteProperty = require(script.Knit.Util.Remote.RemoteProperty)
exports.RemoteSignal = require(script.Knit.Util.Remote.RemoteSignal)
exports.ClientRemoteProperty = require(script.Knit.Util.Remote.ClientRemoteProperty)
exports.ClientRemoteSignal = require(script.Knit.Util.Remote.ClientRemoteSignal)

exports.Component = require(script.Knit.Util.Component)
exports.Loader = require(script.Knit.Util.Loader)
exports.Maid = require(script.Knit.Util.Maid)
exports.Option = require(script.Knit.Util.Option)
exports.Promise = require(script.Knit.Util.Promise)
exports.Ser = require(script.Knit.Util.Ser)
exports.Signal = require(script.Knit.Util.Signal)
exports.Streamable = require(script.Knit.Util.Streamable)
exports.StreamableUtil = require(script.Knit.Util.StreamableUtil)
exports.Symbol = require(script.Knit.Util.Symbol)
exports.TableUtil = require(script.Knit.Util.TableUtil)
exports.Thread = require(script.Knit.Util.Thread)

return exports
