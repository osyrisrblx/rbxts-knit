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
exports.Maid = require(script.Knit.Util.Maid)
exports.Signal = require(script.Knit.Util.Signal)
exports.Thread = require(script.Knit.Util.Thread)

return exports
