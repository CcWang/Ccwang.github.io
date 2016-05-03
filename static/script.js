(function(angular) {
  'use strict';
angular.module('myApp', [])
  .run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
  }])
  .controller('mainController', ['$anchorScroll', '$location', '$scope',
    function ($anchorScroll, $location, $scope) {
      $scope.gotoAnchor = function(x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
          // set the $location.hash to `newHash` and
          // $anchorScroll will automatically scroll to it
          $location.hash('anchor' + x);
        } else {
          // call $anchorScroll() explicitly,
          // since $location.hash hasn't changed
          $anchorScroll();
        }
      };

      var intro = "Full Stack Web Developer"
      $scope.intro ='';
      var i=0;
      var timer = setInterval(function(){
        if(i<intro.length){
          $scope.intro += intro[i];
          i++; 
        }
        $scope.$apply();
      },300)

    $scope.about_1 = "I am a full-stack web developer pursuing exciting new opportunities, and proud to proclaim that I recently accomplished an immersive 14 week programming bootcamp, Coding Dojo. At Coding Dojo, I earned the highest earning of achievement, a Double Black Belt, which means that I mastered 3 full stacks: LAMP(Linux, Apache, MAMP, PHP), MEAN (MongoDB, Express, Angular, NodeJS) and Ruby on Rails."
;   $scope.about_2 ="Before attending Coding Dojo, I worked in accounting. From this, I became very detail-oriented and analytic, and intend to carry these valuable skills into a programming role. I am a quick learner with the ability to thrive in a fast-paced environment, and am willing to do whatever it takes to help my team succeed: front end, back end and everything in between. I am eager to continue learning and join your development team!";
    }

  ]);
})(window.angular);



