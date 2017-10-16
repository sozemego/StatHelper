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
import {
  getScaleId,
  getScaleIndexById, getScaleItems, getScaleName, getScales, getSelectedScale, getSelectedScaleId,
  scaleRootSelector
} from '../selectors/scale-selectors';
import {dataLoaderRootSelector, getItemNames} from '../../data-loader/selectors';

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
    return this.props.selectedScale;
  };

  _getSelectedScaleItems = () => {
    const selectedScale = this._getSelectedScale();
    return selectedScale ? getScaleItems(selectedScale) : [];
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

    const selectedScaleId = selectedScale ? getScaleId(selectedScale) : null;

    const {
      _getSelectedScaleItems,
      _getSelectedScale
    } = this;

    const scaleNames = scales.map(getScaleName);

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
            selectElement={(index) => selectScale(getScaleId(scales[index]))}
            selectedElementIndex={scales.findIndex(scale => getScaleId(scale) === selectedScaleId)}
            elements={scaleNames}
          />
          <ScaleConfigurerComponent
            scale={_getSelectedScale()}
            setScaleName={(name) => setScaleName(selectedScaleId, name)}
            removeScale={() => removeScale(selectedScaleId)}
            setMeasurementLevel={(level) => setMeasurementLevel(selectedScaleId, level)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const dataLoader = dataLoaderRootSelector(state);
  return {
    scales: getScales(scaleRootSelector(state)),
    itemNames: getItemNames(dataLoader),
    selectedScale: getSelectedScale(scaleRootSelector(state))
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
    selectScale: scaleId => {
      dispatch(selectScale(scaleId));
    },
    setScaleName: (scaleId, scaleName) => {
      dispatch(setScaleName(scaleId, scaleName));
    },
    removeScale: scaleId => {
      dispatch(removeScale(scaleId));
    },
    setMeasurementLevel: (scaleId, measurementLevel) => {
      dispatch(setMeasurementLevel(scaleId, measurementLevel));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);