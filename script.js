$('#switch').on('click', () => {
  if( $('#switch').prop('checked')){
    $('.themed').addClass('dark');
    $('.sub').css('color','#777b84');
  } else{
    $('.themed').removeClass('dark');
    $('.sub').css('color','#dbcfa6');
  }
})
