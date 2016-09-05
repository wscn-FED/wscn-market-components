import React, {Component} from "react";
import "./lineChat.scss";

export default class LineChart extends Component {
    state = {
        dataPoints: "0,50 200,0"
    };

    componentDidMount() {

        this.handleLineData(this.props.klineData);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state == nextState) {
            return false;
        } else {
            return true;
        }

    }

    componentDidUpdate() {
        console.log('line chart update')
    }

    handleLineData(dataArray) {
        var minValue = Math.min.apply(null, dataArray);
        var maxValue = Math.max.apply(null, dataArray);
        var finalDots = this.cookCharts(dataArray, minValue, maxValue);
        this.setState({
            dataPoints: finalDots
        });

    }


    cookCharts(dataArray, minValue, maxValue) {
        var chartWidth = 80;
        var chartHeight = 34;
        var valueDelta = maxValue - minValue;

        // console.log(valueDelta )
        var dotArray = dataArray.map((value, index)=> {
            if (valueDelta == 0) {
                return 0 + ',' + 0;
            } else {
                var y = ( maxValue - value) / valueDelta * chartHeight;
                var x = index / (dataArray.length) * chartWidth;
                return x + ',' + y;
            }

        });
        return dotArray.join(' ');
    }

    render() {
        const state = this.state;
        return (
            <svg>
                <polyline
                    className="path"
                    fill="none"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    strokeLinecap="round"
                    points={state.dataPoints}/>
            </svg>
        )
    }
}