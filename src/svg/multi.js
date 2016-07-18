import {dataJoin} from 'd3fc-data-join';
import {select} from 'd3-selection';
import {rebindAll, rebind} from 'd3fc-rebind';
import multiBase from '../multiBase';

export default () => {

    const base = multiBase();

    const innerJoin = dataJoin('g', 'inner');

    const join = dataJoin('g', 'series');

    const multi = (selection) => {
        const mapping = base.mapping();
        const series = base.series();
        const xScale = base.xScale();
        const yScale = base.yScale();

        selection.each((data, index, group) => {

            const container = join(select(group[index]), series);

            // iterate over the containers, 'call'-ing the series for each
            container.each((dataSeries, seriesIndex, seriesGroup) => {
                dataSeries.xScale(xScale)
                         .yScale(yScale);

                const seriesData = mapping(data, dataSeries, seriesIndex);
                const innerContainer = innerJoin(select(seriesGroup[seriesIndex]), [seriesData]);

                innerContainer.datum(seriesData).call(dataSeries);
            });

            container.order();
        });
    };

    rebindAll(multi, base);
    rebind(multi, join, 'key');

    return multi;
};
