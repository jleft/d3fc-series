import { scaleIdentity } from 'd3-scale';
import defined from './defined';
import functor from './functor';
import fractionalBarWidth from './fractionalBarWidth';

export default () => {

    let xScale = scaleIdentity();
    let yScale = scaleIdentity();
    let high = (d) => d.high;
    let low = (d) => d.low;
    let value = (d) => d.value;
    let orient = 'vertical';
    let barWidth = fractionalBarWidth(0.5);
    let decorate = () => {};

    const base = () => {};

    base.defined = defined(low, high, value);

    base.computeBarWidth = (filteredData) => {
        const scale = orient === 'vertical' ? xScale : yScale;
        return barWidth(filteredData.map((d, i) => scale(value(d, i))));
    };

    base.values = (d, i) => {
        if (orient === 'vertical') {
            const y = yScale(high(d, i));
            return {
                origin: [xScale(value(d, i)), y],
                high: 0,
                low: yScale(low(d, i)) - y
            };
        } else {
            const x = xScale(low(d, i));
            return {
                origin: [x, yScale(value(d, i))],
                high: xScale(high(d, i)) - x,
                low: 0
            };
        }
    };

    base.decorate = (...args) => {
        if (!args.length) {
            return decorate;
        }
        decorate = args[0];
        return base;
    };
    base.orient = (...args) => {
        if (!args.length) {
            return orient;
        }
        orient = args[0];
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
    base.low = (...args) => {
        if (!args.length) {
            return low;
        }
        low = functor(args[0]);
        return base;
    };
    base.high = (...args) => {
        if (!args.length) {
            return high;
        }
        high = functor(args[0]);
        return base;
    };
    base.value = (...args) => {
        if (!args.length) {
            return value;
        }
        value = functor(args[0]);
        return base;
    };
    base.barWidth = (...args) => {
        if (!args.length) {
            return barWidth;
        }
        barWidth = functor(args[0]);
        return base;
    };
    base.decorate = (...args) => {
        if (!args.length) {
            return decorate;
        }
        decorate = args[0];
        return base;
    };

    return base;
};
