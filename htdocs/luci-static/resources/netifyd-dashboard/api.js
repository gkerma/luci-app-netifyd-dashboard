'use strict';
'require baseclass';
'require rpc';

var callStatus = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'status',
	expect: { }
});

var callFlows = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'flows',
	expect: { flows: [] }
});

var callApplications = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'applications',
	expect: { applications: [] }
});

var callHosts = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'hosts',
	expect: { hosts: [] }
});

function formatBytes(bytes) {
	if (bytes === 0) return '0 B';
	var k = 1024;
	var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	var i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

return baseclass.extend({
	getStatus: callStatus,
	getFlows: callFlows,
	getApplications: callApplications,
	getHosts: callHosts,
	formatBytes: formatBytes
});
