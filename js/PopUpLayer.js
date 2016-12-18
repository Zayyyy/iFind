/**
 * Created by zayy on 2016/8/15.
 */
//显示灰色 jQuery 遮罩层

function showBg(obj) {
    var bh = $("body").height();
    var bw = $("body").width();
    $(document.body).css({
        "overflow-y":"hidden"
    });

   /* var imgUrl=$(obj).find('img').attr('src');
    var imgHTML='<img src="'+imgUrl+'" class="preView-img">' ;
    $(".view-container").append(imgHTML);*/
    $("#fullbg").css({
        height:bh,
        width:bw,
        display:"block"
    });
    $("#dialog").show();
    init();
    animate();

}
//关闭灰色 jQuery 遮罩
function closeBg() {
    $("#fullbg,#dialog").hide();
    var imgHTML = $("#view-container").find('div');
    $(imgHTML).remove();
    $(document.body).css({
        "overflow-y":"auto"
    });
}