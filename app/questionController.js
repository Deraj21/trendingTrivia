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
    },
    id: null
  };
  $scope.searchFilter = '';
  
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

  // editQuestion
  $scope.fillValues = function(item){
    $scope.showModal();
    $scope.newQuestion = Object.assign({}, item);
    console.log($scope.newQuestion);
    document.getElementsByClassName("question-in")[0].value = item.question;
    document.getElementsByClassName("animal-in")[0].value = item.animal;
    document.getElementsByClassName("diff-in")[0].value = item.difficulty;
    document.getElementsByClassName(`radio-${item.correct_answer}`)[0].checked = "checked";
    document.getElementsByClassName("option-1")[0].value = item.options[1];
    document.getElementsByClassName("option-2")[0].value = item.options[2];
    document.getElementsByClassName("option-3")[0].value = item.options[3];
    document.getElementsByClassName("option-4")[0].value = item.options[4];
  };

  $scope.saveChanges = function(){
    questionService.editQuestion($scope.newQuestion)
      .then(res => {
        $scope.getQuestions();
      });
    $scope.hideModal();
  };
  
  $scope.deleteQuestion = function(){
    questionService.deleteQuestion($scope.newQuestion._id)
      .then(res => {
        $scope.getQuestions();
      });
    $scope.hideModal();
  };

  $scope.userGuess = function(question, key){
    let questionWrapper = document.getElementsByClassName(`color-${question._id}`)[0];
    let color = (key == question.correct_answer) ? 'green' : 'red';
    questionWrapper.setAttribute("style", `background-color: ${color}`);
  };

  $scope.filterByAnimal = function(){
    questionService.getQuestions()
      .then(response => {
        $scope.questions = response.data.filter(question => {
          return question.animal.includes($scope.searchFilter);
        });
      });
  };

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