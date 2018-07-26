angular.module('myApp')
.controller('questionController', function($scope, questionService){
  $scope.newQuestion = {
    question: '',
    animal: '',
    correct_answer: 1,
    difficulty: 1,
    options: {}
  };
  $scope.searchFilter = 'filter';
  
  $scope.filterByDifficulty = function(diff){
    if (diff === '') {
      questionService.getQuestions()
        .then(response => {
          $scope.questions = response.data;
        });
    } else {
      questionService.getFilteredQuestions(diff)
        .then(response => {
          $scope.questions = response.data;
        });
    }
  };
  
  $scope.difficultyText = function(diff) {
    switch (diff) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      default:
        return '';
    }
  };

  questionService.getQuestions()
    .then(response => {
      $scope.questions = response.data;
    });

});

/**
{
  animal: "Dragonite",
  correct_answer: 1,
  date_entered: "2018-04-09T15:16:33.339Z",
  difficulty: 3,
  options: {
    1: "Dragonite",
    2: "Vaporeon",
    3: "Eevee",
    4: "Charizard"
  },
  question: "best pokeman",
  __v: 0,
  _id: "5b53b7149b87710ff5d87133"
}
 */