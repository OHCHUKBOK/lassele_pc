jQuery(function(){
  

    /*테이블 클릭시 tr 엑션*/
    $("._actOnOff > *").on({
        click:function(){
            $(this).parent("._actOnOff").children().removeClass("on");
            $(this).addClass("on");
        }
    });



    // 체크박스 전체 선택
    $(".actCheck").on("click", ".selectorAll", function () {
        $(this).parents(".actCheck").find('input').prop("checked", $(this).is(":checked"));
    });

    // 체크박스 개별 선택
    $(".actCheck").on("click", ".normal", function() {
        var is_checked = true;
        $(".actCheck .normal").each(function(){
            is_checked = is_checked && $(this).is(":checked");
        });
        $(this).parents(".actCheck").find('.selectorAll').prop("checked", is_checked);
    });
   



    $("td[data-editable='true']").dblclick(function () {
        let td = $(this);
        let currentText = td.text().trim();
        
        // 이미 input이 있으면 중복 생성 방지
        if (td.find("input").length > 0) return;
        
        let input = $("<input type='text'>").val(currentText);
        td.html(input);
        input.focus();
      
        // 입력 후 포커스 해제 시 원래 td로 변경
        input.blur(function () {
            let newText = $(this).val().trim();
            td.text(newText || currentText); // 비어있으면 원래 값 유지
          
        });

        // Enter 키 입력 시 적용
        input.keypress(function (e) {
            if (e.which === 13) {
                input.blur();
            }
        });
    });


    /*사이드 서브 메뉴 오픈*/
    $(".first-depth li").on({
        click:function(){
           var menuName = $(this).attr("class");
           var open = $(".second-depth." + menuName);
           $(".second-depth").hide();
           open.fadeIn(100);
        }
    });
    $("nav").mouseleave(function () {
        $(".second-depth").fadeOut(100)
    });


    const $table = $('#myTable');
    const $rows = $table.find('tr');

    // 첫 번째 행에서 sticky-col 클래스가 있는 셀만 추출
    const $firstRow = $rows.first();
    const $stickyCells = $firstRow.children('.sticky-col');

    let leftOffset = 0;
    const leftMap = [];

    $stickyCells.each(function (index) {
      leftMap.push(leftOffset);
      leftOffset += $(this).outerWidth();
    });

    // 모든 행에 같은 인덱스의 sticky-col에 left 지정
    $rows.each(function () {
      let stickyIndex = 0;
      $(this).children().each(function () {
        if ($(this).hasClass('sticky-col')) {
          $(this).css('left', leftMap[stickyIndex] + 'px');
          stickyIndex++;
        }
      });
    });
    
});//jQuery
    