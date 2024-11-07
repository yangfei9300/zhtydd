## jianweikaifa-sign使用说明

* 示例：
```
<view class="content">
		<jianweikaifa-sign 
			@input="getData" 
			@close="getClose"
			:title="title" 
			:lineWidth="8" 
			:disabled="false">				
		</jianweikaifa-sign>
</view>
```

* 属性列表：

	| 字段 | 是否必填 | 说明 |
	| -------- | -------- |-------- |
	| title| 否| 标题，默认为'请在输入框内签名' |
	| disabled| 否| 是否禁用，默认为false |
	| lineWidth| 否| 笔画大小，默认为3 |

	
* 事件列表：

	| 事件 | 类型 | 说明 |
	| -------- | -------- |-------- |
	| input| function | 获取签字完成后生成的图标地址（base64格式）|
 	| close| function | 取消签字，返回true|