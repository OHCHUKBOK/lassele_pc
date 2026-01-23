jQuery(function(){



    //편집모드
    $("._actToggle").on({
        click:function(){
            $(".tableToggle").find("input").removeAttr("disabled");
            $(".bottom").hide();
            $("._tableLayout > .top").hide();
            $("._searchGroup").hide();
            $("._bottomBtnBox").show();
        }
    });

    $("._actCancel").on({
        click:function(){
            $(".tableToggle").find("input").attr("disabled", true);
            $(".bottom").show();
            $("._tableLayout > .top").show();
            $("._searchGroup").show();
            $("._bottomBtnBox").hide();
        }
    });

        
});//jQuery