function showBg() {
    var bh = $("body").height();
    var bw = $("body").width();
    $(".hw-overlay").css({
        height:bh,
        width:2000,
        display:"block"
    });
    $(".hw-layer-wrap").show();
}
//关闭灰色 jQuery 遮罩 
function closeBg() {
    $(".hw-overlay,.hw-layer-wrap").hide();
} 