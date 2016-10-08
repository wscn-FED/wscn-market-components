import React, {Component} from 'react';
import MarketItem from './Market-item';
import MarketsData from '../models/MarketModel';

export default class Market extends React.PureComponent {
    state = {
        priceData: null,
        klineData: null
    };

    componentDidMount() {
        const {config} = this.props;
        const priceUrl = this.createAjaxUrl(config.baseApi, config.priceApi, config.symbols, config.priceApiField);
        const priceAjaxConfig = {
            url: priceUrl,
            isLoop: true,
            minInterval: config.priceMinInterval,
            successFn: this.setPriceData.bind(this)
        };
        MarketsData.loadPriceDataAjax(priceAjaxConfig);

        const klineUrl = this.createAjaxUrl(config.baseApi, config.klineApi, config.symbols, config.klineApiField);
        const klineAjaxConfig = {
            url: klineUrl,
            isLoop: false,
            successFn: this.setKlineData.bind(this)
        };
        MarketsData.loadKlineDataAjax(klineAjaxConfig);
    }

    componentWillReceiveProps() {

    }

    setPriceData(res) {
        this.setState({
            priceData: res.data
        });
    }

    setKlineData(res) {
        this.setState({
            klineData: res.data
        });
    }

    createAjaxUrl(baseApi, serchApi, symbols, apiField) {
        const symbolsUrl = symbols.join(',');
        return baseApi + serchApi + symbolsUrl + apiField;
    }

    render() {
        const {config} = this.props;
        const symbolsArr = config.symbols;
        const marketComponents = symbolsArr.map((item) => {
            let priceData = {};
            let klineData = {};
            let priceFields = [];
            let klineFields = [];
            if (this.state.priceData) {
                const dataObj = this.state.priceData.snapshot;
                priceData = dataObj[item];
                priceFields = dataObj.fields;
            }

            if (this.state.klineData) {
                const dataObj = this.state.klineData.candle;
                klineData = dataObj[item];
                klineFields = dataObj.fields;
            }
            const data = {
                symbol: item,
                data: {
                    price: priceData,
                    kline: klineData
                },
                fields: {
                    price: priceFields,
                    kline: klineFields
                }

            };
            return (<MarketItem key={item} {...data} />);
        });

        return <div className="market-component-container"> {marketComponents} </div>;
    }
}
