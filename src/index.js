import React from 'react';
import d3 from 'd3';
import nv from 'nvd3';
import {
  pick,
  without,
  isPlainObject,
  bindFunctions,
  getValueFunction,
  propsByPrefix
} from './utils.js';

let SETTINGS = ['x', 'y', 'type', 'datum', 'configure'];
let SIZE = ['width', 'height'];
let MARGIN = 'margin';
let LEGEND = 'legend';
let TOOLTIP = 'tooltip';
let CONTAINER_STYLE = 'containerStyle'

export default class NVD3Chart extends React.Component {
  static propTypes: {
    type: React.PropTypes.string.isRequired,
    configure: React.PropTypes.func
  };

  /**
   * Instantiate a new chart setting
   * a callback if exists
   */
  componentDidMount() {
    nv.addGraph(this.renderChart.bind(this), this.props.renderEnd);
  }

  /**
   * Update the chart after state is changed.
   */
  componentDidUpdate() {
    this.renderChart();
  }

  /**
   * Remove listeners
   */
  componentWillUnmount() {
    if(this.resizeHandler)
      this.resizeHandler.clear();
  }

  /**
   * Creates a chart model and render it
   */
  renderChart() {
      // Margins are an special case. It needs to be
      // passed to the margin function.
      this.chart = this.chart || nv.models[this.props.type]();

      this.parsedProps = bindFunctions(this.props, this.props.context);

      this.chart
        .x(getValueFunction(this.parsedProps.x, 'x'))
        .y(getValueFunction(this.parsedProps.y, 'y'))
        .margin(this.options(MARGIN, pick).margin || propsByPrefix('margin', this.props) || {});

      // Configure componentes recursively
      this.configureComponents(this.chart, this.options(SETTINGS.concat(CONTAINER_STYLE), without));

      // hook for configuring the chart
      !this.props.configure || this.props.configure(this.chart);

      // Render chart using d3
      d3.select(this.refs.svg)
        .datum(this.props.datum)
        .call(this.chart);

      // Update the chart if the window size change.
      // Save resizeHandle to remove the resize listener later.
      if(!this.resizeHandler)
        this.resizeHandler = nv.utils.windowResize(this.chart.update);

      return this.chart;
  }

  /**
   * Configure components recursively
   * @param {nvd3 chart} chart  A nvd3 chart instance
   * @param {object} options    A key value object
   */
  configureComponents(chart, options) {
    for(let optionName in options){
      let optionValue = options[optionName];
      if(chart) {
        if(isPlainObject(optionValue)){
          this.configureComponents(chart[optionName], optionValue);
        } else if(typeof chart[optionName] === 'function'){
          chart[optionName](optionValue);
        }
      }
    }
  }

  /**
   * Filter options base on predicates
   * @param {Array} keys          An array of keys to preserve or remove
   * @param {Function} predicate  The function used to filter keys
   */
  options(keys, predicate) {
	  // DEPRECATED: this.props.chartOptions
    let opt = this.parsedProps.options || this.parsedProps || this.props.chartOptions;
    predicate = predicate || pick;
    return predicate(opt, keys);
  }

  /**
   * Render function
   * svg element needs to have height and width.
   */
  render() {
    return (
      <div ref="root" className="nv-chart" style={this.props.containerStyle} >
        <svg ref="svg" {...pick(this.props, SIZE)}></svg>
      </div>
    );
  }
}

// Babel 6 issue: http://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default
module.exports = NVD3Chart;
