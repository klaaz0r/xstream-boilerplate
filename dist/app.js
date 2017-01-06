/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "9b365c822cc22582bb55"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(184);
	__webpack_require__(182);
	module.exports = __webpack_require__(76);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var symbol_observable_1 = __webpack_require__(178);
	var NO = {};
	exports.NO = NO;
	function noop() { }
	function copy(a) {
	    var l = a.length;
	    var b = Array(l);
	    for (var i = 0; i < l; ++i) {
	        b[i] = a[i];
	    }
	    return b;
	}
	function and(f1, f2) {
	    return function andFn(t) {
	        return f1(t) && f2(t);
	    };
	}
	function _try(c, t, u) {
	    try {
	        return c.f(t);
	    }
	    catch (e) {
	        u._e(e);
	        return NO;
	    }
	}
	var NO_IL = {
	    _n: noop,
	    _e: noop,
	    _c: noop,
	};
	exports.NO_IL = NO_IL;
	// mutates the input
	function internalizeProducer(producer) {
	    producer._start =
	        function _start(il) {
	            il.next = il._n;
	            il.error = il._e;
	            il.complete = il._c;
	            this.start(il);
	        };
	    producer._stop = producer.stop;
	}
	var StreamSub = (function () {
	    function StreamSub(_stream, _listener) {
	        this._stream = _stream;
	        this._listener = _listener;
	    }
	    StreamSub.prototype.unsubscribe = function () {
	        this._stream.removeListener(this._listener);
	    };
	    return StreamSub;
	}());
	var Observer = (function () {
	    function Observer(_listener) {
	        this._listener = _listener;
	    }
	    Observer.prototype.next = function (value) {
	        this._listener._n(value);
	    };
	    Observer.prototype.error = function (err) {
	        this._listener._e(err);
	    };
	    Observer.prototype.complete = function () {
	        this._listener._c();
	    };
	    return Observer;
	}());
	var FromObservable = (function () {
	    function FromObservable(observable) {
	        this.type = 'fromObservable';
	        this.ins = observable;
	        this.active = false;
	    }
	    FromObservable.prototype._start = function (out) {
	        this.out = out;
	        this.active = true;
	        this._sub = this.ins.subscribe(new Observer(out));
	        if (!this.active)
	            this._sub.unsubscribe();
	    };
	    FromObservable.prototype._stop = function () {
	        if (this._sub)
	            this._sub.unsubscribe();
	        this.active = false;
	    };
	    return FromObservable;
	}());
	var Merge = (function () {
	    function Merge(insArr) {
	        this.type = 'merge';
	        this.insArr = insArr;
	        this.out = NO;
	        this.ac = 0;
	    }
	    Merge.prototype._start = function (out) {
	        this.out = out;
	        var s = this.insArr;
	        var L = s.length;
	        this.ac = L;
	        for (var i = 0; i < L; i++) {
	            s[i]._add(this);
	        }
	    };
	    Merge.prototype._stop = function () {
	        var s = this.insArr;
	        var L = s.length;
	        for (var i = 0; i < L; i++) {
	            s[i]._remove(this);
	        }
	        this.out = NO;
	    };
	    Merge.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._n(t);
	    };
	    Merge.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Merge.prototype._c = function () {
	        if (--this.ac <= 0) {
	            var u = this.out;
	            if (u === NO)
	                return;
	            u._c();
	        }
	    };
	    return Merge;
	}());
	var CombineListener = (function () {
	    function CombineListener(i, out, p) {
	        this.i = i;
	        this.out = out;
	        this.p = p;
	        p.ils.push(this);
	    }
	    CombineListener.prototype._n = function (t) {
	        var p = this.p, out = this.out;
	        if (out === NO)
	            return;
	        if (p.up(t, this.i)) {
	            out._n(p.vals);
	        }
	    };
	    CombineListener.prototype._e = function (err) {
	        var out = this.out;
	        if (out === NO)
	            return;
	        out._e(err);
	    };
	    CombineListener.prototype._c = function () {
	        var p = this.p;
	        if (p.out === NO)
	            return;
	        if (--p.Nc === 0) {
	            p.out._c();
	        }
	    };
	    return CombineListener;
	}());
	var Combine = (function () {
	    function Combine(insArr) {
	        this.type = 'combine';
	        this.insArr = insArr;
	        this.out = NO;
	        this.ils = [];
	        this.Nc = this.Nn = 0;
	        this.vals = [];
	    }
	    Combine.prototype.up = function (t, i) {
	        var v = this.vals[i];
	        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
	        this.vals[i] = t;
	        return Nn === 0;
	    };
	    Combine.prototype._start = function (out) {
	        this.out = out;
	        var s = this.insArr;
	        var n = this.Nc = this.Nn = s.length;
	        var vals = this.vals = new Array(n);
	        if (n === 0) {
	            out._n([]);
	            out._c();
	        }
	        else {
	            for (var i = 0; i < n; i++) {
	                vals[i] = NO;
	                s[i]._add(new CombineListener(i, out, this));
	            }
	        }
	    };
	    Combine.prototype._stop = function () {
	        var s = this.insArr;
	        var n = s.length;
	        var ils = this.ils;
	        for (var i = 0; i < n; i++) {
	            s[i]._remove(ils[i]);
	        }
	        this.out = NO;
	        this.ils = [];
	        this.vals = [];
	    };
	    return Combine;
	}());
	var FromArray = (function () {
	    function FromArray(a) {
	        this.type = 'fromArray';
	        this.a = a;
	    }
	    FromArray.prototype._start = function (out) {
	        var a = this.a;
	        for (var i = 0, l = a.length; i < l; i++) {
	            out._n(a[i]);
	        }
	        out._c();
	    };
	    FromArray.prototype._stop = function () {
	    };
	    return FromArray;
	}());
	var FromPromise = (function () {
	    function FromPromise(p) {
	        this.type = 'fromPromise';
	        this.on = false;
	        this.p = p;
	    }
	    FromPromise.prototype._start = function (out) {
	        var prod = this;
	        this.on = true;
	        this.p.then(function (v) {
	            if (prod.on) {
	                out._n(v);
	                out._c();
	            }
	        }, function (e) {
	            out._e(e);
	        }).then(noop, function (err) {
	            setTimeout(function () { throw err; });
	        });
	    };
	    FromPromise.prototype._stop = function () {
	        this.on = false;
	    };
	    return FromPromise;
	}());
	var Periodic = (function () {
	    function Periodic(period) {
	        this.type = 'periodic';
	        this.period = period;
	        this.intervalID = -1;
	        this.i = 0;
	    }
	    Periodic.prototype._start = function (out) {
	        var self = this;
	        function intervalHandler() { out._n(self.i++); }
	        this.intervalID = setInterval(intervalHandler, this.period);
	    };
	    Periodic.prototype._stop = function () {
	        if (this.intervalID !== -1)
	            clearInterval(this.intervalID);
	        this.intervalID = -1;
	        this.i = 0;
	    };
	    return Periodic;
	}());
	var Debug = (function () {
	    function Debug(ins, arg) {
	        this.type = 'debug';
	        this.ins = ins;
	        this.out = NO;
	        this.s = noop;
	        this.l = '';
	        if (typeof arg === 'string') {
	            this.l = arg;
	        }
	        else if (typeof arg === 'function') {
	            this.s = arg;
	        }
	    }
	    Debug.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    Debug.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Debug.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var s = this.s, l = this.l;
	        if (s !== noop) {
	            try {
	                s(t);
	            }
	            catch (e) {
	                u._e(e);
	            }
	        }
	        else if (l) {
	            console.log(l + ':', t);
	        }
	        else {
	            console.log(t);
	        }
	        u._n(t);
	    };
	    Debug.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Debug.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Debug;
	}());
	var Drop = (function () {
	    function Drop(max, ins) {
	        this.type = 'drop';
	        this.ins = ins;
	        this.out = NO;
	        this.max = max;
	        this.dropped = 0;
	    }
	    Drop.prototype._start = function (out) {
	        this.out = out;
	        this.dropped = 0;
	        this.ins._add(this);
	    };
	    Drop.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Drop.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        if (this.dropped++ >= this.max)
	            u._n(t);
	    };
	    Drop.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Drop.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Drop;
	}());
	var EndWhenListener = (function () {
	    function EndWhenListener(out, op) {
	        this.out = out;
	        this.op = op;
	    }
	    EndWhenListener.prototype._n = function () {
	        this.op.end();
	    };
	    EndWhenListener.prototype._e = function (err) {
	        this.out._e(err);
	    };
	    EndWhenListener.prototype._c = function () {
	        this.op.end();
	    };
	    return EndWhenListener;
	}());
	var EndWhen = (function () {
	    function EndWhen(o, ins) {
	        this.type = 'endWhen';
	        this.ins = ins;
	        this.out = NO;
	        this.o = o;
	        this.oil = NO_IL;
	    }
	    EndWhen.prototype._start = function (out) {
	        this.out = out;
	        this.o._add(this.oil = new EndWhenListener(out, this));
	        this.ins._add(this);
	    };
	    EndWhen.prototype._stop = function () {
	        this.ins._remove(this);
	        this.o._remove(this.oil);
	        this.out = NO;
	        this.oil = NO_IL;
	    };
	    EndWhen.prototype.end = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    EndWhen.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._n(t);
	    };
	    EndWhen.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    EndWhen.prototype._c = function () {
	        this.end();
	    };
	    return EndWhen;
	}());
	var Filter = (function () {
	    function Filter(passes, ins) {
	        this.type = 'filter';
	        this.ins = ins;
	        this.out = NO;
	        this.f = passes;
	    }
	    Filter.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    Filter.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Filter.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO || !r)
	            return;
	        u._n(t);
	    };
	    Filter.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Filter.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Filter;
	}());
	var FlattenListener = (function () {
	    function FlattenListener(out, op) {
	        this.out = out;
	        this.op = op;
	    }
	    FlattenListener.prototype._n = function (t) {
	        this.out._n(t);
	    };
	    FlattenListener.prototype._e = function (err) {
	        this.out._e(err);
	    };
	    FlattenListener.prototype._c = function () {
	        this.op.inner = NO;
	        this.op.less();
	    };
	    return FlattenListener;
	}());
	var Flatten = (function () {
	    function Flatten(ins) {
	        this.type = 'flatten';
	        this.ins = ins;
	        this.out = NO;
	        this.open = true;
	        this.inner = NO;
	        this.il = NO_IL;
	    }
	    Flatten.prototype._start = function (out) {
	        this.out = out;
	        this.open = true;
	        this.inner = NO;
	        this.il = NO_IL;
	        this.ins._add(this);
	    };
	    Flatten.prototype._stop = function () {
	        this.ins._remove(this);
	        if (this.inner !== NO)
	            this.inner._remove(this.il);
	        this.out = NO;
	        this.open = true;
	        this.inner = NO;
	        this.il = NO_IL;
	    };
	    Flatten.prototype.less = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        if (!this.open && this.inner === NO)
	            u._c();
	    };
	    Flatten.prototype._n = function (s) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var _a = this, inner = _a.inner, il = _a.il;
	        if (inner !== NO && il !== NO_IL)
	            inner._remove(il);
	        (this.inner = s)._add(this.il = new FlattenListener(u, this));
	    };
	    Flatten.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Flatten.prototype._c = function () {
	        this.open = false;
	        this.less();
	    };
	    return Flatten;
	}());
	var Fold = (function () {
	    function Fold(f, seed, ins) {
	        var _this = this;
	        this.type = 'fold';
	        this.ins = ins;
	        this.out = NO;
	        this.f = function (t) { return f(_this.acc, t); };
	        this.acc = this.seed = seed;
	    }
	    Fold.prototype._start = function (out) {
	        this.out = out;
	        this.acc = this.seed;
	        out._n(this.acc);
	        this.ins._add(this);
	    };
	    Fold.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	        this.acc = this.seed;
	    };
	    Fold.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO)
	            return;
	        u._n(this.acc = r);
	    };
	    Fold.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Fold.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Fold;
	}());
	var Last = (function () {
	    function Last(ins) {
	        this.type = 'last';
	        this.ins = ins;
	        this.out = NO;
	        this.has = false;
	        this.val = NO;
	    }
	    Last.prototype._start = function (out) {
	        this.out = out;
	        this.has = false;
	        this.ins._add(this);
	    };
	    Last.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	        this.val = NO;
	    };
	    Last.prototype._n = function (t) {
	        this.has = true;
	        this.val = t;
	    };
	    Last.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Last.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        if (this.has) {
	            u._n(this.val);
	            u._c();
	        }
	        else {
	            u._e('TODO show proper error');
	        }
	    };
	    return Last;
	}());
	var MapFlattenListener = (function () {
	    function MapFlattenListener(out, op) {
	        this.out = out;
	        this.op = op;
	    }
	    MapFlattenListener.prototype._n = function (r) {
	        this.out._n(r);
	    };
	    MapFlattenListener.prototype._e = function (err) {
	        this.out._e(err);
	    };
	    MapFlattenListener.prototype._c = function () {
	        this.op.inner = NO;
	        this.op.less();
	    };
	    return MapFlattenListener;
	}());
	var MapFlatten = (function () {
	    function MapFlatten(mapOp) {
	        this.type = mapOp.type + "+flatten";
	        this.ins = mapOp.ins;
	        this.out = NO;
	        this.mapOp = mapOp;
	        this.inner = NO;
	        this.il = NO_IL;
	        this.open = true;
	    }
	    MapFlatten.prototype._start = function (out) {
	        this.out = out;
	        this.inner = NO;
	        this.il = NO_IL;
	        this.open = true;
	        this.mapOp.ins._add(this);
	    };
	    MapFlatten.prototype._stop = function () {
	        this.mapOp.ins._remove(this);
	        if (this.inner !== NO)
	            this.inner._remove(this.il);
	        this.out = NO;
	        this.inner = NO;
	        this.il = NO_IL;
	    };
	    MapFlatten.prototype.less = function () {
	        if (!this.open && this.inner === NO) {
	            var u = this.out;
	            if (u === NO)
	                return;
	            u._c();
	        }
	    };
	    MapFlatten.prototype._n = function (v) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var _a = this, inner = _a.inner, il = _a.il;
	        var s = _try(this.mapOp, v, u);
	        if (s === NO)
	            return;
	        if (inner !== NO && il !== NO_IL)
	            inner._remove(il);
	        (this.inner = s)._add(this.il = new MapFlattenListener(u, this));
	    };
	    MapFlatten.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    MapFlatten.prototype._c = function () {
	        this.open = false;
	        this.less();
	    };
	    return MapFlatten;
	}());
	var MapOp = (function () {
	    function MapOp(project, ins) {
	        this.type = 'map';
	        this.ins = ins;
	        this.out = NO;
	        this.f = project;
	    }
	    MapOp.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    MapOp.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    MapOp.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO)
	            return;
	        u._n(r);
	    };
	    MapOp.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    MapOp.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return MapOp;
	}());
	var FilterMapFusion = (function (_super) {
	    __extends(FilterMapFusion, _super);
	    function FilterMapFusion(passes, project, ins) {
	        _super.call(this, project, ins);
	        this.type = 'filter+map';
	        this.passes = passes;
	    }
	    FilterMapFusion.prototype._n = function (t) {
	        if (!this.passes(t))
	            return;
	        var u = this.out;
	        if (u === NO)
	            return;
	        var r = _try(this, t, u);
	        if (r === NO)
	            return;
	        u._n(r);
	    };
	    return FilterMapFusion;
	}(MapOp));
	var Remember = (function () {
	    function Remember(ins) {
	        this.type = 'remember';
	        this.ins = ins;
	        this.out = NO;
	    }
	    Remember.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(out);
	    };
	    Remember.prototype._stop = function () {
	        this.ins._remove(this.out);
	        this.out = NO;
	    };
	    return Remember;
	}());
	var ReplaceError = (function () {
	    function ReplaceError(replacer, ins) {
	        this.type = 'replaceError';
	        this.ins = ins;
	        this.out = NO;
	        this.f = replacer;
	    }
	    ReplaceError.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    ReplaceError.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    ReplaceError.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._n(t);
	    };
	    ReplaceError.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        try {
	            this.ins._remove(this);
	            (this.ins = this.f(err))._add(this);
	        }
	        catch (e) {
	            u._e(e);
	        }
	    };
	    ReplaceError.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return ReplaceError;
	}());
	var StartWith = (function () {
	    function StartWith(ins, val) {
	        this.type = 'startWith';
	        this.ins = ins;
	        this.out = NO;
	        this.val = val;
	    }
	    StartWith.prototype._start = function (out) {
	        this.out = out;
	        this.out._n(this.val);
	        this.ins._add(out);
	    };
	    StartWith.prototype._stop = function () {
	        this.ins._remove(this.out);
	        this.out = NO;
	    };
	    return StartWith;
	}());
	var Take = (function () {
	    function Take(max, ins) {
	        this.type = 'take';
	        this.ins = ins;
	        this.out = NO;
	        this.max = max;
	        this.taken = 0;
	    }
	    Take.prototype._start = function (out) {
	        this.out = out;
	        this.taken = 0;
	        if (this.max <= 0) {
	            out._c();
	        }
	        else {
	            this.ins._add(this);
	        }
	    };
	    Take.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = NO;
	    };
	    Take.prototype._n = function (t) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        var m = ++this.taken;
	        if (m < this.max) {
	            u._n(t);
	        }
	        else if (m === this.max) {
	            u._n(t);
	            u._c();
	        }
	    };
	    Take.prototype._e = function (err) {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._e(err);
	    };
	    Take.prototype._c = function () {
	        var u = this.out;
	        if (u === NO)
	            return;
	        u._c();
	    };
	    return Take;
	}());
	var Stream = (function () {
	    function Stream(producer) {
	        this._prod = producer || NO;
	        this._ils = [];
	        this._stopID = NO;
	        this._dl = NO;
	        this._d = false;
	        this._target = NO;
	        this._err = NO;
	    }
	    Stream.prototype._n = function (t) {
	        var a = this._ils;
	        var L = a.length;
	        if (this._d)
	            this._dl._n(t);
	        if (L == 1)
	            a[0]._n(t);
	        else {
	            var b = copy(a);
	            for (var i = 0; i < L; i++)
	                b[i]._n(t);
	        }
	    };
	    Stream.prototype._e = function (err) {
	        if (this._err !== NO)
	            return;
	        this._err = err;
	        var a = this._ils;
	        var L = a.length;
	        this._x();
	        if (this._d)
	            this._dl._e(err);
	        if (L == 1)
	            a[0]._e(err);
	        else {
	            var b = copy(a);
	            for (var i = 0; i < L; i++)
	                b[i]._e(err);
	        }
	        if (!this._d && L == 0)
	            throw this._err;
	    };
	    Stream.prototype._c = function () {
	        var a = this._ils;
	        var L = a.length;
	        this._x();
	        if (this._d)
	            this._dl._c();
	        if (L == 1)
	            a[0]._c();
	        else {
	            var b = copy(a);
	            for (var i = 0; i < L; i++)
	                b[i]._c();
	        }
	    };
	    Stream.prototype._x = function () {
	        if (this._ils.length === 0)
	            return;
	        if (this._prod !== NO)
	            this._prod._stop();
	        this._err = NO;
	        this._ils = [];
	    };
	    Stream.prototype._stopNow = function () {
	        // WARNING: code that calls this method should
	        // first check if this._prod is valid (not `NO`)
	        this._prod._stop();
	        this._err = NO;
	        this._stopID = NO;
	    };
	    Stream.prototype._add = function (il) {
	        var ta = this._target;
	        if (ta !== NO)
	            return ta._add(il);
	        var a = this._ils;
	        a.push(il);
	        if (a.length > 1)
	            return;
	        if (this._stopID !== NO) {
	            clearTimeout(this._stopID);
	            this._stopID = NO;
	        }
	        else {
	            var p = this._prod;
	            if (p !== NO)
	                p._start(this);
	        }
	    };
	    Stream.prototype._remove = function (il) {
	        var _this = this;
	        var ta = this._target;
	        if (ta !== NO)
	            return ta._remove(il);
	        var a = this._ils;
	        var i = a.indexOf(il);
	        if (i > -1) {
	            a.splice(i, 1);
	            if (this._prod !== NO && a.length <= 0) {
	                this._err = NO;
	                this._stopID = setTimeout(function () { return _this._stopNow(); });
	            }
	            else if (a.length === 1) {
	                this._pruneCycles();
	            }
	        }
	    };
	    // If all paths stemming from `this` stream eventually end at `this`
	    // stream, then we remove the single listener of `this` stream, to
	    // force it to end its execution and dispose resources. This method
	    // assumes as a precondition that this._ils has just one listener.
	    Stream.prototype._pruneCycles = function () {
	        if (this._hasNoSinks(this, [])) {
	            this._remove(this._ils[0]);
	        }
	    };
	    // Checks whether *there is no* path starting from `x` that leads to an end
	    // listener (sink) in the stream graph, following edges A->B where B is a
	    // listener of A. This means these paths constitute a cycle somehow. Is given
	    // a trace of all visited nodes so far.
	    Stream.prototype._hasNoSinks = function (x, trace) {
	        if (trace.indexOf(x) !== -1) {
	            return true;
	        }
	        else if (x.out === this) {
	            return true;
	        }
	        else if (x.out && x.out !== NO) {
	            return this._hasNoSinks(x.out, trace.concat(x));
	        }
	        else if (x._ils) {
	            for (var i = 0, N = x._ils.length; i < N; i++) {
	                if (!this._hasNoSinks(x._ils[i], trace.concat(x))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    Stream.prototype.ctor = function () {
	        return this instanceof MemoryStream ? MemoryStream : Stream;
	    };
	    /**
	     * Adds a Listener to the Stream.
	     *
	     * @param {Listener} listener
	     */
	    Stream.prototype.addListener = function (listener) {
	        listener._n = listener.next || noop;
	        listener._e = listener.error || noop;
	        listener._c = listener.complete || noop;
	        this._add(listener);
	    };
	    /**
	     * Removes a Listener from the Stream, assuming the Listener was added to it.
	     *
	     * @param {Listener<T>} listener
	     */
	    Stream.prototype.removeListener = function (listener) {
	        this._remove(listener);
	    };
	    /**
	     * Adds a Listener to the Stream returning a Subscription to remove that
	     * listener.
	     *
	     * @param {Listener} listener
	     * @returns {Subscription}
	     */
	    Stream.prototype.subscribe = function (listener) {
	        this.addListener(listener);
	        return new StreamSub(this, listener);
	    };
	    /**
	     * Add interop between most.js and RxJS 5
	     *
	     * @returns {Stream}
	     */
	    Stream.prototype[symbol_observable_1.default] = function () {
	        return this;
	    };
	    /**
	     * Creates a new Stream given a Producer.
	     *
	     * @factory true
	     * @param {Producer} producer An optional Producer that dictates how to
	     * start, generate events, and stop the Stream.
	     * @return {Stream}
	     */
	    Stream.create = function (producer) {
	        if (producer) {
	            if (typeof producer.start !== 'function'
	                || typeof producer.stop !== 'function') {
	                throw new Error('producer requires both start and stop functions');
	            }
	            internalizeProducer(producer); // mutates the input
	        }
	        return new Stream(producer);
	    };
	    /**
	     * Creates a new MemoryStream given a Producer.
	     *
	     * @factory true
	     * @param {Producer} producer An optional Producer that dictates how to
	     * start, generate events, and stop the Stream.
	     * @return {MemoryStream}
	     */
	    Stream.createWithMemory = function (producer) {
	        if (producer) {
	            internalizeProducer(producer); // mutates the input
	        }
	        return new MemoryStream(producer);
	    };
	    /**
	     * Creates a Stream that does nothing when started. It never emits any event.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     *          never
	     * -----------------------
	     * ```
	     *
	     * @factory true
	     * @return {Stream}
	     */
	    Stream.never = function () {
	        return new Stream({ _start: noop, _stop: noop });
	    };
	    /**
	     * Creates a Stream that immediately emits the "complete" notification when
	     * started, and that's it.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * empty
	     * -|
	     * ```
	     *
	     * @factory true
	     * @return {Stream}
	     */
	    Stream.empty = function () {
	        return new Stream({
	            _start: function (il) { il._c(); },
	            _stop: noop,
	        });
	    };
	    /**
	     * Creates a Stream that immediately emits an "error" notification with the
	     * value you passed as the `error` argument when the stream starts, and that's
	     * it.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * throw(X)
	     * -X
	     * ```
	     *
	     * @factory true
	     * @param error The error event to emit on the created stream.
	     * @return {Stream}
	     */
	    Stream.throw = function (error) {
	        return new Stream({
	            _start: function (il) { il._e(error); },
	            _stop: noop,
	        });
	    };
	    /**
	     * Creates a stream from an Array, Promise, or an Observable.
	     *
	     * @factory true
	     * @param {Array|Promise|Observable} input The input to make a stream from.
	     * @return {Stream}
	     */
	    Stream.from = function (input) {
	        if (typeof input[symbol_observable_1.default] === 'function') {
	            return Stream.fromObservable(input);
	        }
	        else if (typeof input.then === 'function') {
	            return Stream.fromPromise(input);
	        }
	        else if (Array.isArray(input)) {
	            return Stream.fromArray(input);
	        }
	        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
	    };
	    /**
	     * Creates a Stream that immediately emits the arguments that you give to
	     * *of*, then completes.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * of(1,2,3)
	     * 123|
	     * ```
	     *
	     * @factory true
	     * @param a The first value you want to emit as an event on the stream.
	     * @param b The second value you want to emit as an event on the stream. One
	     * or more of these values may be given as arguments.
	     * @return {Stream}
	     */
	    Stream.of = function () {
	        var items = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            items[_i - 0] = arguments[_i];
	        }
	        return Stream.fromArray(items);
	    };
	    /**
	     * Converts an array to a stream. The returned stream will emit synchronously
	     * all the items in the array, and then complete.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * fromArray([1,2,3])
	     * 123|
	     * ```
	     *
	     * @factory true
	     * @param {Array} array The array to be converted as a stream.
	     * @return {Stream}
	     */
	    Stream.fromArray = function (array) {
	        return new Stream(new FromArray(array));
	    };
	    /**
	     * Converts a promise to a stream. The returned stream will emit the resolved
	     * value of the promise, and then complete. However, if the promise is
	     * rejected, the stream will emit the corresponding error.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * fromPromise( ----42 )
	     * -----------------42|
	     * ```
	     *
	     * @factory true
	     * @param {Promise} promise The promise to be converted as a stream.
	     * @return {Stream}
	     */
	    Stream.fromPromise = function (promise) {
	        return new Stream(new FromPromise(promise));
	    };
	    /**
	     * Converts an Observable into a Stream.
	     *
	     * @factory true
	     * @param {any} observable The observable to be converted as a stream.
	     * @return {Stream}
	     */
	    Stream.fromObservable = function (observable) {
	        return new Stream(new FromObservable(observable));
	    };
	    /**
	     * Creates a stream that periodically emits incremental numbers, every
	     * `period` milliseconds.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     *     periodic(1000)
	     * ---0---1---2---3---4---...
	     * ```
	     *
	     * @factory true
	     * @param {number} period The interval in milliseconds to use as a rate of
	     * emission.
	     * @return {Stream}
	     */
	    Stream.periodic = function (period) {
	        return new Stream(new Periodic(period));
	    };
	    Stream.prototype._map = function (project) {
	        var p = this._prod;
	        var ctor = this.ctor();
	        if (p instanceof Filter) {
	            return new ctor(new FilterMapFusion(p.f, project, p.ins));
	        }
	        return new ctor(new MapOp(project, this));
	    };
	    /**
	     * Transforms each event from the input Stream through a `project` function,
	     * to get a Stream that emits those transformed events.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---3--5-----7------
	     *    map(i => i * 10)
	     * --10--30-50----70-----
	     * ```
	     *
	     * @param {Function} project A function of type `(t: T) => U` that takes event
	     * `t` of type `T` from the input Stream and produces an event of type `U`, to
	     * be emitted on the output Stream.
	     * @return {Stream}
	     */
	    Stream.prototype.map = function (project) {
	        return this._map(project);
	    };
	    /**
	     * It's like `map`, but transforms each input event to always the same
	     * constant value on the output Stream.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---3--5-----7-----
	     *       mapTo(10)
	     * --10--10-10----10----
	     * ```
	     *
	     * @param projectedValue A value to emit on the output Stream whenever the
	     * input Stream emits any value.
	     * @return {Stream}
	     */
	    Stream.prototype.mapTo = function (projectedValue) {
	        var s = this.map(function () { return projectedValue; });
	        var op = s._prod;
	        op.type = op.type.replace('map', 'mapTo');
	        return s;
	    };
	    /**
	     * Only allows events that pass the test given by the `passes` argument.
	     *
	     * Each event from the input stream is given to the `passes` function. If the
	     * function returns `true`, the event is forwarded to the output stream,
	     * otherwise it is ignored and not forwarded.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---2--3-----4-----5---6--7-8--
	     *     filter(i => i % 2 === 0)
	     * ------2--------4---------6----8--
	     * ```
	     *
	     * @param {Function} passes A function of type `(t: T) +> boolean` that takes
	     * an event from the input stream and checks if it passes, by returning a
	     * boolean.
	     * @return {Stream}
	     */
	    Stream.prototype.filter = function (passes) {
	        var p = this._prod;
	        if (p instanceof Filter) {
	            return new Stream(new Filter(and(p.f, passes), p.ins));
	        }
	        return new Stream(new Filter(passes, this));
	    };
	    /**
	     * Lets the first `amount` many events from the input stream pass to the
	     * output stream, then makes the output stream complete.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --a---b--c----d---e--
	     *    take(3)
	     * --a---b--c|
	     * ```
	     *
	     * @param {number} amount How many events to allow from the input stream
	     * before completing the output stream.
	     * @return {Stream}
	     */
	    Stream.prototype.take = function (amount) {
	        return new (this.ctor())(new Take(amount, this));
	    };
	    /**
	     * Ignores the first `amount` many events from the input stream, and then
	     * after that starts forwarding events from the input stream to the output
	     * stream.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --a---b--c----d---e--
	     *       drop(3)
	     * --------------d---e--
	     * ```
	     *
	     * @param {number} amount How many events to ignore from the input stream
	     * before forwarding all events from the input stream to the output stream.
	     * @return {Stream}
	     */
	    Stream.prototype.drop = function (amount) {
	        return new Stream(new Drop(amount, this));
	    };
	    /**
	     * When the input stream completes, the output stream will emit the last event
	     * emitted by the input stream, and then will also complete.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --a---b--c--d----|
	     *       last()
	     * -----------------d|
	     * ```
	     *
	     * @return {Stream}
	     */
	    Stream.prototype.last = function () {
	        return new Stream(new Last(this));
	    };
	    /**
	     * Prepends the given `initial` value to the sequence of events emitted by the
	     * input stream. The returned stream is a MemoryStream, which means it is
	     * already `remember()`'d.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * ---1---2-----3---
	     *   startWith(0)
	     * 0--1---2-----3---
	     * ```
	     *
	     * @param initial The value or event to prepend.
	     * @return {MemoryStream}
	     */
	    Stream.prototype.startWith = function (initial) {
	        return new MemoryStream(new StartWith(this, initial));
	    };
	    /**
	     * Uses another stream to determine when to complete the current stream.
	     *
	     * When the given `other` stream emits an event or completes, the output
	     * stream will complete. Before that happens, the output stream will behaves
	     * like the input stream.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * ---1---2-----3--4----5----6---
	     *   endWhen( --------a--b--| )
	     * ---1---2-----3--4--|
	     * ```
	     *
	     * @param other Some other stream that is used to know when should the output
	     * stream of this operator complete.
	     * @return {Stream}
	     */
	    Stream.prototype.endWhen = function (other) {
	        return new (this.ctor())(new EndWhen(other, this));
	    };
	    /**
	     * "Folds" the stream onto itself.
	     *
	     * Combines events from the past throughout
	     * the entire execution of the input stream, allowing you to accumulate them
	     * together. It's essentially like `Array.prototype.reduce`. The returned
	     * stream is a MemoryStream, which means it is already `remember()`'d.
	     *
	     * The output stream starts by emitting the `seed` which you give as argument.
	     * Then, when an event happens on the input stream, it is combined with that
	     * seed value through the `accumulate` function, and the output value is
	     * emitted on the output stream. `fold` remembers that output value as `acc`
	     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
	     * combined with that to produce the new `acc` and so forth.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * ------1-----1--2----1----1------
	     *   fold((acc, x) => acc + x, 3)
	     * 3-----4-----5--7----8----9------
	     * ```
	     *
	     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
	     * takes the previous accumulated value `acc` and the incoming event from the
	     * input stream and produces the new accumulated value.
	     * @param seed The initial accumulated value, of type `R`.
	     * @return {MemoryStream}
	     */
	    Stream.prototype.fold = function (accumulate, seed) {
	        return new MemoryStream(new Fold(accumulate, seed, this));
	    };
	    /**
	     * Replaces an error with another stream.
	     *
	     * When (and if) an error happens on the input stream, instead of forwarding
	     * that error to the output stream, *replaceError* will call the `replace`
	     * function which returns the stream that the output stream will replicate.
	     * And, in case that new stream also emits an error, `replace` will be called
	     * again to get another stream to start replicating.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1---2-----3--4-----X
	     *   replaceError( () => --10--| )
	     * --1---2-----3--4--------10--|
	     * ```
	     *
	     * @param {Function} replace A function of type `(err) => Stream` that takes
	     * the error that occurred on the input stream or on the previous replacement
	     * stream and returns a new stream. The output stream will behave like the
	     * stream that this function returns.
	     * @return {Stream}
	     */
	    Stream.prototype.replaceError = function (replace) {
	        return new (this.ctor())(new ReplaceError(replace, this));
	    };
	    /**
	     * Flattens a "stream of streams", handling only one nested stream at a time
	     * (no concurrency).
	     *
	     * If the input stream is a stream that emits streams, then this operator will
	     * return an output stream which is a flat stream: emits regular events. The
	     * flattening happens without concurrency. It works like this: when the input
	     * stream emits a nested stream, *flatten* will start imitating that nested
	     * one. However, as soon as the next nested stream is emitted on the input
	     * stream, *flatten* will forget the previous nested one it was imitating, and
	     * will start imitating the new nested one.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --+--------+---------------
	     *   \        \
	     *    \       ----1----2---3--
	     *    --a--b----c----d--------
	     *           flatten
	     * -----a--b------1----2---3--
	     * ```
	     *
	     * @return {Stream}
	     */
	    Stream.prototype.flatten = function () {
	        var p = this._prod;
	        return new Stream(p instanceof MapOp && !(p instanceof FilterMapFusion) ?
	            new MapFlatten(p) :
	            new Flatten(this));
	    };
	    /**
	     * Passes the input stream to a custom operator, to produce an output stream.
	     *
	     * *compose* is a handy way of using an existing function in a chained style.
	     * Instead of writing `outStream = f(inStream)` you can write
	     * `outStream = inStream.compose(f)`.
	     *
	     * @param {function} operator A function that takes a stream as input and
	     * returns a stream as well.
	     * @return {Stream}
	     */
	    Stream.prototype.compose = function (operator) {
	        return operator(this);
	    };
	    /**
	     * Returns an output stream that behaves like the input stream, but also
	     * remembers the most recent event that happens on the input stream, so that a
	     * newly added listener will immediately receive that memorised event.
	     *
	     * @return {MemoryStream}
	     */
	    Stream.prototype.remember = function () {
	        return new MemoryStream(new Remember(this));
	    };
	    /**
	     * Returns an output stream that identically behaves like the input stream,
	     * but also runs a `spy` function fo each event, to help you debug your app.
	     *
	     * *debug* takes a `spy` function as argument, and runs that for each event
	     * happening on the input stream. If you don't provide the `spy` argument,
	     * then *debug* will just `console.log` each event. This helps you to
	     * understand the flow of events through some operator chain.
	     *
	     * Please note that if the output stream has no listeners, then it will not
	     * start, which means `spy` will never run because no actual event happens in
	     * that case.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1----2-----3-----4--
	     *         debug
	     * --1----2-----3-----4--
	     * ```
	     *
	     * @param {function} labelOrSpy A string to use as the label when printing
	     * debug information on the console, or a 'spy' function that takes an event
	     * as argument, and does not need to return anything.
	     * @return {Stream}
	     */
	    Stream.prototype.debug = function (labelOrSpy) {
	        return new (this.ctor())(new Debug(this, labelOrSpy));
	    };
	    /**
	     * *imitate* changes this current Stream to emit the same events that the
	     * `other` given Stream does. This method returns nothing.
	     *
	     * This method exists to allow one thing: **circular dependency of streams**.
	     * For instance, let's imagine that for some reason you need to create a
	     * circular dependency where stream `first$` depends on stream `second$`
	     * which in turn depends on `first$`:
	     *
	     * <!-- skip-example -->
	     * ```js
	     * import delay from 'xstream/extra/delay'
	     *
	     * var first$ = second$.map(x => x * 10).take(3);
	     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
	     * ```
	     *
	     * However, that is invalid JavaScript, because `second$` is undefined
	     * on the first line. This is how *imitate* can help solve it:
	     *
	     * ```js
	     * import delay from 'xstream/extra/delay'
	     *
	     * var secondProxy$ = xs.create();
	     * var first$ = secondProxy$.map(x => x * 10).take(3);
	     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
	     * secondProxy$.imitate(second$);
	     * ```
	     *
	     * We create `secondProxy$` before the others, so it can be used in the
	     * declaration of `first$`. Then, after both `first$` and `second$` are
	     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
	     * that they are "the same". `imitate` will not trigger the start of any
	     * stream, it just binds `secondProxy$` and `second$` together.
	     *
	     * The following is an example where `imitate()` is important in Cycle.js
	     * applications. A parent component contains some child components. A child
	     * has an action stream which is given to the parent to define its state:
	     *
	     * <!-- skip-example -->
	     * ```js
	     * const childActionProxy$ = xs.create();
	     * const parent = Parent({...sources, childAction$: childActionProxy$});
	     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
	     * childActionProxy$.imitate(childAction$);
	     * ```
	     *
	     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
	     * would attempt to imitate a MemoryStream in a circular dependency, we would
	     * either get a race condition (where the symptom would be "nothing happens")
	     * or an infinite cyclic emission of values. It's useful to think about
	     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
	     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
	     * cell `B1` defined with a formula that depends on `A1`.
	     *
	     * If you find yourself wanting to use `imitate()` with a
	     * MemoryStream, you should rework your code around `imitate()` to use a
	     * Stream instead. Look for the stream in the circular dependency that
	     * represents an event stream, and that would be a candidate for creating a
	     * proxy Stream which then imitates the target Stream.
	     *
	     * @param {Stream} target The other stream to imitate on the current one. Must
	     * not be a MemoryStream.
	     */
	    Stream.prototype.imitate = function (target) {
	        if (target instanceof MemoryStream) {
	            throw new Error('A MemoryStream was given to imitate(), but it only ' +
	                'supports a Stream. Read more about this restriction here: ' +
	                'https://github.com/staltz/xstream#faq');
	        }
	        this._target = target;
	        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++) {
	            target._add(ils[i]);
	        }
	        this._ils = [];
	    };
	    /**
	     * Forces the Stream to emit the given value to its listeners.
	     *
	     * As the name indicates, if you use this, you are most likely doing something
	     * The Wrong Way. Please try to understand the reactive way before using this
	     * method. Use it only when you know what you are doing.
	     *
	     * @param value The "next" value you want to broadcast to all listeners of
	     * this Stream.
	     */
	    Stream.prototype.shamefullySendNext = function (value) {
	        this._n(value);
	    };
	    /**
	     * Forces the Stream to emit the given error to its listeners.
	     *
	     * As the name indicates, if you use this, you are most likely doing something
	     * The Wrong Way. Please try to understand the reactive way before using this
	     * method. Use it only when you know what you are doing.
	     *
	     * @param {any} error The error you want to broadcast to all the listeners of
	     * this Stream.
	     */
	    Stream.prototype.shamefullySendError = function (error) {
	        this._e(error);
	    };
	    /**
	     * Forces the Stream to emit the "completed" event to its listeners.
	     *
	     * As the name indicates, if you use this, you are most likely doing something
	     * The Wrong Way. Please try to understand the reactive way before using this
	     * method. Use it only when you know what you are doing.
	     */
	    Stream.prototype.shamefullySendComplete = function () {
	        this._c();
	    };
	    /**
	     * Adds a "debug" listener to the stream. There can only be one debug
	     * listener, that's why this is 'setDebugListener'. To remove the debug
	     * listener, just call setDebugListener(null).
	     *
	     * A debug listener is like any other listener. The only difference is that a
	     * debug listener is "stealthy": its presence/absence does not trigger the
	     * start/stop of the stream (or the producer inside the stream). This is
	     * useful so you can inspect what is going on without changing the behavior
	     * of the program. If you have an idle stream and you add a normal listener to
	     * it, the stream will start executing. But if you set a debug listener on an
	     * idle stream, it won't start executing (not until the first normal listener
	     * is added).
	     *
	     * As the name indicates, we don't recommend using this method to build app
	     * logic. In fact, in most cases the debug operator works just fine. Only use
	     * this one if you know what you're doing.
	     *
	     * @param {Listener<T>} listener
	     */
	    Stream.prototype.setDebugListener = function (listener) {
	        if (!listener) {
	            this._d = false;
	            this._dl = NO;
	        }
	        else {
	            this._d = true;
	            listener._n = listener.next || noop;
	            listener._e = listener.error || noop;
	            listener._c = listener.complete || noop;
	            this._dl = listener;
	        }
	    };
	    /**
	     * Blends multiple streams together, emitting events from all of them
	     * concurrently.
	     *
	     * *merge* takes multiple streams as arguments, and creates a stream that
	     * behaves like each of the argument streams, in parallel.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1----2-----3--------4---
	     * ----a-----b----c---d------
	     *            merge
	     * --1-a--2--b--3-c---d--4---
	     * ```
	     *
	     * @factory true
	     * @param {Stream} stream1 A stream to merge together with other streams.
	     * @param {Stream} stream2 A stream to merge together with other streams. Two
	     * or more streams may be given as arguments.
	     * @return {Stream}
	     */
	    Stream.merge = function merge() {
	        var streams = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            streams[_i - 0] = arguments[_i];
	        }
	        return new Stream(new Merge(streams));
	    };
	    /**
	     * Combines multiple input streams together to return a stream whose events
	     * are arrays that collect the latest events from each input stream.
	     *
	     * *combine* internally remembers the most recent event from each of the input
	     * streams. When any of the input streams emits an event, that event together
	     * with all the other saved events are combined into an array. That array will
	     * be emitted on the output stream. It's essentially a way of joining together
	     * the events from multiple streams.
	     *
	     * Marble diagram:
	     *
	     * ```text
	     * --1----2-----3--------4---
	     * ----a-----b-----c--d------
	     *          combine
	     * ----1a-2a-2b-3b-3c-3d-4d--
	     * ```
	     *
	     * Note: to minimize garbage collection, *combine* uses the same array
	     * instance for each emission.  If you need to compare emissions over time,
	     * cache the values with `map` first:
	     *
	     * ```js
	     * import pairwise from 'xstream/extra/pairwise'
	     *
	     * const stream1 = xs.of(1);
	     * const stream2 = xs.of(2);
	     *
	     * xs.combine(stream1, stream2).map(
	     *   combinedEmissions => ([ ...combinedEmissions ])
	     * ).compose(pairwise)
	     * ```
	     *
	     * @factory true
	     * @param {Stream} stream1 A stream to combine together with other streams.
	     * @param {Stream} stream2 A stream to combine together with other streams.
	     * Multiple streams, not just two, may be given as arguments.
	     * @return {Stream}
	     */
	    Stream.combine = function combine() {
	        var streams = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            streams[_i - 0] = arguments[_i];
	        }
	        return new Stream(new Combine(streams));
	    };
	    return Stream;
	}());
	exports.Stream = Stream;
	var MemoryStream = (function (_super) {
	    __extends(MemoryStream, _super);
	    function MemoryStream(producer) {
	        _super.call(this, producer);
	        this._has = false;
	    }
	    MemoryStream.prototype._n = function (x) {
	        this._v = x;
	        this._has = true;
	        _super.prototype._n.call(this, x);
	    };
	    MemoryStream.prototype._add = function (il) {
	        var ta = this._target;
	        if (ta !== NO)
	            return ta._add(il);
	        var a = this._ils;
	        a.push(il);
	        if (a.length > 1) {
	            if (this._has)
	                il._n(this._v);
	            return;
	        }
	        if (this._stopID !== NO) {
	            if (this._has)
	                il._n(this._v);
	            clearTimeout(this._stopID);
	            this._stopID = NO;
	        }
	        else if (this._has)
	            il._n(this._v);
	        else {
	            var p = this._prod;
	            if (p !== NO)
	                p._start(this);
	        }
	    };
	    MemoryStream.prototype._stopNow = function () {
	        this._has = false;
	        _super.prototype._stopNow.call(this);
	    };
	    MemoryStream.prototype._x = function () {
	        this._has = false;
	        _super.prototype._x.call(this);
	    };
	    MemoryStream.prototype.map = function (project) {
	        return this._map(project);
	    };
	    MemoryStream.prototype.mapTo = function (projectedValue) {
	        return _super.prototype.mapTo.call(this, projectedValue);
	    };
	    MemoryStream.prototype.take = function (amount) {
	        return _super.prototype.take.call(this, amount);
	    };
	    MemoryStream.prototype.endWhen = function (other) {
	        return _super.prototype.endWhen.call(this, other);
	    };
	    MemoryStream.prototype.replaceError = function (replace) {
	        return _super.prototype.replaceError.call(this, replace);
	    };
	    MemoryStream.prototype.remember = function () {
	        return this;
	    };
	    MemoryStream.prototype.debug = function (labelOrSpy) {
	        return _super.prototype.debug.call(this, labelOrSpy);
	    };
	    return MemoryStream;
	}(Stream));
	exports.MemoryStream = MemoryStream;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Stream;
	//# sourceMappingURL=index.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(1);
	var XStreamAdapter = {
	    adapt: function (originStream, originStreamSubscribe) {
	        if (XStreamAdapter.isValidStream(originStream)) {
	            return originStream;
	        }
	        ;
	        var dispose = null;
	        return xstream_1.default.create({
	            start: function (out) {
	                var observer = out;
	                dispose = originStreamSubscribe(originStream, observer);
	            },
	            stop: function () {
	                if (typeof dispose === 'function') {
	                    dispose();
	                }
	            },
	        });
	    },
	    makeSubject: function () {
	        var stream = xstream_1.default.create();
	        var observer = {
	            next: function (x) { stream.shamefullySendNext(x); },
	            error: function (err) { stream.shamefullySendError(err); },
	            complete: function () { stream.shamefullySendComplete(); },
	        };
	        return { observer: observer, stream: stream };
	    },
	    remember: function (stream) {
	        return stream.remember();
	    },
	    isValidStream: function (stream) {
	        return (typeof stream.addListener === 'function' &&
	            typeof stream.shamefullySendNext === 'function');
	    },
	    streamSubscribe: function (stream, observer) {
	        stream.addListener(observer);
	        return function () { return stream.removeListener(observer); };
	    },
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = XStreamAdapter;
	//# sourceMappingURL=index.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.createPath = exports.parsePath = exports.getQueryStringValueFromPath = exports.stripQueryStringValueFromPath = exports.addQueryStringValueToPath = undefined;

	var _warning = __webpack_require__(9);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var addQueryStringValueToPath = exports.addQueryStringValueToPath = function addQueryStringValueToPath(path, key, value) {
	  var _parsePath = parsePath(path);

	  var pathname = _parsePath.pathname;
	  var search = _parsePath.search;
	  var hash = _parsePath.hash;


	  return createPath({
	    pathname: pathname,
	    search: search + (search.indexOf('?') === -1 ? '?' : '&') + key + '=' + value,
	    hash: hash
	  });
	};

	var stripQueryStringValueFromPath = exports.stripQueryStringValueFromPath = function stripQueryStringValueFromPath(path, key) {
	  var _parsePath2 = parsePath(path);

	  var pathname = _parsePath2.pathname;
	  var search = _parsePath2.search;
	  var hash = _parsePath2.hash;


	  return createPath({
	    pathname: pathname,
	    search: search.replace(new RegExp('([?&])' + key + '=[a-zA-Z0-9]+(&?)'), function (match, prefix, suffix) {
	      return prefix === '?' ? prefix : suffix;
	    }),
	    hash: hash
	  });
	};

	var getQueryStringValueFromPath = exports.getQueryStringValueFromPath = function getQueryStringValueFromPath(path, key) {
	  var _parsePath3 = parsePath(path);

	  var search = _parsePath3.search;

	  var match = search.match(new RegExp('[?&]' + key + '=([a-zA-Z0-9]+)'));
	  return match && match[1];
	};

	var extractPath = function extractPath(string) {
	  var match = string.match(/^(https?:)?\/\/[^\/]*/);
	  return match == null ? string : string.substring(match[0].length);
	};

	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(path === pathname, 'A path must be pathname + search + hash only, not a full URL like "%s"', path) : void 0;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	};

	var createPath = exports.createPath = function createPath(location) {
	  if (location == null || typeof location === 'string') return location;

	  var basename = location.basename;
	  var pathname = location.pathname;
	  var search = location.search;
	  var hash = location.hash;

	  var path = (basename || '') + pathname;

	  if (search && search !== '?') path += search;

	  if (hash) path += hash;

	  return path;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign        = __webpack_require__(23)
	  , normalizeOpts = __webpack_require__(106)
	  , isCallable    = __webpack_require__(100)
	  , contains      = __webpack_require__(41)

	  , d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.locationsAreEqual = exports.statesAreEqual = exports.createLocation = exports.createQuery = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(14);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _warning = __webpack_require__(9);

	var _warning2 = _interopRequireDefault(_warning);

	var _PathUtils = __webpack_require__(5);

	var _Actions = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createQuery = exports.createQuery = function createQuery(props) {
	  return _extends(Object.create(null), props);
	};

	var createLocation = exports.createLocation = function createLocation() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var object = typeof input === 'string' ? (0, _PathUtils.parsePath)(input) : input;

	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!object.path, 'Location descriptor objects should have a `pathname`, not a `path`.') : void 0;

	  var pathname = object.pathname || '/';
	  var search = object.search || '';
	  var hash = object.hash || '';
	  var state = object.state;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	};

	var isDate = function isDate(object) {
	  return Object.prototype.toString.call(object) === '[object Date]';
	};

	var statesAreEqual = exports.statesAreEqual = function statesAreEqual(a, b) {
	  if (a === b) return true;

	  var typeofA = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var typeofB = typeof b === 'undefined' ? 'undefined' : _typeof(b);

	  if (typeofA !== typeofB) return false;

	  !(typeofA !== 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store functions in location state') : (0, _invariant2.default)(false) : void 0;

	  // Not the same object, but same type.
	  if (typeofA === 'object') {
	    !!(isDate(a) && isDate(b)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You must not store Date objects in location state') : (0, _invariant2.default)(false) : void 0;

	    if (!Array.isArray(a)) {
	      var keysofA = Object.keys(a);
	      var keysofB = Object.keys(b);
	      return keysofA.length === keysofB.length && keysofA.every(function (key) {
	        return statesAreEqual(a[key], b[key]);
	      });
	    }

	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return statesAreEqual(item, b[index]);
	    });
	  }

	  // All other serializable types (string, number, boolean)
	  // should be strict equal.
	  return false;
	};

	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.key === b.key &&
	  // a.action === b.action && // Different action !== location change.
	  a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && statesAreEqual(a.state, b.state);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	function isElement(obj) {
	    return typeof HTMLElement === "object" ?
	        obj instanceof HTMLElement || obj instanceof DocumentFragment :
	        obj && typeof obj === "object" && obj !== null &&
	            (obj.nodeType === 1 || obj.nodeType === 11) &&
	            typeof obj.nodeName === "string";
	}
	exports.SCOPE_PREFIX = "$$CYCLEDOM$$-";
	function getElement(selectors) {
	    var domElement = (typeof selectors === "string" ?
	        document.querySelector(selectors) :
	        selectors);
	    if (typeof selectors === "string" && domElement === null) {
	        throw new Error("Cannot render into unknown element `" + selectors + "`");
	    }
	    else if (!isElement(domElement)) {
	        throw new Error("Given container is not a DOM element neither a " +
	            "selector string.");
	    }
	    return domElement;
	}
	exports.getElement = getElement;
	function getScope(namespace) {
	    return namespace
	        .filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) > -1; })
	        .slice(-1) // only need the latest, most specific, isolated boundary
	        .join("");
	}
	exports.getScope = getScope;
	function getSelectors(namespace) {
	    return namespace.filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) === -1; }).join(" ");
	}
	exports.getSelectors = getSelectors;
	//# sourceMappingURL=utils.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(81)

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(121)() ? Symbol : __webpack_require__(123);


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};

	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;

	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

	  return window.history && 'pushState' in window.history;
	};

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};

	/**
	 * Returns true if browser fires popstate on hash change.
	 * IE10 and IE11 do not.
	 */
	var supportsPopstateOnHashchange = exports.supportsPopstateOnHashchange = function supportsPopstateOnHashchange() {
	  return window.navigator.userAgent.indexOf('Trident') === -1;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var thunk = __webpack_require__(173);
	exports.thunk = thunk;
	/**
	 * A factory for the DOM driver function.
	 *
	 * Takes a `container` to define the target on the existing DOM which this
	 * driver will operate on, and an `options` object as the second argument. The
	 * input to this driver is a stream of virtual DOM objects, or in other words,
	 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
	 * collection of Observables queried with the methods `select()` and `events()`.
	 *
	 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
	 * the element(s) that matches the CSS `selector` given.
	 *
	 * `DOMSource.events(eventType, options)` returns a stream of events of
	 * `eventType` happening on the elements that match the current DOMSource. The
	 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
	 * your app with this driver, or it is an RxJS Observable if you use
	 * `@cycle/rxjs-run`, and so forth. The `options` parameter can have the field
	 * `useCapture`, which is by default `false`, except it is `true` for event
	 * types that do not bubble. Read more here
	 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
	 * about the `useCapture` and its purpose.
	 *
	 * `DOMSource.elements()` returns a stream of the DOM element(s) matched by the
	 * selectors in the DOMSource. Also, `DOMSource.select(':root').elements()`
	 * returns a stream of DOM element corresponding to the root (or container) of
	 * the app on the DOM.
	 *
	 * @param {(String|HTMLElement)} container the DOM selector for the element
	 * (or the element itself) to contain the rendering of the VTrees.
	 * @param {DOMDriverOptions} options an object with two optional fields:
	 * `transposition: boolean` enables/disables transposition of inner streams in
	 * the virtual DOM tree, `modules: array` contains additional Snabbdom modules.
	 * @return {Function} the DOM driver function. The function expects a stream of
	 * of VNode as input, and outputs the DOMSource object.
	 * @function makeDOMDriver
	 */
	var makeDOMDriver_1 = __webpack_require__(64);
	exports.makeDOMDriver = makeDOMDriver_1.makeDOMDriver;
	/**
	 * A factory for the HTML driver function.
	 *
	 * Takes an `effect` callback function and an `options` object as arguments. The
	 * input to this driver is a stream of virtual DOM objects, or in other words,
	 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
	 * collection of Observables queried with the methods `select()` and `events()`.
	 *
	 * The HTML Driver is supplementary to the DOM Driver. Instead of producing
	 * elements on the DOM, it generates HTML as strings and does a side effect on
	 * those HTML strings. That side effect is described by the `effect` callback
	 * function. So, if you want to use the HTML Driver on the server-side to render
	 * your application as HTML and send as a response (which is the typical use
	 * case for the HTML Driver), you need to pass something like the
	 * `html => response.send(html)` function as the `effect` argument. This way,
	 * the driver knows what side effect to cause based on the HTML string it just
	 * rendered.
	 *
	 * The HTML driver is useful only for that side effect in the `effect` callback.
	 * It can be considered a sink-only driver. However, in order to serve as a
	 * transparent replacement to the DOM Driver when rendering from the server, the
	 * HTML driver returns a source object that behaves just like the DOMSource.
	 * This helps reuse the same application that is written for the DOM Driver.
	 * This fake DOMSource returns empty streams when you query it, because there
	 * are no user events on the server.
	 *
	 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
	 * the element(s) that matches the CSS `selector` given.
	 *
	 * `DOMSource.events(eventType, options)` returns an empty stream. The returned
	 * stream is an *xstream* Stream if you use `@cycle/xstream-run` to run your app
	 * with this driver, or it is an RxJS Observable if you use `@cycle/rxjs-run`,
	 * and so forth.
	 *
	 * `DOMSource.elements()` returns the stream of HTML string rendered from your
	 * sink virtual DOM stream.
	 *
	 * @param {Function} effect a callback function that takes a string of rendered
	 * HTML as input and should run a side effect, returning nothing.
	 * @param {HTMLDriverOptions} options an object with one optional field:
	 * `transposition: boolean` enables/disables transposition of inner streams in
	 * the virtual DOM tree.
	 * @return {Function} the HTML driver function. The function expects a stream of
	 * of VNode as input, and outputs the DOMSource object.
	 * @function makeHTMLDriver
	 */
	var makeHTMLDriver_1 = __webpack_require__(65);
	exports.makeHTMLDriver = makeHTMLDriver_1.makeHTMLDriver;
	/**
	 * A factory function to create mocked DOMSource objects, for testing purposes.
	 *
	 * Takes a `streamAdapter` and a `mockConfig` object as arguments, and returns
	 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
	 * the sources, for testing.
	 *
	 * The `streamAdapter` parameter is a package such as `@cycle/xstream-adapter`,
	 * `@cycle/rxjs-adapter`, etc. Import it as `import a from '@cycle/rx-adapter`,
	 * then provide it to `mockDOMSource. This is important so the DOMSource created
	 * knows which stream library should it use to export its streams when you call
	 * `DOMSource.events()` for instance.
	 *
	 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
	 * their streams. Example:
	 *
	 * ```js
	 * const domSource = mockDOMSource(RxAdapter, {
	 *   '.foo': {
	 *     'click': Rx.Observable.of({target: {}}),
	 *     'mouseover': Rx.Observable.of({target: {}}),
	 *   },
	 *   '.bar': {
	 *     'scroll': Rx.Observable.of({target: {}}),
	 *     elements: Rx.Observable.of({tagName: 'div'}),
	 *   }
	 * });
	 *
	 * // Usage
	 * const click$ = domSource.select('.foo').events('click');
	 * const element$ = domSource.select('.bar').elements();
	 * ```
	 *
	 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
	 * and `isolateSource` attached to it, and performs simple isolation using
	 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
	 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
	 * perform a conventional `mockedDOMSource.select('.__foo')` call.
	 *
	 * @param {Object} mockConfig an object where keys are selector strings
	 * and values are objects. Those nested objects have `eventType` strings as keys
	 * and values are streams you created.
	 * @return {Object} fake DOM source object, with an API containing `select()`
	 * and `events()` and `elements()` which can be used just like the DOM Driver's
	 * DOMSource.
	 *
	 * @function mockDOMSource
	 */
	var mockDOMSource_1 = __webpack_require__(66);
	exports.mockDOMSource = mockDOMSource_1.mockDOMSource;
	/**
	 * The hyperscript function `h()` is a function to create virtual DOM objects,
	 * also known as VNodes. Call
	 *
	 * ```js
	 * h('div.myClass', {style: {color: 'red'}}, [])
	 * ```
	 *
	 * to create a VNode that represents a `DIV` element with className `myClass`,
	 * styled with red color, and no children because the `[]` array was passed. The
	 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
	 *
	 * However, usually you should use "hyperscript helpers", which are shortcut
	 * functions based on hyperscript. There is one hyperscript helper function for
	 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
	 * `input()`. For instance, the previous example could have been written
	 * as:
	 *
	 * ```js
	 * div('.myClass', {style: {color: 'red'}}, [])
	 * ```
	 *
	 * There are also SVG helper functions, which apply the appropriate SVG
	 * namespace to the resulting elements. `svg()` function creates the top-most
	 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
	 * SVG-specific child elements. Example:
	 *
	 * ```js
	 * svg({width: 150, height: 150}, [
	 *   svg.polygon({
	 *     attrs: {
	 *       class: 'triangle',
	 *       points: '20 0 20 150 150 20'
	 *     }
	 *   })
	 * ])
	 * ```
	 *
	 * @function h
	 */
	var hyperscript_1 = __webpack_require__(20);
	exports.h = hyperscript_1.h;
	var hyperscript_helpers_1 = __webpack_require__(61);
	exports.svg = hyperscript_helpers_1.default.svg;
	exports.a = hyperscript_helpers_1.default.a;
	exports.abbr = hyperscript_helpers_1.default.abbr;
	exports.address = hyperscript_helpers_1.default.address;
	exports.area = hyperscript_helpers_1.default.area;
	exports.article = hyperscript_helpers_1.default.article;
	exports.aside = hyperscript_helpers_1.default.aside;
	exports.audio = hyperscript_helpers_1.default.audio;
	exports.b = hyperscript_helpers_1.default.b;
	exports.base = hyperscript_helpers_1.default.base;
	exports.bdi = hyperscript_helpers_1.default.bdi;
	exports.bdo = hyperscript_helpers_1.default.bdo;
	exports.blockquote = hyperscript_helpers_1.default.blockquote;
	exports.body = hyperscript_helpers_1.default.body;
	exports.br = hyperscript_helpers_1.default.br;
	exports.button = hyperscript_helpers_1.default.button;
	exports.canvas = hyperscript_helpers_1.default.canvas;
	exports.caption = hyperscript_helpers_1.default.caption;
	exports.cite = hyperscript_helpers_1.default.cite;
	exports.code = hyperscript_helpers_1.default.code;
	exports.col = hyperscript_helpers_1.default.col;
	exports.colgroup = hyperscript_helpers_1.default.colgroup;
	exports.dd = hyperscript_helpers_1.default.dd;
	exports.del = hyperscript_helpers_1.default.del;
	exports.dfn = hyperscript_helpers_1.default.dfn;
	exports.dir = hyperscript_helpers_1.default.dir;
	exports.div = hyperscript_helpers_1.default.div;
	exports.dl = hyperscript_helpers_1.default.dl;
	exports.dt = hyperscript_helpers_1.default.dt;
	exports.em = hyperscript_helpers_1.default.em;
	exports.embed = hyperscript_helpers_1.default.embed;
	exports.fieldset = hyperscript_helpers_1.default.fieldset;
	exports.figcaption = hyperscript_helpers_1.default.figcaption;
	exports.figure = hyperscript_helpers_1.default.figure;
	exports.footer = hyperscript_helpers_1.default.footer;
	exports.form = hyperscript_helpers_1.default.form;
	exports.h1 = hyperscript_helpers_1.default.h1;
	exports.h2 = hyperscript_helpers_1.default.h2;
	exports.h3 = hyperscript_helpers_1.default.h3;
	exports.h4 = hyperscript_helpers_1.default.h4;
	exports.h5 = hyperscript_helpers_1.default.h5;
	exports.h6 = hyperscript_helpers_1.default.h6;
	exports.head = hyperscript_helpers_1.default.head;
	exports.header = hyperscript_helpers_1.default.header;
	exports.hgroup = hyperscript_helpers_1.default.hgroup;
	exports.hr = hyperscript_helpers_1.default.hr;
	exports.html = hyperscript_helpers_1.default.html;
	exports.i = hyperscript_helpers_1.default.i;
	exports.iframe = hyperscript_helpers_1.default.iframe;
	exports.img = hyperscript_helpers_1.default.img;
	exports.input = hyperscript_helpers_1.default.input;
	exports.ins = hyperscript_helpers_1.default.ins;
	exports.kbd = hyperscript_helpers_1.default.kbd;
	exports.keygen = hyperscript_helpers_1.default.keygen;
	exports.label = hyperscript_helpers_1.default.label;
	exports.legend = hyperscript_helpers_1.default.legend;
	exports.li = hyperscript_helpers_1.default.li;
	exports.link = hyperscript_helpers_1.default.link;
	exports.main = hyperscript_helpers_1.default.main;
	exports.map = hyperscript_helpers_1.default.map;
	exports.mark = hyperscript_helpers_1.default.mark;
	exports.menu = hyperscript_helpers_1.default.menu;
	exports.meta = hyperscript_helpers_1.default.meta;
	exports.nav = hyperscript_helpers_1.default.nav;
	exports.noscript = hyperscript_helpers_1.default.noscript;
	exports.object = hyperscript_helpers_1.default.object;
	exports.ol = hyperscript_helpers_1.default.ol;
	exports.optgroup = hyperscript_helpers_1.default.optgroup;
	exports.option = hyperscript_helpers_1.default.option;
	exports.p = hyperscript_helpers_1.default.p;
	exports.param = hyperscript_helpers_1.default.param;
	exports.pre = hyperscript_helpers_1.default.pre;
	exports.progress = hyperscript_helpers_1.default.progress;
	exports.q = hyperscript_helpers_1.default.q;
	exports.rp = hyperscript_helpers_1.default.rp;
	exports.rt = hyperscript_helpers_1.default.rt;
	exports.ruby = hyperscript_helpers_1.default.ruby;
	exports.s = hyperscript_helpers_1.default.s;
	exports.samp = hyperscript_helpers_1.default.samp;
	exports.script = hyperscript_helpers_1.default.script;
	exports.section = hyperscript_helpers_1.default.section;
	exports.select = hyperscript_helpers_1.default.select;
	exports.small = hyperscript_helpers_1.default.small;
	exports.source = hyperscript_helpers_1.default.source;
	exports.span = hyperscript_helpers_1.default.span;
	exports.strong = hyperscript_helpers_1.default.strong;
	exports.style = hyperscript_helpers_1.default.style;
	exports.sub = hyperscript_helpers_1.default.sub;
	exports.sup = hyperscript_helpers_1.default.sup;
	exports.table = hyperscript_helpers_1.default.table;
	exports.tbody = hyperscript_helpers_1.default.tbody;
	exports.td = hyperscript_helpers_1.default.td;
	exports.textarea = hyperscript_helpers_1.default.textarea;
	exports.tfoot = hyperscript_helpers_1.default.tfoot;
	exports.th = hyperscript_helpers_1.default.th;
	exports.thead = hyperscript_helpers_1.default.thead;
	exports.title = hyperscript_helpers_1.default.title;
	exports.tr = hyperscript_helpers_1.default.tr;
	exports.u = hyperscript_helpers_1.default.u;
	exports.ul = hyperscript_helpers_1.default.ul;
	exports.video = hyperscript_helpers_1.default.video;
	//# sourceMappingURL=index.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(39)()
		? Object.setPrototypeOf
		: __webpack_require__(40);


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	var PUSH = exports.PUSH = 'PUSH';

	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = exports.REPLACE = 'REPLACE';

	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = exports.POP = 'POP';

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {
	  array: Array.isArray,
	  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var is = __webpack_require__(19);
	var vnode = __webpack_require__(31);
	function isGenericStream(x) {
	    return !Array.isArray(x) && typeof x.map === "function";
	}
	function mutateStreamWithNS(vNode) {
	    addNS(vNode.data, vNode.children, vNode.sel);
	    return vNode;
	}
	function addNS(data, children, selector) {
	    data.ns = "http://www.w3.org/2000/svg";
	    if (selector !== "foreignObject" && typeof children !== "undefined" && is.array(children)) {
	        for (var i = 0; i < children.length; ++i) {
	            if (isGenericStream(children[i])) {
	                children[i] = children[i].map(mutateStreamWithNS);
	            }
	            else {
	                addNS(children[i].data, children[i].children, children[i].sel);
	            }
	        }
	    }
	}
	function h(sel, b, c) {
	    var data = {};
	    var children;
	    var text;
	    var i;
	    if (arguments.length === 3) {
	        data = b;
	        if (is.array(c)) {
	            children = c;
	        }
	        else if (is.primitive(c)) {
	            text = c;
	        }
	    }
	    else if (arguments.length === 2) {
	        if (is.array(b)) {
	            children = b;
	        }
	        else if (is.primitive(b)) {
	            text = b;
	        }
	        else {
	            data = b;
	        }
	    }
	    if (is.array(children)) {
	        children = children.filter(function (x) { return x; });
	        for (i = 0; i < children.length; ++i) {
	            if (is.primitive(children[i])) {
	                children[i] = vnode(undefined, undefined, undefined, children[i]);
	            }
	        }
	    }
	    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	        addNS(data, children, sel);
	    }
	    return vnode(sel, data, children, text, undefined);
	}
	exports.h = h;
	;
	//# sourceMappingURL=hyperscript.js.map

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	var counter = 0;
	function newScope() {
	    return "cycle" + ++counter;
	}
	function checkIsolateArgs(dataflowComponent, scope) {
	    if (typeof dataflowComponent !== "function") {
	        throw new Error("First argument given to isolate() must be a " +
	            "'dataflowComponent' function");
	    }
	    if (scope === null) {
	        throw new Error("Second argument given to isolate() must not be null");
	    }
	}
	function isolateAllSources(sources, scope) {
	    var scopedSources = {};
	    for (var key in sources) {
	        if (sources.hasOwnProperty(key) && sources[key]
	            && typeof sources[key].isolateSource === "function") {
	            scopedSources[key] = sources[key].isolateSource(sources[key], scope);
	        }
	        else if (sources.hasOwnProperty(key)) {
	            scopedSources[key] = sources[key];
	        }
	    }
	    return scopedSources;
	}
	function isolateAllSinks(sources, sinks, scope) {
	    var scopedSinks = {};
	    for (var key in sinks) {
	        if (sinks.hasOwnProperty(key)
	            && sources[key]
	            && typeof sources[key].isolateSink === "function") {
	            scopedSinks[key] = sources[key].isolateSink(sinks[key], scope);
	        }
	        else if (sinks.hasOwnProperty(key)) {
	            scopedSinks[key] = sinks[key];
	        }
	    }
	    return scopedSinks;
	}
	/**
	 * Takes a `dataflowComponent` function and an optional `scope` string, and
	 * returns a scoped version of the `dataflowComponent` function.
	 *
	 * When the scoped dataflow component is invoked, each source provided to the
	 * scoped dataflowComponent is isolated to the scope using
	 * `source.isolateSource(source, scope)`, if possible. Likewise, the sinks
	 * returned from the scoped dataflow component are isolate to the scope using
	 * `source.isolateSink(sink, scope)`.
	 *
	 * If the `scope` is not provided, a new scope will be automatically created.
	 * This means that while **`isolate(dataflowComponent, scope)` is pure**
	 * (referentially transparent), **`isolate(dataflowComponent)` is impure**
	 * (not referentially transparent). Two calls to `isolate(Foo, bar)` will
	 * generate two indistinct dataflow components. But, two calls to `isolate(Foo)`
	 * will generate two distinct dataflow components.
	 *
	 * Note that both `isolateSource()` and `isolateSink()` are static members of
	 * `source`. The reason for this is that drivers produce `source` while the
	 * application produces `sink`, and it's the driver's responsibility to
	 * implement `isolateSource()` and `isolateSink()`.
	 *
	 * @param {Function} dataflowComponent a function that takes `sources` as input
	 * and outputs a collection of `sinks`.
	 * @param {String} scope an optional string that is used to isolate each
	 * `sources` and `sinks` when the returned scoped dataflow component is invoked.
	 * @return {Function} the scoped dataflow component function that, as the
	 * original `dataflowComponent` function, takes `sources` and returns `sinks`.
	 * @function isolate
	 */
	function isolate(component, scope) {
	    if (scope === void 0) { scope = newScope(); }
	    checkIsolateArgs(component, scope);
	    var convertedScope = typeof scope === 'string' ? scope : scope.toString();
	    return function scopedComponent(sources) {
	        var rest = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            rest[_i - 1] = arguments[_i];
	        }
	        var scopedSources = isolateAllSources(sources, convertedScope);
	        var sinks = component.apply(void 0, [scopedSources].concat(rest));
	        var scopedSinks = isolateAllSinks(sources, sinks, convertedScope);
	        return scopedSinks;
	    };
	}
	isolate.reset = function () { return counter = 0; };
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = isolate;
	//# sourceMappingURL=index.js.map

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString

	  , id = toString.call((function () { return arguments; }()));

	module.exports = function (x) { return (toString.call(x) === id); };


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(95)()
		? Object.assign
		: __webpack_require__(96);


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString

	  , id = toString.call('');

	module.exports = function (x) {
		return (typeof x === 'string') || (x && (typeof x === 'object') &&
			((x instanceof String) || (toString.call(x) === id))) || false;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clear    = __webpack_require__(38)
	  , assign   = __webpack_require__(23)
	  , callable = __webpack_require__(7)
	  , value    = __webpack_require__(3)
	  , d        = __webpack_require__(6)
	  , autoBind = __webpack_require__(87)
	  , Symbol   = __webpack_require__(12)

	  , defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , Iterator;

	module.exports = Iterator = function (list, context) {
		if (!(this instanceof Iterator)) return new Iterator(list, context);
		defineProperties(this, {
			__list__: d('w', value(list)),
			__context__: d('w', context),
			__nextIndex__: d('w', 0)
		});
		if (!context) return;
		callable(context.on);
		context.on('_add', this._onAdd);
		context.on('_delete', this._onDelete);
		context.on('_clear', this._onClear);
	};

	defineProperties(Iterator.prototype, assign({
		constructor: d(Iterator),
		_next: d(function () {
			var i;
			if (!this.__list__) return;
			if (this.__redo__) {
				i = this.__redo__.shift();
				if (i !== undefined) return i;
			}
			if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
			this._unBind();
		}),
		next: d(function () { return this._createResult(this._next()); }),
		_createResult: d(function (i) {
			if (i === undefined) return { done: true, value: undefined };
			return { done: false, value: this._resolve(i) };
		}),
		_resolve: d(function (i) { return this.__list__[i]; }),
		_unBind: d(function () {
			this.__list__ = null;
			delete this.__redo__;
			if (!this.__context__) return;
			this.__context__.off('_add', this._onAdd);
			this.__context__.off('_delete', this._onDelete);
			this.__context__.off('_clear', this._onClear);
			this.__context__ = null;
		}),
		toString: d(function () { return '[object Iterator]'; })
	}, autoBind({
		_onAdd: d(function (index) {
			if (index >= this.__nextIndex__) return;
			++this.__nextIndex__;
			if (!this.__redo__) {
				defineProperty(this, '__redo__', d('c', [index]));
				return;
			}
			this.__redo__.forEach(function (redo, i) {
				if (redo >= index) this.__redo__[i] = ++redo;
			}, this);
			this.__redo__.push(index);
		}),
		_onDelete: d(function (index) {
			var i;
			if (index >= this.__nextIndex__) return;
			--this.__nextIndex__;
			if (!this.__redo__) return;
			i = this.__redo__.indexOf(index);
			if (i !== -1) this.__redo__.splice(i, 1);
			this.__redo__.forEach(function (redo, i) {
				if (redo > index) this.__redo__[i] = --redo;
			}, this);
		}),
		_onClear: d(function () {
			if (this.__redo__) clear.call(this.__redo__);
			this.__nextIndex__ = 0;
		})
	})));

	defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
		return this;
	}));
	defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.go = exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getUserConfirmation = exports.getCurrentLocation = undefined;

	var _LocationUtils = __webpack_require__(8);

	var _DOMUtils = __webpack_require__(13);

	var _DOMStateStorage = __webpack_require__(44);

	var _PathUtils = __webpack_require__(5);

	var _ExecutionEnvironment = __webpack_require__(18);

	var PopStateEvent = 'popstate';
	var HashChangeEvent = 'hashchange';

	var needsHashchangeListener = _ExecutionEnvironment.canUseDOM && !(0, _DOMUtils.supportsPopstateOnHashchange)();

	var _createLocation = function _createLocation(historyState) {
	  var key = historyState && historyState.key;

	  return (0, _LocationUtils.createLocation)({
	    pathname: window.location.pathname,
	    search: window.location.search,
	    hash: window.location.hash,
	    state: key ? (0, _DOMStateStorage.readState)(key) : undefined
	  }, undefined, key);
	};

	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  var historyState = void 0;
	  try {
	    historyState = window.history.state || {};
	  } catch (error) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/ReactTraining/history/pull/289
	    historyState = {};
	  }

	  return _createLocation(historyState);
	};

	var getUserConfirmation = exports.getUserConfirmation = function getUserConfirmation(message, callback) {
	  return callback(window.confirm(message));
	}; // eslint-disable-line no-alert

	var startListener = exports.startListener = function startListener(listener) {
	  var handlePopState = function handlePopState(event) {
	    if (event.state !== undefined) // Ignore extraneous popstate events in WebKit
	      listener(_createLocation(event.state));
	  };

	  (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

	  var handleUnpoppedHashChange = function handleUnpoppedHashChange() {
	    return listener(getCurrentLocation());
	  };

	  if (needsHashchangeListener) {
	    (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
	  }

	  return function () {
	    (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

	    if (needsHashchangeListener) {
	      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleUnpoppedHashChange);
	    }
	  };
	};

	var updateLocation = function updateLocation(location, updateState) {
	  var state = location.state;
	  var key = location.key;


	  if (state !== undefined) (0, _DOMStateStorage.saveState)(key, state);

	  updateState({ key: key }, (0, _PathUtils.createPath)(location));
	};

	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.pushState(state, null, path);
	  });
	};

	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  return updateLocation(location, function (state, path) {
	    return window.history.replaceState(state, null, path);
	  });
	};

	var go = exports.go = function go(n) {
	  if (n) window.history.go(n);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _AsyncUtils = __webpack_require__(126);

	var _PathUtils = __webpack_require__(5);

	var _runTransitionHook = __webpack_require__(28);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _Actions = __webpack_require__(17);

	var _LocationUtils = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createHistory = function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var getUserConfirmation = options.getUserConfirmation;
	  var pushLocation = options.pushLocation;
	  var replaceLocation = options.replaceLocation;
	  var go = options.go;
	  var keyLength = options.keyLength;


	  var currentLocation = void 0;
	  var pendingLocation = void 0;
	  var beforeListeners = [];
	  var listeners = [];
	  var allKeys = [];

	  var getCurrentIndex = function getCurrentIndex() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) return allKeys.indexOf(pendingLocation.key);

	    if (currentLocation) return allKeys.indexOf(currentLocation.key);

	    return -1;
	  };

	  var updateLocation = function updateLocation(nextLocation) {
	    var currentIndex = getCurrentIndex();

	    currentLocation = nextLocation;

	    if (currentLocation.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, currentIndex + 1), [currentLocation.key]);
	    } else if (currentLocation.action === _Actions.REPLACE) {
	      allKeys[currentIndex] = currentLocation.key;
	    }

	    listeners.forEach(function (listener) {
	      return listener(currentLocation);
	    });
	  };

	  var listenBefore = function listenBefore(listener) {
	    beforeListeners.push(listener);

	    return function () {
	      return beforeListeners = beforeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };

	  var listen = function listen(listener) {
	    listeners.push(listener);

	    return function () {
	      return listeners = listeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  };

	  var confirmTransitionTo = function confirmTransitionTo(location, callback) {
	    (0, _AsyncUtils.loopAsync)(beforeListeners.length, function (index, next, done) {
	      (0, _runTransitionHook2.default)(beforeListeners[index], location, function (result) {
	        return result != null ? done(result) : next();
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          return callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  };

	  var transitionTo = function transitionTo(nextLocation) {
	    if (currentLocation && (0, _LocationUtils.locationsAreEqual)(currentLocation, nextLocation) || pendingLocation && (0, _LocationUtils.locationsAreEqual)(pendingLocation, nextLocation)) return; // Nothing to do

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted during confirmation

	      pendingLocation = null;

	      if (ok) {
	        // Treat PUSH to same path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = (0, _PathUtils.createPath)(currentLocation);
	          var nextPath = (0, _PathUtils.createPath)(nextLocation);

	          if (nextPath === prevPath && (0, _LocationUtils.statesAreEqual)(currentLocation.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }

	        if (nextLocation.action === _Actions.POP) {
	          updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.PUSH) {
	          if (pushLocation(nextLocation) !== false) updateLocation(nextLocation);
	        } else if (nextLocation.action === _Actions.REPLACE) {
	          if (replaceLocation(nextLocation) !== false) updateLocation(nextLocation);
	        }
	      } else if (currentLocation && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(currentLocation.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL
	      }
	    });
	  };

	  var push = function push(input) {
	    return transitionTo(createLocation(input, _Actions.PUSH));
	  };

	  var replace = function replace(input) {
	    return transitionTo(createLocation(input, _Actions.REPLACE));
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength || 6);
	  };

	  var createHref = function createHref(location) {
	    return (0, _PathUtils.createPath)(location);
	  };

	  var createLocation = function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	    return (0, _LocationUtils.createLocation)(location, action, key);
	  };

	  return {
	    getCurrentLocation: getCurrentLocation,
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: _PathUtils.createPath,
	    createHref: createHref,
	    createLocation: createLocation
	  };
	};

	exports.default = createHistory;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _warning = __webpack_require__(9);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var runTransitionHook = function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(result === undefined, 'You should not "return" in a transition hook with a callback argument; ' + 'call the callback instead') : void 0;
	  }
	};

	exports.default = runTransitionHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module), (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	var proto = Element.prototype;
	var vendor = proto.matches
	  || proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; i++) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = function(sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return {sel: sel, data: data, children: children,
	          text: text, elm: elm, key: key};
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	var ScopeChecker = (function () {
	    function ScopeChecker(scope, isolateModule) {
	        this.scope = scope;
	        this.isolateModule = isolateModule;
	    }
	    ScopeChecker.prototype.isStrictlyInRootScope = function (leaf) {
	        for (var el = leaf; el; el = el.parentElement) {
	            var scope = this.isolateModule.isIsolatedElement(el);
	            if (scope && scope !== this.scope) {
	                return false;
	            }
	            if (scope) {
	                return true;
	            }
	        }
	        return true;
	    };
	    return ScopeChecker;
	}());
	exports.ScopeChecker = ScopeChecker;
	//# sourceMappingURL=ScopeChecker.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var xstream_1 = __webpack_require__(1);
	function createVTree(vnode, children) {
	    return {
	        sel: vnode.sel,
	        data: vnode.data,
	        text: vnode.text,
	        elm: vnode.elm,
	        key: vnode.key,
	        children: children,
	    };
	}
	function makeTransposeVNode(runStreamAdapter) {
	    return function transposeVNode(vnode) {
	        if (!vnode) {
	            return null;
	        }
	        else if (vnode && typeof vnode.data === "object" && vnode.data.static) {
	            return xstream_1.default.of(vnode);
	        }
	        else if (runStreamAdapter.isValidStream(vnode)) {
	            var xsStream = xstream_adapter_1.default.adapt(vnode, runStreamAdapter.streamSubscribe);
	            return xsStream.map(transposeVNode).flatten();
	        }
	        else if (typeof vnode === "object") {
	            if (!vnode.children || vnode.children.length === 0) {
	                return xstream_1.default.of(vnode);
	            }
	            var vnodeChildren = vnode.children
	                .map(transposeVNode)
	                .filter(function (x) { return x !== null; });
	            if (vnodeChildren.length === 0) {
	                return xstream_1.default.of(createVTree(vnode, []));
	            }
	            else {
	                return xstream_1.default.combine.apply(xstream_1.default, vnodeChildren)
	                    .map(function (children) { return createVTree(vnode, children.slice()); });
	            }
	        }
	        else {
	            throw new Error("Unhandled vTree Value");
	        }
	    };
	}
	exports.makeTransposeVNode = makeTransposeVNode;
	//# sourceMappingURL=transposition.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * History driver factory
	 *
	 * This is a function which, when called, returns a History Driver for Cycle.js
	 * apps. The driver is also a function, and it takes a stream of new locations
	 * (strings representing pathnames or location objects) as input, and outputs
	 * another stream of locations that were applied.
	 *
	 * @param {History} history the History object created by the history library.
	 * This object is usually created through `createBrowserHistory()` or
	 * `createHashHistory()` or `createMemoryHistory()` from the `history` library.
	 * Alternatively, you may use `createServerHistory` from this library.
	 * @param {object} options an object with some options specific to this driver.
	 * Options may be: `capture`, a boolean to indicate whether the driver should
	 * intercept and handle any click event that leads to a link, like on an `<a>`
	 * element; `onError`, a callback function that takes an error as argument and
	 * handles it, use this to configure what to do with driver errors.
	 * @return {Function} the History Driver function
	 * @function makeHistoryDriver
	 */
	var makeHistoryDriver_1 = __webpack_require__(69);
	exports.makeHistoryDriver = makeHistoryDriver_1.makeHistoryDriver;
	/**
	 * Creates a "ServerHistory" object similar to the History objects that the
	 * `history` library can create. Use this when you want to support server-side
	 * rendering.
	 *
	 * @param {string|object} location this may be either a string representing the
	 * pathname, or a location object with fields like `pathname`, `search`,
	 * `query`, `state`, `action`, `key`, `hash`, etc.
	 * @return {object} a History object.
	 * @function createServerHistory
	 */
	var serverHistory_1 = __webpack_require__(70);
	exports.createServerHistory = serverHistory_1.createServerHistory;
	var util_1 = __webpack_require__(36);
	exports.supportsHistory = util_1.supportsHistory;
	exports.createLocation = util_1.createLocation;
	//# sourceMappingURL=index.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var objectAssign = __webpack_require__(71);
	function supportsHistory() {
	    if (typeof navigator === 'undefined') {
	        return false;
	    }
	    var ua = navigator.userAgent;
	    if ((ua.indexOf('Android 2.') !== -1 ||
	        ua.indexOf('Android 4.0') !== -1) &&
	        ua.indexOf('Mobile Safari') !== -1 &&
	        ua.indexOf('Chrome') === -1 &&
	        ua.indexOf('Windows Phone') === -1) {
	        return false;
	    }
	    if (typeof window !== 'undefined') {
	        return window.history && 'pushState' in window.history;
	    }
	    else {
	        return false;
	    }
	}
	exports.supportsHistory = supportsHistory;
	var locationDefaults = {
	    pathname: '/',
	    action: 'POP',
	    hash: '',
	    search: '',
	    state: undefined,
	    key: null,
	    query: null,
	};
	function createLocation(location) {
	    if (typeof location === 'string') {
	        return objectAssign({}, locationDefaults, { pathname: location });
	    }
	    return objectAssign({}, locationDefaults, location);
	}
	exports.createLocation = createLocation;
	//# sourceMappingURL=util.js.map

/***/ },
/* 37 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */

	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {

	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;

	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };

	  return self;
	})();


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Inspired by Google Closure:
	// http://closure-library.googlecode.com/svn/docs/
	// closure_goog_array_array.js.html#goog.array.clear

	'use strict';

	var value = __webpack_require__(3);

	module.exports = function () {
		value(this).length = 0;
		return this;
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	var create = Object.create, getPrototypeOf = Object.getPrototypeOf
	  , x = {};

	module.exports = function (/*customCreate*/) {
		var setPrototypeOf = Object.setPrototypeOf
		  , customCreate = arguments[0] || create;
		if (typeof setPrototypeOf !== 'function') return false;
		return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// Big thanks to @WebReflection for sorting this out
	// https://gist.github.com/WebReflection/5593554

	'use strict';

	var isObject      = __webpack_require__(101)
	  , value         = __webpack_require__(3)

	  , isPrototypeOf = Object.prototype.isPrototypeOf
	  , defineProperty = Object.defineProperty
	  , nullDesc = { configurable: true, enumerable: false, writable: true,
			value: undefined }
	  , validate;

	validate = function (obj, prototype) {
		value(obj);
		if ((prototype === null) || isObject(prototype)) return obj;
		throw new TypeError('Prototype must be null or an object');
	};

	module.exports = (function (status) {
		var fn, set;
		if (!status) return null;
		if (status.level === 2) {
			if (status.set) {
				set = status.set;
				fn = function (obj, prototype) {
					set.call(validate(obj, prototype), prototype);
					return obj;
				};
			} else {
				fn = function (obj, prototype) {
					validate(obj, prototype).__proto__ = prototype;
					return obj;
				};
			}
		} else {
			fn = function self(obj, prototype) {
				var isNullBase;
				validate(obj, prototype);
				isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
				if (isNullBase) delete self.nullPolyfill.__proto__;
				if (prototype === null) prototype = self.nullPolyfill;
				obj.__proto__ = prototype;
				if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
				return obj;
			};
		}
		return Object.defineProperty(fn, 'level', { configurable: false,
			enumerable: false, writable: false, value: status.level });
	}((function () {
		var x = Object.create(null), y = {}, set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(x, y);
			} catch (ignore) { }
			if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
		}

		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 2 };

		x = {};
		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 1 };

		return false;
	}())));

	__webpack_require__(98);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(108)()
		? String.prototype.contains
		: __webpack_require__(109);


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isIterable = __webpack_require__(113);

	module.exports = function (value) {
		if (!isIterable(value)) throw new TypeError(value + " is not iterable");
		return value;
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(115)() ? Map : __webpack_require__(119);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.readState = exports.saveState = undefined;

	var _warning = __webpack_require__(9);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var QuotaExceededErrors = {
	  QuotaExceededError: true,
	  QUOTA_EXCEEDED_ERR: true
	};

	var SecurityErrors = {
	  SecurityError: true
	};

	var KeyPrefix = '@@History/';

	var createKey = function createKey(key) {
	  return KeyPrefix + key;
	};

	var saveState = exports.saveState = function saveState(key, state) {
	  if (!window.sessionStorage) {
	    // Session storage is not available or hidden.
	    // sessionStorage is undefined in Internet Explorer when served via file protocol.
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available') : void 0;

	    return;
	  }

	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (SecurityErrors[error.name]) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available due to security settings') : void 0;

	      return;
	    }

	    if (QuotaExceededErrors[error.name] && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : void 0;

	      return;
	    }

	    throw error;
	  }
	};

	var readState = exports.readState = function readState(key) {
	  var json = void 0;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (SecurityErrors[error.name]) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, '[history] Unable to read state; sessionStorage is not available due to security settings') : void 0;

	      return undefined;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return undefined;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 45 */
/***/ function(module, exports) {

	var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['CloseCurlyDoubleQuote', [8221]], ['CloseCurlyQuote', [8217]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

	var alphaIndex = {};
	var charIndex = {};

	createIndexes(alphaIndex, charIndex);

	/**
	 * @constructor
	 */
	function Html5Entities() {}

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1) === 'x' ?
	                parseInt(entity.substr(2).toLowerCase(), 16) :
	                parseInt(entity.substr(1));

	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.decode = function(str) {
	    return new Html5Entities().decode(str);
	 };

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var charInfo = charIndex[str.charCodeAt(i)];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        result += str.charAt(i);
	        i++;
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encode = function(str) {
	    return new Html5Entities().encode(str);
	 };

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var charInfo = charIndex[c];
	        if (charInfo) {
	            var alpha = charInfo[str.charCodeAt(i + 1)];
	            if (alpha) {
	                i++;
	            } else {
	                alpha = charInfo[''];
	            }
	            if (alpha) {
	                result += "&" + alpha + ";";
	                i++;
	                continue;
	            }
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonUTF = function(str) {
	    return new Html5Entities().encodeNonUTF(str);
	 };

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html5Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 Html5Entities.encodeNonASCII = function(str) {
	    return new Html5Entities().encodeNonASCII(str);
	 };

	/**
	 * @param {Object} alphaIndex Passed by reference.
	 * @param {Object} charIndex Passed by reference.
	 */
	function createIndexes(alphaIndex, charIndex) {
	    var i = ENTITIES.length;
	    var _results = [];
	    while (i--) {
	        var e = ENTITIES[i];
	        var alpha = e[0];
	        var chars = e[1];
	        var chr = chars[0];
	        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
	        var charInfo;
	        if (addChar) {
	            charInfo = charIndex[chr] = charIndex[chr] || {};
	        }
	        if (chars[1]) {
	            var chr2 = chars[1];
	            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
	            _results.push(addChar && (charInfo[chr2] = alpha));
	        } else {
	            alphaIndex[alpha] = String.fromCharCode(chr);
	            _results.push(addChar && (charInfo[''] = alpha));
	        }
	    }
	}

	module.exports = Html5Entities;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = getNative;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(29);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match HTML entities and HTML characters. */
	var reUnescapedHtml = /[&<>"'`]/g,
	    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	/** Used to map characters to HTML entities. */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '`': '&#96;'
	};

	/**
	 * Used by `_.escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeHtmlChar(chr) {
	  return htmlEscapes[chr];
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
	 * their corresponding HTML entities.
	 *
	 * **Note:** No other characters are escaped. To escape additional
	 * characters use a third-party library like [_he_](https://mths.be/he).
	 *
	 * Though the ">" character is escaped for symmetry, characters like
	 * ">" and "/" don't need escaping in HTML and have no special meaning
	 * unless they're part of a tag or unquoted attribute value.
	 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	 * (under "semi-related fun fact") for more details.
	 *
	 * Backticks are escaped because in IE < 9, they can break out of
	 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	 * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	 * for more details.
	 *
	 * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	 * to reduce XSS vectors.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('fred, barney, & pebbles');
	 * // => 'fred, barney, &amp; pebbles'
	 */
	function escape(string) {
	  string = toString(string);
	  return (string && reHasUnescapedHtml.test(string))
	    ? string.replace(reUnescapedHtml, escapeHtmlChar)
	    : string;
	}

	module.exports = escape;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFor = __webpack_require__(141),
	    bindCallback = __webpack_require__(144),
	    keys = __webpack_require__(149);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	/**
	 * Creates a function for `_.forOwn` or `_.forOwnRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForOwn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee);
	  };
	}

	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The `iteratee` is bound to `thisArg` and invoked with
	 * three arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' and 'b' (iteration order is not guaranteed)
	 */
	var forOwn = createForOwn(baseForOwn);

	module.exports = forOwn;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isArguments;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	//  Ramda v0.22.1
	//  https://github.com/ramda/ramda
	//  (c) 2013-2016 Scott Sauyet, Michael Hurley, and David Chambers
	//  Ramda may be freely distributed under the MIT license.

	;(function() {

	  'use strict';

	  /**
	     * A special placeholder value used to specify "gaps" within curried functions,
	     * allowing partial application of any combination of arguments, regardless of
	     * their positions.
	     *
	     * If `g` is a curried ternary function and `_` is `R.__`, the following are
	     * equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2, _)(1, 3)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @constant
	     * @memberOf R
	     * @since v0.6.0
	     * @category Function
	     * @example
	     *
	     *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
	     *      greet('Alice'); //=> 'Hello, Alice!'
	     */
	    var __ = { '@@functional/placeholder': true };

	    /* eslint-disable no-unused-vars */
	    var _arity = function _arity(n, fn) {
	        /* eslint-disable no-unused-vars */
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.apply(this, arguments);
	            };
	        case 1:
	            return function (a0) {
	                return fn.apply(this, arguments);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.apply(this, arguments);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.apply(this, arguments);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.apply(this, arguments);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.apply(this, arguments);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.apply(this, arguments);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.apply(this, arguments);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.apply(this, arguments);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.apply(this, arguments);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.apply(this, arguments);
	            };
	        default:
	            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	        }
	    };

	    var _arrayFromIterator = function _arrayFromIterator(iter) {
	        var list = [];
	        var next;
	        while (!(next = iter.next()).done) {
	            list.push(next.value);
	        }
	        return list;
	    };

	    var _arrayOf = function _arrayOf() {
	        return Array.prototype.slice.call(arguments);
	    };

	    var _cloneRegExp = function _cloneRegExp(pattern) {
	        return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
	    };

	    var _complement = function _complement(f) {
	        return function () {
	            return !f.apply(this, arguments);
	        };
	    };

	    /**
	     * Private `concat` function to merge two array-like objects.
	     *
	     * @private
	     * @param {Array|Arguments} [set1=[]] An array-like object.
	     * @param {Array|Arguments} [set2=[]] An array-like object.
	     * @return {Array} A new, merged array.
	     * @example
	     *
	     *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     */
	    var _concat = function _concat(set1, set2) {
	        set1 = set1 || [];
	        set2 = set2 || [];
	        var idx;
	        var len1 = set1.length;
	        var len2 = set2.length;
	        var result = [];
	        idx = 0;
	        while (idx < len1) {
	            result[result.length] = set1[idx];
	            idx += 1;
	        }
	        idx = 0;
	        while (idx < len2) {
	            result[result.length] = set2[idx];
	            idx += 1;
	        }
	        return result;
	    };

	    var _containsWith = function _containsWith(pred, x, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (pred(x, list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    };

	    var _filter = function _filter(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        while (idx < len) {
	            if (fn(list[idx])) {
	                result[result.length] = list[idx];
	            }
	            idx += 1;
	        }
	        return result;
	    };

	    var _forceReduced = function _forceReduced(x) {
	        return {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };

	    // String(x => x) evaluates to "x => x", so the pattern may not match.
	    var _functionName = function _functionName(f) {
	        // String(x => x) evaluates to "x => x", so the pattern may not match.
	        var match = String(f).match(/^function (\w*)/);
	        return match == null ? '' : match[1];
	    };

	    var _has = function _has(prop, obj) {
	        return Object.prototype.hasOwnProperty.call(obj, prop);
	    };

	    var _identity = function _identity(x) {
	        return x;
	    };

	    var _isArguments = function () {
	        var toString = Object.prototype.toString;
	        return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
	            return toString.call(x) === '[object Arguments]';
	        } : function _isArguments(x) {
	            return _has('callee', x);
	        };
	    }();

	    /**
	     * Tests whether or not an object is an array.
	     *
	     * @private
	     * @param {*} val The object to test.
	     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	     * @example
	     *
	     *      _isArray([]); //=> true
	     *      _isArray(null); //=> false
	     *      _isArray({}); //=> false
	     */
	    var _isArray = Array.isArray || function _isArray(val) {
	        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
	    };

	    var _isFunction = function _isFunction(x) {
	        return Object.prototype.toString.call(x) === '[object Function]';
	    };

	    /**
	     * Determine if the passed argument is an integer.
	     *
	     * @private
	     * @param {*} n
	     * @category Type
	     * @return {Boolean}
	     */
	    var _isInteger = Number.isInteger || function _isInteger(n) {
	        return n << 0 === n;
	    };

	    var _isNumber = function _isNumber(x) {
	        return Object.prototype.toString.call(x) === '[object Number]';
	    };

	    var _isObject = function _isObject(x) {
	        return Object.prototype.toString.call(x) === '[object Object]';
	    };

	    var _isPlaceholder = function _isPlaceholder(a) {
	        return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
	    };

	    var _isRegExp = function _isRegExp(x) {
	        return Object.prototype.toString.call(x) === '[object RegExp]';
	    };

	    var _isString = function _isString(x) {
	        return Object.prototype.toString.call(x) === '[object String]';
	    };

	    var _isTransformer = function _isTransformer(obj) {
	        return typeof obj['@@transducer/step'] === 'function';
	    };

	    var _map = function _map(fn, functor) {
	        var idx = 0;
	        var len = functor.length;
	        var result = Array(len);
	        while (idx < len) {
	            result[idx] = fn(functor[idx]);
	            idx += 1;
	        }
	        return result;
	    };

	    // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	    var _objectAssign = function _objectAssign(target) {
	        if (target == null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	        var output = Object(target);
	        var idx = 1;
	        var length = arguments.length;
	        while (idx < length) {
	            var source = arguments[idx];
	            if (source != null) {
	                for (var nextKey in source) {
	                    if (_has(nextKey, source)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	            idx += 1;
	        }
	        return output;
	    };

	    var _of = function _of(x) {
	        return [x];
	    };

	    var _pipe = function _pipe(f, g) {
	        return function () {
	            return g.call(this, f.apply(this, arguments));
	        };
	    };

	    var _pipeP = function _pipeP(f, g) {
	        return function () {
	            var ctx = this;
	            return f.apply(ctx, arguments).then(function (x) {
	                return g.call(ctx, x);
	            });
	        };
	    };

	    // \b matches word boundary; [\b] matches backspace
	    var _quote = function _quote(s) {
	        var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b')    // \b matches word boundary; [\b] matches backspace
	    .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
	        return '"' + escaped.replace(/"/g, '\\"') + '"';
	    };

	    var _reduced = function _reduced(x) {
	        return x && x['@@transducer/reduced'] ? x : {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };

	    /**
	     * An optimized, private array `slice` implementation.
	     *
	     * @private
	     * @param {Arguments|Array} args The array or arguments object to consider.
	     * @param {Number} [from=0] The array index to slice from, inclusive.
	     * @param {Number} [to=args.length] The array index to slice to, exclusive.
	     * @return {Array} A new, sliced array.
	     * @example
	     *
	     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	     *
	     *      var firstThreeArgs = function(a, b, c, d) {
	     *        return _slice(arguments, 0, 3);
	     *      };
	     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	     */
	    var _slice = function _slice(args, from, to) {
	        switch (arguments.length) {
	        case 1:
	            return _slice(args, 0, args.length);
	        case 2:
	            return _slice(args, from, args.length);
	        default:
	            var list = [];
	            var idx = 0;
	            var len = Math.max(0, Math.min(args.length, to) - from);
	            while (idx < len) {
	                list[idx] = args[from + idx];
	                idx += 1;
	            }
	            return list;
	        }
	    };

	    /**
	     * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
	     */
	    var _toISOString = function () {
	        var pad = function pad(n) {
	            return (n < 10 ? '0' : '') + n;
	        };
	        return typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
	            return d.toISOString();
	        } : function _toISOString(d) {
	            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
	        };
	    }();

	    var _xfBase = {
	        init: function () {
	            return this.xf['@@transducer/init']();
	        },
	        result: function (result) {
	            return this.xf['@@transducer/result'](result);
	        }
	    };

	    var _xwrap = function () {
	        function XWrap(fn) {
	            this.f = fn;
	        }
	        XWrap.prototype['@@transducer/init'] = function () {
	            throw new Error('init not implemented on XWrap');
	        };
	        XWrap.prototype['@@transducer/result'] = function (acc) {
	            return acc;
	        };
	        XWrap.prototype['@@transducer/step'] = function (acc, x) {
	            return this.f(acc, x);
	        };
	        return function _xwrap(fn) {
	            return new XWrap(fn);
	        };
	    }();

	    var _aperture = function _aperture(n, list) {
	        var idx = 0;
	        var limit = list.length - (n - 1);
	        var acc = new Array(limit >= 0 ? limit : 0);
	        while (idx < limit) {
	            acc[idx] = _slice(list, idx, idx + n);
	            idx += 1;
	        }
	        return acc;
	    };

	    var _assign = typeof Object.assign === 'function' ? Object.assign : _objectAssign;

	    /**
	     * Similar to hasMethod, this checks whether a function has a [methodname]
	     * function. If it isn't an array it will execute that function otherwise it
	     * will default to the ramda implementation.
	     *
	     * @private
	     * @param {Function} fn ramda implemtation
	     * @param {String} methodname property to check for a custom implementation
	     * @return {Object} Whatever the return value of the method is.
	     */
	    var _checkForMethod = function _checkForMethod(methodname, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	        };
	    };

	    /**
	     * Optimized internal one-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry1 = function _curry1(fn) {
	        return function f1(a) {
	            if (arguments.length === 0 || _isPlaceholder(a)) {
	                return f1;
	            } else {
	                return fn.apply(this, arguments);
	            }
	        };
	    };

	    /**
	     * Optimized internal two-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry2 = function _curry2(fn) {
	        return function f2(a, b) {
	            switch (arguments.length) {
	            case 0:
	                return f2;
	            case 1:
	                return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
	                    return fn(a, _b);
	                });
	            default:
	                return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
	                    return fn(_a, b);
	                }) : _isPlaceholder(b) ? _curry1(function (_b) {
	                    return fn(a, _b);
	                }) : fn(a, b);
	            }
	        };
	    };

	    /**
	     * Optimized internal three-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry3 = function _curry3(fn) {
	        return function f3(a, b, c) {
	            switch (arguments.length) {
	            case 0:
	                return f3;
	            case 1:
	                return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                });
	            case 2:
	                return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
	                    return fn(_a, b, _c);
	                }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                }) : _curry1(function (_c) {
	                    return fn(a, b, _c);
	                });
	            default:
	                return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
	                    return fn(_a, _b, c);
	                }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
	                    return fn(_a, b, _c);
	                }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                }) : _isPlaceholder(a) ? _curry1(function (_a) {
	                    return fn(_a, b, c);
	                }) : _isPlaceholder(b) ? _curry1(function (_b) {
	                    return fn(a, _b, c);
	                }) : _isPlaceholder(c) ? _curry1(function (_c) {
	                    return fn(a, b, _c);
	                }) : fn(a, b, c);
	            }
	        };
	    };

	    /**
	     * Internal curryN function.
	     *
	     * @private
	     * @category Function
	     * @param {Number} length The arity of the curried function.
	     * @param {Array} received An array of arguments received thus far.
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curryN = function _curryN(length, received, fn) {
	        return function () {
	            var combined = [];
	            var argsIdx = 0;
	            var left = length;
	            var combinedIdx = 0;
	            while (combinedIdx < received.length || argsIdx < arguments.length) {
	                var result;
	                if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
	                    result = received[combinedIdx];
	                } else {
	                    result = arguments[argsIdx];
	                    argsIdx += 1;
	                }
	                combined[combinedIdx] = result;
	                if (!_isPlaceholder(result)) {
	                    left -= 1;
	                }
	                combinedIdx += 1;
	            }
	            return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
	        };
	    };

	    /**
	     * Returns a function that dispatches with different strategies based on the
	     * object in list position (last argument). If it is an array, executes [fn].
	     * Otherwise, if it has a function with [methodname], it will execute that
	     * function (functor case). Otherwise, if it is a transformer, uses transducer
	     * [xf] to return a new transformer (transducer case). Otherwise, it will
	     * default to executing [fn].
	     *
	     * @private
	     * @param {String} methodname property to check for a custom implementation
	     * @param {Function} xf transducer to initialize if object is transformer
	     * @param {Function} fn default ramda implementation
	     * @return {Function} A function that dispatches on object in list position
	     */
	    var _dispatchable = function _dispatchable(methodname, xf, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            if (!_isArray(obj)) {
	                var args = _slice(arguments, 0, length - 1);
	                if (typeof obj[methodname] === 'function') {
	                    return obj[methodname].apply(obj, args);
	                }
	                if (_isTransformer(obj)) {
	                    var transducer = xf.apply(null, args);
	                    return transducer(obj);
	                }
	            }
	            return fn.apply(this, arguments);
	        };
	    };

	    var _dropLastWhile = function dropLastWhile(pred, list) {
	        var idx = list.length - 1;
	        while (idx >= 0 && pred(list[idx])) {
	            idx -= 1;
	        }
	        return _slice(list, 0, idx + 1);
	    };

	    var _xall = function () {
	        function XAll(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.all = true;
	        }
	        XAll.prototype['@@transducer/init'] = _xfBase.init;
	        XAll.prototype['@@transducer/result'] = function (result) {
	            if (this.all) {
	                result = this.xf['@@transducer/step'](result, true);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAll.prototype['@@transducer/step'] = function (result, input) {
	            if (!this.f(input)) {
	                this.all = false;
	                result = _reduced(this.xf['@@transducer/step'](result, false));
	            }
	            return result;
	        };
	        return _curry2(function _xall(f, xf) {
	            return new XAll(f, xf);
	        });
	    }();

	    var _xany = function () {
	        function XAny(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.any = false;
	        }
	        XAny.prototype['@@transducer/init'] = _xfBase.init;
	        XAny.prototype['@@transducer/result'] = function (result) {
	            if (!this.any) {
	                result = this.xf['@@transducer/step'](result, false);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAny.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.any = true;
	                result = _reduced(this.xf['@@transducer/step'](result, true));
	            }
	            return result;
	        };
	        return _curry2(function _xany(f, xf) {
	            return new XAny(f, xf);
	        });
	    }();

	    var _xaperture = function () {
	        function XAperture(n, xf) {
	            this.xf = xf;
	            this.pos = 0;
	            this.full = false;
	            this.acc = new Array(n);
	        }
	        XAperture.prototype['@@transducer/init'] = _xfBase.init;
	        XAperture.prototype['@@transducer/result'] = function (result) {
	            this.acc = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XAperture.prototype['@@transducer/step'] = function (result, input) {
	            this.store(input);
	            return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
	        };
	        XAperture.prototype.store = function (input) {
	            this.acc[this.pos] = input;
	            this.pos += 1;
	            if (this.pos === this.acc.length) {
	                this.pos = 0;
	                this.full = true;
	            }
	        };
	        XAperture.prototype.getCopy = function () {
	            return _concat(_slice(this.acc, this.pos), _slice(this.acc, 0, this.pos));
	        };
	        return _curry2(function _xaperture(n, xf) {
	            return new XAperture(n, xf);
	        });
	    }();

	    var _xdrop = function () {
	        function XDrop(n, xf) {
	            this.xf = xf;
	            this.n = n;
	        }
	        XDrop.prototype['@@transducer/init'] = _xfBase.init;
	        XDrop.prototype['@@transducer/result'] = _xfBase.result;
	        XDrop.prototype['@@transducer/step'] = function (result, input) {
	            if (this.n > 0) {
	                this.n -= 1;
	                return result;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdrop(n, xf) {
	            return new XDrop(n, xf);
	        });
	    }();

	    var _xdropLast = function () {
	        function XDropLast(n, xf) {
	            this.xf = xf;
	            this.pos = 0;
	            this.full = false;
	            this.acc = new Array(n);
	        }
	        XDropLast.prototype['@@transducer/init'] = _xfBase.init;
	        XDropLast.prototype['@@transducer/result'] = function (result) {
	            this.acc = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropLast.prototype['@@transducer/step'] = function (result, input) {
	            if (this.full) {
	                result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
	            }
	            this.store(input);
	            return result;
	        };
	        XDropLast.prototype.store = function (input) {
	            this.acc[this.pos] = input;
	            this.pos += 1;
	            if (this.pos === this.acc.length) {
	                this.pos = 0;
	                this.full = true;
	            }
	        };
	        return _curry2(function _xdropLast(n, xf) {
	            return new XDropLast(n, xf);
	        });
	    }();

	    var _xdropRepeatsWith = function () {
	        function XDropRepeatsWith(pred, xf) {
	            this.xf = xf;
	            this.pred = pred;
	            this.lastValue = undefined;
	            this.seenFirstValue = false;
	        }
	        XDropRepeatsWith.prototype['@@transducer/init'] = function () {
	            return this.xf['@@transducer/init']();
	        };
	        XDropRepeatsWith.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
	            var sameAsLast = false;
	            if (!this.seenFirstValue) {
	                this.seenFirstValue = true;
	            } else if (this.pred(this.lastValue, input)) {
	                sameAsLast = true;
	            }
	            this.lastValue = input;
	            return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropRepeatsWith(pred, xf) {
	            return new XDropRepeatsWith(pred, xf);
	        });
	    }();

	    var _xdropWhile = function () {
	        function XDropWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XDropWhile.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f) {
	                if (this.f(input)) {
	                    return result;
	                }
	                this.f = null;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropWhile(f, xf) {
	            return new XDropWhile(f, xf);
	        });
	    }();

	    var _xfilter = function () {
	        function XFilter(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFilter.prototype['@@transducer/init'] = _xfBase.init;
	        XFilter.prototype['@@transducer/result'] = _xfBase.result;
	        XFilter.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
	        };
	        return _curry2(function _xfilter(f, xf) {
	            return new XFilter(f, xf);
	        });
	    }();

	    var _xfind = function () {
	        function XFind(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.found = false;
	        }
	        XFind.prototype['@@transducer/init'] = _xfBase.init;
	        XFind.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, void 0);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFind.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, input));
	            }
	            return result;
	        };
	        return _curry2(function _xfind(f, xf) {
	            return new XFind(f, xf);
	        });
	    }();

	    var _xfindIndex = function () {
	        function XFindIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.found = false;
	        }
	        XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindIndex.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, -1);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFindIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, this.idx));
	            }
	            return result;
	        };
	        return _curry2(function _xfindIndex(f, xf) {
	            return new XFindIndex(f, xf);
	        });
	    }();

	    var _xfindLast = function () {
	        function XFindLast(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFindLast.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLast.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
	        };
	        XFindLast.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.last = input;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLast(f, xf) {
	            return new XFindLast(f, xf);
	        });
	    }();

	    var _xfindLastIndex = function () {
	        function XFindLastIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.lastIdx = -1;
	        }
	        XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLastIndex.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
	        };
	        XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.lastIdx = this.idx;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLastIndex(f, xf) {
	            return new XFindLastIndex(f, xf);
	        });
	    }();

	    var _xmap = function () {
	        function XMap(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XMap.prototype['@@transducer/init'] = _xfBase.init;
	        XMap.prototype['@@transducer/result'] = _xfBase.result;
	        XMap.prototype['@@transducer/step'] = function (result, input) {
	            return this.xf['@@transducer/step'](result, this.f(input));
	        };
	        return _curry2(function _xmap(f, xf) {
	            return new XMap(f, xf);
	        });
	    }();

	    var _xreduceBy = function () {
	        function XReduceBy(valueFn, valueAcc, keyFn, xf) {
	            this.valueFn = valueFn;
	            this.valueAcc = valueAcc;
	            this.keyFn = keyFn;
	            this.xf = xf;
	            this.inputs = {};
	        }
	        XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
	        XReduceBy.prototype['@@transducer/result'] = function (result) {
	            var key;
	            for (key in this.inputs) {
	                if (_has(key, this.inputs)) {
	                    result = this.xf['@@transducer/step'](result, this.inputs[key]);
	                    if (result['@@transducer/reduced']) {
	                        result = result['@@transducer/value'];
	                        break;
	                    }
	                }
	            }
	            this.inputs = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XReduceBy.prototype['@@transducer/step'] = function (result, input) {
	            var key = this.keyFn(input);
	            this.inputs[key] = this.inputs[key] || [
	                key,
	                this.valueAcc
	            ];
	            this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
	            return result;
	        };
	        return _curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
	            return new XReduceBy(valueFn, valueAcc, keyFn, xf);
	        });
	    }();

	    var _xtake = function () {
	        function XTake(n, xf) {
	            this.xf = xf;
	            this.n = n;
	            this.i = 0;
	        }
	        XTake.prototype['@@transducer/init'] = _xfBase.init;
	        XTake.prototype['@@transducer/result'] = _xfBase.result;
	        XTake.prototype['@@transducer/step'] = function (result, input) {
	            this.i += 1;
	            var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
	            return this.i >= this.n ? _reduced(ret) : ret;
	        };
	        return _curry2(function _xtake(n, xf) {
	            return new XTake(n, xf);
	        });
	    }();

	    var _xtakeWhile = function () {
	        function XTakeWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
	        };
	        return _curry2(function _xtakeWhile(f, xf) {
	            return new XTakeWhile(f, xf);
	        });
	    }();

	    /**
	     * Adds two values.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Number}
	     * @see R.subtract
	     * @example
	     *
	     *      R.add(2, 3);       //=>  5
	     *      R.add(7)(10);      //=> 17
	     */
	    var add = _curry2(function add(a, b) {
	        return Number(a) + Number(b);
	    });

	    /**
	     * Applies a function to the value at the given index of an array, returning a
	     * new copy of the array with the element at the given index replaced with the
	     * result of the function application.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig (a -> a) -> Number -> [a] -> [a]
	     * @param {Function} fn The function to apply.
	     * @param {Number} idx The index.
	     * @param {Array|Arguments} list An array-like object whose value
	     *        at the supplied index will be replaced.
	     * @return {Array} A copy of the supplied array-like object with
	     *         the element at index `idx` replaced with the value
	     *         returned by applying `fn` to the existing element.
	     * @see R.update
	     * @example
	     *
	     *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var adjust = _curry3(function adjust(fn, idx, list) {
	        if (idx >= list.length || idx < -list.length) {
	            return list;
	        }
	        var start = idx < 0 ? list.length : 0;
	        var _idx = start + idx;
	        var _list = _concat(list);
	        _list[_idx] = fn(list[_idx]);
	        return _list;
	    });

	    /**
	     * Returns `true` if all elements of the list match the predicate, `false` if
	     * there are any that don't.
	     *
	     * Dispatches to the `all` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
	     *         otherwise.
	     * @see R.any, R.none, R.transduce
	     * @example
	     *
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      var lessThan3 = R.flip(R.lt)(3);
	     *      R.all(lessThan2)([1, 2]); //=> false
	     *      R.all(lessThan3)([1, 2]); //=> true
	     */
	    var all = _curry2(_dispatchable('all', _xall, function all(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (!fn(list[idx])) {
	                return false;
	            }
	            idx += 1;
	        }
	        return true;
	    }));

	    /**
	     * Returns a function that always returns the given value. Note that for
	     * non-primitives the value returned is a reference to the original value.
	     *
	     * This function is known as `const`, `constant`, or `K` (for K combinator) in
	     * other languages and libraries.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig a -> (* -> a)
	     * @param {*} val The value to wrap in a function
	     * @return {Function} A Function :: * -> val.
	     * @example
	     *
	     *      var t = R.always('Tee');
	     *      t(); //=> 'Tee'
	     */
	    var always = _curry1(function always(val) {
	        return function () {
	            return val;
	        };
	    });

	    /**
	     * Returns `true` if both arguments are `true`; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {Boolean} a A boolean value
	     * @param {Boolean} b A boolean value
	     * @return {Boolean} `true` if both arguments are `true`, `false` otherwise
	     * @see R.both
	     * @example
	     *
	     *      R.and(true, true); //=> true
	     *      R.and(true, false); //=> false
	     *      R.and(false, true); //=> false
	     *      R.and(false, false); //=> false
	     */
	    var and = _curry2(function and(a, b) {
	        return a && b;
	    });

	    /**
	     * Returns `true` if at least one of elements of the list match the predicate,
	     * `false` otherwise.
	     *
	     * Dispatches to the `any` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
	     *         otherwise.
	     * @see R.all, R.none, R.transduce
	     * @example
	     *
	     *      var lessThan0 = R.flip(R.lt)(0);
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      R.any(lessThan0)([1, 2]); //=> false
	     *      R.any(lessThan2)([1, 2]); //=> true
	     */
	    var any = _curry2(_dispatchable('any', _xany, function any(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (fn(list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    }));

	    /**
	     * Returns a new list, composed of n-tuples of consecutive elements If `n` is
	     * greater than the length of the list, an empty list is returned.
	     *
	     * Dispatches to the `aperture` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig Number -> [a] -> [[a]]
	     * @param {Number} n The size of the tuples to create
	     * @param {Array} list The list to split into `n`-tuples
	     * @return {Array} The new list.
	     * @see R.transduce
	     * @example
	     *
	     *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
	     *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
	     *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
	     */
	    var aperture = _curry2(_dispatchable('aperture', _xaperture, _aperture));

	    /**
	     * Returns a new list containing the contents of the given list, followed by
	     * the given element.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The element to add to the end of the new list.
	     * @param {Array} list The list whose contents will be added to the beginning of the output
	     *        list.
	     * @return {Array} A new list containing the contents of the old list followed by `el`.
	     * @see R.prepend
	     * @example
	     *
	     *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
	     *      R.append('tests', []); //=> ['tests']
	     *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
	     */
	    var append = _curry2(function append(el, list) {
	        return _concat(list, [el]);
	    });

	    /**
	     * Applies function `fn` to the argument list `args`. This is useful for
	     * creating a fixed-arity function from a variadic function. `fn` should be a
	     * bound function if context is significant.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig (*... -> a) -> [*] -> a
	     * @param {Function} fn
	     * @param {Array} args
	     * @return {*}
	     * @see R.call, R.unapply
	     * @example
	     *
	     *      var nums = [1, 2, 3, -99, 42, 6, 7];
	     *      R.apply(Math.max, nums); //=> 42
	     */
	    var apply = _curry2(function apply(fn, args) {
	        return fn.apply(this, args);
	    });

	    /**
	     * Makes a shallow clone of an object, setting or overriding the specified
	     * property with the given value. Note that this copies and flattens prototype
	     * properties onto the new object as well. All non-primitive properties are
	     * copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig String -> a -> {k: v} -> {k: v}
	     * @param {String} prop the property name to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except for the specified property.
	     * @see R.dissoc
	     * @example
	     *
	     *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
	     */
	    var assoc = _curry3(function assoc(prop, val, obj) {
	        var result = {};
	        for (var p in obj) {
	            result[p] = obj[p];
	        }
	        result[prop] = val;
	        return result;
	    });

	    /**
	     * Makes a shallow clone of an object, setting or overriding the nodes required
	     * to create the given path, and placing the specific value at the tail end of
	     * that path. Note that this copies and flattens prototype properties onto the
	     * new object as well. All non-primitive properties are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig [String] -> a -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except along the specified path.
	     * @see R.dissocPath
	     * @example
	     *
	     *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
	     */
	    var assocPath = _curry3(function assocPath(path, val, obj) {
	        switch (path.length) {
	        case 0:
	            return val;
	        case 1:
	            return assoc(path[0], val, obj);
	        default:
	            return assoc(path[0], assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
	        }
	    });

	    /**
	     * Creates a function that is bound to a context.
	     * Note: `R.bind` does not provide the additional argument-binding capabilities of
	     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Function
	     * @category Object
	     * @sig (* -> *) -> {*} -> (* -> *)
	     * @param {Function} fn The function to bind to context
	     * @param {Object} thisObj The context to bind `fn` to
	     * @return {Function} A function that will execute in the context of `thisObj`.
	     * @see R.partial
	     * @example
	     *
	     *      var log = R.bind(console.log, console);
	     *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
	     *      // logs {a: 2}
	     */
	    var bind = _curry2(function bind(fn, thisObj) {
	        return _arity(fn.length, function () {
	            return fn.apply(thisObj, arguments);
	        });
	    });

	    /**
	     * Restricts a number to be within a range.
	     *
	     * Also works for other ordered types such as Strings and Dates.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a -> a
	     * @param {Number} minimum number
	     * @param {Number} maximum number
	     * @param {Number} value to be clamped
	     * @return {Number} Returns the clamped value
	     * @example
	     *
	     *      R.clamp(1, 10, -1) // => 1
	     *      R.clamp(1, 10, 11) // => 10
	     *      R.clamp(1, 10, 4)  // => 4
	     */
	    var clamp = _curry3(function clamp(min, max, value) {
	        if (min > max) {
	            throw new Error('min must not be greater than max in clamp(min, max, value)');
	        }
	        return value < min ? min : value > max ? max : value;
	    });

	    /**
	     * Makes a comparator function out of a function that reports whether the first
	     * element is less than the second.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a, b -> Boolean) -> (a, b -> Number)
	     * @param {Function} pred A predicate function of arity two.
	     * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`.
	     * @example
	     *
	     *      var cmp = R.comparator((a, b) => a.age < b.age);
	     *      var people = [
	     *        // ...
	     *      ];
	     *      R.sort(cmp, people);
	     */
	    var comparator = _curry1(function comparator(pred) {
	        return function (a, b) {
	            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
	        };
	    });

	    /**
	     * Returns a curried equivalent of the provided function, with the specified
	     * arity. The curried function has two unusual capabilities. First, its
	     * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	     * following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	     * following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @since v0.5.0
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curry
	     * @example
	     *
	     *      var sumArgs = (...args) => R.sum(args);
	     *
	     *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curryN = _curry2(function curryN(length, fn) {
	        if (length === 1) {
	            return _curry1(fn);
	        }
	        return _arity(length, _curryN(length, [], fn));
	    });

	    /**
	     * Decrements its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @see R.inc
	     * @example
	     *
	     *      R.dec(42); //=> 41
	     */
	    var dec = add(-1);

	    /**
	     * Returns the second argument if it is not `null`, `undefined` or `NaN`
	     * otherwise the first argument is returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Logic
	     * @sig a -> b -> a | b
	     * @param {a} val The default value.
	     * @param {b} val The value to return if it is not null or undefined
	     * @return {*} The the second value or the default value
	     * @example
	     *
	     *      var defaultTo42 = R.defaultTo(42);
	     *
	     *      defaultTo42(null);  //=> 42
	     *      defaultTo42(undefined);  //=> 42
	     *      defaultTo42('Ramda');  //=> 'Ramda'
	     *      defaultTo42(parseInt('string')); //=> 42
	     */
	    var defaultTo = _curry2(function defaultTo(d, v) {
	        return v == null || v !== v ? d : v;
	    });

	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not
	     * contained in the second list. Duplication is determined according to the
	     * value returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
	     * @example
	     *
	     *      var cmp = (x, y) => x.a === y.a;
	     *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
	     *      var l2 = [{a: 3}, {a: 4}];
	     *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
	     */
	    var differenceWith = _curry3(function differenceWith(pred, first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        while (idx < firstLen) {
	            if (!_containsWith(pred, first[idx], second) && !_containsWith(pred, first[idx], out)) {
	                out.push(first[idx]);
	            }
	            idx += 1;
	        }
	        return out;
	    });

	    /**
	     * Returns a new object that does not contain a `prop` property.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Object
	     * @sig String -> {k: v} -> {k: v}
	     * @param {String} prop the name of the property to dissociate
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original but without the specified property
	     * @see R.assoc
	     * @example
	     *
	     *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
	     */
	    var dissoc = _curry2(function dissoc(prop, obj) {
	        var result = {};
	        for (var p in obj) {
	            if (p !== prop) {
	                result[p] = obj[p];
	            }
	        }
	        return result;
	    });

	    /**
	     * Makes a shallow clone of an object, omitting the property at the given path.
	     * Note that this copies and flattens prototype properties onto the new object
	     * as well. All non-primitive properties are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.11.0
	     * @category Object
	     * @sig [String] -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object without the property at path
	     * @see R.assocPath
	     * @example
	     *
	     *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
	     */
	    var dissocPath = _curry2(function dissocPath(path, obj) {
	        switch (path.length) {
	        case 0:
	            return obj;
	        case 1:
	            return dissoc(path[0], obj);
	        default:
	            var head = path[0];
	            var tail = _slice(path, 1);
	            return obj[head] == null ? obj : assoc(head, dissocPath(tail, obj[head]), obj);
	        }
	    });

	    /**
	     * Divides two numbers. Equivalent to `a / b`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a / b`.
	     * @see R.multiply
	     * @example
	     *
	     *      R.divide(71, 100); //=> 0.71
	     *
	     *      var half = R.divide(R.__, 2);
	     *      half(42); //=> 21
	     *
	     *      var reciprocal = R.divide(1);
	     *      reciprocal(4);   //=> 0.25
	     */
	    var divide = _curry2(function divide(a, b) {
	        return a / b;
	    });

	    /**
	     * Returns a new list excluding the leading elements of a given list which
	     * satisfy the supplied predicate function. It passes each value to the supplied
	     * predicate function, skipping elements while the predicate function returns
	     * `true`. The predicate function is applied to one argument: *(value)*.
	     *
	     * Dispatches to the `dropWhile` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.takeWhile, R.transduce, R.addIndex
	     * @example
	     *
	     *      var lteTwo = x => x <= 2;
	     *
	     *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
	     */
	    var dropWhile = _curry2(_dispatchable('dropWhile', _xdropWhile, function dropWhile(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len && pred(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, idx);
	    }));

	    /**
	     * Returns the empty value of its argument's type. Ramda defines the empty
	     * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
	     * types are supported if they define `<Type>.empty` and/or
	     * `<Type>.prototype.empty`.
	     *
	     * Dispatches to the `empty` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig a -> a
	     * @param {*} x
	     * @return {*}
	     * @example
	     *
	     *      R.empty(Just(42));      //=> Nothing()
	     *      R.empty([1, 2, 3]);     //=> []
	     *      R.empty('unicorns');    //=> ''
	     *      R.empty({x: 1, y: 2});  //=> {}
	     */
	    // else
	    var empty = _curry1(function empty(x) {
	        return x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
	            return arguments;
	        }() : // else
	        void 0;
	    });

	    /**
	     * Creates a new object by recursively evolving a shallow copy of `object`,
	     * according to the `transformation` functions. All non-primitive properties
	     * are copied by reference.
	     *
	     * A `transformation` function will not be invoked if its corresponding key
	     * does not exist in the evolved object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {k: (v -> v)} -> {k: v} -> {k: v}
	     * @param {Object} transformations The object specifying transformation functions to apply
	     *        to the object.
	     * @param {Object} object The object to be transformed.
	     * @return {Object} The transformed object.
	     * @example
	     *
	     *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
	     *      var transformations = {
	     *        firstName: R.trim,
	     *        lastName: R.trim, // Will not get invoked.
	     *        data: {elapsed: R.add(1), remaining: R.add(-1)}
	     *      };
	     *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
	     */
	    var evolve = _curry2(function evolve(transformations, object) {
	        var result = {};
	        var transformation, key, type;
	        for (key in object) {
	            transformation = transformations[key];
	            type = typeof transformation;
	            result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
	        }
	        return result;
	    });

	    /**
	     * Returns the first element of the list which matches the predicate, or
	     * `undefined` if no element matches.
	     *
	     * Dispatches to the `find` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     *        desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
	     *      R.find(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var find = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx += 1;
	        }
	    }));

	    /**
	     * Returns the index of the first element of the list which matches the
	     * predicate, or `-1` if no element matches.
	     *
	     * Dispatches to the `findIndex` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
	     *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findIndex = _curry2(_dispatchable('findIndex', _xfindIndex, function findIndex(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    }));

	    /**
	     * Returns the last element of the list which matches the predicate, or
	     * `undefined` if no element matches.
	     *
	     * Dispatches to the `findLast` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
	     *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var findLast = _curry2(_dispatchable('findLast', _xfindLast, function findLast(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx -= 1;
	        }
	    }));

	    /**
	     * Returns the index of the last element of the list which matches the
	     * predicate, or `-1` if no element matches.
	     *
	     * Dispatches to the `findLastIndex` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
	     *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findLastIndex = _curry2(_dispatchable('findLastIndex', _xfindLastIndex, function findLastIndex(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx -= 1;
	        }
	        return -1;
	    }));

	    /**
	     * Iterate over an input `list`, calling a provided function `fn` for each
	     * element in the list.
	     *
	     * `fn` receives one argument: *(value)*.
	     *
	     * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.forEach` method. For more
	     * details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
	     *
	     * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
	     * the original array. In some libraries this function is named `each`.
	     *
	     * Dispatches to the `forEach` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> *) -> [a] -> [a]
	     * @param {Function} fn The function to invoke. Receives one argument, `value`.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} The original list.
	     * @see R.addIndex
	     * @example
	     *
	     *      var printXPlusFive = x => console.log(x + 5);
	     *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
	     *      // logs 6
	     *      // logs 7
	     *      // logs 8
	     */
	    var forEach = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
	        var len = list.length;
	        var idx = 0;
	        while (idx < len) {
	            fn(list[idx]);
	            idx += 1;
	        }
	        return list;
	    }));

	    /**
	     * Creates a new object from a list key-value pairs. If a key appears in
	     * multiple pairs, the rightmost pair is included in the object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [[k,v]] -> {k: v}
	     * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
	     * @return {Object} The object made by pairing up `keys` and `values`.
	     * @see R.toPairs, R.pair
	     * @example
	     *
	     *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
	     */
	    var fromPairs = _curry1(function fromPairs(pairs) {
	        var result = {};
	        var idx = 0;
	        while (idx < pairs.length) {
	            result[pairs[idx][0]] = pairs[idx][1];
	            idx += 1;
	        }
	        return result;
	    });

	    /**
	     * Takes a list and returns a list of lists where each sublist's elements are
	     * all "equal" according to the provided equality function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.21.0
	     * @category List
	     * @sig ((a, a) → Boolean) → [a] → [[a]]
	     * @param {Function} fn Function for determining whether two given (adjacent)
	     *        elements should be in the same group
	     * @param {Array} list The array to group. Also accepts a string, which will be
	     *        treated as a list of characters.
	     * @return {List} A list that contains sublists of equal elements,
	     *         whose concatenations are equal to the original list.
	     * @example
	     *
	     * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
	     * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
	     *
	     * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
	     * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
	     *
	     * R.groupWith(R.eqBy(isVowel), 'aestiou')
	     * //=> ['ae', 'st', 'iou']
	     */
	    var groupWith = _curry2(function (fn, list) {
	        var res = [];
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            var nextidx = idx + 1;
	            while (nextidx < len && fn(list[idx], list[nextidx])) {
	                nextidx += 1;
	            }
	            res.push(list.slice(idx, nextidx));
	            idx = nextidx;
	        }
	        return res;
	    });

	    /**
	     * Returns `true` if the first argument is greater than the second; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @see R.lt
	     * @example
	     *
	     *      R.gt(2, 1); //=> true
	     *      R.gt(2, 2); //=> false
	     *      R.gt(2, 3); //=> false
	     *      R.gt('a', 'z'); //=> false
	     *      R.gt('z', 'a'); //=> true
	     */
	    var gt = _curry2(function gt(a, b) {
	        return a > b;
	    });

	    /**
	     * Returns `true` if the first argument is greater than or equal to the second;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean}
	     * @see R.lte
	     * @example
	     *
	     *      R.gte(2, 1); //=> true
	     *      R.gte(2, 2); //=> true
	     *      R.gte(2, 3); //=> false
	     *      R.gte('a', 'z'); //=> false
	     *      R.gte('z', 'a'); //=> true
	     */
	    var gte = _curry2(function gte(a, b) {
	        return a >= b;
	    });

	    /**
	     * Returns whether or not an object has an own property with the specified name
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      var hasName = R.has('name');
	     *      hasName({name: 'alice'});   //=> true
	     *      hasName({name: 'bob'});     //=> true
	     *      hasName({});                //=> false
	     *
	     *      var point = {x: 0, y: 0};
	     *      var pointHas = R.has(R.__, point);
	     *      pointHas('x');  //=> true
	     *      pointHas('y');  //=> true
	     *      pointHas('z');  //=> false
	     */
	    var has = _curry2(_has);

	    /**
	     * Returns whether or not an object or its prototype chain has a property with
	     * the specified name
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      function Rectangle(width, height) {
	     *        this.width = width;
	     *        this.height = height;
	     *      }
	     *      Rectangle.prototype.area = function() {
	     *        return this.width * this.height;
	     *      };
	     *
	     *      var square = new Rectangle(2, 2);
	     *      R.hasIn('width', square);  //=> true
	     *      R.hasIn('area', square);  //=> true
	     */
	    var hasIn = _curry2(function hasIn(prop, obj) {
	        return prop in obj;
	    });

	    /**
	     * Returns true if its arguments are identical, false otherwise. Values are
	     * identical if they reference the same memory. `NaN` is identical to `NaN`;
	     * `0` and `-0` are not identical.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Relation
	     * @sig a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      var o = {};
	     *      R.identical(o, o); //=> true
	     *      R.identical(1, 1); //=> true
	     *      R.identical(1, '1'); //=> false
	     *      R.identical([], []); //=> false
	     *      R.identical(0, -0); //=> false
	     *      R.identical(NaN, NaN); //=> true
	     */
	    // SameValue algorithm
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Step 6.a: NaN == NaN
	    var identical = _curry2(function identical(a, b) {
	        // SameValue algorithm
	        if (a === b) {
	            // Steps 1-5, 7-10
	            // Steps 6.b-6.e: +0 != -0
	            return a !== 0 || 1 / a === 1 / b;
	        } else {
	            // Step 6.a: NaN == NaN
	            return a !== a && b !== b;
	        }
	    });

	    /**
	     * A function that does nothing but return the parameter supplied to it. Good
	     * as a default or placeholder function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig a -> a
	     * @param {*} x The value to return.
	     * @return {*} The input value, `x`.
	     * @example
	     *
	     *      R.identity(1); //=> 1
	     *
	     *      var obj = {};
	     *      R.identity(obj) === obj; //=> true
	     */
	    var identity = _curry1(_identity);

	    /**
	     * Creates a function that will process either the `onTrue` or the `onFalse`
	     * function depending upon the result of the `condition` predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
	     * @param {Function} condition A predicate function
	     * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
	     * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
	     * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
	     *                    function depending upon the result of the `condition` predicate.
	     * @see R.unless, R.when
	     * @example
	     *
	     *      var incCount = R.ifElse(
	     *        R.has('count'),
	     *        R.over(R.lensProp('count'), R.inc),
	     *        R.assoc('count', 1)
	     *      );
	     *      incCount({});           //=> { count: 1 }
	     *      incCount({ count: 1 }); //=> { count: 2 }
	     */
	    var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
	        return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
	            return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
	        });
	    });

	    /**
	     * Increments its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @see R.dec
	     * @example
	     *
	     *      R.inc(42); //=> 43
	     */
	    var inc = add(1);

	    /**
	     * Inserts the supplied element into the list, at index `index`. _Note that
	     * this is not destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.2
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} index The position to insert the element
	     * @param {*} elt The element to insert into the Array
	     * @param {Array} list The list to insert into
	     * @return {Array} A new Array with `elt` inserted at `index`.
	     * @example
	     *
	     *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
	     */
	    var insert = _curry3(function insert(idx, elt, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        var result = _slice(list);
	        result.splice(idx, 0, elt);
	        return result;
	    });

	    /**
	     * Inserts the sub-list into the list, at index `index`. _Note that this is not
	     * destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig Number -> [a] -> [a] -> [a]
	     * @param {Number} index The position to insert the sub-list
	     * @param {Array} elts The sub-list to insert into the Array
	     * @param {Array} list The list to insert the sub-list into
	     * @return {Array} A new Array with `elts` inserted starting at `index`.
	     * @example
	     *
	     *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
	     */
	    var insertAll = _curry3(function insertAll(idx, elts, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
	    });

	    /**
	     * Creates a new list with the separator interposed between elements.
	     *
	     * Dispatches to the `intersperse` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} separator The element to add to the list.
	     * @param {Array} list The list to be interposed.
	     * @return {Array} The new list.
	     * @example
	     *
	     *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
	     */
	    var intersperse = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
	        var out = [];
	        var idx = 0;
	        var length = list.length;
	        while (idx < length) {
	            if (idx === length - 1) {
	                out.push(list[idx]);
	            } else {
	                out.push(list[idx], separator);
	            }
	            idx += 1;
	        }
	        return out;
	    }));

	    /**
	     * See if an object (`val`) is an instance of the supplied constructor. This
	     * function will check up the inheritance chain, if any.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Type
	     * @sig (* -> {*}) -> a -> Boolean
	     * @param {Object} ctor A constructor
	     * @param {*} val The value to test
	     * @return {Boolean}
	     * @example
	     *
	     *      R.is(Object, {}); //=> true
	     *      R.is(Number, 1); //=> true
	     *      R.is(Object, 1); //=> false
	     *      R.is(String, 's'); //=> true
	     *      R.is(String, new String('')); //=> true
	     *      R.is(Object, new String('')); //=> true
	     *      R.is(Object, 's'); //=> false
	     *      R.is(Number, {}); //=> false
	     */
	    var is = _curry2(function is(Ctor, val) {
	        return val != null && val.constructor === Ctor || val instanceof Ctor;
	    });

	    /**
	     * Tests whether or not an object is similar to an array.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.5.0
	     * @category Type
	     * @category List
	     * @sig * -> Boolean
	     * @param {*} x The object to test.
	     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	     * @example
	     *
	     *      R.isArrayLike([]); //=> true
	     *      R.isArrayLike(true); //=> false
	     *      R.isArrayLike({}); //=> false
	     *      R.isArrayLike({length: 10}); //=> false
	     *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	     */
	    var isArrayLike = _curry1(function isArrayLike(x) {
	        if (_isArray(x)) {
	            return true;
	        }
	        if (!x) {
	            return false;
	        }
	        if (typeof x !== 'object') {
	            return false;
	        }
	        if (_isString(x)) {
	            return false;
	        }
	        if (x.nodeType === 1) {
	            return !!x.length;
	        }
	        if (x.length === 0) {
	            return true;
	        }
	        if (x.length > 0) {
	            return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	        }
	        return false;
	    });

	    /**
	     * Checks if the input value is `null` or `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Type
	     * @sig * -> Boolean
	     * @param {*} x The value to test.
	     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
	     * @example
	     *
	     *      R.isNil(null); //=> true
	     *      R.isNil(undefined); //=> true
	     *      R.isNil(0); //=> false
	     *      R.isNil([]); //=> false
	     */
	    var isNil = _curry1(function isNil(x) {
	        return x == null;
	    });

	    /**
	     * Returns a list containing the names of all the enumerable own properties of
	     * the supplied object.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own properties.
	     * @example
	     *
	     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
	     */
	    // cover IE < 9 keys issues
	    // Safari bug
	    var keys = function () {
	        // cover IE < 9 keys issues
	        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	        var nonEnumerableProps = [
	            'constructor',
	            'valueOf',
	            'isPrototypeOf',
	            'toString',
	            'propertyIsEnumerable',
	            'hasOwnProperty',
	            'toLocaleString'
	        ];
	        // Safari bug
	        var hasArgsEnumBug = function () {
	            'use strict';
	            return arguments.propertyIsEnumerable('length');
	        }();
	        var contains = function contains(list, item) {
	            var idx = 0;
	            while (idx < list.length) {
	                if (list[idx] === item) {
	                    return true;
	                }
	                idx += 1;
	            }
	            return false;
	        };
	        return typeof Object.keys === 'function' && !hasArgsEnumBug ? _curry1(function keys(obj) {
	            return Object(obj) !== obj ? [] : Object.keys(obj);
	        }) : _curry1(function keys(obj) {
	            if (Object(obj) !== obj) {
	                return [];
	            }
	            var prop, nIdx;
	            var ks = [];
	            var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
	            for (prop in obj) {
	                if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
	                    ks[ks.length] = prop;
	                }
	            }
	            if (hasEnumBug) {
	                nIdx = nonEnumerableProps.length - 1;
	                while (nIdx >= 0) {
	                    prop = nonEnumerableProps[nIdx];
	                    if (_has(prop, obj) && !contains(ks, prop)) {
	                        ks[ks.length] = prop;
	                    }
	                    nIdx -= 1;
	                }
	            }
	            return ks;
	        });
	    }();

	    /**
	     * Returns a list containing the names of all the properties of the supplied
	     * object, including prototype properties.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.keysIn(f); //=> ['x', 'y']
	     */
	    var keysIn = _curry1(function keysIn(obj) {
	        var prop;
	        var ks = [];
	        for (prop in obj) {
	            ks[ks.length] = prop;
	        }
	        return ks;
	    });

	    /**
	     * Returns the number of elements in the array by returning `list.length`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [a] -> Number
	     * @param {Array} list The array to inspect.
	     * @return {Number} The length of the array.
	     * @example
	     *
	     *      R.length([]); //=> 0
	     *      R.length([1, 2, 3]); //=> 3
	     */
	    var length = _curry1(function length(list) {
	        return list != null && _isNumber(list.length) ? list.length : NaN;
	    });

	    /**
	     * Returns `true` if the first argument is less than the second; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @see R.gt
	     * @example
	     *
	     *      R.lt(2, 1); //=> false
	     *      R.lt(2, 2); //=> false
	     *      R.lt(2, 3); //=> true
	     *      R.lt('a', 'z'); //=> true
	     *      R.lt('z', 'a'); //=> false
	     */
	    var lt = _curry2(function lt(a, b) {
	        return a < b;
	    });

	    /**
	     * Returns `true` if the first argument is less than or equal to the second;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean}
	     * @see R.gte
	     * @example
	     *
	     *      R.lte(2, 1); //=> false
	     *      R.lte(2, 2); //=> true
	     *      R.lte(2, 3); //=> true
	     *      R.lte('a', 'z'); //=> true
	     *      R.lte('z', 'a'); //=> false
	     */
	    var lte = _curry2(function lte(a, b) {
	        return a <= b;
	    });

	    /**
	     * The mapAccum function behaves like a combination of map and reduce; it
	     * applies a function to each element of a list, passing an accumulating
	     * parameter from left to right, and returning a final value of this
	     * accumulator together with the new list.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should
	     * return a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var appender = (a, b) => [a + b, a + b];
	     *
	     *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
	     */
	    var mapAccum = _curry3(function mapAccum(fn, acc, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        var tuple = [acc];
	        while (idx < len) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx += 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });

	    /**
	     * The mapAccumRight function behaves like a combination of map and reduce; it
	     * applies a function to each element of a list, passing an accumulating
	     * parameter from right to left, and returning a final value of this
	     * accumulator together with the new list.
	     *
	     * Similar to `mapAccum`, except moves through the input list from the right to
	     * the left.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should
	     * return a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var append = (a, b) => [a + b, a + b];
	     *
	     *      R.mapAccumRight(append, 0, digits); //=> ['04321', ['04321', '0432', '043', '04']]
	     */
	    var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
	        var idx = list.length - 1;
	        var result = [];
	        var tuple = [acc];
	        while (idx >= 0) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx -= 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });

	    /**
	     * Tests a regular expression against a String. Note that this function will
	     * return an empty array when there are no matches. This differs from
	     * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
	     * which returns `null` when there are no matches.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category String
	     * @sig RegExp -> String -> [String | Undefined]
	     * @param {RegExp} rx A regular expression.
	     * @param {String} str The string to match against
	     * @return {Array} The list of matches or empty array.
	     * @see R.test
	     * @example
	     *
	     *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
	     *      R.match(/a/, 'b'); //=> []
	     *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
	     */
	    var match = _curry2(function match(rx, str) {
	        return str.match(rx) || [];
	    });

	    /**
	     * mathMod behaves like the modulo operator should mathematically, unlike the
	     * `%` operator (and by extension, R.modulo). So while "-17 % 5" is -2,
	     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
	     * when the modulus is zero or negative.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} m The dividend.
	     * @param {Number} p the modulus.
	     * @return {Number} The result of `b mod a`.
	     * @example
	     *
	     *      R.mathMod(-17, 5);  //=> 3
	     *      R.mathMod(17, 5);   //=> 2
	     *      R.mathMod(17, -5);  //=> NaN
	     *      R.mathMod(17, 0);   //=> NaN
	     *      R.mathMod(17.2, 5); //=> NaN
	     *      R.mathMod(17, 5.3); //=> NaN
	     *
	     *      var clock = R.mathMod(R.__, 12);
	     *      clock(15); //=> 3
	     *      clock(24); //=> 0
	     *
	     *      var seventeenMod = R.mathMod(17);
	     *      seventeenMod(3);  //=> 2
	     *      seventeenMod(4);  //=> 1
	     *      seventeenMod(10); //=> 7
	     */
	    var mathMod = _curry2(function mathMod(m, p) {
	        if (!_isInteger(m)) {
	            return NaN;
	        }
	        if (!_isInteger(p) || p < 1) {
	            return NaN;
	        }
	        return (m % p + p) % p;
	    });

	    /**
	     * Returns the larger of its two arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.maxBy, R.min
	     * @example
	     *
	     *      R.max(789, 123); //=> 789
	     *      R.max('a', 'b'); //=> 'b'
	     */
	    var max = _curry2(function max(a, b) {
	        return b > a ? b : a;
	    });

	    /**
	     * Takes a function and two values, and returns whichever value produces the
	     * larger result when passed to the provided function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> a -> a -> a
	     * @param {Function} f
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.max, R.minBy
	     * @example
	     *
	     *      //  square :: Number -> Number
	     *      var square = n => n * n;
	     *
	     *      R.maxBy(square, -3, 2); //=> -3
	     *
	     *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
	     *      R.reduce(R.maxBy(square), 0, []); //=> 0
	     */
	    var maxBy = _curry3(function maxBy(f, a, b) {
	        return f(b) > f(a) ? b : a;
	    });

	    /**
	     * Create a new object with the own properties of the first object merged with
	     * the own properties of the second object. If a key exists in both objects,
	     * the value from the second object will be used.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> {k: v} -> {k: v}
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.mergeWith, R.mergeWithKey
	     * @example
	     *
	     *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	     *      //=> { 'name': 'fred', 'age': 40 }
	     *
	     *      var resetToDefault = R.merge(R.__, {x: 0});
	     *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
	     */
	    var merge = _curry2(function merge(l, r) {
	        return _assign({}, l, r);
	    });

	    /**
	     * Merges a list of objects together into one object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig [{k: v}] -> {k: v}
	     * @param {Array} list An array of objects
	     * @return {Object} A merged object.
	     * @see R.reduce
	     * @example
	     *
	     *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
	     *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
	     */
	    var mergeAll = _curry1(function mergeAll(list) {
	        return _assign.apply(null, [{}].concat(list));
	    });

	    /**
	     * Creates a new object with the own properties of the two provided objects. If
	     * a key exists in both objects, the provided function is applied to the key
	     * and the values associated with the key in each object, with the result being
	     * used as the value associated with the key in the returned object. The key
	     * will be excluded from the returned object if the resulting value is
	     * `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @sig (String -> a -> a -> a) -> {a} -> {a} -> {a}
	     * @param {Function} fn
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.merge, R.mergeWith
	     * @example
	     *
	     *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
	     *      R.mergeWithKey(concatValues,
	     *                     { a: true, thing: 'foo', values: [10, 20] },
	     *                     { b: true, thing: 'bar', values: [15, 35] });
	     *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
	     */
	    var mergeWithKey = _curry3(function mergeWithKey(fn, l, r) {
	        var result = {};
	        var k;
	        for (k in l) {
	            if (_has(k, l)) {
	                result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
	            }
	        }
	        for (k in r) {
	            if (_has(k, r) && !_has(k, result)) {
	                result[k] = r[k];
	            }
	        }
	        return result;
	    });

	    /**
	     * Returns the smaller of its two arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.minBy, R.max
	     * @example
	     *
	     *      R.min(789, 123); //=> 123
	     *      R.min('a', 'b'); //=> 'a'
	     */
	    var min = _curry2(function min(a, b) {
	        return b < a ? b : a;
	    });

	    /**
	     * Takes a function and two values, and returns whichever value produces the
	     * smaller result when passed to the provided function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> a -> a -> a
	     * @param {Function} f
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.min, R.maxBy
	     * @example
	     *
	     *      //  square :: Number -> Number
	     *      var square = n => n * n;
	     *
	     *      R.minBy(square, -3, 2); //=> 2
	     *
	     *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
	     *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
	     */
	    var minBy = _curry3(function minBy(f, a, b) {
	        return f(b) < f(a) ? b : a;
	    });

	    /**
	     * Divides the first parameter by the second and returns the remainder. Note
	     * that this function preserves the JavaScript-style behavior for modulo. For
	     * mathematical modulo see `mathMod`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The value to the divide.
	     * @param {Number} b The pseudo-modulus
	     * @return {Number} The result of `b % a`.
	     * @see R.mathMod
	     * @example
	     *
	     *      R.modulo(17, 3); //=> 2
	     *      // JS behavior:
	     *      R.modulo(-17, 3); //=> -2
	     *      R.modulo(17, -3); //=> 2
	     *
	     *      var isOdd = R.modulo(R.__, 2);
	     *      isOdd(42); //=> 0
	     *      isOdd(21); //=> 1
	     */
	    var modulo = _curry2(function modulo(a, b) {
	        return a % b;
	    });

	    /**
	     * Multiplies two numbers. Equivalent to `a * b` but curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a * b`.
	     * @see R.divide
	     * @example
	     *
	     *      var double = R.multiply(2);
	     *      var triple = R.multiply(3);
	     *      double(3);       //=>  6
	     *      triple(4);       //=> 12
	     *      R.multiply(2, 5);  //=> 10
	     */
	    var multiply = _curry2(function multiply(a, b) {
	        return a * b;
	    });

	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly `n` parameters. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} n The desired arity of the new function.
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity `n`.
	     * @example
	     *
	     *      var takesTwoArgs = (a, b) => [a, b];
	     *
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.nAry(1, takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only `n` arguments are passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var nAry = _curry2(function nAry(n, fn) {
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.call(this);
	            };
	        case 1:
	            return function (a0) {
	                return fn.call(this, a0);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.call(this, a0, a1);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.call(this, a0, a1, a2);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.call(this, a0, a1, a2, a3);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.call(this, a0, a1, a2, a3, a4);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
	            };
	        default:
	            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
	        }
	    });

	    /**
	     * Negates its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @example
	     *
	     *      R.negate(42); //=> -42
	     */
	    var negate = _curry1(function negate(n) {
	        return -n;
	    });

	    /**
	     * Returns `true` if no elements of the list match the predicate, `false`
	     * otherwise.
	     *
	     * Dispatches to the `any` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
	     * @see R.all, R.any
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *
	     *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
	     *      R.none(isEven, [1, 3, 5, 7, 8, 11]); //=> false
	     */
	    var none = _curry2(_complement(_dispatchable('any', _xany, any)));

	    /**
	     * A function that returns the `!` of its argument. It will return `true` when
	     * passed false-y value, and `false` when passed a truth-y one.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> Boolean
	     * @param {*} a any value
	     * @return {Boolean} the logical inverse of passed argument.
	     * @see R.complement
	     * @example
	     *
	     *      R.not(true); //=> false
	     *      R.not(false); //=> true
	     *      R.not(0); //=> true
	     *      R.not(1); //=> false
	     */
	    var not = _curry1(function not(a) {
	        return !a;
	    });

	    /**
	     * Returns the nth element of the given list or string. If n is negative the
	     * element at index length + n is returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> a | Undefined
	     * @sig Number -> String -> String
	     * @param {Number} offset
	     * @param {*} list
	     * @return {*}
	     * @example
	     *
	     *      var list = ['foo', 'bar', 'baz', 'quux'];
	     *      R.nth(1, list); //=> 'bar'
	     *      R.nth(-1, list); //=> 'quux'
	     *      R.nth(-99, list); //=> undefined
	     *
	     *      R.nth(2, 'abc'); //=> 'c'
	     *      R.nth(3, 'abc'); //=> ''
	     */
	    var nth = _curry2(function nth(offset, list) {
	        var idx = offset < 0 ? list.length + offset : offset;
	        return _isString(list) ? list.charAt(idx) : list[idx];
	    });

	    /**
	     * Returns a function which returns its nth argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig Number -> *... -> *
	     * @param {Number} n
	     * @return {Function}
	     * @example
	     *
	     *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
	     *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
	     */
	    var nthArg = _curry1(function nthArg(n) {
	        var arity = n < 0 ? 1 : n + 1;
	        return curryN(arity, function () {
	            return nth(n, arguments);
	        });
	    });

	    /**
	     * Creates an object containing a single key:value pair.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Object
	     * @sig String -> a -> {String:a}
	     * @param {String} key
	     * @param {*} val
	     * @return {Object}
	     * @see R.pair
	     * @example
	     *
	     *      var matchPhrases = R.compose(
	     *        R.objOf('must'),
	     *        R.map(R.objOf('match_phrase'))
	     *      );
	     *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
	     */
	    var objOf = _curry2(function objOf(key, val) {
	        var obj = {};
	        obj[key] = val;
	        return obj;
	    });

	    /**
	     * Returns a singleton array containing the value provided.
	     *
	     * Note this `of` is different from the ES6 `of`; See
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig a -> [a]
	     * @param {*} x any value
	     * @return {Array} An array wrapping `x`.
	     * @example
	     *
	     *      R.of(null); //=> [null]
	     *      R.of([42]); //=> [[42]]
	     */
	    var of = _curry1(_of);

	    /**
	     * Accepts a function `fn` and returns a function that guards invocation of
	     * `fn` such that `fn` can only ever be called once, no matter how many times
	     * the returned function is invoked. The first value calculated is returned in
	     * subsequent invocations.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a... -> b) -> (a... -> b)
	     * @param {Function} fn The function to wrap in a call-only-once wrapper.
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      var addOneOnce = R.once(x => x + 1);
	     *      addOneOnce(10); //=> 11
	     *      addOneOnce(addOneOnce(50)); //=> 11
	     */
	    var once = _curry1(function once(fn) {
	        var called = false;
	        var result;
	        return _arity(fn.length, function () {
	            if (called) {
	                return result;
	            }
	            called = true;
	            result = fn.apply(this, arguments);
	            return result;
	        });
	    });

	    /**
	     * Returns `true` if one or both of its arguments are `true`. Returns `false`
	     * if both arguments are `false`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {Boolean} a A boolean value
	     * @param {Boolean} b A boolean value
	     * @return {Boolean} `true` if one or both arguments are `true`, `false` otherwise
	     * @see R.either
	     * @example
	     *
	     *      R.or(true, true); //=> true
	     *      R.or(true, false); //=> true
	     *      R.or(false, true); //=> true
	     *      R.or(false, false); //=> false
	     */
	    var or = _curry2(function or(a, b) {
	        return a || b;
	    });

	    /**
	     * Returns the result of "setting" the portion of the given data structure
	     * focused by the given lens to the result of applying the given function to
	     * the focused value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> (a -> a) -> s -> s
	     * @param {Lens} lens
	     * @param {*} v
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *
	     *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
	     */
	    // `Identity` is a functor that holds a single value, where `map` simply
	    // transforms the held value with the provided function.
	    // The value returned by the getter function is first transformed with `f`,
	    // then set as the value of an `Identity`. This is then mapped over with the
	    // setter function of the lens.
	    var over = function () {
	        // `Identity` is a functor that holds a single value, where `map` simply
	        // transforms the held value with the provided function.
	        var Identity = function (x) {
	            return {
	                value: x,
	                map: function (f) {
	                    return Identity(f(x));
	                }
	            };
	        };
	        return _curry3(function over(lens, f, x) {
	            // The value returned by the getter function is first transformed with `f`,
	            // then set as the value of an `Identity`. This is then mapped over with the
	            // setter function of the lens.
	            return lens(function (y) {
	                return Identity(f(y));
	            })(x).value;
	        });
	    }();

	    /**
	     * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category List
	     * @sig a -> b -> (a,b)
	     * @param {*} fst
	     * @param {*} snd
	     * @return {Array}
	     * @see R.objOf, R.of
	     * @example
	     *
	     *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
	     */
	    var pair = _curry2(function pair(fst, snd) {
	        return [
	            fst,
	            snd
	        ];
	    });

	    /**
	     * Retrieve the value at a given path.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig [String] -> {k: v} -> v | Undefined
	     * @param {Array} path The path to use.
	     * @param {Object} obj The object to retrieve the nested property from.
	     * @return {*} The data at `path`.
	     * @see R.prop
	     * @example
	     *
	     *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
	     *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
	     */
	    var path = _curry2(function path(paths, obj) {
	        var val = obj;
	        var idx = 0;
	        while (idx < paths.length) {
	            if (val == null) {
	                return;
	            }
	            val = val[paths[idx]];
	            idx += 1;
	        }
	        return val;
	    });

	    /**
	     * If the given, non-null object has a value at the given path, returns the
	     * value at that path. Otherwise returns the provided default value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Object
	     * @sig a -> [String] -> Object -> a
	     * @param {*} d The default value.
	     * @param {Array} p The path to use.
	     * @param {Object} obj The object to retrieve the nested property from.
	     * @return {*} The data at `path` of the supplied object or the default value.
	     * @example
	     *
	     *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
	     *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
	     */
	    var pathOr = _curry3(function pathOr(d, p, obj) {
	        return defaultTo(d, path(p, obj));
	    });

	    /**
	     * Returns `true` if the specified object property at given path satisfies the
	     * given predicate; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Logic
	     * @sig (a -> Boolean) -> [String] -> Object -> Boolean
	     * @param {Function} pred
	     * @param {Array} propPath
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.propSatisfies, R.path
	     * @example
	     *
	     *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
	     */
	    var pathSatisfies = _curry3(function pathSatisfies(pred, propPath, obj) {
	        return propPath.length > 0 && pred(path(propPath, obj));
	    });

	    /**
	     * Returns a partial copy of an object containing only the keys specified. If
	     * the key does not exist, the property is ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @see R.omit, R.props
	     * @example
	     *
	     *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
	     */
	    var pick = _curry2(function pick(names, obj) {
	        var result = {};
	        var idx = 0;
	        while (idx < names.length) {
	            if (names[idx] in obj) {
	                result[names[idx]] = obj[names[idx]];
	            }
	            idx += 1;
	        }
	        return result;
	    });

	    /**
	     * Similar to `pick` except that this one includes a `key: undefined` pair for
	     * properties that don't exist.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @see R.pick
	     * @example
	     *
	     *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
	     */
	    var pickAll = _curry2(function pickAll(names, obj) {
	        var result = {};
	        var idx = 0;
	        var len = names.length;
	        while (idx < len) {
	            var name = names[idx];
	            result[name] = obj[name];
	            idx += 1;
	        }
	        return result;
	    });

	    /**
	     * Returns a partial copy of an object containing only the keys that satisfy
	     * the supplied predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
	     * @param {Function} pred A predicate to determine whether or not a key
	     *        should be included on the output object.
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties that satisfy `pred`
	     *         on it.
	     * @see R.pick, R.filter
	     * @example
	     *
	     *      var isUpperCase = (val, key) => key.toUpperCase() === key;
	     *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
	     */
	    var pickBy = _curry2(function pickBy(test, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (test(obj[prop], prop, obj)) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });

	    /**
	     * Returns a new list with the given element at the front, followed by the
	     * contents of the list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The item to add to the head of the output list.
	     * @param {Array} list The array to add to the tail of the output list.
	     * @return {Array} A new array.
	     * @see R.append
	     * @example
	     *
	     *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
	     */
	    var prepend = _curry2(function prepend(el, list) {
	        return _concat([el], list);
	    });

	    /**
	     * Returns a function that when supplied an object returns the indicated
	     * property of that object, if it exists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig s -> {s: a} -> a | Undefined
	     * @param {String} p The property name
	     * @param {Object} obj The object to query
	     * @return {*} The value at `obj.p`.
	     * @see R.path
	     * @example
	     *
	     *      R.prop('x', {x: 100}); //=> 100
	     *      R.prop('x', {}); //=> undefined
	     */
	    var prop = _curry2(function prop(p, obj) {
	        return obj[p];
	    });

	    /**
	     * Returns `true` if the specified object property is of the given type;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Type
	     * @sig Type -> String -> Object -> Boolean
	     * @param {Function} type
	     * @param {String} name
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.is, R.propSatisfies
	     * @example
	     *
	     *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
	     *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
	     *      R.propIs(Number, 'x', {});            //=> false
	     */
	    var propIs = _curry3(function propIs(type, name, obj) {
	        return is(type, obj[name]);
	    });

	    /**
	     * If the given, non-null object has an own property with the specified name,
	     * returns the value of that property. Otherwise returns the provided default
	     * value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Object
	     * @sig a -> String -> Object -> a
	     * @param {*} val The default value.
	     * @param {String} p The name of the property to return.
	     * @param {Object} obj The object to query.
	     * @return {*} The value of given property of the supplied object or the default value.
	     * @example
	     *
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var favorite = R.prop('favoriteLibrary');
	     *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
	     *
	     *      favorite(alice);  //=> undefined
	     *      favoriteWithDefault(alice);  //=> 'Ramda'
	     */
	    var propOr = _curry3(function propOr(val, p, obj) {
	        return obj != null && _has(p, obj) ? obj[p] : val;
	    });

	    /**
	     * Returns `true` if the specified object property satisfies the given
	     * predicate; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Logic
	     * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
	     * @param {Function} pred
	     * @param {String} name
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.propEq, R.propIs
	     * @example
	     *
	     *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
	     */
	    var propSatisfies = _curry3(function propSatisfies(pred, name, obj) {
	        return pred(obj[name]);
	    });

	    /**
	     * Acts as multiple `prop`: array of keys in, array of values out. Preserves
	     * order.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> [v]
	     * @param {Array} ps The property names to fetch
	     * @param {Object} obj The object to query
	     * @return {Array} The corresponding values or partially applied function.
	     * @example
	     *
	     *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
	     *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
	     *
	     *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
	     *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
	     */
	    var props = _curry2(function props(ps, obj) {
	        var len = ps.length;
	        var out = [];
	        var idx = 0;
	        while (idx < len) {
	            out[idx] = obj[ps[idx]];
	            idx += 1;
	        }
	        return out;
	    });

	    /**
	     * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> Number -> [Number]
	     * @param {Number} from The first number in the list.
	     * @param {Number} to One more than the last number in the list.
	     * @return {Array} The list of numbers in tthe set `[a, b)`.
	     * @example
	     *
	     *      R.range(1, 5);    //=> [1, 2, 3, 4]
	     *      R.range(50, 53);  //=> [50, 51, 52]
	     */
	    var range = _curry2(function range(from, to) {
	        if (!(_isNumber(from) && _isNumber(to))) {
	            throw new TypeError('Both arguments to range must be numbers');
	        }
	        var result = [];
	        var n = from;
	        while (n < to) {
	            result.push(n);
	            n += 1;
	        }
	        return result;
	    });

	    /**
	     * Returns a single item by iterating through the list, successively calling
	     * the iterator function and passing it an accumulator value and the current
	     * value from the array, and then passing the result to the next call.
	     *
	     * Similar to `reduce`, except moves through the input list from the right to
	     * the left.
	     *
	     * The iterator function receives two values: *(acc, value)*
	     *
	     * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.reduce` method. For more details
	     * on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
	     *      var flattenPairs = (acc, pair) => acc.concat(pair);
	     *
	     *      R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
	     */
	    var reduceRight = _curry3(function reduceRight(fn, acc, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            acc = fn(acc, list[idx]);
	            idx -= 1;
	        }
	        return acc;
	    });

	    /**
	     * Returns a value wrapped to indicate that it is the final value of the reduce
	     * and transduce functions. The returned value should be considered a black
	     * box: the internal structure is not guaranteed to be stable.
	     *
	     * Note: this optimization is unavailable to functions not explicitly listed
	     * above. For instance, it is not currently supported by reduceRight.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category List
	     * @sig a -> *
	     * @param {*} x The final value of the reduce.
	     * @return {*} The wrapped value.
	     * @see R.reduce, R.transduce
	     * @example
	     *
	     *      R.reduce(
	     *        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
	     *        0,
	     *        [1, 2, 3, 4, 5]) // 10
	     */
	    var reduced = _curry1(_reduced);

	    /**
	     * Removes the sub-list of `list` starting at index `start` and containing
	     * `count` elements. _Note that this is not destructive_: it returns a copy of
	     * the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.2
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @param {Number} start The position to start removing elements
	     * @param {Number} count The number of elements to remove
	     * @param {Array} list The list to remove from
	     * @return {Array} A new Array with `count` elements from `start` removed.
	     * @example
	     *
	     *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
	     */
	    var remove = _curry3(function remove(start, count, list) {
	        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
	    });

	    /**
	     * Replace a substring or regex match in a string with a replacement.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category String
	     * @sig RegExp|String -> String -> String -> String
	     * @param {RegExp|String} pattern A regular expression or a substring to match.
	     * @param {String} replacement The string to replace the matches with.
	     * @param {String} str The String to do the search and replacement in.
	     * @return {String} The result.
	     * @example
	     *
	     *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *
	     *      // Use the "g" (global) flag to replace all occurrences:
	     *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
	     */
	    var replace = _curry3(function replace(regex, replacement, str) {
	        return str.replace(regex, replacement);
	    });

	    /**
	     * Returns a new list or string with the elements or characters in reverse
	     * order.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {Array|String} list
	     * @return {Array|String}
	     * @example
	     *
	     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	     *      R.reverse([1, 2]);     //=> [2, 1]
	     *      R.reverse([1]);        //=> [1]
	     *      R.reverse([]);         //=> []
	     *
	     *      R.reverse('abc');      //=> 'cba'
	     *      R.reverse('ab');       //=> 'ba'
	     *      R.reverse('a');        //=> 'a'
	     *      R.reverse('');         //=> ''
	     */
	    var reverse = _curry1(function reverse(list) {
	        return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
	    });

	    /**
	     * Scan is similar to reduce, but returns a list of successively reduced values
	     * from the left
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> [a]
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} A list of all intermediately reduced values.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
	     */
	    var scan = _curry3(function scan(fn, acc, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [acc];
	        while (idx < len) {
	            acc = fn(acc, list[idx]);
	            result[idx + 1] = acc;
	            idx += 1;
	        }
	        return result;
	    });

	    /**
	     * Returns the result of "setting" the portion of the given data structure
	     * focused by the given lens to the given value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> a -> s -> s
	     * @param {Lens} lens
	     * @param {*} v
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
	     *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
	     */
	    var set = _curry3(function set(lens, v, x) {
	        return over(lens, always(v), x);
	    });

	    /**
	     * Returns the elements of the given list or string (or object with a `slice`
	     * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	     *
	     * Dispatches to the `slice` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @sig Number -> Number -> String -> String
	     * @param {Number} fromIndex The start index (inclusive).
	     * @param {Number} toIndex The end index (exclusive).
	     * @param {*} list
	     * @return {*}
	     * @example
	     *
	     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	     */
	    var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	        return Array.prototype.slice.call(list, fromIndex, toIndex);
	    }));

	    /**
	     * Returns a copy of the list, sorted according to the comparator function,
	     * which should accept two values at a time and return a negative number if the
	     * first value is smaller, a positive number if it's larger, and zero if they
	     * are equal. Please note that this is a **copy** of the list. It does not
	     * modify the original.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,a -> Number) -> [a] -> [a]
	     * @param {Function} comparator A sorting function :: a -> b -> Int
	     * @param {Array} list The list to sort
	     * @return {Array} a new array with its elements sorted by the comparator function.
	     * @example
	     *
	     *      var diff = function(a, b) { return a - b; };
	     *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
	     */
	    var sort = _curry2(function sort(comparator, list) {
	        return _slice(list).sort(comparator);
	    });

	    /**
	     * Sorts the list according to the supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> [a] -> [a]
	     * @param {Function} fn
	     * @param {Array} list The list to sort.
	     * @return {Array} A new list sorted by the keys generated by `fn`.
	     * @example
	     *
	     *      var sortByFirstItem = R.sortBy(R.prop(0));
	     *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
	     *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
	     *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var bob = {
	     *        name: 'Bob',
	     *        age: -10
	     *      };
	     *      var clara = {
	     *        name: 'clara',
	     *        age: 314.159
	     *      };
	     *      var people = [clara, bob, alice];
	     *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
	     */
	    var sortBy = _curry2(function sortBy(fn, list) {
	        return _slice(list).sort(function (a, b) {
	            var aa = fn(a);
	            var bb = fn(b);
	            return aa < bb ? -1 : aa > bb ? 1 : 0;
	        });
	    });

	    /**
	     * Splits a given list or string at a given index.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig Number -> [a] -> [[a], [a]]
	     * @sig Number -> String -> [String, String]
	     * @param {Number} index The index where the array/string is split.
	     * @param {Array|String} array The array/string to be split.
	     * @return {Array}
	     * @example
	     *
	     *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
	     *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
	     *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
	     */
	    var splitAt = _curry2(function splitAt(index, array) {
	        return [
	            slice(0, index, array),
	            slice(index, length(array), array)
	        ];
	    });

	    /**
	     * Splits a collection into slices of the specified length.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [[a]]
	     * @sig Number -> String -> [String]
	     * @param {Number} n
	     * @param {Array} list
	     * @return {Array}
	     * @example
	     *
	     *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
	     *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
	     */
	    var splitEvery = _curry2(function splitEvery(n, list) {
	        if (n <= 0) {
	            throw new Error('First argument to splitEvery must be a positive integer');
	        }
	        var result = [];
	        var idx = 0;
	        while (idx < list.length) {
	            result.push(slice(idx, idx += n, list));
	        }
	        return result;
	    });

	    /**
	     * Takes a list and a predicate and returns a pair of lists with the following properties:
	     *
	     *  - the result of concatenating the two output lists is equivalent to the input list;
	     *  - none of the elements of the first output list satisfies the predicate; and
	     *  - if the second output list is non-empty, its first element satisfies the predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [[a], [a]]
	     * @param {Function} pred The predicate that determines where the array is split.
	     * @param {Array} list The array to be split.
	     * @return {Array}
	     * @example
	     *
	     *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
	     */
	    var splitWhen = _curry2(function splitWhen(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        var prefix = [];
	        while (idx < len && !pred(list[idx])) {
	            prefix.push(list[idx]);
	            idx += 1;
	        }
	        return [
	            prefix,
	            _slice(list, idx)
	        ];
	    });

	    /**
	     * Subtracts its second argument from its first argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a - b`.
	     * @see R.add
	     * @example
	     *
	     *      R.subtract(10, 8); //=> 2
	     *
	     *      var minus5 = R.subtract(R.__, 5);
	     *      minus5(17); //=> 12
	     *
	     *      var complementaryAngle = R.subtract(90);
	     *      complementaryAngle(30); //=> 60
	     *      complementaryAngle(72); //=> 18
	     */
	    var subtract = _curry2(function subtract(a, b) {
	        return Number(a) - Number(b);
	    });

	    /**
	     * Returns all but the first element of the given list or string (or object
	     * with a `tail` method).
	     *
	     * Dispatches to the `slice` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.head, R.init, R.last
	     * @example
	     *
	     *      R.tail([1, 2, 3]);  //=> [2, 3]
	     *      R.tail([1, 2]);     //=> [2]
	     *      R.tail([1]);        //=> []
	     *      R.tail([]);         //=> []
	     *
	     *      R.tail('abc');  //=> 'bc'
	     *      R.tail('ab');   //=> 'b'
	     *      R.tail('a');    //=> ''
	     *      R.tail('');     //=> ''
	     */
	    var tail = _checkForMethod('tail', slice(1, Infinity));

	    /**
	     * Returns the first `n` elements of the given list, string, or
	     * transducer/transformer (or object with a `take` method).
	     *
	     * Dispatches to the `take` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n
	     * @param {*} list
	     * @return {*}
	     * @see R.drop
	     * @example
	     *
	     *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
	     *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	     *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(3, 'ramda');               //=> 'ram'
	     *
	     *      var personnel = [
	     *        'Dave Brubeck',
	     *        'Paul Desmond',
	     *        'Eugene Wright',
	     *        'Joe Morello',
	     *        'Gerry Mulligan',
	     *        'Bob Bates',
	     *        'Joe Dodge',
	     *        'Ron Crotty'
	     *      ];
	     *
	     *      var takeFive = R.take(5);
	     *      takeFive(personnel);
	     *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
	     */
	    var take = _curry2(_dispatchable('take', _xtake, function take(n, xs) {
	        return slice(0, n < 0 ? Infinity : n, xs);
	    }));

	    /**
	     * Returns a new list containing the last `n` elements of a given list, passing
	     * each value to the supplied predicate function, and terminating when the
	     * predicate function returns `false`. Excludes the element that caused the
	     * predicate function to fail. The predicate function is passed one argument:
	     * *(value)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.dropLastWhile, R.addIndex
	     * @example
	     *
	     *      var isNotOne = x => x !== 1;
	     *
	     *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
	     */
	    var takeLastWhile = _curry2(function takeLastWhile(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0 && fn(list[idx])) {
	            idx -= 1;
	        }
	        return _slice(list, idx + 1, Infinity);
	    });

	    /**
	     * Returns a new list containing the first `n` elements of a given list,
	     * passing each value to the supplied predicate function, and terminating when
	     * the predicate function returns `false`. Excludes the element that caused the
	     * predicate function to fail. The predicate function is passed one argument:
	     * *(value)*.
	     *
	     * Dispatches to the `takeWhile` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.dropWhile, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isNotFour = x => x !== 4;
	     *
	     *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
	     */
	    var takeWhile = _curry2(_dispatchable('takeWhile', _xtakeWhile, function takeWhile(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len && fn(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, 0, idx);
	    }));

	    /**
	     * Runs the given function with the supplied object, then returns the object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a -> *) -> a -> a
	     * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
	     * @param {*} x
	     * @return {*} `x`.
	     * @example
	     *
	     *      var sayX = x => console.log('x is ' + x);
	     *      R.tap(sayX, 100); //=> 100
	     *      // logs 'x is 100'
	     */
	    var tap = _curry2(function tap(fn, x) {
	        fn(x);
	        return x;
	    });

	    /**
	     * Calls an input function `n` times, returning an array containing the results
	     * of those function calls.
	     *
	     * `fn` is passed one argument: The current value of `n`, which begins at `0`
	     * and is gradually incremented to `n - 1`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.3
	     * @category List
	     * @sig (Number -> a) -> Number -> [a]
	     * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
	     * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
	     * @return {Array} An array containing the return values of all calls to `fn`.
	     * @example
	     *
	     *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
	     */
	    var times = _curry2(function times(fn, n) {
	        var len = Number(n);
	        var idx = 0;
	        var list;
	        if (len < 0 || isNaN(len)) {
	            throw new RangeError('n must be a non-negative number');
	        }
	        list = new Array(len);
	        while (idx < len) {
	            list[idx] = fn(idx);
	            idx += 1;
	        }
	        return list;
	    });

	    /**
	     * Converts an object into an array of key, value arrays. Only the object's
	     * own properties are used.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own properties.
	     * @see R.fromPairs
	     * @example
	     *
	     *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
	     */
	    var toPairs = _curry1(function toPairs(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            if (_has(prop, obj)) {
	                pairs[pairs.length] = [
	                    prop,
	                    obj[prop]
	                ];
	            }
	        }
	        return pairs;
	    });

	    /**
	     * Converts an object into an array of key, value arrays. The object's own
	     * properties and prototype properties are used. Note that the order of the
	     * output array is not guaranteed to be consistent across different JS
	     * platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own
	     *         and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
	     */
	    var toPairsIn = _curry1(function toPairsIn(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            pairs[pairs.length] = [
	                prop,
	                obj[prop]
	            ];
	        }
	        return pairs;
	    });

	    /**
	     * Transposes the rows and columns of a 2D list.
	     * When passed a list of `n` lists of length `x`,
	     * returns a list of `x` lists of length `n`.
	     *
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig [[a]] -> [[a]]
	     * @param {Array} list A 2D list
	     * @return {Array} A 2D list
	     * @example
	     *
	     *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
	     *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
	     *
	     * If some of the rows are shorter than the following rows, their elements are skipped:
	     *
	     *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
	     */
	    var transpose = _curry1(function transpose(outerlist) {
	        var i = 0;
	        var result = [];
	        while (i < outerlist.length) {
	            var innerlist = outerlist[i];
	            var j = 0;
	            while (j < innerlist.length) {
	                if (typeof result[j] === 'undefined') {
	                    result[j] = [];
	                }
	                result[j].push(innerlist[j]);
	                j += 1;
	            }
	            i += 1;
	        }
	        return result;
	    });

	    /**
	     * Removes (strips) whitespace from both ends of the string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to trim.
	     * @return {String} Trimmed version of `str`.
	     * @example
	     *
	     *      R.trim('   xyz  '); //=> 'xyz'
	     *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
	     */
	    var trim = function () {
	        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
	        var zeroWidth = '\u200B';
	        var hasProtoTrim = typeof String.prototype.trim === 'function';
	        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
	            return _curry1(function trim(str) {
	                var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
	                var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
	                return str.replace(beginRx, '').replace(endRx, '');
	            });
	        } else {
	            return _curry1(function trim(str) {
	                return str.trim();
	            });
	        }
	    }();

	    /**
	     * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
	     * function evaluates the `tryer`; if it does not throw, it simply returns the
	     * result. If the `tryer` *does* throw, the returned function evaluates the
	     * `catcher` function and returns its result. Note that for effective
	     * composition with this function, both the `tryer` and `catcher` functions
	     * must return the same type of results.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Function
	     * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
	     * @param {Function} tryer The function that may throw.
	     * @param {Function} catcher The function that will be evaluated if `tryer` throws.
	     * @return {Function} A new function that will catch exceptions and send then to the catcher.
	     * @example
	     *
	     *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
	     *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
	     */
	    var tryCatch = _curry2(function _tryCatch(tryer, catcher) {
	        return _arity(tryer.length, function () {
	            try {
	                return tryer.apply(this, arguments);
	            } catch (e) {
	                return catcher.apply(this, _concat([e], arguments));
	            }
	        });
	    });

	    /**
	     * Gives a single-word string description of the (native) type of a value,
	     * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
	     * attempt to distinguish user Object types any further, reporting them all as
	     * 'Object'.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Type
	     * @sig (* -> {*}) -> String
	     * @param {*} val The value to test
	     * @return {String}
	     * @example
	     *
	     *      R.type({}); //=> "Object"
	     *      R.type(1); //=> "Number"
	     *      R.type(false); //=> "Boolean"
	     *      R.type('s'); //=> "String"
	     *      R.type(null); //=> "Null"
	     *      R.type([]); //=> "Array"
	     *      R.type(/[A-z]/); //=> "RegExp"
	     */
	    var type = _curry1(function type(val) {
	        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
	    });

	    /**
	     * Takes a function `fn`, which takes a single array argument, and returns a
	     * function which:
	     *
	     *   - takes any number of positional arguments;
	     *   - passes these arguments to `fn` as an array; and
	     *   - returns the result.
	     *
	     * In other words, R.unapply derives a variadic function from a function which
	     * takes an array. R.unapply is the inverse of R.apply.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Function
	     * @sig ([*...] -> a) -> (*... -> a)
	     * @param {Function} fn
	     * @return {Function}
	     * @see R.apply
	     * @example
	     *
	     *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
	     */
	    var unapply = _curry1(function unapply(fn) {
	        return function () {
	            return fn(_slice(arguments));
	        };
	    });

	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly 1 parameter. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Function
	     * @sig (* -> b) -> (a -> b)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 1.
	     * @example
	     *
	     *      var takesTwoArgs = function(a, b) {
	     *        return [a, b];
	     *      };
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.unary(takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only 1 argument is passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var unary = _curry1(function unary(fn) {
	        return nAry(1, fn);
	    });

	    /**
	     * Returns a function of arity `n` from a (manually) curried function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Function
	     * @sig Number -> (a -> b) -> (a -> c)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to uncurry.
	     * @return {Function} A new function.
	     * @see R.curry
	     * @example
	     *
	     *      var addFour = a => b => c => d => a + b + c + d;
	     *
	     *      var uncurriedAddFour = R.uncurryN(4, addFour);
	     *      uncurriedAddFour(1, 2, 3, 4); //=> 10
	     */
	    var uncurryN = _curry2(function uncurryN(depth, fn) {
	        return curryN(depth, function () {
	            var currentDepth = 1;
	            var value = fn;
	            var idx = 0;
	            var endIdx;
	            while (currentDepth <= depth && typeof value === 'function') {
	                endIdx = currentDepth === depth ? arguments.length : idx + value.length;
	                value = value.apply(this, _slice(arguments, idx, endIdx));
	                currentDepth += 1;
	                idx = endIdx;
	            }
	            return value;
	        });
	    });

	    /**
	     * Builds a list from a seed value. Accepts an iterator function, which returns
	     * either false to stop iteration or an array of length 2 containing the value
	     * to add to the resulting list and the seed to be used in the next call to the
	     * iterator function.
	     *
	     * The iterator function receives one argument: *(seed)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (a -> [b]) -> * -> [b]
	     * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
	     *        either false to quit iteration or an array of length two to proceed. The element
	     *        at index 0 of this array will be added to the resulting array, and the element
	     *        at index 1 will be passed to the next call to `fn`.
	     * @param {*} seed The seed value.
	     * @return {Array} The final list.
	     * @example
	     *
	     *      var f = n => n > 50 ? false : [-n, n + 10];
	     *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
	     */
	    var unfold = _curry2(function unfold(fn, seed) {
	        var pair = fn(seed);
	        var result = [];
	        while (pair && pair.length) {
	            result[result.length] = pair[0];
	            pair = fn(pair[1]);
	        }
	        return result;
	    });

	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list, based upon the value returned by applying the supplied predicate to
	     * two list elements. Prefers the first item if two items compare equal based
	     * on the predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      var strEq = R.eqBy(String);
	     *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
	     *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
	     *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
	     *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
	     */
	    var uniqWith = _curry2(function uniqWith(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        var item;
	        while (idx < len) {
	            item = list[idx];
	            if (!_containsWith(pred, item, result)) {
	                result[result.length] = item;
	            }
	            idx += 1;
	        }
	        return result;
	    });

	    /**
	     * Tests the final argument by passing it to the given predicate function. If
	     * the predicate is not satisfied, the function will return the result of
	     * calling the `whenFalseFn` function with the same argument. If the predicate
	     * is satisfied, the argument is returned as is.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred        A predicate function
	     * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
	     *                               to a falsy value.
	     * @param {*}        x           An object to test with the `pred` function and
	     *                               pass to `whenFalseFn` if necessary.
	     * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
	     * @see R.ifElse, R.when
	     * @example
	     *
	     *      // coerceArray :: (a|[a]) -> [a]
	     *      var coerceArray = R.unless(R.isArrayLike, R.of);
	     *      coerceArray([1, 2, 3]); //=> [1, 2, 3]
	     *      coerceArray(1);         //=> [1]
	     */
	    var unless = _curry3(function unless(pred, whenFalseFn, x) {
	        return pred(x) ? x : whenFalseFn(x);
	    });

	    /**
	     * Takes a predicate, a transformation function, and an initial value,
	     * and returns a value of the same type as the initial value.
	     * It does so by applying the transformation until the predicate is satisfied,
	     * at which point it returns the satisfactory value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred A predicate function
	     * @param {Function} fn The iterator function
	     * @param {*} init Initial value
	     * @return {*} Final value that satisfies predicate
	     * @example
	     *
	     *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
	     */
	    var until = _curry3(function until(pred, fn, init) {
	        var val = init;
	        while (!pred(val)) {
	            val = fn(val);
	        }
	        return val;
	    });

	    /**
	     * Returns a new copy of the array with the element at the provided index
	     * replaced with the given value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} idx The index to update.
	     * @param {*} x The value to exist at the given index of the returned array.
	     * @param {Array|Arguments} list The source array-like object to be updated.
	     * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
	     * @see R.adjust
	     * @example
	     *
	     *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var update = _curry3(function update(idx, x, list) {
	        return adjust(always(x), idx, list);
	    });

	    /**
	     * Accepts a function `fn` and a list of transformer functions and returns a
	     * new curried function. When the new function is invoked, it calls the
	     * function `fn` with parameters consisting of the result of calling each
	     * supplied handler on successive arguments to the new function.
	     *
	     * If more arguments are passed to the returned function than transformer
	     * functions, those arguments are passed directly to `fn` as additional
	     * parameters. If you expect additional arguments that don't need to be
	     * transformed, although you can ignore them, it's best to pass an identity
	     * function so that the new function reports the correct arity.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
	     * @param {Function} fn The function to wrap.
	     * @param {Array} transformers A list of transformer functions
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
	     *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
	     *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
	     *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
	     */
	    var useWith = _curry2(function useWith(fn, transformers) {
	        return curryN(transformers.length, function () {
	            var args = [];
	            var idx = 0;
	            while (idx < transformers.length) {
	                args.push(transformers[idx].call(this, arguments[idx]));
	                idx += 1;
	            }
	            return fn.apply(this, args.concat(_slice(arguments, transformers.length)));
	        });
	    });

	    /**
	     * Returns a list of all the enumerable own properties of the supplied object.
	     * Note that the order of the output array is not guaranteed across different
	     * JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own properties.
	     * @example
	     *
	     *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
	     */
	    var values = _curry1(function values(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var vals = [];
	        var idx = 0;
	        while (idx < len) {
	            vals[idx] = obj[props[idx]];
	            idx += 1;
	        }
	        return vals;
	    });

	    /**
	     * Returns a list of all the properties, including prototype properties, of the
	     * supplied object.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.valuesIn(f); //=> ['X', 'Y']
	     */
	    var valuesIn = _curry1(function valuesIn(obj) {
	        var prop;
	        var vs = [];
	        for (prop in obj) {
	            vs[vs.length] = obj[prop];
	        }
	        return vs;
	    });

	    /**
	     * Returns a "view" of the given data structure, determined by the given lens.
	     * The lens's focus determines which portion of the data structure is visible.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> s -> a
	     * @param {Lens} lens
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.view(xLens, {x: 1, y: 2});  //=> 1
	     *      R.view(xLens, {x: 4, y: 2});  //=> 4
	     */
	    // `Const` is a functor that effectively ignores the function given to `map`.
	    // Using `Const` effectively ignores the setter function of the `lens`,
	    // leaving the value returned by the getter function unmodified.
	    var view = function () {
	        // `Const` is a functor that effectively ignores the function given to `map`.
	        var Const = function (x) {
	            return {
	                value: x,
	                map: function () {
	                    return this;
	                }
	            };
	        };
	        return _curry2(function view(lens, x) {
	            // Using `Const` effectively ignores the setter function of the `lens`,
	            // leaving the value returned by the getter function unmodified.
	            return lens(Const)(x).value;
	        });
	    }();

	    /**
	     * Tests the final argument by passing it to the given predicate function. If
	     * the predicate is satisfied, the function will return the result of calling
	     * the `whenTrueFn` function with the same argument. If the predicate is not
	     * satisfied, the argument is returned as is.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred       A predicate function
	     * @param {Function} whenTrueFn A function to invoke when the `condition`
	     *                              evaluates to a truthy value.
	     * @param {*}        x          An object to test with the `pred` function and
	     *                              pass to `whenTrueFn` if necessary.
	     * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
	     * @see R.ifElse, R.unless
	     * @example
	     *
	     *      // truncate :: String -> String
	     *      var truncate = R.when(
	     *        R.propSatisfies(R.gt(R.__, 10), 'length'),
	     *        R.pipe(R.take(10), R.append('…'), R.join(''))
	     *      );
	     *      truncate('12345');         //=> '12345'
	     *      truncate('0123456789ABC'); //=> '0123456789…'
	     */
	    var when = _curry3(function when(pred, whenTrueFn, x) {
	        return pred(x) ? whenTrueFn(x) : x;
	    });

	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec. Each of the spec's own properties must be a predicate function.
	     * Each predicate is applied to the value of the corresponding property of the
	     * test object. `where` returns true if all the predicates return true, false
	     * otherwise.
	     *
	     * `where` is well suited to declaratively expressing constraints for other
	     * functions such as `filter` and `find`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category Object
	     * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = where({
	     *        a: equals('foo'),
	     *        b: complement(equals('bar')),
	     *        x: gt(__, 10),
	     *        y: lt(__, 20)
	     *      });
	     *
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
	     *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
	     */
	    var where = _curry2(function where(spec, testObj) {
	        for (var prop in spec) {
	            if (_has(prop, spec) && !spec[prop](testObj[prop])) {
	                return false;
	            }
	        }
	        return true;
	    });

	    /**
	     * Wrap a function inside another to allow you to make adjustments to the
	     * parameters, or do other processing either before the internal function is
	     * called or with its results.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a... -> b) -> ((a... -> b) -> a... -> c) -> (a... -> c)
	     * @param {Function} fn The function to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @return {Function} The wrapped function.
	     * @deprecated since v0.22.0
	     * @example
	     *
	     *      var greet = name => 'Hello ' + name;
	     *
	     *      var shoutedGreet = R.wrap(greet, (gr, name) => gr(name).toUpperCase());
	     *
	     *      shoutedGreet("Kathy"); //=> "HELLO KATHY"
	     *
	     *      var shortenedGreet = R.wrap(greet, function(gr, name) {
	     *        return gr(name.substring(0, 3));
	     *      });
	     *      shortenedGreet("Robert"); //=> "Hello Rob"
	     */
	    var wrap = _curry2(function wrap(fn, wrapper) {
	        return curryN(fn.length, function () {
	            return wrapper.apply(this, _concat([fn], arguments));
	        });
	    });

	    /**
	     * Creates a new list out of the two supplied by creating each possible pair
	     * from the lists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The list made by combining each possible pair from
	     *         `as` and `bs` into pairs (`[a, b]`).
	     * @example
	     *
	     *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
	     */
	    // = xprodWith(prepend); (takes about 3 times as long...)
	    var xprod = _curry2(function xprod(a, b) {
	        // = xprodWith(prepend); (takes about 3 times as long...)
	        var idx = 0;
	        var ilen = a.length;
	        var j;
	        var jlen = b.length;
	        var result = [];
	        while (idx < ilen) {
	            j = 0;
	            while (j < jlen) {
	                result[result.length] = [
	                    a[idx],
	                    b[j]
	                ];
	                j += 1;
	            }
	            idx += 1;
	        }
	        return result;
	    });

	    /**
	     * Creates a new list out of the two supplied by pairing up equally-positioned
	     * items from both lists. The returned list is truncated to the length of the
	     * shorter of the two input lists.
	     * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
	     * @example
	     *
	     *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
	     */
	    var zip = _curry2(function zip(a, b) {
	        var rv = [];
	        var idx = 0;
	        var len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = [
	                a[idx],
	                b[idx]
	            ];
	            idx += 1;
	        }
	        return rv;
	    });

	    /**
	     * Creates a new object out of a list of keys and a list of values.
	     * Key/value pairing is truncated to the length of the shorter of the two lists.
	     * Note: `zipObj` is equivalent to `pipe(zipWith(pair), fromPairs)`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [String] -> [*] -> {String: *}
	     * @param {Array} keys The array that will be properties on the output object.
	     * @param {Array} values The list of values on the output object.
	     * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
	     * @example
	     *
	     *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
	     */
	    var zipObj = _curry2(function zipObj(keys, values) {
	        var idx = 0;
	        var len = Math.min(keys.length, values.length);
	        var out = {};
	        while (idx < len) {
	            out[keys[idx]] = values[idx];
	            idx += 1;
	        }
	        return out;
	    });

	    /**
	     * Creates a new list out of the two supplied by applying the function to each
	     * equally-positioned pair in the lists. The returned list is truncated to the
	     * length of the shorter of the two input lists.
	     *
	     * @function
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,b -> c) -> [a] -> [b] -> [c]
	     * @param {Function} fn The function used to combine the two elements into one value.
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
	     *         using `fn`.
	     * @example
	     *
	     *      var f = (x, y) => {
	     *        // ...
	     *      };
	     *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
	     *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
	     */
	    var zipWith = _curry3(function zipWith(fn, a, b) {
	        var rv = [];
	        var idx = 0;
	        var len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = fn(a[idx], b[idx]);
	            idx += 1;
	        }
	        return rv;
	    });

	    /**
	     * A function that always returns `false`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig * -> Boolean
	     * @param {*}
	     * @return {Boolean}
	     * @see R.always, R.T
	     * @example
	     *
	     *      R.F(); //=> false
	     */
	    var F = always(false);

	    /**
	     * A function that always returns `true`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig * -> Boolean
	     * @param {*}
	     * @return {Boolean}
	     * @see R.always, R.F
	     * @example
	     *
	     *      R.T(); //=> true
	     */
	    var T = always(true);

	    /**
	     * Copies an object.
	     *
	     * @private
	     * @param {*} value The value to be copied
	     * @param {Array} refFrom Array containing the source references
	     * @param {Array} refTo Array containing the copied source references
	     * @param {Boolean} deep Whether or not to perform deep cloning.
	     * @return {*} The copied value.
	     */
	    var _clone = function _clone(value, refFrom, refTo, deep) {
	        var copy = function copy(copiedValue) {
	            var len = refFrom.length;
	            var idx = 0;
	            while (idx < len) {
	                if (value === refFrom[idx]) {
	                    return refTo[idx];
	                }
	                idx += 1;
	            }
	            refFrom[idx + 1] = value;
	            refTo[idx + 1] = copiedValue;
	            for (var key in value) {
	                copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
	            }
	            return copiedValue;
	        };
	        switch (type(value)) {
	        case 'Object':
	            return copy({});
	        case 'Array':
	            return copy([]);
	        case 'Date':
	            return new Date(value.valueOf());
	        case 'RegExp':
	            return _cloneRegExp(value);
	        default:
	            return value;
	        }
	    };

	    var _createPartialApplicator = function _createPartialApplicator(concat) {
	        return _curry2(function (fn, args) {
	            return _arity(Math.max(0, fn.length - args.length), function () {
	                return fn.apply(this, concat(args, arguments));
	            });
	        });
	    };

	    var _dropLast = function dropLast(n, xs) {
	        return take(n < xs.length ? xs.length - n : 0, xs);
	    };

	    // Values of other types are only equal if identical.
	    var _equals = function _equals(a, b, stackA, stackB) {
	        if (identical(a, b)) {
	            return true;
	        }
	        if (type(a) !== type(b)) {
	            return false;
	        }
	        if (a == null || b == null) {
	            return false;
	        }
	        if (typeof a.equals === 'function' || typeof b.equals === 'function') {
	            return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
	        }
	        switch (type(a)) {
	        case 'Arguments':
	        case 'Array':
	        case 'Object':
	            if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
	                return a === b;
	            }
	            break;
	        case 'Boolean':
	        case 'Number':
	        case 'String':
	            if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
	                return false;
	            }
	            break;
	        case 'Date':
	            if (!identical(a.valueOf(), b.valueOf())) {
	                return false;
	            }
	            break;
	        case 'Error':
	            return a.name === b.name && a.message === b.message;
	        case 'RegExp':
	            if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
	                return false;
	            }
	            break;
	        case 'Map':
	        case 'Set':
	            if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
	                return false;
	            }
	            break;
	        case 'Int8Array':
	        case 'Uint8Array':
	        case 'Uint8ClampedArray':
	        case 'Int16Array':
	        case 'Uint16Array':
	        case 'Int32Array':
	        case 'Uint32Array':
	        case 'Float32Array':
	        case 'Float64Array':
	            break;
	        case 'ArrayBuffer':
	            break;
	        default:
	            // Values of other types are only equal if identical.
	            return false;
	        }
	        var keysA = keys(a);
	        if (keysA.length !== keys(b).length) {
	            return false;
	        }
	        var idx = stackA.length - 1;
	        while (idx >= 0) {
	            if (stackA[idx] === a) {
	                return stackB[idx] === b;
	            }
	            idx -= 1;
	        }
	        stackA.push(a);
	        stackB.push(b);
	        idx = keysA.length - 1;
	        while (idx >= 0) {
	            var key = keysA[idx];
	            if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
	                return false;
	            }
	            idx -= 1;
	        }
	        stackA.pop();
	        stackB.pop();
	        return true;
	    };

	    /**
	     * `_makeFlat` is a helper function that returns a one-level or fully recursive
	     * function based on the flag passed in.
	     *
	     * @private
	     */
	    var _makeFlat = function _makeFlat(recursive) {
	        return function flatt(list) {
	            var value, jlen, j;
	            var result = [];
	            var idx = 0;
	            var ilen = list.length;
	            while (idx < ilen) {
	                if (isArrayLike(list[idx])) {
	                    value = recursive ? flatt(list[idx]) : list[idx];
	                    j = 0;
	                    jlen = value.length;
	                    while (j < jlen) {
	                        result[result.length] = value[j];
	                        j += 1;
	                    }
	                } else {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	            return result;
	        };
	    };

	    var _reduce = function () {
	        function _arrayReduce(xf, acc, list) {
	            var idx = 0;
	            var len = list.length;
	            while (idx < len) {
	                acc = xf['@@transducer/step'](acc, list[idx]);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                idx += 1;
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _iterableReduce(xf, acc, iter) {
	            var step = iter.next();
	            while (!step.done) {
	                acc = xf['@@transducer/step'](acc, step.value);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                step = iter.next();
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _methodReduce(xf, acc, obj) {
	            return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	        }
	        var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
	        return function _reduce(fn, acc, list) {
	            if (typeof fn === 'function') {
	                fn = _xwrap(fn);
	            }
	            if (isArrayLike(list)) {
	                return _arrayReduce(fn, acc, list);
	            }
	            if (typeof list.reduce === 'function') {
	                return _methodReduce(fn, acc, list);
	            }
	            if (list[symIterator] != null) {
	                return _iterableReduce(fn, acc, list[symIterator]());
	            }
	            if (typeof list.next === 'function') {
	                return _iterableReduce(fn, acc, list);
	            }
	            throw new TypeError('reduce: list must be array or iterable');
	        };
	    }();

	    var _stepCat = function () {
	        var _stepCatArray = {
	            '@@transducer/init': Array,
	            '@@transducer/step': function (xs, x) {
	                xs.push(x);
	                return xs;
	            },
	            '@@transducer/result': _identity
	        };
	        var _stepCatString = {
	            '@@transducer/init': String,
	            '@@transducer/step': function (a, b) {
	                return a + b;
	            },
	            '@@transducer/result': _identity
	        };
	        var _stepCatObject = {
	            '@@transducer/init': Object,
	            '@@transducer/step': function (result, input) {
	                return _assign(result, isArrayLike(input) ? objOf(input[0], input[1]) : input);
	            },
	            '@@transducer/result': _identity
	        };
	        return function _stepCat(obj) {
	            if (_isTransformer(obj)) {
	                return obj;
	            }
	            if (isArrayLike(obj)) {
	                return _stepCatArray;
	            }
	            if (typeof obj === 'string') {
	                return _stepCatString;
	            }
	            if (typeof obj === 'object') {
	                return _stepCatObject;
	            }
	            throw new Error('Cannot create transformer for ' + obj);
	        };
	    }();

	    var _xdropLastWhile = function () {
	        function XDropLastWhile(fn, xf) {
	            this.f = fn;
	            this.retained = [];
	            this.xf = xf;
	        }
	        XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XDropLastWhile.prototype['@@transducer/result'] = function (result) {
	            this.retained = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.retain(result, input) : this.flush(result, input);
	        };
	        XDropLastWhile.prototype.flush = function (result, input) {
	            result = _reduce(this.xf['@@transducer/step'], result, this.retained);
	            this.retained = [];
	            return this.xf['@@transducer/step'](result, input);
	        };
	        XDropLastWhile.prototype.retain = function (result, input) {
	            this.retained.push(input);
	            return result;
	        };
	        return _curry2(function _xdropLastWhile(fn, xf) {
	            return new XDropLastWhile(fn, xf);
	        });
	    }();

	    /**
	     * Creates a new list iteration function from an existing one by adding two new
	     * parameters to its callback function: the current index, and the entire list.
	     *
	     * This would turn, for instance, Ramda's simple `map` function into one that
	     * more closely resembles `Array.prototype.map`. Note that this will only work
	     * for functions in which the iteration callback function is the first
	     * parameter, and where the list is the last parameter. (This latter might be
	     * unimportant if the list parameter is not used.)
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Function
	     * @category List
	     * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
	     * @param {Function} fn A list iteration function that does not pass index or list to its callback
	     * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
	     * @example
	     *
	     *      var mapIndexed = R.addIndex(R.map);
	     *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
	     *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
	     */
	    var addIndex = _curry1(function addIndex(fn) {
	        return curryN(fn.length, function () {
	            var idx = 0;
	            var origFn = arguments[0];
	            var list = arguments[arguments.length - 1];
	            var args = _slice(arguments);
	            args[0] = function () {
	                var result = origFn.apply(this, _concat(arguments, [
	                    idx,
	                    list
	                ]));
	                idx += 1;
	                return result;
	            };
	            return fn.apply(this, args);
	        });
	    });

	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly 2 parameters. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Function
	     * @sig (* -> c) -> (a, b -> c)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 2.
	     * @example
	     *
	     *      var takesThreeArgs = function(a, b, c) {
	     *        return [a, b, c];
	     *      };
	     *      takesThreeArgs.length; //=> 3
	     *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      var takesTwoArgs = R.binary(takesThreeArgs);
	     *      takesTwoArgs.length; //=> 2
	     *      // Only 2 arguments are passed to the wrapped function
	     *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
	     */
	    var binary = _curry1(function binary(fn) {
	        return nAry(2, fn);
	    });

	    /**
	     * Creates a deep copy of the value which may contain (nested) `Array`s and
	     * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are not
	     * copied, but assigned by their reference.
	     *
	     * Dispatches to a `clone` method if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {*} -> {*}
	     * @param {*} value The object or array to clone
	     * @return {*} A new object or array.
	     * @example
	     *
	     *      var objects = [{}, {}, {}];
	     *      var objectsClone = R.clone(objects);
	     *      objects[0] === objectsClone[0]; //=> false
	     */
	    var clone = _curry1(function clone(value) {
	        return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
	    });

	    /**
	     * Returns a curried equivalent of the provided function. The curried function
	     * has two unusual capabilities. First, its arguments needn't be provided one
	     * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
	     * following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	     * following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (* -> a) -> (* -> a)
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curryN
	     * @example
	     *
	     *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
	     *
	     *      var curriedAddFourNumbers = R.curry(addFourNumbers);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curry = _curry1(function curry(fn) {
	        return curryN(fn.length, fn);
	    });

	    /**
	     * Returns all but the first `n` elements of the given list, string, or
	     * transducer/transformer (or object with a `drop` method).
	     *
	     * Dispatches to the `drop` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n
	     * @param {*} list
	     * @return {*}
	     * @see R.take, R.transduce
	     * @example
	     *
	     *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
	     *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
	     *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(3, 'ramda');               //=> 'da'
	     */
	    var drop = _curry2(_dispatchable('drop', _xdrop, function drop(n, xs) {
	        return slice(Math.max(0, n), Infinity, xs);
	    }));

	    /**
	     * Returns a list containing all but the last `n` elements of the given `list`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n The number of elements of `xs` to skip.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @see R.takeLast
	     * @example
	     *
	     *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	     *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
	     *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
	     *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
	     *      R.dropLast(3, 'ramda');               //=> 'ra'
	     */
	    var dropLast = _curry2(_dispatchable('dropLast', _xdropLast, _dropLast));

	    /**
	     * Returns a new list excluding all the tailing elements of a given list which
	     * satisfy the supplied predicate function. It passes each value from the right
	     * to the supplied predicate function, skipping elements while the predicate
	     * function returns `true`. The predicate function is applied to one argument:
	     * *(value)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.takeLastWhile, R.addIndex
	     * @example
	     *
	     *      var lteThree = x => x <= 3;
	     *
	     *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
	     */
	    var dropLastWhile = _curry2(_dispatchable('dropLastWhile', _xdropLastWhile, _dropLastWhile));

	    /**
	     * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
	     * cyclical data structures.
	     *
	     * Dispatches symmetrically to the `equals` methods of both arguments, if
	     * present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Relation
	     * @sig a -> b -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      R.equals(1, 1); //=> true
	     *      R.equals(1, '1'); //=> false
	     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
	     *
	     *      var a = {}; a.v = a;
	     *      var b = {}; b.v = b;
	     *      R.equals(a, b); //=> true
	     */
	    var equals = _curry2(function equals(a, b) {
	        return _equals(a, b, [], []);
	    });

	    /**
	     * Takes a predicate and a "filterable", and returns a new filterable of the
	     * same type containing the members of the given filterable which satisfy the
	     * given predicate.
	     *
	     * Dispatches to the `filter` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> f a
	     * @param {Function} pred
	     * @param {Array} filterable
	     * @return {Array}
	     * @see R.reject, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *
	     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
	     *
	     *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	     */
	    // else
	    var filter = _curry2(_dispatchable('filter', _xfilter, function (pred, filterable) {
	        return _isObject(filterable) ? _reduce(function (acc, key) {
	            if (pred(filterable[key])) {
	                acc[key] = filterable[key];
	            }
	            return acc;
	        }, {}, keys(filterable)) : // else
	        _filter(pred, filterable);
	    }));

	    /**
	     * Returns a new list by pulling every item out of it (and all its sub-arrays)
	     * and putting them in a new array, depth-first.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b]
	     * @param {Array} list The array to consider.
	     * @return {Array} The flattened list.
	     * @see R.unnest
	     * @example
	     *
	     *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
	     *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	     */
	    var flatten = _curry1(_makeFlat(true));

	    /**
	     * Returns a new function much like the supplied one, except that the first two
	     * arguments' order is reversed.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
	     * @param {Function} fn The function to invoke with its first two parameters reversed.
	     * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
	     * @example
	     *
	     *      var mergeThree = (a, b, c) => [].concat(a, b, c);
	     *
	     *      mergeThree(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
	     */
	    var flip = _curry1(function flip(fn) {
	        return curry(function (a, b) {
	            var args = _slice(arguments);
	            args[0] = b;
	            args[1] = a;
	            return fn.apply(this, args);
	        });
	    });

	    /**
	     * Returns the first element of the given list or string. In some libraries
	     * this function is named `first`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> a | Undefined
	     * @sig String -> String
	     * @param {Array|String} list
	     * @return {*}
	     * @see R.tail, R.init, R.last
	     * @example
	     *
	     *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
	     *      R.head([]); //=> undefined
	     *
	     *      R.head('abc'); //=> 'a'
	     *      R.head(''); //=> ''
	     */
	    var head = nth(0);

	    /**
	     * Returns all but the last element of the given list or string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.last, R.head, R.tail
	     * @example
	     *
	     *      R.init([1, 2, 3]);  //=> [1, 2]
	     *      R.init([1, 2]);     //=> [1]
	     *      R.init([1]);        //=> []
	     *      R.init([]);         //=> []
	     *
	     *      R.init('abc');  //=> 'ab'
	     *      R.init('ab');   //=> 'a'
	     *      R.init('a');    //=> ''
	     *      R.init('');     //=> ''
	     */
	    var init = slice(0, -1);

	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those
	     * elements common to both lists. Duplication is determined according to the
	     * value returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate function that determines whether
	     *        the two supplied elements are equal.
	     * @param {Array} list1 One list of items to compare
	     * @param {Array} list2 A second list of items to compare
	     * @return {Array} A new list containing those elements common to both lists.
	     * @see R.intersection
	     * @example
	     *
	     *      var buffaloSpringfield = [
	     *        {id: 824, name: 'Richie Furay'},
	     *        {id: 956, name: 'Dewey Martin'},
	     *        {id: 313, name: 'Bruce Palmer'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *      var csny = [
	     *        {id: 204, name: 'David Crosby'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 539, name: 'Graham Nash'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *
	     *      R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield, csny);
	     *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
	     */
	    var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
	        var lookupList, filteredList;
	        if (list1.length > list2.length) {
	            lookupList = list1;
	            filteredList = list2;
	        } else {
	            lookupList = list2;
	            filteredList = list1;
	        }
	        var results = [];
	        var idx = 0;
	        while (idx < filteredList.length) {
	            if (_containsWith(pred, filteredList[idx], lookupList)) {
	                results[results.length] = filteredList[idx];
	            }
	            idx += 1;
	        }
	        return uniqWith(pred, results);
	    });

	    /**
	     * Transforms the items of the list with the transducer and appends the
	     * transformed items to the accumulator using an appropriate iterator function
	     * based on the accumulator type.
	     *
	     * The accumulator can be an array, string, object or a transformer. Iterated
	     * items will be appended to arrays and concatenated to strings. Objects will
	     * be merged directly or 2-item arrays will be merged as key, value pairs.
	     *
	     * The accumulator can also be a transformer object that provides a 2-arity
	     * reducing iterator function, step, 0-arity initial value function, init, and
	     * 1-arity result extraction function result. The step function is used as the
	     * iterator function in reduce. The result function is used to convert the
	     * final accumulator into the return type and in most cases is R.identity. The
	     * init function is used to provide the initial accumulator.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig a -> (b -> b) -> [c] -> a
	     * @param {*} acc The initial accumulator value.
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.into([], transducer, numbers); //=> [2, 3]
	     *
	     *      var intoArray = R.into([]);
	     *      intoArray(transducer, numbers); //=> [2, 3]
	     */
	    var into = _curry3(function into(acc, xf, list) {
	        return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
	    });

	    /**
	     * Same as R.invertObj, however this accounts for objects with duplicate values
	     * by putting the values into an array.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {s: x} -> {x: [ s, ... ]}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object with keys
	     * in an array.
	     * @example
	     *
	     *      var raceResultsByFirstName = {
	     *        first: 'alice',
	     *        second: 'jake',
	     *        third: 'alice',
	     *      };
	     *      R.invert(raceResultsByFirstName);
	     *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
	     */
	    var invert = _curry1(function invert(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            var val = obj[key];
	            var list = _has(val, out) ? out[val] : out[val] = [];
	            list[list.length] = key;
	            idx += 1;
	        }
	        return out;
	    });

	    /**
	     * Returns a new object with the keys of the given object as values, and the
	     * values of the given object, which are coerced to strings, as keys. Note
	     * that the last key found is preferred when handling the same value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {s: x} -> {x: s}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object
	     * @example
	     *
	     *      var raceResults = {
	     *        first: 'alice',
	     *        second: 'jake'
	     *      };
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': 'first', 'jake':'second' }
	     *
	     *      // Alternatively:
	     *      var raceResults = ['alice', 'jake'];
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': '0', 'jake':'1' }
	     */
	    var invertObj = _curry1(function invertObj(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            out[obj[key]] = key;
	            idx += 1;
	        }
	        return out;
	    });

	    /**
	     * Returns `true` if the given value is its type's empty value; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig a -> Boolean
	     * @param {*} x
	     * @return {Boolean}
	     * @see R.empty
	     * @example
	     *
	     *      R.isEmpty([1, 2, 3]);   //=> false
	     *      R.isEmpty([]);          //=> true
	     *      R.isEmpty('');          //=> true
	     *      R.isEmpty(null);        //=> false
	     *      R.isEmpty({});          //=> true
	     *      R.isEmpty({length: 0}); //=> false
	     */
	    var isEmpty = _curry1(function isEmpty(x) {
	        return x != null && equals(x, empty(x));
	    });

	    /**
	     * Returns the last element of the given list or string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig [a] -> a | Undefined
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.init, R.head, R.tail
	     * @example
	     *
	     *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
	     *      R.last([]); //=> undefined
	     *
	     *      R.last('abc'); //=> 'c'
	     *      R.last(''); //=> ''
	     */
	    var last = nth(-1);

	    /**
	     * Returns the position of the last occurrence of an item in an array, or -1 if
	     * the item is not included in the array. `R.equals` is used to determine
	     * equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     * @see R.indexOf
	     * @example
	     *
	     *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
	     *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
	     */
	    var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
	        if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
	            return xs.lastIndexOf(target);
	        } else {
	            var idx = xs.length - 1;
	            while (idx >= 0) {
	                if (equals(xs[idx], target)) {
	                    return idx;
	                }
	                idx -= 1;
	            }
	            return -1;
	        }
	    });

	    /**
	     * Takes a function and
	     * a [functor](https://github.com/fantasyland/fantasy-land#functor),
	     * applies the function to each of the functor's values, and returns
	     * a functor of the same shape.
	     *
	     * Ramda provides suitable `map` implementations for `Array` and `Object`,
	     * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
	     *
	     * Dispatches to the `map` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * Also treats functions as functors and will compose them together.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Functor f => (a -> b) -> f a -> f b
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {Array} list The list to be iterated over.
	     * @return {Array} The new list.
	     * @see R.transduce, R.addIndex
	     * @example
	     *
	     *      var double = x => x * 2;
	     *
	     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	     *
	     *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
	     */
	    var map = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
	        switch (Object.prototype.toString.call(functor)) {
	        case '[object Function]':
	            return curryN(functor.length, function () {
	                return fn.call(this, functor.apply(this, arguments));
	            });
	        case '[object Object]':
	            return _reduce(function (acc, key) {
	                acc[key] = fn(functor[key]);
	                return acc;
	            }, {}, keys(functor));
	        default:
	            return _map(fn, functor);
	        }
	    }));

	    /**
	     * An Object-specific version of `map`. The function is applied to three
	     * arguments: *(value, key, obj)*. If only the value is significant, use
	     * `map` instead.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig ((*, String, Object) -> *) -> Object -> Object
	     * @param {Function} fn
	     * @param {Object} obj
	     * @return {Object}
	     * @see R.map
	     * @example
	     *
	     *      var values = { x: 1, y: 2, z: 3 };
	     *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
	     *
	     *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
	     */
	    var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
	        return _reduce(function (acc, key) {
	            acc[key] = fn(obj[key], key, obj);
	            return acc;
	        }, {}, keys(obj));
	    });

	    /**
	     * Creates a new object with the own properties of the two provided objects. If
	     * a key exists in both objects, the provided function is applied to the values
	     * associated with the key in each object, with the result being used as the
	     * value associated with the key in the returned object. The key will be
	     * excluded from the returned object if the resulting value is `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @sig (a -> a -> a) -> {a} -> {a} -> {a}
	     * @param {Function} fn
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.merge, R.mergeWithKey
	     * @example
	     *
	     *      R.mergeWith(R.concat,
	     *                  { a: true, values: [10, 20] },
	     *                  { b: true, values: [15, 35] });
	     *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
	     */
	    var mergeWith = _curry3(function mergeWith(fn, l, r) {
	        return mergeWithKey(function (_, _l, _r) {
	            return fn(_l, _r);
	        }, l, r);
	    });

	    /**
	     * Takes a function `f` and a list of arguments, and returns a function `g`.
	     * When applied, `g` returns the result of applying `f` to the arguments
	     * provided initially followed by the arguments provided to `g`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
	     * @param {Function} f
	     * @param {Array} args
	     * @return {Function}
	     * @see R.partialRight
	     * @example
	     *
	     *      var multiply = (a, b) => a * b;
	     *      var double = R.partial(multiply, [2]);
	     *      double(2); //=> 4
	     *
	     *      var greet = (salutation, title, firstName, lastName) =>
	     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *
	     *      var sayHello = R.partial(greet, ['Hello']);
	     *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
	     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partial = _createPartialApplicator(_concat);

	    /**
	     * Takes a function `f` and a list of arguments, and returns a function `g`.
	     * When applied, `g` returns the result of applying `f` to the arguments
	     * provided to `g` followed by the arguments provided initially.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
	     * @param {Function} f
	     * @param {Array} args
	     * @return {Function}
	     * @see R.partial
	     * @example
	     *
	     *      var greet = (salutation, title, firstName, lastName) =>
	     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *
	     *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
	     *
	     *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partialRight = _createPartialApplicator(flip(_concat));

	    /**
	     * Determines whether a nested path on an object has a specific value, in
	     * `R.equals` terms. Most likely used to filter a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Relation
	     * @sig [String] -> * -> {String: *} -> Boolean
	     * @param {Array} path The path of the nested property to use
	     * @param {*} val The value to compare the nested property with
	     * @param {Object} obj The object to check the nested property in
	     * @return {Boolean} `true` if the value equals the nested object property,
	     *         `false` otherwise.
	     * @example
	     *
	     *      var user1 = { address: { zipCode: 90210 } };
	     *      var user2 = { address: { zipCode: 55555 } };
	     *      var user3 = { name: 'Bob' };
	     *      var users = [ user1, user2, user3 ];
	     *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
	     *      R.filter(isFamous, users); //=> [ user1 ]
	     */
	    var pathEq = _curry3(function pathEq(_path, val, obj) {
	        return equals(path(_path, obj), val);
	    });

	    /**
	     * Returns a new list by plucking the same named property off all objects in
	     * the list supplied.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig k -> [{k: v}] -> [v]
	     * @param {Number|String} key The key name to pluck off of each object.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of values for the given key.
	     * @see R.props
	     * @example
	     *
	     *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
	     *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
	     */
	    var pluck = _curry2(function pluck(p, list) {
	        return map(prop(p), list);
	    });

	    /**
	     * Reasonable analog to SQL `select` statement.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @category Relation
	     * @sig [k] -> [{k: v}] -> [{k: v}]
	     * @param {Array} props The property names to project
	     * @param {Array} objs The objects to query
	     * @return {Array} An array of objects with just the `props` properties.
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
	     *      var kids = [abby, fred];
	     *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
	     */
	    // passing `identity` gives correct arity
	    var project = useWith(_map, [
	        pickAll,
	        identity
	    ]);

	    /**
	     * Returns `true` if the specified object property is equal, in `R.equals`
	     * terms, to the given value; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig String -> a -> Object -> Boolean
	     * @param {String} name
	     * @param {*} val
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.equals, R.propSatisfies
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
	     *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
	     *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
	     *      var kids = [abby, fred, rusty, alois];
	     *      var hasBrownHair = R.propEq('hair', 'brown');
	     *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
	     */
	    var propEq = _curry3(function propEq(name, val, obj) {
	        return equals(val, obj[name]);
	    });

	    /**
	     * Returns a single item by iterating through the list, successively calling
	     * the iterator function and passing it an accumulator value and the current
	     * value from the array, and then passing the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*. It may use
	     * `R.reduced` to shortcut the iteration.
	     *
	     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.reduce` method. For more details
	     * on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	     *
	     * Dispatches to the `reduce` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig ((a, b) -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduced, R.addIndex
	     * @example
	     *
	     *      var numbers = [1, 2, 3];
	     *      var plus = (a, b) => a + b;
	     *
	     *      R.reduce(plus, 10, numbers); //=> 16
	     */
	    var reduce = _curry3(_reduce);

	    /**
	     * Groups the elements of the list according to the result of calling
	     * the String-returning function `keyFn` on each element and reduces the elements
	     * of each group to a single value via the reducer function `valueFn`.
	     *
	     * This function is basically a more general `groupBy` function.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category List
	     * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
	     * @param {Function} valueFn The function that reduces the elements of each group to a single
	     *        value. Receives two values, accumulator for a particular group and the current element.
	     * @param {*} acc The (initial) accumulator value for each group.
	     * @param {Function} keyFn The function that maps the list's element into a key.
	     * @param {Array} list The array to group.
	     * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
	     *         `valueFn` for elements which produced that key when passed to `keyFn`.
	     * @see R.groupBy, R.reduce
	     * @example
	     *
	     *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
	     *      var namesByGrade = reduceToNamesBy(function(student) {
	     *        var score = student.score;
	     *        return score < 65 ? 'F' :
	     *               score < 70 ? 'D' :
	     *               score < 80 ? 'C' :
	     *               score < 90 ? 'B' : 'A';
	     *      });
	     *      var students = [{name: 'Lucy', score: 92},
	     *                      {name: 'Drew', score: 85},
	     *                      // ...
	     *                      {name: 'Bart', score: 62}];
	     *      namesByGrade(students);
	     *      // {
	     *      //   'A': ['Lucy'],
	     *      //   'B': ['Drew']
	     *      //   // ...,
	     *      //   'F': ['Bart']
	     *      // }
	     */
	    var reduceBy = _curryN(4, [], _dispatchable('reduceBy', _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
	        return _reduce(function (acc, elt) {
	            var key = keyFn(elt);
	            acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
	            return acc;
	        }, {}, list);
	    }));

	    /**
	     * Like `reduce`, `reduceWhile` returns a single item by iterating through
	     * the list, successively calling the iterator function. `reduceWhile` also
	     * takes a predicate that is evaluated before each step. If the predicate returns
	     * `false`, it "short-circuits" the iteration and returns the current value
	     * of the accumulator.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.22.0
	     * @category List
	     * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
	     * @param {Function} pred The predicate. It is passed the accumulator and the
	     *        current element.
	     * @param {Function} fn The iterator function. Receives two values, the
	     *        accumulator and the current element.
	     * @param {*} a The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduce, R.reduced
	     * @example
	     *
	     *      var isOdd = (acc, x) => x % 2 === 1;
	     *      var xs = [1, 3, 5, 60, 777, 800];
	     *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
	     *
	     *      var ys = [2, 4, 6]
	     *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
	     */
	    var reduceWhile = _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
	        return _reduce(function (acc, x) {
	            return pred(acc, x) ? fn(acc, x) : _reduced(acc);
	        }, a, list);
	    });

	    /**
	     * The complement of `filter`.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> f a
	     * @param {Function} pred
	     * @param {Array} filterable
	     * @return {Array}
	     * @see R.filter, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isOdd = (n) => n % 2 === 1;
	     *
	     *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
	     *
	     *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	     */
	    var reject = _curry2(function reject(pred, filterable) {
	        return filter(_complement(pred), filterable);
	    });

	    /**
	     * Returns a fixed list of size `n` containing a specified identical value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig a -> n -> [a]
	     * @param {*} value The value to repeat.
	     * @param {Number} n The desired size of the output list.
	     * @return {Array} A new array containing `n` `value`s.
	     * @example
	     *
	     *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
	     *
	     *      var obj = {};
	     *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
	     *      repeatedObjs[0] === repeatedObjs[1]; //=> true
	     */
	    var repeat = _curry2(function repeat(value, n) {
	        return times(always(value), n);
	    });

	    /**
	     * Adds together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The sum of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.sum([2,4,6,8,100,1]); //=> 121
	     */
	    var sum = reduce(add, 0);

	    /**
	     * Returns a new list containing the last `n` elements of the given list.
	     * If `n > list.length`, returns a list of `list.length` elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n The number of elements to return.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @see R.dropLast
	     * @example
	     *
	     *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
	     *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
	     *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.takeLast(3, 'ramda');               //=> 'mda'
	     */
	    var takeLast = _curry2(function takeLast(n, xs) {
	        return drop(n >= 0 ? xs.length - n : 0, xs);
	    });

	    /**
	     * Initializes a transducer using supplied iterator function. Returns a single
	     * item by iterating through the list, successively calling the transformed
	     * iterator function and passing it an accumulator value and the current value
	     * from the array, and then passing the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*. It will be
	     * wrapped as a transformer to initialize the transducer. A transformer can be
	     * passed directly in place of an iterator function. In both cases, iteration
	     * may be stopped early with the `R.reduced` function.
	     *
	     * A transducer is a function that accepts a transformer and returns a
	     * transformer and can be composed directly.
	     *
	     * A transformer is an an object that provides a 2-arity reducing iterator
	     * function, step, 0-arity initial value function, init, and 1-arity result
	     * extraction function, result. The step function is used as the iterator
	     * function in reduce. The result function is used to convert the final
	     * accumulator into the return type and in most cases is R.identity. The init
	     * function can be used to provide an initial accumulator, but is ignored by
	     * transduce.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array. Wrapped as transformer, if necessary, and used to
	     *        initialize the transducer
	     * @param {*} acc The initial accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduce, R.reduced, R.into
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
	     */
	    var transduce = curryN(4, function transduce(xf, fn, acc, list) {
	        return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
	    });

	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the elements
	     * of each list. Duplication is determined according to the value returned by
	     * applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @see R.union
	     * @example
	     *
	     *      var l1 = [{a: 1}, {a: 2}];
	     *      var l2 = [{a: 1}, {a: 4}];
	     *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
	     */
	    var unionWith = _curry3(function unionWith(pred, list1, list2) {
	        return uniqWith(pred, _concat(list1, list2));
	    });

	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec, false otherwise. An object satisfies the spec if, for each of the
	     * spec's own properties, accessing that property of the object gives the same
	     * value (in `R.equals` terms) as accessing that property of the spec.
	     *
	     * `whereEq` is a specialization of [`where`](#where).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @sig {String: *} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @see R.where
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = R.whereEq({a: 1, b: 2});
	     *
	     *      pred({a: 1});              //=> false
	     *      pred({a: 1, b: 2});        //=> true
	     *      pred({a: 1, b: 2, c: 3});  //=> true
	     *      pred({a: 1, b: 1});        //=> false
	     */
	    var whereEq = _curry2(function whereEq(spec, testObj) {
	        return where(map(equals, spec), testObj);
	    });

	    var _flatCat = function () {
	        var preservingReduced = function (xf) {
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return xf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    var ret = xf['@@transducer/step'](result, input);
	                    return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
	                }
	            };
	        };
	        return function _xcat(xf) {
	            var rxf = preservingReduced(xf);
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return rxf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
	                }
	            };
	        };
	    }();

	    // Array.prototype.indexOf doesn't exist below IE9
	    // manually crawl the list to distinguish between +0 and -0
	    // NaN
	    // non-zero numbers can utilise Set
	    // all these types can utilise Set
	    // null can utilise Set
	    // anything else not covered above, defer to R.equals
	    var _indexOf = function _indexOf(list, a, idx) {
	        var inf, item;
	        // Array.prototype.indexOf doesn't exist below IE9
	        if (typeof list.indexOf === 'function') {
	            switch (typeof a) {
	            case 'number':
	                if (a === 0) {
	                    // manually crawl the list to distinguish between +0 and -0
	                    inf = 1 / a;
	                    while (idx < list.length) {
	                        item = list[idx];
	                        if (item === 0 && 1 / item === inf) {
	                            return idx;
	                        }
	                        idx += 1;
	                    }
	                    return -1;
	                } else if (a !== a) {
	                    // NaN
	                    while (idx < list.length) {
	                        item = list[idx];
	                        if (typeof item === 'number' && item !== item) {
	                            return idx;
	                        }
	                        idx += 1;
	                    }
	                    return -1;
	                }
	                // non-zero numbers can utilise Set
	                return list.indexOf(a, idx);
	            // all these types can utilise Set
	            case 'string':
	            case 'boolean':
	            case 'function':
	            case 'undefined':
	                return list.indexOf(a, idx);
	            case 'object':
	                if (a === null) {
	                    // null can utilise Set
	                    return list.indexOf(a, idx);
	                }
	            }
	        }
	        // anything else not covered above, defer to R.equals
	        while (idx < list.length) {
	            if (equals(list[idx], a)) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    };

	    var _xchain = _curry2(function _xchain(f, xf) {
	        return map(f, _flatCat(xf));
	    });

	    /**
	     * Takes a list of predicates and returns a predicate that returns true for a
	     * given list of arguments if every one of the provided predicates is satisfied
	     * by those arguments.
	     *
	     * The function returned is a curried function whose arity matches that of the
	     * highest-arity predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} preds
	     * @return {Function}
	     * @see R.anyPass
	     * @example
	     *
	     *      var isQueen = R.propEq('rank', 'Q');
	     *      var isSpade = R.propEq('suit', '♠︎');
	     *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
	     *
	     *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
	     *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
	     */
	    var allPass = _curry1(function allPass(preds) {
	        return curryN(reduce(max, 0, pluck('length', preds)), function () {
	            var idx = 0;
	            var len = preds.length;
	            while (idx < len) {
	                if (!preds[idx].apply(this, arguments)) {
	                    return false;
	                }
	                idx += 1;
	            }
	            return true;
	        });
	    });

	    /**
	     * Takes a list of predicates and returns a predicate that returns true for a
	     * given list of arguments if at least one of the provided predicates is
	     * satisfied by those arguments.
	     *
	     * The function returned is a curried function whose arity matches that of the
	     * highest-arity predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} preds
	     * @return {Function}
	     * @see R.allPass
	     * @example
	     *
	     *      var gte = R.anyPass([R.gt, R.equals]);
	     *
	     *      gte(3, 2); //=> true
	     *      gte(2, 2); //=> true
	     *      gte(2, 3); //=> false
	     */
	    var anyPass = _curry1(function anyPass(preds) {
	        return curryN(reduce(max, 0, pluck('length', preds)), function () {
	            var idx = 0;
	            var len = preds.length;
	            while (idx < len) {
	                if (preds[idx].apply(this, arguments)) {
	                    return true;
	                }
	                idx += 1;
	            }
	            return false;
	        });
	    });

	    /**
	     * ap applies a list of functions to a list of values.
	     *
	     * Dispatches to the `ap` method of the second argument, if present. Also
	     * treats curried functions as applicatives.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig [a -> b] -> [a] -> [b]
	     * @sig Apply f => f (a -> b) -> f a -> f b
	     * @param {Array} fns An array of functions
	     * @param {Array} vs An array of values
	     * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
	     * @example
	     *
	     *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
	     */
	    // else
	    var ap = _curry2(function ap(applicative, fn) {
	        return typeof applicative.ap === 'function' ? applicative.ap(fn) : typeof applicative === 'function' ? function (x) {
	            return applicative(x)(fn(x));
	        } : // else
	        _reduce(function (acc, f) {
	            return _concat(acc, map(f, fn));
	        }, [], applicative);
	    });

	    /**
	     * Given a spec object recursively mapping properties to functions, creates a
	     * function producing an object of the same structure, by mapping each property
	     * to the result of calling its associated function with the supplied arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Function
	     * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
	     * @param {Object} spec an object recursively mapping properties to functions for
	     *        producing the values for these properties.
	     * @return {Function} A function that returns an object of the same structure
	     * as `spec', with each property set to the value returned by calling its
	     * associated function with the supplied arguments.
	     * @see R.converge, R.juxt
	     * @example
	     *
	     *      var getMetrics = R.applySpec({
	     *                                      sum: R.add,
	     *                                      nested: { mul: R.multiply }
	     *                                   });
	     *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
	     */
	    var applySpec = _curry1(function applySpec(spec) {
	        spec = map(function (v) {
	            return typeof v == 'function' ? v : applySpec(v);
	        }, spec);
	        return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
	            var args = arguments;
	            return map(function (f) {
	                return apply(f, args);
	            }, spec);
	        });
	    });

	    /**
	     * Returns the result of calling its first argument with the remaining
	     * arguments. This is occasionally useful as a converging function for
	     * `R.converge`: the left branch can produce a function while the right branch
	     * produces a value to be passed to that function as an argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig (*... -> a),*... -> a
	     * @param {Function} fn The function to apply to the remaining arguments.
	     * @param {...*} args Any number of positional arguments.
	     * @return {*}
	     * @see R.apply
	     * @example
	     *
	     *      var indentN = R.pipe(R.times(R.always(' ')),
	     *                           R.join(''),
	     *                           R.replace(/^(?!$)/gm));
	     *
	     *      var format = R.converge(R.call, [
	     *                                  R.pipe(R.prop('indent'), indentN),
	     *                                  R.prop('value')
	     *                              ]);
	     *
	     *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
	     */
	    var call = curry(function call(fn) {
	        return fn.apply(this, _slice(arguments, 1));
	    });

	    /**
	     * `chain` maps a function over a list and concatenates the results. `chain`
	     * is also known as `flatMap` in some libraries
	     *
	     * Dispatches to the `chain` method of the second argument, if present,
	     * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig Chain m => (a -> m b) -> m a -> m b
	     * @param {Function} fn
	     * @param {Array} list
	     * @return {Array}
	     * @example
	     *
	     *      var duplicate = n => [n, n];
	     *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
	     */
	    var chain = _curry2(_dispatchable('chain', _xchain, function chain(fn, monad) {
	        if (typeof monad === 'function') {
	            return function () {
	                return monad.call(this, fn.apply(this, arguments)).apply(this, arguments);
	            };
	        }
	        return _makeFlat(false)(map(fn, monad));
	    }));

	    /**
	     * Returns a function, `fn`, which encapsulates if/else-if/else logic.
	     * `R.cond` takes a list of [predicate, transform] pairs. All of the arguments
	     * to `fn` are applied to each of the predicates in turn until one returns a
	     * "truthy" value, at which point `fn` returns the result of applying its
	     * arguments to the corresponding transformer. If none of the predicates
	     * matches, `fn` returns undefined.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Logic
	     * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
	     * @param {Array} pairs
	     * @return {Function}
	     * @example
	     *
	     *      var fn = R.cond([
	     *        [R.equals(0),   R.always('water freezes at 0°C')],
	     *        [R.equals(100), R.always('water boils at 100°C')],
	     *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
	     *      ]);
	     *      fn(0); //=> 'water freezes at 0°C'
	     *      fn(50); //=> 'nothing special happens at 50°C'
	     *      fn(100); //=> 'water boils at 100°C'
	     */
	    var cond = _curry1(function cond(pairs) {
	        var arity = reduce(max, 0, map(function (pair) {
	            return pair[0].length;
	        }, pairs));
	        return _arity(arity, function () {
	            var idx = 0;
	            while (idx < pairs.length) {
	                if (pairs[idx][0].apply(this, arguments)) {
	                    return pairs[idx][1].apply(this, arguments);
	                }
	                idx += 1;
	            }
	        });
	    });

	    /**
	     * Wraps a constructor function inside a curried function that can be called
	     * with the same arguments and returns the same type. The arity of the function
	     * returned is specified to allow using variadic constructor functions.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Function
	     * @sig Number -> (* -> {*}) -> (* -> {*})
	     * @param {Number} n The arity of the constructor function.
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Variadic constructor function
	     *      var Widget = () => {
	     *        this.children = Array.prototype.slice.call(arguments);
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.constructN(1, Widget), allConfigs); // a list of Widgets
	     */
	    var constructN = _curry2(function constructN(n, Fn) {
	        if (n > 10) {
	            throw new Error('Constructor with greater than ten arguments');
	        }
	        if (n === 0) {
	            return function () {
	                return new Fn();
	            };
	        }
	        return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
	            switch (arguments.length) {
	            case 1:
	                return new Fn($0);
	            case 2:
	                return new Fn($0, $1);
	            case 3:
	                return new Fn($0, $1, $2);
	            case 4:
	                return new Fn($0, $1, $2, $3);
	            case 5:
	                return new Fn($0, $1, $2, $3, $4);
	            case 6:
	                return new Fn($0, $1, $2, $3, $4, $5);
	            case 7:
	                return new Fn($0, $1, $2, $3, $4, $5, $6);
	            case 8:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
	            case 9:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
	            case 10:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
	            }
	        }));
	    });

	    /**
	     * Accepts a converging function and a list of branching functions and returns
	     * a new function. When invoked, this new function is applied to some
	     * arguments, each branching function is applied to those same arguments. The
	     * results of each branching function are passed as arguments to the converging
	     * function to produce the return value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.2
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> [(a -> b -> ... -> x1), (a -> b -> ... -> x2), ...] -> (a -> b -> ... -> z)
	     * @param {Function} after A function. `after` will be invoked with the return values of
	     *        `fn1` and `fn2` as its arguments.
	     * @param {Array} functions A list of functions.
	     * @return {Function} A new function.
	     * @example
	     *
	     *      var add = (a, b) => a + b;
	     *      var multiply = (a, b) => a * b;
	     *      var subtract = (a, b) => a - b;
	     *
	     *      //≅ multiply( add(1, 2), subtract(1, 2) );
	     *      R.converge(multiply, [add, subtract])(1, 2); //=> -3
	     *
	     *      var add3 = (a, b, c) => a + b + c;
	     *      R.converge(add3, [multiply, add, subtract])(1, 2); //=> 4
	     */
	    var converge = _curry2(function converge(after, fns) {
	        return curryN(reduce(max, 0, pluck('length', fns)), function () {
	            var args = arguments;
	            var context = this;
	            return after.apply(context, _map(function (fn) {
	                return fn.apply(context, args);
	            }, fns));
	        });
	    });

	    /**
	     * Counts the elements of a list according to how many match each value of a
	     * key generated by the supplied function. Returns an object mapping the keys
	     * produced by `fn` to the number of occurrences in the list. Note that all
	     * keys are coerced to strings because of how JavaScript objects work.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> String) -> [a] -> {*}
	     * @param {Function} fn The function used to map values to keys.
	     * @param {Array} list The list to count elements from.
	     * @return {Object} An object mapping keys to number of occurrences in the list.
	     * @example
	     *
	     *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
	     *      var letters = R.split('', 'abcABCaaaBBc');
	     *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
	     *      R.countBy(R.toLower)(letters);   //=> {'a': 5, 'b': 4, 'c': 3}
	     */
	    var countBy = reduceBy(function (acc, elem) {
	        return acc + 1;
	    }, 0);

	    /**
	     * Returns a new list without any consecutively repeating elements. Equality is
	     * determined by applying the supplied predicate two consecutive elements. The
	     * first element in a series of equal element is the one being preserved.
	     *
	     * Dispatches to the `dropRepeatsWith` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @see R.transduce
	     * @example
	     *
	     *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
	     *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
	     */
	    var dropRepeatsWith = _curry2(_dispatchable('dropRepeatsWith', _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
	        var result = [];
	        var idx = 1;
	        var len = list.length;
	        if (len !== 0) {
	            result[0] = list[0];
	            while (idx < len) {
	                if (!pred(last(result), list[idx])) {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	        }
	        return result;
	    }));

	    /**
	     * Takes a function and two values in its domain and returns `true` if the
	     * values map to the same value in the codomain; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Relation
	     * @sig (a -> b) -> a -> a -> Boolean
	     * @param {Function} f
	     * @param {*} x
	     * @param {*} y
	     * @return {Boolean}
	     * @example
	     *
	     *      R.eqBy(Math.abs, 5, -5); //=> true
	     */
	    var eqBy = _curry3(function eqBy(f, x, y) {
	        return equals(f(x), f(y));
	    });

	    /**
	     * Reports whether two objects have the same value, in `R.equals` terms, for
	     * the specified property. Useful as a curried predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig k -> {k: v} -> {k: v} -> Boolean
	     * @param {String} prop The name of the property to compare
	     * @param {Object} obj1
	     * @param {Object} obj2
	     * @return {Boolean}
	     *
	     * @example
	     *
	     *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
	     *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
	     *      R.eqProps('a', o1, o2); //=> false
	     *      R.eqProps('c', o1, o2); //=> true
	     */
	    var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
	        return equals(obj1[prop], obj2[prop]);
	    });

	    /**
	     * Splits a list into sub-lists stored in an object, based on the result of
	     * calling a String-returning function on each element, and grouping the
	     * results according to values returned.
	     *
	     * Dispatches to the `groupBy` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> String) -> [a] -> {String: [a]}
	     * @param {Function} fn Function :: a -> String
	     * @param {Array} list The array to group
	     * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
	     *         that produced that key when passed to `fn`.
	     * @see R.transduce
	     * @example
	     *
	     *      var byGrade = R.groupBy(function(student) {
	     *        var score = student.score;
	     *        return score < 65 ? 'F' :
	     *               score < 70 ? 'D' :
	     *               score < 80 ? 'C' :
	     *               score < 90 ? 'B' : 'A';
	     *      });
	     *      var students = [{name: 'Abby', score: 84},
	     *                      {name: 'Eddy', score: 58},
	     *                      // ...
	     *                      {name: 'Jack', score: 69}];
	     *      byGrade(students);
	     *      // {
	     *      //   'A': [{name: 'Dianne', score: 99}],
	     *      //   'B': [{name: 'Abby', score: 84}]
	     *      //   // ...,
	     *      //   'F': [{name: 'Eddy', score: 58}]
	     *      // }
	     */
	    var groupBy = _curry2(_checkForMethod('groupBy', reduceBy(function (acc, item) {
	        if (acc == null) {
	            acc = [];
	        }
	        acc.push(item);
	        return acc;
	    }, null)));

	    /**
	     * Given a function that generates a key, turns a list of objects into an
	     * object indexing the objects by the given key. Note that if multiple
	     * objects generate the same value for the indexing key only the last value
	     * will be included in the generated object.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
	     * @param {Function} fn Function :: a -> String
	     * @param {Array} array The array of objects to index
	     * @return {Object} An object indexing each array element by the given property.
	     * @example
	     *
	     *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
	     *      R.indexBy(R.prop('id'), list);
	     *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
	     */
	    var indexBy = reduceBy(function (acc, elem) {
	        return elem;
	    }, null);

	    /**
	     * Returns the position of the first occurrence of an item in an array, or -1
	     * if the item is not included in the array. `R.equals` is used to determine
	     * equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     * @see R.lastIndexOf
	     * @example
	     *
	     *      R.indexOf(3, [1,2,3,4]); //=> 2
	     *      R.indexOf(10, [1,2,3,4]); //=> -1
	     */
	    var indexOf = _curry2(function indexOf(target, xs) {
	        return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
	    });

	    /**
	     * juxt applies a list of functions to a list of values.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Function
	     * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
	     * @param {Array} fns An array of functions
	     * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
	     * @see R.applySpec
	     * @example
	     *
	     *      var getRange = R.juxt([Math.min, Math.max]);
	     *      getRange(3, 4, 9, -3); //=> [-3, 9]
	     */
	    var juxt = _curry1(function juxt(fns) {
	        return converge(_arrayOf, fns);
	    });

	    /**
	     * Returns a lens for the given getter and setter functions. The getter "gets"
	     * the value of the focus; the setter "sets" the value of the focus. The setter
	     * should not mutate the data structure.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
	     * @param {Function} getter
	     * @param {Function} setter
	     * @return {Lens}
	     * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
	     *
	     *      R.view(xLens, {x: 1, y: 2});            //=> 1
	     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
	     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
	     */
	    var lens = _curry2(function lens(getter, setter) {
	        return function (toFunctorFn) {
	            return function (target) {
	                return map(function (focus) {
	                    return setter(focus, target);
	                }, toFunctorFn(getter(target)));
	            };
	        };
	    });

	    /**
	     * Returns a lens whose focus is the specified index.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Number -> Lens s a
	     * @param {Number} n
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *
	     *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
	     *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
	     *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
	     */
	    var lensIndex = _curry1(function lensIndex(n) {
	        return lens(nth(n), update(n));
	    });

	    /**
	     * Returns a lens whose focus is the specified path.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig [String] -> Lens s a
	     * @param {Array} path The path to use.
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var xyLens = R.lensPath(['x', 'y']);
	     *
	     *      R.view(xyLens, {x: {y: 2, z: 3}});            //=> 2
	     *      R.set(xyLens, 4, {x: {y: 2, z: 3}});          //=> {x: {y: 4, z: 3}}
	     *      R.over(xyLens, R.negate, {x: {y: 2, z: 3}});  //=> {x: {y: -2, z: 3}}
	     */
	    var lensPath = _curry1(function lensPath(p) {
	        return lens(path(p), assocPath(p));
	    });

	    /**
	     * Returns a lens whose focus is the specified property.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig String -> Lens s a
	     * @param {String} k
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.view(xLens, {x: 1, y: 2});            //=> 1
	     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
	     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
	     */
	    var lensProp = _curry1(function lensProp(k) {
	        return lens(prop(k), assoc(k));
	    });

	    /**
	     * "lifts" a function to be the specified arity, so that it may "map over" that
	     * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig Number -> (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The lifted function.
	     * @see R.lift, R.ap
	     * @example
	     *
	     *      var madd3 = R.liftN(3, R.curryN(3, (...args) => R.sum(args)));
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     */
	    var liftN = _curry2(function liftN(arity, fn) {
	        var lifted = curryN(arity, fn);
	        return curryN(arity, function () {
	            return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
	        });
	    });

	    /**
	     * Returns the mean of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.mean([2, 7, 9]); //=> 6
	     *      R.mean([]); //=> NaN
	     */
	    var mean = _curry1(function mean(list) {
	        return sum(list) / list.length;
	    });

	    /**
	     * Returns the median of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.median([2, 9, 7]); //=> 7
	     *      R.median([7, 2, 10, 9]); //=> 8
	     *      R.median([]); //=> NaN
	     */
	    var median = _curry1(function median(list) {
	        var len = list.length;
	        if (len === 0) {
	            return NaN;
	        }
	        var width = 2 - len % 2;
	        var idx = (len - width) / 2;
	        return mean(_slice(list).sort(function (a, b) {
	            return a < b ? -1 : a > b ? 1 : 0;
	        }).slice(idx, idx + width));
	    });

	    /**
	     * Takes a predicate and a list or other "filterable" object and returns the
	     * pair of filterable objects of the same type of elements which do and do not
	     * satisfy, the predicate, respectively.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
	     * @param {Function} pred A predicate to determine which side the element belongs to.
	     * @param {Array} filterable the list (or other filterable) to partition.
	     * @return {Array} An array, containing first the subset of elements that satisfy the
	     *         predicate, and second the subset of elements that do not satisfy.
	     * @see R.filter, R.reject
	     * @example
	     *
	     *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
	     *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
	     *
	     *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
	     *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
	     */
	    var partition = juxt([
	        filter,
	        reject
	    ]);

	    /**
	     * Performs left-to-right function composition. The leftmost function may have
	     * any arity; the remaining functions must be unary.
	     *
	     * In some libraries this function is named `sequence`.
	     *
	     * **Note:** The result of pipe is not automatically curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.compose
	     * @example
	     *
	     *      var f = R.pipe(Math.pow, R.negate, R.inc);
	     *
	     *      f(3, 4); // -(3^4) + 1
	     */
	    var pipe = function pipe() {
	        if (arguments.length === 0) {
	            throw new Error('pipe requires at least one argument');
	        }
	        return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
	    };

	    /**
	     * Performs left-to-right composition of one or more Promise-returning
	     * functions. The leftmost function may have any arity; the remaining functions
	     * must be unary.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.composeP
	     * @example
	     *
	     *      //  followersForUser :: String -> Promise [User]
	     *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
	     */
	    var pipeP = function pipeP() {
	        if (arguments.length === 0) {
	            throw new Error('pipeP requires at least one argument');
	        }
	        return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
	    };

	    /**
	     * Multiplies together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The product of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.product([2,4,6,8,100,1]); //=> 38400
	     */
	    var product = reduce(multiply, 1);

	    /**
	     * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
	     * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
	     * Applicative of Traversable.
	     *
	     * Dispatches to the `sequence` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
	     * @param {Function} of
	     * @param {*} traversable
	     * @return {*}
	     * @see R.traverse
	     * @example
	     *
	     *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
	     *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
	     *
	     *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
	     *      R.sequence(R.of, Nothing());       //=> [Nothing()]
	     */
	    var sequence = _curry2(function sequence(of, traversable) {
	        return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (acc, x) {
	            return ap(map(prepend, x), acc);
	        }, of([]), traversable);
	    });

	    /**
	     * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
	     * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
	     * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
	     * into an Applicative of Traversable.
	     *
	     * Dispatches to the `sequence` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
	     * @param {Function} of
	     * @param {Function} f
	     * @param {*} traversable
	     * @return {*}
	     * @see R.sequence
	     * @example
	     *
	     *      // Returns `Nothing` if the given divisor is `0`
	     *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
	     *
	     *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
	     *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
	     */
	    var traverse = _curry3(function traverse(of, f, traversable) {
	        return sequence(of, map(f, traversable));
	    });

	    /**
	     * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
	     * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig Chain c => c (c a) -> c a
	     * @param {*} list
	     * @return {*}
	     * @see R.flatten, R.chain
	     * @example
	     *
	     *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
	     *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
	     */
	    var unnest = chain(_identity);

	    var _contains = function _contains(a, list) {
	        return _indexOf(list, a, 0) >= 0;
	    };

	    //  mapPairs :: (Object, [String]) -> [String]
	    var _toString = function _toString(x, seen) {
	        var recur = function recur(y) {
	            var xs = seen.concat([x]);
	            return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
	        };
	        //  mapPairs :: (Object, [String]) -> [String]
	        var mapPairs = function (obj, keys) {
	            return _map(function (k) {
	                return _quote(k) + ': ' + recur(obj[k]);
	            }, keys.slice().sort());
	        };
	        switch (Object.prototype.toString.call(x)) {
	        case '[object Arguments]':
	            return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
	        case '[object Array]':
	            return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
	                return /^\d+$/.test(k);
	            }, keys(x)))).join(', ') + ']';
	        case '[object Boolean]':
	            return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
	        case '[object Date]':
	            return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
	        case '[object Null]':
	            return 'null';
	        case '[object Number]':
	            return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
	        case '[object String]':
	            return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
	        case '[object Undefined]':
	            return 'undefined';
	        default:
	            if (typeof x.toString === 'function') {
	                var repr = x.toString();
	                if (repr !== '[object Object]') {
	                    return repr;
	                }
	            }
	            return '{' + mapPairs(x, keys(x)).join(', ') + '}';
	        }
	    };

	    /**
	     * Performs right-to-left function composition. The rightmost function may have
	     * any arity; the remaining functions must be unary.
	     *
	     * **Note:** The result of compose is not automatically curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.pipe
	     * @example
	     *
	     *      var f = R.compose(R.inc, R.negate, Math.pow);
	     *
	     *      f(3, 4); // -(3^4) + 1
	     */
	    var compose = function compose() {
	        if (arguments.length === 0) {
	            throw new Error('compose requires at least one argument');
	        }
	        return pipe.apply(this, reverse(arguments));
	    };

	    /**
	     * Returns the right-to-left Kleisli composition of the provided functions,
	     * each of which must return a value of a type supported by [`chain`](#chain).
	     *
	     * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Function
	     * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (m a -> m z)
	     * @param {...Function}
	     * @return {Function}
	     * @see R.pipeK
	     * @example
	     *
	     *      //  parseJson :: String -> Maybe *
	     *      //  get :: String -> Object -> Maybe *
	     *
	     *      //  getStateCode :: Maybe String -> Maybe String
	     *      var getStateCode = R.composeK(
	     *        R.compose(Maybe.of, R.toUpper),
	     *        get('state'),
	     *        get('address'),
	     *        get('user'),
	     *        parseJson
	     *      );
	     *
	     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
	     *      //=> Just('NY')
	     *      getStateCode(Maybe.of('[Invalid JSON]'));
	     *      //=> Nothing()
	     */
	    var composeK = function composeK() {
	        return compose.apply(this, prepend(identity, map(chain, arguments)));
	    };

	    /**
	     * Performs right-to-left composition of one or more Promise-returning
	     * functions. The rightmost function may have any arity; the remaining
	     * functions must be unary.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.pipeP
	     * @example
	     *
	     *      //  followersForUser :: String -> Promise [User]
	     *      var followersForUser = R.composeP(db.getFollowers, db.getUserById);
	     */
	    var composeP = function composeP() {
	        if (arguments.length === 0) {
	            throw new Error('composeP requires at least one argument');
	        }
	        return pipeP.apply(this, reverse(arguments));
	    };

	    /**
	     * Wraps a constructor function inside a curried function that can be called
	     * with the same arguments and returns the same type.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (* -> {*}) -> (* -> {*})
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Constructor function
	     *      var Widget = config => {
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.construct(Widget), allConfigs); // a list of Widgets
	     */
	    var construct = _curry1(function construct(Fn) {
	        return constructN(Fn.length, Fn);
	    });

	    /**
	     * Returns `true` if the specified value is equal, in `R.equals` terms, to at
	     * least one element of the given list; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Boolean
	     * @param {Object} a The item to compare against.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the item is in the list, `false` otherwise.
	     * @see R.any
	     * @example
	     *
	     *      R.contains(3, [1, 2, 3]); //=> true
	     *      R.contains(4, [1, 2, 3]); //=> false
	     *      R.contains([42], [[42]]); //=> true
	     */
	    var contains = _curry2(_contains);

	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not
	     * contained in the second list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith
	     * @example
	     *
	     *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
	     *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
	     */
	    var difference = _curry2(function difference(first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        while (idx < firstLen) {
	            if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
	                out[out.length] = first[idx];
	            }
	            idx += 1;
	        }
	        return out;
	    });

	    /**
	     * Returns a new list without any consecutively repeating elements. `R.equals`
	     * is used to determine equality.
	     *
	     * Dispatches to the `dropRepeats` method of the first argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @see R.transduce
	     * @example
	     *
	     *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
	     */
	    var dropRepeats = _curry1(_dispatchable('dropRepeats', _xdropRepeatsWith(equals), dropRepeatsWith(equals)));

	    /**
	     * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
	     * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The lifted function.
	     * @see R.liftN
	     * @example
	     *
	     *      var madd3 = R.lift(R.curry((a, b, c) => a + b + c));
	     *
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     *
	     *      var madd5 = R.lift(R.curry((a, b, c, d, e) => a + b + c + d + e));
	     *
	     *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
	     */
	    var lift = _curry1(function lift(fn) {
	        return liftN(fn.length, fn);
	    });

	    /**
	     * Returns a partial copy of an object omitting the keys specified.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [String] -> {String: *} -> {String: *}
	     * @param {Array} names an array of String property names to omit from the new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with properties from `names` not on it.
	     * @see R.pick
	     * @example
	     *
	     *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
	     */
	    var omit = _curry2(function omit(names, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (!_contains(prop, names)) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });

	    /**
	     * Returns the left-to-right Kleisli composition of the provided functions,
	     * each of which must return a value of a type supported by [`chain`](#chain).
	     *
	     * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Function
	     * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (m a -> m z)
	     * @param {...Function}
	     * @return {Function}
	     * @see R.composeK
	     * @example
	     *
	     *      //  parseJson :: String -> Maybe *
	     *      //  get :: String -> Object -> Maybe *
	     *
	     *      //  getStateCode :: Maybe String -> Maybe String
	     *      var getStateCode = R.pipeK(
	     *        parseJson,
	     *        get('user'),
	     *        get('address'),
	     *        get('state'),
	     *        R.compose(Maybe.of, R.toUpper)
	     *      );
	     *
	     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
	     *      //=> Just('NY')
	     *      getStateCode(Maybe.of('[Invalid JSON]'));
	     *      //=> Nothing()
	     */
	    var pipeK = function pipeK() {
	        return composeK.apply(this, reverse(arguments));
	    };

	    /**
	     * Returns the string representation of the given value. `eval`'ing the output
	     * should result in a value equivalent to the input value. Many of the built-in
	     * `toString` methods do not satisfy this requirement.
	     *
	     * If the given value is an `[object Object]` with a `toString` method other
	     * than `Object.prototype.toString`, this method is invoked with no arguments
	     * to produce the return value. This means user-defined constructor functions
	     * can provide a suitable `toString` method. For example:
	     *
	     *     function Point(x, y) {
	     *       this.x = x;
	     *       this.y = y;
	     *     }
	     *
	     *     Point.prototype.toString = function() {
	     *       return 'new Point(' + this.x + ', ' + this.y + ')';
	     *     };
	     *
	     *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category String
	     * @sig * -> String
	     * @param {*} val
	     * @return {String}
	     * @example
	     *
	     *      R.toString(42); //=> '42'
	     *      R.toString('abc'); //=> '"abc"'
	     *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
	     *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
	     *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
	     */
	    var toString = _curry1(function toString(val) {
	        return _toString(val, []);
	    });

	    /**
	     * Returns a new list without values in the first argument.
	     * `R.equals` is used to determine equality.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig [a] -> [a] -> [a]
	     * @param {Array} list1 The values to be removed from `list2`.
	     * @param {Array} list2 The array to remove values from.
	     * @return {Array} The new array without values in `list1`.
	     * @see R.transduce
	     * @example
	     *
	     *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
	     */
	    var without = _curry2(function (xs, list) {
	        return reject(flip(_contains)(xs), list);
	    });

	    // A simple Set type that honours R.equals semantics
	    /* globals Set */
	    // until we figure out why jsdoc chokes on this
	    // @param item The item to add to the Set
	    // @returns {boolean} true if the item did not exist prior, otherwise false
	    //
	    //
	    // @param item The item to check for existence in the Set
	    // @returns {boolean} true if the item exists in the Set, otherwise false
	    //
	    //
	    // Combines the logic for checking whether an item is a member of the set and
	    // for adding a new item to the set.
	    //
	    // @param item       The item to check or add to the Set instance.
	    // @param shouldAdd  If true, the item will be added to the set if it doesn't
	    //                   already exist.
	    // @param set        The set instance to check or add to.
	    // @return {boolean} true if the item already existed, otherwise false.
	    //
	    // distinguish between +0 and -0
	    // these types can all utilise the native Set
	    // set._items['boolean'] holds a two element array
	    // representing [ falseExists, trueExists ]
	    // compare functions for reference equality
	    /* falls through */
	    // reduce the search size of heterogeneous sets by creating buckets
	    // for each type.
	    // scan through all previously applied items
	    var _Set = function () {
	        function _Set() {
	            /* globals Set */
	            this._nativeSet = typeof Set === 'function' ? new Set() : null;
	            this._items = {};
	        }
	        // until we figure out why jsdoc chokes on this
	        // @param item The item to add to the Set
	        // @returns {boolean} true if the item did not exist prior, otherwise false
	        //
	        _Set.prototype.add = function (item) {
	            return !hasOrAdd(item, true, this);
	        };
	        //
	        // @param item The item to check for existence in the Set
	        // @returns {boolean} true if the item exists in the Set, otherwise false
	        //
	        _Set.prototype.has = function (item) {
	            return hasOrAdd(item, false, this);
	        };
	        //
	        // Combines the logic for checking whether an item is a member of the set and
	        // for adding a new item to the set.
	        //
	        // @param item       The item to check or add to the Set instance.
	        // @param shouldAdd  If true, the item will be added to the set if it doesn't
	        //                   already exist.
	        // @param set        The set instance to check or add to.
	        // @return {boolean} true if the item already existed, otherwise false.
	        //
	        function hasOrAdd(item, shouldAdd, set) {
	            var type = typeof item;
	            var prevSize, newSize;
	            switch (type) {
	            case 'string':
	            case 'number':
	                // distinguish between +0 and -0
	                if (item === 0 && 1 / item === -Infinity) {
	                    if (set._items['-0']) {
	                        return true;
	                    } else {
	                        if (shouldAdd) {
	                            set._items['-0'] = true;
	                        }
	                        return false;
	                    }
	                }
	                // these types can all utilise the native Set
	                if (set._nativeSet !== null) {
	                    if (shouldAdd) {
	                        prevSize = set._nativeSet.size;
	                        set._nativeSet.add(item);
	                        newSize = set._nativeSet.size;
	                        return newSize === prevSize;
	                    } else {
	                        return set._nativeSet.has(item);
	                    }
	                } else {
	                    if (!(type in set._items)) {
	                        if (shouldAdd) {
	                            set._items[type] = {};
	                            set._items[type][item] = true;
	                        }
	                        return false;
	                    } else if (item in set._items[type]) {
	                        return true;
	                    } else {
	                        if (shouldAdd) {
	                            set._items[type][item] = true;
	                        }
	                        return false;
	                    }
	                }
	            case 'boolean':
	                // set._items['boolean'] holds a two element array
	                // representing [ falseExists, trueExists ]
	                if (type in set._items) {
	                    var bIdx = item ? 1 : 0;
	                    if (set._items[type][bIdx]) {
	                        return true;
	                    } else {
	                        if (shouldAdd) {
	                            set._items[type][bIdx] = true;
	                        }
	                        return false;
	                    }
	                } else {
	                    if (shouldAdd) {
	                        set._items[type] = item ? [
	                            false,
	                            true
	                        ] : [
	                            true,
	                            false
	                        ];
	                    }
	                    return false;
	                }
	            case 'function':
	                // compare functions for reference equality
	                if (set._nativeSet !== null) {
	                    if (shouldAdd) {
	                        prevSize = set._nativeSet.size;
	                        set._nativeSet.add(item);
	                        newSize = set._nativeSet.size;
	                        return newSize > prevSize;
	                    } else {
	                        return set._nativeSet.has(item);
	                    }
	                } else {
	                    if (!(type in set._items)) {
	                        if (shouldAdd) {
	                            set._items[type] = [item];
	                        }
	                        return false;
	                    }
	                    if (!_contains(item, set._items[type])) {
	                        if (shouldAdd) {
	                            set._items[type].push(item);
	                        }
	                        return false;
	                    }
	                    return true;
	                }
	            case 'undefined':
	                if (set._items[type]) {
	                    return true;
	                } else {
	                    if (shouldAdd) {
	                        set._items[type] = true;
	                    }
	                    return false;
	                }
	            case 'object':
	                if (item === null) {
	                    if (!set._items['null']) {
	                        if (shouldAdd) {
	                            set._items['null'] = true;
	                        }
	                        return false;
	                    }
	                    return true;
	                }
	            /* falls through */
	            default:
	                // reduce the search size of heterogeneous sets by creating buckets
	                // for each type.
	                type = Object.prototype.toString.call(item);
	                if (!(type in set._items)) {
	                    if (shouldAdd) {
	                        set._items[type] = [item];
	                    }
	                    return false;
	                }
	                // scan through all previously applied items
	                if (!_contains(item, set._items[type])) {
	                    if (shouldAdd) {
	                        set._items[type].push(item);
	                    }
	                    return false;
	                }
	                return true;
	            }
	        }
	        return _Set;
	    }();

	    /**
	     * A function wrapping calls to the two functions in an `&&` operation,
	     * returning the result of the first function if it is false-y and the result
	     * of the second function otherwise. Note that this is short-circuited,
	     * meaning that the second function will not be invoked if the first returns a
	     * false-y value.
	     *
	     * In addition to functions, `R.both` also accepts any fantasy-land compatible
	     * applicative functor.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
	     * @see R.and
	     * @example
	     *
	     *      var gt10 = x => x > 10;
	     *      var even = x => x % 2 === 0;
	     *      var f = R.both(gt10, even);
	     *      f(100); //=> true
	     *      f(101); //=> false
	     */
	    var both = _curry2(function both(f, g) {
	        return _isFunction(f) ? function _both() {
	            return f.apply(this, arguments) && g.apply(this, arguments);
	        } : lift(and)(f, g);
	    });

	    /**
	     * Takes a function `f` and returns a function `g` such that:
	     *
	     *   - applying `g` to zero or more arguments will give __true__ if applying
	     *     the same arguments to `f` gives a logical __false__ value; and
	     *
	     *   - applying `g` to zero or more arguments will give __false__ if applying
	     *     the same arguments to `f` gives a logical __true__ value.
	     *
	     * `R.complement` will work on all other functors as well.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> *) -> (*... -> Boolean)
	     * @param {Function} f
	     * @return {Function}
	     * @see R.not
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *      var isOdd = R.complement(isEven);
	     *      isOdd(21); //=> true
	     *      isOdd(42); //=> false
	     */
	    var complement = lift(not);

	    /**
	     * Returns the result of concatenating the given lists or strings.
	     *
	     * Note: `R.concat` expects both arguments to be of the same type,
	     * unlike the native `Array.prototype.concat` method. It will throw
	     * an error if you `concat` an Array with a non-Array value.
	     *
	     * Dispatches to the `concat` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a] -> [a]
	     * @sig String -> String -> String
	     * @param {Array|String} a
	     * @param {Array|String} b
	     * @return {Array|String}
	     *
	     * @example
	     *
	     *      R.concat([], []); //=> []
	     *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     *      R.concat('ABC', 'DEF'); // 'ABCDEF'
	     */
	    var concat = _curry2(function concat(a, b) {
	        if (a == null || !_isFunction(a.concat)) {
	            throw new TypeError(toString(a) + ' does not have a method named "concat"');
	        }
	        if (_isArray(a) && !_isArray(b)) {
	            throw new TypeError(toString(b) + ' is not an array');
	        }
	        return a.concat(b);
	    });

	    /**
	     * A function wrapping calls to the two functions in an `||` operation,
	     * returning the result of the first function if it is truth-y and the result
	     * of the second function otherwise. Note that this is short-circuited,
	     * meaning that the second function will not be invoked if the first returns a
	     * truth-y value.
	     *
	     * In addition to functions, `R.either` also accepts any fantasy-land compatible
	     * applicative functor.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
	     * @see R.or
	     * @example
	     *
	     *      var gt10 = x => x > 10;
	     *      var even = x => x % 2 === 0;
	     *      var f = R.either(gt10, even);
	     *      f(101); //=> true
	     *      f(8); //=> true
	     */
	    var either = _curry2(function either(f, g) {
	        return _isFunction(f) ? function _either() {
	            return f.apply(this, arguments) || g.apply(this, arguments);
	        } : lift(or)(f, g);
	    });

	    /**
	     * Turns a named method with a specified arity into a function that can be
	     * called directly supplied with arguments and a target object.
	     *
	     * The returned function is curried and accepts `arity + 1` parameters where
	     * the final parameter is the target object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
	     * @param {Number} arity Number of arguments the returned function should take
	     *        before the target object.
	     * @param {String} method Name of the method to call.
	     * @return {Function} A new curried function.
	     * @example
	     *
	     *      var sliceFrom = R.invoker(1, 'slice');
	     *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
	     *      var sliceFrom6 = R.invoker(2, 'slice')(6);
	     *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
	     */
	    var invoker = _curry2(function invoker(arity, method) {
	        return curryN(arity + 1, function () {
	            var target = arguments[arity];
	            if (target != null && _isFunction(target[method])) {
	                return target[method].apply(target, _slice(arguments, 0, arity));
	            }
	            throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
	        });
	    });

	    /**
	     * Returns a string made by inserting the `separator` between each element and
	     * concatenating all the elements into a single string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig String -> [a] -> String
	     * @param {Number|String} separator The string used to separate the elements.
	     * @param {Array} xs The elements to join into a string.
	     * @return {String} str The string made by concatenating `xs` with `separator`.
	     * @see R.split
	     * @example
	     *
	     *      var spacer = R.join(' ');
	     *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
	     *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
	     */
	    var join = invoker(1, 'join');

	    /**
	     * Creates a new function that, when invoked, caches the result of calling `fn`
	     * for a given argument set and returns the result. Subsequent calls to the
	     * memoized `fn` with the same argument set will not result in an additional
	     * call to `fn`; instead, the cached result for that set of arguments will be
	     * returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (*... -> a) -> (*... -> a)
	     * @param {Function} fn The function to memoize.
	     * @return {Function} Memoized version of `fn`.
	     * @example
	     *
	     *      var count = 0;
	     *      var factorial = R.memoize(n => {
	     *        count += 1;
	     *        return R.product(R.range(1, n + 1));
	     *      });
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      count; //=> 1
	     */
	    var memoize = _curry1(function memoize(fn) {
	        var cache = {};
	        return _arity(fn.length, function () {
	            var key = toString(arguments);
	            if (!_has(key, cache)) {
	                cache[key] = fn.apply(this, arguments);
	            }
	            return cache[key];
	        });
	    });

	    /**
	     * Splits a string into an array of strings based on the given
	     * separator.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category String
	     * @sig (String | RegExp) -> String -> [String]
	     * @param {String|RegExp} sep The pattern.
	     * @param {String} str The string to separate into an array.
	     * @return {Array} The array of strings from `str` separated by `str`.
	     * @see R.join
	     * @example
	     *
	     *      var pathComponents = R.split('/');
	     *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
	     *
	     *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
	     */
	    var split = invoker(1, 'split');

	    /**
	     * Finds the set (i.e. no duplicates) of all elements contained in the first or
	     * second list, but not both.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` or `list2`, but not both.
	     * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
	     * @example
	     *
	     *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
	     *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
	     */
	    var symmetricDifference = _curry2(function symmetricDifference(list1, list2) {
	        return concat(difference(list1, list2), difference(list2, list1));
	    });

	    /**
	     * Finds the set (i.e. no duplicates) of all elements contained in the first or
	     * second list, but not both. Duplication is determined according to the value
	     * returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [a] -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` or `list2`, but not both.
	     * @see R.symmetricDifference, R.difference, R.differenceWith
	     * @example
	     *
	     *      var eqA = R.eqBy(R.prop('a'));
	     *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
	     *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
	     *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
	     */
	    var symmetricDifferenceWith = _curry3(function symmetricDifferenceWith(pred, list1, list2) {
	        return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
	    });

	    /**
	     * Determines whether a given string matches a given regular expression.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category String
	     * @sig RegExp -> String -> Boolean
	     * @param {RegExp} pattern
	     * @param {String} str
	     * @return {Boolean}
	     * @see R.match
	     * @example
	     *
	     *      R.test(/^x/, 'xyz'); //=> true
	     *      R.test(/^y/, 'xyz'); //=> false
	     */
	    var test = _curry2(function test(pattern, str) {
	        if (!_isRegExp(pattern)) {
	            throw new TypeError('\u2018test\u2019 requires a value of type RegExp as its first argument; received ' + toString(pattern));
	        }
	        return _cloneRegExp(pattern).test(str);
	    });

	    /**
	     * The lower case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to lower case.
	     * @return {String} The lower case version of `str`.
	     * @see R.toUpper
	     * @example
	     *
	     *      R.toLower('XYZ'); //=> 'xyz'
	     */
	    var toLower = invoker(0, 'toLowerCase');

	    /**
	     * The upper case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to upper case.
	     * @return {String} The upper case version of `str`.
	     * @see R.toLower
	     * @example
	     *
	     *      R.toUpper('abc'); //=> 'ABC'
	     */
	    var toUpper = invoker(0, 'toUpperCase');

	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list, based upon the value returned by applying the supplied function to
	     * each list element. Prefers the first item if the supplied function produces
	     * the same value on two items. `R.equals` is used for comparison.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> b) -> [a] -> [a]
	     * @param {Function} fn A function used to produce a value to use during comparisons.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
	     */
	    var uniqBy = _curry2(function uniqBy(fn, list) {
	        var set = new _Set();
	        var result = [];
	        var idx = 0;
	        var appliedItem, item;
	        while (idx < list.length) {
	            item = list[idx];
	            appliedItem = fn(item);
	            if (set.add(appliedItem)) {
	                result.push(item);
	            }
	            idx += 1;
	        }
	        return result;
	    });

	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list. `R.equals` is used to determine equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
	     *      R.uniq([1, '1']);     //=> [1, '1']
	     *      R.uniq([[42], [42]]); //=> [[42]]
	     */
	    var uniq = uniqBy(identity);

	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those
	     * elements common to both lists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The list of elements found in both `list1` and `list2`.
	     * @see R.intersectionWith
	     * @example
	     *
	     *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
	     */
	    var intersection = _curry2(function intersection(list1, list2) {
	        var lookupList, filteredList;
	        if (list1.length > list2.length) {
	            lookupList = list1;
	            filteredList = list2;
	        } else {
	            lookupList = list2;
	            filteredList = list1;
	        }
	        return uniq(_filter(flip(_contains)(lookupList), filteredList));
	    });

	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the elements
	     * of each list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @example
	     *
	     *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
	     */
	    var union = _curry2(compose(uniq, _concat));

	    var R = {
	        F: F,
	        T: T,
	        __: __,
	        add: add,
	        addIndex: addIndex,
	        adjust: adjust,
	        all: all,
	        allPass: allPass,
	        always: always,
	        and: and,
	        any: any,
	        anyPass: anyPass,
	        ap: ap,
	        aperture: aperture,
	        append: append,
	        apply: apply,
	        applySpec: applySpec,
	        assoc: assoc,
	        assocPath: assocPath,
	        binary: binary,
	        bind: bind,
	        both: both,
	        call: call,
	        chain: chain,
	        clamp: clamp,
	        clone: clone,
	        comparator: comparator,
	        complement: complement,
	        compose: compose,
	        composeK: composeK,
	        composeP: composeP,
	        concat: concat,
	        cond: cond,
	        construct: construct,
	        constructN: constructN,
	        contains: contains,
	        converge: converge,
	        countBy: countBy,
	        curry: curry,
	        curryN: curryN,
	        dec: dec,
	        defaultTo: defaultTo,
	        difference: difference,
	        differenceWith: differenceWith,
	        dissoc: dissoc,
	        dissocPath: dissocPath,
	        divide: divide,
	        drop: drop,
	        dropLast: dropLast,
	        dropLastWhile: dropLastWhile,
	        dropRepeats: dropRepeats,
	        dropRepeatsWith: dropRepeatsWith,
	        dropWhile: dropWhile,
	        either: either,
	        empty: empty,
	        eqBy: eqBy,
	        eqProps: eqProps,
	        equals: equals,
	        evolve: evolve,
	        filter: filter,
	        find: find,
	        findIndex: findIndex,
	        findLast: findLast,
	        findLastIndex: findLastIndex,
	        flatten: flatten,
	        flip: flip,
	        forEach: forEach,
	        fromPairs: fromPairs,
	        groupBy: groupBy,
	        groupWith: groupWith,
	        gt: gt,
	        gte: gte,
	        has: has,
	        hasIn: hasIn,
	        head: head,
	        identical: identical,
	        identity: identity,
	        ifElse: ifElse,
	        inc: inc,
	        indexBy: indexBy,
	        indexOf: indexOf,
	        init: init,
	        insert: insert,
	        insertAll: insertAll,
	        intersection: intersection,
	        intersectionWith: intersectionWith,
	        intersperse: intersperse,
	        into: into,
	        invert: invert,
	        invertObj: invertObj,
	        invoker: invoker,
	        is: is,
	        isArrayLike: isArrayLike,
	        isEmpty: isEmpty,
	        isNil: isNil,
	        join: join,
	        juxt: juxt,
	        keys: keys,
	        keysIn: keysIn,
	        last: last,
	        lastIndexOf: lastIndexOf,
	        length: length,
	        lens: lens,
	        lensIndex: lensIndex,
	        lensPath: lensPath,
	        lensProp: lensProp,
	        lift: lift,
	        liftN: liftN,
	        lt: lt,
	        lte: lte,
	        map: map,
	        mapAccum: mapAccum,
	        mapAccumRight: mapAccumRight,
	        mapObjIndexed: mapObjIndexed,
	        match: match,
	        mathMod: mathMod,
	        max: max,
	        maxBy: maxBy,
	        mean: mean,
	        median: median,
	        memoize: memoize,
	        merge: merge,
	        mergeAll: mergeAll,
	        mergeWith: mergeWith,
	        mergeWithKey: mergeWithKey,
	        min: min,
	        minBy: minBy,
	        modulo: modulo,
	        multiply: multiply,
	        nAry: nAry,
	        negate: negate,
	        none: none,
	        not: not,
	        nth: nth,
	        nthArg: nthArg,
	        objOf: objOf,
	        of: of,
	        omit: omit,
	        once: once,
	        or: or,
	        over: over,
	        pair: pair,
	        partial: partial,
	        partialRight: partialRight,
	        partition: partition,
	        path: path,
	        pathEq: pathEq,
	        pathOr: pathOr,
	        pathSatisfies: pathSatisfies,
	        pick: pick,
	        pickAll: pickAll,
	        pickBy: pickBy,
	        pipe: pipe,
	        pipeK: pipeK,
	        pipeP: pipeP,
	        pluck: pluck,
	        prepend: prepend,
	        product: product,
	        project: project,
	        prop: prop,
	        propEq: propEq,
	        propIs: propIs,
	        propOr: propOr,
	        propSatisfies: propSatisfies,
	        props: props,
	        range: range,
	        reduce: reduce,
	        reduceBy: reduceBy,
	        reduceRight: reduceRight,
	        reduceWhile: reduceWhile,
	        reduced: reduced,
	        reject: reject,
	        remove: remove,
	        repeat: repeat,
	        replace: replace,
	        reverse: reverse,
	        scan: scan,
	        sequence: sequence,
	        set: set,
	        slice: slice,
	        sort: sort,
	        sortBy: sortBy,
	        split: split,
	        splitAt: splitAt,
	        splitEvery: splitEvery,
	        splitWhen: splitWhen,
	        subtract: subtract,
	        sum: sum,
	        symmetricDifference: symmetricDifference,
	        symmetricDifferenceWith: symmetricDifferenceWith,
	        tail: tail,
	        take: take,
	        takeLast: takeLast,
	        takeLastWhile: takeLastWhile,
	        takeWhile: takeWhile,
	        tap: tap,
	        test: test,
	        times: times,
	        toLower: toLower,
	        toPairs: toPairs,
	        toPairsIn: toPairsIn,
	        toString: toString,
	        toUpper: toUpper,
	        transduce: transduce,
	        transpose: transpose,
	        traverse: traverse,
	        trim: trim,
	        tryCatch: tryCatch,
	        type: type,
	        unapply: unapply,
	        unary: unary,
	        uncurryN: uncurryN,
	        unfold: unfold,
	        union: union,
	        unionWith: unionWith,
	        uniq: uniq,
	        uniqBy: uniqBy,
	        uniqWith: uniqWith,
	        unless: unless,
	        unnest: unnest,
	        until: until,
	        update: update,
	        useWith: useWith,
	        values: values,
	        valuesIn: valuesIn,
	        view: view,
	        when: when,
	        where: where,
	        whereEq: whereEq,
	        without: without,
	        wrap: wrap,
	        xprod: xprod,
	        zip: zip,
	        zipObj: zipObj,
	        zipWith: zipWith
	    };
	  /* eslint-env amd */

	  /* TEST_ENTRY_POINT */

	  if (true) {
	    module.exports = R;
	  } else if (typeof define === 'function' && define.amd) {
	    define(function() { return R; });
	  } else {
	    this.R = R;
	  }

	}.call(this));


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = selectorParser;

	var _browserSplit = __webpack_require__(37);

	var _browserSplit2 = _interopRequireDefault(_browserSplit);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	function selectorParser() {
	  var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  var tagName = void 0;
	  var id = '';
	  var classes = [];

	  var tagParts = (0, _browserSplit2.default)(selector, classIdSplit);

	  if (notClassId.test(tagParts[1]) || selector === '') {
	    tagName = 'div';
	  }

	  var part = void 0;
	  var type = void 0;
	  var i = void 0;

	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];

	    if (!part) {
	      continue;
	    }

	    type = part.charAt(0);

	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#') {
	      id = part.substring(1, part.length);
	    }
	  }

	  return {
	    tagName: tagName,
	    id: id,
	    className: classes.join(' ')
	  };
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	
	// https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js

	var split = __webpack_require__(37);

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	module.exports = function parseSelector(selector, upper) {
	  selector = selector || '';
	  var tagName;
	  var id = '';
	  var classes = [];

	  var tagParts = split(selector, classIdSplit);

	  if (notClassId.test(tagParts[1]) || selector === '') {
	    tagName = 'div';
	  }

	  var part, type, i;

	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];

	    if (!part) {
	      continue;
	    }

	    type = part.charAt(0);

	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#') {
	      id = part.substring(1, part.length);
	    }
	  }

	  return {
	    tagName: upper === true ? tagName.toUpperCase() : tagName,
	    id: id,
	    className: classes.join(' ')
	  };
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";
	function logToConsoleError(err) {
	    var target = err.stack || err;
	    if (console && console.error) {
	        console.error(target);
	    }
	    else if (console && console.log) {
	        console.log(target);
	    }
	}
	function makeSinkProxies(drivers, streamAdapter) {
	    var sinkProxies = {};
	    for (var name_1 in drivers) {
	        if (drivers.hasOwnProperty(name_1)) {
	            var subject = streamAdapter.makeSubject();
	            var driverStreamAdapter = drivers[name_1].streamAdapter || streamAdapter;
	            var stream = driverStreamAdapter.adapt(subject.stream, streamAdapter.streamSubscribe);
	            sinkProxies[name_1] = {
	                stream: stream,
	                observer: subject.observer,
	            };
	        }
	    }
	    return sinkProxies;
	}
	function callDrivers(drivers, sinkProxies, streamAdapter) {
	    var sources = {};
	    for (var name_2 in drivers) {
	        if (drivers.hasOwnProperty(name_2)) {
	            var driverOutput = drivers[name_2](sinkProxies[name_2].stream, streamAdapter, name_2);
	            var driverStreamAdapter = drivers[name_2].streamAdapter;
	            if (driverStreamAdapter && driverStreamAdapter.isValidStream(driverOutput)) {
	                sources[name_2] = streamAdapter.adapt(driverOutput, driverStreamAdapter.streamSubscribe);
	            }
	            else {
	                sources[name_2] = driverOutput;
	            }
	            if (sources[name_2] && typeof sources[name_2] === 'object') {
	                sources[name_2]._isCycleSource = name_2;
	            }
	        }
	    }
	    return sources;
	}
	function replicateMany(sinks, sinkProxies, streamAdapter) {
	    var sinkNames = Object.keys(sinks).filter(function (name) { return !!sinkProxies[name]; });
	    var buffers = {};
	    var replicators = {};
	    sinkNames.forEach(function (name) {
	        buffers[name] = { next: [], error: [], complete: [] };
	        replicators[name] = {
	            next: function (x) { return buffers[name].next.push(x); },
	            error: function (x) { return buffers[name].error.push(x); },
	            complete: function (x) { return buffers[name].complete.push(x); },
	        };
	    });
	    var subscriptions = sinkNames.map(function (name) {
	        return streamAdapter.streamSubscribe(sinks[name], {
	            next: function (x) {
	                replicators[name].next(x);
	            },
	            error: function (err) {
	                logToConsoleError(err);
	                replicators[name].error(err);
	            },
	            complete: function (x) {
	                replicators[name].complete(x);
	            },
	        });
	    });
	    var disposeFunctions = subscriptions
	        .filter(function (fn) { return typeof fn === 'function'; });
	    sinkNames.forEach(function (name) {
	        var observer = sinkProxies[name].observer;
	        var next = observer.next;
	        var error = observer.error;
	        var complete = observer.complete;
	        buffers[name].next.forEach(next);
	        buffers[name].error.forEach(error);
	        buffers[name].complete.forEach(complete);
	        replicators[name].next = next;
	        replicators[name].error = error;
	        replicators[name].complete = complete;
	    });
	    return function () {
	        disposeFunctions.forEach(function (dispose) { return dispose(); });
	    };
	}
	function disposeSources(sources) {
	    for (var k in sources) {
	        if (sources.hasOwnProperty(k) && sources[k]
	            && typeof sources[k].dispose === 'function') {
	            sources[k].dispose();
	        }
	    }
	}
	var isObjectEmpty = function (obj) { return Object.keys(obj).length === 0; };
	function Cycle(main, drivers, options) {
	    if (typeof main !== "function") {
	        throw new Error("First argument given to Cycle must be the 'main' " +
	            "function.");
	    }
	    if (typeof drivers !== "object" || drivers === null) {
	        throw new Error("Second argument given to Cycle must be an object " +
	            "with driver functions as properties.");
	    }
	    if (isObjectEmpty(drivers)) {
	        throw new Error("Second argument given to Cycle must be an object " +
	            "with at least one driver function declared as a property.");
	    }
	    var streamAdapter = options.streamAdapter;
	    if (!streamAdapter || isObjectEmpty(streamAdapter)) {
	        throw new Error("Third argument given to Cycle must be an options object " +
	            "with the streamAdapter key supplied with a valid stream adapter.");
	    }
	    var sinkProxies = makeSinkProxies(drivers, streamAdapter);
	    var sources = callDrivers(drivers, sinkProxies, streamAdapter);
	    var sinks = main(sources);
	    if (typeof window !== 'undefined') {
	        window.Cyclejs = { sinks: sinks };
	    }
	    var run = function () {
	        var disposeReplication = replicateMany(sinks, sinkProxies, streamAdapter);
	        return function () {
	            disposeSources(sources);
	            disposeReplication();
	        };
	    };
	    return { sinks: sinks, sources: sources, run: run };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ScopeChecker_1 = __webpack_require__(33);
	var utils_1 = __webpack_require__(10);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(30);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	function toElArray(input) {
	    return Array.prototype.slice.call(input);
	}
	var ElementFinder = (function () {
	    function ElementFinder(namespace, isolateModule) {
	        this.namespace = namespace;
	        this.isolateModule = isolateModule;
	    }
	    ElementFinder.prototype.call = function (rootElement) {
	        var namespace = this.namespace;
	        if (namespace.join("") === "") {
	            return rootElement;
	        }
	        var scope = utils_1.getScope(namespace);
	        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
	        var selector = utils_1.getSelectors(namespace);
	        var topNode = rootElement;
	        var topNodeMatches = [];
	        if (scope.length > 0) {
	            topNode = this.isolateModule.getIsolatedElement(scope) || rootElement;
	            if (selector && matchesSelector(topNode, selector)) {
	                topNodeMatches.push(topNode);
	            }
	        }
	        return toElArray(topNode.querySelectorAll(selector))
	            .filter(scopeChecker.isStrictlyInRootScope, scopeChecker)
	            .concat(topNodeMatches);
	    };
	    return ElementFinder;
	}());
	exports.ElementFinder = ElementFinder;
	//# sourceMappingURL=ElementFinder.js.map

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ScopeChecker_1 = __webpack_require__(33);
	var utils_1 = __webpack_require__(10);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(30);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	var gDestinationId = 0;
	function findDestinationId(arr, searchId) {
	    var minIndex = 0;
	    var maxIndex = arr.length - 1;
	    var currentIndex;
	    var currentElement;
	    while (minIndex <= maxIndex) {
	        currentIndex = (minIndex + maxIndex) / 2 | 0;
	        currentElement = arr[currentIndex];
	        var currentId = currentElement.destinationId;
	        if (currentId < searchId) {
	            minIndex = currentIndex + 1;
	        }
	        else if (currentId > searchId) {
	            maxIndex = currentIndex - 1;
	        }
	        else {
	            return currentIndex;
	        }
	    }
	    return -1;
	}
	/**
	 * Attaches an actual event listener to the DOM root element,
	 * handles "destinations" (interested DOMSource output subjects), and bubbling.
	 */
	var EventDelegator = (function () {
	    function EventDelegator(topElement, eventType, useCapture, isolateModule) {
	        var _this = this;
	        this.topElement = topElement;
	        this.eventType = eventType;
	        this.useCapture = useCapture;
	        this.isolateModule = isolateModule;
	        this.destinations = [];
	        this.roof = topElement.parentElement;
	        if (useCapture) {
	            this.domListener = function (ev) { return _this.capture(ev); };
	        }
	        else {
	            this.domListener = function (ev) { return _this.bubble(ev); };
	        }
	        topElement.addEventListener(eventType, this.domListener, useCapture);
	    }
	    EventDelegator.prototype.bubble = function (rawEvent) {
	        if (!document.body.contains(rawEvent.currentTarget)) {
	            return;
	        }
	        var ev = this.patchEvent(rawEvent);
	        for (var el = ev.target; el && el !== this.roof; el = el.parentElement) {
	            if (!document.body.contains(el)) {
	                ev.stopPropagation();
	            }
	            if (ev.propagationHasBeenStopped) {
	                return;
	            }
	            this.matchEventAgainstDestinations(el, ev);
	        }
	    };
	    EventDelegator.prototype.matchEventAgainstDestinations = function (el, ev) {
	        for (var i = 0, n = this.destinations.length; i < n; i++) {
	            var dest = this.destinations[i];
	            if (!dest.scopeChecker.isStrictlyInRootScope(el)) {
	                continue;
	            }
	            if (matchesSelector(el, dest.selector)) {
	                this.mutateEventCurrentTarget(ev, el);
	                dest.subject._n(ev);
	            }
	        }
	    };
	    EventDelegator.prototype.capture = function (ev) {
	        for (var i = 0, n = this.destinations.length; i < n; i++) {
	            var dest = this.destinations[i];
	            if (matchesSelector(ev.target, dest.selector)) {
	                dest.subject._n(ev);
	            }
	        }
	    };
	    EventDelegator.prototype.addDestination = function (subject, namespace, destinationId) {
	        var scope = utils_1.getScope(namespace);
	        var selector = utils_1.getSelectors(namespace);
	        var scopeChecker = new ScopeChecker_1.ScopeChecker(scope, this.isolateModule);
	        this.destinations.push({ subject: subject, scopeChecker: scopeChecker, selector: selector, destinationId: destinationId });
	    };
	    EventDelegator.prototype.createDestinationId = function () {
	        return gDestinationId++;
	    };
	    EventDelegator.prototype.removeDestinationId = function (destinationId) {
	        var i = findDestinationId(this.destinations, destinationId);
	        if (i >= 0) {
	            this.destinations.splice(i, 1);
	        }
	    };
	    EventDelegator.prototype.patchEvent = function (event) {
	        var pEvent = event;
	        pEvent.propagationHasBeenStopped = false;
	        var oldStopPropagation = pEvent.stopPropagation;
	        pEvent.stopPropagation = function stopPropagation() {
	            oldStopPropagation.call(this);
	            this.propagationHasBeenStopped = true;
	        };
	        return pEvent;
	    };
	    EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
	        try {
	            Object.defineProperty(event, "currentTarget", {
	                value: currentTargetElement,
	                configurable: true,
	            });
	        }
	        catch (err) {
	            console.log("please use event.ownerTarget");
	        }
	        event.ownerTarget = currentTargetElement;
	    };
	    EventDelegator.prototype.updateTopElement = function (newTopElement) {
	        this.topElement.removeEventListener(this.eventType, this.domListener, this.useCapture);
	        newTopElement.addEventListener(this.eventType, this.domListener, this.useCapture);
	        this.topElement = newTopElement;
	    };
	    return EventDelegator;
	}());
	exports.EventDelegator = EventDelegator;
	//# sourceMappingURL=EventDelegator.js.map

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(1);
	var xstream_adapter_1 = __webpack_require__(4);
	var HTMLSource = (function () {
	    function HTMLSource(html$, runSA) {
	        this.runSA = runSA;
	        this._html$ = html$;
	        this._empty$ = runSA.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	    }
	    HTMLSource.prototype.elements = function () {
	        return this.runSA.adapt(this._html$, xstream_adapter_1.default.streamSubscribe);
	    };
	    HTMLSource.prototype.select = function (selector) {
	        return new HTMLSource(xstream_1.default.empty(), this.runSA);
	    };
	    HTMLSource.prototype.events = function (eventType, options) {
	        return this._empty$;
	    };
	    return HTMLSource;
	}());
	exports.HTMLSource = HTMLSource;
	//# sourceMappingURL=HTMLSource.js.map

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var xstream_1 = __webpack_require__(1);
	var ElementFinder_1 = __webpack_require__(55);
	var fromEvent_1 = __webpack_require__(60);
	var isolate_1 = __webpack_require__(62);
	var EventDelegator_1 = __webpack_require__(56);
	var utils_1 = __webpack_require__(10);
	var matchesSelector;
	try {
	    matchesSelector = __webpack_require__(30);
	}
	catch (e) {
	    matchesSelector = Function.prototype;
	}
	var eventTypesThatDontBubble = [
	    "blur",
	    "canplay",
	    "canplaythrough",
	    "change",
	    "durationchange",
	    "emptied",
	    "ended",
	    "focus",
	    "load",
	    "loadeddata",
	    "loadedmetadata",
	    "mouseenter",
	    "mouseleave",
	    "pause",
	    "play",
	    "playing",
	    "ratechange",
	    "reset",
	    "scroll",
	    "seeked",
	    "seeking",
	    "stalled",
	    "submit",
	    "suspend",
	    "timeupdate",
	    "unload",
	    "volumechange",
	    "waiting",
	];
	function determineUseCapture(eventType, options) {
	    var result = false;
	    if (typeof options.useCapture === "boolean") {
	        result = options.useCapture;
	    }
	    if (eventTypesThatDontBubble.indexOf(eventType) !== -1) {
	        result = true;
	    }
	    return result;
	}
	var MainDOMSource = (function () {
	    function MainDOMSource(_rootElement$, _runStreamAdapter, _namespace, _isolateModule, _delegators) {
	        if (_namespace === void 0) { _namespace = []; }
	        this._rootElement$ = _rootElement$;
	        this._runStreamAdapter = _runStreamAdapter;
	        this._namespace = _namespace;
	        this._isolateModule = _isolateModule;
	        this._delegators = _delegators;
	        this.isolateSource = isolate_1.isolateSource;
	        this.isolateSink = isolate_1.isolateSink;
	    }
	    MainDOMSource.prototype.elements = function () {
	        var output$;
	        if (this._namespace.length === 0) {
	            output$ = this._rootElement$;
	        }
	        else {
	            var elementFinder_1 = new ElementFinder_1.ElementFinder(this._namespace, this._isolateModule);
	            output$ = this._rootElement$.map(function (el) { return elementFinder_1.call(el); });
	        }
	        var runSA = this._runStreamAdapter;
	        return runSA.remember(runSA.adapt(output$, xstream_adapter_1.default.streamSubscribe));
	    };
	    Object.defineProperty(MainDOMSource.prototype, "namespace", {
	        get: function () {
	            return this._namespace;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MainDOMSource.prototype.select = function (selector) {
	        if (typeof selector !== 'string') {
	            throw new Error("DOM driver's select() expects the argument to be a " +
	                "string as a CSS selector");
	        }
	        var trimmedSelector = selector.trim();
	        var childNamespace = trimmedSelector === ":root" ?
	            this._namespace :
	            this._namespace.concat(trimmedSelector);
	        return new MainDOMSource(this._rootElement$, this._runStreamAdapter, childNamespace, this._isolateModule, this._delegators);
	    };
	    MainDOMSource.prototype.events = function (eventType, options) {
	        if (options === void 0) { options = {}; }
	        if (typeof eventType !== "string") {
	            throw new Error("DOM driver's events() expects argument to be a " +
	                "string representing the event type to listen for.");
	        }
	        var useCapture = determineUseCapture(eventType, options);
	        var namespace = this._namespace;
	        var scope = utils_1.getScope(namespace);
	        var keyParts = [eventType, useCapture];
	        if (scope) {
	            keyParts.push(scope);
	        }
	        var key = keyParts.join('~');
	        var domSource = this;
	        var rootElement$;
	        if (scope) {
	            var hadIsolated_mutable_1 = false;
	            rootElement$ = this._rootElement$
	                .filter(function (rootElement) {
	                var hasIsolated = !!domSource._isolateModule.getIsolatedElement(scope);
	                var shouldPass = hasIsolated && !hadIsolated_mutable_1;
	                hadIsolated_mutable_1 = hasIsolated;
	                return shouldPass;
	            });
	        }
	        else {
	            rootElement$ = this._rootElement$.take(2);
	        }
	        var event$ = rootElement$
	            .map(function setupEventDelegatorOnTopElement(rootElement) {
	            // Event listener just for the root element
	            if (!namespace || namespace.length === 0) {
	                return fromEvent_1.fromEvent(rootElement, eventType, useCapture);
	            }
	            // Event listener on the top element as an EventDelegator
	            var delegators = domSource._delegators;
	            var top = scope
	                ? domSource._isolateModule.getIsolatedElement(scope)
	                : rootElement;
	            var delegator;
	            if (delegators.has(key)) {
	                delegator = delegators.get(key);
	                delegator.updateTopElement(top);
	            }
	            else {
	                delegator = new EventDelegator_1.EventDelegator(top, eventType, useCapture, domSource._isolateModule);
	                delegators.set(key, delegator);
	            }
	            if (scope) {
	                domSource._isolateModule.addEventDelegator(scope, delegator);
	            }
	            var destinationId = delegator.createDestinationId();
	            var subject = xstream_1.default.create({
	                start: function () { },
	                stop: function () {
	                    if ('requestIdleCallback' in window) {
	                        requestIdleCallback(function () {
	                            delegator.removeDestinationId(destinationId);
	                        });
	                    }
	                    else {
	                        delegator.removeDestinationId(destinationId);
	                    }
	                }
	            });
	            delegator.addDestination(subject, namespace, destinationId);
	            return subject;
	        })
	            .flatten();
	        return this._runStreamAdapter.adapt(event$, xstream_adapter_1.default.streamSubscribe);
	    };
	    MainDOMSource.prototype.dispose = function () {
	        this._isolateModule.reset();
	    };
	    return MainDOMSource;
	}());
	exports.MainDOMSource = MainDOMSource;
	//# sourceMappingURL=MainDOMSource.js.map

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hyperscript_1 = __webpack_require__(20);
	var classNameFromVNode_1 = __webpack_require__(157);
	var selectorParser_1 = __webpack_require__(52);
	var VNodeWrapper = (function () {
	    function VNodeWrapper(rootElement) {
	        this.rootElement = rootElement;
	    }
	    VNodeWrapper.prototype.call = function (vnode) {
	        var _a = selectorParser_1.default(vnode.sel), selectorTagName = _a.tagName, selectorId = _a.id;
	        var vNodeClassName = classNameFromVNode_1.default(vnode);
	        var vNodeData = vnode.data || {};
	        var vNodeDataProps = vNodeData.props || {};
	        var _b = vNodeDataProps.id, vNodeId = _b === void 0 ? selectorId : _b;
	        var isVNodeAndRootElementIdentical = vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() &&
	            selectorTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() &&
	            vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
	        if (isVNodeAndRootElementIdentical) {
	            return vnode;
	        }
	        var _c = this.rootElement, tagName = _c.tagName, id = _c.id, className = _c.className;
	        var elementId = id ? "#" + id : "";
	        var elementClassName = className ?
	            "." + className.split(" ").join(".") : "";
	        return hyperscript_1.h("" + tagName + elementId + elementClassName, {}, [vnode]);
	    };
	    return VNodeWrapper;
	}());
	exports.VNodeWrapper = VNodeWrapper;
	//# sourceMappingURL=VNodeWrapper.js.map

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_1 = __webpack_require__(1);
	function fromEvent(element, eventName, useCapture) {
	    if (useCapture === void 0) { useCapture = false; }
	    return xstream_1.Stream.create({
	        element: element,
	        next: null,
	        start: function start(listener) {
	            this.next = function next(event) { listener.next(event); };
	            this.element.addEventListener(eventName, this.next, useCapture);
	        },
	        stop: function stop() {
	            this.element.removeEventListener(eventName, this.next, useCapture);
	        }
	    });
	}
	exports.fromEvent = fromEvent;
	//# sourceMappingURL=fromEvent.js.map

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var hyperscript_1 = __webpack_require__(20);
	function isValidString(param) {
	    return typeof param === 'string' && param.length > 0;
	}
	function isSelector(param) {
	    return isValidString(param) && (param[0] === '.' || param[0] === '#');
	}
	function createTagFunction(tagName) {
	    return function hyperscript(first, b, c) {
	        if (isSelector(first)) {
	            if (typeof b !== 'undefined' && typeof c !== 'undefined') {
	                return hyperscript_1.h(tagName + first, b, c);
	            }
	            else if (typeof b !== 'undefined') {
	                return hyperscript_1.h(tagName + first, b);
	            }
	            else {
	                return hyperscript_1.h(tagName + first, {});
	            }
	        }
	        else if (!!b) {
	            return hyperscript_1.h(tagName, first, b);
	        }
	        else if (!!first) {
	            return hyperscript_1.h(tagName, first);
	        }
	        else {
	            return hyperscript_1.h(tagName, {});
	        }
	    };
	}
	var SVG_TAG_NAMES = [
	    'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
	    'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile',
	    'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
	    'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
	    'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
	    'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
	    'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
	    'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace',
	    'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri',
	    'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
	    'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath',
	    'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script',
	    'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title',
	    'tref', 'tspan', 'use', 'view', 'vkern'
	];
	var svg = createTagFunction('svg');
	SVG_TAG_NAMES.forEach(function (tag) {
	    svg[tag] = createTagFunction(tag);
	});
	var TAG_NAMES = [
	    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
	    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
	    'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
	    'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
	    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
	    'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
	    'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
	    'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q',
	    'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
	    'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td',
	    'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video'
	];
	var exported = { SVG_TAG_NAMES: SVG_TAG_NAMES, TAG_NAMES: TAG_NAMES, svg: svg, isSelector: isSelector, createTagFunction: createTagFunction };
	TAG_NAMES.forEach(function (n) {
	    exported[n] = createTagFunction(n);
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = exported;
	//# sourceMappingURL=hyperscript-helpers.js.map

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(10);
	function isolateSource(source, scope) {
	    return source.select(utils_1.SCOPE_PREFIX + scope);
	}
	exports.isolateSource = isolateSource;
	function isolateSink(sink, scope) {
	    return sink.map(function (vTree) {
	        if (vTree.data.isolate) {
	            var existingScope = parseInt(vTree.data.isolate.split(utils_1.SCOPE_PREFIX + 'cycle')[1]);
	            var _scope = parseInt(scope.split('cycle')[1]);
	            if (isNaN(existingScope) || isNaN(_scope) || existingScope > _scope) {
	                return vTree;
	            }
	        }
	        vTree.data.isolate = utils_1.SCOPE_PREFIX + scope;
	        if (typeof vTree.key === 'undefined') {
	            vTree.key = utils_1.SCOPE_PREFIX + scope;
	        }
	        return vTree;
	    });
	}
	exports.isolateSink = isolateSink;
	//# sourceMappingURL=isolate.js.map

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MapPolyfill = __webpack_require__(43);
	var IsolateModule = (function () {
	    function IsolateModule(isolatedElements) {
	        this.isolatedElements = isolatedElements;
	        this.eventDelegators = new MapPolyfill();
	    }
	    IsolateModule.prototype.setScope = function (elm, scope) {
	        this.isolatedElements.set(scope, elm);
	    };
	    IsolateModule.prototype.removeScope = function (scope) {
	        this.isolatedElements.delete(scope);
	    };
	    IsolateModule.prototype.getIsolatedElement = function (scope) {
	        return this.isolatedElements.get(scope);
	    };
	    IsolateModule.prototype.isIsolatedElement = function (elm) {
	        var iterator = this.isolatedElements.entries();
	        var hasNext = true;
	        while (hasNext) {
	            try {
	                var result = iterator.next();
	                var _a = result.value, scope = _a[0], element = _a[1];
	                if (elm === element) {
	                    return scope;
	                }
	            }
	            catch (err) {
	                hasNext = false;
	            }
	        }
	        return false;
	    };
	    IsolateModule.prototype.addEventDelegator = function (scope, eventDelegator) {
	        var delegators = this.eventDelegators.get(scope);
	        if (!delegators) {
	            delegators = [];
	            this.eventDelegators.set(scope, delegators);
	        }
	        delegators[delegators.length] = eventDelegator;
	    };
	    IsolateModule.prototype.reset = function () {
	        this.isolatedElements.clear();
	    };
	    IsolateModule.prototype.createModule = function () {
	        var self = this;
	        return {
	            create: function (oldVNode, vNode) {
	                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
	                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
	                var oldScope = oldData.isolate || "";
	                var scope = data.isolate || "";
	                if (scope) {
	                    if (oldScope) {
	                        self.removeScope(oldScope);
	                    }
	                    self.setScope(elm, scope);
	                    var delegators = self.eventDelegators.get(scope);
	                    if (delegators) {
	                        for (var i = 0, len = delegators.length; i < len; ++i) {
	                            delegators[i].updateTopElement(elm);
	                        }
	                    }
	                    else if (delegators === void 0) {
	                        self.eventDelegators.set(scope, []);
	                    }
	                }
	                if (oldScope && !scope) {
	                    self.removeScope(scope);
	                }
	            },
	            update: function (oldVNode, vNode) {
	                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
	                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
	                var oldScope = oldData.isolate || "";
	                var scope = data.isolate || "";
	                if (scope && scope !== oldScope) {
	                    if (oldScope) {
	                        self.removeScope(oldScope);
	                    }
	                    self.setScope(elm, scope);
	                }
	                if (oldScope && !scope) {
	                    self.removeScope(scope);
	                }
	            },
	            remove: function (_a, cb) {
	                var data = _a.data;
	                data = data || {};
	                var scope = data.isolate;
	                if (scope) {
	                    self.removeScope(scope);
	                    if (self.eventDelegators.get(scope)) {
	                        self.eventDelegators.set(scope, []);
	                    }
	                }
	                cb();
	            },
	            destroy: function (_a) {
	                var data = _a.data;
	                data = data || {};
	                var scope = data.isolate;
	                if (scope) {
	                    self.removeScope(scope);
	                    if (self.eventDelegators.get(scope)) {
	                        self.eventDelegators.set(scope, []);
	                    }
	                }
	            }
	        };
	    };
	    return IsolateModule;
	}());
	exports.IsolateModule = IsolateModule;
	//# sourceMappingURL=isolateModule.js.map

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var snabbdom_1 = __webpack_require__(172);
	var xstream_1 = __webpack_require__(1);
	var MainDOMSource_1 = __webpack_require__(58);
	var VNodeWrapper_1 = __webpack_require__(59);
	var utils_1 = __webpack_require__(10);
	var modules_1 = __webpack_require__(67);
	var isolateModule_1 = __webpack_require__(63);
	var transposition_1 = __webpack_require__(34);
	var xstream_adapter_1 = __webpack_require__(4);
	var MapPolyfill = __webpack_require__(43);
	function makeDOMDriverInputGuard(modules) {
	    if (!Array.isArray(modules)) {
	        throw new Error("Optional modules option must be " +
	            "an array for snabbdom modules");
	    }
	}
	function domDriverInputGuard(view$) {
	    if (!view$
	        || typeof view$.addListener !== "function"
	        || typeof view$.fold !== "function") {
	        throw new Error("The DOM driver function expects as input a Stream of " +
	            "virtual DOM elements");
	    }
	}
	function makeDOMDriver(container, options) {
	    if (!options) {
	        options = {};
	    }
	    var transposition = options.transposition || false;
	    var modules = options.modules || modules_1.default;
	    var isolateModule = new isolateModule_1.IsolateModule((new MapPolyfill()));
	    var patch = snabbdom_1.init([isolateModule.createModule()].concat(modules));
	    var rootElement = utils_1.getElement(container);
	    var vnodeWrapper = new VNodeWrapper_1.VNodeWrapper(rootElement);
	    var delegators = new MapPolyfill();
	    makeDOMDriverInputGuard(modules);
	    function DOMDriver(vnode$, runStreamAdapter) {
	        domDriverInputGuard(vnode$);
	        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
	        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
	        var rootElement$ = preprocessedVNode$
	            .map(function (vnode) { return vnodeWrapper.call(vnode); })
	            .fold(patch, rootElement)
	            .drop(1)
	            .map(function unwrapElementFromVNode(vnode) { return vnode.elm; })
	            .compose(function (stream) { return xstream_1.default.merge(stream, xstream_1.default.never()); }) // don't complete this stream
	            .startWith(rootElement);
	        /* tslint:disable:no-empty */
	        rootElement$.addListener({ next: function () { }, error: function () { }, complete: function () { } });
	        /* tslint:enable:no-empty */
	        return new MainDOMSource_1.MainDOMSource(rootElement$, runStreamAdapter, [], isolateModule, delegators);
	    }
	    ;
	    DOMDriver.streamAdapter = xstream_adapter_1.default;
	    return DOMDriver;
	}
	exports.makeDOMDriver = makeDOMDriver;
	//# sourceMappingURL=makeDOMDriver.js.map

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var transposition_1 = __webpack_require__(34);
	var HTMLSource_1 = __webpack_require__(57);
	var toHTML = __webpack_require__(159);
	/* tslint:disable:no-empty */
	var noop = function () { };
	/* tslint:enable:no-empty */
	function makeHTMLDriver(effect, options) {
	    if (!options) {
	        options = {};
	    }
	    var transposition = options.transposition || false;
	    function htmlDriver(vnode$, runStreamAdapter) {
	        var transposeVNode = transposition_1.makeTransposeVNode(runStreamAdapter);
	        var preprocessedVNode$ = (transposition ? vnode$.map(transposeVNode).flatten() : vnode$);
	        var html$ = preprocessedVNode$.map(toHTML);
	        html$.addListener({
	            next: effect || noop,
	            error: noop,
	            complete: noop,
	        });
	        return new HTMLSource_1.HTMLSource(html$, runStreamAdapter);
	    }
	    ;
	    htmlDriver.streamAdapter = xstream_adapter_1.default;
	    return htmlDriver;
	}
	exports.makeHTMLDriver = makeHTMLDriver;
	//# sourceMappingURL=makeHTMLDriver.js.map

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var xstream_adapter_1 = __webpack_require__(4);
	var xstream_1 = __webpack_require__(1);
	var SCOPE_PREFIX = '___';
	var MockedDOMSource = (function () {
	    function MockedDOMSource(_streamAdapter, _mockConfig) {
	        this._streamAdapter = _streamAdapter;
	        this._mockConfig = _mockConfig;
	        if (_mockConfig.elements) {
	            this._elements = _mockConfig.elements;
	        }
	        else {
	            this._elements = _streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	        }
	    }
	    MockedDOMSource.prototype.elements = function () {
	        return this._elements;
	    };
	    MockedDOMSource.prototype.events = function (eventType, options) {
	        var mockConfig = this._mockConfig;
	        var keys = Object.keys(mockConfig);
	        var keysLen = keys.length;
	        for (var i = 0; i < keysLen; i++) {
	            var key = keys[i];
	            if (key === eventType) {
	                return mockConfig[key];
	            }
	        }
	        return this._streamAdapter.adapt(xstream_1.default.empty(), xstream_adapter_1.default.streamSubscribe);
	    };
	    MockedDOMSource.prototype.select = function (selector) {
	        var mockConfig = this._mockConfig;
	        var keys = Object.keys(mockConfig);
	        var keysLen = keys.length;
	        for (var i = 0; i < keysLen; i++) {
	            var key = keys[i];
	            if (key === selector) {
	                return new MockedDOMSource(this._streamAdapter, mockConfig[key]);
	            }
	        }
	        return new MockedDOMSource(this._streamAdapter, {});
	    };
	    MockedDOMSource.prototype.isolateSource = function (source, scope) {
	        return source.select('.' + SCOPE_PREFIX + scope);
	    };
	    MockedDOMSource.prototype.isolateSink = function (sink, scope) {
	        return sink.map(function (vnode) {
	            if (vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
	                return vnode;
	            }
	            else {
	                vnode.sel += "." + SCOPE_PREFIX + scope;
	                return vnode;
	            }
	        });
	    };
	    return MockedDOMSource;
	}());
	exports.MockedDOMSource = MockedDOMSource;
	function mockDOMSource(streamAdapter, mockConfig) {
	    return new MockedDOMSource(streamAdapter, mockConfig);
	}
	exports.mockDOMSource = mockDOMSource;
	//# sourceMappingURL=mockDOMSource.js.map

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ClassModule = __webpack_require__(167);
	exports.ClassModule = ClassModule;
	var PropsModule = __webpack_require__(170);
	exports.PropsModule = PropsModule;
	var AttrsModule = __webpack_require__(166);
	exports.AttrsModule = AttrsModule;
	var EventsModule = __webpack_require__(168);
	exports.EventsModule = EventsModule;
	var StyleModule = __webpack_require__(171);
	exports.StyleModule = StyleModule;
	var HeroModule = __webpack_require__(169);
	exports.HeroModule = HeroModule;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = [StyleModule, ClassModule, PropsModule, AttrsModule];
	//# sourceMappingURL=modules.js.map

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";
	var clickEvent = 'undefined' !== typeof document && document.ontouchstart ?
	    'touchstart' : 'click';
	function which(ev) {
	    if (typeof window === 'undefined') {
	        return false;
	    }
	    var e = ev || window.event;
	    return e.which === null ? e.button : e.which;
	}
	function sameOrigin(href) {
	    if (typeof window === 'undefined') {
	        return false;
	    }
	    return href && href.indexOf(window.location.origin) === 0;
	}
	function makeClickListener(push) {
	    return function clickListener(event) {
	        if (which(event) !== 1) {
	            return;
	        }
	        if (event.metaKey || event.ctrlKey || event.shiftKey) {
	            return;
	        }
	        if (event.defaultPrevented) {
	            return;
	        }
	        var element = event.target;
	        while (element && element.nodeName !== 'A') {
	            element = element.parentNode;
	        }
	        if (!element || element.nodeName !== 'A') {
	            return;
	        }
	        if (element.hasAttribute('download') ||
	            element.getAttribute('rel') === 'external') {
	            return;
	        }
	        if (element.target) {
	            return;
	        }
	        var link = element.getAttribute('href');
	        if (link && link.indexOf('mailto:') > -1 || link.charAt(0) === '#') {
	            return;
	        }
	        if (!sameOrigin(element.href)) {
	            return;
	        }
	        event.preventDefault();
	        var pathname = element.pathname, search = element.search, _a = element.hash, hash = _a === void 0 ? '' : _a;
	        push(pathname + search + hash);
	    };
	}
	function captureClicks(push) {
	    var listener = makeClickListener(push);
	    if (typeof window !== 'undefined') {
	        document.addEventListener(clickEvent, listener, false);
	    }
	}
	exports.captureClicks = captureClicks;
	//# sourceMappingURL=captureClicks.js.map

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var captureClicks_1 = __webpack_require__(68);
	function makeUpdateHistory(history) {
	    return function updateHistory(location) {
	        if (typeof location === 'string') {
	            history.push(history.createLocation(location));
	        }
	        else if (typeof location === 'object') {
	            // suport things like history.replace()
	            var _a = location.type, type = _a === void 0 ? 'push' : _a;
	            if (type === 'go') {
	                history[type](location);
	            }
	            else {
	                history[type](location);
	            }
	        }
	        else {
	            throw new Error('History Driver input must be a string or an ' +
	                'object but received ${typeof url}');
	        }
	    };
	}
	function defaultOnErrorFn(err) {
	    if (console && console.error !== void 0) {
	        console.error(err);
	    }
	}
	function makeHistoryDriver(history, options) {
	    if (!history || typeof history !== 'object'
	        || typeof history.createLocation !== 'function'
	        || typeof history.createHref !== 'function'
	        || typeof history.listen !== 'function'
	        || typeof history.push !== 'function') {
	        throw new TypeError('makeHistoryDriver requires an valid history object ' +
	            'containing createLocation(), createHref(), push(), and listen() methods');
	    }
	    var capture = options && options.capture || false;
	    var onError = options && options.onError || defaultOnErrorFn;
	    return function historyDriver(sink$, runSA) {
	        var _a = runSA.makeSubject(), observer = _a.observer, stream = _a.stream;
	        var history$ = runSA.remember(stream
	            .startWith(history.getCurrentLocation())
	            .filter(Boolean));
	        var unlisten = history.listen(function (location) {
	            observer.next(location);
	        });
	        if (typeof history.addCompleteCallback === 'function'
	            && typeof history.complete === 'function') {
	            history.addCompleteCallback(function () {
	                observer.complete();
	            });
	        }
	        runSA.streamSubscribe(sink$, {
	            next: makeUpdateHistory(history),
	            error: onError,
	            complete: function () {
	                unlisten();
	                observer.complete();
	            },
	        });
	        if (capture) {
	            captureClicks_1.captureClicks(function (pathname) {
	                var location = history.createLocation(pathname);
	                history.push(location);
	            });
	        }
	        history$.createHref = function (href) { return history.createHref(href); };
	        history$.createLocation = function (location) { return history.createLocation(location); };
	        return history$;
	    };
	}
	exports.makeHistoryDriver = makeHistoryDriver;
	//# sourceMappingURL=makeHistoryDriver.js.map

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(36);
	var ServerHistory = (function () {
	    function ServerHistory(currentLocation) {
	        this.currentLocation = currentLocation;
	        this.listeners = [];
	    }
	    ServerHistory.prototype.listen = function (listener) {
	        this.listeners.push(listener);
	        return function noop() { return void 0; };
	    };
	    ServerHistory.prototype.push = function (location) {
	        var length = this.listeners.length;
	        if (length === 0) {
	            throw new Error('Must be given at least one listener before pushing');
	        }
	        for (var i = 0; i < length; ++i) {
	            this.listeners[i](util_1.createLocation(location));
	        }
	    };
	    ServerHistory.prototype.replace = function (location) {
	        this.push(location);
	    };
	    ServerHistory.prototype.createHref = function (path) {
	        return path;
	    };
	    ServerHistory.prototype.createLocation = function (location) {
	        return util_1.createLocation(location);
	    };
	    ServerHistory.prototype.getCurrentLocation = function () {
	        return this.currentLocation;
	    };
	    ServerHistory.prototype.addCompleteCallback = function (complete) {
	        this._completeCallback = complete;
	    };
	    ServerHistory.prototype.complete = function () {
	        this._completeCallback();
	    };
	    return ServerHistory;
	}());
	function createServerHistory(loc) {
	    return new ServerHistory(loc ? util_1.createLocation(loc) : null);
	}
	exports.createServerHistory = createServerHistory;
	//# sourceMappingURL=serverHistory.js.map

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var base_1 = __webpack_require__(54);
	var xstream_adapter_1 = __webpack_require__(4);
	/**
	 * Takes a `main` function and circularly connects it to the given collection
	 * of driver functions.
	 *
	 * **Example:**
	 * ```js
	 * import {run} from '@cycle/xstream-run';
	 * const dispose = run(main, drivers);
	 * // ...
	 * dispose();
	 * ```
	 *
	 * The `main` function expects a collection of "source" streams (returned from
	 * drivers) as input, and should return a collection of "sink" streams (to be
	 * given to drivers). A "collection of streams" is a JavaScript object where
	 * keys match the driver names registered by the `drivers` object, and values
	 * are the streams. Refer to the documentation of each driver to see more
	 * details on what types of sources it outputs and sinks it receives.
	 *
	 * @param {Function} main a function that takes `sources` as input and outputs
	 * `sinks`.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Function} a dispose function, used to terminate the execution of the
	 * Cycle.js program, cleaning up resources used.
	 * @function run
	 */
	function run(main, drivers) {
	    var _a = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default }), run = _a.run, sinks = _a.sinks;
	    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
	        window['CyclejsDevTool_startGraphSerializer'](sinks);
	    }
	    return run();
	}
	exports.run = run;
	/**
	 * A function that prepares the Cycle application to be executed. Takes a `main`
	 * function and prepares to circularly connects it to the given collection of
	 * driver functions. As an output, `Cycle()` returns an object with three
	 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
	 * the application actually execute. Refer to the documentation of `run()` for
	 * more details.
	 *
	 * **Example:**
	 * ```js
	 * import Cycle from '@cycle/xstream-run';
	 * const {sources, sinks, run} = Cycle(main, drivers);
	 * // ...
	 * const dispose = run(); // Executes the application
	 * // ...
	 * dispose();
	 * ```
	 *
	 * @param {Function} main a function that takes `sources` as input and outputs
	 * `sinks`.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Object} an object with three properties: `sources`, `sinks` and
	 * `run`. `sources` is the collection of driver sources, `sinks` is the
	 * collection of driver sinks, these can be used for debugging or testing. `run`
	 * is the function that once called will execute the application.
	 * @function Cycle
	 */
	var Cycle = function (main, drivers) {
	    var out = base_1.default(main, drivers, { streamAdapter: xstream_adapter_1.default });
	    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
	        window['CyclejsDevTool_startGraphSerializer'](out.sinks);
	    }
	    return out;
	};
	Cycle.run = run;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict'

	module.exports = ansiHTML

	// Reference to https://github.com/sindresorhus/ansi-regex
	var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

	var _defColors = {
	  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
	  black: '000',
	  red: 'ff0000',
	  green: '209805',
	  yellow: 'e8bf03',
	  blue: '0000ff',
	  magenta: 'ff00ff',
	  cyan: '00ffee',
	  lightgrey: 'f0f0f0',
	  darkgrey: '888'
	}
	var _styles = {
	  30: 'black',
	  31: 'red',
	  32: 'green',
	  33: 'yellow',
	  34: 'blue',
	  35: 'magenta',
	  36: 'cyan',
	  37: 'lightgrey'
	}
	var _openTags = {
	  '1': 'font-weight:bold', // bold
	  '2': 'opacity:0.8', // dim
	  '3': '<i>', // italic
	  '4': '<u>', // underscore
	  '8': 'display:none', // hidden
	  '9': '<del>' // delete
	}
	var _closeTags = {
	  '23': '</i>', // reset italic
	  '24': '</u>', // reset underscore
	  '29': '</del>' // reset delete
	}

	;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
	  _closeTags[n] = '</span>'
	})

	/**
	 * Converts text with ANSI color codes to HTML markup.
	 * @param {String} text
	 * @returns {*}
	 */
	function ansiHTML (text) {
	  // Returns the text if the string has no ANSI escape code.
	  if (!_regANSI.test(text)) {
	    return text
	  }

	  // Cache opened sequence.
	  var ansiCodes = []
	  // Replace with markup.
	  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
	    var ot = _openTags[seq]
	    if (ot) {
	      // If current sequence has been opened, close it.
	      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
	        ansiCodes.pop()
	        return '</span>'
	      }
	      // Open tag.
	      ansiCodes.push(seq)
	      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
	    }

	    var ct = _closeTags[seq]
	    if (ct) {
	      // Pop sequence
	      ansiCodes.pop()
	      return ct
	    }
	    return ''
	  })

	  // Make sure tags are closed.
	  var l = ansiCodes.length
	  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

	  return ret
	}

	/**
	 * Customize colors.
	 * @param {Object} colors reference to _defColors
	 */
	ansiHTML.setColors = function (colors) {
	  if (typeof colors !== 'object') {
	    throw new Error('`colors` parameter must be an Object.')
	  }

	  var _finalColors = {}
	  for (var key in _defColors) {
	    var hex = colors.hasOwnProperty(key) ? colors[key] : null
	    if (!hex) {
	      _finalColors[key] = _defColors[key]
	      continue
	    }
	    if ('reset' === key) {
	      if (typeof hex === 'string') {
	        hex = [hex]
	      }
	      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
	        return typeof h !== 'string'
	      })) {
	        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
	      }
	      var defHexColor = _defColors[key]
	      if (!hex[0]) {
	        hex[0] = defHexColor[0]
	      }
	      if (hex.length === 1 || !hex[1]) {
	        hex = [hex[0]]
	        hex.push(defHexColor[1])
	      }

	      hex = hex.slice(0, 2)
	    } else if (typeof hex !== 'string') {
	      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
	    }
	    _finalColors[key] = hex
	  }
	  _setTags(_finalColors)
	}

	/**
	 * Reset colors.
	 */
	ansiHTML.reset = function () {
	  _setTags(_defColors)
	}

	/**
	 * Expose tags, including open and close.
	 * @type {Object}
	 */
	ansiHTML.tags = {}

	if (Object.defineProperty) {
	  Object.defineProperty(ansiHTML.tags, 'open', {
	    get: function () { return _openTags }
	  })
	  Object.defineProperty(ansiHTML.tags, 'close', {
	    get: function () { return _closeTags }
	  })
	} else {
	  ansiHTML.tags.open = _openTags
	  ansiHTML.tags.close = _closeTags
	}

	function _setTags (colors) {
	  // reset all
	  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
	  // inverse
	  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
	  // dark grey
	  _openTags['90'] = 'color:#' + colors.darkgrey

	  for (var code in _styles) {
	    var color = _styles[code]
	    var oriColor = colors[color] || '000'
	    _openTags[code] = 'color:#' + oriColor
	    code = parseInt(code)
	    _openTags[(code + 10).toString()] = 'background:#' + oriColor
	  }
	}

	ansiHTML.reset()


/***/ },
/* 74 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _xstream = __webpack_require__(11);

	var _dropRepeats = __webpack_require__(187);

	var _dropRepeats2 = _interopRequireDefault(_dropRepeats);

	var _isolate = __webpack_require__(21);

	var _isolate2 = _interopRequireDefault(_isolate);

	var _dom = __webpack_require__(15);

	var _ramda = __webpack_require__(51);

	var _index = __webpack_require__(80);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if ((typeof module === "object" && module.hot) && !(typeof global === "object" && global.noCycleHmr)) module.hot.accept(function (err) {err && console.error(`Can not accept module: ` + err.message)});


	var equalPaths = (0, _ramda.eqProps)('path');
	var loading = (0, _dom.div)('.loading', 'Loading...');

	var callComponent = function callComponent(sources) {
	  return function (_ref) {
	    var path = _ref.path,
	        value = _ref.value;

	    var component = value(_extends({}, sources, { router: sources.router.path(path) }));
	    return _extends({}, component, {
	      DOM: component.DOM.startWith(loading)
	    });
	  };
	};

	function ComponentRouter(sources) {
	  (0, _index.requireSources)('ComponentRouter', sources, 'routes$');

	  var component$ = sources.routes$.map(function (routes) {
	    return sources.router.define(routes);
	  }).flatten().compose((0, _dropRepeats2.default)(equalPaths)) // dont render the same page twice in a row
	  .map(callComponent(sources)).remember();

	  return {
	    pluck: function pluck(key) {
	      return (0, _index.mergeFlatten)(key, [component$]);
	    },
	    DOM: (0, _index.mergeFlatten)('DOM', [component$]),
	    route$: (0, _index.mergeFlatten)('route$', [component$])
	  };
	}

	exports.default = (0, _xstream.hmrProxy)(function (sources) {
	  return (0, _isolate2.default)(ComponentRouter)(sources);
	}, ( true ? module.id : "") + '_app_component_ComponentRouter_index_default', {"modulePath":"app/component/ComponentRouter/index.js","exportName":"default"});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(120);

	var _xstreamRun = __webpack_require__(72);

	var _xstreamRun2 = _interopRequireDefault(_xstreamRun);

	var _dom = __webpack_require__(15);

	var _cyclicRouter = __webpack_require__(84);

	var _history = __webpack_require__(132);

	var _switchPath = __webpack_require__(176);

	var _switchPath2 = _interopRequireDefault(_switchPath);

	var _main = __webpack_require__(79);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// suppport more browsers
	// External imports
	var history = (0, _cyclicRouter.supportsHistory)() ? (0, _history.createHistory)() : (0, _history.createHashHistory)();

	// Local imports


	var drivers = {
	  DOM: (0, _dom.makeDOMDriver)('#app', { transposition: false }),
	  router: (0, _cyclicRouter.makeRouterDriver)(history, _switchPath2.default)
	};

	_xstreamRun2.default.run(_main2.default, drivers);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _xstream = __webpack_require__(11);

	var _xstream2 = __webpack_require__(1);

	var _xstream3 = _interopRequireDefault(_xstream2);

	var _delay = __webpack_require__(186);

	var _delay2 = _interopRequireDefault(_delay);

	var _isolate = __webpack_require__(21);

	var _isolate2 = _interopRequireDefault(_isolate);

	var _dom = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if ((typeof module === "object" && module.hot) && !(typeof global === "object" && global.noCycleHmr)) module.hot.accept(function (err) {err && console.error(`Can not accept module: ` + err.message)});


	function Landing(sources) {
	  var route$ = _xstream3.default.of('/login').compose((0, _delay2.default)(3000));

	  return {
	    DOM: _xstream3.default.of((0, _dom.div)({}, [(0, _dom.h1)('.welcome', 'Cycle.js Diversity XStream Boilerplate!')])),
	    route$: route$
	  };
	}

	exports.default = (0, _xstream.hmrProxy)(function (sources) {
	  return (0, _isolate2.default)(Landing)(sources);
	}, ( true ? module.id : "") + '_app_page_Landing_index_default', {"modulePath":"app/page/Landing/index.js","exportName":"default"});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _xstream = __webpack_require__(11);

	var _xstream2 = __webpack_require__(1);

	var _xstream3 = _interopRequireDefault(_xstream2);

	var _isolate = __webpack_require__(21);

	var _isolate2 = _interopRequireDefault(_isolate);

	var _dom = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if ((typeof module === "object" && module.hot) && !(typeof global === "object" && global.noCycleHmr)) module.hot.accept(function (err) {err && console.error(`Can not accept module: ` + err.message)});


	function Login(sources) {
	  return {
	    DOM: _xstream3.default.of((0, _dom.div)({}, [(0, _dom.h1)('.login', 'Login page test')]))
	  };
	}

	exports.default = (0, _xstream.hmrProxy)(function (sources) {
	  return (0, _isolate2.default)(Login)(sources);
	}, ( true ? module.id : "") + '_app_page_Login_index_default', {"modulePath":"app/page/Login/index.js","exportName":"default"});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _xstream = __webpack_require__(11);

	__webpack_require__(153);

	var _xstream2 = __webpack_require__(1);

	var _xstream3 = _interopRequireDefault(_xstream2);

	var _Landing = __webpack_require__(77);

	var _Landing2 = _interopRequireDefault(_Landing);

	var _Login = __webpack_require__(78);

	var _Login2 = _interopRequireDefault(_Login);

	var _ComponentRouter = __webpack_require__(75);

	var _ComponentRouter2 = _interopRequireDefault(_ComponentRouter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if ((typeof module === "object" && module.hot) && !(typeof global === "object" && global.noCycleHmr)) module.hot.accept(function (err) {err && console.error(`Can not accept module: ` + err.message)});

	// Globals


	// Pages


	// Components

	var routes = {
	  '/': _Landing2.default,
	  '/login': _Login2.default
	};

	var main = function main(sources) {
	  var page = (0, _ComponentRouter2.default)(_extends({}, sources, { routes$: _xstream3.default.of(routes) }));

	  return {
	    DOM: page.DOM,
	    router: page.route$
	  };
	};

	exports.default = (0, _xstream.hmrProxy)(main, ( true ? module.id : "") + '_app_page_main_default', {"modulePath":"app/page/main.js","exportName":"default"});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeFlatten = exports.isStream = exports.requireSources = undefined;

	var _xstream = __webpack_require__(11);

	var _xstream2 = __webpack_require__(1);

	var _xstream3 = _interopRequireDefault(_xstream2);

	var _ramda = __webpack_require__(51);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	if ((typeof module === "object" && module.hot) && !(typeof global === "object" && global.noCycleHmr)) module.hot.accept(function (err) {err && console.error(`Can not accept module: ` + err.message)});

	var requireSources = function requireSources(componentName, sources) {
	  for (var _len = arguments.length, sourcesNames = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    sourcesNames[_key - 2] = arguments[_key];
	  }

	  (0, _ramda.forEach)(function (n) {
	    if (!sources[n]) {
	      throw new Error(componentName + ' must have ' + n + ' specified');
	    }
	  }, sourcesNames);
	};

	var requireSources__hmr = (0, _xstream.hmrProxy)(requireSources, ( true ? module.id : "") + '_app_util_index_requireSources', {"modulePath":"app/util/index.js","exportName":"requireSources"});
	exports.requireSources = requireSources__hmr;

	var isStream = function isStream(stream) {
	  return typeof stream.addListener === 'function' && typeof stream.fold === 'function';
	};

	var isStream__hmr = (0, _xstream.hmrProxy)(isStream, ( true ? module.id : "") + '_app_util_index_isStream', {"modulePath":"app/util/index.js","exportName":"isStream"});
	exports.isStream = isStream__hmr;

	var propOrNever = (0, _ramda.propOr)(_xstream3.default.never());

	var mergeFlatten = function mergeFlatten(key, children) {
	  var streams = (0, _ramda.map)(function (child) {
	    return isStream(child) ? child.map(propOrNever(key)).flatten() : propOrNever(key, child);
	  }, children);
	  return _xstream3.default.merge.apply(_xstream3.default, _toConsumableArray(streams));
	};

	var mergeFlatten__hmr = (0, _xstream.hmrProxy)(mergeFlatten, ( true ? module.id : "") + '_app_util_index_mergeFlatten', {"modulePath":"app/util/index.js","exportName":"mergeFlatten"});
	exports.mergeFlatten = mergeFlatten__hmr;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hmrProxy = undefined;

	var _proxy = __webpack_require__(82);

	var _xstreamAdapter = __webpack_require__(4);

	var _xstreamAdapter2 = _interopRequireDefault(_xstreamAdapter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hmrProxy = exports.hmrProxy = function hmrProxy() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  args.unshift([_xstreamAdapter2.default]);
	  return _proxy.hmrProxy.apply(null, args);
	};
	exports.default = hmrProxy;

/***/ },
/* 82 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var proxiesStore = {};

	var cycleHmrEnabled = true;

	if (typeof global !== 'undefined') {
	  global.cycleHmrProxiesStore = proxiesStore;
	  if (global.noCycleHmr) {
	    console.warn('[Cycle HMR] disabled');
	    cycleHmrEnabled = false;
	  }
	}

	var findValidAdapter = function findValidAdapter(adapters, stream) {
	  return stream && adapters.filter(function (adapter) {
	    return adapter.isValidStream(stream);
	  })[0];
	};

	var getDebugMethod = function getDebugMethod(value) {
	  return (typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object' ? typeof console[value] === 'function' ? value : console['log'] ? 'log' : '' : '';
	};

	var makeDebugOutput = function makeDebugOutput(method, proxyId) {
	  return function (message) {
	    return console[method]('[Cycle HMR] proxy ' + proxyId + ': ' + message);
	  };
	};

	var hmrProxy = exports.hmrProxy = function hmrProxy(adapters, dataflow, proxyId) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];


	  if (!cycleHmrEnabled || typeof dataflow !== 'function') {
	    return dataflow;
	  }

	  if (typeof proxyId !== 'string') {
	    throw Error('You should provide string value of proxy id');
	  }
	  var getAdapter = function getAdapter(stream) {
	    return findValidAdapter(adapters, stream);
	  };

	  var debug = function debug() {};
	  if (options.debug) {
	    var debugMethod = getDebugMethod(options.debug);
	    debug = debugMethod ? makeDebugOutput(debugMethod, proxyId) : debug;
	  }
	  debug.error = makeDebugOutput('error', proxyId);

	  var subscribeObserver = function subscribeObserver(proxy, observer) {
	    var dispose = proxy.adapter.streamSubscribe(proxy.sink, {
	      next: observer.next.bind(observer),
	      error: function error(err) {
	        debug.error('sink ' + proxy.key + ' error: ' + err.message);
	      },
	      complete: function complete() {
	        debug('sink ' + proxy.key + ' completed');
	      }
	    });
	    observer.dispose = function () {
	      if (typeof dispose === 'function') {
	        dispose();
	      }
	    };
	  };

	  var makeSinkProxies = function makeSinkProxies(sinks) {
	    var keyPrefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	    var proxies = {};
	    var validSinks = false;
	    var keys = Object.keys(sinks);
	    keys.forEach(function (key) {
	      var sink = sinks[key];
	      var adapter = sink && getAdapter(sink);
	      if (adapter) {
	        validSinks = true;
	        var proxy = { key: keyPrefix + key, subs: [], observers: [] };
	        proxy.sink = sink;
	        proxy.adapter = adapter;
	        proxy.stream = adapter.adapt({}, function (_, observer) {
	          proxy.observers.push(observer);
	          var sub = subscribeObserver(proxy, observer);
	          proxy.subs.push(sub);
	          debug('stream for sink ' + proxy.key + ' created, observers: ' + proxy.observers.length);
	          return function () {
	            observer.dispose();
	            var index = proxy.observers.indexOf(observer);
	            proxy.observers.splice(index, 1);
	            debug('stream for sink ' + proxy.key + ' disposed, observers: ' + proxy.observers.length);
	          };
	        });
	        proxies[key] = proxy;
	      } else {
	        if (typeof sink === 'function') {
	          validSinks = true;
	          var fnProxyId = proxyId + '_' + key;
	          proxies[key] = {
	            fnProxyId: fnProxyId,
	            fn: hmrProxy(adapters, sink, fnProxyId, options)
	          };
	        } else if (sink && sink.constructor === Object) {
	          validSinks = true;
	          proxies[key] = { obj: makeSinkProxies(sink, keyPrefix + key + '.') };
	        } else {
	          proxies[key] = sink;
	        }
	      }
	    });
	    return validSinks && proxies;
	  };

	  var getProxySinks = function getProxySinks(proxies) {
	    return Object.keys(proxies).reduce(function (obj, key) {
	      var proxy = proxies[key];
	      obj[key] = proxy && (proxy.stream || proxy.fn || proxy.obj && getProxySinks(proxy.obj)) || proxy;
	      return obj;
	    }, {});
	  };

	  var SubscribeProxies = function SubscribeProxies(proxies, sinks) {
	    if (getAdapter(sinks)) {
	      sinks = { default: sinks };
	    }
	    return Object.keys(proxies).forEach(function (key) {
	      var proxy = proxies[key];
	      if (!proxy || !sinks[key]) {
	        return;
	      }
	      if (proxy.fn) {
	        hmrProxy(adapters, sinks[key], proxy.fnProxyId, options);
	      } else if (proxy.obj) {
	        SubscribeProxies(proxy.obj, sinks[key]);
	      }if (proxy.observers) {
	        proxy.sink = sinks[key];
	        proxy.observers.map(function (observer) {
	          var dispose = observer.dispose;
	          subscribeObserver(proxy, observer);
	          dispose();
	        });
	      }
	    });
	  };

	  var proxiedInstances = proxiesStore[proxyId];

	  if (proxiedInstances) {
	    proxiedInstances.forEach(function (_ref) {
	      var proxies = _ref.proxies;
	      var sources = _ref.sources;
	      var rest = _ref.rest;

	      debug('reload');
	      //UnsubscribeProxies(proxies)
	      var sinks = dataflow.apply(undefined, [sources].concat(_toConsumableArray(rest)));
	      sinks && SubscribeProxies(proxies, sinks);
	    });
	  } else {
	    proxiedInstances = proxiesStore[proxyId] = [];
	  }

	  return function (sources) {
	    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      rest[_key - 1] = arguments[_key];
	    }

	    debug('execute');
	    var sinks = dataflow.apply(undefined, [sources].concat(rest));
	    if (!sinks) {
	      return sinks;
	    }
	    var simple = getAdapter(sinks);
	    if (simple) {
	      sinks = { default: sinks };
	    }
	    if ((typeof sinks === 'undefined' ? 'undefined' : _typeof(sinks)) === 'object') {
	      var proxies = makeSinkProxies(sinks);
	      if (!proxies) {
	        debug('sink not a stream result');
	        return sinks;
	      }
	      proxiedInstances.push({ sources: sources, proxies: proxies, rest: rest });
	      debug('created');
	      var proxiedSinks = getProxySinks(proxies);
	      return simple ? proxiedSinks.default : proxiedSinks;
	    } else {
	      debug('sink not a stream result');
	      return sinks;
	    }
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(86);
	function isStrictlyInScope(namespace, path) {
	    var pathParts = util.splitPath(path);
	    return namespace.every(function (v, i) {
	        return pathParts[i] === v;
	    });
	}
	function getFilteredPath(namespace, path) {
	    var pathParts = util.splitPath(path);
	    return '/' + util.filterPath(pathParts, namespace);
	}
	var RouterSource = (function () {
	    function RouterSource(history$, _namespace, _createHref, _runSA, _routeMatcher) {
	        this.history$ = history$;
	        this._namespace = _namespace;
	        this._createHref = _createHref;
	        this._runSA = _runSA;
	        this._routeMatcher = _routeMatcher;
	    }
	    RouterSource.prototype.path = function (pathname) {
	        var scopedNamespace = this._namespace.concat(util.splitPath(pathname));
	        var scopedHistory$ = this._runSA.remember(this.history$
	            .filter(function (_a) {
	            var _path = _a.pathname;
	            return isStrictlyInScope(scopedNamespace, _path);
	        }));
	        var createHref = this._createHref;
	        return new RouterSource(scopedHistory$, scopedNamespace, createHref, this._runSA, this._routeMatcher);
	    };
	    RouterSource.prototype.define = function (routes, routeMatcher) {
	        var _this = this;
	        var namespace = this._namespace;
	        var _createHref = this._createHref;
	        var createHref = util.makeCreateHref(namespace, _createHref);
	        var match$ = this._runSA.remember(this.history$
	            .map(function (location) {
	            var matcher = routeMatcher || _this._routeMatcher;
	            var filteredPath = getFilteredPath(namespace, location.pathname);
	            var _a = matcher(filteredPath, routes), path = _a.path, value = _a.value;
	            return { path: path, value: value, location: location, createHref: createHref };
	        }));
	        match$.createHref = createHref;
	        return match$;
	    };
	    RouterSource.prototype.createHref = function (path) {
	        return util.makeCreateHref(this._namespace, this._createHref)(path);
	    };
	    return RouterSource;
	}());
	exports.RouterSource = RouterSource;
	//# sourceMappingURL=RouterSource.js.map

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var makeRouterDriver_1 = __webpack_require__(85);
	exports.makeRouterDriver = makeRouterDriver_1.makeRouterDriver;
	var history_1 = __webpack_require__(35);
	exports.supportsHistory = history_1.supportsHistory;
	exports.createLocation = history_1.createLocation;
	exports.createServerHistory = history_1.createServerHistory;
	//# sourceMappingURL=index.js.map

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var history_1 = __webpack_require__(35);
	var RouterSource_1 = __webpack_require__(83);
	/**
	 * Instantiates an new router driver function using the same arguments required
	 * by @cycle/history.
	 * @public
	 * @method makeRouterDriver
	 * @return {routerDriver} The router driver function
	 */
	function makeRouterDriver(history, routeMatcher, options) {
	    var historyDriver = history_1.makeHistoryDriver(history, options);
	    /**
	     * The actual router driver.
	     * @public
	     * @typedef {routerDriver}
	     * @name routerDriver
	     * @method routerDriver
	     * @param  {Stream<string|Location>} sink$ - This is the same input that the
	     * history driver would expect.
	     * @return {routerAPI}
	     */
	    return function routerDriver(sink$, runSA) {
	        var history$ = runSA.remember(historyDriver(sink$, runSA));
	        return new RouterSource_1.RouterSource(history$, [], history.createHref, runSA, routeMatcher);
	    };
	}
	exports.makeRouterDriver = makeRouterDriver;
	//# sourceMappingURL=makeRouterDriver.js.map

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";
	function splitPath(path) {
	    return path.split('/').filter(function (p) { return p.length > 0; });
	}
	exports.splitPath = splitPath;
	function filterPath(pathParts, namespace) {
	    return pathParts.filter(function (part) { return namespace.indexOf(part) < 0; }).join('/');
	}
	exports.filterPath = filterPath;
	var startsWith = function (param, value) { return param[0] === value; };
	var startsWith2 = function (param, value1, value2) {
	    return param[0] === value1 && param[1] === value2;
	};
	function makeCreateHref(namespace, _createHref) {
	    /**
	     * Function used to create HREFs that are properly namespaced
	     * @typedef {createHref}
	     * @name createHref
	     * @method createHref
	     * @param  {string} path - the HREF that will be appended to the current
	     * namespace
	     * @return {string} a fully qualified HREF composed from the current
	     * namespace and the path provided
	     */
	    return function createHref(path) {
	        var fullPath = "" + namespace.join('/') + path;
	        return startsWith(fullPath, '/') || startsWith2(fullPath, '#', '/')
	            ? _createHref(fullPath)
	            : _createHref('/' + fullPath);
	    };
	}
	exports.makeCreateHref = makeCreateHref;
	//# sourceMappingURL=util.js.map

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var copy       = __webpack_require__(97)
	  , map        = __webpack_require__(105)
	  , callable   = __webpack_require__(7)
	  , validValue = __webpack_require__(3)

	  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , define;

	define = function (name, desc, bindTo) {
		var value = validValue(desc) && callable(desc.value), dgs;
		dgs = copy(desc);
		delete dgs.writable;
		delete dgs.value;
		dgs.get = function () {
			if (hasOwnProperty.call(this, name)) return value;
			desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
			defineProperty(this, name, desc);
			return this[name];
		};
		return dgs;
	};

	module.exports = function (props/*, bindTo*/) {
		var bindTo = arguments[1];
		return map(props, function (desc, name) {
			return define(name, desc, bindTo);
		});
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toPosInt = __webpack_require__(93)
	  , value    = __webpack_require__(3)

	  , indexOf = Array.prototype.indexOf
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , abs = Math.abs, floor = Math.floor;

	module.exports = function (searchElement/*, fromIndex*/) {
		var i, l, fromIndex, val;
		if (searchElement === searchElement) { //jslint: ignore
			return indexOf.apply(this, arguments);
		}

		l = toPosInt(value(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor(fromIndex);
		else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

		for (i = fromIndex; i < l; ++i) {
			if (hasOwnProperty.call(this, i)) {
				val = this[i];
				if (val !== val) return i; //jslint: ignore
			}
		}
		return -1;
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(90)()
		? Math.sign
		: __webpack_require__(91);


/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var sign = Math.sign;
		if (typeof sign !== 'function') return false;
		return ((sign(10) === 1) && (sign(-20) === -1));
	};


/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		value = Number(value);
		if (isNaN(value) || (value === 0)) return value;
		return (value > 0) ? 1 : -1;
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var sign = __webpack_require__(89)

	  , abs = Math.abs, floor = Math.floor;

	module.exports = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if ((value === 0) || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toInteger = __webpack_require__(92)

	  , max = Math.max;

	module.exports = function (value) { return max(0, toInteger(value)); };


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// Internal method, used by iteration functions.
	// Calls a function for each key-value pair found in object
	// Optionally takes compareFn to iterate object in specific order

	'use strict';

	var callable = __webpack_require__(7)
	  , value    = __webpack_require__(3)

	  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
	  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

	module.exports = function (method, defVal) {
		return function (obj, cb/*, thisArg, compareFn*/) {
			var list, thisArg = arguments[2], compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);

			list = keys(obj);
			if (compareFn) {
				list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== 'function') method = list[method];
			return call.call(method, list, function (key, index) {
				if (!propertyIsEnumerable.call(obj, key)) return defVal;
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};


/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys  = __webpack_require__(102)
	  , value = __webpack_require__(3)

	  , max = Math.max;

	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign = __webpack_require__(23)
	  , value  = __webpack_require__(3);

	module.exports = function (obj) {
		var copy = Object(value(obj));
		if (copy !== obj) return copy;
		return assign({}, obj);
	};


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

	'use strict';

	var create = Object.create, shim;

	if (!__webpack_require__(39)()) {
		shim = __webpack_require__(40);
	}

	module.exports = (function () {
		var nullObject, props, desc;
		if (!shim) return create;
		if (shim.level !== 1) return create;

		nullObject = {};
		props = {};
		desc = { configurable: false, enumerable: false, writable: true,
			value: undefined };
		Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
			if (name === '__proto__') {
				props[name] = { configurable: true, enumerable: false, writable: true,
					value: undefined };
				return;
			}
			props[name] = desc;
		});
		Object.defineProperties(nullObject, props);

		Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
			enumerable: false, writable: false, value: nullObject });

		return function (prototype, props) {
			return create((prototype === null) ? nullObject : prototype, props);
		};
	}());


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(94)('forEach');


/***/ },
/* 100 */
/***/ function(module, exports) {

	// Deprecated

	'use strict';

	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	var map = { function: true, object: true };

	module.exports = function (x) {
		return ((x != null) && map[typeof x]) || false;
	};


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(103)()
		? Object.keys
		: __webpack_require__(104);


/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var callable = __webpack_require__(7)
	  , forEach  = __webpack_require__(99)

	  , call = Function.prototype.call;

	module.exports = function (obj, cb/*, thisArg*/) {
		var o = {}, thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, obj, index) {
			o[key] = call.call(cb, thisArg, value, key, obj, index);
		});
		return o;
	};


/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach, create = Object.create;

	module.exports = function (arg/*, …args*/) {
		var set = create(null);
		forEach.call(arguments, function (name) { set[name] = true; });
		return set;
	};


/***/ },
/* 108 */
/***/ function(module, exports) {

	'use strict';

	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var setPrototypeOf = __webpack_require__(16)
	  , contains       = __webpack_require__(41)
	  , d              = __webpack_require__(6)
	  , Iterator       = __webpack_require__(25)

	  , defineProperty = Object.defineProperty
	  , ArrayIterator;

	ArrayIterator = module.exports = function (arr, kind) {
		if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
		Iterator.call(this, arr);
		if (!kind) kind = 'value';
		else if (contains.call(kind, 'key+value')) kind = 'key+value';
		else if (contains.call(kind, 'key')) kind = 'key';
		else kind = 'value';
		defineProperty(this, '__kind__', d('', kind));
	};
	if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

	ArrayIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(ArrayIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__list__[i];
			if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
			return i;
		}),
		toString: d(function () { return '[object Array Iterator]'; })
	});


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(22)
	  , callable    = __webpack_require__(7)
	  , isString    = __webpack_require__(24)
	  , get         = __webpack_require__(112)

	  , isArray = Array.isArray, call = Function.prototype.call
	  , some = Array.prototype.some;

	module.exports = function (iterable, cb/*, thisArg*/) {
		var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
		if (isArray(iterable) || isArguments(iterable)) mode = 'array';
		else if (isString(iterable)) mode = 'string';
		else iterable = get(iterable);

		callable(cb);
		doBreak = function () { broken = true; };
		if (mode === 'array') {
			some.call(iterable, function (value) {
				call.call(cb, thisArg, value, doBreak);
				if (broken) return true;
			});
			return;
		}
		if (mode === 'string') {
			l = iterable.length;
			for (i = 0; i < l; ++i) {
				char = iterable[i];
				if ((i + 1) < l) {
					code = char.charCodeAt(0);
					if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
				}
				call.call(cb, thisArg, char, doBreak);
				if (broken) break;
			}
			return;
		}
		result = iterable.next();

		while (!result.done) {
			call.call(cb, thisArg, result.value, doBreak);
			if (broken) return;
			result = iterable.next();
		}
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments    = __webpack_require__(22)
	  , isString       = __webpack_require__(24)
	  , ArrayIterator  = __webpack_require__(110)
	  , StringIterator = __webpack_require__(114)
	  , iterable       = __webpack_require__(42)
	  , iteratorSymbol = __webpack_require__(12).iterator;

	module.exports = function (obj) {
		if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
		if (isArguments(obj)) return new ArrayIterator(obj);
		if (isString(obj)) return new StringIterator(obj);
		return new ArrayIterator(obj);
	};


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments    = __webpack_require__(22)
	  , isString       = __webpack_require__(24)
	  , iteratorSymbol = __webpack_require__(12).iterator

	  , isArray = Array.isArray;

	module.exports = function (value) {
		if (value == null) return false;
		if (isArray(value)) return true;
		if (isString(value)) return true;
		if (isArguments(value)) return true;
		return (typeof value[iteratorSymbol] === 'function');
	};


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// Thanks @mathiasbynens
	// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

	'use strict';

	var setPrototypeOf = __webpack_require__(16)
	  , d              = __webpack_require__(6)
	  , Iterator       = __webpack_require__(25)

	  , defineProperty = Object.defineProperty
	  , StringIterator;

	StringIterator = module.exports = function (str) {
		if (!(this instanceof StringIterator)) return new StringIterator(str);
		str = String(str);
		Iterator.call(this, str);
		defineProperty(this, '__length__', d('', str.length));

	};
	if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

	StringIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(StringIterator),
		_next: d(function () {
			if (!this.__list__) return;
			if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
			this._unBind();
		}),
		_resolve: d(function (i) {
			var char = this.__list__[i], code;
			if (this.__nextIndex__ === this.__length__) return char;
			code = char.charCodeAt(0);
			if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
			return char;
		}),
		toString: d(function () { return '[object String Iterator]'; })
	});


/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var map, iterator, result;
		if (typeof Map !== 'function') return false;
		try {
			// WebKit doesn't support arguments and crashes
			map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
		} catch (e) {
			return false;
		}
		if (String(map) !== '[object Map]') return false;
		if (map.size !== 3) return false;
		if (typeof map.clear !== 'function') return false;
		if (typeof map.delete !== 'function') return false;
		if (typeof map.entries !== 'function') return false;
		if (typeof map.forEach !== 'function') return false;
		if (typeof map.get !== 'function') return false;
		if (typeof map.has !== 'function') return false;
		if (typeof map.keys !== 'function') return false;
		if (typeof map.set !== 'function') return false;
		if (typeof map.values !== 'function') return false;

		iterator = map.entries();
		result = iterator.next();
		if (result.done !== false) return false;
		if (!result.value) return false;
		if (result.value[0] !== 'raz') return false;
		if (result.value[1] !== 'one') return false;

		return true;
	};


/***/ },
/* 116 */
/***/ function(module, exports) {

	// Exports true if environment provides native `Map` implementation,
	// whatever that is.

	'use strict';

	module.exports = (function () {
		if (typeof Map === 'undefined') return false;
		return (Object.prototype.toString.call(new Map()) === '[object Map]');
	}());


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(107)('key',
		'value', 'key+value');


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var setPrototypeOf    = __webpack_require__(16)
	  , d                 = __webpack_require__(6)
	  , Iterator          = __webpack_require__(25)
	  , toStringTagSymbol = __webpack_require__(12).toStringTag
	  , kinds             = __webpack_require__(117)

	  , defineProperties = Object.defineProperties
	  , unBind = Iterator.prototype._unBind
	  , MapIterator;

	MapIterator = module.exports = function (map, kind) {
		if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
		Iterator.call(this, map.__mapKeysData__, map);
		if (!kind || !kinds[kind]) kind = 'key+value';
		defineProperties(this, {
			__kind__: d('', kind),
			__values__: d('w', map.__mapValuesData__)
		});
	};
	if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

	MapIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(MapIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__values__[i];
			if (this.__kind__ === 'key') return this.__list__[i];
			return [this.__list__[i], this.__values__[i]];
		}),
		_unBind: d(function () {
			this.__values__ = null;
			unBind.call(this);
		}),
		toString: d(function () { return '[object Map Iterator]'; })
	});
	Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
		d('c', 'Map Iterator'));


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var clear          = __webpack_require__(38)
	  , eIndexOf       = __webpack_require__(88)
	  , setPrototypeOf = __webpack_require__(16)
	  , callable       = __webpack_require__(7)
	  , validValue     = __webpack_require__(3)
	  , d              = __webpack_require__(6)
	  , ee             = __webpack_require__(125)
	  , Symbol         = __webpack_require__(12)
	  , iterator       = __webpack_require__(42)
	  , forOf          = __webpack_require__(111)
	  , Iterator       = __webpack_require__(118)
	  , isNative       = __webpack_require__(116)

	  , call = Function.prototype.call
	  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
	  , MapPoly;

	module.exports = MapPoly = function (/*iterable*/) {
		var iterable = arguments[0], keys, values, self;
		if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
		if (isNative && setPrototypeOf && (Map !== MapPoly)) {
			self = setPrototypeOf(new Map(), getPrototypeOf(this));
		} else {
			self = this;
		}
		if (iterable != null) iterator(iterable);
		defineProperties(self, {
			__mapKeysData__: d('c', keys = []),
			__mapValuesData__: d('c', values = [])
		});
		if (!iterable) return self;
		forOf(iterable, function (value) {
			var key = validValue(value)[0];
			value = value[1];
			if (eIndexOf.call(keys, key) !== -1) return;
			keys.push(key);
			values.push(value);
		}, self);
		return self;
	};

	if (isNative) {
		if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
		MapPoly.prototype = Object.create(Map.prototype, {
			constructor: d(MapPoly)
		});
	}

	ee(defineProperties(MapPoly.prototype, {
		clear: d(function () {
			if (!this.__mapKeysData__.length) return;
			clear.call(this.__mapKeysData__);
			clear.call(this.__mapValuesData__);
			this.emit('_clear');
		}),
		delete: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return false;
			this.__mapKeysData__.splice(index, 1);
			this.__mapValuesData__.splice(index, 1);
			this.emit('_delete', index, key);
			return true;
		}),
		entries: d(function () { return new Iterator(this, 'key+value'); }),
		forEach: d(function (cb/*, thisArg*/) {
			var thisArg = arguments[1], iterator, result;
			callable(cb);
			iterator = this.entries();
			result = iterator._next();
			while (result !== undefined) {
				call.call(cb, thisArg, this.__mapValuesData__[result],
					this.__mapKeysData__[result], this);
				result = iterator._next();
			}
		}),
		get: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return;
			return this.__mapValuesData__[index];
		}),
		has: d(function (key) {
			return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
		}),
		keys: d(function () { return new Iterator(this, 'key'); }),
		set: d(function (key, value) {
			var index = eIndexOf.call(this.__mapKeysData__, key), emit;
			if (index === -1) {
				index = this.__mapKeysData__.push(key) - 1;
				emit = true;
			}
			this.__mapValuesData__[index] = value;
			if (emit) this.emit('_add', index, key);
			return this;
		}),
		size: d.gs(function () { return this.__mapKeysData__.length; }),
		values: d(function () { return new Iterator(this, 'value'); }),
		toString: d(function () { return '[object Map]'; })
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
		return this.entries();
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, process) { /*!
	  * https://github.com/paulmillr/es6-shim
	  * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
	  *   and contributors,  MIT License
	  * es6-shim: v0.35.1
	  * see https://github.com/paulmillr/es6-shim/blob/0.35.1/LICENSE
	  * Details and documentation:
	  * https://github.com/paulmillr/es6-shim/
	  */

	// UMD (Universal Module Definition)
	// see https://github.com/umdjs/umd/blob/master/returnExports.js
	(function (root, factory) {
	  /*global define, module, exports */
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.returnExports = factory();
	  }
	}(this, function () {
	  'use strict';

	  var _apply = Function.call.bind(Function.apply);
	  var _call = Function.call.bind(Function.call);
	  var isArray = Array.isArray;
	  var keys = Object.keys;

	  var not = function notThunker(func) {
	    return function notThunk() {
	      return !_apply(func, this, arguments);
	    };
	  };
	  var throwsError = function (func) {
	    try {
	      func();
	      return false;
	    } catch (e) {
	      return true;
	    }
	  };
	  var valueOrFalseIfThrows = function valueOrFalseIfThrows(func) {
	    try {
	      return func();
	    } catch (e) {
	      return false;
	    }
	  };

	  var isCallableWithoutNew = not(throwsError);
	  var arePropertyDescriptorsSupported = function () {
	    // if Object.defineProperty exists but throws, it's IE 8
	    return !throwsError(function () {
	      Object.defineProperty({}, 'x', { get: function () {} });
	    });
	  };
	  var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();
	  var functionsHaveNames = (function foo() {}).name === 'foo'; // eslint-disable-line no-extra-parens

	  var _forEach = Function.call.bind(Array.prototype.forEach);
	  var _reduce = Function.call.bind(Array.prototype.reduce);
	  var _filter = Function.call.bind(Array.prototype.filter);
	  var _some = Function.call.bind(Array.prototype.some);

	  var defineProperty = function (object, name, value, force) {
	    if (!force && name in object) { return; }
	    if (supportsDescriptors) {
	      Object.defineProperty(object, name, {
	        configurable: true,
	        enumerable: false,
	        writable: true,
	        value: value
	      });
	    } else {
	      object[name] = value;
	    }
	  };

	  // Define configurable, writable and non-enumerable props
	  // if they don’t exist.
	  var defineProperties = function (object, map, forceOverride) {
	    _forEach(keys(map), function (name) {
	      var method = map[name];
	      defineProperty(object, name, method, !!forceOverride);
	    });
	  };

	  var _toString = Function.call.bind(Object.prototype.toString);
	  var isCallable =  false ? function IsCallableSlow(x) {
	    // Some old browsers (IE, FF) say that typeof /abc/ === 'function'
	    return typeof x === 'function' && _toString(x) === '[object Function]';
	  } : function IsCallableFast(x) { return typeof x === 'function'; };

	  var Value = {
	    getter: function (object, name, getter) {
	      if (!supportsDescriptors) {
	        throw new TypeError('getters require true ES5 support');
	      }
	      Object.defineProperty(object, name, {
	        configurable: true,
	        enumerable: false,
	        get: getter
	      });
	    },
	    proxy: function (originalObject, key, targetObject) {
	      if (!supportsDescriptors) {
	        throw new TypeError('getters require true ES5 support');
	      }
	      var originalDescriptor = Object.getOwnPropertyDescriptor(originalObject, key);
	      Object.defineProperty(targetObject, key, {
	        configurable: originalDescriptor.configurable,
	        enumerable: originalDescriptor.enumerable,
	        get: function getKey() { return originalObject[key]; },
	        set: function setKey(value) { originalObject[key] = value; }
	      });
	    },
	    redefine: function (object, property, newValue) {
	      if (supportsDescriptors) {
	        var descriptor = Object.getOwnPropertyDescriptor(object, property);
	        descriptor.value = newValue;
	        Object.defineProperty(object, property, descriptor);
	      } else {
	        object[property] = newValue;
	      }
	    },
	    defineByDescriptor: function (object, property, descriptor) {
	      if (supportsDescriptors) {
	        Object.defineProperty(object, property, descriptor);
	      } else if ('value' in descriptor) {
	        object[property] = descriptor.value;
	      }
	    },
	    preserveToString: function (target, source) {
	      if (source && isCallable(source.toString)) {
	        defineProperty(target, 'toString', source.toString.bind(source), true);
	      }
	    }
	  };

	  // Simple shim for Object.create on ES3 browsers
	  // (unlike real shim, no attempt to support `prototype === null`)
	  var create = Object.create || function (prototype, properties) {
	    var Prototype = function Prototype() {};
	    Prototype.prototype = prototype;
	    var object = new Prototype();
	    if (typeof properties !== 'undefined') {
	      keys(properties).forEach(function (key) {
	        Value.defineByDescriptor(object, key, properties[key]);
	      });
	    }
	    return object;
	  };

	  var supportsSubclassing = function (C, f) {
	    if (!Object.setPrototypeOf) { return false; /* skip test on IE < 11 */ }
	    return valueOrFalseIfThrows(function () {
	      var Sub = function Subclass(arg) {
	        var o = new C(arg);
	        Object.setPrototypeOf(o, Subclass.prototype);
	        return o;
	      };
	      Object.setPrototypeOf(Sub, C);
	      Sub.prototype = create(C.prototype, {
	        constructor: { value: Sub }
	      });
	      return f(Sub);
	    });
	  };

	  var getGlobal = function () {
	    /* global self, window, global */
	    // the only reliable means to get the global object is
	    // `Function('return this')()`
	    // However, this causes CSP violations in Chrome apps.
	    if (typeof self !== 'undefined') { return self; }
	    if (typeof window !== 'undefined') { return window; }
	    if (typeof global !== 'undefined') { return global; }
	    throw new Error('unable to locate global object');
	  };

	  var globals = getGlobal();
	  var globalIsFinite = globals.isFinite;
	  var _indexOf = Function.call.bind(String.prototype.indexOf);
	  var _arrayIndexOfApply = Function.apply.bind(Array.prototype.indexOf);
	  var _concat = Function.call.bind(Array.prototype.concat);
	  // var _sort = Function.call.bind(Array.prototype.sort);
	  var _strSlice = Function.call.bind(String.prototype.slice);
	  var _push = Function.call.bind(Array.prototype.push);
	  var _pushApply = Function.apply.bind(Array.prototype.push);
	  var _shift = Function.call.bind(Array.prototype.shift);
	  var _max = Math.max;
	  var _min = Math.min;
	  var _floor = Math.floor;
	  var _abs = Math.abs;
	  var _exp = Math.exp;
	  var _log = Math.log;
	  var _sqrt = Math.sqrt;
	  var _hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
	  var ArrayIterator; // make our implementation private
	  var noop = function () {};

	  var OrigMap = globals.Map;
	  var origMapDelete = OrigMap && OrigMap.prototype['delete'];
	  var origMapGet = OrigMap && OrigMap.prototype.get;
	  var origMapHas = OrigMap && OrigMap.prototype.has;
	  var origMapSet = OrigMap && OrigMap.prototype.set;

	  var Symbol = globals.Symbol || {};
	  var symbolSpecies = Symbol.species || '@@species';

	  var numberIsNaN = Number.isNaN || function isNaN(value) {
	    // NaN !== NaN, but they are identical.
	    // NaNs are the only non-reflexive value, i.e., if x !== x,
	    // then x is NaN.
	    // isNaN is broken: it converts its argument to number, so
	    // isNaN('foo') => true
	    return value !== value;
	  };
	  var numberIsFinite = Number.isFinite || function isFinite(value) {
	    return typeof value === 'number' && globalIsFinite(value);
	  };
	  var _sign = isCallable(Math.sign) ? Math.sign : function sign(value) {
	    var number = Number(value);
	    if (number === 0) { return number; }
	    if (numberIsNaN(number)) { return number; }
	    return number < 0 ? -1 : 1;
	  };

	  // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
	  // can be replaced with require('is-arguments') if we ever use a build process instead
	  var isStandardArguments = function isArguments(value) {
	    return _toString(value) === '[object Arguments]';
	  };
	  var isLegacyArguments = function isArguments(value) {
	    return value !== null &&
	      typeof value === 'object' &&
	      typeof value.length === 'number' &&
	      value.length >= 0 &&
	      _toString(value) !== '[object Array]' &&
	      _toString(value.callee) === '[object Function]';
	  };
	  var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

	  var Type = {
	    primitive: function (x) { return x === null || (typeof x !== 'function' && typeof x !== 'object'); },
	    string: function (x) { return _toString(x) === '[object String]'; },
	    regex: function (x) { return _toString(x) === '[object RegExp]'; },
	    symbol: function (x) {
	      return typeof globals.Symbol === 'function' && typeof x === 'symbol';
	    }
	  };

	  var overrideNative = function overrideNative(object, property, replacement) {
	    var original = object[property];
	    defineProperty(object, property, replacement, true);
	    Value.preserveToString(object[property], original);
	  };

	  // eslint-disable-next-line no-restricted-properties
	  var hasSymbols = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' && Type.symbol(Symbol());

	  // This is a private name in the es6 spec, equal to '[Symbol.iterator]'
	  // we're going to use an arbitrary _-prefixed name to make our shims
	  // work properly with each other, even though we don't have full Iterator
	  // support.  That is, `Array.from(map.keys())` will work, but we don't
	  // pretend to export a "real" Iterator interface.
	  var $iterator$ = Type.symbol(Symbol.iterator) ? Symbol.iterator : '_es6-shim iterator_';
	  // Firefox ships a partial implementation using the name @@iterator.
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
	  // So use that name if we detect it.
	  if (globals.Set && typeof new globals.Set()['@@iterator'] === 'function') {
	    $iterator$ = '@@iterator';
	  }

	  // Reflect
	  if (!globals.Reflect) {
	    defineProperty(globals, 'Reflect', {}, true);
	  }
	  var Reflect = globals.Reflect;

	  var $String = String;

	  /* global document */
	  var domAll = (typeof document === 'undefined' || !document) ? null : document.all;
	  /* jshint eqnull:true */
	  var isNullOrUndefined = domAll == null ? function isNullOrUndefined(x) {
	    /* jshint eqnull:true */
	    return x == null;
	  } : function isNullOrUndefinedAndNotDocumentAll(x) {
	    /* jshint eqnull:true */
	    return x == null && x !== domAll;
	  };

	  var ES = {
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-call
	    Call: function Call(F, V) {
	      var args = arguments.length > 2 ? arguments[2] : [];
	      if (!ES.IsCallable(F)) {
	        throw new TypeError(F + ' is not a function');
	      }
	      return _apply(F, V, args);
	    },

	    RequireObjectCoercible: function (x, optMessage) {
	      if (isNullOrUndefined(x)) {
	        throw new TypeError(optMessage || 'Cannot call method on ' + x);
	      }
	      return x;
	    },

	    // This might miss the "(non-standard exotic and does not implement
	    // [[Call]])" case from
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-typeof-operator-runtime-semantics-evaluation
	    // but we can't find any evidence these objects exist in practice.
	    // If we find some in the future, you could test `Object(x) === x`,
	    // which is reliable according to
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toobject
	    // but is not well optimized by runtimes and creates an object
	    // whenever it returns false, and thus is very slow.
	    TypeIsObject: function (x) {
	      if (x === void 0 || x === null || x === true || x === false) {
	        return false;
	      }
	      return typeof x === 'function' || typeof x === 'object' || x === domAll;
	    },

	    ToObject: function (o, optMessage) {
	      return Object(ES.RequireObjectCoercible(o, optMessage));
	    },

	    IsCallable: isCallable,

	    IsConstructor: function (x) {
	      // We can't tell callables from constructors in ES5
	      return ES.IsCallable(x);
	    },

	    ToInt32: function (x) {
	      return ES.ToNumber(x) >> 0;
	    },

	    ToUint32: function (x) {
	      return ES.ToNumber(x) >>> 0;
	    },

	    ToNumber: function (value) {
	      if (_toString(value) === '[object Symbol]') {
	        throw new TypeError('Cannot convert a Symbol value to a number');
	      }
	      return +value;
	    },

	    ToInteger: function (value) {
	      var number = ES.ToNumber(value);
	      if (numberIsNaN(number)) { return 0; }
	      if (number === 0 || !numberIsFinite(number)) { return number; }
	      return (number > 0 ? 1 : -1) * _floor(_abs(number));
	    },

	    ToLength: function (value) {
	      var len = ES.ToInteger(value);
	      if (len <= 0) { return 0; } // includes converting -0 to +0
	      if (len > Number.MAX_SAFE_INTEGER) { return Number.MAX_SAFE_INTEGER; }
	      return len;
	    },

	    SameValue: function (a, b) {
	      if (a === b) {
	        // 0 === -0, but they are not identical.
	        if (a === 0) { return 1 / a === 1 / b; }
	        return true;
	      }
	      return numberIsNaN(a) && numberIsNaN(b);
	    },

	    SameValueZero: function (a, b) {
	      // same as SameValue except for SameValueZero(+0, -0) == true
	      return (a === b) || (numberIsNaN(a) && numberIsNaN(b));
	    },

	    IsIterable: function (o) {
	      return ES.TypeIsObject(o) && (typeof o[$iterator$] !== 'undefined' || isArguments(o));
	    },

	    GetIterator: function (o) {
	      if (isArguments(o)) {
	        // special case support for `arguments`
	        return new ArrayIterator(o, 'value');
	      }
	      var itFn = ES.GetMethod(o, $iterator$);
	      if (!ES.IsCallable(itFn)) {
	        // Better diagnostics if itFn is null or undefined
	        throw new TypeError('value is not an iterable');
	      }
	      var it = ES.Call(itFn, o);
	      if (!ES.TypeIsObject(it)) {
	        throw new TypeError('bad iterator');
	      }
	      return it;
	    },

	    GetMethod: function (o, p) {
	      var func = ES.ToObject(o)[p];
	      if (isNullOrUndefined(func)) {
	        return void 0;
	      }
	      if (!ES.IsCallable(func)) {
	        throw new TypeError('Method not callable: ' + p);
	      }
	      return func;
	    },

	    IteratorComplete: function (iterResult) {
	      return !!iterResult.done;
	    },

	    IteratorClose: function (iterator, completionIsThrow) {
	      var returnMethod = ES.GetMethod(iterator, 'return');
	      if (returnMethod === void 0) {
	        return;
	      }
	      var innerResult, innerException;
	      try {
	        innerResult = ES.Call(returnMethod, iterator);
	      } catch (e) {
	        innerException = e;
	      }
	      if (completionIsThrow) {
	        return;
	      }
	      if (innerException) {
	        throw innerException;
	      }
	      if (!ES.TypeIsObject(innerResult)) {
	        throw new TypeError("Iterator's return method returned a non-object.");
	      }
	    },

	    IteratorNext: function (it) {
	      var result = arguments.length > 1 ? it.next(arguments[1]) : it.next();
	      if (!ES.TypeIsObject(result)) {
	        throw new TypeError('bad iterator');
	      }
	      return result;
	    },

	    IteratorStep: function (it) {
	      var result = ES.IteratorNext(it);
	      var done = ES.IteratorComplete(result);
	      return done ? false : result;
	    },

	    Construct: function (C, args, newTarget, isES6internal) {
	      var target = typeof newTarget === 'undefined' ? C : newTarget;

	      if (!isES6internal && Reflect.construct) {
	        // Try to use Reflect.construct if available
	        return Reflect.construct(C, args, target);
	      }
	      // OK, we have to fake it.  This will only work if the
	      // C.[[ConstructorKind]] == "base" -- but that's the only
	      // kind we can make in ES5 code anyway.

	      // OrdinaryCreateFromConstructor(target, "%ObjectPrototype%")
	      var proto = target.prototype;
	      if (!ES.TypeIsObject(proto)) {
	        proto = Object.prototype;
	      }
	      var obj = create(proto);
	      // Call the constructor.
	      var result = ES.Call(C, obj, args);
	      return ES.TypeIsObject(result) ? result : obj;
	    },

	    SpeciesConstructor: function (O, defaultConstructor) {
	      var C = O.constructor;
	      if (C === void 0) {
	        return defaultConstructor;
	      }
	      if (!ES.TypeIsObject(C)) {
	        throw new TypeError('Bad constructor');
	      }
	      var S = C[symbolSpecies];
	      if (isNullOrUndefined(S)) {
	        return defaultConstructor;
	      }
	      if (!ES.IsConstructor(S)) {
	        throw new TypeError('Bad @@species');
	      }
	      return S;
	    },

	    CreateHTML: function (string, tag, attribute, value) {
	      var S = ES.ToString(string);
	      var p1 = '<' + tag;
	      if (attribute !== '') {
	        var V = ES.ToString(value);
	        var escapedV = V.replace(/"/g, '&quot;');
	        p1 += ' ' + attribute + '="' + escapedV + '"';
	      }
	      var p2 = p1 + '>';
	      var p3 = p2 + S;
	      return p3 + '</' + tag + '>';
	    },

	    IsRegExp: function IsRegExp(argument) {
	      if (!ES.TypeIsObject(argument)) {
	        return false;
	      }
	      var isRegExp = argument[Symbol.match];
	      if (typeof isRegExp !== 'undefined') {
	        return !!isRegExp;
	      }
	      return Type.regex(argument);
	    },

	    ToString: function ToString(string) {
	      return $String(string);
	    }
	  };

	  // Well-known Symbol shims
	  if (supportsDescriptors && hasSymbols) {
	    var defineWellKnownSymbol = function defineWellKnownSymbol(name) {
	      if (Type.symbol(Symbol[name])) {
	        return Symbol[name];
	      }
	      // eslint-disable-next-line no-restricted-properties
	      var sym = Symbol['for']('Symbol.' + name);
	      Object.defineProperty(Symbol, name, {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: sym
	      });
	      return sym;
	    };
	    if (!Type.symbol(Symbol.search)) {
	      var symbolSearch = defineWellKnownSymbol('search');
	      var originalSearch = String.prototype.search;
	      defineProperty(RegExp.prototype, symbolSearch, function search(string) {
	        return ES.Call(originalSearch, string, [this]);
	      });
	      var searchShim = function search(regexp) {
	        var O = ES.RequireObjectCoercible(this);
	        if (!isNullOrUndefined(regexp)) {
	          var searcher = ES.GetMethod(regexp, symbolSearch);
	          if (typeof searcher !== 'undefined') {
	            return ES.Call(searcher, regexp, [O]);
	          }
	        }
	        return ES.Call(originalSearch, O, [ES.ToString(regexp)]);
	      };
	      overrideNative(String.prototype, 'search', searchShim);
	    }
	    if (!Type.symbol(Symbol.replace)) {
	      var symbolReplace = defineWellKnownSymbol('replace');
	      var originalReplace = String.prototype.replace;
	      defineProperty(RegExp.prototype, symbolReplace, function replace(string, replaceValue) {
	        return ES.Call(originalReplace, string, [this, replaceValue]);
	      });
	      var replaceShim = function replace(searchValue, replaceValue) {
	        var O = ES.RequireObjectCoercible(this);
	        if (!isNullOrUndefined(searchValue)) {
	          var replacer = ES.GetMethod(searchValue, symbolReplace);
	          if (typeof replacer !== 'undefined') {
	            return ES.Call(replacer, searchValue, [O, replaceValue]);
	          }
	        }
	        return ES.Call(originalReplace, O, [ES.ToString(searchValue), replaceValue]);
	      };
	      overrideNative(String.prototype, 'replace', replaceShim);
	    }
	    if (!Type.symbol(Symbol.split)) {
	      var symbolSplit = defineWellKnownSymbol('split');
	      var originalSplit = String.prototype.split;
	      defineProperty(RegExp.prototype, symbolSplit, function split(string, limit) {
	        return ES.Call(originalSplit, string, [this, limit]);
	      });
	      var splitShim = function split(separator, limit) {
	        var O = ES.RequireObjectCoercible(this);
	        if (!isNullOrUndefined(separator)) {
	          var splitter = ES.GetMethod(separator, symbolSplit);
	          if (typeof splitter !== 'undefined') {
	            return ES.Call(splitter, separator, [O, limit]);
	          }
	        }
	        return ES.Call(originalSplit, O, [ES.ToString(separator), limit]);
	      };
	      overrideNative(String.prototype, 'split', splitShim);
	    }
	    var symbolMatchExists = Type.symbol(Symbol.match);
	    var stringMatchIgnoresSymbolMatch = symbolMatchExists && (function () {
	      // Firefox 41, through Nightly 45 has Symbol.match, but String#match ignores it.
	      // Firefox 40 and below have Symbol.match but String#match works fine.
	      var o = {};
	      o[Symbol.match] = function () { return 42; };
	      return 'a'.match(o) !== 42;
	    }());
	    if (!symbolMatchExists || stringMatchIgnoresSymbolMatch) {
	      var symbolMatch = defineWellKnownSymbol('match');

	      var originalMatch = String.prototype.match;
	      defineProperty(RegExp.prototype, symbolMatch, function match(string) {
	        return ES.Call(originalMatch, string, [this]);
	      });

	      var matchShim = function match(regexp) {
	        var O = ES.RequireObjectCoercible(this);
	        if (!isNullOrUndefined(regexp)) {
	          var matcher = ES.GetMethod(regexp, symbolMatch);
	          if (typeof matcher !== 'undefined') {
	            return ES.Call(matcher, regexp, [O]);
	          }
	        }
	        return ES.Call(originalMatch, O, [ES.ToString(regexp)]);
	      };
	      overrideNative(String.prototype, 'match', matchShim);
	    }
	  }

	  var wrapConstructor = function wrapConstructor(original, replacement, keysToSkip) {
	    Value.preserveToString(replacement, original);
	    if (Object.setPrototypeOf) {
	      // sets up proper prototype chain where possible
	      Object.setPrototypeOf(original, replacement);
	    }
	    if (supportsDescriptors) {
	      _forEach(Object.getOwnPropertyNames(original), function (key) {
	        if (key in noop || keysToSkip[key]) { return; }
	        Value.proxy(original, key, replacement);
	      });
	    } else {
	      _forEach(Object.keys(original), function (key) {
	        if (key in noop || keysToSkip[key]) { return; }
	        replacement[key] = original[key];
	      });
	    }
	    replacement.prototype = original.prototype;
	    Value.redefine(original.prototype, 'constructor', replacement);
	  };

	  var defaultSpeciesGetter = function () { return this; };
	  var addDefaultSpecies = function (C) {
	    if (supportsDescriptors && !_hasOwnProperty(C, symbolSpecies)) {
	      Value.getter(C, symbolSpecies, defaultSpeciesGetter);
	    }
	  };

	  var addIterator = function (prototype, impl) {
	    var implementation = impl || function iterator() { return this; };
	    defineProperty(prototype, $iterator$, implementation);
	    if (!prototype[$iterator$] && Type.symbol($iterator$)) {
	      // implementations are buggy when $iterator$ is a Symbol
	      prototype[$iterator$] = implementation;
	    }
	  };

	  var createDataProperty = function createDataProperty(object, name, value) {
	    if (supportsDescriptors) {
	      Object.defineProperty(object, name, {
	        configurable: true,
	        enumerable: true,
	        writable: true,
	        value: value
	      });
	    } else {
	      object[name] = value;
	    }
	  };
	  var createDataPropertyOrThrow = function createDataPropertyOrThrow(object, name, value) {
	    createDataProperty(object, name, value);
	    if (!ES.SameValue(object[name], value)) {
	      throw new TypeError('property is nonconfigurable');
	    }
	  };

	  var emulateES6construct = function (o, defaultNewTarget, defaultProto, slots) {
	    // This is an es5 approximation to es6 construct semantics.  in es6,
	    // 'new Foo' invokes Foo.[[Construct]] which (for almost all objects)
	    // just sets the internal variable NewTarget (in es6 syntax `new.target`)
	    // to Foo and then returns Foo().

	    // Many ES6 object then have constructors of the form:
	    // 1. If NewTarget is undefined, throw a TypeError exception
	    // 2. Let xxx by OrdinaryCreateFromConstructor(NewTarget, yyy, zzz)

	    // So we're going to emulate those first two steps.
	    if (!ES.TypeIsObject(o)) {
	      throw new TypeError('Constructor requires `new`: ' + defaultNewTarget.name);
	    }
	    var proto = defaultNewTarget.prototype;
	    if (!ES.TypeIsObject(proto)) {
	      proto = defaultProto;
	    }
	    var obj = create(proto);
	    for (var name in slots) {
	      if (_hasOwnProperty(slots, name)) {
	        var value = slots[name];
	        defineProperty(obj, name, value, true);
	      }
	    }
	    return obj;
	  };

	  // Firefox 31 reports this function's length as 0
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=1062484
	  if (String.fromCodePoint && String.fromCodePoint.length !== 1) {
	    var originalFromCodePoint = String.fromCodePoint;
	    overrideNative(String, 'fromCodePoint', function fromCodePoint(codePoints) {
	      return ES.Call(originalFromCodePoint, this, arguments);
	    });
	  }

	  var StringShims = {
	    fromCodePoint: function fromCodePoint(codePoints) {
	      var result = [];
	      var next;
	      for (var i = 0, length = arguments.length; i < length; i++) {
	        next = Number(arguments[i]);
	        if (!ES.SameValue(next, ES.ToInteger(next)) || next < 0 || next > 0x10FFFF) {
	          throw new RangeError('Invalid code point ' + next);
	        }

	        if (next < 0x10000) {
	          _push(result, String.fromCharCode(next));
	        } else {
	          next -= 0x10000;
	          _push(result, String.fromCharCode((next >> 10) + 0xD800));
	          _push(result, String.fromCharCode((next % 0x400) + 0xDC00));
	        }
	      }
	      return result.join('');
	    },

	    raw: function raw(callSite) {
	      var cooked = ES.ToObject(callSite, 'bad callSite');
	      var rawString = ES.ToObject(cooked.raw, 'bad raw value');
	      var len = rawString.length;
	      var literalsegments = ES.ToLength(len);
	      if (literalsegments <= 0) {
	        return '';
	      }

	      var stringElements = [];
	      var nextIndex = 0;
	      var nextKey, next, nextSeg, nextSub;
	      while (nextIndex < literalsegments) {
	        nextKey = ES.ToString(nextIndex);
	        nextSeg = ES.ToString(rawString[nextKey]);
	        _push(stringElements, nextSeg);
	        if (nextIndex + 1 >= literalsegments) {
	          break;
	        }
	        next = nextIndex + 1 < arguments.length ? arguments[nextIndex + 1] : '';
	        nextSub = ES.ToString(next);
	        _push(stringElements, nextSub);
	        nextIndex += 1;
	      }
	      return stringElements.join('');
	    }
	  };
	  if (String.raw && String.raw({ raw: { 0: 'x', 1: 'y', length: 2 } }) !== 'xy') {
	    // IE 11 TP has a broken String.raw implementation
	    overrideNative(String, 'raw', StringShims.raw);
	  }
	  defineProperties(String, StringShims);

	  // Fast repeat, uses the `Exponentiation by squaring` algorithm.
	  // Perf: http://jsperf.com/string-repeat2/2
	  var stringRepeat = function repeat(s, times) {
	    if (times < 1) { return ''; }
	    if (times % 2) { return repeat(s, times - 1) + s; }
	    var half = repeat(s, times / 2);
	    return half + half;
	  };
	  var stringMaxLength = Infinity;

	  var StringPrototypeShims = {
	    repeat: function repeat(times) {
	      var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
	      var numTimes = ES.ToInteger(times);
	      if (numTimes < 0 || numTimes >= stringMaxLength) {
	        throw new RangeError('repeat count must be less than infinity and not overflow maximum string size');
	      }
	      return stringRepeat(thisStr, numTimes);
	    },

	    startsWith: function startsWith(searchString) {
	      var S = ES.ToString(ES.RequireObjectCoercible(this));
	      if (ES.IsRegExp(searchString)) {
	        throw new TypeError('Cannot call method "startsWith" with a regex');
	      }
	      var searchStr = ES.ToString(searchString);
	      var position;
	      if (arguments.length > 1) {
	        position = arguments[1];
	      }
	      var start = _max(ES.ToInteger(position), 0);
	      return _strSlice(S, start, start + searchStr.length) === searchStr;
	    },

	    endsWith: function endsWith(searchString) {
	      var S = ES.ToString(ES.RequireObjectCoercible(this));
	      if (ES.IsRegExp(searchString)) {
	        throw new TypeError('Cannot call method "endsWith" with a regex');
	      }
	      var searchStr = ES.ToString(searchString);
	      var len = S.length;
	      var endPosition;
	      if (arguments.length > 1) {
	        endPosition = arguments[1];
	      }
	      var pos = typeof endPosition === 'undefined' ? len : ES.ToInteger(endPosition);
	      var end = _min(_max(pos, 0), len);
	      return _strSlice(S, end - searchStr.length, end) === searchStr;
	    },

	    includes: function includes(searchString) {
	      if (ES.IsRegExp(searchString)) {
	        throw new TypeError('"includes" does not accept a RegExp');
	      }
	      var searchStr = ES.ToString(searchString);
	      var position;
	      if (arguments.length > 1) {
	        position = arguments[1];
	      }
	      // Somehow this trick makes method 100% compat with the spec.
	      return _indexOf(this, searchStr, position) !== -1;
	    },

	    codePointAt: function codePointAt(pos) {
	      var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
	      var position = ES.ToInteger(pos);
	      var length = thisStr.length;
	      if (position >= 0 && position < length) {
	        var first = thisStr.charCodeAt(position);
	        var isEnd = position + 1 === length;
	        if (first < 0xD800 || first > 0xDBFF || isEnd) { return first; }
	        var second = thisStr.charCodeAt(position + 1);
	        if (second < 0xDC00 || second > 0xDFFF) { return first; }
	        return ((first - 0xD800) * 1024) + (second - 0xDC00) + 0x10000;
	      }
	    }
	  };
	  if (String.prototype.includes && 'a'.includes('a', Infinity) !== false) {
	    overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
	  }

	  if (String.prototype.startsWith && String.prototype.endsWith) {
	    var startsWithRejectsRegex = throwsError(function () {
	      /* throws if spec-compliant */
	      '/a/'.startsWith(/a/);
	    });
	    var startsWithHandlesInfinity = valueOrFalseIfThrows(function () {
	      return 'abc'.startsWith('a', Infinity) === false;
	    });
	    if (!startsWithRejectsRegex || !startsWithHandlesInfinity) {
	      // Firefox (< 37?) and IE 11 TP have a noncompliant startsWith implementation
	      overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
	      overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
	    }
	  }
	  if (hasSymbols) {
	    var startsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
	      var re = /a/;
	      re[Symbol.match] = false;
	      return '/a/'.startsWith(re);
	    });
	    if (!startsWithSupportsSymbolMatch) {
	      overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
	    }
	    var endsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
	      var re = /a/;
	      re[Symbol.match] = false;
	      return '/a/'.endsWith(re);
	    });
	    if (!endsWithSupportsSymbolMatch) {
	      overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
	    }
	    var includesSupportsSymbolMatch = valueOrFalseIfThrows(function () {
	      var re = /a/;
	      re[Symbol.match] = false;
	      return '/a/'.includes(re);
	    });
	    if (!includesSupportsSymbolMatch) {
	      overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
	    }
	  }

	  defineProperties(String.prototype, StringPrototypeShims);

	  // whitespace from: http://es5.github.io/#x15.5.4.20
	  // implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
	  var ws = [
	    '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	    '\u2029\uFEFF'
	  ].join('');
	  var trimRegexp = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
	  var trimShim = function trim() {
	    return ES.ToString(ES.RequireObjectCoercible(this)).replace(trimRegexp, '');
	  };
	  var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
	  var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
	  var isBadHexRegex = /^[-+]0x[0-9a-f]+$/i;
	  var hasStringTrimBug = nonWS.trim().length !== nonWS.length;
	  defineProperty(String.prototype, 'trim', trimShim, hasStringTrimBug);

	  // Given an argument x, it will return an IteratorResult object,
	  // with value set to x and done to false.
	  // Given no arguments, it will return an iterator completion object.
	  var iteratorResult = function (x) {
	    return { value: x, done: arguments.length === 0 };
	  };

	  // see http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype-@@iterator
	  var StringIterator = function (s) {
	    ES.RequireObjectCoercible(s);
	    this._s = ES.ToString(s);
	    this._i = 0;
	  };
	  StringIterator.prototype.next = function () {
	    var s = this._s;
	    var i = this._i;
	    if (typeof s === 'undefined' || i >= s.length) {
	      this._s = void 0;
	      return iteratorResult();
	    }
	    var first = s.charCodeAt(i);
	    var second, len;
	    if (first < 0xD800 || first > 0xDBFF || (i + 1) === s.length) {
	      len = 1;
	    } else {
	      second = s.charCodeAt(i + 1);
	      len = (second < 0xDC00 || second > 0xDFFF) ? 1 : 2;
	    }
	    this._i = i + len;
	    return iteratorResult(s.substr(i, len));
	  };
	  addIterator(StringIterator.prototype);
	  addIterator(String.prototype, function () {
	    return new StringIterator(this);
	  });

	  var ArrayShims = {
	    from: function from(items) {
	      var C = this;
	      var mapFn;
	      if (arguments.length > 1) {
	        mapFn = arguments[1];
	      }
	      var mapping, T;
	      if (typeof mapFn === 'undefined') {
	        mapping = false;
	      } else {
	        if (!ES.IsCallable(mapFn)) {
	          throw new TypeError('Array.from: when provided, the second argument must be a function');
	        }
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	        mapping = true;
	      }

	      // Note that that Arrays will use ArrayIterator:
	      // https://bugs.ecmascript.org/show_bug.cgi?id=2416
	      var usingIterator = typeof (isArguments(items) || ES.GetMethod(items, $iterator$)) !== 'undefined';

	      var length, result, i;
	      if (usingIterator) {
	        result = ES.IsConstructor(C) ? Object(new C()) : [];
	        var iterator = ES.GetIterator(items);
	        var next, nextValue;

	        i = 0;
	        while (true) {
	          next = ES.IteratorStep(iterator);
	          if (next === false) {
	            break;
	          }
	          nextValue = next.value;
	          try {
	            if (mapping) {
	              nextValue = typeof T === 'undefined' ? mapFn(nextValue, i) : _call(mapFn, T, nextValue, i);
	            }
	            result[i] = nextValue;
	          } catch (e) {
	            ES.IteratorClose(iterator, true);
	            throw e;
	          }
	          i += 1;
	        }
	        length = i;
	      } else {
	        var arrayLike = ES.ToObject(items);
	        length = ES.ToLength(arrayLike.length);
	        result = ES.IsConstructor(C) ? Object(new C(length)) : new Array(length);
	        var value;
	        for (i = 0; i < length; ++i) {
	          value = arrayLike[i];
	          if (mapping) {
	            value = typeof T === 'undefined' ? mapFn(value, i) : _call(mapFn, T, value, i);
	          }
	          createDataPropertyOrThrow(result, i, value);
	        }
	      }

	      result.length = length;
	      return result;
	    },

	    of: function of() {
	      var len = arguments.length;
	      var C = this;
	      var A = isArray(C) || !ES.IsCallable(C) ? new Array(len) : ES.Construct(C, [len]);
	      for (var k = 0; k < len; ++k) {
	        createDataPropertyOrThrow(A, k, arguments[k]);
	      }
	      A.length = len;
	      return A;
	    }
	  };
	  defineProperties(Array, ArrayShims);
	  addDefaultSpecies(Array);

	  // Our ArrayIterator is private; see
	  // https://github.com/paulmillr/es6-shim/issues/252
	  ArrayIterator = function (array, kind) {
	    this.i = 0;
	    this.array = array;
	    this.kind = kind;
	  };

	  defineProperties(ArrayIterator.prototype, {
	    next: function () {
	      var i = this.i;
	      var array = this.array;
	      if (!(this instanceof ArrayIterator)) {
	        throw new TypeError('Not an ArrayIterator');
	      }
	      if (typeof array !== 'undefined') {
	        var len = ES.ToLength(array.length);
	        for (; i < len; i++) {
	          var kind = this.kind;
	          var retval;
	          if (kind === 'key') {
	            retval = i;
	          } else if (kind === 'value') {
	            retval = array[i];
	          } else if (kind === 'entry') {
	            retval = [i, array[i]];
	          }
	          this.i = i + 1;
	          return iteratorResult(retval);
	        }
	      }
	      this.array = void 0;
	      return iteratorResult();
	    }
	  });
	  addIterator(ArrayIterator.prototype);

	/*
	  var orderKeys = function orderKeys(a, b) {
	    var aNumeric = String(ES.ToInteger(a)) === a;
	    var bNumeric = String(ES.ToInteger(b)) === b;
	    if (aNumeric && bNumeric) {
	      return b - a;
	    } else if (aNumeric && !bNumeric) {
	      return -1;
	    } else if (!aNumeric && bNumeric) {
	      return 1;
	    } else {
	      return a.localeCompare(b);
	    }
	  };

	  var getAllKeys = function getAllKeys(object) {
	    var ownKeys = [];
	    var keys = [];

	    for (var key in object) {
	      _push(_hasOwnProperty(object, key) ? ownKeys : keys, key);
	    }
	    _sort(ownKeys, orderKeys);
	    _sort(keys, orderKeys);

	    return _concat(ownKeys, keys);
	  };
	  */

	  // note: this is positioned here because it depends on ArrayIterator
	  var arrayOfSupportsSubclassing = Array.of === ArrayShims.of || (function () {
	    // Detects a bug in Webkit nightly r181886
	    var Foo = function Foo(len) { this.length = len; };
	    Foo.prototype = [];
	    var fooArr = Array.of.apply(Foo, [1, 2]);
	    return fooArr instanceof Foo && fooArr.length === 2;
	  }());
	  if (!arrayOfSupportsSubclassing) {
	    overrideNative(Array, 'of', ArrayShims.of);
	  }

	  var ArrayPrototypeShims = {
	    copyWithin: function copyWithin(target, start) {
	      var o = ES.ToObject(this);
	      var len = ES.ToLength(o.length);
	      var relativeTarget = ES.ToInteger(target);
	      var relativeStart = ES.ToInteger(start);
	      var to = relativeTarget < 0 ? _max(len + relativeTarget, 0) : _min(relativeTarget, len);
	      var from = relativeStart < 0 ? _max(len + relativeStart, 0) : _min(relativeStart, len);
	      var end;
	      if (arguments.length > 2) {
	        end = arguments[2];
	      }
	      var relativeEnd = typeof end === 'undefined' ? len : ES.ToInteger(end);
	      var finalItem = relativeEnd < 0 ? _max(len + relativeEnd, 0) : _min(relativeEnd, len);
	      var count = _min(finalItem - from, len - to);
	      var direction = 1;
	      if (from < to && to < (from + count)) {
	        direction = -1;
	        from += count - 1;
	        to += count - 1;
	      }
	      while (count > 0) {
	        if (from in o) {
	          o[to] = o[from];
	        } else {
	          delete o[to];
	        }
	        from += direction;
	        to += direction;
	        count -= 1;
	      }
	      return o;
	    },

	    fill: function fill(value) {
	      var start;
	      if (arguments.length > 1) {
	        start = arguments[1];
	      }
	      var end;
	      if (arguments.length > 2) {
	        end = arguments[2];
	      }
	      var O = ES.ToObject(this);
	      var len = ES.ToLength(O.length);
	      start = ES.ToInteger(typeof start === 'undefined' ? 0 : start);
	      end = ES.ToInteger(typeof end === 'undefined' ? len : end);

	      var relativeStart = start < 0 ? _max(len + start, 0) : _min(start, len);
	      var relativeEnd = end < 0 ? len + end : end;

	      for (var i = relativeStart; i < len && i < relativeEnd; ++i) {
	        O[i] = value;
	      }
	      return O;
	    },

	    find: function find(predicate) {
	      var list = ES.ToObject(this);
	      var length = ES.ToLength(list.length);
	      if (!ES.IsCallable(predicate)) {
	        throw new TypeError('Array#find: predicate must be a function');
	      }
	      var thisArg = arguments.length > 1 ? arguments[1] : null;
	      for (var i = 0, value; i < length; i++) {
	        value = list[i];
	        if (thisArg) {
	          if (_call(predicate, thisArg, value, i, list)) {
	            return value;
	          }
	        } else if (predicate(value, i, list)) {
	          return value;
	        }
	      }
	    },

	    findIndex: function findIndex(predicate) {
	      var list = ES.ToObject(this);
	      var length = ES.ToLength(list.length);
	      if (!ES.IsCallable(predicate)) {
	        throw new TypeError('Array#findIndex: predicate must be a function');
	      }
	      var thisArg = arguments.length > 1 ? arguments[1] : null;
	      for (var i = 0; i < length; i++) {
	        if (thisArg) {
	          if (_call(predicate, thisArg, list[i], i, list)) {
	            return i;
	          }
	        } else if (predicate(list[i], i, list)) {
	          return i;
	        }
	      }
	      return -1;
	    },

	    keys: function keys() {
	      return new ArrayIterator(this, 'key');
	    },

	    values: function values() {
	      return new ArrayIterator(this, 'value');
	    },

	    entries: function entries() {
	      return new ArrayIterator(this, 'entry');
	    }
	  };
	  // Safari 7.1 defines Array#keys and Array#entries natively,
	  // but the resulting ArrayIterator objects don't have a "next" method.
	  if (Array.prototype.keys && !ES.IsCallable([1].keys().next)) {
	    delete Array.prototype.keys;
	  }
	  if (Array.prototype.entries && !ES.IsCallable([1].entries().next)) {
	    delete Array.prototype.entries;
	  }

	  // Chrome 38 defines Array#keys and Array#entries, and Array#@@iterator, but not Array#values
	  if (Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[$iterator$]) {
	    defineProperties(Array.prototype, {
	      values: Array.prototype[$iterator$]
	    });
	    if (Type.symbol(Symbol.unscopables)) {
	      Array.prototype[Symbol.unscopables].values = true;
	    }
	  }
	  // Chrome 40 defines Array#values with the incorrect name, although Array#{keys,entries} have the correct name
	  if (functionsHaveNames && Array.prototype.values && Array.prototype.values.name !== 'values') {
	    var originalArrayPrototypeValues = Array.prototype.values;
	    overrideNative(Array.prototype, 'values', function values() { return ES.Call(originalArrayPrototypeValues, this, arguments); });
	    defineProperty(Array.prototype, $iterator$, Array.prototype.values, true);
	  }
	  defineProperties(Array.prototype, ArrayPrototypeShims);

	  if (1 / [true].indexOf(true, -0) < 0) {
	    // indexOf when given a position arg of -0 should return +0.
	    // https://github.com/tc39/ecma262/pull/316
	    defineProperty(Array.prototype, 'indexOf', function indexOf(searchElement) {
	      var value = _arrayIndexOfApply(this, arguments);
	      if (value === 0 && (1 / value) < 0) {
	        return 0;
	      }
	      return value;
	    }, true);
	  }

	  addIterator(Array.prototype, function () { return this.values(); });
	  // Chrome defines keys/values/entries on Array, but doesn't give us
	  // any way to identify its iterator.  So add our own shimmed field.
	  if (Object.getPrototypeOf) {
	    addIterator(Object.getPrototypeOf([].values()));
	  }

	  // note: this is positioned here because it relies on Array#entries
	  var arrayFromSwallowsNegativeLengths = (function () {
	    // Detects a Firefox bug in v32
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=1063993
	    return valueOrFalseIfThrows(function () {
	      return Array.from({ length: -1 }).length === 0;
	    });
	  }());
	  var arrayFromHandlesIterables = (function () {
	    // Detects a bug in Webkit nightly r181886
	    var arr = Array.from([0].entries());
	    return arr.length === 1 && isArray(arr[0]) && arr[0][0] === 0 && arr[0][1] === 0;
	  }());
	  if (!arrayFromSwallowsNegativeLengths || !arrayFromHandlesIterables) {
	    overrideNative(Array, 'from', ArrayShims.from);
	  }
	  var arrayFromHandlesUndefinedMapFunction = (function () {
	    // Microsoft Edge v0.11 throws if the mapFn argument is *provided* but undefined,
	    // but the spec doesn't care if it's provided or not - undefined doesn't throw.
	    return valueOrFalseIfThrows(function () {
	      return Array.from([0], void 0);
	    });
	  }());
	  if (!arrayFromHandlesUndefinedMapFunction) {
	    var origArrayFrom = Array.from;
	    overrideNative(Array, 'from', function from(items) {
	      if (arguments.length > 1 && typeof arguments[1] !== 'undefined') {
	        return ES.Call(origArrayFrom, this, arguments);
	      } else {
	        return _call(origArrayFrom, this, items);
	      }
	    });
	  }

	  var int32sAsOne = -(Math.pow(2, 32) - 1);
	  var toLengthsCorrectly = function (method, reversed) {
	    var obj = { length: int32sAsOne };
	    obj[reversed ? (obj.length >>> 0) - 1 : 0] = true;
	    return valueOrFalseIfThrows(function () {
	      _call(method, obj, function () {
	        // note: in nonconforming browsers, this will be called
	        // -1 >>> 0 times, which is 4294967295, so the throw matters.
	        throw new RangeError('should not reach here');
	      }, []);
	      return true;
	    });
	  };
	  if (!toLengthsCorrectly(Array.prototype.forEach)) {
	    var originalForEach = Array.prototype.forEach;
	    overrideNative(Array.prototype, 'forEach', function forEach(callbackFn) {
	      return ES.Call(originalForEach, this.length >= 0 ? this : [], arguments);
	    }, true);
	  }
	  if (!toLengthsCorrectly(Array.prototype.map)) {
	    var originalMap = Array.prototype.map;
	    overrideNative(Array.prototype, 'map', function map(callbackFn) {
	      return ES.Call(originalMap, this.length >= 0 ? this : [], arguments);
	    }, true);
	  }
	  if (!toLengthsCorrectly(Array.prototype.filter)) {
	    var originalFilter = Array.prototype.filter;
	    overrideNative(Array.prototype, 'filter', function filter(callbackFn) {
	      return ES.Call(originalFilter, this.length >= 0 ? this : [], arguments);
	    }, true);
	  }
	  if (!toLengthsCorrectly(Array.prototype.some)) {
	    var originalSome = Array.prototype.some;
	    overrideNative(Array.prototype, 'some', function some(callbackFn) {
	      return ES.Call(originalSome, this.length >= 0 ? this : [], arguments);
	    }, true);
	  }
	  if (!toLengthsCorrectly(Array.prototype.every)) {
	    var originalEvery = Array.prototype.every;
	    overrideNative(Array.prototype, 'every', function every(callbackFn) {
	      return ES.Call(originalEvery, this.length >= 0 ? this : [], arguments);
	    }, true);
	  }
	  if (!toLengthsCorrectly(Array.prototype.reduce)) {
	    var originalReduce = Array.prototype.reduce;
	    overrideNative(Array.prototype, 'reduce', function reduce(callbackFn) {
	      return ES.Call(originalReduce, this.length >= 0 ? this : [], arguments);
	    }, true);
	  }
	  if (!toLengthsCorrectly(Array.prototype.reduceRight, true)) {
	    var originalReduceRight = Array.prototype.reduceRight;
	    overrideNative(Array.prototype, 'reduceRight', function reduceRight(callbackFn) {
	      return ES.Call(originalReduceRight, this.length >= 0 ? this : [], arguments);
	    }, true);
	  }

	  var lacksOctalSupport = Number('0o10') !== 8;
	  var lacksBinarySupport = Number('0b10') !== 2;
	  var trimsNonWhitespace = _some(nonWS, function (c) {
	    return Number(c + 0 + c) === 0;
	  });
	  if (lacksOctalSupport || lacksBinarySupport || trimsNonWhitespace) {
	    var OrigNumber = Number;
	    var binaryRegex = /^0b[01]+$/i;
	    var octalRegex = /^0o[0-7]+$/i;
	    // Note that in IE 8, RegExp.prototype.test doesn't seem to exist: ie, "test" is an own property of regexes. wtf.
	    var isBinary = binaryRegex.test.bind(binaryRegex);
	    var isOctal = octalRegex.test.bind(octalRegex);
	    var toPrimitive = function (O) { // need to replace this with `es-to-primitive/es6`
	      var result;
	      if (typeof O.valueOf === 'function') {
	        result = O.valueOf();
	        if (Type.primitive(result)) {
	          return result;
	        }
	      }
	      if (typeof O.toString === 'function') {
	        result = O.toString();
	        if (Type.primitive(result)) {
	          return result;
	        }
	      }
	      throw new TypeError('No default value');
	    };
	    var hasNonWS = nonWSregex.test.bind(nonWSregex);
	    var isBadHex = isBadHexRegex.test.bind(isBadHexRegex);
	    var NumberShim = (function () {
	      // this is wrapped in an IIFE because of IE 6-8's wacky scoping issues with named function expressions.
	      var NumberShim = function Number(value) {
	        var primValue;
	        if (arguments.length > 0) {
	          primValue = Type.primitive(value) ? value : toPrimitive(value, 'number');
	        } else {
	          primValue = 0;
	        }
	        if (typeof primValue === 'string') {
	          primValue = ES.Call(trimShim, primValue);
	          if (isBinary(primValue)) {
	            primValue = parseInt(_strSlice(primValue, 2), 2);
	          } else if (isOctal(primValue)) {
	            primValue = parseInt(_strSlice(primValue, 2), 8);
	          } else if (hasNonWS(primValue) || isBadHex(primValue)) {
	            primValue = NaN;
	          }
	        }
	        var receiver = this;
	        var valueOfSucceeds = valueOrFalseIfThrows(function () {
	          OrigNumber.prototype.valueOf.call(receiver);
	          return true;
	        });
	        if (receiver instanceof NumberShim && !valueOfSucceeds) {
	          return new OrigNumber(primValue);
	        }
	        /* jshint newcap: false */
	        return OrigNumber(primValue);
	        /* jshint newcap: true */
	      };
	      return NumberShim;
	    }());
	    wrapConstructor(OrigNumber, NumberShim, {});
	    // this is necessary for ES3 browsers, where these properties are non-enumerable.
	    defineProperties(NumberShim, {
	      NaN: OrigNumber.NaN,
	      MAX_VALUE: OrigNumber.MAX_VALUE,
	      MIN_VALUE: OrigNumber.MIN_VALUE,
	      NEGATIVE_INFINITY: OrigNumber.NEGATIVE_INFINITY,
	      POSITIVE_INFINITY: OrigNumber.POSITIVE_INFINITY
	    });
	    /* globals Number: true */
	    /* eslint-disable no-undef, no-global-assign */
	    /* jshint -W020 */
	    Number = NumberShim;
	    Value.redefine(globals, 'Number', NumberShim);
	    /* jshint +W020 */
	    /* eslint-enable no-undef, no-global-assign */
	    /* globals Number: false */
	  }

	  var maxSafeInteger = Math.pow(2, 53) - 1;
	  defineProperties(Number, {
	    MAX_SAFE_INTEGER: maxSafeInteger,
	    MIN_SAFE_INTEGER: -maxSafeInteger,
	    EPSILON: 2.220446049250313e-16,

	    parseInt: globals.parseInt,
	    parseFloat: globals.parseFloat,

	    isFinite: numberIsFinite,

	    isInteger: function isInteger(value) {
	      return numberIsFinite(value) && ES.ToInteger(value) === value;
	    },

	    isSafeInteger: function isSafeInteger(value) {
	      return Number.isInteger(value) && _abs(value) <= Number.MAX_SAFE_INTEGER;
	    },

	    isNaN: numberIsNaN
	  });
	  // Firefox 37 has a conforming Number.parseInt, but it's not === to the global parseInt (fixed in v40)
	  defineProperty(Number, 'parseInt', globals.parseInt, Number.parseInt !== globals.parseInt);

	  // Work around bugs in Array#find and Array#findIndex -- early
	  // implementations skipped holes in sparse arrays. (Note that the
	  // implementations of find/findIndex indirectly use shimmed
	  // methods of Number, so this test has to happen down here.)
	  /*jshint elision: true */
	  /* eslint-disable no-sparse-arrays */
	  if (![, 1].find(function (item, idx) { return idx === 0; })) {
	    overrideNative(Array.prototype, 'find', ArrayPrototypeShims.find);
	  }
	  if ([, 1].findIndex(function (item, idx) { return idx === 0; }) !== 0) {
	    overrideNative(Array.prototype, 'findIndex', ArrayPrototypeShims.findIndex);
	  }
	  /* eslint-enable no-sparse-arrays */
	  /*jshint elision: false */

	  var isEnumerableOn = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable);
	  var ensureEnumerable = function ensureEnumerable(obj, prop) {
	    if (supportsDescriptors && isEnumerableOn(obj, prop)) {
	      Object.defineProperty(obj, prop, { enumerable: false });
	    }
	  };
	  var sliceArgs = function sliceArgs() {
	    // per https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
	    // and https://gist.github.com/WebReflection/4327762cb87a8c634a29
	    var initial = Number(this);
	    var len = arguments.length;
	    var desiredArgCount = len - initial;
	    var args = new Array(desiredArgCount < 0 ? 0 : desiredArgCount);
	    for (var i = initial; i < len; ++i) {
	      args[i - initial] = arguments[i];
	    }
	    return args;
	  };
	  var assignTo = function assignTo(source) {
	    return function assignToSource(target, key) {
	      target[key] = source[key];
	      return target;
	    };
	  };
	  var assignReducer = function (target, source) {
	    var sourceKeys = keys(Object(source));
	    var symbols;
	    if (ES.IsCallable(Object.getOwnPropertySymbols)) {
	      symbols = _filter(Object.getOwnPropertySymbols(Object(source)), isEnumerableOn(source));
	    }
	    return _reduce(_concat(sourceKeys, symbols || []), assignTo(source), target);
	  };

	  var ObjectShims = {
	    // 19.1.3.1
	    assign: function (target, source) {
	      var to = ES.ToObject(target, 'Cannot convert undefined or null to object');
	      return _reduce(ES.Call(sliceArgs, 1, arguments), assignReducer, to);
	    },

	    // Added in WebKit in https://bugs.webkit.org/show_bug.cgi?id=143865
	    is: function is(a, b) {
	      return ES.SameValue(a, b);
	    }
	  };
	  var assignHasPendingExceptions = Object.assign && Object.preventExtensions && (function () {
	    // Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	    // which is 72% slower than our shim, and Firefox 40's native implementation.
	    var thrower = Object.preventExtensions({ 1: 2 });
	    try {
	      Object.assign(thrower, 'xy');
	    } catch (e) {
	      return thrower[1] === 'y';
	    }
	  }());
	  if (assignHasPendingExceptions) {
	    overrideNative(Object, 'assign', ObjectShims.assign);
	  }
	  defineProperties(Object, ObjectShims);

	  if (supportsDescriptors) {
	    var ES5ObjectShims = {
	      // 19.1.3.9
	      // shim from https://gist.github.com/WebReflection/5593554
	      setPrototypeOf: (function (Object, magic) {
	        var set;

	        var checkArgs = function (O, proto) {
	          if (!ES.TypeIsObject(O)) {
	            throw new TypeError('cannot set prototype on a non-object');
	          }
	          if (!(proto === null || ES.TypeIsObject(proto))) {
	            throw new TypeError('can only set prototype to an object or null' + proto);
	          }
	        };

	        var setPrototypeOf = function (O, proto) {
	          checkArgs(O, proto);
	          _call(set, O, proto);
	          return O;
	        };

	        try {
	          // this works already in Firefox and Safari
	          set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
	          _call(set, {}, null);
	        } catch (e) {
	          if (Object.prototype !== {}[magic]) {
	            // IE < 11 cannot be shimmed
	            return;
	          }
	          // probably Chrome or some old Mobile stock browser
	          set = function (proto) {
	            this[magic] = proto;
	          };
	          // please note that this will **not** work
	          // in those browsers that do not inherit
	          // __proto__ by mistake from Object.prototype
	          // in these cases we should probably throw an error
	          // or at least be informed about the issue
	          setPrototypeOf.polyfill = setPrototypeOf(
	            setPrototypeOf({}, null),
	            Object.prototype
	          ) instanceof Object;
	          // setPrototypeOf.polyfill === true means it works as meant
	          // setPrototypeOf.polyfill === false means it's not 100% reliable
	          // setPrototypeOf.polyfill === undefined
	          // or
	          // setPrototypeOf.polyfill ==  null means it's not a polyfill
	          // which means it works as expected
	          // we can even delete Object.prototype.__proto__;
	        }
	        return setPrototypeOf;
	      }(Object, '__proto__'))
	    };

	    defineProperties(Object, ES5ObjectShims);
	  }

	  // Workaround bug in Opera 12 where setPrototypeOf(x, null) doesn't work,
	  // but Object.create(null) does.
	  if (Object.setPrototypeOf && Object.getPrototypeOf &&
	      Object.getPrototypeOf(Object.setPrototypeOf({}, null)) !== null &&
	      Object.getPrototypeOf(Object.create(null)) === null) {
	    (function () {
	      var FAKENULL = Object.create(null);
	      var gpo = Object.getPrototypeOf;
	      var spo = Object.setPrototypeOf;
	      Object.getPrototypeOf = function (o) {
	        var result = gpo(o);
	        return result === FAKENULL ? null : result;
	      };
	      Object.setPrototypeOf = function (o, p) {
	        var proto = p === null ? FAKENULL : p;
	        return spo(o, proto);
	      };
	      Object.setPrototypeOf.polyfill = false;
	    }());
	  }

	  var objectKeysAcceptsPrimitives = !throwsError(function () { Object.keys('foo'); });
	  if (!objectKeysAcceptsPrimitives) {
	    var originalObjectKeys = Object.keys;
	    overrideNative(Object, 'keys', function keys(value) {
	      return originalObjectKeys(ES.ToObject(value));
	    });
	    keys = Object.keys;
	  }
	  var objectKeysRejectsRegex = throwsError(function () { Object.keys(/a/g); });
	  if (objectKeysRejectsRegex) {
	    var regexRejectingObjectKeys = Object.keys;
	    overrideNative(Object, 'keys', function keys(value) {
	      if (Type.regex(value)) {
	        var regexKeys = [];
	        for (var k in value) {
	          if (_hasOwnProperty(value, k)) {
	            _push(regexKeys, k);
	          }
	        }
	        return regexKeys;
	      }
	      return regexRejectingObjectKeys(value);
	    });
	    keys = Object.keys;
	  }

	  if (Object.getOwnPropertyNames) {
	    var objectGOPNAcceptsPrimitives = !throwsError(function () { Object.getOwnPropertyNames('foo'); });
	    if (!objectGOPNAcceptsPrimitives) {
	      var cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [];
	      var originalObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
	      overrideNative(Object, 'getOwnPropertyNames', function getOwnPropertyNames(value) {
	        var val = ES.ToObject(value);
	        if (_toString(val) === '[object Window]') {
	          try {
	            return originalObjectGetOwnPropertyNames(val);
	          } catch (e) {
	            // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
	            return _concat([], cachedWindowNames);
	          }
	        }
	        return originalObjectGetOwnPropertyNames(val);
	      });
	    }
	  }
	  if (Object.getOwnPropertyDescriptor) {
	    var objectGOPDAcceptsPrimitives = !throwsError(function () { Object.getOwnPropertyDescriptor('foo', 'bar'); });
	    if (!objectGOPDAcceptsPrimitives) {
	      var originalObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	      overrideNative(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(value, property) {
	        return originalObjectGetOwnPropertyDescriptor(ES.ToObject(value), property);
	      });
	    }
	  }
	  if (Object.seal) {
	    var objectSealAcceptsPrimitives = !throwsError(function () { Object.seal('foo'); });
	    if (!objectSealAcceptsPrimitives) {
	      var originalObjectSeal = Object.seal;
	      overrideNative(Object, 'seal', function seal(value) {
	        if (!ES.TypeIsObject(value)) { return value; }
	        return originalObjectSeal(value);
	      });
	    }
	  }
	  if (Object.isSealed) {
	    var objectIsSealedAcceptsPrimitives = !throwsError(function () { Object.isSealed('foo'); });
	    if (!objectIsSealedAcceptsPrimitives) {
	      var originalObjectIsSealed = Object.isSealed;
	      overrideNative(Object, 'isSealed', function isSealed(value) {
	        if (!ES.TypeIsObject(value)) { return true; }
	        return originalObjectIsSealed(value);
	      });
	    }
	  }
	  if (Object.freeze) {
	    var objectFreezeAcceptsPrimitives = !throwsError(function () { Object.freeze('foo'); });
	    if (!objectFreezeAcceptsPrimitives) {
	      var originalObjectFreeze = Object.freeze;
	      overrideNative(Object, 'freeze', function freeze(value) {
	        if (!ES.TypeIsObject(value)) { return value; }
	        return originalObjectFreeze(value);
	      });
	    }
	  }
	  if (Object.isFrozen) {
	    var objectIsFrozenAcceptsPrimitives = !throwsError(function () { Object.isFrozen('foo'); });
	    if (!objectIsFrozenAcceptsPrimitives) {
	      var originalObjectIsFrozen = Object.isFrozen;
	      overrideNative(Object, 'isFrozen', function isFrozen(value) {
	        if (!ES.TypeIsObject(value)) { return true; }
	        return originalObjectIsFrozen(value);
	      });
	    }
	  }
	  if (Object.preventExtensions) {
	    var objectPreventExtensionsAcceptsPrimitives = !throwsError(function () { Object.preventExtensions('foo'); });
	    if (!objectPreventExtensionsAcceptsPrimitives) {
	      var originalObjectPreventExtensions = Object.preventExtensions;
	      overrideNative(Object, 'preventExtensions', function preventExtensions(value) {
	        if (!ES.TypeIsObject(value)) { return value; }
	        return originalObjectPreventExtensions(value);
	      });
	    }
	  }
	  if (Object.isExtensible) {
	    var objectIsExtensibleAcceptsPrimitives = !throwsError(function () { Object.isExtensible('foo'); });
	    if (!objectIsExtensibleAcceptsPrimitives) {
	      var originalObjectIsExtensible = Object.isExtensible;
	      overrideNative(Object, 'isExtensible', function isExtensible(value) {
	        if (!ES.TypeIsObject(value)) { return false; }
	        return originalObjectIsExtensible(value);
	      });
	    }
	  }
	  if (Object.getPrototypeOf) {
	    var objectGetProtoAcceptsPrimitives = !throwsError(function () { Object.getPrototypeOf('foo'); });
	    if (!objectGetProtoAcceptsPrimitives) {
	      var originalGetProto = Object.getPrototypeOf;
	      overrideNative(Object, 'getPrototypeOf', function getPrototypeOf(value) {
	        return originalGetProto(ES.ToObject(value));
	      });
	    }
	  }

	  var hasFlags = supportsDescriptors && (function () {
	    var desc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags');
	    return desc && ES.IsCallable(desc.get);
	  }());
	  if (supportsDescriptors && !hasFlags) {
	    var regExpFlagsGetter = function flags() {
	      if (!ES.TypeIsObject(this)) {
	        throw new TypeError('Method called on incompatible type: must be an object.');
	      }
	      var result = '';
	      if (this.global) {
	        result += 'g';
	      }
	      if (this.ignoreCase) {
	        result += 'i';
	      }
	      if (this.multiline) {
	        result += 'm';
	      }
	      if (this.unicode) {
	        result += 'u';
	      }
	      if (this.sticky) {
	        result += 'y';
	      }
	      return result;
	    };

	    Value.getter(RegExp.prototype, 'flags', regExpFlagsGetter);
	  }

	  var regExpSupportsFlagsWithRegex = supportsDescriptors && valueOrFalseIfThrows(function () {
	    return String(new RegExp(/a/g, 'i')) === '/a/i';
	  });
	  var regExpNeedsToSupportSymbolMatch = hasSymbols && supportsDescriptors && (function () {
	    // Edge 0.12 supports flags fully, but does not support Symbol.match
	    var regex = /./;
	    regex[Symbol.match] = false;
	    return RegExp(regex) === regex;
	  }());

	  var regexToStringIsGeneric = valueOrFalseIfThrows(function () {
	    return RegExp.prototype.toString.call({ source: 'abc' }) === '/abc/';
	  });
	  var regexToStringSupportsGenericFlags = regexToStringIsGeneric && valueOrFalseIfThrows(function () {
	    return RegExp.prototype.toString.call({ source: 'a', flags: 'b' }) === '/a/b';
	  });
	  if (!regexToStringIsGeneric || !regexToStringSupportsGenericFlags) {
	    var origRegExpToString = RegExp.prototype.toString;
	    defineProperty(RegExp.prototype, 'toString', function toString() {
	      var R = ES.RequireObjectCoercible(this);
	      if (Type.regex(R)) {
	        return _call(origRegExpToString, R);
	      }
	      var pattern = $String(R.source);
	      var flags = $String(R.flags);
	      return '/' + pattern + '/' + flags;
	    }, true);
	    Value.preserveToString(RegExp.prototype.toString, origRegExpToString);
	  }

	  if (supportsDescriptors && (!regExpSupportsFlagsWithRegex || regExpNeedsToSupportSymbolMatch)) {
	    var flagsGetter = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get;
	    var sourceDesc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'source') || {};
	    var legacySourceGetter = function () {
	      // prior to it being a getter, it's own + nonconfigurable
	      return this.source;
	    };
	    var sourceGetter = ES.IsCallable(sourceDesc.get) ? sourceDesc.get : legacySourceGetter;

	    var OrigRegExp = RegExp;
	    var RegExpShim = (function () {
	      return function RegExp(pattern, flags) {
	        var patternIsRegExp = ES.IsRegExp(pattern);
	        var calledWithNew = this instanceof RegExp;
	        if (!calledWithNew && patternIsRegExp && typeof flags === 'undefined' && pattern.constructor === RegExp) {
	          return pattern;
	        }

	        var P = pattern;
	        var F = flags;
	        if (Type.regex(pattern)) {
	          P = ES.Call(sourceGetter, pattern);
	          F = typeof flags === 'undefined' ? ES.Call(flagsGetter, pattern) : flags;
	          return new RegExp(P, F);
	        } else if (patternIsRegExp) {
	          P = pattern.source;
	          F = typeof flags === 'undefined' ? pattern.flags : flags;
	        }
	        return new OrigRegExp(pattern, flags);
	      };
	    }());
	    wrapConstructor(OrigRegExp, RegExpShim, {
	      $input: true // Chrome < v39 & Opera < 26 have a nonstandard "$input" property
	    });
	    /* globals RegExp: true */
	    /* eslint-disable no-undef, no-global-assign */
	    /* jshint -W020 */
	    RegExp = RegExpShim;
	    Value.redefine(globals, 'RegExp', RegExpShim);
	    /* jshint +W020 */
	    /* eslint-enable no-undef, no-global-assign */
	    /* globals RegExp: false */
	  }

	  if (supportsDescriptors) {
	    var regexGlobals = {
	      input: '$_',
	      lastMatch: '$&',
	      lastParen: '$+',
	      leftContext: '$`',
	      rightContext: '$\''
	    };
	    _forEach(keys(regexGlobals), function (prop) {
	      if (prop in RegExp && !(regexGlobals[prop] in RegExp)) {
	        Value.getter(RegExp, regexGlobals[prop], function get() {
	          return RegExp[prop];
	        });
	      }
	    });
	  }
	  addDefaultSpecies(RegExp);

	  var inverseEpsilon = 1 / Number.EPSILON;
	  var roundTiesToEven = function roundTiesToEven(n) {
	    // Even though this reduces down to `return n`, it takes advantage of built-in rounding.
	    return (n + inverseEpsilon) - inverseEpsilon;
	  };
	  var BINARY_32_EPSILON = Math.pow(2, -23);
	  var BINARY_32_MAX_VALUE = Math.pow(2, 127) * (2 - BINARY_32_EPSILON);
	  var BINARY_32_MIN_VALUE = Math.pow(2, -126);
	  var E = Math.E;
	  var LOG2E = Math.LOG2E;
	  var LOG10E = Math.LOG10E;
	  var numberCLZ = Number.prototype.clz;
	  delete Number.prototype.clz; // Safari 8 has Number#clz

	  var MathShims = {
	    acosh: function acosh(value) {
	      var x = Number(value);
	      if (numberIsNaN(x) || value < 1) { return NaN; }
	      if (x === 1) { return 0; }
	      if (x === Infinity) { return x; }
	      return _log((x / E) + (_sqrt(x + 1) * _sqrt(x - 1) / E)) + 1;
	    },

	    asinh: function asinh(value) {
	      var x = Number(value);
	      if (x === 0 || !globalIsFinite(x)) {
	        return x;
	      }
	      return x < 0 ? -asinh(-x) : _log(x + _sqrt((x * x) + 1));
	    },

	    atanh: function atanh(value) {
	      var x = Number(value);
	      if (numberIsNaN(x) || x < -1 || x > 1) {
	        return NaN;
	      }
	      if (x === -1) { return -Infinity; }
	      if (x === 1) { return Infinity; }
	      if (x === 0) { return x; }
	      return 0.5 * _log((1 + x) / (1 - x));
	    },

	    cbrt: function cbrt(value) {
	      var x = Number(value);
	      if (x === 0) { return x; }
	      var negate = x < 0;
	      var result;
	      if (negate) { x = -x; }
	      if (x === Infinity) {
	        result = Infinity;
	      } else {
	        result = _exp(_log(x) / 3);
	        // from http://en.wikipedia.org/wiki/Cube_root#Numerical_methods
	        result = ((x / (result * result)) + (2 * result)) / 3;
	      }
	      return negate ? -result : result;
	    },

	    clz32: function clz32(value) {
	      // See https://bugs.ecmascript.org/show_bug.cgi?id=2465
	      var x = Number(value);
	      var number = ES.ToUint32(x);
	      if (number === 0) {
	        return 32;
	      }
	      return numberCLZ ? ES.Call(numberCLZ, number) : 31 - _floor(_log(number + 0.5) * LOG2E);
	    },

	    cosh: function cosh(value) {
	      var x = Number(value);
	      if (x === 0) { return 1; } // +0 or -0
	      if (numberIsNaN(x)) { return NaN; }
	      if (!globalIsFinite(x)) { return Infinity; }
	      if (x < 0) { x = -x; }
	      if (x > 21) { return _exp(x) / 2; }
	      return (_exp(x) + _exp(-x)) / 2;
	    },

	    expm1: function expm1(value) {
	      var x = Number(value);
	      if (x === -Infinity) { return -1; }
	      if (!globalIsFinite(x) || x === 0) { return x; }
	      if (_abs(x) > 0.5) {
	        return _exp(x) - 1;
	      }
	      // A more precise approximation using Taylor series expansion
	      // from https://github.com/paulmillr/es6-shim/issues/314#issuecomment-70293986
	      var t = x;
	      var sum = 0;
	      var n = 1;
	      while (sum + t !== sum) {
	        sum += t;
	        n += 1;
	        t *= x / n;
	      }
	      return sum;
	    },

	    hypot: function hypot(x, y) {
	      var result = 0;
	      var largest = 0;
	      for (var i = 0; i < arguments.length; ++i) {
	        var value = _abs(Number(arguments[i]));
	        if (largest < value) {
	          result *= (largest / value) * (largest / value);
	          result += 1;
	          largest = value;
	        } else {
	          result += value > 0 ? (value / largest) * (value / largest) : value;
	        }
	      }
	      return largest === Infinity ? Infinity : largest * _sqrt(result);
	    },

	    log2: function log2(value) {
	      return _log(value) * LOG2E;
	    },

	    log10: function log10(value) {
	      return _log(value) * LOG10E;
	    },

	    log1p: function log1p(value) {
	      var x = Number(value);
	      if (x < -1 || numberIsNaN(x)) { return NaN; }
	      if (x === 0 || x === Infinity) { return x; }
	      if (x === -1) { return -Infinity; }

	      return (1 + x) - 1 === 0 ? x : x * (_log(1 + x) / ((1 + x) - 1));
	    },

	    sign: _sign,

	    sinh: function sinh(value) {
	      var x = Number(value);
	      if (!globalIsFinite(x) || x === 0) { return x; }

	      if (_abs(x) < 1) {
	        return (Math.expm1(x) - Math.expm1(-x)) / 2;
	      }
	      return (_exp(x - 1) - _exp(-x - 1)) * E / 2;
	    },

	    tanh: function tanh(value) {
	      var x = Number(value);
	      if (numberIsNaN(x) || x === 0) { return x; }
	      // can exit early at +-20 as JS loses precision for true value at this integer
	      if (x >= 20) { return 1; }
	      if (x <= -20) { return -1; }

	      return (Math.expm1(x) - Math.expm1(-x)) / (_exp(x) + _exp(-x));
	    },

	    trunc: function trunc(value) {
	      var x = Number(value);
	      return x < 0 ? -_floor(-x) : _floor(x);
	    },

	    imul: function imul(x, y) {
	      // taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
	      var a = ES.ToUint32(x);
	      var b = ES.ToUint32(y);
	      var ah = (a >>> 16) & 0xffff;
	      var al = a & 0xffff;
	      var bh = (b >>> 16) & 0xffff;
	      var bl = b & 0xffff;
	      // the shift by 0 fixes the sign on the high part
	      // the final |0 converts the unsigned value into a signed value
	      return (al * bl) + ((((ah * bl) + (al * bh)) << 16) >>> 0) | 0;
	    },

	    fround: function fround(x) {
	      var v = Number(x);
	      if (v === 0 || v === Infinity || v === -Infinity || numberIsNaN(v)) {
	        return v;
	      }
	      var sign = _sign(v);
	      var abs = _abs(v);
	      if (abs < BINARY_32_MIN_VALUE) {
	        return sign * roundTiesToEven(
	          abs / BINARY_32_MIN_VALUE / BINARY_32_EPSILON
	        ) * BINARY_32_MIN_VALUE * BINARY_32_EPSILON;
	      }
	      // Veltkamp's splitting (?)
	      var a = (1 + (BINARY_32_EPSILON / Number.EPSILON)) * abs;
	      var result = a - (a - abs);
	      if (result > BINARY_32_MAX_VALUE || numberIsNaN(result)) {
	        return sign * Infinity;
	      }
	      return sign * result;
	    }
	  };
	  defineProperties(Math, MathShims);
	  // IE 11 TP has an imprecise log1p: reports Math.log1p(-1e-17) as 0
	  defineProperty(Math, 'log1p', MathShims.log1p, Math.log1p(-1e-17) !== -1e-17);
	  // IE 11 TP has an imprecise asinh: reports Math.asinh(-1e7) as not exactly equal to -Math.asinh(1e7)
	  defineProperty(Math, 'asinh', MathShims.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7));
	  // Chrome 40 has an imprecise Math.tanh with very small numbers
	  defineProperty(Math, 'tanh', MathShims.tanh, Math.tanh(-2e-17) !== -2e-17);
	  // Chrome 40 loses Math.acosh precision with high numbers
	  defineProperty(Math, 'acosh', MathShims.acosh, Math.acosh(Number.MAX_VALUE) === Infinity);
	  // Firefox 38 on Windows
	  defineProperty(Math, 'cbrt', MathShims.cbrt, Math.abs(1 - (Math.cbrt(1e-300) / 1e-100)) / Number.EPSILON > 8);
	  // node 0.11 has an imprecise Math.sinh with very small numbers
	  defineProperty(Math, 'sinh', MathShims.sinh, Math.sinh(-2e-17) !== -2e-17);
	  // FF 35 on Linux reports 22025.465794806725 for Math.expm1(10)
	  var expm1OfTen = Math.expm1(10);
	  defineProperty(Math, 'expm1', MathShims.expm1, expm1OfTen > 22025.465794806719 || expm1OfTen < 22025.4657948067165168);

	  var origMathRound = Math.round;
	  // breaks in e.g. Safari 8, Internet Explorer 11, Opera 12
	  var roundHandlesBoundaryConditions = Math.round(0.5 - (Number.EPSILON / 4)) === 0 &&
	    Math.round(-0.5 + (Number.EPSILON / 3.99)) === 1;

	  // When engines use Math.floor(x + 0.5) internally, Math.round can be buggy for large integers.
	  // This behavior should be governed by "round to nearest, ties to even mode"
	  // see http://www.ecma-international.org/ecma-262/6.0/#sec-terms-and-definitions-number-type
	  // These are the boundary cases where it breaks.
	  var smallestPositiveNumberWhereRoundBreaks = inverseEpsilon + 1;
	  var largestPositiveNumberWhereRoundBreaks = (2 * inverseEpsilon) - 1;
	  var roundDoesNotIncreaseIntegers = [
	    smallestPositiveNumberWhereRoundBreaks,
	    largestPositiveNumberWhereRoundBreaks
	  ].every(function (num) {
	    return Math.round(num) === num;
	  });
	  defineProperty(Math, 'round', function round(x) {
	    var floor = _floor(x);
	    var ceil = floor === -1 ? -0 : floor + 1;
	    return x - floor < 0.5 ? floor : ceil;
	  }, !roundHandlesBoundaryConditions || !roundDoesNotIncreaseIntegers);
	  Value.preserveToString(Math.round, origMathRound);

	  var origImul = Math.imul;
	  if (Math.imul(0xffffffff, 5) !== -5) {
	    // Safari 6.1, at least, reports "0" for this value
	    Math.imul = MathShims.imul;
	    Value.preserveToString(Math.imul, origImul);
	  }
	  if (Math.imul.length !== 2) {
	    // Safari 8.0.4 has a length of 1
	    // fixed in https://bugs.webkit.org/show_bug.cgi?id=143658
	    overrideNative(Math, 'imul', function imul(x, y) {
	      return ES.Call(origImul, Math, arguments);
	    });
	  }

	  // Promises
	  // Simplest possible implementation; use a 3rd-party library if you
	  // want the best possible speed and/or long stack traces.
	  var PromiseShim = (function () {
	    var setTimeout = globals.setTimeout;
	    // some environments don't have setTimeout - no way to shim here.
	    if (typeof setTimeout !== 'function' && typeof setTimeout !== 'object') { return; }

	    ES.IsPromise = function (promise) {
	      if (!ES.TypeIsObject(promise)) {
	        return false;
	      }
	      if (typeof promise._promise === 'undefined') {
	        return false; // uninitialized, or missing our hidden field.
	      }
	      return true;
	    };

	    // "PromiseCapability" in the spec is what most promise implementations
	    // call a "deferred".
	    var PromiseCapability = function (C) {
	      if (!ES.IsConstructor(C)) {
	        throw new TypeError('Bad promise constructor');
	      }
	      var capability = this;
	      var resolver = function (resolve, reject) {
	        if (capability.resolve !== void 0 || capability.reject !== void 0) {
	          throw new TypeError('Bad Promise implementation!');
	        }
	        capability.resolve = resolve;
	        capability.reject = reject;
	      };
	      // Initialize fields to inform optimizers about the object shape.
	      capability.resolve = void 0;
	      capability.reject = void 0;
	      capability.promise = new C(resolver);
	      if (!(ES.IsCallable(capability.resolve) && ES.IsCallable(capability.reject))) {
	        throw new TypeError('Bad promise constructor');
	      }
	    };

	    // find an appropriate setImmediate-alike
	    var makeZeroTimeout;
	    /*global window */
	    if (typeof window !== 'undefined' && ES.IsCallable(window.postMessage)) {
	      makeZeroTimeout = function () {
	        // from http://dbaron.org/log/20100309-faster-timeouts
	        var timeouts = [];
	        var messageName = 'zero-timeout-message';
	        var setZeroTimeout = function (fn) {
	          _push(timeouts, fn);
	          window.postMessage(messageName, '*');
	        };
	        var handleMessage = function (event) {
	          if (event.source === window && event.data === messageName) {
	            event.stopPropagation();
	            if (timeouts.length === 0) { return; }
	            var fn = _shift(timeouts);
	            fn();
	          }
	        };
	        window.addEventListener('message', handleMessage, true);
	        return setZeroTimeout;
	      };
	    }
	    var makePromiseAsap = function () {
	      // An efficient task-scheduler based on a pre-existing Promise
	      // implementation, which we can use even if we override the
	      // global Promise below (in order to workaround bugs)
	      // https://github.com/Raynos/observ-hash/issues/2#issuecomment-35857671
	      var P = globals.Promise;
	      var pr = P && P.resolve && P.resolve();
	      return pr && function (task) {
	        return pr.then(task);
	      };
	    };
	    /*global process */
	    /* jscs:disable disallowMultiLineTernary */
	    var enqueue = ES.IsCallable(globals.setImmediate) ?
	      globals.setImmediate :
	      typeof process === 'object' && process.nextTick ? process.nextTick :
	      makePromiseAsap() ||
	      (ES.IsCallable(makeZeroTimeout) ? makeZeroTimeout() :
	      function (task) { setTimeout(task, 0); }); // fallback
	    /* jscs:enable disallowMultiLineTernary */

	    // Constants for Promise implementation
	    var PROMISE_IDENTITY = function (x) { return x; };
	    var PROMISE_THROWER = function (e) { throw e; };
	    var PROMISE_PENDING = 0;
	    var PROMISE_FULFILLED = 1;
	    var PROMISE_REJECTED = 2;
	    // We store fulfill/reject handlers and capabilities in a single array.
	    var PROMISE_FULFILL_OFFSET = 0;
	    var PROMISE_REJECT_OFFSET = 1;
	    var PROMISE_CAPABILITY_OFFSET = 2;
	    // This is used in an optimization for chaining promises via then.
	    var PROMISE_FAKE_CAPABILITY = {};

	    var enqueuePromiseReactionJob = function (handler, capability, argument) {
	      enqueue(function () {
	        promiseReactionJob(handler, capability, argument);
	      });
	    };

	    var promiseReactionJob = function (handler, promiseCapability, argument) {
	      var handlerResult, f;
	      if (promiseCapability === PROMISE_FAKE_CAPABILITY) {
	        // Fast case, when we don't actually need to chain through to a
	        // (real) promiseCapability.
	        return handler(argument);
	      }
	      try {
	        handlerResult = handler(argument);
	        f = promiseCapability.resolve;
	      } catch (e) {
	        handlerResult = e;
	        f = promiseCapability.reject;
	      }
	      f(handlerResult);
	    };

	    var fulfillPromise = function (promise, value) {
	      var _promise = promise._promise;
	      var length = _promise.reactionLength;
	      if (length > 0) {
	        enqueuePromiseReactionJob(
	          _promise.fulfillReactionHandler0,
	          _promise.reactionCapability0,
	          value
	        );
	        _promise.fulfillReactionHandler0 = void 0;
	        _promise.rejectReactions0 = void 0;
	        _promise.reactionCapability0 = void 0;
	        if (length > 1) {
	          for (var i = 1, idx = 0; i < length; i++, idx += 3) {
	            enqueuePromiseReactionJob(
	              _promise[idx + PROMISE_FULFILL_OFFSET],
	              _promise[idx + PROMISE_CAPABILITY_OFFSET],
	              value
	            );
	            promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
	            promise[idx + PROMISE_REJECT_OFFSET] = void 0;
	            promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
	          }
	        }
	      }
	      _promise.result = value;
	      _promise.state = PROMISE_FULFILLED;
	      _promise.reactionLength = 0;
	    };

	    var rejectPromise = function (promise, reason) {
	      var _promise = promise._promise;
	      var length = _promise.reactionLength;
	      if (length > 0) {
	        enqueuePromiseReactionJob(
	          _promise.rejectReactionHandler0,
	          _promise.reactionCapability0,
	          reason
	        );
	        _promise.fulfillReactionHandler0 = void 0;
	        _promise.rejectReactions0 = void 0;
	        _promise.reactionCapability0 = void 0;
	        if (length > 1) {
	          for (var i = 1, idx = 0; i < length; i++, idx += 3) {
	            enqueuePromiseReactionJob(
	              _promise[idx + PROMISE_REJECT_OFFSET],
	              _promise[idx + PROMISE_CAPABILITY_OFFSET],
	              reason
	            );
	            promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
	            promise[idx + PROMISE_REJECT_OFFSET] = void 0;
	            promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
	          }
	        }
	      }
	      _promise.result = reason;
	      _promise.state = PROMISE_REJECTED;
	      _promise.reactionLength = 0;
	    };

	    var createResolvingFunctions = function (promise) {
	      var alreadyResolved = false;
	      var resolve = function (resolution) {
	        var then;
	        if (alreadyResolved) { return; }
	        alreadyResolved = true;
	        if (resolution === promise) {
	          return rejectPromise(promise, new TypeError('Self resolution'));
	        }
	        if (!ES.TypeIsObject(resolution)) {
	          return fulfillPromise(promise, resolution);
	        }
	        try {
	          then = resolution.then;
	        } catch (e) {
	          return rejectPromise(promise, e);
	        }
	        if (!ES.IsCallable(then)) {
	          return fulfillPromise(promise, resolution);
	        }
	        enqueue(function () {
	          promiseResolveThenableJob(promise, resolution, then);
	        });
	      };
	      var reject = function (reason) {
	        if (alreadyResolved) { return; }
	        alreadyResolved = true;
	        return rejectPromise(promise, reason);
	      };
	      return { resolve: resolve, reject: reject };
	    };

	    var optimizedThen = function (then, thenable, resolve, reject) {
	      // Optimization: since we discard the result, we can pass our
	      // own then implementation a special hint to let it know it
	      // doesn't have to create it.  (The PROMISE_FAKE_CAPABILITY
	      // object is local to this implementation and unforgeable outside.)
	      if (then === Promise$prototype$then) {
	        _call(then, thenable, resolve, reject, PROMISE_FAKE_CAPABILITY);
	      } else {
	        _call(then, thenable, resolve, reject);
	      }
	    };
	    var promiseResolveThenableJob = function (promise, thenable, then) {
	      var resolvingFunctions = createResolvingFunctions(promise);
	      var resolve = resolvingFunctions.resolve;
	      var reject = resolvingFunctions.reject;
	      try {
	        optimizedThen(then, thenable, resolve, reject);
	      } catch (e) {
	        reject(e);
	      }
	    };

	    var Promise$prototype, Promise$prototype$then;
	    var Promise = (function () {
	      var PromiseShim = function Promise(resolver) {
	        if (!(this instanceof PromiseShim)) {
	          throw new TypeError('Constructor Promise requires "new"');
	        }
	        if (this && this._promise) {
	          throw new TypeError('Bad construction');
	        }
	        // see https://bugs.ecmascript.org/show_bug.cgi?id=2482
	        if (!ES.IsCallable(resolver)) {
	          throw new TypeError('not a valid resolver');
	        }
	        var promise = emulateES6construct(this, PromiseShim, Promise$prototype, {
	          _promise: {
	            result: void 0,
	            state: PROMISE_PENDING,
	            // The first member of the "reactions" array is inlined here,
	            // since most promises only have one reaction.
	            // We've also exploded the 'reaction' object to inline the
	            // "handler" and "capability" fields, since both fulfill and
	            // reject reactions share the same capability.
	            reactionLength: 0,
	            fulfillReactionHandler0: void 0,
	            rejectReactionHandler0: void 0,
	            reactionCapability0: void 0
	          }
	        });
	        var resolvingFunctions = createResolvingFunctions(promise);
	        var reject = resolvingFunctions.reject;
	        try {
	          resolver(resolvingFunctions.resolve, reject);
	        } catch (e) {
	          reject(e);
	        }
	        return promise;
	      };
	      return PromiseShim;
	    }());
	    Promise$prototype = Promise.prototype;

	    var _promiseAllResolver = function (index, values, capability, remaining) {
	      var alreadyCalled = false;
	      return function (x) {
	        if (alreadyCalled) { return; }
	        alreadyCalled = true;
	        values[index] = x;
	        if ((--remaining.count) === 0) {
	          var resolve = capability.resolve;
	          resolve(values); // call w/ this===undefined
	        }
	      };
	    };

	    var performPromiseAll = function (iteratorRecord, C, resultCapability) {
	      var it = iteratorRecord.iterator;
	      var values = [];
	      var remaining = { count: 1 };
	      var next, nextValue;
	      var index = 0;
	      while (true) {
	        try {
	          next = ES.IteratorStep(it);
	          if (next === false) {
	            iteratorRecord.done = true;
	            break;
	          }
	          nextValue = next.value;
	        } catch (e) {
	          iteratorRecord.done = true;
	          throw e;
	        }
	        values[index] = void 0;
	        var nextPromise = C.resolve(nextValue);
	        var resolveElement = _promiseAllResolver(
	          index, values, resultCapability, remaining
	        );
	        remaining.count += 1;
	        optimizedThen(nextPromise.then, nextPromise, resolveElement, resultCapability.reject);
	        index += 1;
	      }
	      if ((--remaining.count) === 0) {
	        var resolve = resultCapability.resolve;
	        resolve(values); // call w/ this===undefined
	      }
	      return resultCapability.promise;
	    };

	    var performPromiseRace = function (iteratorRecord, C, resultCapability) {
	      var it = iteratorRecord.iterator;
	      var next, nextValue, nextPromise;
	      while (true) {
	        try {
	          next = ES.IteratorStep(it);
	          if (next === false) {
	            // NOTE: If iterable has no items, resulting promise will never
	            // resolve; see:
	            // https://github.com/domenic/promises-unwrapping/issues/75
	            // https://bugs.ecmascript.org/show_bug.cgi?id=2515
	            iteratorRecord.done = true;
	            break;
	          }
	          nextValue = next.value;
	        } catch (e) {
	          iteratorRecord.done = true;
	          throw e;
	        }
	        nextPromise = C.resolve(nextValue);
	        optimizedThen(nextPromise.then, nextPromise, resultCapability.resolve, resultCapability.reject);
	      }
	      return resultCapability.promise;
	    };

	    defineProperties(Promise, {
	      all: function all(iterable) {
	        var C = this;
	        if (!ES.TypeIsObject(C)) {
	          throw new TypeError('Promise is not object');
	        }
	        var capability = new PromiseCapability(C);
	        var iterator, iteratorRecord;
	        try {
	          iterator = ES.GetIterator(iterable);
	          iteratorRecord = { iterator: iterator, done: false };
	          return performPromiseAll(iteratorRecord, C, capability);
	        } catch (e) {
	          var exception = e;
	          if (iteratorRecord && !iteratorRecord.done) {
	            try {
	              ES.IteratorClose(iterator, true);
	            } catch (ee) {
	              exception = ee;
	            }
	          }
	          var reject = capability.reject;
	          reject(exception);
	          return capability.promise;
	        }
	      },

	      race: function race(iterable) {
	        var C = this;
	        if (!ES.TypeIsObject(C)) {
	          throw new TypeError('Promise is not object');
	        }
	        var capability = new PromiseCapability(C);
	        var iterator, iteratorRecord;
	        try {
	          iterator = ES.GetIterator(iterable);
	          iteratorRecord = { iterator: iterator, done: false };
	          return performPromiseRace(iteratorRecord, C, capability);
	        } catch (e) {
	          var exception = e;
	          if (iteratorRecord && !iteratorRecord.done) {
	            try {
	              ES.IteratorClose(iterator, true);
	            } catch (ee) {
	              exception = ee;
	            }
	          }
	          var reject = capability.reject;
	          reject(exception);
	          return capability.promise;
	        }
	      },

	      reject: function reject(reason) {
	        var C = this;
	        if (!ES.TypeIsObject(C)) {
	          throw new TypeError('Bad promise constructor');
	        }
	        var capability = new PromiseCapability(C);
	        var rejectFunc = capability.reject;
	        rejectFunc(reason); // call with this===undefined
	        return capability.promise;
	      },

	      resolve: function resolve(v) {
	        // See https://esdiscuss.org/topic/fixing-promise-resolve for spec
	        var C = this;
	        if (!ES.TypeIsObject(C)) {
	          throw new TypeError('Bad promise constructor');
	        }
	        if (ES.IsPromise(v)) {
	          var constructor = v.constructor;
	          if (constructor === C) {
	            return v;
	          }
	        }
	        var capability = new PromiseCapability(C);
	        var resolveFunc = capability.resolve;
	        resolveFunc(v); // call with this===undefined
	        return capability.promise;
	      }
	    });

	    defineProperties(Promise$prototype, {
	      'catch': function (onRejected) {
	        return this.then(null, onRejected);
	      },

	      then: function then(onFulfilled, onRejected) {
	        var promise = this;
	        if (!ES.IsPromise(promise)) { throw new TypeError('not a promise'); }
	        var C = ES.SpeciesConstructor(promise, Promise);
	        var resultCapability;
	        var returnValueIsIgnored = arguments.length > 2 && arguments[2] === PROMISE_FAKE_CAPABILITY;
	        if (returnValueIsIgnored && C === Promise) {
	          resultCapability = PROMISE_FAKE_CAPABILITY;
	        } else {
	          resultCapability = new PromiseCapability(C);
	        }
	        // PerformPromiseThen(promise, onFulfilled, onRejected, resultCapability)
	        // Note that we've split the 'reaction' object into its two
	        // components, "capabilities" and "handler"
	        // "capabilities" is always equal to `resultCapability`
	        var fulfillReactionHandler = ES.IsCallable(onFulfilled) ? onFulfilled : PROMISE_IDENTITY;
	        var rejectReactionHandler = ES.IsCallable(onRejected) ? onRejected : PROMISE_THROWER;
	        var _promise = promise._promise;
	        var value;
	        if (_promise.state === PROMISE_PENDING) {
	          if (_promise.reactionLength === 0) {
	            _promise.fulfillReactionHandler0 = fulfillReactionHandler;
	            _promise.rejectReactionHandler0 = rejectReactionHandler;
	            _promise.reactionCapability0 = resultCapability;
	          } else {
	            var idx = 3 * (_promise.reactionLength - 1);
	            _promise[idx + PROMISE_FULFILL_OFFSET] = fulfillReactionHandler;
	            _promise[idx + PROMISE_REJECT_OFFSET] = rejectReactionHandler;
	            _promise[idx + PROMISE_CAPABILITY_OFFSET] = resultCapability;
	          }
	          _promise.reactionLength += 1;
	        } else if (_promise.state === PROMISE_FULFILLED) {
	          value = _promise.result;
	          enqueuePromiseReactionJob(
	            fulfillReactionHandler, resultCapability, value
	          );
	        } else if (_promise.state === PROMISE_REJECTED) {
	          value = _promise.result;
	          enqueuePromiseReactionJob(
	            rejectReactionHandler, resultCapability, value
	          );
	        } else {
	          throw new TypeError('unexpected Promise state');
	        }
	        return resultCapability.promise;
	      }
	    });
	    // This helps the optimizer by ensuring that methods which take
	    // capabilities aren't polymorphic.
	    PROMISE_FAKE_CAPABILITY = new PromiseCapability(Promise);
	    Promise$prototype$then = Promise$prototype.then;

	    return Promise;
	  }());

	  // Chrome's native Promise has extra methods that it shouldn't have. Let's remove them.
	  if (globals.Promise) {
	    delete globals.Promise.accept;
	    delete globals.Promise.defer;
	    delete globals.Promise.prototype.chain;
	  }

	  if (typeof PromiseShim === 'function') {
	    // export the Promise constructor.
	    defineProperties(globals, { Promise: PromiseShim });
	    // In Chrome 33 (and thereabouts) Promise is defined, but the
	    // implementation is buggy in a number of ways.  Let's check subclassing
	    // support to see if we have a buggy implementation.
	    var promiseSupportsSubclassing = supportsSubclassing(globals.Promise, function (S) {
	      return S.resolve(42).then(function () {}) instanceof S;
	    });
	    var promiseIgnoresNonFunctionThenCallbacks = !throwsError(function () {
	      globals.Promise.reject(42).then(null, 5).then(null, noop);
	    });
	    var promiseRequiresObjectContext = throwsError(function () { globals.Promise.call(3, noop); });
	    // Promise.resolve() was errata'ed late in the ES6 process.
	    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1170742
	    //      https://code.google.com/p/v8/issues/detail?id=4161
	    // It serves as a proxy for a number of other bugs in early Promise
	    // implementations.
	    var promiseResolveBroken = (function (Promise) {
	      var p = Promise.resolve(5);
	      p.constructor = {};
	      var p2 = Promise.resolve(p);
	      try {
	        p2.then(null, noop).then(null, noop); // avoid "uncaught rejection" warnings in console
	      } catch (e) {
	        return true; // v8 native Promises break here https://code.google.com/p/chromium/issues/detail?id=575314
	      }
	      return p === p2; // This *should* be false!
	    }(globals.Promise));

	    // Chrome 46 (probably older too) does not retrieve a thenable's .then synchronously
	    var getsThenSynchronously = supportsDescriptors && (function () {
	      var count = 0;
	      var thenable = Object.defineProperty({}, 'then', { get: function () { count += 1; } });
	      Promise.resolve(thenable);
	      return count === 1;
	    }());

	    var BadResolverPromise = function BadResolverPromise(executor) {
	      var p = new Promise(executor);
	      executor(3, function () {});
	      this.then = p.then;
	      this.constructor = BadResolverPromise;
	    };
	    BadResolverPromise.prototype = Promise.prototype;
	    BadResolverPromise.all = Promise.all;
	    // Chrome Canary 49 (probably older too) has some implementation bugs
	    var hasBadResolverPromise = valueOrFalseIfThrows(function () {
	      return !!BadResolverPromise.all([1, 2]);
	    });

	    if (!promiseSupportsSubclassing || !promiseIgnoresNonFunctionThenCallbacks ||
	        !promiseRequiresObjectContext || promiseResolveBroken ||
	        !getsThenSynchronously || hasBadResolverPromise) {
	      /* globals Promise: true */
	      /* eslint-disable no-undef, no-global-assign */
	      /* jshint -W020 */
	      Promise = PromiseShim;
	      /* jshint +W020 */
	      /* eslint-enable no-undef, no-global-assign */
	      /* globals Promise: false */
	      overrideNative(globals, 'Promise', PromiseShim);
	    }
	    if (Promise.all.length !== 1) {
	      var origAll = Promise.all;
	      overrideNative(Promise, 'all', function all(iterable) {
	        return ES.Call(origAll, this, arguments);
	      });
	    }
	    if (Promise.race.length !== 1) {
	      var origRace = Promise.race;
	      overrideNative(Promise, 'race', function race(iterable) {
	        return ES.Call(origRace, this, arguments);
	      });
	    }
	    if (Promise.resolve.length !== 1) {
	      var origResolve = Promise.resolve;
	      overrideNative(Promise, 'resolve', function resolve(x) {
	        return ES.Call(origResolve, this, arguments);
	      });
	    }
	    if (Promise.reject.length !== 1) {
	      var origReject = Promise.reject;
	      overrideNative(Promise, 'reject', function reject(r) {
	        return ES.Call(origReject, this, arguments);
	      });
	    }
	    ensureEnumerable(Promise, 'all');
	    ensureEnumerable(Promise, 'race');
	    ensureEnumerable(Promise, 'resolve');
	    ensureEnumerable(Promise, 'reject');
	    addDefaultSpecies(Promise);
	  }

	  // Map and Set require a true ES5 environment
	  // Their fast path also requires that the environment preserve
	  // property insertion order, which is not guaranteed by the spec.
	  var testOrder = function (a) {
	    var b = keys(_reduce(a, function (o, k) {
	      o[k] = true;
	      return o;
	    }, {}));
	    return a.join(':') === b.join(':');
	  };
	  var preservesInsertionOrder = testOrder(['z', 'a', 'bb']);
	  // some engines (eg, Chrome) only preserve insertion order for string keys
	  var preservesNumericInsertionOrder = testOrder(['z', 1, 'a', '3', 2]);

	  if (supportsDescriptors) {

	    var fastkey = function fastkey(key, skipInsertionOrderCheck) {
	      if (!skipInsertionOrderCheck && !preservesInsertionOrder) {
	        return null;
	      }
	      if (isNullOrUndefined(key)) {
	        return '^' + ES.ToString(key);
	      } else if (typeof key === 'string') {
	        return '$' + key;
	      } else if (typeof key === 'number') {
	        // note that -0 will get coerced to "0" when used as a property key
	        if (!preservesNumericInsertionOrder) {
	          return 'n' + key;
	        }
	        return key;
	      } else if (typeof key === 'boolean') {
	        return 'b' + key;
	      }
	      return null;
	    };

	    var emptyObject = function emptyObject() {
	      // accomodate some older not-quite-ES5 browsers
	      return Object.create ? Object.create(null) : {};
	    };

	    var addIterableToMap = function addIterableToMap(MapConstructor, map, iterable) {
	      if (isArray(iterable) || Type.string(iterable)) {
	        _forEach(iterable, function (entry) {
	          if (!ES.TypeIsObject(entry)) {
	            throw new TypeError('Iterator value ' + entry + ' is not an entry object');
	          }
	          map.set(entry[0], entry[1]);
	        });
	      } else if (iterable instanceof MapConstructor) {
	        _call(MapConstructor.prototype.forEach, iterable, function (value, key) {
	          map.set(key, value);
	        });
	      } else {
	        var iter, adder;
	        if (!isNullOrUndefined(iterable)) {
	          adder = map.set;
	          if (!ES.IsCallable(adder)) { throw new TypeError('bad map'); }
	          iter = ES.GetIterator(iterable);
	        }
	        if (typeof iter !== 'undefined') {
	          while (true) {
	            var next = ES.IteratorStep(iter);
	            if (next === false) { break; }
	            var nextItem = next.value;
	            try {
	              if (!ES.TypeIsObject(nextItem)) {
	                throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
	              }
	              _call(adder, map, nextItem[0], nextItem[1]);
	            } catch (e) {
	              ES.IteratorClose(iter, true);
	              throw e;
	            }
	          }
	        }
	      }
	    };
	    var addIterableToSet = function addIterableToSet(SetConstructor, set, iterable) {
	      if (isArray(iterable) || Type.string(iterable)) {
	        _forEach(iterable, function (value) {
	          set.add(value);
	        });
	      } else if (iterable instanceof SetConstructor) {
	        _call(SetConstructor.prototype.forEach, iterable, function (value) {
	          set.add(value);
	        });
	      } else {
	        var iter, adder;
	        if (!isNullOrUndefined(iterable)) {
	          adder = set.add;
	          if (!ES.IsCallable(adder)) { throw new TypeError('bad set'); }
	          iter = ES.GetIterator(iterable);
	        }
	        if (typeof iter !== 'undefined') {
	          while (true) {
	            var next = ES.IteratorStep(iter);
	            if (next === false) { break; }
	            var nextValue = next.value;
	            try {
	              _call(adder, set, nextValue);
	            } catch (e) {
	              ES.IteratorClose(iter, true);
	              throw e;
	            }
	          }
	        }
	      }
	    };

	    var collectionShims = {
	      Map: (function () {

	        var empty = {};

	        var MapEntry = function MapEntry(key, value) {
	          this.key = key;
	          this.value = value;
	          this.next = null;
	          this.prev = null;
	        };

	        MapEntry.prototype.isRemoved = function isRemoved() {
	          return this.key === empty;
	        };

	        var isMap = function isMap(map) {
	          return !!map._es6map;
	        };

	        var requireMapSlot = function requireMapSlot(map, method) {
	          if (!ES.TypeIsObject(map) || !isMap(map)) {
	            throw new TypeError('Method Map.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(map));
	          }
	        };

	        var MapIterator = function MapIterator(map, kind) {
	          requireMapSlot(map, '[[MapIterator]]');
	          this.head = map._head;
	          this.i = this.head;
	          this.kind = kind;
	        };

	        MapIterator.prototype = {
	          next: function next() {
	            var i = this.i;
	            var kind = this.kind;
	            var head = this.head;
	            if (typeof this.i === 'undefined') {
	              return iteratorResult();
	            }
	            while (i.isRemoved() && i !== head) {
	              // back up off of removed entries
	              i = i.prev;
	            }
	            // advance to next unreturned element.
	            var result;
	            while (i.next !== head) {
	              i = i.next;
	              if (!i.isRemoved()) {
	                if (kind === 'key') {
	                  result = i.key;
	                } else if (kind === 'value') {
	                  result = i.value;
	                } else {
	                  result = [i.key, i.value];
	                }
	                this.i = i;
	                return iteratorResult(result);
	              }
	            }
	            // once the iterator is done, it is done forever.
	            this.i = void 0;
	            return iteratorResult();
	          }
	        };
	        addIterator(MapIterator.prototype);

	        var Map$prototype;
	        var MapShim = function Map() {
	          if (!(this instanceof Map)) {
	            throw new TypeError('Constructor Map requires "new"');
	          }
	          if (this && this._es6map) {
	            throw new TypeError('Bad construction');
	          }
	          var map = emulateES6construct(this, Map, Map$prototype, {
	            _es6map: true,
	            _head: null,
	            _map: OrigMap ? new OrigMap() : null,
	            _size: 0,
	            _storage: emptyObject()
	          });

	          var head = new MapEntry(null, null);
	          // circular doubly-linked list.
	          head.next = head.prev = head;
	          map._head = head;

	          // Optionally initialize map from iterable
	          if (arguments.length > 0) {
	            addIterableToMap(Map, map, arguments[0]);
	          }
	          return map;
	        };
	        Map$prototype = MapShim.prototype;

	        Value.getter(Map$prototype, 'size', function () {
	          if (typeof this._size === 'undefined') {
	            throw new TypeError('size method called on incompatible Map');
	          }
	          return this._size;
	        });

	        defineProperties(Map$prototype, {
	          get: function get(key) {
	            requireMapSlot(this, 'get');
	            var entry;
	            var fkey = fastkey(key, true);
	            if (fkey !== null) {
	              // fast O(1) path
	              entry = this._storage[fkey];
	              if (entry) {
	                return entry.value;
	              } else {
	                return;
	              }
	            }
	            if (this._map) {
	              // fast object key path
	              entry = origMapGet.call(this._map, key);
	              if (entry) {
	                return entry.value;
	              } else {
	                return;
	              }
	            }
	            var head = this._head;
	            var i = head;
	            while ((i = i.next) !== head) {
	              if (ES.SameValueZero(i.key, key)) {
	                return i.value;
	              }
	            }
	          },

	          has: function has(key) {
	            requireMapSlot(this, 'has');
	            var fkey = fastkey(key, true);
	            if (fkey !== null) {
	              // fast O(1) path
	              return typeof this._storage[fkey] !== 'undefined';
	            }
	            if (this._map) {
	              // fast object key path
	              return origMapHas.call(this._map, key);
	            }
	            var head = this._head;
	            var i = head;
	            while ((i = i.next) !== head) {
	              if (ES.SameValueZero(i.key, key)) {
	                return true;
	              }
	            }
	            return false;
	          },

	          set: function set(key, value) {
	            requireMapSlot(this, 'set');
	            var head = this._head;
	            var i = head;
	            var entry;
	            var fkey = fastkey(key, true);
	            if (fkey !== null) {
	              // fast O(1) path
	              if (typeof this._storage[fkey] !== 'undefined') {
	                this._storage[fkey].value = value;
	                return this;
	              } else {
	                entry = this._storage[fkey] = new MapEntry(key, value);
	                i = head.prev;
	                // fall through
	              }
	            } else if (this._map) {
	              // fast object key path
	              if (origMapHas.call(this._map, key)) {
	                origMapGet.call(this._map, key).value = value;
	              } else {
	                entry = new MapEntry(key, value);
	                origMapSet.call(this._map, key, entry);
	                i = head.prev;
	                // fall through
	              }
	            }
	            while ((i = i.next) !== head) {
	              if (ES.SameValueZero(i.key, key)) {
	                i.value = value;
	                return this;
	              }
	            }
	            entry = entry || new MapEntry(key, value);
	            if (ES.SameValue(-0, key)) {
	              entry.key = +0; // coerce -0 to +0 in entry
	            }
	            entry.next = this._head;
	            entry.prev = this._head.prev;
	            entry.prev.next = entry;
	            entry.next.prev = entry;
	            this._size += 1;
	            return this;
	          },

	          'delete': function (key) {
	            requireMapSlot(this, 'delete');
	            var head = this._head;
	            var i = head;
	            var fkey = fastkey(key, true);
	            if (fkey !== null) {
	              // fast O(1) path
	              if (typeof this._storage[fkey] === 'undefined') {
	                return false;
	              }
	              i = this._storage[fkey].prev;
	              delete this._storage[fkey];
	              // fall through
	            } else if (this._map) {
	              // fast object key path
	              if (!origMapHas.call(this._map, key)) {
	                return false;
	              }
	              i = origMapGet.call(this._map, key).prev;
	              origMapDelete.call(this._map, key);
	              // fall through
	            }
	            while ((i = i.next) !== head) {
	              if (ES.SameValueZero(i.key, key)) {
	                i.key = i.value = empty;
	                i.prev.next = i.next;
	                i.next.prev = i.prev;
	                this._size -= 1;
	                return true;
	              }
	            }
	            return false;
	          },

	          clear: function clear() {
	            requireMapSlot(this, 'clear');
	            this._map = OrigMap ? new OrigMap() : null;
	            this._size = 0;
	            this._storage = emptyObject();
	            var head = this._head;
	            var i = head;
	            var p = i.next;
	            while ((i = p) !== head) {
	              i.key = i.value = empty;
	              p = i.next;
	              i.next = i.prev = head;
	            }
	            head.next = head.prev = head;
	          },

	          keys: function keys() {
	            requireMapSlot(this, 'keys');
	            return new MapIterator(this, 'key');
	          },

	          values: function values() {
	            requireMapSlot(this, 'values');
	            return new MapIterator(this, 'value');
	          },

	          entries: function entries() {
	            requireMapSlot(this, 'entries');
	            return new MapIterator(this, 'key+value');
	          },

	          forEach: function forEach(callback) {
	            requireMapSlot(this, 'forEach');
	            var context = arguments.length > 1 ? arguments[1] : null;
	            var it = this.entries();
	            for (var entry = it.next(); !entry.done; entry = it.next()) {
	              if (context) {
	                _call(callback, context, entry.value[1], entry.value[0], this);
	              } else {
	                callback(entry.value[1], entry.value[0], this);
	              }
	            }
	          }
	        });
	        addIterator(Map$prototype, Map$prototype.entries);

	        return MapShim;
	      }()),

	      Set: (function () {
	        var isSet = function isSet(set) {
	          return set._es6set && typeof set._storage !== 'undefined';
	        };
	        var requireSetSlot = function requireSetSlot(set, method) {
	          if (!ES.TypeIsObject(set) || !isSet(set)) {
	            // https://github.com/paulmillr/es6-shim/issues/176
	            throw new TypeError('Set.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(set));
	          }
	        };

	        // Creating a Map is expensive.  To speed up the common case of
	        // Sets containing only string or numeric keys, we use an object
	        // as backing storage and lazily create a full Map only when
	        // required.
	        var Set$prototype;
	        var SetShim = function Set() {
	          if (!(this instanceof Set)) {
	            throw new TypeError('Constructor Set requires "new"');
	          }
	          if (this && this._es6set) {
	            throw new TypeError('Bad construction');
	          }
	          var set = emulateES6construct(this, Set, Set$prototype, {
	            _es6set: true,
	            '[[SetData]]': null,
	            _storage: emptyObject()
	          });
	          if (!set._es6set) {
	            throw new TypeError('bad set');
	          }

	          // Optionally initialize Set from iterable
	          if (arguments.length > 0) {
	            addIterableToSet(Set, set, arguments[0]);
	          }
	          return set;
	        };
	        Set$prototype = SetShim.prototype;

	        var decodeKey = function (key) {
	          var k = key;
	          if (k === '^null') {
	            return null;
	          } else if (k === '^undefined') {
	            return void 0;
	          } else {
	            var first = k.charAt(0);
	            if (first === '$') {
	              return _strSlice(k, 1);
	            } else if (first === 'n') {
	              return +_strSlice(k, 1);
	            } else if (first === 'b') {
	              return k === 'btrue';
	            }
	          }
	          return +k;
	        };
	        // Switch from the object backing storage to a full Map.
	        var ensureMap = function ensureMap(set) {
	          if (!set['[[SetData]]']) {
	            var m = set['[[SetData]]'] = new collectionShims.Map();
	            _forEach(keys(set._storage), function (key) {
	              var k = decodeKey(key);
	              m.set(k, k);
	            });
	            set['[[SetData]]'] = m;
	          }
	          set._storage = null; // free old backing storage
	        };

	        Value.getter(SetShim.prototype, 'size', function () {
	          requireSetSlot(this, 'size');
	          if (this._storage) {
	            return keys(this._storage).length;
	          }
	          ensureMap(this);
	          return this['[[SetData]]'].size;
	        });

	        defineProperties(SetShim.prototype, {
	          has: function has(key) {
	            requireSetSlot(this, 'has');
	            var fkey;
	            if (this._storage && (fkey = fastkey(key)) !== null) {
	              return !!this._storage[fkey];
	            }
	            ensureMap(this);
	            return this['[[SetData]]'].has(key);
	          },

	          add: function add(key) {
	            requireSetSlot(this, 'add');
	            var fkey;
	            if (this._storage && (fkey = fastkey(key)) !== null) {
	              this._storage[fkey] = true;
	              return this;
	            }
	            ensureMap(this);
	            this['[[SetData]]'].set(key, key);
	            return this;
	          },

	          'delete': function (key) {
	            requireSetSlot(this, 'delete');
	            var fkey;
	            if (this._storage && (fkey = fastkey(key)) !== null) {
	              var hasFKey = _hasOwnProperty(this._storage, fkey);
	              return (delete this._storage[fkey]) && hasFKey;
	            }
	            ensureMap(this);
	            return this['[[SetData]]']['delete'](key);
	          },

	          clear: function clear() {
	            requireSetSlot(this, 'clear');
	            if (this._storage) {
	              this._storage = emptyObject();
	            }
	            if (this['[[SetData]]']) {
	              this['[[SetData]]'].clear();
	            }
	          },

	          values: function values() {
	            requireSetSlot(this, 'values');
	            ensureMap(this);
	            return this['[[SetData]]'].values();
	          },

	          entries: function entries() {
	            requireSetSlot(this, 'entries');
	            ensureMap(this);
	            return this['[[SetData]]'].entries();
	          },

	          forEach: function forEach(callback) {
	            requireSetSlot(this, 'forEach');
	            var context = arguments.length > 1 ? arguments[1] : null;
	            var entireSet = this;
	            ensureMap(entireSet);
	            this['[[SetData]]'].forEach(function (value, key) {
	              if (context) {
	                _call(callback, context, key, key, entireSet);
	              } else {
	                callback(key, key, entireSet);
	              }
	            });
	          }
	        });
	        defineProperty(SetShim.prototype, 'keys', SetShim.prototype.values, true);
	        addIterator(SetShim.prototype, SetShim.prototype.values);

	        return SetShim;
	      }())
	    };

	    if (globals.Map || globals.Set) {
	      // Safari 8, for example, doesn't accept an iterable.
	      var mapAcceptsArguments = valueOrFalseIfThrows(function () { return new Map([[1, 2]]).get(1) === 2; });
	      if (!mapAcceptsArguments) {
	        globals.Map = function Map() {
	          if (!(this instanceof Map)) {
	            throw new TypeError('Constructor Map requires "new"');
	          }
	          var m = new OrigMap();
	          if (arguments.length > 0) {
	            addIterableToMap(Map, m, arguments[0]);
	          }
	          delete m.constructor;
	          Object.setPrototypeOf(m, globals.Map.prototype);
	          return m;
	        };
	        globals.Map.prototype = create(OrigMap.prototype);
	        defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
	        Value.preserveToString(globals.Map, OrigMap);
	      }
	      var testMap = new Map();
	      var mapUsesSameValueZero = (function () {
	        // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
	        var m = new Map([[1, 0], [2, 0], [3, 0], [4, 0]]);
	        m.set(-0, m);
	        return m.get(0) === m && m.get(-0) === m && m.has(0) && m.has(-0);
	      }());
	      var mapSupportsChaining = testMap.set(1, 2) === testMap;
	      if (!mapUsesSameValueZero || !mapSupportsChaining) {
	        overrideNative(Map.prototype, 'set', function set(k, v) {
	          _call(origMapSet, this, k === 0 ? 0 : k, v);
	          return this;
	        });
	      }
	      if (!mapUsesSameValueZero) {
	        defineProperties(Map.prototype, {
	          get: function get(k) {
	            return _call(origMapGet, this, k === 0 ? 0 : k);
	          },
	          has: function has(k) {
	            return _call(origMapHas, this, k === 0 ? 0 : k);
	          }
	        }, true);
	        Value.preserveToString(Map.prototype.get, origMapGet);
	        Value.preserveToString(Map.prototype.has, origMapHas);
	      }
	      var testSet = new Set();
	      var setUsesSameValueZero = (function (s) {
	        s['delete'](0);
	        s.add(-0);
	        return !s.has(0);
	      }(testSet));
	      var setSupportsChaining = testSet.add(1) === testSet;
	      if (!setUsesSameValueZero || !setSupportsChaining) {
	        var origSetAdd = Set.prototype.add;
	        Set.prototype.add = function add(v) {
	          _call(origSetAdd, this, v === 0 ? 0 : v);
	          return this;
	        };
	        Value.preserveToString(Set.prototype.add, origSetAdd);
	      }
	      if (!setUsesSameValueZero) {
	        var origSetHas = Set.prototype.has;
	        Set.prototype.has = function has(v) {
	          return _call(origSetHas, this, v === 0 ? 0 : v);
	        };
	        Value.preserveToString(Set.prototype.has, origSetHas);
	        var origSetDel = Set.prototype['delete'];
	        Set.prototype['delete'] = function SetDelete(v) {
	          return _call(origSetDel, this, v === 0 ? 0 : v);
	        };
	        Value.preserveToString(Set.prototype['delete'], origSetDel);
	      }
	      var mapSupportsSubclassing = supportsSubclassing(globals.Map, function (M) {
	        var m = new M([]);
	        // Firefox 32 is ok with the instantiating the subclass but will
	        // throw when the map is used.
	        m.set(42, 42);
	        return m instanceof M;
	      });
	      // without Object.setPrototypeOf, subclassing is not possible
	      var mapFailsToSupportSubclassing = Object.setPrototypeOf && !mapSupportsSubclassing;
	      var mapRequiresNew = (function () {
	        try {
	          return !(globals.Map() instanceof globals.Map);
	        } catch (e) {
	          return e instanceof TypeError;
	        }
	      }());
	      if (globals.Map.length !== 0 || mapFailsToSupportSubclassing || !mapRequiresNew) {
	        globals.Map = function Map() {
	          if (!(this instanceof Map)) {
	            throw new TypeError('Constructor Map requires "new"');
	          }
	          var m = new OrigMap();
	          if (arguments.length > 0) {
	            addIterableToMap(Map, m, arguments[0]);
	          }
	          delete m.constructor;
	          Object.setPrototypeOf(m, Map.prototype);
	          return m;
	        };
	        globals.Map.prototype = OrigMap.prototype;
	        defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
	        Value.preserveToString(globals.Map, OrigMap);
	      }
	      var setSupportsSubclassing = supportsSubclassing(globals.Set, function (S) {
	        var s = new S([]);
	        s.add(42, 42);
	        return s instanceof S;
	      });
	      // without Object.setPrototypeOf, subclassing is not possible
	      var setFailsToSupportSubclassing = Object.setPrototypeOf && !setSupportsSubclassing;
	      var setRequiresNew = (function () {
	        try {
	          return !(globals.Set() instanceof globals.Set);
	        } catch (e) {
	          return e instanceof TypeError;
	        }
	      }());
	      if (globals.Set.length !== 0 || setFailsToSupportSubclassing || !setRequiresNew) {
	        var OrigSet = globals.Set;
	        globals.Set = function Set() {
	          if (!(this instanceof Set)) {
	            throw new TypeError('Constructor Set requires "new"');
	          }
	          var s = new OrigSet();
	          if (arguments.length > 0) {
	            addIterableToSet(Set, s, arguments[0]);
	          }
	          delete s.constructor;
	          Object.setPrototypeOf(s, Set.prototype);
	          return s;
	        };
	        globals.Set.prototype = OrigSet.prototype;
	        defineProperty(globals.Set.prototype, 'constructor', globals.Set, true);
	        Value.preserveToString(globals.Set, OrigSet);
	      }
	      var newMap = new globals.Map();
	      var mapIterationThrowsStopIterator = !valueOrFalseIfThrows(function () {
	        return newMap.keys().next().done;
	      });
	      /*
	        - In Firefox < 23, Map#size is a function.
	        - In all current Firefox, Set#entries/keys/values & Map#clear do not exist
	        - https://bugzilla.mozilla.org/show_bug.cgi?id=869996
	        - In Firefox 24, Map and Set do not implement forEach
	        - In Firefox 25 at least, Map and Set are callable without "new"
	      */
	      if (
	        typeof globals.Map.prototype.clear !== 'function' ||
	        new globals.Set().size !== 0 ||
	        newMap.size !== 0 ||
	        typeof globals.Map.prototype.keys !== 'function' ||
	        typeof globals.Set.prototype.keys !== 'function' ||
	        typeof globals.Map.prototype.forEach !== 'function' ||
	        typeof globals.Set.prototype.forEach !== 'function' ||
	        isCallableWithoutNew(globals.Map) ||
	        isCallableWithoutNew(globals.Set) ||
	        typeof newMap.keys().next !== 'function' || // Safari 8
	        mapIterationThrowsStopIterator || // Firefox 25
	        !mapSupportsSubclassing
	      ) {
	        defineProperties(globals, {
	          Map: collectionShims.Map,
	          Set: collectionShims.Set
	        }, true);
	      }

	      if (globals.Set.prototype.keys !== globals.Set.prototype.values) {
	        // Fixed in WebKit with https://bugs.webkit.org/show_bug.cgi?id=144190
	        defineProperty(globals.Set.prototype, 'keys', globals.Set.prototype.values, true);
	      }

	      // Shim incomplete iterator implementations.
	      addIterator(Object.getPrototypeOf((new globals.Map()).keys()));
	      addIterator(Object.getPrototypeOf((new globals.Set()).keys()));

	      if (functionsHaveNames && globals.Set.prototype.has.name !== 'has') {
	        // Microsoft Edge v0.11.10074.0 is missing a name on Set#has
	        var anonymousSetHas = globals.Set.prototype.has;
	        overrideNative(globals.Set.prototype, 'has', function has(key) {
	          return _call(anonymousSetHas, this, key);
	        });
	      }
	    }
	    defineProperties(globals, collectionShims);
	    addDefaultSpecies(globals.Map);
	    addDefaultSpecies(globals.Set);
	  }

	  var throwUnlessTargetIsObject = function throwUnlessTargetIsObject(target) {
	    if (!ES.TypeIsObject(target)) {
	      throw new TypeError('target must be an object');
	    }
	  };

	  // Some Reflect methods are basically the same as
	  // those on the Object global, except that a TypeError is thrown if
	  // target isn't an object. As well as returning a boolean indicating
	  // the success of the operation.
	  var ReflectShims = {
	    // Apply method in a functional form.
	    apply: function apply() {
	      return ES.Call(ES.Call, null, arguments);
	    },

	    // New operator in a functional form.
	    construct: function construct(constructor, args) {
	      if (!ES.IsConstructor(constructor)) {
	        throw new TypeError('First argument must be a constructor.');
	      }
	      var newTarget = arguments.length > 2 ? arguments[2] : constructor;
	      if (!ES.IsConstructor(newTarget)) {
	        throw new TypeError('new.target must be a constructor.');
	      }
	      return ES.Construct(constructor, args, newTarget, 'internal');
	    },

	    // When deleting a non-existent or configurable property,
	    // true is returned.
	    // When attempting to delete a non-configurable property,
	    // it will return false.
	    deleteProperty: function deleteProperty(target, key) {
	      throwUnlessTargetIsObject(target);
	      if (supportsDescriptors) {
	        var desc = Object.getOwnPropertyDescriptor(target, key);

	        if (desc && !desc.configurable) {
	          return false;
	        }
	      }

	      // Will return true.
	      return delete target[key];
	    },

	    has: function has(target, key) {
	      throwUnlessTargetIsObject(target);
	      return key in target;
	    }
	  };

	  if (Object.getOwnPropertyNames) {
	    Object.assign(ReflectShims, {
	      // Basically the result of calling the internal [[OwnPropertyKeys]].
	      // Concatenating propertyNames and propertySymbols should do the trick.
	      // This should continue to work together with a Symbol shim
	      // which overrides Object.getOwnPropertyNames and implements
	      // Object.getOwnPropertySymbols.
	      ownKeys: function ownKeys(target) {
	        throwUnlessTargetIsObject(target);
	        var keys = Object.getOwnPropertyNames(target);

	        if (ES.IsCallable(Object.getOwnPropertySymbols)) {
	          _pushApply(keys, Object.getOwnPropertySymbols(target));
	        }

	        return keys;
	      }
	    });
	  }

	  var callAndCatchException = function ConvertExceptionToBoolean(func) {
	    return !throwsError(func);
	  };

	  if (Object.preventExtensions) {
	    Object.assign(ReflectShims, {
	      isExtensible: function isExtensible(target) {
	        throwUnlessTargetIsObject(target);
	        return Object.isExtensible(target);
	      },
	      preventExtensions: function preventExtensions(target) {
	        throwUnlessTargetIsObject(target);
	        return callAndCatchException(function () {
	          Object.preventExtensions(target);
	        });
	      }
	    });
	  }

	  if (supportsDescriptors) {
	    var internalGet = function get(target, key, receiver) {
	      var desc = Object.getOwnPropertyDescriptor(target, key);

	      if (!desc) {
	        var parent = Object.getPrototypeOf(target);

	        if (parent === null) {
	          return void 0;
	        }

	        return internalGet(parent, key, receiver);
	      }

	      if ('value' in desc) {
	        return desc.value;
	      }

	      if (desc.get) {
	        return ES.Call(desc.get, receiver);
	      }

	      return void 0;
	    };

	    var internalSet = function set(target, key, value, receiver) {
	      var desc = Object.getOwnPropertyDescriptor(target, key);

	      if (!desc) {
	        var parent = Object.getPrototypeOf(target);

	        if (parent !== null) {
	          return internalSet(parent, key, value, receiver);
	        }

	        desc = {
	          value: void 0,
	          writable: true,
	          enumerable: true,
	          configurable: true
	        };
	      }

	      if ('value' in desc) {
	        if (!desc.writable) {
	          return false;
	        }

	        if (!ES.TypeIsObject(receiver)) {
	          return false;
	        }

	        var existingDesc = Object.getOwnPropertyDescriptor(receiver, key);

	        if (existingDesc) {
	          return Reflect.defineProperty(receiver, key, {
	            value: value
	          });
	        } else {
	          return Reflect.defineProperty(receiver, key, {
	            value: value,
	            writable: true,
	            enumerable: true,
	            configurable: true
	          });
	        }
	      }

	      if (desc.set) {
	        _call(desc.set, receiver, value);
	        return true;
	      }

	      return false;
	    };

	    Object.assign(ReflectShims, {
	      defineProperty: function defineProperty(target, propertyKey, attributes) {
	        throwUnlessTargetIsObject(target);
	        return callAndCatchException(function () {
	          Object.defineProperty(target, propertyKey, attributes);
	        });
	      },

	      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	        throwUnlessTargetIsObject(target);
	        return Object.getOwnPropertyDescriptor(target, propertyKey);
	      },

	      // Syntax in a functional form.
	      get: function get(target, key) {
	        throwUnlessTargetIsObject(target);
	        var receiver = arguments.length > 2 ? arguments[2] : target;

	        return internalGet(target, key, receiver);
	      },

	      set: function set(target, key, value) {
	        throwUnlessTargetIsObject(target);
	        var receiver = arguments.length > 3 ? arguments[3] : target;

	        return internalSet(target, key, value, receiver);
	      }
	    });
	  }

	  if (Object.getPrototypeOf) {
	    var objectDotGetPrototypeOf = Object.getPrototypeOf;
	    ReflectShims.getPrototypeOf = function getPrototypeOf(target) {
	      throwUnlessTargetIsObject(target);
	      return objectDotGetPrototypeOf(target);
	    };
	  }

	  if (Object.setPrototypeOf && ReflectShims.getPrototypeOf) {
	    var willCreateCircularPrototype = function (object, lastProto) {
	      var proto = lastProto;
	      while (proto) {
	        if (object === proto) {
	          return true;
	        }
	        proto = ReflectShims.getPrototypeOf(proto);
	      }
	      return false;
	    };

	    Object.assign(ReflectShims, {
	      // Sets the prototype of the given object.
	      // Returns true on success, otherwise false.
	      setPrototypeOf: function setPrototypeOf(object, proto) {
	        throwUnlessTargetIsObject(object);
	        if (proto !== null && !ES.TypeIsObject(proto)) {
	          throw new TypeError('proto must be an object or null');
	        }

	        // If they already are the same, we're done.
	        if (proto === Reflect.getPrototypeOf(object)) {
	          return true;
	        }

	        // Cannot alter prototype if object not extensible.
	        if (Reflect.isExtensible && !Reflect.isExtensible(object)) {
	          return false;
	        }

	        // Ensure that we do not create a circular prototype chain.
	        if (willCreateCircularPrototype(object, proto)) {
	          return false;
	        }

	        Object.setPrototypeOf(object, proto);

	        return true;
	      }
	    });
	  }
	  var defineOrOverrideReflectProperty = function (key, shim) {
	    if (!ES.IsCallable(globals.Reflect[key])) {
	      defineProperty(globals.Reflect, key, shim);
	    } else {
	      var acceptsPrimitives = valueOrFalseIfThrows(function () {
	        globals.Reflect[key](1);
	        globals.Reflect[key](NaN);
	        globals.Reflect[key](true);
	        return true;
	      });
	      if (acceptsPrimitives) {
	        overrideNative(globals.Reflect, key, shim);
	      }
	    }
	  };
	  Object.keys(ReflectShims).forEach(function (key) {
	    defineOrOverrideReflectProperty(key, ReflectShims[key]);
	  });
	  var originalReflectGetProto = globals.Reflect.getPrototypeOf;
	  if (functionsHaveNames && originalReflectGetProto && originalReflectGetProto.name !== 'getPrototypeOf') {
	    overrideNative(globals.Reflect, 'getPrototypeOf', function getPrototypeOf(target) {
	      return _call(originalReflectGetProto, globals.Reflect, target);
	    });
	  }
	  if (globals.Reflect.setPrototypeOf) {
	    if (valueOrFalseIfThrows(function () {
	      globals.Reflect.setPrototypeOf(1, {});
	      return true;
	    })) {
	      overrideNative(globals.Reflect, 'setPrototypeOf', ReflectShims.setPrototypeOf);
	    }
	  }
	  if (globals.Reflect.defineProperty) {
	    if (!valueOrFalseIfThrows(function () {
	      var basic = !globals.Reflect.defineProperty(1, 'test', { value: 1 });
	      // "extensible" fails on Edge 0.12
	      var extensible = typeof Object.preventExtensions !== 'function' || !globals.Reflect.defineProperty(Object.preventExtensions({}), 'test', {});
	      return basic && extensible;
	    })) {
	      overrideNative(globals.Reflect, 'defineProperty', ReflectShims.defineProperty);
	    }
	  }
	  if (globals.Reflect.construct) {
	    if (!valueOrFalseIfThrows(function () {
	      var F = function F() {};
	      return globals.Reflect.construct(function () {}, [], F) instanceof F;
	    })) {
	      overrideNative(globals.Reflect, 'construct', ReflectShims.construct);
	    }
	  }

	  if (String(new Date(NaN)) !== 'Invalid Date') {
	    var dateToString = Date.prototype.toString;
	    var shimmedDateToString = function toString() {
	      var valueOf = +this;
	      if (valueOf !== valueOf) {
	        return 'Invalid Date';
	      }
	      return ES.Call(dateToString, this);
	    };
	    overrideNative(Date.prototype, 'toString', shimmedDateToString);
	  }

	  // Annex B HTML methods
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-additional-properties-of-the-string.prototype-object
	  var stringHTMLshims = {
	    anchor: function anchor(name) { return ES.CreateHTML(this, 'a', 'name', name); },
	    big: function big() { return ES.CreateHTML(this, 'big', '', ''); },
	    blink: function blink() { return ES.CreateHTML(this, 'blink', '', ''); },
	    bold: function bold() { return ES.CreateHTML(this, 'b', '', ''); },
	    fixed: function fixed() { return ES.CreateHTML(this, 'tt', '', ''); },
	    fontcolor: function fontcolor(color) { return ES.CreateHTML(this, 'font', 'color', color); },
	    fontsize: function fontsize(size) { return ES.CreateHTML(this, 'font', 'size', size); },
	    italics: function italics() { return ES.CreateHTML(this, 'i', '', ''); },
	    link: function link(url) { return ES.CreateHTML(this, 'a', 'href', url); },
	    small: function small() { return ES.CreateHTML(this, 'small', '', ''); },
	    strike: function strike() { return ES.CreateHTML(this, 'strike', '', ''); },
	    sub: function sub() { return ES.CreateHTML(this, 'sub', '', ''); },
	    sup: function sub() { return ES.CreateHTML(this, 'sup', '', ''); }
	  };
	  _forEach(Object.keys(stringHTMLshims), function (key) {
	    var method = String.prototype[key];
	    var shouldOverwrite = false;
	    if (ES.IsCallable(method)) {
	      var output = _call(method, '', ' " ');
	      var quotesCount = _concat([], output.match(/"/g)).length;
	      shouldOverwrite = output !== output.toLowerCase() || quotesCount > 2;
	    } else {
	      shouldOverwrite = true;
	    }
	    if (shouldOverwrite) {
	      overrideNative(String.prototype, key, stringHTMLshims[key]);
	    }
	  });

	  var JSONstringifiesSymbols = (function () {
	    // Microsoft Edge v0.12 stringifies Symbols incorrectly
	    if (!hasSymbols) { return false; } // Symbols are not supported
	    var stringify = typeof JSON === 'object' && typeof JSON.stringify === 'function' ? JSON.stringify : null;
	    if (!stringify) { return false; } // JSON.stringify is not supported
	    if (typeof stringify(Symbol()) !== 'undefined') { return true; } // Symbols should become `undefined`
	    if (stringify([Symbol()]) !== '[null]') { return true; } // Symbols in arrays should become `null`
	    var obj = { a: Symbol() };
	    obj[Symbol()] = true;
	    if (stringify(obj) !== '{}') { return true; } // Symbol-valued keys *and* Symbol-valued properties should be omitted
	    return false;
	  }());
	  var JSONstringifyAcceptsObjectSymbol = valueOrFalseIfThrows(function () {
	    // Chrome 45 throws on stringifying object symbols
	    if (!hasSymbols) { return true; } // Symbols are not supported
	    return JSON.stringify(Object(Symbol())) === '{}' && JSON.stringify([Object(Symbol())]) === '[{}]';
	  });
	  if (JSONstringifiesSymbols || !JSONstringifyAcceptsObjectSymbol) {
	    var origStringify = JSON.stringify;
	    overrideNative(JSON, 'stringify', function stringify(value) {
	      if (typeof value === 'symbol') { return; }
	      var replacer;
	      if (arguments.length > 1) {
	        replacer = arguments[1];
	      }
	      var args = [value];
	      if (!isArray(replacer)) {
	        var replaceFn = ES.IsCallable(replacer) ? replacer : null;
	        var wrappedReplacer = function (key, val) {
	          var parsedValue = replaceFn ? _call(replaceFn, this, key, val) : val;
	          if (typeof parsedValue !== 'symbol') {
	            if (Type.symbol(parsedValue)) {
	              return assignTo({})(parsedValue);
	            } else {
	              return parsedValue;
	            }
	          }
	        };
	        args.push(wrappedReplacer);
	      } else {
	        // create wrapped replacer that handles an array replacer?
	        args.push(replacer);
	      }
	      if (arguments.length > 2) {
	        args.push(arguments[2]);
	      }
	      return origStringify.apply(this, args);
	    });
	  }

	  return globals;
	}));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 121 */
/***/ function(module, exports) {

	'use strict';

	var validTypes = { object: true, symbol: true };

	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};


/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return (x[x.constructor.toStringTag] === 'Symbol');
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not support it (or partially support it)

	'use strict';

	var d              = __webpack_require__(6)
	  , validateSymbol = __webpack_require__(124)

	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
	  , isNativeSafe;

	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}

	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),

		// If there's native implementation of given symbol, let's fallback to it
		// to ensure proper interoperability with other native functions e.g. Array.from
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(122);

	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d        = __webpack_require__(6)
	  , callable = __webpack_require__(7)

	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },
/* 126 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var loopAsync = exports.loopAsync = function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var isSync = false,
	      hasNext = false,
	      doneArgs = void 0;

	  var done = function done() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    isDone = true;

	    if (isSync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = args;
	      return;
	    }

	    callback.apply(undefined, args);
	  };

	  var next = function next() {
	    if (isDone) return;

	    hasNext = true;

	    if (isSync) return; // Iterate instead of recursing if possible.

	    isSync = true;

	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work(currentTurn++, next, done);
	    }

	    isSync = false;

	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(undefined, doneArgs);
	      return;
	    }

	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  };

	  next();
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.replaceLocation = exports.pushLocation = exports.startListener = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

	var _BrowserProtocol = __webpack_require__(26);

	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});

	var _warning = __webpack_require__(9);

	var _warning2 = _interopRequireDefault(_warning);

	var _LocationUtils = __webpack_require__(8);

	var _DOMUtils = __webpack_require__(13);

	var _DOMStateStorage = __webpack_require__(44);

	var _PathUtils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HashChangeEvent = 'hashchange';

	var getHashPath = function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var hashIndex = href.indexOf('#');
	  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
	};

	var pushHashPath = function pushHashPath(path) {
	  return window.location.hash = path;
	};

	var replaceHashPath = function replaceHashPath(path) {
	  var hashIndex = window.location.href.indexOf('#');

	  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
	};

	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation(pathCoder, queryKey) {
	  var path = pathCoder.decodePath(getHashPath());
	  var key = (0, _PathUtils.getQueryStringValueFromPath)(path, queryKey);

	  var state = void 0;
	  if (key) {
	    path = (0, _PathUtils.stripQueryStringValueFromPath)(path, queryKey);
	    state = (0, _DOMStateStorage.readState)(key);
	  }

	  var init = (0, _PathUtils.parsePath)(path);
	  init.state = state;

	  return (0, _LocationUtils.createLocation)(init, undefined, key);
	};

	var prevLocation = void 0;

	var startListener = exports.startListener = function startListener(listener, pathCoder, queryKey) {
	  var handleHashChange = function handleHashChange() {
	    var path = getHashPath();
	    var encodedPath = pathCoder.encodePath(path);

	    if (path !== encodedPath) {
	      // Always be sure we have a properly-encoded hash.
	      replaceHashPath(encodedPath);
	    } else {
	      var currentLocation = getCurrentLocation(pathCoder, queryKey);

	      if (prevLocation && currentLocation.key && prevLocation.key === currentLocation.key) return; // Ignore extraneous hashchange events

	      prevLocation = currentLocation;

	      listener(currentLocation);
	    }
	  };

	  // Ensure the hash is encoded properly.
	  var path = getHashPath();
	  var encodedPath = pathCoder.encodePath(path);

	  if (path !== encodedPath) replaceHashPath(encodedPath);

	  (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);

	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	  };
	};

	var updateLocation = function updateLocation(location, pathCoder, queryKey, updateHash) {
	  var state = location.state;
	  var key = location.key;


	  var path = pathCoder.encodePath((0, _PathUtils.createPath)(location));

	  if (state !== undefined) {
	    path = (0, _PathUtils.addQueryStringValueToPath)(path, queryKey, key);
	    (0, _DOMStateStorage.saveState)(key, state);
	  }

	  prevLocation = location;

	  updateHash(path);
	};

	var pushLocation = exports.pushLocation = function pushLocation(location, pathCoder, queryKey) {
	  return updateLocation(location, pathCoder, queryKey, function (path) {
	    if (getHashPath() !== path) {
	      pushHashPath(path);
	    } else {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'You cannot PUSH the same path using hash history') : void 0;
	    }
	  });
	};

	var replaceLocation = exports.replaceLocation = function replaceLocation(location, pathCoder, queryKey) {
	  return updateLocation(location, pathCoder, queryKey, function (path) {
	    if (getHashPath() !== path) replaceHashPath(path);
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.replaceLocation = exports.pushLocation = exports.getCurrentLocation = exports.go = exports.getUserConfirmation = undefined;

	var _BrowserProtocol = __webpack_require__(26);

	Object.defineProperty(exports, 'getUserConfirmation', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.getUserConfirmation;
	  }
	});
	Object.defineProperty(exports, 'go', {
	  enumerable: true,
	  get: function get() {
	    return _BrowserProtocol.go;
	  }
	});

	var _LocationUtils = __webpack_require__(8);

	var _PathUtils = __webpack_require__(5);

	var getCurrentLocation = exports.getCurrentLocation = function getCurrentLocation() {
	  return (0, _LocationUtils.createLocation)(window.location);
	};

	var pushLocation = exports.pushLocation = function pushLocation(location) {
	  window.location.href = (0, _PathUtils.createPath)(location);
	  return false; // Don't update location
	};

	var replaceLocation = exports.replaceLocation = function replaceLocation(location) {
	  window.location.replace((0, _PathUtils.createPath)(location));
	  return false; // Don't update location
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(14);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(18);

	var _BrowserProtocol = __webpack_require__(26);

	var BrowserProtocol = _interopRequireWildcard(_BrowserProtocol);

	var _RefreshProtocol = __webpack_require__(128);

	var RefreshProtocol = _interopRequireWildcard(_RefreshProtocol);

	var _DOMUtils = __webpack_require__(13);

	var _createHistory = __webpack_require__(27);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve clean URLs. You can force this
	 * behavior using { forceRefresh: true } in options.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

	  var useRefresh = options.forceRefresh || !(0, _DOMUtils.supportsHistory)();
	  var Protocol = useRefresh ? RefreshProtocol : BrowserProtocol;

	  var getUserConfirmation = Protocol.getUserConfirmation;
	  var getCurrentLocation = Protocol.getCurrentLocation;
	  var pushLocation = Protocol.pushLocation;
	  var replaceLocation = Protocol.replaceLocation;
	  var go = Protocol.go;


	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));

	  var listenerCount = 0,
	      stopListener = void 0;

	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = BrowserProtocol.startListener(history.transitionTo);

	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopListener();
	    };
	  };

	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };

	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen
	  });
	};

	exports.default = createBrowserHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _warning = __webpack_require__(9);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(14);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(18);

	var _DOMUtils = __webpack_require__(13);

	var _HashProtocol = __webpack_require__(127);

	var HashProtocol = _interopRequireWildcard(_HashProtocol);

	var _createHistory = __webpack_require__(27);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DefaultQueryKey = '_k';

	var addLeadingSlash = function addLeadingSlash(path) {
	  return path.charAt(0) === '/' ? path : '/' + path;
	};

	var HashPathCoders = {
	  hashbang: {
	    encodePath: function encodePath(path) {
	      return path.charAt(0) === '!' ? path : '!' + path;
	    },
	    decodePath: function decodePath(path) {
	      return path.charAt(0) === '!' ? path.substring(1) : path;
	    }
	  },
	  noslash: {
	    encodePath: function encodePath(path) {
	      return path.charAt(0) === '/' ? path.substring(1) : path;
	    },
	    decodePath: addLeadingSlash
	  },
	  slash: {
	    encodePath: addLeadingSlash,
	    decodePath: addLeadingSlash
	  }
	};

	var createHashHistory = function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;

	  var queryKey = options.queryKey;
	  var hashType = options.hashType;


	  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(queryKey !== false, 'Using { queryKey: false } no longer works. Instead, just don\'t ' + 'use location state if you don\'t want a key in your URL query string') : void 0;

	  if (typeof queryKey !== 'string') queryKey = DefaultQueryKey;

	  if (hashType == null) hashType = 'slash';

	  if (!(hashType in HashPathCoders)) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Invalid hash type: %s', hashType) : void 0;

	    hashType = 'slash';
	  }

	  var pathCoder = HashPathCoders[hashType];

	  var getUserConfirmation = HashProtocol.getUserConfirmation;


	  var getCurrentLocation = function getCurrentLocation() {
	    return HashProtocol.getCurrentLocation(pathCoder, queryKey);
	  };

	  var pushLocation = function pushLocation(location) {
	    return HashProtocol.pushLocation(location, pathCoder, queryKey);
	  };

	  var replaceLocation = function replaceLocation(location) {
	    return HashProtocol.replaceLocation(location, pathCoder, queryKey);
	  };

	  var history = (0, _createHistory2.default)(_extends({
	    getUserConfirmation: getUserConfirmation }, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: HashProtocol.go
	  }));

	  var listenerCount = 0,
	      stopListener = void 0;

	  var startListener = function startListener(listener, before) {
	    if (++listenerCount === 1) stopListener = HashProtocol.startListener(history.transitionTo, pathCoder, queryKey);

	    var unlisten = before ? history.listenBefore(listener) : history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopListener();
	    };
	  };

	  var listenBefore = function listenBefore(listener) {
	    return startListener(listener, true);
	  };

	  var listen = function listen(listener) {
	    return startListener(listener, false);
	  };

	  var goIsSupportedWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

	  var go = function go(n) {
	    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;

	    history.go(n);
	  };

	  var createHref = function createHref(path) {
	    return '#' + pathCoder.encodePath(history.createHref(path));
	  };

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    go: go,
	    createHref: createHref
	  });
	};

	exports.default = createHashHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _warning = __webpack_require__(9);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(14);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _LocationUtils = __webpack_require__(8);

	var _PathUtils = __webpack_require__(5);

	var _createHistory = __webpack_require__(27);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	var _Actions = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createStateStorage = function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	};

	var createMemoryHistory = function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var getCurrentLocation = function getCurrentLocation() {
	    var entry = entries[current];
	    var path = (0, _PathUtils.createPath)(entry);

	    var key = void 0,
	        state = void 0;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    }

	    var init = (0, _PathUtils.parsePath)(path);

	    return (0, _LocationUtils.createLocation)(_extends({}, init, { state: state }), undefined, key);
	  };

	  var canGo = function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  };

	  var go = function go(n) {
	    if (!n) return;

	    if (!canGo(n)) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Cannot go(%s) there is not enough history', n) : void 0;

	      return;
	    }

	    current += n;
	    var currentLocation = getCurrentLocation();

	    // Change action to POP
	    history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	  };

	  var pushLocation = function pushLocation(location) {
	    current += 1;

	    if (current < entries.length) entries.splice(current);

	    entries.push(location);

	    saveState(location.key, location.state);
	  };

	  var replaceLocation = function replaceLocation(location) {
	    entries[current] = location;
	    saveState(location.key, location.state);
	  };

	  var history = (0, _createHistory2.default)(_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    pushLocation: pushLocation,
	    replaceLocation: replaceLocation,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;


	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    return (0, _LocationUtils.createLocation)(entry);
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : (0, _invariant2.default)(false) : void 0;
	  }

	  var storage = createStateStorage(entries);

	  var saveState = function saveState(key, state) {
	    return storage[key] = state;
	  };

	  var readState = function readState(key) {
	    return storage[key];
	  };

	  return _extends({}, history, {
	    canGo: canGo
	  });
	};

	exports.default = createMemoryHistory;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.locationsAreEqual = exports.Actions = exports.useQueries = exports.useBeforeUnload = exports.useBasename = exports.createMemoryHistory = exports.createHashHistory = exports.createHistory = undefined;

	var _LocationUtils = __webpack_require__(8);

	Object.defineProperty(exports, 'locationsAreEqual', {
	  enumerable: true,
	  get: function get() {
	    return _LocationUtils.locationsAreEqual;
	  }
	});

	var _createBrowserHistory = __webpack_require__(129);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	var _createHashHistory2 = __webpack_require__(130);

	var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

	var _createMemoryHistory2 = __webpack_require__(131);

	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

	var _useBasename2 = __webpack_require__(133);

	var _useBasename3 = _interopRequireDefault(_useBasename2);

	var _useBeforeUnload2 = __webpack_require__(134);

	var _useBeforeUnload3 = _interopRequireDefault(_useBeforeUnload2);

	var _useQueries2 = __webpack_require__(135);

	var _useQueries3 = _interopRequireDefault(_useQueries2);

	var _Actions2 = __webpack_require__(17);

	var _Actions = _interopRequireWildcard(_Actions2);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createHistory = _createBrowserHistory2.default;
	exports.createHashHistory = _createHashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;
	exports.useBasename = _useBasename3.default;
	exports.useBeforeUnload = _useBeforeUnload3.default;
	exports.useQueries = _useQueries3.default;
	exports.Actions = _Actions;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _runTransitionHook = __webpack_require__(28);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _PathUtils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var useBasename = function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);
	    var basename = options.basename;


	    var addBasename = function addBasename(location) {
	      if (!location) return location;

	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    };

	    var prependBasename = function prependBasename(location) {
	      if (!basename) return location;

	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var pname = object.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, object, {
	        pathname: pathname
	      });
	    };

	    // Override all read methods with basename-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return addBasename(history.getCurrentLocation());
	    };

	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, addBasename(location), callback);
	      });
	    };

	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(addBasename(location));
	      });
	    };

	    // Override all write methods with basename-aware versions.
	    var push = function push(location) {
	      return history.push(prependBasename(location));
	    };

	    var replace = function replace(location) {
	      return history.replace(prependBasename(location));
	    };

	    var createPath = function createPath(location) {
	      return history.createPath(prependBasename(location));
	    };

	    var createHref = function createHref(location) {
	      return history.createHref(prependBasename(location));
	    };

	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    };

	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};

	exports.default = useBasename;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _invariant = __webpack_require__(14);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _DOMUtils = __webpack_require__(13);

	var _ExecutionEnvironment = __webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var startListener = function startListener(getPromptMessage) {
	  var handleBeforeUnload = function handleBeforeUnload(event) {
	    var message = getPromptMessage();

	    if (typeof message === 'string') {
	      (event || window.event).returnValue = message;
	      return message;
	    }

	    return undefined;
	  };

	  (0, _DOMUtils.addEventListener)(window, 'beforeunload', handleBeforeUnload);

	  return function () {
	    return (0, _DOMUtils.removeEventListener)(window, 'beforeunload', handleBeforeUnload);
	  };
	};

	/**
	 * Returns a new createHistory function that can be used to create
	 * history objects that know how to use the beforeunload event in web
	 * browsers to cancel navigation.
	 */
	var useBeforeUnload = function useBeforeUnload(createHistory) {
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'useBeforeUnload only works in DOM environments') : (0, _invariant2.default)(false) : void 0;

	  return function (options) {
	    var history = createHistory(options);

	    var listeners = [];
	    var stopListener = void 0;

	    var getPromptMessage = function getPromptMessage() {
	      var message = void 0;
	      for (var i = 0, len = listeners.length; message == null && i < len; ++i) {
	        message = listeners[i].call();
	      }return message;
	    };

	    var listenBeforeUnload = function listenBeforeUnload(listener) {
	      if (listeners.push(listener) === 1) stopListener = startListener(getPromptMessage);

	      return function () {
	        listeners = listeners.filter(function (item) {
	          return item !== listener;
	        });

	        if (listeners.length === 0 && stopListener) {
	          stopListener();
	          stopListener = null;
	        }
	      };
	    };

	    return _extends({}, history, {
	      listenBeforeUnload: listenBeforeUnload
	    });
	  };
	};

	exports.default = useBeforeUnload;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _queryString = __webpack_require__(155);

	var _runTransitionHook = __webpack_require__(28);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _LocationUtils = __webpack_require__(8);

	var _PathUtils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultStringifyQuery = function defaultStringifyQuery(query) {
	  return (0, _queryString.stringify)(query).replace(/%20/g, '+');
	};

	var defaultParseQueryString = _queryString.parse;

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	var useQueries = function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var history = createHistory(options);
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;


	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    var decodeQuery = function decodeQuery(location) {
	      if (!location) return location;

	      if (location.query == null) location.query = parseQueryString(location.search.substring(1));

	      return location;
	    };

	    var encodeQuery = function encodeQuery(location, query) {
	      if (query == null) return location;

	      var object = typeof location === 'string' ? (0, _PathUtils.parsePath)(location) : location;
	      var queryString = stringifyQuery(query);
	      var search = queryString ? '?' + queryString : '';

	      return _extends({}, object, {
	        search: search
	      });
	    };

	    // Override all read methods with query-aware versions.
	    var getCurrentLocation = function getCurrentLocation() {
	      return decodeQuery(history.getCurrentLocation());
	    };

	    var listenBefore = function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        return (0, _runTransitionHook2.default)(hook, decodeQuery(location), callback);
	      });
	    };

	    var listen = function listen(listener) {
	      return history.listen(function (location) {
	        return listener(decodeQuery(location));
	      });
	    };

	    // Override all write methods with query-aware versions.
	    var push = function push(location) {
	      return history.push(encodeQuery(location, location.query));
	    };

	    var replace = function replace(location) {
	      return history.replace(encodeQuery(location, location.query));
	    };

	    var createPath = function createPath(location) {
	      return history.createPath(encodeQuery(location, location.query));
	    };

	    var createHref = function createHref(location) {
	      return history.createHref(encodeQuery(location, location.query));
	    };

	    var createLocation = function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var newLocation = history.createLocation.apply(history, [encodeQuery(location, location.query)].concat(args));

	      if (location.query) newLocation.query = (0, _LocationUtils.createQuery)(location.query);

	      return decodeQuery(newLocation);
	    };

	    return _extends({}, history, {
	      getCurrentLocation: getCurrentLocation,
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation
	    });
	  };
	};

	exports.default = useQueries;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  XmlEntities: __webpack_require__(138),
	  Html4Entities: __webpack_require__(137),
	  Html5Entities: __webpack_require__(45),
	  AllHtmlEntities: __webpack_require__(45)
	};


/***/ },
/* 137 */
/***/ function(module, exports) {

	var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'Oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'oelig', 'oelig', 'scaron', 'scaron', 'yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
	var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

	var alphaIndex = {};
	var numIndex = {};

	var i = 0;
	var length = HTML_ALPHA.length;
	while (i < length) {
	    var a = HTML_ALPHA[i];
	    var c = HTML_CODES[i];
	    alphaIndex[a] = String.fromCharCode(c);
	    numIndex[c] = a;
	    i++;
	}

	/**
	 * @constructor
	 */
	function Html4Entities() {}

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
	        var chr;
	        if (entity.charAt(0) === "#") {
	            var code = entity.charAt(1).toLowerCase() === 'x' ?
	                parseInt(entity.substr(2), 16) :
	                parseInt(entity.substr(1));

	            if (!(isNaN(code) || code < -32768 || code > 65535)) {
	                chr = String.fromCharCode(code);
	            }
	        } else {
	            chr = alphaIndex[entity];
	        }
	        return chr || s;
	    });
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.decode = function(str) {
	    return new Html4Entities().decode(str);
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encode = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var alpha = numIndex[str.charCodeAt(i)];
	        result += alpha ? "&" + alpha + ";" : str.charAt(i);
	        i++;
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encode = function(str) {
	    return new Html4Entities().encode(str);
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var cc = str.charCodeAt(i);
	        var alpha = numIndex[cc];
	        if (alpha) {
	            result += "&" + alpha + ";";
	        } else if (cc < 32 || cc > 126) {
	            result += "&#" + cc + ";";
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonUTF = function(str) {
	    return new Html4Entities().encodeNonUTF(str);
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.prototype.encodeNonASCII = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	Html4Entities.encodeNonASCII = function(str) {
	    return new Html4Entities().encodeNonASCII(str);
	};

	module.exports = Html4Entities;


/***/ },
/* 138 */
/***/ function(module, exports) {

	var ALPHA_INDEX = {
	    '&lt': '<',
	    '&gt': '>',
	    '&quot': '"',
	    '&apos': '\'',
	    '&amp': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&apos;': '\'',
	    '&amp;': '&'
	};

	var CHAR_INDEX = {
	    60: 'lt',
	    62: 'gt',
	    34: 'quot',
	    39: 'apos',
	    38: 'amp'
	};

	var CHAR_S_INDEX = {
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&apos;',
	    '&': '&amp;'
	};

	/**
	 * @constructor
	 */
	function XmlEntities() {}

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/<|>|"|'|&/g, function(s) {
	        return CHAR_S_INDEX[s];
	    });
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encode = function(str) {
	    return new XmlEntities().encode(str);
	 };

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.decode = function(str) {
	    if (str.length === 0) {
	        return '';
	    }
	    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
	        if (s.charAt(1) === '#') {
	            var code = s.charAt(2).toLowerCase() === 'x' ?
	                parseInt(s.substr(3), 16) :
	                parseInt(s.substr(2));

	            if (isNaN(code) || code < -32768 || code > 65535) {
	                return '';
	            }
	            return String.fromCharCode(code);
	        }
	        return ALPHA_INDEX[s] || s;
	    });
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.decode = function(str) {
	    return new XmlEntities().decode(str);
	 };

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonUTF = function(str) {
	    var strLength = str.length;
	    if (strLength === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLength) {
	        var c = str.charCodeAt(i);
	        var alpha = CHAR_INDEX[c];
	        if (alpha) {
	            result += "&" + alpha + ";";
	            i++;
	            continue;
	        }
	        if (c < 32 || c > 126) {
	            result += '&#' + c + ';';
	        } else {
	            result += str.charAt(i);
	        }
	        i++;
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonUTF = function(str) {
	    return new XmlEntities().encodeNonUTF(str);
	 };

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	XmlEntities.prototype.encodeNonASCII = function(str) {
	    var strLenght = str.length;
	    if (strLenght === 0) {
	        return '';
	    }
	    var result = '';
	    var i = 0;
	    while (i < strLenght) {
	        var c = str.charCodeAt(i);
	        if (c <= 255) {
	            result += str[i++];
	            continue;
	        }
	        result += '&#' + c + ';';
	        i++;
	    }
	    return result;
	};

	/**
	 * @param {String} str
	 * @returns {String}
	 */
	 XmlEntities.encodeNonASCII = function(str) {
	    return new XmlEntities().encodeNonASCII(str);
	 };

	module.exports = XmlEntities;


/***/ },
/* 139 */
/***/ function(module, exports) {

	var inserted = [];

	module.exports = function (css) {
	    if (inserted.indexOf(css) >= 0) return;
	    inserted.push(css);
	    
	    var elem = document.createElement('style');
	    var text = document.createTextNode(css);
	    elem.appendChild(text);
	    
	    if (document.head.childNodes.length) {
	        document.head.insertBefore(elem, document.head.childNodes[0]);
	    }
	    else {
	        document.head.appendChild(elem);
	    }
	};


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(49),
	    isArray = __webpack_require__(50);

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict, result) {
	  result || (result = []);

	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, isDeep, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = baseFlatten;


/***/ },
/* 141 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = baseFor;


/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 * If `fromRight` is provided elements of `array` are iterated from right to left.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseIndexOf = __webpack_require__(142),
	    cacheIndexOf = __webpack_require__(145),
	    createCache = __webpack_require__(146);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of `_.uniq` without support for callback shorthands
	 * and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The function invoked per iteration.
	 * @returns {Array} Returns the new duplicate-value-free array.
	 */
	function baseUniq(array, iteratee) {
	  var index = -1,
	      indexOf = baseIndexOf,
	      length = array.length,
	      isCommon = true,
	      isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	      seen = isLarge ? createCache() : null,
	      result = [];

	  if (seen) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	  } else {
	    isLarge = false;
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value, index, array) : value;

	    if (isCommon && value === value) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (indexOf(seen, computed, 0) < 0) {
	      if (iteratee || isLarge) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseUniq;


/***/ },
/* 144 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = bindCallback;


/***/ },
/* 145 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

	  return result ? 0 : -1;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = cacheIndexOf;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(46);

	/** Native method references. */
	var Set = getNative(global, 'Set');

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;

	  this.data = { 'hash': nativeCreate(null), 'set': new Set };
	  while (length--) {
	    this.push(values[length]);
	  }
	}

	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}

	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	function createCache(values) {
	  return (nativeCreate && Set) ? new SetCache(values) : null;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;

	module.exports = createCache;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(29);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0';

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/** Used to map latin-1 supplementary letters to basic latin letters. */
	var deburredLetters = {
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss'
	};

	/**
	 * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	function deburrLetter(letter) {
	  return deburredLetters[letter];
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var deburr = __webpack_require__(147),
	    words = __webpack_require__(152);

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string)), callback, '');
	  };
	}

	/**
	 * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__foo_bar__');
	 * // => 'foo-bar'
	 */
	var kebabCase = createCompounder(function(result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});

	module.exports = kebabCase;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var getNative = __webpack_require__(46),
	    isArguments = __webpack_require__(49),
	    isArray = __webpack_require__(50);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 150 */
/***/ function(module, exports) {

	/**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFlatten = __webpack_require__(140),
	    baseUniq = __webpack_require__(143),
	    restParam = __webpack_require__(150);

	/**
	 * Creates an array of unique values, in order, of the provided arrays using
	 * `SameValueZero` for equality comparisons.
	 *
	 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
	 * comparisons are like strict equality comparisons, e.g. `===`, except that
	 * `NaN` matches `NaN`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([1, 2], [4, 2], [2, 1]);
	 * // => [1, 2, 4]
	 */
	var union = restParam(function(arrays) {
	  return baseUniq(baseFlatten(arrays, false, true));
	});

	module.exports = union;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var root = __webpack_require__(29);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsQuoteRange = '\\u2018\\u2019\\u201c\\u201d',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match non-compound words composed of alphanumeric characters. */
	var reBasicWord = /[a-zA-Z0-9]+/g;

	/** Used to match complex or compound words. */
	var reComplexWord = RegExp([
	  rsUpper + '?' + rsLower + '+(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+',
	  rsUpper + '+',
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasComplexWord = /[a-z][A-Z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var Symbol = root.Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord;
	  }
	  return string.match(pattern) || [];
	}

	module.exports = words;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var insert = __webpack_require__(139);
	var normalize = __webpack_require__(154);

	insert(normalize);


/***/ },
/* 154 */
/***/ function(module, exports) {

	module.exports = "/*! normalize.css v2.1.3 | MIT License | git.io/normalize */\n\n/* ==========================================================================\n   HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined in IE 8/9.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n    display: block;\n}\n\n/**\n * Correct `inline-block` display not defined in IE 8/9.\n */\n\naudio,\ncanvas,\nvideo {\n    display: inline-block;\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n    display: none;\n    height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9.\n * Hide the `template` element in IE, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n    display: none;\n}\n\n/* ==========================================================================\n   Base\n   ========================================================================== */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n    font-family: sans-serif; /* 1 */\n    -ms-text-size-adjust: 100%; /* 2 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n    background: transparent;\n}\n\n/**\n * Address `outline` inconsistency between Chrome and other browsers.\n */\n\na:focus {\n    outline: thin dotted;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n    outline: 0;\n}\n\n/* ==========================================================================\n   Typography\n   ========================================================================== */\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari 5, and Chrome.\n */\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9, Safari 5, and Chrome.\n */\n\nabbr[title] {\n    border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.\n */\n\nb,\nstrong {\n    font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari 5 and Chrome.\n */\n\ndfn {\n    font-style: italic;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n    background: #ff0;\n    color: #000;\n}\n\n/**\n * Correct font family set oddly in Safari 5 and Chrome.\n */\n\ncode,\nkbd,\npre,\nsamp {\n    font-family: monospace, serif;\n    font-size: 1em;\n}\n\n/**\n * Improve readability of pre-formatted text in all browsers.\n */\n\npre {\n    white-space: pre-wrap;\n}\n\n/**\n * Set consistent quote types.\n */\n\nq {\n    quotes: \"\\201C\" \"\\201D\" \"\\2018\" \"\\2019\";\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n    font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsup {\n    top: -0.5em;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\n/* ==========================================================================\n   Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9.\n */\n\nimg {\n    border: 0;\n}\n\n/**\n * Correct overflow displayed oddly in IE 9.\n */\n\nsvg:not(:root) {\n    overflow: hidden;\n}\n\n/* ==========================================================================\n   Figures\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari 5.\n */\n\nfigure {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Forms\n   ========================================================================== */\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n    border: 0; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Correct font family not being inherited in all browsers.\n * 2. Correct font size not being inherited in all browsers.\n * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n    font-family: inherit; /* 1 */\n    font-size: 100%; /* 2 */\n    margin: 0; /* 3 */\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\nbutton,\ninput {\n    line-height: normal;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Chrome, Safari 5+, and IE 8+.\n * Correct `select` style inheritance in Firefox 4+ and Opera.\n */\n\nbutton,\nselect {\n    text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n    -webkit-appearance: button; /* 2 */\n    cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n    cursor: default;\n}\n\n/**\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n    box-sizing: border-box; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n    -webkit-appearance: textfield; /* 1 */\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box; /* 2 */\n    box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari 5 and Chrome\n * on OS X.\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n/**\n * 1. Remove default vertical scrollbar in IE 8/9.\n * 2. Improve readability and alignment in all browsers.\n */\n\ntextarea {\n    overflow: auto; /* 1 */\n    vertical-align: top; /* 2 */\n}\n\n/* ==========================================================================\n   Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n"


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(174);
	var objectAssign = __webpack_require__(156);

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}

		return value;
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});

		return ret;
	};

	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};

		opts = objectAssign(defaults, opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 156 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = classNameFromVNode;

	var _selectorParser2 = __webpack_require__(52);

	var _selectorParser3 = _interopRequireDefault(_selectorParser2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function classNameFromVNode(vNode) {
	  var _selectorParser = (0, _selectorParser3.default)(vNode.sel);

	  var cn = _selectorParser.className;


	  if (!vNode.data) {
	    return cn;
	  }

	  var _vNode$data = vNode.data;
	  var dataClass = _vNode$data.class;
	  var props = _vNode$data.props;


	  if (dataClass) {
	    var c = Object.keys(vNode.data.class).filter(function (cl) {
	      return vNode.data.class[cl];
	    });
	    cn += ' ' + c.join(' ');
	  }

	  if (props && props.className) {
	    cn += ' ' + props.className;
	  }

	  return cn.trim();
	}

/***/ },
/* 158 */
/***/ function(module, exports) {

	
	// All SVG children elements, not in this list, should self-close

	module.exports = {
	  // http://www.w3.org/TR/SVG/intro.html#TermContainerElement
	  'a': true,
	  'defs': true,
	  'glyph': true,
	  'g': true,
	  'marker': true,
	  'mask': true,
	  'missing-glyph': true,
	  'pattern': true,
	  'svg': true,
	  'switch': true,
	  'symbol': true,

	  // http://www.w3.org/TR/SVG/intro.html#TermDescriptiveElement
	  'desc': true,
	  'metadata': true,
	  'title': true
	};

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	
	var init = __webpack_require__(160);

	module.exports = init([__webpack_require__(161), __webpack_require__(162)]);

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	
	var parseSelector = __webpack_require__(53);
	var VOID_ELEMENTS = __webpack_require__(163);
	var CONTAINER_ELEMENTS = __webpack_require__(158);

	module.exports = function init(modules) {
	  function parse(data) {
	    return modules.reduce(function (arr, fn) {
	      arr.push(fn(data));
	      return arr;
	    }, []).filter(function (result) {
	      return result !== '';
	    });
	  }

	  return function renderToString(vnode) {
	    if (!vnode.sel && vnode.text) {
	      return vnode.text;
	    }

	    vnode.data = vnode.data || {};

	    // Support thunks
	    if (typeof vnode.sel === 'string' && vnode.sel.slice(0, 5) === 'thunk') {
	      vnode = vnode.data.fn.apply(null, vnode.data.args);
	    }

	    var tagName = parseSelector(vnode.sel).tagName;
	    var attributes = parse(vnode);
	    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg';
	    var tag = [];

	    // Open tag
	    tag.push('<' + tagName);
	    if (attributes.length) {
	      tag.push(' ' + attributes.join(' '));
	    }
	    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
	      tag.push(' /');
	    }
	    tag.push('>');

	    // Close tag, if needed
	    if (VOID_ELEMENTS[tagName] !== true && !svg || svg && CONTAINER_ELEMENTS[tagName] === true) {
	      if (vnode.data.props && vnode.data.props.innerHTML) {
	        tag.push(vnode.data.props.innerHTML);
	      } else if (vnode.text) {
	        tag.push(vnode.text);
	      } else if (vnode.children) {
	        vnode.children.forEach(function (child) {
	          tag.push(renderToString(child));
	        });
	      }
	      tag.push('</' + tagName + '>');
	    }

	    return tag.join('');
	  };
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	
	var forOwn = __webpack_require__(48);
	var escape = __webpack_require__(47);
	var union = __webpack_require__(151);

	var parseSelector = __webpack_require__(53);

	// data.attrs, data.props, data.class

	module.exports = function attributes(vnode) {
	  var selector = parseSelector(vnode.sel);
	  var parsedClasses = selector.className.split(' ');

	  var attributes = [];
	  var classes = [];
	  var values = {};

	  if (selector.id) {
	    values.id = selector.id;
	  }

	  setAttributes(vnode.data.props, values);
	  setAttributes(vnode.data.attrs, values); // `attrs` override `props`, not sure if this is good so

	  if (vnode.data.class) {
	    // Omit `className` attribute if `class` is set on vnode
	    values.class = undefined;
	  }
	  forOwn(vnode.data.class, function (value, key) {
	    if (value === true) {
	      classes.push(key);
	    }
	  });
	  classes = union(classes, values.class, parsedClasses).filter(function (x) {
	    return x !== '';
	  });

	  if (classes.length) {
	    values.class = classes.join(' ');
	  }

	  forOwn(values, function (value, key) {
	    attributes.push(value === true ? key : key + '="' + escape(value) + '"');
	  });

	  return attributes.length ? attributes.join(' ') : '';
	};

	function setAttributes(values, target) {
	  forOwn(values, function (value, key) {
	    if (key === 'htmlFor') {
	      target['for'] = value;
	      return;
	    }
	    if (key === 'className') {
	      target['class'] = value.split(' ');
	      return;
	    }
	    if (key === 'innerHTML') {
	      return;
	    }
	    target[key] = value;
	  });
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var forOwn = __webpack_require__(48);
	var escape = __webpack_require__(47);
	var kebabCase = __webpack_require__(148);

	// data.style

	module.exports = function style(vnode) {
	  var styles = [];
	  var style = vnode.data.style || {};

	  // merge in `delayed` properties
	  if (style.delayed) {
	    _extends(style, style.delayed);
	  }

	  forOwn(style, function (value, key) {
	    // omit hook objects
	    if (typeof value === 'string') {
	      styles.push(kebabCase(key) + ': ' + escape(value));
	    }
	  });

	  return styles.length ? 'style="' + styles.join('; ') + '"' : '';
	};

/***/ },
/* 163 */
/***/ function(module, exports) {

	
	// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements

	module.exports = {
	  area: true,
	  base: true,
	  br: true,
	  col: true,
	  embed: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true,
	  wbr: true
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var VNode = __webpack_require__(31);
	var is = __webpack_require__(19);

	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}

	module.exports = function h(sel, b, c) {
	  var data = {}, children, text, i;
	  if (c !== undefined) {
	    data = b;
	    if (is.array(c)) { children = c; }
	    else if (is.primitive(c)) { text = c; }
	  } else if (b !== undefined) {
	    if (is.array(b)) { children = b; }
	    else if (is.primitive(b)) { text = b; }
	    else { data = b; }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return VNode(sel, data, children, text, undefined);
	};


/***/ },
/* 165 */
/***/ function(module, exports) {

	function createElement(tagName){
	  return document.createElement(tagName);
	}

	function createElementNS(namespaceURI, qualifiedName){
	  return document.createElementNS(namespaceURI, qualifiedName);
	}

	function createTextNode(text){
	  return document.createTextNode(text);
	}


	function insertBefore(parentNode, newNode, referenceNode){
	  parentNode.insertBefore(newNode, referenceNode);
	}


	function removeChild(node, child){
	  node.removeChild(child);
	}

	function appendChild(node, child){
	  node.appendChild(child);
	}

	function parentNode(node){
	  return node.parentElement;
	}

	function nextSibling(node){
	  return node.nextSibling;
	}

	function tagName(node){
	  return node.tagName;
	}

	function setTextContent(node, text){
	  node.textContent = text;
	}

	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};


/***/ },
/* 166 */
/***/ function(module, exports) {

	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", 
	                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", 
	                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", 
	                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", 
	                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", 
	                "truespeed", "typemustmatch", "visible"];
	    
	var booleanAttrsDict = {};
	for(var i=0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	    
	function updateAttrs(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
	  
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if(!cur && booleanAttrsDict[key])
	        elm.removeAttribute(key);
	      else
	        elm.setAttribute(key, cur);
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}

	module.exports = {create: updateAttrs, update: updateAttrs};


/***/ },
/* 167 */
/***/ function(module, exports) {

	function updateClass(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldClass = oldVnode.data.class || {},
	      klass = vnode.data.class || {};
	  for (name in oldClass) {
	    if (!klass[name]) {
	      elm.classList.remove(name);
	    }
	  }
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}

	module.exports = {create: updateClass, update: updateClass};


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(19);

	function arrInvoker(arr) {
	  return function() {
	    if (!arr.length) return;
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}

	function fnInvoker(o) {
	  return function(ev) { 
	    if (o.fn === null) return;
	    o.fn(ev); 
	  };
	}

	function updateEventListeners(oldVnode, vnode) {
	  var name, cur, old, elm = vnode.elm,
	      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = {fn: cur};
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) old[i] = cur[i];
	      on[name]  = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	  if (oldOn) {
	    for (name in oldOn) {
	      if (on[name] === undefined) {
	        var old = oldOn[name];
	        if (is.array(old)) {
	          old.length = 0;
	        }
	        else {
	          old.fn = null;
	        }
	      }
	    }
	  }
	}

	module.exports = {create: updateEventListeners, update: updateEventListeners};


/***/ },
/* 169 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };

	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}

	function getTextNodeRect(textNode) {
	  var rect;
	  if (document.createRange) {
	    var range = document.createRange();
	    range.selectNodeContents(textNode);
	    if (range.getBoundingClientRect) {
	        rect = range.getBoundingClientRect();
	    }
	  }
	  return rect;
	}

	function calcTransformOrigin(isTextNode, textRect, boundingRect) {
	  if (isTextNode) {
	    if (textRect) {
	      //calculate pixels to center of text from left edge of bounding box
	      var relativeCenterX = textRect.left + textRect.width/2 - boundingRect.left;
	      var relativeCenterY = textRect.top + textRect.height/2 - boundingRect.top;
	      return relativeCenterX + 'px ' + relativeCenterY + 'px';
	    }
	  }
	  return '0 0'; //top left
	}

	function getTextDx(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.left + oldTextRect.width/2) - (newTextRect.left + newTextRect.width/2));
	  }
	  return 0;
	}
	function getTextDy(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return ((oldTextRect.top + oldTextRect.height/2) - (newTextRect.top + newTextRect.height/2));
	  }
	  return 0;
	}

	function isTextElement(elm) {
	  return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
	}

	var removed, created;

	function pre(oldVnode, vnode) {
	  removed = {};
	  created = [];
	}

	function create(oldVnode, vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    created.push(hero.id);
	    created.push(vnode);
	  }
	}

	function destroy(vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    var elm = vnode.elm;
	    vnode.isTextNode = isTextElement(elm); //is this a text node?
	    vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
	    vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
	    var computedStyle = window.getComputedStyle(elm, null); //get current styles (includes inherited properties)
	    vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
	    removed[hero.id] = vnode;
	  }
	}

	function post() {
	  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio,
	      oldRect, newRect, dx, dy, origTransform, origTransition,
	      newStyle, oldStyle, newComputedStyle, isTextNode,
	      newTextRect, oldTextRect;
	  for (i = 0; i < created.length; i += 2) {
	    id = created[i];
	    newElm = created[i+1].elm;
	    oldVnode = removed[id];
	    if (oldVnode) {
	      isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
	      newStyle = newElm.style;
	      newComputedStyle = window.getComputedStyle(newElm, null); //get full computed style for new element
	      oldElm = oldVnode.elm;
	      oldStyle = oldElm.style;
	      //Overall element bounding boxes
	      newRect = newElm.getBoundingClientRect();
	      oldRect = oldVnode.boundingRect; //previously saved bounding rect
	      //Text node bounding boxes & distances
	      if (isTextNode) {
	        newTextRect = getTextNodeRect(newElm.childNodes[0]);
	        oldTextRect = oldVnode.textRect;
	        dx = getTextDx(oldTextRect, newTextRect);
	        dy = getTextDy(oldTextRect, newTextRect);
	      } else {
	        //Calculate distances between old & new positions
	        dx = oldRect.left - newRect.left;
	        dy = oldRect.top - newRect.top;
	      }
	      hRatio = newRect.height / (Math.max(oldRect.height, 1));
	      wRatio = isTextNode ? hRatio : newRect.width / (Math.max(oldRect.width, 1)); //text scales based on hRatio
	      // Animate new element
	      origTransform = newStyle.transform;
	      origTransition = newStyle.transition;
	      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
	        newStyle.display = 'inline-block';        //this does not appear to have any negative side effects
	      newStyle.transition = origTransition + 'transform 0s';
	      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
	      newStyle.opacity = '0';
	      newStyle.transform = origTransform + 'translate('+dx+'px, '+dy+'px) ' +
	                               'scale('+1/wRatio+', '+1/hRatio+')';
	      setNextFrame(newStyle, 'transition', origTransition);
	      setNextFrame(newStyle, 'transform', origTransform);
	      setNextFrame(newStyle, 'opacity', '1');
	      // Animate old element
	      for (var key in oldVnode.savedStyle) { //re-apply saved inherited properties
	        if (parseInt(key) != key) {
	          var ms = key.substring(0,2) === 'ms';
	          var moz = key.substring(0,3) === 'moz';
	          var webkit = key.substring(0,6) === 'webkit';
	      	  if (!ms && !moz && !webkit) //ignore prefixed style properties
	        	  oldStyle[key] = oldVnode.savedStyle[key];
	        }
	      }
	      oldStyle.position = 'absolute';
	      oldStyle.top = oldRect.top + 'px'; //start at existing position
	      oldStyle.left = oldRect.left + 'px';
	      oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
	      oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
	      oldStyle.transform = '';
	      oldStyle.opacity = '1';
	      document.body.appendChild(oldElm);
	      setNextFrame(oldStyle, 'transform', 'translate('+ -dx +'px, '+ -dy +'px) scale('+wRatio+', '+hRatio+')'); //scale must be on far right for translate to be correct
	      setNextFrame(oldStyle, 'opacity', '0');
	      oldElm.addEventListener('transitionend', function(ev) {
	        if (ev.propertyName === 'transform')
	          document.body.removeChild(ev.target);
	      });
	    }
	  }
	  removed = created = undefined;
	}

	module.exports = {pre: pre, create: create, destroy: destroy, post: post};


/***/ },
/* 170 */
/***/ function(module, exports) {

	function updateProps(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}

	module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 171 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };

	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}

	function updateStyle(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldStyle = oldVnode.data.style || {},
	      style = vnode.data.style || {},
	      oldHasDel = 'delayed' in oldStyle;
	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}

	function applyDestroyStyle(vnode) {
	  var style, name, elm = vnode.elm, s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}

	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
	      compStyle, style = s.remove, amount = 0, applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if(applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function(ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}

	module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';

	var VNode = __webpack_require__(31);
	var is = __webpack_require__(19);
	var domApi = __webpack_require__(165);

	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }

	var emptyNode = VNode('', {}, [], undefined, undefined);

	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i, map = {}, key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}

	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

	function init(modules, api) {
	  var i, j, cbs = {};

	  if (isUndef(api)) api = domApi;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }

	  function emptyNodeAt(elm) {
	    return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }

	  function createRmCb(childElm, listeners) {
	    return function() {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }

	  function createElm(vnode, insertedVnodeQueue) {
	    var i, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) {
	        i(vnode);
	        data = vnode.data;
	      }
	    }
	    var elm, children = vnode.children, sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
	                                                          : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }

	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook(vnode) {
	    var i, j, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	    }
	  }

	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i, listeners, rm, ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
	          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else { // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0, newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) { // New element
	          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
	      i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }

	  return function(oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

	    if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }

	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);

	      createElm(vnode, insertedVnodeQueue);

	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }

	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	    return vnode;
	  };
	}

	module.exports = {init: init};


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(164);

	function copyToThunk(vnode, thunk) {
	  thunk.elm = vnode.elm;
	  vnode.data.fn = thunk.data.fn;
	  vnode.data.args = thunk.data.args;
	  thunk.data = vnode.data;
	  thunk.children = vnode.children;
	  thunk.text = vnode.text;
	  thunk.elm = vnode.elm;
	}

	function init(thunk) {
	  var i, cur = thunk.data;
	  var vnode = cur.fn.apply(undefined, cur.args);
	  copyToThunk(vnode, thunk);
	}

	function prepatch(oldVnode, thunk) {
	  var i, old = oldVnode.data, cur = thunk.data, vnode;
	  var oldArgs = old.args, args = cur.args;
	  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
	    copyToThunk(cur.fn.apply(undefined, args), thunk);
	  }
	  for (i = 0; i < args.length; ++i) {
	    if (oldArgs[i] !== args[i]) {
	      copyToThunk(cur.fn.apply(undefined, args), thunk);
	      return;
	    }
	  }
	  copyToThunk(oldVnode, thunk);
	}

	module.exports = function(sel, key, fn, args) {
	  if (args === undefined) {
	    args = fn;
	    fn = key;
	    key = undefined;
	  }
	  return h(sel, {
	    key: key,
	    hook: {init: init, prepatch: prepatch},
	    fn: fn,
	    args: args
	  });
	};


/***/ },
/* 174 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(74)();

	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(177);
	function switchPathInputGuard(path, routes) {
	    if (!util_1.isPattern(path)) {
	        throw new Error("First parameter to switchPath must be a route path.");
	    }
	    if (!util_1.isRouteDefinition(routes)) {
	        throw new Error("Second parameter to switchPath must be an object " +
	            "containing route patterns.");
	    }
	}
	function validatePath(sourcePath, matchedPath) {
	    var sourceParts = util_1.splitPath(sourcePath);
	    var matchedParts = util_1.splitPath(matchedPath);
	    for (var i = 0; i < matchedParts.length; ++i) {
	        if (matchedParts[i] !== sourceParts[i]) {
	            return null;
	        }
	    }
	    return "/" + util_1.extractPartial(sourcePath, matchedPath);
	}
	function betterMatch(candidate, reference) {
	    if (!util_1.isNotNull(candidate)) {
	        return false;
	    }
	    if (!util_1.isNotNull(reference)) {
	        return true;
	    }
	    if (!validatePath(candidate, reference)) {
	        return false;
	    }
	    return candidate.length >= reference.length;
	}
	function matchesWithParams(sourcePath, pattern) {
	    var sourceParts = util_1.splitPath(sourcePath);
	    var patternParts = util_1.splitPath(pattern);
	    var params = patternParts
	        .map(function (part, i) { return util_1.isParam(part) ? sourceParts[i] : null; })
	        .filter(util_1.isNotNull);
	    var matched = patternParts
	        .every(function (part, i) { return util_1.isParam(part) || part === sourceParts[i]; });
	    return matched ? params : [];
	}
	function getParamFnValue(paramFn, params) {
	    var _paramFn = util_1.isRouteDefinition(paramFn) ? paramFn["/"] : paramFn;
	    return typeof _paramFn === "function" ? _paramFn.apply(void 0, params) : _paramFn;
	}
	function validate(_a) {
	    var sourcePath = _a.sourcePath, matchedPath = _a.matchedPath, matchedValue = _a.matchedValue, routes = _a.routes;
	    var path = matchedPath ? validatePath(sourcePath, matchedPath) : null;
	    var value = matchedValue;
	    if (!path) {
	        path = routes["*"] ? sourcePath : null;
	        value = path ? routes["*"] : null;
	    }
	    return { path: path, value: value };
	}
	function switchPath(sourcePath, routes) {
	    switchPathInputGuard(sourcePath, routes);
	    var matchedPath = null;
	    var matchedValue = null;
	    util_1.traverseRoutes(routes, function matchPattern(pattern) {
	        if (sourcePath.search(pattern) === 0 && betterMatch(pattern, matchedPath)) {
	            matchedPath = pattern;
	            matchedValue = routes[pattern];
	        }
	        var params = matchesWithParams(sourcePath, pattern).filter(Boolean);
	        if (params.length > 0 && betterMatch(sourcePath, matchedPath)) {
	            matchedPath = util_1.extractPartial(sourcePath, pattern);
	            matchedValue = getParamFnValue(routes[pattern], params);
	        }
	        if (util_1.isRouteDefinition(routes[pattern]) && params.length === 0) {
	            if (sourcePath !== "/") {
	                var child = switchPath(util_1.unprefixed(sourcePath, pattern) || "/", routes[pattern]);
	                var nestedPath = pattern + child.path;
	                if (child.path !== null &&
	                    betterMatch(nestedPath, matchedPath)) {
	                    matchedPath = nestedPath;
	                    matchedValue = child.value;
	                }
	            }
	        }
	    });
	    return validate({ sourcePath: sourcePath, matchedPath: matchedPath, matchedValue: matchedValue, routes: routes });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = switchPath;
	//# sourceMappingURL=index.js.map

/***/ },
/* 177 */
/***/ function(module, exports) {

	"use strict";
	function isPattern(candidate) {
	    return candidate.charAt(0) === "/" || candidate === "*";
	}
	exports.isPattern = isPattern;
	function isRouteDefinition(candidate) {
	    return !candidate || typeof candidate !== "object" ?
	        false : isPattern(Object.keys(candidate)[0]);
	}
	exports.isRouteDefinition = isRouteDefinition;
	function traverseRoutes(routes, callback) {
	    var keys = Object.keys(routes);
	    for (var i = 0; i < keys.length; ++i) {
	        var pattern = keys[i];
	        if (pattern === "*")
	            continue;
	        callback(pattern);
	    }
	}
	exports.traverseRoutes = traverseRoutes;
	function isNotNull(candidate) {
	    return candidate !== null;
	}
	exports.isNotNull = isNotNull;
	function splitPath(path) {
	    return path.split("/").filter(function (s) { return !!s; });
	}
	exports.splitPath = splitPath;
	function isParam(candidate) {
	    return candidate.match(/:\w+/) !== null;
	}
	exports.isParam = isParam;
	function extractPartial(sourcePath, pattern) {
	    var patternParts = splitPath(pattern);
	    var sourceParts = splitPath(sourcePath);
	    var matchedParts = [];
	    for (var i = 0; i < patternParts.length; ++i) {
	        matchedParts.push(sourceParts[i]);
	    }
	    return matchedParts.filter(isNotNull).join("/");
	}
	exports.extractPartial = extractPartial;
	function unprefixed(fullString, prefix) {
	    return fullString.split(prefix)[1];
	}
	exports.unprefixed = unprefixed;
	//# sourceMappingURL=util.js.map

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(179);


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ponyfill = __webpack_require__(180);

	var _ponyfill2 = _interopRequireDefault(_ponyfill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var root; /* global window */


	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(32)(module)))

/***/ },
/* 180 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-env browser*/

	var clientOverlay = document.createElement('div');
	var styles = {
	  background: 'rgba(0,0,0,0.85)',
	  color: '#E8E8E8',
	  lineHeight: '1.2',
	  whiteSpace: 'pre',
	  fontFamily: 'Menlo, Consolas, monospace',
	  fontSize: '13px',
	  position: 'fixed',
	  zIndex: 9999,
	  padding: '10px',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0,
	  overflow: 'auto',
	  dir: 'ltr'
	};
	for (var key in styles) {
	  clientOverlay.style[key] = styles[key];
	}

	var ansiHTML = __webpack_require__(73);
	var colors = {
	  reset: ['transparent', 'transparent'],
	  black: '181818',
	  red: 'E36049',
	  green: 'B3CB74',
	  yellow: 'FFD080',
	  blue: '7CAFC2',
	  magenta: '7FACCA',
	  cyan: 'C3C2EF',
	  lightgrey: 'EBE7E3',
	  darkgrey: '6D7891'
	};
	ansiHTML.setColors(colors);

	var Entities = __webpack_require__(136).AllHtmlEntities;
	var entities = new Entities();

	exports.showProblems =
	function showProblems(type, lines) {
	  clientOverlay.innerHTML = '';
	  lines.forEach(function(msg) {
	    msg = ansiHTML(entities.encode(msg));
	    var div = document.createElement('div');
	    div.style.marginBottom = '26px';
	    div.innerHTML = problemType(type) + ' in ' + msg;
	    clientOverlay.appendChild(div);
	  });
	  if (document.body) {
	    document.body.appendChild(clientOverlay);
	  }
	};

	exports.clear =
	function clear() {
	  if (document.body && clientOverlay.parentNode) {
	    document.body.removeChild(clientOverlay);
	  }
	};

	var problemColors = {
	  errors: colors.red,
	  warnings: colors.yellow
	};

	function problemType (type) {
	  var color = problemColors[type] || colors.red;
	  return (
	    '<span style="background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px">' +
	      type.slice(0, -1).toUpperCase() +
	    '</span>'
	  );
	}


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*eslint-env browser*/
	/*global __resourceQuery __webpack_public_path__*/

	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true,
	  name: ''
	};
	if (false) {
	  var querystring = require('querystring');
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.name) {
	    options.name = overrides.name 
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	  if (overrides.dynamicPublicPath) {
	    options.path = __webpack_public_path__ + options.path;
	  }
	}

	if (typeof window === 'undefined') {
	  // do nothing
	} else if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect(window.EventSource);
	}

	function connect(EventSource) {
	  var source = new EventSource(options.path);
	  var lastActivity = new Date();

	  source.onopen = handleOnline;
	  source.onmessage = handleMessage;
	  source.onerror = handleDisconnect;

	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);

	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }

	  function handleMessage(event) {
	    lastActivity = new Date();
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }

	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(function() { connect(EventSource); }, options.timeout);
	  }

	}

	var reporter;
	// the reporter needs to be a singleton on the page
	// in case the client is being used by mutliple bundles
	// we only want to report once.
	// all the errors will go to all clients
	var singletonKey = '__webpack_hot_middleware_reporter__';
	if (typeof window !== 'undefined' && !window[singletonKey]) {
	  reporter = window[singletonKey] = createReporter();
	}

	function createReporter() {
	  var strip = __webpack_require__(175);

	  var overlay;
	  if (typeof document !== 'undefined' && options.overlay) {
	    overlay = __webpack_require__(181);
	  }


	  var previousProblems = null;

	  return {
	    cleanProblemsCache: function () {
	      previousProblems = null;
	    },
	    problems: function(type, obj) {
	      if (options.warn) {
	        var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\n');

	        if (previousProblems !== newProblems) {
	          previousProblems = newProblems;
	          console.warn("[HMR] bundle has " + type + ":\n" + newProblems);
	        }
	      }
	      if (overlay && type !== 'warnings') overlay.showProblems(type, obj[type]);
	    },
	    success: function() {
	      if (overlay) overlay.clear();
	    },
	    useCustomOverlay: function(customOverlay) {
	      overlay = customOverlay;
	    }
	  };
	}

	var processUpdate = __webpack_require__(183);

	var customHandler;
	var subscribeAllHandler;
	function processMessage(obj) {
	  switch(obj.action) {
	    case "building":
	      if (options.log) console.log("[HMR] bundle rebuilding");
	      break;
	    case "built":
	      if (options.log) {
	        console.log(
	          "[HMR] bundle " + (obj.name ? obj.name + " " : "") +
	          "rebuilt in " + obj.time + "ms"
	        );
	      }
	      // fall through
	    case "sync":
	      if (obj.name && options.name && obj.name !== options.name) {
	        return;
	      }
	      if (obj.errors.length > 0) {
	        if (reporter) reporter.problems('errors', obj);
	      } else {
	        if (reporter) {
	          if (obj.warnings.length > 0) {
	            reporter.problems('warnings', obj);
	          } else {
	            reporter.cleanProblemsCache();
	          }
	          reporter.success();
	        }
	        processUpdate(obj.hash, obj.modules, options);
	      }
	      break;
	    default:
	      if (customHandler) {
	        customHandler(obj);
	      }
	  }

	  if (subscribeAllHandler) {
	    subscribeAllHandler(obj);
	  }
	}

	if (module) {
	  module.exports = {
	    subscribeAll: function subscribeAll(handler) {
	      subscribeAllHandler = handler;
	    },
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    },
	    useCustomOverlay: function useCustomOverlay(customOverlay) {
	      if (reporter) reporter.useCustomOverlay(customOverlay);
	    }
	  };
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module)))

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */

	/* global window __webpack_hash__ */

	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}

	var hmrDocsUrl = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html"; // eslint-disable-line max-len

	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };

	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}

	module.exports = function(hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }

	  function check() {
	    var cb = function(err, updatedModules) {
	      if (err) return handleError(err);

	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }

	      var applyCallback = function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);

	        if (!upToDate()) check();

	        logUpdates(updatedModules, renewedModules);
	      };

	      var applyResult = module.hot.apply(applyOptions, applyCallback);
	      // webpack 2 promise
	      if (applyResult && applyResult.then) {
	        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
	        applyResult.then(function(outdatedModules) {
	          applyCallback(null, outdatedModules);
	        });
	        applyResult.catch(applyCallback);
	      }

	    };

	    var result = module.hot.check(false, cb);
	    // webpack 2 promise
	    if (result && result.then) {
	        result.then(function(updatedModules) {
	            cb(null, updatedModules);
	        });
	        result.catch(cb);
	    }
	  }

	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });

	    if(unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn(
	          "[HMR] The following modules couldn't be hot updated: " +
	          "(Full reload needed)\n" +
	          "This is usually because the modules which have changed " +
	          "(and their parents) do not know how to hot reload themselves. " +
	          "See " + hmrDocsUrl + " for more details."
	        );
	        unacceptedModules.forEach(function(moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }

	    if (options.log) {
	      if(!renewedModules || renewedModules.length === 0) {
	        console.log("[HMR] Nothing hot updated.");
	      } else {
	        console.log("[HMR] Updated modules:");
	        renewedModules.forEach(function(moduleId) {
	          console.log("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }

	      if (upToDate()) {
	        console.log("[HMR] App is up to date.");
	      }
	    }
	  }

	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }

	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				__webpack_require__(185)(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },
/* 185 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});

		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}

		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(1);
	var DelayOperator = (function () {
	    function DelayOperator(dt, ins) {
	        this.dt = dt;
	        this.ins = ins;
	        this.type = 'delay';
	        this.out = null;
	    }
	    DelayOperator.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    DelayOperator.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = null;
	    };
	    DelayOperator.prototype._n = function (t) {
	        var u = this.out;
	        if (!u)
	            return;
	        var id = setInterval(function () {
	            u._n(t);
	            clearInterval(id);
	        }, this.dt);
	    };
	    DelayOperator.prototype._e = function (err) {
	        var u = this.out;
	        if (!u)
	            return;
	        var id = setInterval(function () {
	            u._e(err);
	            clearInterval(id);
	        }, this.dt);
	    };
	    DelayOperator.prototype._c = function () {
	        var u = this.out;
	        if (!u)
	            return;
	        var id = setInterval(function () {
	            u._c();
	            clearInterval(id);
	        }, this.dt);
	    };
	    return DelayOperator;
	}());
	/**
	 * Delays periodic events by a given time period.
	 *
	 * Marble diagram:
	 *
	 * ```text
	 * 1----2--3--4----5|
	 *     delay(60)
	 * ---1----2--3--4----5|
	 * ```
	 *
	 * Example:
	 *
	 * ```js
	 * import fromDiagram from 'xstream/extra/fromDiagram'
	 * import delay from 'xstream/extra/delay'
	 *
	 * const stream = fromDiagram('1----2--3--4----5|')
	 *  .compose(delay(60))
	 *
	 * stream.addListener({
	 *   next: i => console.log(i),
	 *   error: err => console.error(err),
	 *   complete: () => console.log('completed')
	 * })
	 * ```
	 *
	 * ```text
	 * > 1  (after 60 ms)
	 * > 2  (after 160 ms)
	 * > 3  (after 220 ms)
	 * > 4  (after 280 ms)
	 * > 5  (after 380 ms)
	 * > completed
	 * ```
	 *
	 * @param {number} period The amount of silence required in milliseconds.
	 * @return {Stream}
	 */
	function delay(period) {
	    return function delayOperator(ins) {
	        return new index_1.Stream(new DelayOperator(period, ins));
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = delay;
	//# sourceMappingURL=delay.js.map

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(1);
	var empty = {};
	var DropRepeatsOperator = (function () {
	    function DropRepeatsOperator(ins, fn) {
	        this.ins = ins;
	        this.fn = fn;
	        this.type = 'dropRepeats';
	        this.out = null;
	        this.v = empty;
	    }
	    DropRepeatsOperator.prototype._start = function (out) {
	        this.out = out;
	        this.ins._add(this);
	    };
	    DropRepeatsOperator.prototype._stop = function () {
	        this.ins._remove(this);
	        this.out = null;
	        this.v = empty;
	    };
	    DropRepeatsOperator.prototype.isEq = function (x, y) {
	        return this.fn ? this.fn(x, y) : x === y;
	    };
	    DropRepeatsOperator.prototype._n = function (t) {
	        var u = this.out;
	        if (!u)
	            return;
	        var v = this.v;
	        if (v !== empty && this.isEq(t, v))
	            return;
	        this.v = Array.isArray(t) ? t.slice() : t;
	        u._n(t);
	    };
	    DropRepeatsOperator.prototype._e = function (err) {
	        var u = this.out;
	        if (!u)
	            return;
	        u._e(err);
	    };
	    DropRepeatsOperator.prototype._c = function () {
	        var u = this.out;
	        if (!u)
	            return;
	        u._c();
	    };
	    return DropRepeatsOperator;
	}());
	exports.DropRepeatsOperator = DropRepeatsOperator;
	/**
	 * Drops consecutive duplicate values in a stream.
	 *
	 * Marble diagram:
	 *
	 * ```text
	 * --1--2--1--1--1--2--3--4--3--3|
	 *     dropRepeats
	 * --1--2--1--------2--3--4--3---|
	 * ```
	 *
	 * Example:
	 *
	 * ```js
	 * import dropRepeats from 'xstream/extra/dropRepeats'
	 *
	 * const stream = xs.of(1, 2, 1, 1, 1, 2, 3, 4, 3, 3)
	 *   .compose(dropRepeats())
	 *
	 * stream.addListener({
	 *   next: i => console.log(i),
	 *   error: err => console.error(err),
	 *   complete: () => console.log('completed')
	 * })
	 * ```
	 *
	 * ```text
	 * > 1
	 * > 2
	 * > 1
	 * > 2
	 * > 3
	 * > 4
	 * > 3
	 * > completed
	 * ```
	 *
	 * Example with a custom isEqual function:
	 *
	 * ```js
	 * import dropRepeats from 'xstream/extra/dropRepeats'
	 *
	 * const stream = xs.of('a', 'b', 'a', 'A', 'B', 'b')
	 *   .compose(dropRepeats((x, y) => x.toLowerCase() === y.toLowerCase()))
	 *
	 * stream.addListener({
	 *   next: i => console.log(i),
	 *   error: err => console.error(err),
	 *   complete: () => console.log('completed')
	 * })
	 * ```
	 *
	 * ```text
	 * > a
	 * > b
	 * > a
	 * > B
	 * > completed
	 * ```
	 *
	 * @param {Function} isEqual An optional function of type
	 * `(x: T, y: T) => boolean` that takes an event from the input stream and
	 * checks if it is equal to previous event, by returning a boolean.
	 * @return {Stream}
	 */
	function dropRepeats(isEqual) {
	    if (isEqual === void 0) { isEqual = void 0; }
	    return function dropRepeatsOperator(ins) {
	        return new index_1.Stream(new DropRepeatsOperator(ins, isEqual));
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = dropRepeats;
	//# sourceMappingURL=dropRepeats.js.map

/***/ }
/******/ ]);