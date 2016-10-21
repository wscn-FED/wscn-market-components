## What's wscn-tilesetQuote-component ?
It's a react component,you can use it easily in everywhere.

### How to use?
```bash
npm install wscn-tilesetQuote-component 
```

it's depend 

* classnames
* react
* react-dom
* axios

you can easily get it with [react-vendor](github.com/wscn-FED/wscn-react-vendor/);

```bash
npm install wscn-react-vendor 
```

### Example

```js
	<link href="**/marketComponents-default.css" rel="stylesheet">
	
	<div id="root"></div>
	
	<script src="**/wscn-react-vendor.min.js"></script>
	<script src="/**/react-market.min.js"></script>
	
	<script>
		var mountDom = document.getElementById('root');
        var options = {
            symbols: [
                "XAUUSD",
                "UKOil",
                "000001",
                "EURUSD",
                "USDJPY"
            ],
            priceMinInterval: 2000,
            baseApi: "https://forexdata.wallstreetcn.com/",
            priceApi: "real",
            priceApiField: "prod_name,last_px,px_change,px_change_rate,price_precision,securities_type",
            klineApi: "kline",
            candle_period:5,
            data_count:80,
            end_time:0,
            klineApiField: "close_px"
        };
        new WSCNTilesetQuote(options).init(mountDom);
	<script>		
```
demo:

![demo](https://github.com/wscn-FED/wscn-market-components/raw/master/images/demo.png)




|    Property    | Type |          Description          | default |
| -------------  | ---- |          -----------          | ------- |
| symbols  | array | the symbols you want show | ["XAUUSD","UKOil","000001","EURUSD","USDJPY"] |
| priceMinInterval      | number |the price loop minInterval time | 5*1000 |
| candle_period | number | kline period | 5 |
| data_count | number | kline count | 80 |


### candle_period  参数说明
| 参数        | 值   |   含义  |
| --------   | -----:  | :----:  |
| candle_period |  |   K线类型  |
|         |    1    |  1分钟  |
|         |    2    |  5分钟  |
|         |    3    |  15分钟  |
|         |    4    |  30分钟  |
|         |    5    |  1小时  |
|         |    6    |  2小时  |
|         |    7    |  4小时  |
|         |    8    |  1天  |
|         |    10    |  周线  |
|         |    11    |  1月  |




### dev

dev is use webpack-dll
so if you are the first time run ,you  should 

```
$ npm run dll-dev

```
make vendor-manifest-dev.json first


otherwise

```
$ npm start

```
you will see in `http://localhost:9527`;


### build
```
$ npm build

```
you will see in `http://localhost:9528`;
demmo:

![demo](https://github.com/wscn-FED/wscn-market-components/raw/master/images/demo2.png)