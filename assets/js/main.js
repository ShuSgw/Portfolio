$(document).ready(function () {
  startAnimation();
  titleAnimation();
  openNav();
  $(function () {
    var options = {
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 10, // Duration of our animation
          render: function ($container) {
            // Restart your animation
            smoothState.restartCSSAnimations();
            if ($('.fp-enabled').length) {
              setTimeout(function () {
                $('.fullpage').fullpage.destroy('all');
              }, .1);
            }
          }
        },
        onReady: {
          duration: 100,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            console.log("world");
            // Inject the new content
            $container.html($newContent);
          }
        },
        onAfter: function ($container) {
          console.log($container);
          openNav();
          titleAnimation();
          if ($('.fullpage').length) {
            fullpage();
          }
          letterAnimation();
        }
      },
      smoothState = $('#wrapper').smoothState(options).data('smoothState');
  });

  // var tl = new TimelineLite();
  // var speed = 0.2;
  // // when each page is loaded
  // tl.fromTo(
  //   $(".animationDiv__box:eq(0)"),
  //   speed, {
  //     autoAlpha: 0,
  //     right: "0%",
  //     top: "0%"
  //   }, {
  //     autoAlpha: 1,
  //     backgroundColor: "black",
  //     height: "100%",
  //     width: "25%"
  //   }
  // );
  // tl.fromTo(
  //   $(".animationDiv__box:eq(1)"),
  //   speed, {
  //     autoAlpha: 0,
  //     right: "25%",
  //     bottom: "0%"
  //   }, {
  //     autoAlpha: 1,
  //     backgroundColor: "black",
  //     height: "100%",
  //     width: "25%"
  //   }
  // );
  // tl.fromTo(
  //   $(".animationDiv__box:eq(2)"),
  //   speed, {
  //     autoAlpha: 0,
  //     right: "50%"
  //   }, {
  //     autoAlpha: 1,
  //     backgroundColor: "black",
  //     left: "25%",
  //     height: "100%",
  //     width: "25%"
  //   }
  // );
  // tl.fromTo(
  //   $(".animationDiv__box:eq(3)"),
  //   speed, {
  //     autoAlpha: 0,
  //     left: "0%",
  //     bottom: "0%"
  //   }, {
  //     autoAlpha: 1,
  //     backgroundColor: "black",
  //     height: "100%",
  //     width: "25%"
  //   }
  // );
  // flashing
  // tl.to($(".animationDiv__box:eq(0)"), 0.1, {
  //   backgroundColor: "#2D2D2D",
  //   repeat: -1,
  //   yoyo: true,
  //   epeatDelay: 0.1
  // });
  // tl.to($(".animationDiv__box:eq(1)"), 0.1, {
  //   backgroundColor: "#2D2D2D",
  //   repeat: -1,
  //   yoyo: true,
  //   epeatDelay: 0.1
  // });
  // tl.to($(".animationDiv__box:eq(2)"), 0.1, {
  //   backgroundColor: "#2D2D2D",
  //   repeat: -1,
  //   yoyo: true,
  //   epeatDelay: 0.1
  // });
  // tl.to($(".animationDiv__box:eq(3)"), 0.1, {
  //   backgroundColor: "#2D2D2D",
  //   repeat: -1,
  //   yoyo: true,
  //   epeatDelay: 0.1
  // });
  // tl.to($(".animationDiv__box"), 1, {
  //   autoAlpha: 0
  // });
  // 文字表示
  // tl.to($(".contents"), 1, {
  //   // autoAlpha: 1,
  //   // 終了と同時にアニメーションdivを消す
  //   onComplete: function () {
  //     $(".animationDiv__box").remove();
  //   }
  // });


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
  function openNav() {
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
    if ($(window).width() < 680) {
      navLists.click(function () {
        menuToggle.reversed() ? menuToggle.restart() : menuToggle.reverse();
      });
    }
  }

  function titleAnimation() {
    if ($(window).width() > 1024) {
      var rXP = 300;
      var rYP = 300;
      $(".container").mousemove(function (e) {
        var rXP = e.pageX - this.offsetLeft - $(this).width() / 2;
        var rYP = e.pageY - this.offsetTop - $(this).height() / 2;
        //just one
        $(".titleBox__title").css(
          "text-shadow",
          rXP / 10 + "px " + rYP / 12 + "px rgba(206, 60, 40, 0.3)"
        );
      });
    }
  }

  function fullpage() {
    var num = $('.projectListBox__title__num--changed');
    var title = $('.projectListBox__title__name');
    var image = $('.projectListBox__image').children('img');

    tlProject = new TimelineMax({});
    $('.fullpage').fullpage({
      scrollingSpeed: 400,
      menu: '#projectMenu',
      anchors: ['project1', 'project2', 'project3', 'project4', 'project5', 'project6'],

      onLeave: function (index, nextIndex) {
        tlProject
          .to([num, title], .1, {
            y: "-200",
            ease: Linear.easeNone
          })
          .to(image, .1, {
            width: "0%",
            ease: Linear.easeNone
          }, 0)
          .to(image, .1, {
            opacity: "0"
          });
      },
      afterLoad: function (anchorLink, afterIndex) {
        tlProject
          .fromTo(
            [num, title], .1, {
              y: "50",
              ease: Linear.easeNone
            }, {
              y: "0",
              ease: Linear.easeNone
            })
          .to(image, .1, {
            opacity: "1"
          })
          .to(image, .1, {
            width: "100%",
            ease: Linear.easeNone
          });
      }
    });

    //projectMenu
    var projectMenu = $("#projectMenu");
    var projectMenuBtn = $(".projectMenuBtn");
    var arrow = $(".arrow");
    var lists = $(".projectMenu__li");

    var projectMenuToggle = new TimelineMax({
      paused: true,
      reversed: true
    });
    projectMenuToggle
      .to(projectMenuBtn, 0.1, {
        display: "none"
      })
      .to(projectMenu, .8, {
        display: "block",
        position: "fixed",
        left: "0%",
        top: "0%",
        ease: Power4.easeOut,
        width: "100%"
      });

    projectMenuBtn.click(function () {
      projectMenuToggle.restart();
    });
    arrow.click(function () {
      projectMenuToggle.reverse();
    });
    lists.click(function () {
      projectMenuToggle.reverse();
    });
  }



  // 
  function letterAnimation() {
    $(document).ready(function () {
      letterAnimeTl = new TimelineLite();
      letterAnimeTl.to("#textline", 5, {
        y: "300px",
      });
      letterAnimeTl.to("#textline", 1, {
        opacity: 0
      });
      letterAnimeTl.to("#cover", .1, {
        opacity: 0
      });
      letterAnimeTl.to("#lineTop", .1, {
        opacity: 1
      });
    })
  }

  function startAnimation() {
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
      // autoAlpha: 1,
      // 終了と同時にアニメーションdivを消す
      onComplete: function () {
        $(".animationDiv__box").remove();
      }
    });
  }

});