'use strict';
'require rpc';

/**
 * Netifyd Dashboard API Module
 * Copyright (C) 2024 CyberMind.fr - Gandalf
 */

var callNetifydStatus = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'status',
	expect: {}
});

var callNetifydFlows = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'flows',
	expect: {}
});

var callNetifydApplications = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'applications',
	expect: {}
});

var callNetifydProtocols = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'protocols',
	expect: {}
});

var callNetifydDevices = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'devices',
	expect: {}
});

var callNetifydStats = rpc.declare({
	object: 'netifyd-dashboard',
	method: 'stats',
	expect: {}
});

return {
	getStatus: function() {
		return callNetifydStatus();
	},
	
	getFlows: function() {
		return callNetifydFlows();
	},
	
	getApplications: function() {
		return callNetifydApplications();
	},
	
	getProtocols: function() {
		return callNetifydProtocols();
	},
	
	getDevices: function() {
		return callNetifydDevices();
	},
	
	getStats: function() {
		return callNetifydStats();
	},
	
	getAllData: function() {
		return Promise.all([
			this.getStatus(),
			this.getStats(),
			this.getFlows(),
			this.getApplications(),
			this.getProtocols(),
			this.getDevices()
		]).then(function(results) {
			return {
				status: results[0] || {},
				stats: results[1] || {},
				flows: results[2] || {},
				applications: results[3] || {},
				protocols: results[4] || {},
				devices: results[5] || {}
			};
		});
	},
	
	// Utility functions
	formatBytes: function(bytes, decimals) {
		if (bytes === 0) return '0 B';
		var k = 1024;
		var dm = decimals || 2;
		var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	},
	
	formatBytesPerSec: function(bytes, decimals) {
		return this.formatBytes(bytes, decimals) + '/s';
	},
	
	formatNumber: function(num) {
		if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
		if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
		return num.toString();
	},
	
	getAppIcon: function(appName) {
		var icons = {
			'HTTPS': '🔒',
			'HTTP': '🌐',
			'DNS': '📋',
			'SSH': '💻',
			'NTP': '🕐',
			'QUIC': '⚡',
			'TLS': '🔐',
			'Netflix': '🎬',
			'YouTube': '📺',
			'Spotify': '🎵',
			'Zoom': '📹',
			'Discord': '💬',
			'Steam': '🎮',
			'WhatsApp': '📱',
			'Telegram': '✈️',
			'Facebook': '👤',
			'Twitter': '🐦',
			'Instagram': '📷',
			'TikTok': '🎭',
			'BitTorrent': '🔄',
			'Email': '📧',
			'SIP': '📞',
			'RTMP': '📡'
		};
		return icons[appName] || '📦';
	},
	
	getCategoryClass: function(category) {
		var classes = {
			'Web': 'web',
			'Streaming': 'streaming',
			'Social': 'social',
			'Gaming': 'gaming',
			'VoIP': 'voip',
			'Network': 'network',
			'P2P': 'p2p'
		};
		return classes[category] || 'network';
	},
	
	getDeviceIcon: function(vendor) {
		var icons = {
			'Apple': '🍎',
			'Samsung': '📱',
			'Raspberry Pi': '🍓',
			'Intel': '💻',
			'Amazon': '📦',
			'Google': '🔍',
			'Microsoft': '🪟',
			'Cisco': '🌐',
			'VMware': '☁️',
			'Huawei': '📡'
		};
		return icons[vendor] || '💻';
	}
};
