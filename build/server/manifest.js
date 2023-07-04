const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.a1dc3eba.js","app":"_app/immutable/entry/app.8b5cf91f.js","imports":["_app/immutable/entry/start.a1dc3eba.js","_app/immutable/chunks/index.43fd0a54.js","_app/immutable/chunks/singletons.ac01d7f8.js","_app/immutable/entry/app.8b5cf91f.js","_app/immutable/chunks/index.43fd0a54.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-e8f92640.js'),
			() => import('./chunks/1-3e51d4f6.js'),
			() => import('./chunks/2-ba583d5e.js'),
			() => import('./chunks/3-283443c5.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/[roomId]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"roomId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
