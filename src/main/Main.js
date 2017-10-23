import React from 'react';
import {Tab, Tabs} from 'material-ui';
import DataContainer from '../data-loader/view/DataContainer';
import ScalesContainer from '../scales/view/ScalesContainer';
import ExperimentalDesignContainer from '../experimental-design/view/ExperimentalDesignContainer';
import StatsContainer from '../stats/view/StatsContainer';
import {NavigationArrowUpward} from 'material-ui/svg-icons/index';
import ChartsContainer from '../charts/components/ChartsContainer';

const tabItemContainerStyle = {
  backgroundColor: '#212121'
};

const inkBarStyle = {
  backgroundColor: 'orange'
};

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrowUp: false
    };
  }

  onScroll = () => {
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (scrollTop > 0 && !this.state.arrowUp) {
      this.setState({arrowUp: true});
    }
    if (scrollTop === 0 && this.state.arrowUp) {
      this.setState({arrowUp: false});
    }
  };

  componentWillMount = () => {
    document.addEventListener('scroll', this.onScroll);
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.onScroll);
  };

  getNavigationArrowClassName = () => {
    return `vertical-navigation-arrow ${this.state.arrowUp ? '' : 'vertical-navigation-arrow-hidden'}`;
  };

  onNavigationArrowClick = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const {
      getNavigationArrowClassName,
      onNavigationArrowClick
    } = this;

    return (
      <div>
        <Tabs tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle}>
          <Tab label="Data" value={1}>
            <DataContainer/>
          </Tab>
          <Tab label="Scales" value={2}>
            <ScalesContainer/>
          </Tab>
          <Tab label="Experimental design" value={3}>
            <ExperimentalDesignContainer/>
          </Tab>
          <Tab label="Stats" value={4}>
            <StatsContainer/>
          </Tab>
        </Tabs>
        <NavigationArrowUpward className={getNavigationArrowClassName()}
                               onTouchTap={onNavigationArrowClick}/>
        <ChartsContainer/>
      </div>
    );
  }

}