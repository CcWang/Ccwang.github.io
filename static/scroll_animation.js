$(document).ready(function(){

  $(window).load(function(){
    $('.onload').addClass('onload');
    console.log('loaidng')
  },function(){
    $('.onload').removeClass('onload');
    $('#loading').hide();
    console.log('finish loading')
  }.bind(this));
  $(window).bind('scroll', function() {
      if($(window).scrollTop() >= $('footer').offset().top + $('footer').outerHeight() - window.innerHeight) {
          // alert('end reached');
          // reach to the end,then show nav bar
          $('.fixed-header').removeClass('header_hide');
      }
  });
  $(window).scroll(function(){
    // console.log(wScroll

    // $('.project_box').each(function(){
    //   var wording=$(this).offset().top;
    //   var topOfWindow = $(window).scrollTop();
    //   if (wording < topOfWindow+500){
    //     // $(this).fadeIn();
    //     $(this).show('slow');
    //   }else{
    //     $(this).hide();
    //   }
    // })
    $('.projectImg').each(function(){
      var imagePos = $(this).offset().top;

      var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+500) {

        // $(this).addClass('slide-left');
        // $(this).addClass('slide-right').addClass('wrapper');
        // $(this).position({
        //   left:topOfWindow+'px';
        // })
        // $(this).position().left=topOfWindow;
        // console.log($(this).position());
        var h_l=350;
        var w_l=650;
        $(this).height(function(){
          var h=$(this).height();
          if (h<h_l){
            return 350;
          }
        });
        $(this).width(function(){
          var w=$(this).width();
          // console.log(w);
          if (w<80 && w !==0){
            return 0
          }else if (w<w_l) {
            return 650/350*(topOfWindow-imagePos+500);
          }
        });

        // console.log(h,w);
      }
    });
  });

});
