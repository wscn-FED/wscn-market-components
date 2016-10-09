import React from 'react';
import QuoteItem from './Quote-item';
import AjaxMgr from '../utils/ajaxLoop';

export default class QuoteList extends React.PureComponent {
    state = {
        priceData: null,
        klineData: null
    };

    generateSymbols(symbols) {
        return symbols.join(',');
    }

    componentDidMount() {
        const {config} = this.props;
        const priceConfig = {
            url: config.baseApi + config.priceApi,
            params: {
                en_prod_code: this.generateSymbols(config.symbols),
                fields: config.priceApiField
            }
        };
        const priceAjax = new AjaxMgr({
            config: priceConfig,
            stateName: 'priceData',
            success: this.setData.bind(this),
            minInterval: config.priceMinInterval
        });
        priceAjax.setLoop(true).fetchData();

        const klineConfig = {
            url: config.baseApi + config.klineApi,
            params: {
                prod_code: this.generateSymbols(config.symbols),
                candle_period: config.candle_period,
                data_count: config.data_count,
                end_time: config.end_time,
                fields: config.klineApiField
            }
        };
        const klineAjax = new AjaxMgr({
            config: klineConfig,
            stateName: 'klineData',
            success: this.setData.bind(this)
        });
        klineAjax.setLoop(false).fetchData();
    }

    setData(key, res) {
        const newState = {};
        newState[key] = res;
        this.setState(newState);
    }

    render() {
        const {config} = this.props;
        const symbolsArr = config.symbols;
        const quoteComponents = symbolsArr.map((item) => {
            let priceData = {};
            let klineData = {};
            let priceFields = [];
            let klineFields = [];
            if (this.state.priceData) {
                const dataObj = this.state.priceData.data.snapshot;
                priceData = dataObj[item];
                priceFields = dataObj.fields;
            }

            if (this.state.klineData) {
                const dataObj = this.state.klineData.data.candle;
                klineData = dataObj[item];
                klineFields = dataObj.fields;
            }
            const data = {
                data: {
                    price: priceData,
                    kline: klineData
                },
                fields: {
                    price: priceFields,
                    kline: klineFields
                }

            };
            return (<QuoteItem key={item} {...data} />);
        });

        return <div className="tilesetQuote-component-container"> {quoteComponents} </div>;
    }
}
