import React from 'react';
import {connect} from 'react-redux';
import {
  createScale,
  removeScale,
  selectScale,
  setMeasurementLevel,
  setScaleName,
  startSelectingItems,
  toggleItem
} from '../actions/scales-actions';
import ScaleConfigurerComponent from './ScaleConfigurerComponent';
import {mouseUp} from '../../common/actions/common-actions';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {RaisedButton} from 'material-ui';
import VerticalListComponent from '../../common/component/VerticalListComponent';

const containerStyle = {
  display: 'flex'
};

const itemDisplayComponentContainerStyle = {
  width: '30%'
};

const scaleConfigContainerStyle = {
  width: '70%'
};

const button = {
  margin: 'auto',
  width: '100%'
};

export class ScalesContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  _getSelectedScale = () => {
    return this.props.scales[this.props.selectedScale];
  };

  _getSelectedScaleItems = () => {
    const selectedScale = this._getSelectedScale();
    return selectedScale ? selectedScale.items : [];
  };

  render() {
    const {
      selectedScale,
      mouseUp,
      itemNames,
      toggleItem,
      startSelectingItems,
      createScale,
      selectScale,
      scales,
      setScaleName,
      removeScale,
      setMeasurementLevel
    } = this.props;

    const {
      _getSelectedScaleItems,
      _getSelectedScale
    } = this;

    const scaleNames = scales.map(scale => scale.name);
    return (
      <div style={containerStyle} onMouseUp={mouseUp}>
        <div style={itemDisplayComponentContainerStyle}>
          <VerticalListComponent
            data={itemNames}
            selectedItems={_getSelectedScaleItems()}
            toggleItem={toggleItem}
            startSelectingItems={startSelectingItems}
          />
        </div>
        <div style={scaleConfigContainerStyle}>
          <RaisedButton
            label="New scale"
            style={button}
            onTouchTap={() => createScale()}
          />
          <SelectableElementCollectionComponent
            selectElement={selectScale}
            selectedElementIndex={selectedScale}
            elements={scaleNames}
          />
          <ScaleConfigurerComponent
            scale={_getSelectedScale()}
            setScaleName={(name) => setScaleName(selectedScale, name)}
            removeScale={() => removeScale(selectedScale)}
            setMeasurementLevel={(level) => setMeasurementLevel(selectedScale, level)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {fileProcessing, scales} = state;
  return {
    scales: scales.scales,
    itemNames: fileProcessing.data[0],
    selectedItems: scales.selectedItems,
    selectedScale: scales.selectedScale
  };
};

const dispatchToProps = dispatch => {
  return {
    startSelectingItems: () => {
      dispatch(startSelectingItems());
    },
    mouseUp: () => {
      dispatch(mouseUp());
    },
    toggleItem: itemIndex => {
      dispatch(toggleItem(itemIndex));
    },
    createScale: () => {
      dispatch(createScale());
    },
    selectScale: index => {
      dispatch(selectScale(index));
    },
    setScaleName: (scaleIndex, scaleName) => {
      dispatch(setScaleName(scaleIndex, scaleName));
    },
    removeScale: scaleIndex => {
      dispatch(removeScale(scaleIndex));
    },
    setMeasurementLevel: (scaleIndex, measurementLevel) => {
      dispatch(setMeasurementLevel(scaleIndex, measurementLevel));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);