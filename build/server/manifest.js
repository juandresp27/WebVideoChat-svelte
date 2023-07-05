const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {"start":"_app/immutable/entry/start.893396b9.js","app":"_app/immutable/entry/app.66001fcf.js","imports":["_app/immutable/entry/start.893396b9.js","_app/immutable/chunks/index.43fd0a54.js","_app/immutable/chunks/singletons.b8c794a6.js","_app/immutable/entry/app.66001fcf.js","_app/immutable/chunks/index.43fd0a54.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-e8f92640.js'),
			() => import('./chunks/1-0d7beb19.js'),
			() => import('./chunks/2-0b5b7091.js'),
			() => import('./chunks/3-2d85e3fe.js')
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
