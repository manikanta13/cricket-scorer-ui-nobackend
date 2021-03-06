import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Extras from './Extras';
import { selectBatsman, selectRunsScored, updateScore } from './scoreActions';
import { wicketTaken } from '../nextBatsman/actions';


const createRunsButton = (props, score) => (
  <Button
    color="primary"
    className="mx-1 my-1 px-3 rounded"
    style={{
            flexBasis: 40, flexShrink: 0, flexGrow: 0, width: 40,
        }}
    outline
    onClick={() => props.selectRunsScored(score)}
    active={props.selectedRuns === score}
  >{score}
  </Button>);

createRunsButton.propTypes = {
  selectedRuns: PropTypes.number.isRequired,
  selectRunsScored: PropTypes.func.isRequired,
};


const RunsToolBar = props => (
  <ButtonGroup className="d-flex flex-wrap">
    {createRunsButton(props, 0)}
    {createRunsButton(props, 1)}
    {createRunsButton(props, 2)}
    {createRunsButton(props, 3)}
    {createRunsButton(props, 4)}
    {createRunsButton(props, 5)}
    {createRunsButton(props, 6)}
    {createRunsButton(props, 7)}

  </ButtonGroup>);


const BatsmenToolBar = props => (
  <ButtonGroup>
    <Button
      outline
      color="primary"
      onClick={() => props.selectBatsman(props.batsmen[0])}
      active={props.selectedBatsman === props.batsmen[0]}
    >{props.batsmen[0]}
    </Button>
    <Button
      outline
      color="primary"
      onClick={() => props.selectBatsman(props.batsmen[1])}
      active={props.selectedBatsman === props.batsmen[1]}
    >{props.batsmen[1]}
    </Button>
  </ButtonGroup>);

BatsmenToolBar.propTypes = {
  batsmen: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedBatsman: PropTypes.string.isRequired,
  selectBatsman: PropTypes.func.isRequired,

};

const OutButton = props => (
  <ButtonGroup>
    <Button
      color="primary"
      outline
      onClick={() => props.onOutBtnClick()}
      active={props.wicketStatus === true}
    >
                    Out
    </Button>
  </ButtonGroup>);

OutButton.propTypes = {
  onOutBtnClick: PropTypes.func.isRequired,
  wicketStatus: PropTypes.bool,
};

OutButton.defaultProps = {
  wicketStatus: false,
};

const ThisBall = props => (
  <Container>
    <Row>
      <Col md={{ size: 6, offset: 3 }}>
        <b>This Ball</b>
      </Col>
    </Row>
    <br />
    <Row>
      <Col md={{ size: 6, offset: 3 }} className="text-center">
        <BatsmenToolBar
          selectedBatsman={props.selectedBatsman}
          batsmen={props.batsmen}
          selectBatsman={props.selectBatsman}
        />
      </Col>
    </Row>
    <br />
    <Row>
      <Col md={{ size: 6, offset: 3 }} className="text-center">
        <RunsToolBar selectedRuns={props.selectedRuns} selectRunsScored={props.selectRunsScored} />
      </Col>
    </Row>
    <Extras />
    <br />
    <Row>
      <Col md={{ size: 6, offset: 3 }} className="text-center">
        <OutButton wicketStatus={props.wicketStatus} onOutBtnClick={props.onOutBtnClick} />
      </Col>
    </Row>
    <br />
    <Row>
      <Col className="text-center">
        <Button color="primary" onClick={() => props.onNextBall(props)}>Next Ball</Button>
      </Col>
    </Row>
  </Container>);

ThisBall.propTypes = {
  batsmen: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedBatsman: PropTypes.string.isRequired,
  selectedRuns: PropTypes.number,
  wicketStatus: PropTypes.bool,
  selectRunsScored: PropTypes.func.isRequired,
  selectBatsman: PropTypes.func.isRequired,
  onNextBall: PropTypes.func.isRequired,
  onOutBtnClick: PropTypes.func.isRequired,
};

ThisBall.defaultProps = {
  selectedRuns: undefined,
  wicketStatus: undefined,
};


const mapStateToProps = state => ({
  batsmen: state.currentPlayers.batsmen,
  bowler: state.currentPlayers.bowler,
  selectedBatsman: state.currentBall.batsman,
  selectedRuns: state.currentBall.runs,
  extras: state.currentBall.extras,
  wicket: state.currentBall.wicket,
  over: state.scoreInformation.scoreboard[state.scoreInformation.currentTeamIndex].overs,
});

const mapDispatchToProps = dispatch => ({
  selectBatsman: batsmanName => dispatch(selectBatsman(batsmanName)),
  selectRunsScored: runsScored => dispatch(selectRunsScored(runsScored)),
  onOutBtnClick: () => dispatch(wicketTaken()),
  onNextBall: (currentBall) => {
    if ((currentBall.selectedBatsman !== '' && (currentBall.selectedRuns !== undefined || currentBall.wicket))) {
      dispatch(updateScore(currentBall));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThisBall);
