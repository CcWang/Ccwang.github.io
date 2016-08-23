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
      },90)
    $scope.about_1 ='</> A full-stack web developer based in Silican Valley, pursuing exciting new opportunities.'
    $scope.about_2= '</> Passionate on building a product that has impact on people’s life. '
    $scope.about_3="</> Looking to join a great company and talented team over cash."
    $scope.about_4='</> Languages: JavaScript | Python | PHP | SQL '
    $scope.about_5='</> Front-End Development: HTML5 | CSS3 | jQuery | Angular | React'
    $scope.about_6='</> Frameworks: CodeIgniter | Express | NodeJS | Django | CakePHP | Rails'
    }


  ]);
})(window.angular);
