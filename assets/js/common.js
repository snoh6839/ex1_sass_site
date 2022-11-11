$(function(){
  let pwElem = $('#navi .page-wrap');
  let pageElem = $('#navi .page-wrap .page');
  let pageLeng = pageElem.length; // page 개수로 범위 정하기
  // console.log(parseInt(pageElem.css('width'))*pageLeng);
  /*페이지 로딩완료 후 page 개수를 체크하고 page-wrap의 초기 너비값을 설정한다.*/
  pwElem.css('width',parseInt(pageElem.css('width'))*pageLeng);

  /*script 영역 gallery script 만들기 예*/
  $('#navi a').click(function(){
     let imgSrc = $(this).attr('href');
     let checkAni = $('#main img:last').is(':animated');
     console.log(checkAni);
     if(checkAni) { // animated : 애니메이션이 작동 중일때 빠른전환
       // $('#main img:last').stop().css('opacity',0);
       // $('#main img:last').remove();
       // $('#main img').attr('src',imgSrc);
     }else{
       $('#main img:last').animate({opacity: 0},{
         duration: 1000,
         easing: 'swing',
         start: function(){
           $(this).before('<img src="'+imgSrc+'">');
         },
         complete: function(){
           $(this).remove();
         }
       });
     }
     return false;
  });
  // prev, next 버튼으로 작동하는 스크립트
  const marginNumber = parseInt(pageElem.css('width'));
  function pageBtnFunc(el){
    el.click(function(){
      let marginLeftPw = parseInt(pwElem.css('margin-left'));
      let isAni = pwElem.is(':animated'); // animation 진행 여부 확인
      if( isAni == false ) {
        if( $(el).hasClass('next') && marginLeftPw > -(marginNumber*(pageLeng-1)) ){// -(marginNumber*(pageLeng-1))
          pwElem.animate({marginLeft: `${marginLeftPw - marginNumber}`},'fast');
        }else if( $(el).hasClass('prev') && marginLeftPw < 0 ){
          pwElem.animate({marginLeft: `${marginLeftPw + marginNumber}`},'fast');
        }else if( marginLeftPw == -(marginNumber*(pageLeng-1)) || marginLeftPw == 0 ){
          alert('더 이상 이미지가 없습니다.');
        }
        /*
        위 코드를 참고하여 논리 연산자를 사용하여 next, prev 버튼을 눌렀을때
        경고 창을 띄우고 아래 텍스트를 출력하시오.
        '더 이상 이미지가 없습니다.'
        */
      }

    });
  }
  $('img.btn').each(function(){
    pageBtnFunc($(this))
  });

  //accordian

  // $('.accordian dd:not(:first)').css('display','none');
  // $('.accordian dl dt').click(function () {
  //   if($('+dd',this).css('display') == 'none'){
  //     $('dd').animate({'height:0'},'slow','linear');
  //     $('+dd',this).animate({'height:250px'},'slow','linear');

      // $('dd').slideUp({duration: 1000, easing: 'easeInOutExpo'});
      // $('+dd',this).slideDown({duration: 1000, easing: 'easeInOutExpo'});
  //   }
  // })

  $('.accordian dd:not(:first)').css({'display':'none','height':0})
  let initialDDheight = parseInt($('.accordian dd').css('height'));
  $('.accordian dl dt').click(function () {
    let isAni = $('dd').is(':animated');
    if($('+dd',$(this)).css('display') == 'none' && !isAni){
      $('.accordian dd').each(function () {
        if(parseInt($(this).css('height')) == initialDDheight){
          $(this).animate({height:0},400,function() {
            $(this).css('display','none');
          })
        }
      })
      $('+dd',$(this)).css('display','block').animate({height:initialDDheight},400)
    }
  })

  // script 영역 table_grid 사용 예
  var thisIndex;
  $('td').mouseover(function() {
    thisIndex = $(this).index() + 1;
    console.log(thisIndex);
    $('td:nth-child(' + thisIndex + ')').addClass('hover')
  }).mouseout(function(){
     $('td:nth-child(' + thisIndex + ')').removeClass('hover')
});

  $('td').mouseover(function() {
    thisIndex = $(this).index() + 1;
    console.log(thisIndex);
    $('td:nth-child(' + thisIndex + ')').addClass('hover')
  }).mouseout(function(){
    $('td').removeClass('hover');
  });

  
});
