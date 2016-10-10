import { scaleLinear } from 'd3-scale';
import { dataJoin } from 'd3fc-data-join';
import { select } from 'd3-selection';
import { rebindAll, exclude } from 'd3fc-rebind';
import groupedBase from '../groupedBase';

export default (series) => {

    const base = groupedBase(series);

    const join = dataJoin('g', 'grouped');

    const grouped = (selection) => {
        selection.each((data, index, group) => {
            const groupWidth = base.computeGroupWidth(data);
            const offsetScale = scaleLinear();

            const subBarWidth = groupWidth / data.length;
            if (series.barWidth) {
                series.barWidth(subBarWidth);
            }

            const halfWidth = groupWidth / 2;
            offsetScale.domain([0, data.length - 1])
                .range([-halfWidth, halfWidth - subBarWidth]);

            const g = join(select(group[index]), data);

            g.enter().append('g');

            g.select('g')
                .each((_, index, group) => {
                    const container = select(group[index]);

                    // create a composite scale that applies the required offset
                    const compositeScale = x => base.xScale()(x) + offsetScale(index);
                    series.xScale(compositeScale);

                    // adapt the decorate function to give each series the correct index
                    series.decorate((s, d) => base.decorate()(s, d, index));

                    container.call(series);
                });
        });
    };

    rebindAll(grouped, series, exclude('decorate', 'xScale'));
    rebindAll(grouped, base, exclude('computeGroupWidth'));

    return grouped;
};
