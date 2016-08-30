import React, { Component } from "react";

export default class MarketItem extends Component {

    componentDidMount() {
        console.log('a');
    }

    componentWillReceiveProps() {
        console.log('b');
    }



    render() {
        const props=this.props;
        const symbol=props.symbol;
        return (
            <div className="market-item-container">
                {symbol}
            </div>

        );
    }
}