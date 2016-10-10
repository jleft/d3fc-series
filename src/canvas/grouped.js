import { scaleLinear } from 'd3-scale';
import { rebindAll, exclude } from 'd3fc-rebind';
import groupedBase from '../groupedBase';

export default function(series) {

    const base = groupedBase(series);

    const grouped = (data) => {
        const groupWidth = base.computeGroupWidth(data);
        const offsetScale = scaleLinear();

        const subBarWidth = groupWidth / data.length;
        if (series.barWidth) {
            series.barWidth(subBarWidth);
        }

        const halfWidth = groupWidth / 2;
        offsetScale.domain([0, data.length - 1])
            .range([-halfWidth, halfWidth - subBarWidth]);

        data.forEach((seriesData, index) => {

            // create a composite scale that applies the required offset
            const compositeScale = x => base.xScale()(x) + offsetScale(index);
            series.xScale(compositeScale);

            // adapt the decorate function to give each series the correct index
            series.decorate((c, d) => base.decorate()(c, d, index));
            series(seriesData);
        });
    };

    rebindAll(grouped, series, exclude('decorate', 'xScale'));
    rebindAll(grouped, base);

    return grouped;
}
