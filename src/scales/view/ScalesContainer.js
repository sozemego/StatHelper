import React from 'react';
import {connect} from 'react-redux';
import scalesOperations from '../operations';
import ScaleConfigurerComponent from './ScaleConfigurerComponent';
import {mouseUp} from '../../common/actions/common-actions';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {RaisedButton} from 'material-ui';
import VerticalListComponent from '../../common/component/VerticalListComponent';
import scaleSelectors from '../selectors';
import dataLoaderSelectors from '../../data-loader/selectors';
import {randomScaleId} from '../model/scale';

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
    return selectedScale ? scaleSelectors.getScaleItems(selectedScale) : [];
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

    const selectedScaleId = selectedScale ? scaleSelectors.getScaleId(selectedScale) : null;

    const {
      _getSelectedScaleItems,
      _getSelectedScale
    } = this;

    const scaleNames = scales.map(scaleSelectors.getScaleName);

    return (
      <div style={containerStyle} onMouseUp={mouseUp}>
        <div style={itemDisplayComponentContainerStyle}>
          <VerticalListComponent
            data={itemNames}
            selectedItems={_getSelectedScaleItems()}
            toggleItem={(index) => toggleItem(selectedScaleId, index)}
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
            selectElement={(index) => selectScale(scaleSelectors.getScaleId(scales[index]))}
            selectedElementIndex={scales.findIndex(scale => scaleSelectors.getScaleId(scale) === selectedScaleId)}
            elements={scaleNames}
          />
          <ScaleConfigurerComponent
            scale={_getSelectedScale()}
            setScaleName={(name) => setScaleName(selectedScaleId, name)}
            removeScale={() => removeScale(selectedScaleId)}
            setMeasurementLevel={(level) => setMeasurementLevel(selectedScaleId, level)}
            itemNames={itemNames}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const dataLoader = dataLoaderSelectors.dataLoaderRootSelector(state);
  return {
    scales: scaleSelectors.getScales(scaleSelectors.scaleRootSelector(state)),
    itemNames: dataLoaderSelectors.getItemNames(dataLoader),
    selectedScale: scaleSelectors.getSelectedScale(scaleSelectors.scaleRootSelector(state))
  };
};

const dispatchToProps = dispatch => {
  return {
    startSelectingItems: () => {
      dispatch(scalesOperations.startSelectingItems());
    },
    mouseUp: () => {
      dispatch(mouseUp());
    },
    toggleItem: (scaleId, itemIndex) => {
      dispatch(scalesOperations.toggleItem(scaleId, itemIndex));
    },
    createScale: () => {
      const scaleId = randomScaleId();
      dispatch(scalesOperations.createScale(scaleId));
      dispatch(scalesOperations.selectScale(scaleId));
    },
    selectScale: scaleId => {
      dispatch(scalesOperations.selectScale(scaleId));
    },
    setScaleName: (scaleId, scaleName) => {
      dispatch(scalesOperations.setScaleName(scaleId, scaleName));
    },
    removeScale: scaleId => {
      dispatch(scalesOperations.removeScale(scaleId));
    },
    setMeasurementLevel: (scaleId, measurementLevel) => {
      dispatch(scalesOperations.setMeasurementLevel(scaleId, measurementLevel));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);