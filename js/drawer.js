/**
 * Created by zayy on 2016/7/25.
 */
var option = document.getElementById('option-button'),
    s_board = document.getElementById('sketch'),
    ctx = s_board.getContext('2d'),//创建2d画布
    li = option.children,
    o_button = li[0].children[0],
    o_save = li[0].children[1],
    o_redo = li[0].children[3],
    o_undo = li[0].children[2],

    o_img1 = li[1].children,
    o_img2 = li[2].children,
/*
    o_line = li[3].children,
    o_color = li[3].children,*/
    imgs = [],
    history_arr=[],
    imgsSign = null,
    colsSign = 'rgb(0,0,0)',
    isMouseDown = false,
    downX = 0,
    downY = 0,
    poly = 3;

//redo
var cStep = -1;
var ctx_width  = $("#sketch").attr("width");
var ctx_height  = $("#sketch").attr("height");
var select_line = document.getElementById("s-line");

imgs = Array.prototype.concat.apply(imgs, o_img1);
imgs = Array.prototype.concat.apply(imgs, o_img2);

ctx.strokeStyle = 'rgb(0,0,0)';
ctx.fillStyle = 'rgb(0,0,0)';
ctx.lineWidth = 1;
ctx.lineCap = "round";
ctx.lineJoin="round";

function select(){
    ctx.lineWidth = select_line.options[select_line.selectedIndex].value;
}
option.onclick = function(event) {
    var e = window.event || event,   //所有浏览器下兼容，获取事件
        tag = e.srcElement || e.target, //所有浏览器下兼容，获取产生事件的元素
        parent = tag.parentNode,
        i = 0,
        len = 0;

    if (tag == o_button) {
        ctx.clearRect(0, 0, ctx_width, ctx_height)
    }
    else if (tag == o_redo) {
        redo();
    }
    else if (tag == o_undo) {
        Undo();
    }
    else if (tag == o_save) {
        saveItAsImage();
    }
    else if (parent == li[1] || parent == li[2]) {
        for (i = 0, len = imgs.length; i < len; i++) {
            if (tag == imgs[i]) //选中的工具
            {
                imgsSign = tag.getAttribute('data-f'); //返回data-f的值

                if (imgsSign == 'arc-stroke'||imgsSign == 'arc-fill')//绘制多边形
                {
                    tag.className = 'arc_on';
                }
                else{
                    tag.className = 'on';
                }

                if (imgsSign == 'poly')//绘制多边形
                {
                    var scale = window.prompt('您想绘制几边形？', '3');
                    poly = parseInt(scale); //转int
                    if (isNaN(poly) || poly < 3) {
                        poly = 3;
                    }
                }
            }
            else {
                imgs[i].className = '';
            }
        }
    }/*
    else if (parent == li[3]) {

        for (i = 0, len = o_line.length; i < len; i++) {
            if (tag == o_line[i]) {
                tag.className = 'on';
                ctx.lineWidth = parseInt(tag.getAttribute('data-l'));
            }
            else {
                o_line[i].className = '';
            }
        }

    }
        /*
    else if (parent == li[4]) {
        for (i = 0, len = o_color.length; i < len; i++) {
            if (tag == o_color[i]) {
                tag.style.border = '1px solid white';
                colsSign = tag.getAttribute('data-c');
                ctx.fillStyle = colsSign;
                ctx.strokeStyle = colsSign;
            }
            else {
                o_color[i].style.border = '1px solid #dcdcdc';
            }
        }
    }*/

};


s_board.onmousedown = function(event){
    var e = window.event || event,
        ex = e.pageX,
        ey = e.pageY,
        startX = ex - this.offsetLeft,
        startY = ey - this.offsetTop - this.offsetParent.offsetTop;
    isMouseDown = true;
    ctx.beginPath();
    if(imgsSign == 'brush' || imgsSign == 'line'){
        ctx.moveTo(startX, startY);
        ctx.strokeStyle = colsSign;
    }
    else if(imgsSign == 'eraser'){
        ctx.moveTo(startX, startY);
        ctx.strokeStyle = 'rgb(255,255,255)';

    }
    else if(imgsSign == 'arc-stroke' || imgsSign == 'arc-fill'|| imgsSign == 'rect-stroke' || imgsSign == 'rect-fill' || imgsSign == 'poly'){
        downX = startX;
        downY = startY;
    }
    else if(imgsSign == 'paint'){
        ctx.fillRect(0,0,600,600);
    }
    else if(imgsSign == 'straw'){
        var imgData = ctx.getImageData(startX,startY,1,1);
        ctx.strokeStyle = 'rgb(' + imgData.data[0] + ',' + imgData.data[1] + ',' + imgData.data[2] + ')';
        ctx.fillStyle = 'rgb(' + imgData.data[0] + ',' + imgData.data[1] + ',' + imgData.data[2] + ')';

    }/*
    else if(imgsSign == 'text'){
        var text = window.prompt('请输入文字信息','');
        if(text){
            ctx.font = '300% 微软雅黑';
            ctx.fillText(text,startX,startY);
        }
        ctx.closePath();
    }*/
};

s_board.onmousemove = function(event){
    var e = window.event || event,
        ex = e.pageX,
        ey = e.pageY,
        lineX = ex - this.offsetLeft,
        lineY = ey - this.offsetTop-this.offsetParent.offsetTop;

    if(imgsSign == 'brush' || imgsSign == 'eraser'){
        if(isMouseDown){
            ctx.lineTo(lineX, lineY);
            ctx.stroke();
        }
    }

};

s_board.onmouseup = function(event){
    var e = window.event || event,
        ex = e.pageX,
        ey = e.pageY,
        endX = ex - this.offsetLeft,
        endY = ey - this.offsetTop;
    if(imgsSign == 'line' ){
        if(isMouseDown){
            ctx.lineTo(endX,endY);
            ctx.stroke();
        }
    }
    else if(imgsSign == 'arc-stroke' || imgsSign == 'arc-fill'){
        if(isMouseDown){
            ctx.arc(downX, downY, Math.sqrt(Math.pow(endX - downX, 2) + Math.pow(endY - downY, 2)), 0, 2 * Math.PI)
            imgsSign == 'arc-stroke' ? ctx.stroke() : ctx.fill();

        }
    }
    else if(imgsSign == 'rect-stroke' || imgsSign == 'rect-fill'){
        if(isMouseDown){
            ctx.rect(downX,downY,endX-downX,endY-downY);
            imgsSign == 'rect-stroke' ? ctx.stroke():ctx.fill();

        }
    }
    else if(imgsSign == 'poly') {
        if (isMouseDown) {
            var radius = Math.sqrt(Math.pow(endX - downX, 2) + Math.pow(endY - downY, 2)),
                i = 1,
                angle1 = 2 * Math.PI / poly,
                angle2 = poly % 2 == 0 ? Math.PI / poly : 0;
            ctx.moveTo(downX + radius * Math.sin(angle2), downY - radius * Math.cos(angle2));
            for (; i <= poly; i++) {
                angle2 += angle1;
                ctx.lineTo(downX + radius * Math.sin(angle2), downY - radius * Math.cos(angle2));
            }
            ctx.stroke();
        }
    }
    isMouseDown = false;
    historyPush();
    ctx.closePath();
};



function historyPush()
{
    cStep++;
    if (cStep < history_arr.length)
    {
        history_arr.length = cStep;

    }

    history_arr.push($("#sketch").get(0).toDataURL());
}
/**
 * function: undo
 */

function Undo()
{
    if (cStep >= 0)
    {
        ctx.clearRect(0, 0, ctx_width, ctx_height);
        cStep--;
        var tempImage = new Image();
        tempImage.src = history_arr[cStep];
        tempImage.onload = function () { ctx.drawImage(tempImage, 0, 0);};
    }

}
/**
 * function:  redo
 */

function redo()
{
    if (cStep < history_arr.length-1)
    {
        ctx.clearRect(0, 0, ctx_width, ctx_height);
        cStep++;
        var tempImage = new Image();
        tempImage.src = history_arr[cStep];
        tempImage.onload = function () { ctx.drawImage(tempImage, 0, 0); };
    }
}



//Save
function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}
//save
function saveItAsImage()
{
    var image = $("#sketch").get(0).toDataURL("image/png").replace("image/png", "image/octet-stream");
    //locally save
    window.location.href=image;
}





















