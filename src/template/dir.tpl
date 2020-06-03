<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{title}}</title>
	<style>
		body {
			margin: 30px auto 0;
		}
		.rows {
			float: left;
			margin: 0 30px;
			width: 300px;
		}
		a {
			display: block;
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 20px;
			text-decoration: none;
		}
		.headertitle {
			overflow: hidden;
			float: left;
			width: 100%;
			height: 150px;
		}
		.headertitle h2 {
			width: 100%;
			line-height: 60px;
			text-align: center;
			font-style: 30px;
			color: darkcyan;
		}
		.clearfix:after{clear:both;content:"020";display:block;height:0;visibility:hidden;line-height:0;font-size:1px}
		.clearfix{*zoom:1;clear:both;}
		.filesCon {
			width: 1360px;
			margin: 0 auto 0;
		}
		.files_type {
			width: 100%;
			line-height: 30px;
			font-size: 20px;
			text-align: center;
			color: darkcyan;
		}
		.headertitle p {
			line-height: 25px;
			font-size: 13px;
			width: 100%;
			text-align: center;
			margin-bottom: 25px;
			color: darkgray;
		}
	</style>
</head>
<body>
	<div class="headertitle">
		<h2>你的静态文件</h2>
		<p>jonzhong·晨光</p>
	</div>
	<div class="filesCon clearfix">
		{{#if ext_else}}
		<div class="rows">
			<p class="files_type">其他文件</p>
			{{#each ext_else}}
				<a href="{{../dir}}/{{files}}">【{{icon}}】{{files}}</a>
			{{/each}}
		</div>
		{{/if}}
		{{#if ext_html}}
			<div class="rows">
				<p class="files_type">html文件</p>
				{{#each ext_html}}
					<a href="{{../dir}}/{{files}}">【{{icon}}】{{files}}</a>
				{{/each}}
			</div>
		{{/if}}
		{{#if ext_js}}
		<div class="rows">
			<p class="files_type">js/json文件</p>
			{{#each ext_js}}
				<a href="{{../dir}}/{{files}}">【{{icon}}】{{files}}</a>
			{{/each}}
		</div>
		{{/if}}
		{{#if ext_css}}
		<div class="rows">
			<p class="files_type">css文件</p>
			{{#each ext_css}}
				<a href="{{../dir}}/{{files}}">【{{icon}}】{{files}}</a>
			{{/each}}
		</div>
		{{/if}}
	</div>
</body>
</html>