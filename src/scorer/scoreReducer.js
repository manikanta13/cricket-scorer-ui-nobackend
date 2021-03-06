import { INNINGS_OVER, NEXT_BALL, NEXT_OVER } from '../store/actionConstants';
import { convertBallsToOvers } from '../utilis';

export const initialScoreBoard = {
  currentTeamIndex: 0,
  scoreboard: [{
    total: 0, wickets: 0, overs: 0.0, totalBalls: 0,
  },
  {
    total: 0, wickets: 0, overs: 0.0, totalBalls: 0,
  }],
};

const updateScoreboard = (state = initialScoreBoard, action) => {
  switch (action.type) {
    case NEXT_BALL: {
      const { extras, runs, wicket } = action.payload;
      const { currentTeamIndex, scoreboard } = state;
      const currentTeam = state.scoreboard[currentTeamIndex];

      const total = currentTeam.total + runs;
      const wicketCounter = wicket ? 1 : 0;

      if (extras.includes('W') || extras.includes('N')) {
        scoreboard[currentTeamIndex] = {// TODO fix later
          ...currentTeam,
          total: total + 1,
          wickets: scoreboard[currentTeamIndex].wickets + wicketCounter,
        };

        return {
          ...state,
          scoreboard: [...scoreboard],
        };
      }

      const totalBalls = currentTeam.totalBalls + 1;
      const overs = convertBallsToOvers(totalBalls);

      scoreboard[currentTeamIndex] = {// TODO fix later
        ...currentTeam,
        total,
        wickets: scoreboard[currentTeamIndex].wickets + wicketCounter,
        totalBalls,
        overs,
      };


      return {
        ...state,
        scoreboard: [...scoreboard],
      };
    }
    case NEXT_OVER: {
      if (action.currentOver + 1 === action.totalNoOfOvers) {
        const currentTeamIndex = state.currentTeamIndex === 0 ? 1 : 0;
        return { ...state, currentTeamIndex };
      }
      return state;
    }
    case INNINGS_OVER: {
      const currentTeamIndex = state.currentTeamIndex === 0 ? 1 : 0;
      return { ...state, currentTeamIndex };
    }
    default:
      return state;
  }
};
export default updateScoreboard;
