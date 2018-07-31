angular.module('myApp')
.service('questionService', function($http) {
  this.getQuestions = () => $http.get(`https://practiceapi.devmountain.com/api/trivia/questions`);
  this.getFilteredQuestions = difficulty => $http.get(`https://practiceapi.devmountain.com/api/trivia/questions/difficulty/${difficulty}`);
  this.postNewQuestion = newQuestion => $http.post(`https://practiceapi.devmountain.com/api/trivia/questions`, newQuestion);
  this.getQuestion = id => $http.get(`https://practiceapi.devmountain.com/api/trivia/questions/${id}`);
  this.editQuestion = question => $http.put(`https://practiceapi.devmountain.com/api/trivia/questions/${question._id}`, question);
  this.deleteQuestion = id => $http.delete(`https://practiceapi.devmountain.com/api/trivia/questions/${id}`);
});
