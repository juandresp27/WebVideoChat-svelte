const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.749b50f5.js","app":"_app/immutable/entry/app.dcd03052.js","imports":["_app/immutable/entry/start.749b50f5.js","_app/immutable/chunks/index.43fd0a54.js","_app/immutable/chunks/singletons.b40ee28f.js","_app/immutable/entry/app.dcd03052.js","_app/immutable/chunks/index.43fd0a54.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-e8f92640.js'),
			() => import('./chunks/1-fb48b95c.js'),
			() => import('./chunks/2-c554a0d8.js'),
			() => import('./chunks/3-29c99a80.js')
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
