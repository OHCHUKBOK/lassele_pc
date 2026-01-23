jQuery(function(){
  
    //팝업 오픈 시 body 스크롤 막기
	function scroll_off() {$("body").css("overflow","hidden");}
	function scroll_on() {$("body").css("overflow","auto");}

    //팝업 공통 닫기
	$("._actClose, ._actdim").on("click", function () {
        var modal = $(this).parents("._popup");
        var alertPop = $(this).parents("._alertPop");
        modal.fadeOut(100, function () {
            modal.find(".popBox").css({
                left: "0",
                top: "0"
            });
        });
        alertPop.fadeOut(100); 
        scroll_on()
    });
    
    //팝업 공통 열기
	$("._actPOP").on({
		click:function(){
			var showPop = $(this).find("span").attr("class");
            var popUp = $("._popup." + showPop);
            var alertPopUp = $("._alertPop." + showPop);
            alertPopUp.fadeIn(100);
			popUp.fadeIn(100);
            popUp.css("display","flex");
			scroll_off();
		}
	});
    //공통 on/off 
    $("._actOnOff > *").on("click", function () {
        const $parent = $(this).parent("._actOnOff");

        // 테이블 tbody._actOnOff 인 경우만 rowspan 그룹 on 처리
        if ($parent.is("tbody")) {
            const rows   = $parent.children("tr");
            const $tr    = $(this);
            const idx    = rows.index($tr);   // tbody 내부 기준 index

            let $repTr = $tr;
            let span   = 1;

            //  대표 tr과 rowspan 찾기
            for (let i = idx; i >= 0; i--) {
                const $row = rows.eq(i);
                const $rowspanCell = $row.find("td[rowspan]").first();
                if ($rowspanCell.length) {
                    const val   = parseInt($rowspanCell.attr("rowspan"), 10);
                    const start = i;
                    const end   = start + val - 1;
                    if (idx >= start && idx <= end) {
                        $repTr = $row;
                        span   = val;
                    }
                    break;
                }
            }
            rows.removeClass("on");
            $repTr.addClass("on");
            for (let j = 1; j < span; j++) {
                $repTr.nextAll("tr").eq(j - 1).addClass("on");
            }
            return;
        }
        //table 외 경우
        $parent.children().removeClass("on");
        $(this).addClass("on");
    });



    //tab Open
    $("._actTab li").on({
        click:function(){
            var actionTab = $(this).index();
            console.log(actionTab);
            $(this).parents("._actTab").children("li").removeClass("on");
            $(this).addClass("on");
            var actCon = $(this).parents("._actTab").siblings("._actCon");
            actCon.children("li").removeClass("on");
            actCon.children("li").eq(actionTab).addClass("on");
        }
    });

    //사이드 서브 메뉴 오픈
    /*
    $(".first-depth li").on({
        click:function(){
            var menuName = $(this).attr("class");
            var openMenu = $(".second-depth." + menuName);
            if (!openMenu.is(":visible")) {
                $(".second-depth").hide();
                openMenu.show();
            } 
        }
    });
    $("nav").mouseleave(function () {
        $(".second-depth").fadeOut(100)
    });*/
    $(".first-depth li").on("mouseenter", function () {
        const el = document.activeElement;
        if (
            el &&
            el.tagName === "INPUT" &&
            (
                el.type === "date" ||
                el.type === "month" ||
                el.type === "time" ||
                el.type === "datetime-local" ||
                el.type === "week"
            )
        ) {el.blur(); }

        var menuName = $(this).attr("class");
        var openMenu = $(".second-depth." + menuName);
        if (!openMenu.is(":visible")) {
            $(".second-depth").hide();
            openMenu.show();
        } 
    });
    $("nav").on("mouseleave", function () {
        $(".second-depth").stop(true, true).fadeOut(100); // 모든 서브 메뉴 숨기기
    });

    //팝업 드레그
    $("._popup .popBox").draggable({
        handle: ".head" 
    });

    /*아코디언*/
    $("._actAcco .acoTitBtn").on({
		click:function(){
            var actAcco = $(this).parents("._actAcco");
			if(actAcco.hasClass("on")){
                actAcco.removeClass("on");
                actAcco.find(".acoCon").slideUp(200);
            }else{
                actAcco.addClass("on");
                actAcco.find(".acoCon").slideDown(200);
            }
		}	
	});
    
    //폴더구조
    $("._structure .folder button").on({
        click:function(){
            var folder = $(this).parents(".folder");
            if(folder.hasClass("open")){
                folder.removeClass("open");
            }else{
                folder.addClass("open");
            }
        }	
    });
    $("._structure .folder span").on({
        click:function(){
            var folder = $(this).closest(".folder"); 
            if (folder.hasClass("on")) {return; }
            $("._structure .folder").removeClass("on");
            $("._structure .item.set").removeClass("on");
            folder.addClass("on");
        }	
    });
    $("._structure .item.set").on({
        click:function(){
            if ($(this).hasClass("on")) {return;}
            $("._structure .item.set").removeClass("on");
            $("._structure .folder").removeClass("on");
            $(this).addClass("on");
        }	
    });

    // 파일 첨부
    let fileURL = "";
    $("._fileAdd ._uploadBtn").on("click", function () {
        $("._fileAdd input").click();
    });
    // 파일 선택 시 파일명,삭제버튼 노출
    $("._fileAdd input").on("change", function () {
        if (this.files.length) {
            fileURL = URL.createObjectURL(this.files[0]); 
            let fileName = this.files[0].name;
            $("._fileAdd .fileName").text(fileName);
            $("._fileAdd .fileName").css("cursor", "pointer"); 
            $("._fileAdd ._delBtn").show();
        } else {
            $("._fileAdd .fileName").text("");
            $("._fileAdd ._delBtn").hide();
        }
    });
    // 파일명 클릭 시 파일 다운로드
    $("._fileAdd .fileName").on("click", function () {
        if (fileURL) {
            let a = document.createElement('a');
            a.href = fileURL;
            a.download = $(".fileName").text();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a); 
        }
    });
    // 삭제 버튼 클릭 시 파일명 및 입력 필드 초기화
    $("._fileAdd ._delBtn").on("click", function () {
        $("._fileAdd input").val("");
        $("._fileAdd .fileName").text("");
        $("._fileAdd ._delBtn").hide();
        fileURL = "";
    });


    //테이블 가로 스크롤 고정 col + addClass fixScroll 
    function updateStickyTable() {
        var FixTable = $('.leftFix ._table');
        if (FixTable.length === 0) return;
        var FixRow = FixTable.find('tr');
        var firstRow = FixRow.first();
        var stickyCells = firstRow.children('.fix');
        var leftOffset = 0;
        var leftMap = [];
        stickyCells.each(function () {
            leftMap.push(leftOffset);
            leftOffset += $(this).outerWidth();
        });
        FixRow.each(function () {
            let stickyIndex = 0;
            var FixCells = $(this).children();
            FixCells.filter('.fix').last().addClass("last");
    
            FixCells.each(function () {
                if ($(this).hasClass('fix')) {
                    $(this).css({
                        left: leftMap[stickyIndex] + 'px',
                        position: 'sticky',
                        zIndex: 2
                    });
                    stickyIndex++;
                }
            });
        });
        // 스크롤 여부 감지해서 .fixScroll 클래스 토글
        $('.leftFix').each(function () {
            var $wrapper = $(this)[0];
            if ($wrapper.scrollWidth > $wrapper.clientWidth) {
                $(this).addClass('fixScroll');
            } else {
                $(this).removeClass('fixScroll');
            }
        });
    }
    //리사이즈 - 테이블 가로 스크롤 고정
    $(window).on('load resize', function () {
        updateStickyTable();
    });

    //프린트영역 설정
    $('._actPrint').on('click', function () {
        window.print();
    });

    //input date placeholder 스타일
    const inputDate = $('input[type="date"].basic');
    const inputDefaultValue = inputDate.val();
    
    inputDate.on('change', function () {
    const datecurrentValue = $(this).val();
   
    if (!datecurrentValue) {
        $(this).css({color: '#cccccc'});
    } else if (datecurrentValue !== inputDefaultValue) {
        $(this).css({color: '#000'});
    } else {$(this).css({color: '#000'});}
    });
   
    if (!inputDate.val()) {
        inputDate.css('color', '#cccccc');
    }
    

    //table rospan grooup hover effet
    $('.tableHover').on('mouseenter', 'tr', function () {
        const hoverThis = $(this);
        const hoverTable = hoverThis.closest('table');
        const hoverTbody = hoverTable.find('tbody');
        const hoverIndex = hoverThis.index();

        const hoverRowspanTds = hoverThis.find('td[rowspan]');
        if (hoverRowspanTds.length > 0) {
        const span = parseInt(hoverRowspanTds.attr('rowspan'), 10);
        for (let i = 0; i < span; i++) {
            hoverTbody.find('tr').eq(hoverIndex + i).addClass('hover-group');
        }
        } else {
            hoverThis.addClass('hover-group');
        }
    });

    $('.tableHover').on('mouseleave', 'tr', function () {
        $(this).closest('table').find('tbody tr').removeClass('hover-group');
    });


    // 사진 업로드 공통
    $('._actImgEnlarge .imgAddBtn').off('click').on('click', function () {
        $(this).siblings('input[type="file"]').trigger('click');
    });

    $('._imgUploadBox input[type="file"]').on('change', function () {
        const $input = $(this);
        const $box = $input.closest('._imgUploadBox');
        const $preview = $box.find('.previewImgBox');
        const files = Array.from(this.files);
        const currentCount = $preview.find('.thumb').length;
        const remaining = 5 - currentCount;

        if (files.length > remaining) {
            alert('최대 5개까지 첨부할 수 있습니다.');
        }

        files.slice(0, remaining).forEach(file => {
            const reader = new FileReader();

            reader.onload = function (e) {
                const $thumb = $(`
                    <div class="thumb">
                        <button class="_delBtn">삭제</button>
                        <img src="${e.target.result}" alt="preview">
                    </div>
                `);
                $preview.append($thumb);
            };
            reader.readAsDataURL(file);
        });
        $input.val('');
    });

    // 썸네일 삭제
    $('._imgUploadBox .previewImgBox').on('click', '._delBtn', function (e) {
        e.stopPropagation();
        $(this).closest('.thumb').remove();
    });
    /*
    // 썸네일 클릭 시 확대보기 팝업 오픈
    $('._actImgEnlarge .previewImgBox').on('click', '.thumb', function (e) {
        // 삭제 버튼 클릭이면 확대 안 함
        if ($(e.target).closest('._delBtn').length) return;
        const $clickedThumb = $(this);
        const $thumbBox = $clickedThumb.closest('.previewImgBox');
        const $thumbImgs = $thumbBox.find('.thumb img');
        const $popup = $('._popup.previewImg');
        const $bigImg = $popup.find('.previewImgBox img');
        const $list = $popup.find('.imgList');
        const src = $clickedThumb.find('img').attr('src');
        $bigImg.attr('src', src);
        $list.empty();
        // 하단 썸네일 다시 구성
        $thumbImgs.each(function () {
            const thumbSrc = $(this).attr('src');
            const $li = $('<li><img src="' + thumbSrc + '" alt=""></li>');
            if (thumbSrc === src) $li.addClass('on');
            $list.append($li);
        });
        // 팝업 open
        $popup.css('display', 'flex');
    });

    // 썸네일 클릭 시 타켓 메인 이미지 변경
    $('._popup.previewImg .imgList').on('click', 'li img', function () {
        const src = $(this).attr('src');
        const $popup = $('._popup.previewImg');
        const $bigImg = $popup.find('.previewImgBox img');
        $bigImg.attr('src', src);
        $(this).closest('ul').find('li').removeClass('on');
        $(this).parent('li').addClass('on');
    });
    */
});//jQuery
