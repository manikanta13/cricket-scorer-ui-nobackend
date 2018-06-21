import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { initialScoreBoard } from './scoreReducer';


const ScoreBoard = (props = initialScoreBoard) => {
  const otherTeamIndex = props.currentTeamIndex === 0 ? 1 : 0;
  const isOtherTeamPlayed = props.scoreboard[otherTeamIndex].overs !== 0;

  return (
    <Container>
      <br />
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Row>
            <Col md="5" xs="4">
              <b>Team {props.currentTeamIndex + 1}</b><br />
            </Col>
            <Col sm="1" xs="2" />
            <Col style={{ textAlign: 'right' }}>
              <b>{props.scoreboard[props.currentTeamIndex].total}/
                                {props.scoreboard[props.currentTeamIndex].wickets} in
                                &nbsp;{props.scoreboard[props.currentTeamIndex].overs}
                                /{props.totalNoOfOvers}
              </b>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      {isOtherTeamPlayed ?
        <Row>
          <Col md={{ size: 6, offset: 3 }} sm="12">
            <Row>
              <Col>
                   Team {otherTeamIndex + 1} scored
              </Col>
              <Col style={{ textAlign: 'right' }}>
                {props.scoreboard[otherTeamIndex].total}/
                {props.scoreboard[otherTeamIndex].wickets} in
                &nbsp;{props.scoreboard[otherTeamIndex].overs.toFixed(1)}/
                {props.totalNoOfOvers}
              </Col>
            </Row>
          </Col>
        </Row>
                :
        <Row>
          <Col md={{ size: 6, offset: 3 }} sm="12">
            <Row>
              <Col>Team {otherTeamIndex + 1} yet to play</Col>
            </Row>
          </Col>
        </Row>

            }
    </Container>);
};

const mapToProps = (state) => {
  console.log('total no of overs', state.gameInformation.numberOfOvers);
  return {
    currentTeamIndex: state.scoreInformation.currentTeamIndex,
    scoreboard: state.scoreInformation.scoreboard,
    totalNoOfOvers: state.gameInformation.numberOfOvers,
  };
};
export default connect(mapToProps)(ScoreBoard);

ScoreBoard.propTypes = {
  currentTeamIndex: PropTypes.number.isRequired,
  scoreboard: PropTypes.arrayOf(PropTypes.objectOf()).isRequired,
  totalNoOfOvers: PropTypes.number.isRequired,
};
