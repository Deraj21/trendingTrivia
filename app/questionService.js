angular.module('myApp')
.service('questionService', function($http) {
  this.getQuestions = () => $http.get(`https://practiceapi.devmountain.com/api/trivia/questions`);
  this.getFilteredQuestions = difficulty => $http.get(`https://practiceapi.devmountain.com/api/trivia/questions/difficulty/${difficulty}`);
});
