const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


process.env.NODE_ENV = 'dev'

module.exports = {
	entry:{
	    app: path.resolve(__dirname, 'src/index.js'),
	    // 将 第三方依赖 单独打包
	    vendor: [
	      'react', 
	      'react-dom'
	    ]
  },
	output:{
		path:__dirname+"./public",
		filename: "script/[name].[hash:8].js",
    	publicPath: "/",
    	chunkFilename: "script/[name].[chunkhash:8].js"
	},
	resolve:{
		mainFiles: ["index.web","index"],// 这里哦
    modules: ['app', 'node_modules', path.join(__dirname, '../node_modules')],
    extensions: [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ]
	},
	module:{
		loaders:[
			{
				test:/\.(js|jsx)$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					"presets":['react',['es2015',{"modules": false}],"stage-0"]
				}
			},
			{ 
				test: /\.less$/, 
				exclude: /node_modules/, 
	            loader: ExtractTextPlugin.extract({
	               fallback:'style-loader', 
	               use:'css-loader?modules&localIdentName=[local]-[hash:base64:8]!resolve-url-loader!postcss-loader!less-loader'
	             }) 
			},
            { 
            	test: /\.css$/, 
            	exclude: /node_modules/, 
            	use: [
								require.resolve('style-loader'),
								{
									loader: require.resolve('css-loader'),
									options: {
										importLoaders: 1,
									},
								}
							]
            },
            { 
            	test:/\.(png|gif|jpg|jpeg|bmp)$/, 
            	loader:require.resolve('url-loader'),
							options: {
								limit: 10000,
								name: 'static/media/[name].[hash:8].[ext]',
							} 
            },  // 限制大小5kb
            { 
            	test:/\.(woff|woff2|svg|ttf|eot)($|\?)/, 
            	loader:'file-loader?name=fonts/[name].[hash:8].[ext]'
            } // 限制大小小于5k
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:'./index.html'
		}),

		new webpack.LoaderOptionsPlugin({
			options:{
				postcss:()=>{
		          return [
		            require('autoprefixer')({
		              browsers: ['last 10 versions','ie>=8','>1% in CN']
		            })
		          ]
		        }
			}
		}),

		// 分离CSS
    	new ExtractTextPlugin('style/[name].[chunkhash:8].css'), 

		new webpack.HotModuleReplacementPlugin(),

		// 提供公共代码
	    new webpack.optimize.CommonsChunkPlugin({
	      name: 'vendor',
	      filename: 'script/[name].[hash:8].js'
	    }),
			new webpack.ProvidePlugin({
          axios: 'axios'
      })
	],

	devServer:{
		proxy:{
			'/api':{
				target:"https://www.easy-mock.com/mock/597588fda1d30433d83b628c/",
				secure:false,
				pathRewrite:{
					'/api': ''
				},
				changeOrigin: true
			}
		},

		contentBase:'./public',
		historyApiFallback:true,
		inline:true,
		hot:true
	}
}