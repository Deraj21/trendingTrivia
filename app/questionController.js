angular.module('myApp')
.controller('questionController', function($scope, questionService){
  $scope.newQuestion = {
    question: '',
    animal: '',
    correct_answer: 1,
    difficulty: 1,
    options: {
      1: '',
      2: '',
      3: '',
      4: ''
    }
  };
  $scope.searchFilter = 'filter';
  
  $scope.getQuestions = function(){
    questionService.getQuestions()
      .then(response => {
        $scope.questions = response.data;
      });
  }
  $scope.getQuestions();
  
  // reGETs the questions base on difficulty
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
  
  // turns integer into difficulty text
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
  
  // hides and shows the 'Add Question' html
  $scope.hideModal = function(){
    let modal = document.querySelector(".modal");
    modal.setAttribute('style', "display: none;");
  };
  $scope.showModal = function(){
    let modal = document.querySelector('.modal');
    modal.setAttribute('style', 'display: flex;');
  }
  
  // sends new question up to the cloud
  $scope.saveNewQuestion = function(){
    let { one, two, three, four } = $scope;
    if (one) { $scope.newQuestion.correct_answer = 1; }
    else if (two) { $scope.newQuestion.correct_answer = 2; }
    else if (three) { $scope.newQuestion.correct_answer = 3; }
    else if (four) { $scope.newQuestion.correct_answer = 4; }
    else { console.log('no correct answer'); }

    console.log('saving new question:', $scope.newQuestion);
    questionService.postNewQuestion($scope.newQuestion)
      .then( response => {
        $scope.questions = response.data;
      });
    $scope.hideModal();
  }
  // 
  $scope.cancelNewQuestion = function(){
    console.log('cancel new question');
    $scope.hideModal();
  }
  
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