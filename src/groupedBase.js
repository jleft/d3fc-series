import { scaleLinear } from 'd3-scale';
import fractionalBarWidth from './fractionalBarWidth';
import functor from './functor';

export default (series) => {

    let groupWidth = fractionalBarWidth(0.75);
    let decorate = () => {};
    let xScale = scaleLinear();

    const grouped = () => {};

    grouped.computeGroupWidth = (data) => {
        if (!data.length) {
            return 0;
        }
        const seriesData = data[0];
        const crossValue = series.crossValue();
        const x = (d, i) => xScale(crossValue(d, i));
        const width = groupWidth(seriesData.map(x));
        return width;
    };

    grouped.groupWidth = (...args) => {
        if (!args.length) {
            return groupWidth;
        }
        groupWidth = functor(args[0]);
        return grouped;
    };
    grouped.decorate = (...args) => {
        if (!args.length) {
            return decorate;
        }
        decorate = args[0];
        return grouped;
    };
    grouped.xScale = (...args) => {
        if (!args.length) {
            return xScale;
        }
        xScale = args[0];
        return grouped;
    };

    return grouped;
};
