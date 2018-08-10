let engine = {
  BUTTONS:  ['G', 'R', 'B', 'Y'],

  getRandomInRange: function(min, max) {
    const truncMin = Math.ceil(min);
    const truncMax = Math.floor(max);
    return Math.floor(Math.random() * (truncMax - truncMin)) + truncMin;
  },

  // generate an array of strings having the sequence for the user to play
  generateSequence: function() {
    const moves = Array.from(Array(20).keys());
    return moves.map(() => this.BUTTONS[engine.getRandomInRange(0, 4)]);
  },

  currentSequence: function(sequence, turnsCount) {
    return (turnsCount === 0)
      ? sequence[0]
      : sequence.slice(0, turnsCount + 1);
  },

  // check correctness of user sequence at current turn
  isUserSequenceCorrect: function(
    simonSequence, userSequence, turnsCount) {
    return this.currentSequence(userSequence, turnsCount).toString() ===
        this.currentSequence(simonSequence, turnsCount).toString();
  },

  hasWon: function(simonSequence, userSequence) {
    return simonSequence === userSequence;
  }
};

module.exports = engine;
