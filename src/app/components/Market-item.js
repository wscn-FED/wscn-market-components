import React, {Component} from "react";
import LineChart from "./LineChart";

export default class MarketItem extends Component {

    constructor(props) {
        super(props);
        this.fieldsMap = {
            price: {
                name: "prod_name",
                lastPrice: "last_px",
                change: "px_change",
                changeRate: "px_change_rate"
            },
            kline: {
                name: "prod_name",
                lastPrice: "last_px",
                change: "px_change",
                changeRate: "px_change_rate"
            }
        }

    }

    componentDidMount() {
        console.log('market-item didmount');
    }

    componentWillReceiveProps() {
        // console.log('b');
    }

    getData = (name, type) => {
        const props = this.props;
        const index = props.fields[type].indexOf(this.fieldsMap[type][name]);
        return props.data[type][index];
    };

    render() {
        const props = this.props;
        // console.log(this.props.priceData);
        const symbolName = this.getData("name", "price");
        const lastPrice = this.getData("lastPrice", "price");
        const change = this.getData("change", "price");
        const changeRate = this.getData("changeRate", "price");
        return (
            <div className="market-item-container">
                {symbolName}
                {lastPrice}
                {change}
                {changeRate}
                <LineChart />
            </div>

        );
    }
}