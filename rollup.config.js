import babel from 'rollup-plugin-babel';

export default {
    entry: 'index.js',
    moduleName: 'fc',
    format: 'umd',
    plugins: [
        babel({
            babelrc: false,
            presets: ['es2015-rollup']
        })
    ],
    dest: 'build/d3fc-series.js',
    globals: {
        'd3fc-rebind': 'fc',
        'd3fc-data-join': 'fc',
        'd3fc-shape': 'fc',
        'd3-shape': 'd3',
        'd3-scale': 'd3',
        'd3-selection': 'd3',
        'd3-array': 'd3'
    }
};
