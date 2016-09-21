## What's wscn-market ?
It's a react component,you can use it easily in everywhere.

### How to use?
```bash
npm install wscn-market-components 
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
	<script src="**/wscn-react-vendor.min.js"></script>
	<script src="/**/react-market.min.js"></script>
	
	<script>
		var MarketComponents = new MarketComponents({
            parentDom: document.getElementById('root'),
            options: {
                symbols: [
                    "XAUUSD",
                    "UKOil",
                    "000001",
                    "EURUSD",
                    "USDJPY",
                ],
                priceMinInterval:2000,
                baseApi: "http://139.196.188.130:8086/",
                priceApi: "real?en_prod_code=",
                priceApiField: "&fields=prod_name,last_px,px_change,px_change_rate",
                klineApi: "kline?prod_code=",
                klineApiField: "&candle_period=1&data_count=80&end_time=0&fields=close_px",
            }
        }).init();
	<script>		
```
![demo](https://github.com/wscn-FED/wscn-market-components/raw/master/images/demo.png)




### dev

* `进入assets/srv目录`执行
```
$ gulp dev-derver
```
* 启服务，如访问pc_r项目可以通过 `http://localhost:9527/assets/src/pc_r/` 进行测试
