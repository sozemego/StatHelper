import React from 'react';
import {CHI_SQUARE_INDEPENDENCE} from '../test-runner/statistics';
import scalesSelectors from '../../scales/selectors';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '4px 25px 4px 25px'
};

export class CorrelationTestResultComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   * Given a test name in AAA_BBB_CCC format, returns a string in Aaa Bbb Ccc format.
   * @param test
   * @returns {string}
   * @private
   */
  _getTestName = test => {
    const tokens = test.split('_');
    return tokens
      .map(token => token.toLowerCase())
      .map(token => token.charAt(0).toUpperCase() + token.substring(1))
      .join(' ');
  };

  render() {
    const {
      test,
      minSignificance
    } = this.props;

    const {
      _getTestName
    } = this;

    const {
      type: testType,
      results: testResults
    } = test;

    return (
      <div style={containerStyle}>
        <div>Test type: {testType}</div>
        <br/>
        <div>Results:</div>
        {testResults.map((result, index) => {

          const {
            testName,
            coefficient,
            pValue,
            scales,
            sampleSize,
          } = result;

          const [firstScale, secondScale] = scales;
          return <div key={index}>
            <div>You performed a {_getTestName(testName)} correlation
              on {scalesSelectors.getScaleName(firstScale)}{'\u00a0'}
              and {scalesSelectors.getScaleName(secondScale)}.
            </div>
            <div>The sample size for this test was {sampleSize}.</div>
            <div>You obtained a correlation coefficient of {coefficient}{'\u00a0'}
              (r = {coefficient}) at a {pValue} (p = {pValue}) significance level.
            </div>
            {testName === CHI_SQUARE_INDEPENDENCE ?
              <div>
                The calculated chi-squared is {result.chiSquare} ({'\u03c7'}{'\u00b2'}
                = {result.chiSquare}).
                Correlation coefficient for {'\u03c7'}{'\u00b2'}
                was {_getTestName(result.coefficientType)}.
              </div> : null
            }
            <div>This result indicates that this correlation coefficient
              is {pValue > minSignificance ? 'NOT significant' : <b>significant</b>}.
            </div>
            <br/>
          </div>;
        })}
      </div>
    );
  }

}