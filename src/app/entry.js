import React from 'react';
import ReactDOM from 'react-dom';
import 'theme';
import MarketContainer from './components/TilesetQuoteList';
import defaultConfigs from './defaultConfigs.json';


export default class TilesetQuote {
    constructor(config) {
        this.config = Object.assign({}, defaultConfigs, config);
    }

    init(el) {
        ReactDOM.render(
            <MarketContainer config={this.config}/>,
            el
        );
    }
}

// export
window.WSCNTilesetQuote = TilesetQuote;

