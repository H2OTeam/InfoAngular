$(document).ready(function() {
 jQuery(document).ready(function($) {
  $(".scroll").click(function(event) {
   event.preventDefault();
   $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 1000);
  });
 });
 $(document).ready(function() {
  /*
      var defaults = {
      containerID: 'toTop', // fading element id
      containerHoverID: 'toTopHover', // fading element hover id
      scrollSpeed: 1200,
      easingType: 'linear' 
      };
  */

  $().UItoTop({ easingType: 'easeOutQuart' });

 });
 $("#video").simplePlayer();
 jQuery(document).ready(function($) {
  $('.counter').counterUp({
   delay: 100,
   time: 1000
  });
 });
 $(function() {});
 $(window).load(function() {
  $('.flexslider').flexslider({
   animation: "slide",
   start: function(slider) {
    $('body').removeClass('loading');
   }
  });
 });
});
