import React, {Component} from "react";


export default class LineChart extends Component {

    componentDidMount() {

    }

    handleLineData( prodCodeArray, id){
        var _result = [].concat(prodCodeArray).sort(function( formerDot, latterDot ){
            return formerDot[1] - latterDot[1]
        })
        var minValue = _result[0][1];
        var maxValue = _result[_result.length-1][1]
        var finalDots = cookCharts( prodCodeArray, minValue, maxValue );
        $('#' + id)
            .show()
            .find('polyline')
            .attr('points',finalDots);
    }


    cookCharts(dataArray, minValue, maxValue) {
        var chartWidth = 190;
        var chartHeight = 48;
        var valueDelta = maxValue - minValue;
        var dotArray = dataArray.map(function (value, index) {
            var y = ( maxValue - value[1]) / valueDelta * chartHeight;
            var x = index / (dataArray.length) * chartWidth;
            return x + ',' + y;
        })
        return dotArray.join(' ');
    }

    render() {
        return(
            <div>pppppppp</div>
        )
    }
}