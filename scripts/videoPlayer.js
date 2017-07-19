
var oVideoPlyer;
var oDura;//播放总时长
oVideoPlyer=document.getElementById("myvideo");
//oDura=oVideoPlyer.duration.toFixed(2);
var $oVideoControls;
$oVideoControls=$("#video-controls");
var $fullScreen;
$fullScreen=1;
var volu; //音量

//全屏
$(function controlFullScreen(){
    $(".ctrlpan-full").click(function(){
//        全屏API
        if($fullScreen==1){
            if (oVideoPlyer.requestFullscreen) {
                oVideoPlyer.requestFullscreen();
                $oVideoControls.addClass("full-screen");
            }
            else if (oVideoPlyer.mozRequestFullScreen) {
                oVideoPlyer.mozRequestFullScreen();
                $oVideoControls.addClass("full-screen");
            }
            else if (oVideoPlyer.webkitRequestFullScreen) {
                oVideoPlyer.webkitRequestFullScreen();
                $oVideoControls.addClass("full-screen");
            }
            $fullScreen=0;
        }
//        取消全屏API
        else if($fullScreen==0){
            if (document.exitFullscreen) {
                document.exitFullscreen();
                $oVideoControls.removeClass("full-screen");
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                $oVideoControls.removeClass("full-screen");
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
                $oVideoControls.removeClass("full-screen");
            }
            $fullScreen=1;
        }
    });
});
//播放暂停
var $playPause;
$playPause=1;
var $ctrlpanPlay=$(".ctrlpan-play");
$(function playPauseVideo(){
    $ctrlpanPlay.click(function(){
        if($playPause==1){
            oVideoPlyer.play();
            $ctrlpanPlay.addClass("ctrlpan-playclass");
            $playPause=0;
        }else if($playPause==0){
            oVideoPlyer.pause();
            $ctrlpanPlay.removeClass("ctrlpan-playclass");
            $playPause=1;
        }
    });
});
//静音
var $playMute;
$playMute=1;
oVideoPlyer.volume=0.5;
var $ctrlpanVolume=$(".ctrlpan-volume");
$(function muteVideo(){
    $ctrlpanVolume.click(function(){
        if($playMute==1){
            oVideoPlyer.muted=true;
            oVideoPlyer.volume=0;
            $ctrlpanVolume.addClass("ctrlpan-volumeclass");
            $playMute=0;
        }
        else if($playMute==0){
            oVideoPlyer.muted=false;
            oVideoPlyer.volume=0.5;
            $ctrlpanVolume.removeClass("ctrlpan-volumeclass");
            $playMute=1;
        }
    });
});
//停止
var $ctrlpanStop=$(".ctrlpan-stop");
$(function stopVideo(){
    $ctrlpanStop.click(function(){
        oVideoPlyer.pause();
        $ctrlpanPlay.removeClass("ctrlpan-playclass");
        $playPause=1;
        oVideoPlyer.currentTime=0;
        $("#progress-bar").css({
            "left":-3+"px"
        });
    });
});
//快进
var $fast;
$fast=1;
$(function fastForward(){
    $(".ctrlpan-quick").click(function(){
        if($fast==0.1){
            $fast=0.5;
        }
        else if($fast<3.0){
            $fast+=0.5;
        }else{
            $fast=3.0;
        }
        oVideoPlyer.playbackRate=$fast;
    });
});
//快退
$(function fastBackward(){
    $(".ctrlpan-slow").click(function(){
        if($fast>0.0&$fast!=0.1){
            $fast-=0.5;
        }
        else {
            $fast=0.1;
        }
        console.log($fast);
        oVideoPlyer.playbackRate=$fast;
    });
});
//控制音量
var $volumedProgress=$(".volumed-progress");
var $volumeBar=$(".volume-bar");
function controlVolume(){
    volu = oVideoPlyer.volume;
    var percent = Math.round(100 * oVideoPlyer.volume);
//    console.log(oVideoPlyer.volume+':percent='+percent+':volu='+volu);
    $volumedProgress.css({
            "width":percent + "%"
        });
        if(oVideoPlyer.volume >= 0){
            var xl = parseInt($(".ctrlpan-volume-progress").css("width"));
            if(oVideoPlyer.volume >0){
                $volumeBar.css({
                    "left":xl * percent / 100 - 11 + "px"
                });
            }else if(oVideoPlyer.volume ==0){
                $volumeBar.css({
                    "left":-3 + "px"
                });
            }
        }
}
var controlVolu = setInterval(controlVolume,60);
//手动调整音量
var $ctrlpanVolumeProgress=$(".ctrlpan-volume-progress");
$ctrlpanVolumeProgress.bind("mousedown",function(e){
    controlVolumeProgress(e);
});
function controlVolumeProgress(e){
    var xl = parseInt($ctrlpanVolumeProgress.css("width"));
    var x = e.pageX - $(".volumed-progress").offset().left;
    oVideoPlyer.volume=(x/xl).toFixed(2);
}
//显示时长
var vTime=0.0;
var $oDuraTime=$(".oDura-time");
var $currentTime=$(".current-time");
$(function showDuration(){
//    总时长
    oVideoPlyer.onloadedmetadata = function () {
        oDura=oVideoPlyer.duration.toFixed(2);
        $oDuraTime.text(oDura);
    }
//    播放时长
    oVideoPlyer.ontimeupdate = function () {
        vTime = oVideoPlyer.currentTime.toFixed(2);
        if(vTime<10.00){
            $currentTime.text('0'+vTime);
        }else{
            $currentTime.text(vTime);
        }
    };
});
//  控制缓存进度
var $bufferProgress=$("#buffer-progress");
function buffedProgress() {
    var bufferTime=0;
    if (oVideoPlyer.buffered && oVideoPlyer.buffered.length) {
        bufferTime = oVideoPlyer.buffered.end(0);
    }
    var percent = Math.round(100 * bufferTime / oDura);
    $bufferProgress.css({
        "width":percent+"%"
    });
}
var bufferPg= setInterval(buffedProgress,60);
//  控制播放进度
var $playedProgress=$("#played-progress");
var $videoProgress=$("#video-progress");
var $progressBar=$("#progress-bar");
function playProgress(){
    var percent = Math.round(100 * oVideoPlyer.currentTime / oDura);
//    console.log(vTime+"/"+oDura+"percent="+percent);
    $playedProgress.css({
        "width":percent+"%"
    });
    if(oVideoPlyer.currentTime > 0){
        var xl = parseInt($videoProgress.css("width"));
        if(oVideoPlyer.currentTime > 0 && percent > 1){
            $progressBar.css({
                "left":percent * xl / 100 - 19 + "px"
            });
//            console.log(percent * xl / 100 - 19 + "px");
        }
//        $(".current-time").text(temp);
    }
}
var playPg = setInterval(playProgress,60);
//手动调整播放
$videoProgress.bind("mousedown",function(e){
    controlPlayProgress(e);
});
function controlPlayProgress(e){
    var xl = parseInt($videoProgress.css("width"));
    var x = e.pageX - $playedProgress.offset().left;
    oVideoPlyer.currentTime = (x/xl*oDura).toFixed(2);
}
//控制播放结束
$(function playEnded(){
    oVideoPlyer.addEventListener("ended",function(){
        $(".ctrlpan-play").removeClass("ctrlpan-playclass");
        oVideoPlyer.pause();
        $playPause=1;
        oVideoPlyer.playbackRate=1;
    });
});
//鼠标拖动播放
$(function dragMouse(){
    var btn = document.getElementById("progress-bar");
    var bar = document.getElementById("video-progress");
    var played = document.getElementById("played-progress");
    btn.onmousedown = function(e){
        var x = e.pageX;    //鼠标点击时相对窗口的X
        var l = btn.offsetLeft;   //btn 相对父容器的左边距
//        alert("x="+x+"l="+l);
        var max = bar.offsetWidth - btn.offsetWidth;    //播放进程的最大值
//        console.log("max="+max);
        document.onmousemove = function(e){
            var thisX = e.pageX;    //鼠标移动时相对窗口的X
            var to = Math.min(max, Math.max(-3, l+(thisX - x)));
            oVideoPlyer.currentTime = (to / max) * oDura;
//            console.log("toTime="+(to / bar.offsetWidth) * oDura+"currentTime="+oVideoPlyer.currentTime);
            btn.style.left = to +"px";
            played.style.width = Math.max(0,to)+'px';
            window.getSelection()?window.getSelection().removeAllRanges():
                document.selection.empty();
        };
        document.onmouseup = new Function("this.onmousemove=null");
    };
});
//鼠标拖动控制音量
$(function(){
    var bar = document.getElementsByClassName("ctrlpan-volume-progress");
    var btn = document.getElementsByClassName("volume-bar");
    var played = document.getElementsByClassName("volumed-progress");
    btn[0].onmousedown = function(e){
        var x = e.pageX;    //鼠标点击时相对窗口的X
        var l = btn[0].offsetLeft;   //btn 相对父容器的左
        var max = bar[0].offsetWidth - btn[0].offsetWidth;
//        alert("x="+x+"l="+l+"max="+max);
        document.onmousemove = function(e){
            var thisX = e.pageX;    //鼠标移动时相对窗口的X
            var to = Math.min(max, Math.max(-3, l+(thisX - x)));
//            console.log("thisX="+thisX+"to="+to);
            oVideoPlyer.volume = to / max;

            console.log("to="+to+"max="+max);
            btn[0].style.left = to +"px";
            played[0].style.width = Math.max(0,to)+'px';
            window.getSelection()?window.getSelection().removeAllRanges():
                document.selection.empty();
        };
        document.onmouseup = new Function("this.onmousemove=null");
    }
});

//点击控制播放暂停
var controlPlay = true;
oVideoPlyer.onclick = function(){
    if(controlPlay){
        oVideoPlyer.play();
        $ctrlpanPlay.addClass("ctrlpan-playclass");
        controlPlay=false;
    }else if(controlPlay == false){
        oVideoPlyer.pause();
        $ctrlpanPlay.removeClass("ctrlpan-playclass");
        controlPlay=true;
    }
};

//连续双击进入全屏
var controlFullScroll = true;
$("#myvideo").dblclick(function(){
    if(controlFullScroll){
        if (oVideoPlyer.requestFullscreen) {
            oVideoPlyer.requestFullscreen();
            $oVideoControls.addClass("full-screen");
        }
        else if (oVideoPlyer.mozRequestFullScreen) {
            oVideoPlyer.mozRequestFullScreen();
            $oVideoControls.addClass("full-screen");
        }
        else if (oVideoPlyer.webkitRequestFullScreen) {
            oVideoPlyer.webkitRequestFullScreen();
            $oVideoControls.addClass("full-screen");
        }
        controlFullScroll = false;
    }
    else if(controlFullScroll == false){
        if (document.exitFullscreen) {
            document.exitFullscreen();
            $oVideoControls.removeClass("full-screen");
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            $oVideoControls.removeClass("full-screen");
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
            $oVideoControls.removeClass("full-screen");
        }
        controlFullScroll = true;
    }
});