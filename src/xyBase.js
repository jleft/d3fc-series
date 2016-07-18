import {scaleIdentity} from 'd3-scale';
import functor from './functor';
import defined from './defined';
import fractionalBarWidth from './fractionalBarWidth';

export default () => {

    let xScale = scaleIdentity();
    let yScale = scaleIdentity();
    let y0Value = () => 0;
    let xValue = d => d.x;
    let yValue = d => d.y;
    let decorate = () => {};
    let barWidth = fractionalBarWidth(0.75);
    let orient = 'vertical';

    const base = () => {};

    base.y0 = (d, i) => yScale(y0Value(d, i));
    base.x = (d, i) => xScale(xValue(d, i));
    base.y = (d, i) => yScale(yValue(d, i));

    base.defined = (d, i) => defined(y0Value, xValue, yValue)(d, i);

    base.values = (d, i) => {
        if (orient === 'vertical') {
            const y = yScale(yValue(d, i));
            const y0 = yScale(y0Value(d, i));
            const x = xScale(xValue(d, i));
            return {
                x,
                y,
                y0,
                height: y - y0,
                origin: [x, y],
                baseOrigin: [x, y0],
                transposedX: x,
                transposedY: y
            };
        } else {
            const y = xScale(yValue(d, i));
            const y0 = xScale(y0Value(d, i));
            const x = yScale(xValue(d, i));
            return {
                x,
                y,
                y0,
                height: y - y0,
                origin: [y, x],
                baseOrigin: [y0, x],
                transposedX: y,
                transposedY: x
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
    base.y0Value = (...args) => {
        if (!args.length) {
            return y0Value;
        }
        y0Value = functor(args[0]);
        return base;
    };
    base.xValue = (...args) => {
        if (!args.length) {
            return xValue;
        }
        xValue = functor(args[0]);
        return base;
    };
    base.yValue = (...args) => {
        if (!args.length) {
            return yValue;
        }
        yValue = functor(args[0]);
        return base;
    };
    base.barWidth = (...args) => {
        if (!args.length) {
            return barWidth;
        }
        barWidth = functor(args[0]);
        return base;
    };
    base.orient = (...args) => {
        if (!args.length) {
            return orient;
        }
        orient = args[0];
        return base;
    };

    return base;
};
