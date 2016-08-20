(function(angular) {
  'use strict';
angular.module('myApp', [])
  .run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
  }])
  .controller('mainController', ['$anchorScroll', '$location', '$scope',
    function ($anchorScroll, $location, $scope) {
      // $scope.preLoad();
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
   $scope.gotoAnchor('anchorcw');

      // $anchorScroll();
      var intro = "Full Stack Web Developer"
      $scope.intro ='';
      var i=0;
      var timer = setInterval(function(){
        if(i<intro.length){
          $scope.intro += intro[i];
          i++;
        }
        $scope.$apply();
      },150)
    $scope.about_1 ='</> A full-stack web developer based in Silican Valley, pursuing exciting new opportunities.'
    $scope.about_2= '</> Passionate on building a product that has impact on people’s life. '
    $scope.about_3="</> Looking to join a great company and talented team over cash."
    // $scope.about_1 = "A full-stack web developer pursuing exciting new opportunities, and proud to proclaim that I recently accomplished an immersive 14 week programming bootcamp, Coding Dojo. Detail-oriented and analytical from previous accounting career. A quick learner with the ability to thrive in a fast-paced environment, willing to give 100% to help the team succeed.  At Coding Dojo, I earned the highest earning of achievement, a Double Black Belt, which means that I mastered 3 full stacks: LAMP(Linux, Apache, MAMP, PHP), MEAN (MongoDB, Express, Angular, NodeJS) and Ruby on Rails."
// ;   $scope.about_2 ="Before attending Coding Dojo, I worked in accounting. From this, I became very detail-oriented and analytic, and intend to carry these valuable skills into a programming role. I am a quick learner with the ability to thrive in a fast-paced environment, and am willing to do whatever it takes to help my team succeed: front end, back end and everything in between. I am eager to continue learning and join your development team!";

    }


  ]);
})(window.angular);
