$(document).ready(function () {
  var $page = $("#wrapper");
  var $container = $(".container");
  var tl = new TimelineLite();
  var speed = 0.2;
  // when each page is loaded
  tl.fromTo(
    $(".animationDiv__box:eq(0)"),
    speed, {
      autoAlpha: 0,
      right: "0%",
      top: "0%"
    }, {
      autoAlpha: 1,
      backgroundColor: "black",
      height: "100%",
      width: "25%"
    }
  );
  tl.fromTo(
    $(".animationDiv__box:eq(1)"),
    speed, {
      autoAlpha: 0,
      right: "25%",
      bottom: "0%"
    }, {
      autoAlpha: 1,
      backgroundColor: "black",
      height: "100%",
      width: "25%"
    }
  );
  tl.fromTo(
    $(".animationDiv__box:eq(2)"),
    speed, {
      autoAlpha: 0,
      right: "50%"
    }, {
      autoAlpha: 1,
      backgroundColor: "black",
      left: "25%",
      height: "100%",
      width: "25%"
    }
  );
  tl.fromTo(
    $(".animationDiv__box:eq(3)"),
    speed, {
      autoAlpha: 0,
      left: "0%",
      bottom: "0%"
    }, {
      autoAlpha: 1,
      backgroundColor: "black",
      height: "100%",
      width: "25%"
    }
  );
  // flashing
  tl.to($(".animationDiv__box:eq(0)"), 0.1, {
    backgroundColor: "#2D2D2D",
    repeat: -1,
    yoyo: true,
    epeatDelay: 0.1
  });
  tl.to($(".animationDiv__box:eq(1)"), 0.1, {
    backgroundColor: "#2D2D2D",
    repeat: -1,
    yoyo: true,
    epeatDelay: 0.1
  });
  tl.to($(".animationDiv__box:eq(2)"), 0.1, {
    backgroundColor: "#2D2D2D",
    repeat: -1,
    yoyo: true,
    epeatDelay: 0.1
  });
  tl.to($(".animationDiv__box:eq(3)"), 0.1, {
    backgroundColor: "#2D2D2D",
    repeat: -1,
    yoyo: true,
    epeatDelay: 0.1
  });
  tl.to($(".animationDiv__box"), 1, {
    autoAlpha: 0
  });
  // 文字表示
  tl.to($(".contents"), 1, {
    autoAlpha: 1,
    // 終了と同時にアニメーションdivを消す
    onComplete: function () {
      $(".animationDiv__box").remove();
    }
  });

  (options = {
    // onStart = when you click the page
    prefetch: true,
    onStart: {
      duration: 120,
      render: function ($container) {
        console.log("1");
        tl.to($(".contents"), 1, {
          autoAlpha: 0
        });
      }
    },
    onReady: {
      // onReady = when the new page open
      //一度ページは読み込まれる
      duration: 1200,
      render: function ($container, $newContent) {
        $container.html($newContent);
        console.log("2");
      }
    },
    onAfter: function ($container) {
      console.log("3");
    }
  }),
  (smoothState = $page.smoothState(options).data("smoothState"));
  //
  //
  // rotate animation
  // var logoRotate = $('.contents__logo')
  // TweenMax.to(logoRotate, 30, {
  //     rotation: "360",
  //     ease: Linear.easeNone,
  //     repeat: -1
  // });
  //
  //
  //
  // humbNav with GASP
  var humBtn = $(".hamburger");
  var humbs = $(".hamburger__line");
  var nav = $(".nav");
  var navBox = $(".nav__box");
  var navLists = $(".nav__box__list");

  var menuToggle = new TimelineMax({
    paused: true,
    reversed: true
  });
  menuToggle
    .staggerTo(humbs, 0.1, {
      cycle: {
        // transformOrigin: ["100%", "100%"],
        scale: [1, 0.5, 1],
        height: ["3px", "3px", "3px"],
        display: ["block", "block", "block"],
        rotation: [45, 0, -45],
        display: ["", "none", ""],
        top: ["50%", "50%", "50%"]
      }
    })
    .to(nav, 0.4, {
      display: "block",
      position: "fixed",
      right: "0%",
      top: "0%",
      ease: Power4.easeOut,
      width: "75%"
    });
  // .to(navLists, 0.1, {
  //   display: "block",
  //   ease: Power4.easeOut
  // });
  humBtn.click(function () {
    menuToggle.reversed() ? menuToggle.restart() : menuToggle.reverse();
  });

  // drop shadow animation
  if ($(window).width() > 1024) {
    // logo mobile and desktop
    // logo background animation
    var rXP = 300;
    var rYP = 300;
    // $('.titleBox__title').css('text-shadow', rYP / 8 + 'px ' + rXP / 10 + 'px rgba(255,237,0, 0.1), ' + rXP / 10 +
    //     'px ' + rYP / 12 +
    //     'px rgba(0,159,227,.3)');

    $(".wrapper").mousemove(function (e) {
      var rXP = e.pageX - this.offsetLeft - $(this).width() / 2;
      var rYP = e.pageY - this.offsetTop - $(this).height() / 2;
      //just one
      $(".titleBox__title").css(
        "text-shadow",
        rXP / 10 + "px " + rYP / 12 + "px rgba(206, 60, 40, 0.3)"
      );
      // $(".titleBox__title").css(
      //   'text-shadow', rYP / 8 +
      //   'px ' +
      //   rXP / 10 + 'px rgb(206, 60, 40, 0.1), ' + rXP / 10 + 'px ' + rYP / 12 + 'px rgba(0,0,0,.3)'
      // );
    });
  }
});