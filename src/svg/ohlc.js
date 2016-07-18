import candlestick from './candlestick';
import { shapeOhlc } from 'd3fc-shape';

export default () => candlestick(shapeOhlc(), 'ohlc');
