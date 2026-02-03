$(function () {
    const $tree = $("._folderStructure");
    $tree.on("click", "button", function (e) {
        e.preventDefault();
        const $btn = $(this);
        const $li = $btn.closest("li");
        const depth = $li.parents("ul").length;
        if ($btn.hasClass("on")) {return;}
        // 같은 depth의 기존 on 제거
        $tree.find("button.on").each(function () {
            const onDepth = $(this).closest("li").parents("ul").length;
            if (onDepth === depth) {
                $(this).removeClass("on");
            }
        });
        // 상위 depth를 새로 선택한 경우만 하위 on 제거
        $tree.find("button.on").each(function () {
            const onDepth = $(this).closest("li").parents("ul").length;
            if (onDepth > depth) {
                $(this).removeClass("on");
            }
        });
        // 현재 버튼 on
        $btn.addClass("on");
    });
});

