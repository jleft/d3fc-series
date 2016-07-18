import { scaleIdentity } from 'd3-scale';
import defined from './defined';
import functor from './functor';
import fractionalBarWidth from './fractionalBarWidth';

export default () => {

    let xScale = scaleIdentity();
    let yScale = scaleIdentity();
    let xValue = (d) => d.date;
    let yOpenValue = (d) => d.open;
    let yHighValue = (d) => d.high;
    let yLowValue = (d) => d.low;
    let yCloseValue = (d) => d.close;
    let barWidth = fractionalBarWidth(0.75);
    let decorate = () => {};
    let xValueScaled = (d, i) => xScale(xValue(d, i));

    let base = () => {};

    base.width = (data) => barWidth(data.map(xValueScaled));

    base.defined = (d, i) => defined(xValue, yOpenValue, yLowValue, yHighValue, yCloseValue)(d, i);

    base.values = (d, i) => {
        const yCloseRaw = yCloseValue(d, i);
        const yOpenRaw = yOpenValue(d, i);

        let direction = '';
        if (yCloseRaw > yOpenRaw) {
            direction = 'up';
        } else if (yCloseRaw < yOpenRaw) {
            direction = 'down';
        }

        return {
            x: xValueScaled(d, i),
            yOpen: yScale(yOpenRaw),
            yHigh: yScale(yHighValue(d, i)),
            yLow: yScale(yLowValue(d, i)),
            yClose: yScale(yCloseRaw),
            direction: direction
        };
    };

    base.decorate = (...args) => {
        if (!args.length) {
            return decorate;
        }
        decorate = args[0];
        return base;
    };
    base.xScale = (...args) => {
        if (!args.length) {
            return xScale;
        }
        xScale = args[0];
        return base;
    };
    base.yScale = (...args) => {
        if (!args.length) {
            return yScale;
        }
        yScale = args[0];
        return base;
    };
    base.xValue = (...args) => {
        if (!args.length) {
            return xValue;
        }
        xValue = args[0];
        return base;
    };
    base.yOpenValue = (...args) => {
        if (!args.length) {
            return yOpenValue;
        }
        yOpenValue = args[0];
        return base;
    };
    base.yHighValue = (...args) => {
        if (!args.length) {
            return yHighValue;
        }
        yHighValue = args[0];
        return base;
    };
    base.yLowValue = (...args) => {
        if (!args.length) {
            return yLowValue;
        }
        yLowValue = args[0];
        return base;
    };
    base.yValue = base.yCloseValue = (...args) => {
        if (!args.length) {
            return yCloseValue;
        }
        yCloseValue = args[0];
        return base;
    };
    base.barWidth = (...args) => {
        if (!args.length) {
            return barWidth;
        }
        barWidth = functor(args[0]);
        return base;
    };

    return base;
};
