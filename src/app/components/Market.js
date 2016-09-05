import React, {Component} from "react";
import MarketItem from "./Market-item";
import "./main.scss";
import MarketsData from "../models/MarketModel";


export default class Market extends Component {
    state = {
        priceData: null,
        klineData: null
    };


    componentDidMount() {
        const props = this.props;
        const priceUrl = this.createAjaxUrl(props.baseApi, props.priceApi, props.symbols, props.priceApiField);
        const priceAjaxConfig = {
            url: priceUrl,
            isLoop: true,
            minInterval: 4000,
            dataType: 'json',
            successFn: this.setPriceData.bind(this)
        };
        MarketsData.loadPriceDataAjax(priceAjaxConfig);

        const klineUrl = this.createAjaxUrl(props.baseApi, props.klineApi, props.symbols, props.klineApiField);
        const klineAjaxConfig = {
            url: klineUrl,
            isLoop: false,
            minInterval: 1000,
            dataType: 'json',
            successFn: this.setKlineData.bind(this)
        };
        MarketsData.loadKlineDataAjax(klineAjaxConfig);

    }

    componentWillReceiveProps() {
        console.log('b');

    }

    setPriceData(res) {

        this.setState({
            priceData: res.data
        });
        console.log('price');
    }

    setKlineData(res) {

        this.setState({
            klineData: res.data
        });
        console.log('kline');
    }

    createAjaxUrl(baseApi, serchApi, symbols, apiField) {
        var symbolsUrl = symbols.join(',');
        return baseApi + serchApi + symbols + apiField
    }


    render() {
        let symbolsArr = this.props.symbols;
        const marketComponents = symbolsArr.map((item) => {
            let priceData = {};
            let klineData = {};
            let priceFields = [];
            let klineFields = [];
            if (this.state.priceData) {
                let dataObj = this.state.priceData.snapshot;
                priceData = dataObj[item];
                priceFields = dataObj["fields"];
            }

            if (this.state.klineData) {
                let dataObj = this.state.klineData.candle;
                klineData = dataObj[item];
                klineFields = dataObj["fields"];
            }
            const data = {
                symbol: item,
                data: {
                    price: priceData,
                    kline: klineData,
                },
                fields: {
                    price: priceFields,
                    kline: klineFields
                }

            };
            return (<MarketItem key={item} {...data} />);
        });

        return <div className="market-component-container"> {marketComponents} </div>
    }
}