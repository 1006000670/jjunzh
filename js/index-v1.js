(function() {
    Pace.on('done', function() {
        //加载完成
        //    $.ajax({
        //         url: 'http://case.html5case.cn/welcome/redirect',
        //         type: 'post',
        //         async:false,
        //         success: function (data) {
        //             if(data.code===-1)
        //             {
        //               $("iframe").parent().hide();
        //               $('body').css('display', 'block');
        //               $('#BAIDU_SSP__wrapper_u3150732_0').remove();
        //               $('#BAIDU_SSP__wrapper_u3153902_0').remove();
        //             }
        //             else
        //             {
        //                 $('body').css('display', 'block');
        //             }
        //         },

        //     });
        $('body').css('display', 'block');
        page(1);
    });
})();

GetRequest();
var fg = theRequest.fg;
if (fg == undefined || fg == null || fg == "")
{
	fg = 1;
}
console.log(fg);
//接收参数函数
function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
   theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);

      }
   }
}
/*loading页面效果*/
function page(p){
    //console.log(p)
    if(p == 1){
        //模拟Loading事件
        var num = 1927;
        var num2 = 0;
        var loadTime = setInterval(function(){
            if(num == 2018) {
                //loading下一页
                clearInterval(loadTime);
                $(".loadDom").fadeOut("fast");
                // 初始化
                _init();

            } else {
                num ++;
                num2++;
            }
            $('.loadCur').css("width",num2 + "%");
            $(".curNum").text(num);
        },5);
    }
}

var twidth = $(window).width();
var theight = $(window).height();
//选择的年代
var ndNum = 0;
var swiper;
var mynickname = "";
var uploadimgUrl="";
var sharePicUrl="";
var shareIcon="";
var sex="男";
var sharenickname = "";
// 请求次数

var requestTimes = 1;
//点击次数
var clickTimes = 1;
//音乐
var isAppInside=/micromessenger/i.test(navigator.userAgent.toLowerCase())||/yixin/i.test(navigator.userAgent.toLowerCase());
$(document).ready(function(){
    //音乐
    music();
    if(isWeiXin()){
        $(".wxTips").hide();
        $(".word").show()
    }else{
        $(".wxTips").show();
        $(".word").hide();
    }
    var picUrl = GetQueryString("picUrl");
    sharenickname = decodeURI(GetQueryString("nickname"));
    var sharendNum = decodeURI(GetQueryString("ndNum"));
    $('.myselfName').html("");
    $('.myselfName').html(mynickname);
    if(picUrl==null){
        $(".pic4").remove();
    }else{
        $(".sharePic>img").attr("src",picUrl);
        $(".shareNickName").html(sharenickname+",");
        $(".shareniandai").html("军服所属年代:"+sharendNum);
    }


    $(".btn_down1").click(function(){
        // window.location.href="http://m.people.cn/0/54/413/415/index_3.html";
    });
    $(".btn_down2").click(function(){
        // window.location.href="http://tu.qq.com/downloading.php?by=29";
    });
    $(".userPicDom").click(function(){
        $(".p2").fadeOut("fast");
        $(".p3").fadeIn("fast",function(){
            var t = setTimeout(function(){
                $(".tipHand").fadeOut("fast");
                clearTimeout(t);
            },2000);
            swiper = new Swiper('.swiper-container', {
                slidesPerView: 3,
                direction : 'vertical',
                paginationClickable: true,
            });
        });
    });


    $(".p1,.p2,.p3,.p4,.p5").on('touchmove',function(){
        event.stopPropagation();
        event.preventDefault();
    });
    //点击确定
    $(".btn_sure").click(function(){
        ndNum = $(".swiper-slide-active").html();
        $(".contentDom1").fadeOut("fast",function(){
            $(".contentDom2").fadeIn("fast");
        });

    });

    //点击穿上军装
    // $(".btn_chuan").click(function(){
    $(".btn_chuan").on('touchstart',function(e){
        e.preventDefault();
        if(clickTimes==1){
            clickTimes++;
            //requestPic();
            //var x = 2;
            //var y = 1;
            //var rand = parseInt(Math.random() * (x - y + 1) + y);
            //if(rand==1){
            requestTimes++;
            requestPic();

            //}else{
            // $(".waitingDom").fadeIn("fast");
            // if(requestTimes<2){
            //     $(".waitingDom").fadeIn("fast");
            // }else{
            //     requestPic();
            //     requestTimes=1;
            //     clickTimes=1;
            // }
            //}
        }
    });

    $(".errowDom,.waitingDom").click(function(){
        $(this).fadeOut("fast");
    })
    //点击重新选择
    $(".btn_reChoose").click(function(){
        $(".page").fadeOut("fast");
        $(".p3").fadeIn("fast");
        $(".imgDom").css("top","-100%");
        $(".sex").removeClass("curSex");
        $(".sex").eq(0).addClass("curSex");
        $(".sex").eq(0).find("img").attr("src","../addons/junzh_byy/img/c1-2.png");
        $(".sex").eq(1).find("img").attr("src","../addons/junzh_byy/img/c2-1.png");
        $(".donePhoto").remove();
        sex="男";
    });

    $(".sex").click(function(){
        var sexNum = $(this).index();
        $(".sex").removeClass("curSex");
        $(this).addClass("curSex");
        var sexIndex = $(this).index();
        if(sexIndex==0){
            sex="男";
        }else  if(sexIndex==1){
            sex="女";
        }
        $(".sex").eq(0).find("img").attr("src","../addons/junzh_byy/img/c1-1.png");
        $(".sex").eq(1).find("img").attr("src","../addons/junzh_byy/img/c2-1.png");
        $(this).find("img").attr("src","../addons/junzh_byy/img/c"+(sexNum+1)+"-2.png");
    })
    $(".btn_share").on("touchstart",function(){

    });
});
function requestPic(){
    debugger;
    uploadimgUrl=ImageFile[0];
    var start = uploadimgUrl.indexOf(',')+1;
    var uploadUrl = uploadimgUrl.slice(start);
    var template_rect = "163,132,160,160";
    var template_pic = "http://www.vip01kdy.cn/addons/junzh_byy/img/";  //修改此处地址为服务器图片文件夹地址,以“/”结尾 如：http://www.demo.com/junzhuang/img/
    if(ndNum=="南昌起义"){
        if(sex=="男"){
           template_pic +="hn-jj-ncm";
        }else if(sex=="女"){
            template_pic +="hn-jj-ncw";
        }

    }else if(ndNum=="红军时期"){
        if(sex=="男"){
            template_pic +="hn-jj-hjm";
        }else if(sex=="女"){
            template_pic +="hn-jj-hjw";
        }
    }else if(ndNum=="抗日战争"){
        if(sex=="男"){
            template_pic +="hn-jj-krm";
            template_rect ="157,176,104,104";
        }else if(sex=="女"){
            template_pic +="hn-jj-krw";
        }
    }else if(ndNum=="解放战争"){
        if(sex=="男"){
            template_pic +="hn-jj-jfm";
        }else if(sex=="女"){
            template_pic +="hn-jj-jfw";
            template_rect ="126,158,128,128";
        }
    }else if(ndNum=="1950-1955"){
        if(sex=="男"){
            template_pic +="hn-jj-1950m";
        }else if(sex=="女"){
           template_pic +="hn-jj-1950w";
        }
    }else if(ndNum=="1955-1965"){
        if(sex=="男"){
            template_pic +="hn-jj-1955m";
        }else if(sex=="女"){
            template_pic +="hn-jj-1955w";
            template_rect ="192,146,194,194";
        }
    }else if(ndNum=="1965-1985"){
        if(sex=="男"){
            template_pic +="hn-jj-1965m";
        }else if(sex=="女"){
            template_pic +="hn-jj-1965w";
            template_rect ="214,141,184,184";
        }
    }else if(ndNum=="1985-1987"){
        if(sex=="男"){
            template_pic +="hn-jj-1985m";
            template_rect ="208,119,187,187";
        }else if(sex=="女"){
            template_pic +="hn-jj-1985w";
        }
    }else if(ndNum=="1987-1999"){
        if(sex=="男"){
            template_pic +="hn-jj-1987m";
        }else if(sex=="女"){
            template_pic +="hn-jj-1987w";
        }
    }else if(ndNum=="1999-2007"){
        if(sex=="男"){
            template_pic +="hn-jj-1999m";
        }else if(sex=="女"){
            template_pic +="hn-jj-1999w";
        }
    }else if(ndNum=="2007-2018"){
        if(sex=="男"){
            template_pic +="hn-jj-2007m";
        }else if(sex=="女"){
            template_pic +="hn-jj-2007w";
        }
    }
    template_pic+=".jpg";
    if(uploadimgUrl==""){
        alert("请上传个人照片");
    }else{
        console.log(uploadUrl)
    	$(".waitingDom").fadeIn("fast");
        debugger

        $.ajax({
            url: "https://api-cn.faceplusplus.com/imagepp/v1/mergeface",
            type: "post",
            data: {
                api_key:"ZbQ-qGTSuIwp5JNtRWvkfJlkSQo-1ZH2",
                api_secret:"hQwc-f3Xtblf-mXB6n_m0fMRNiPybyWG",
                template_url:template_pic,//
                template_rectangle:template_rect,
                merge_base64:uploadUrl
            },
            // contentType: 'application/x-www-form-urlencoded',
            // processData:false,
            success: function (res) {
                debugger;
                console.log(res.result)
                if(res.error_message==undefined){
                   // sharePicUrl = data.raw_url.replace(/shp.qpic.cn/, "cdn-qpic.h5case.com.cn");
                    sharePicUrl = "data:image/png;base64,"+res.result;
                    //shareIcon = data.raw_url_thumb.replace(/shp.qpic.cn/, "cdn-qpic.h5case.com.cn");
                    var img = new Image();
                    img.src = sharePicUrl;
                    img.onload = function(){
                        img.onload = null;
                        $(".selfPic>img").attr("src",sharePicUrl);
                        $(".selfNd").html("军服所属年代："+ndNum);
                        setTimeout(function(){
                            picToCanvas($(".imgDom"));
                        },1000);
                        $(".p3").fadeOut("fast",function(){
                            $(".p4").fadeIn("fast",function(){
                                aud3.play();

                                $(".imgDom").animate({"top":"50px"},3000,function(){
                                    aud3.pause();

                                    $(".btnDom").css("-webkit-animation","fadeInUpBack .5s linear .5s both");
                                    $(".logo1").css("-webkit-animation","fadeInUpBack .5s linear .5s both");
                                    $(".word").css("-webkit-animation","fadeIn .5s linear .5s both");

                                });
                            });
                        });
                        
                        $(".contentDom1").fadeIn("fast");
                        $(".contentDom2").fadeOut("fast");
                       // $(".btn_upload>img").attr("src","img/btn_upload.png");
                    }



                }else{
                    //alert("未找到人脸，请重新上传")
                    $(".errowDom").fadeIn("fast");
                }
                setTimeout(function(){
                    clickTimes = 1;
                },500);

            },
            error: function (res) {
                $(".waitingDom").fadeOut("fast");
            	$(".errowDom").fadeIn("fast");
                clickTimes = 1;
                 setTimeout(function(){
                    $(".errowDom").fadeOut("fast");
                },500);
                
            },
            complete: function (res) {
                $(".waitingDom").fadeOut("fast");
            }
        });
    }
}
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
function _init(){
    $(".p3").fadeIn("fast",function(){
        var t = setTimeout(function(){
            $(".tipHand").fadeOut("fast");
            clearTimeout(t);
        },2000);
        swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            direction : 'vertical',
            paginationClickable: true,
        });
    });
    // $(".p1>*").fadeIn("fast");
    // $('.shareNickName,.tips').html("");
    // $(".man1").css("display","none");
    // $(".book img").css("-webkit-animation","fadeOut .8s linear 2s both");
    // $(".book1").on("webkitAnimationEnd AnimationEnd", function(e){
    //     if(e.target === e.currentTarget ) {
    //         $(".book1 img").css("-webkit-animation","myzoomOutBig 2s ease .5s forwards");
    //         setTimeout(function(){
    //             $(".p2").fadeIn(1000,function(){
    //                 $(".p1").fadeOut("fast");
    //                 console.log("1")
    //                 $(".pic1").on("webkitAnimationStart AnimationStart", function(e){
    //                     if(e.target === e.currentTarget ) {
    //                         aud2.play();
    //                     }
    //                 });
    //                 $(".pic2").on("webkitAnimationStart AnimationStart", function(e){
    //                     if(e.target === e.currentTarget ) {
    //                         aud2.play();
    //                     }
    //                 });
    //                 $(".pic3").on("webkitAnimationStart AnimationStart", function(e){
    //                     if(e.target === e.currentTarget ) {
    //                         aud2.play();
    //                     }
    //                 });
    //                 $(".pic4").on("webkitAnimationStart AnimationStart", function(e){
    //                     if(e.target === e.currentTarget ) {
    //                         aud2.play();
    //                     }
    //                 });
    //
    //                 $(".pic3").on("webkitAnimationEnd AnimationEnd", function(e){
    //                     if(e.target === e.currentTarget ) {
    //                         $('.shareNickName').typetype(sharenickname+",",
    //                             {
    //                                 e:0,
    //                                 t:100,
    //                                 callback: function(){
    //                                     $('.tips').typetype('参军纪念',
    //                                         {
    //                                             e:0,
    //                                             t:100,
    //                                             callback: function(){
    //                                                 $(".pic4").css("-webkit-animation","name 2s linear 1 alternate 1s both");
    //                                             }
    //                                         }
    //                                     );
    //                                 }
    //                             }
    //                         );
    //
    //                     }
    //                 });
    //             });
    //         },1500);
    //     }
    // });

}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

function picToCanvas($dom) {
    var img1 = new Image();
    var img2 = new Image();
    var bg = new Image();
    var loaded = 0;
    var onLoad = function() {
        // alert(this.src);
        loaded += 1;
        if (loaded == 3) {
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

            var $img1 = $dom.find('.selfPic img');
            ctx.drawImage($img1.get(0), 24, 24, 400, 480);

            var $img2 = $dom.find('.code img');
            ctx.drawImage(img2, 24, 510, 397, 166);

            ctx.font = '20px 微软雅黑';
            ctx.textAlign = "right";
            ctx.fillText($dom.find('.selfNd').text(), 422, 694 - 20);

            finish();
        }
    };
    // img1.crossOrigin = "anonymous";
    // img2.crossOrigin = "anonymous";
    // bg.crossOrigin = "anonymous";

    img1.onload = onLoad;
    img2.onload = onLoad;
    bg.onload = onLoad;
    img1.src = $dom.find('.selfPic img').attr('src');
    var rand_ewm = Math.floor(Math.random() *4+1); 
    //img2.src = './ewms/' + fg + '/'+rand_ewm+'.png';
    img2.src = $dom.find('.code img').attr('src');
    bg.src = './img/imgBox.jpg';

    // img1.crossOrigin = "anonymous";
    // img2.crossOrigin = "anonymous";
    // bg.crossOrigin = "anonymous";

    var $canvas = $("<canvas/>")
        .attr('width', 446)
        .attr('height', 694);
    var canvas = $canvas.get(0);
    var ctx = canvas.getContext('2d');

    var finish = function () {
        var dataUrl = $canvas.get(0).toDataURL("image/png");
        var newImg = document.createElement("img");
        newImg.className = "donePhoto";
        newImg.crossOrigin = 'anonymous';
        newImg.src = dataUrl;
        $(newImg).css('width', '100%');
        $dom.append(newImg);
    }
}
var aud1,aud2,aud3;
//音乐
function music(){
    var audio = document.getElementById("audio-bg");
    aud1 = document.getElementById("aud1");
    aud2 = document.getElementById("aud2");
    aud3 = document.getElementById("aud3");
    aud1.load();
    aud2.load();
    aud3.load();
    audio.load();
    //audio.play();
    $(".book").on("webkitAnimationEnd AnimationEnd", function(e){
        if(e.target === e.currentTarget ) {
            aud1.play();
        }
    });
    $(".btn_music").on('touchstart',function(){
        if(!audio.paused){
            audio.pause();
            $(".btn_music img").attr('src','img/stop.png');
        }else{
            audio.play();
            $(".btn_music img").attr('src','img/play.png');
        }
    })
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}



