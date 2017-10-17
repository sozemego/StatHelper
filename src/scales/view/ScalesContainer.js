import React from 'react';
import {connect} from 'react-redux';
import operations from '../operations';
import ScaleConfigurerComponent from './ScaleConfigurerComponent';
import {mouseUp} from '../../common/actions/common-actions';
import SelectableElementCollectionComponent from '../../common/component/SelectableElementCollectionComponent';
import {RaisedButton} from 'material-ui';
import VerticalListComponent from '../../common/component/VerticalListComponent';
import scaleSelectors from '../selectors';
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
            selectElement={(index) => selectScale(scaleSelectors.getScaleId(scales[index]))}
            selectedElementIndex={scales.findIndex(scale => scaleSelectors.getScaleId(scale) === selectedScaleId)}
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
    scales: scaleSelectors.getScales(scaleSelectors.scaleRootSelector(state)),
    itemNames: getItemNames(dataLoader),
    selectedScale: scaleSelectors.getSelectedScale(scaleSelectors.scaleRootSelector(state))
  };
};

const dispatchToProps = dispatch => {
  return {
    startSelectingItems: () => {
      dispatch(operations.startSelectingItems());
    },
    mouseUp: () => {
      dispatch(mouseUp());
    },
    toggleItem: itemIndex => {
      dispatch(operations.toggleItem(itemIndex));
    },
    createScale: () => {
      dispatch(operations.createScale());
    },
    selectScale: scaleId => {
      dispatch(operations.selectScale(scaleId));
    },
    setScaleName: (scaleId, scaleName) => {
      dispatch(operations.setScaleName(scaleId, scaleName));
    },
    removeScale: scaleId => {
      dispatch(operations.removeScale(scaleId));
    },
    setMeasurementLevel: (scaleId, measurementLevel) => {
      dispatch(operations.setMeasurementLevel(scaleId, measurementLevel));
    }
  };
};

export default connect(mapStateToProps, dispatchToProps)(ScalesContainer);