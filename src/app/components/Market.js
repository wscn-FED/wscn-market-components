import React, {Component} from "react";
import MarketItem from "./Market-item";
import "./main.scss";


export default class Tagged extends Component {

    componentDidMount() {
        console.log('a');
    }

    componentWillReceiveProps() {
        console.log('b');
    }


    render() {
        let symbolsArr = this.props.symbols;

        const marketComponents = symbolsArr.map((item, index) => {
            console.log(item)
            const data = {
                symbol: item
            };
            return (<MarketItem key={item} {...data} />);
        });

        return <div className="market-component-container"> {marketComponents} </div>
    }
}