local RunService = game:GetService("RunService")

local Packages = script.Parent.Packages

local exports = {}

if RunService:IsServer() then
	exports.KnitServer = require(Packages.Knit)
else
	script.KnitServer:Destroy()
	exports.KnitClient = require(Packages.Knit)
end

exports.Comm = require(Packages.Comm)
exports.Component = require(Packages.Component)
exports.EnumList = require(Packages.EnumList)
exports.Loader = require(Packages.Loader)
exports.Option = require(Packages.Option)
exports.Promise = require(Packages.Promise) -- TODO
exports.Signal = require(Packages.Signal)
exports.TableUtil = require(Packages.TableUtil)
exports.Timer = require(Packages.Timer)
exports.Trove = require(Packages.Trove)

return exports
