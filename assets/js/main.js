$(document).ready(function () {
  startAnimation();
  titleAnimation();
  openNav();
  viewPointHeigt();
  $(function () {
    var options = {
        prefetch: true,
        cacheLength: 5,
        onStart: {
          duration: 1000, // Duration of our animation
          render: function ($wrapper) {
            // Restart your animation
            // 内容を消す
            var container = $wrapper.find(".container");
            TweenMax.to(
              container,
              1, {
                ease: Back.easeOut.config(1.7),
                y: -100,
                opacity: 0
              }
            );
            smoothState.restartCSSAnimations();
            if ($(".fp-enabled").length) {
              setTimeout(function () {
                $(".fullpage").fullpage.destroy("all");
              }, 0.1);
            }
          }
        },

        onReady: {
          duration: 1000,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass("is-exiting");
            $container.html($newContent);

            // Inject the new content
          }
        },

        onAfter: function ($container) {
          var newContent = $container.find(".container");
          TweenMax.fromTo(
            newContent,
            1, {
              y: -100,
            }, {
              y: 0,
              opacity: 1,
              ease: Back.easeOut.config(1.7),
            }
          );
          console.log($container);
          openNav();
          titleAnimation();
          if ($(".fullpage").length) {
            fullpage();
          }
          letterAnimation();
          viewPointHeigt();
          pcNavShow();
          showLogo();
          showhamburger();
        }
      },
      smoothState = $("#wrapper")
      .smoothState(options)
      .data("smoothState");
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
          scale: [1, 0.5, 1],
          height: ["3px", "3px", "3px"],
          display: ["block", "block", "block"],
          rotation: [45, 0, -45],
          display: ["", "none", ""],
          top: ["50%", "50%", "50%"]
        }
      })
      .to(nav, 0.3, {
        display: "block",
        position: "fixed",
        right: "0%",
        top: "0%",
        ease: Power4.easeOut,
        width: "50%"
      })
      .staggerTo(
        navLists,
        0.1, {
          y: -10,
          opacity: 1,
          ease: Linear.easeNone
        },
        0.1
      );
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
    var num = $(".projectListBox__title__num--changed");
    var title = $(".projectListBox__title__name");
    var image = $(".projectListBox__image").children("img");

    tlProject = new TimelineMax({});
    $(".fullpage").fullpage({
      scrollingSpeed: 400,
      menu: "#projectMenu",
      anchors: [
        "project1",
        "project2",
        "project3",
        "project4",
        "project5",
        "project6"
      ],

      onLeave: function (index, nextIndex) {
        tlProject
          .to([num, title], 0.1, {
            y: "-300",
            ease: Linear.easeNone
          })
          .to(
            image,
            0.1, {
              width: "0%",
              ease: Linear.easeNone
            },
            0
          )
          .to(image, 0.1, {
            opacity: "0"
          });
      },
      afterLoad: function (anchorLink, afterIndex) {
        tlProject
          .fromTo(
            [num, title],
            0.1, {
              y: "50",
              ease: Linear.easeNone
            }, {
              y: "0",
              ease: Linear.easeNone
            }
          )
          .to(image, 0.1, {
            opacity: "1"
          })
          .to(image, 0.1, {
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
      .to($(".logo"), 0.1, {
        display: "none",
      })
      .to(projectMenu, 0.1, {
        display: "block",
        position: "fixed",
        left: "0%",
        top: "0%",
        ease: Power4.easeOut,
        width: "70%",
      })
      .staggerFrom(
        lists,
        1, {
          y: 10,
          opacity: 0,
          ease: Power4.easeOut
        },
        0.2
      );

    projectMenuBtn.click(function () {
      projectMenuToggle.restart();
    });
    arrow.click(function () {
      tlProjectMenuClose = new TimelineMax({});
      tlProjectMenuClose
        .to(projectMenu, 0.1, {
          display: "none",
          width: "0%",
          ease: Linear.easeNone
        })
        .to($(".logo"), 0.1, {
          display: "block",
        });
    });
    lists.click(function () {
      tlProjectMenuClose = new TimelineMax({});
      tlProjectMenuClose
        .to(projectMenu, 0.1, {
          display: "none",
          width: "0%",
          ease: Linear.easeNone
        })
        .to($(".logo"), 0.1, {
          display: "block",
        });
    });
  }

  //
  function letterAnimation() {
    $(document).ready(function () {
      letterAnimeTl = new TimelineLite();
      letterAnimeTl.to("#textline", 5, {
        y: "300px"
      });
      letterAnimeTl.to("#textline", 1, {
        opacity: 0
      });
      letterAnimeTl.to("#cover", 0.1, {
        opacity: 0
      });
      letterAnimeTl.to("#lineTop", 0.1, {
        opacity: 1
      });
    });
  }

  function startAnimation() {
    var tl = new TimelineLite();
    var speed = 0.2;
    var navLists = $(".nav__box__list");

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
    tl.to($(".animationDiv__box"), 3, {
      autoAlpha: 0
    });
    tl.to($(".container"), .1, {
      autoAlpha: 1
    });
    tl.to($(".logo"), 2, {
      ease: Bounce.easeOut,
      top: "5%",
      autoAlpha: 1
    }, 2.5);
    tl.to($(".hamburger"), 1, {
      top: "5%",
      right: "4%",
      autoAlpha: 1
    }, 1.5);
    if ($(window).width() > 1024) {
      tl.staggerTo(
        navLists,
        1, {
          opacity: 1,
          ease: Power4.easeOut,
          // 終了と同時にアニメーションdivを消す
          onComplete: function () {
            $(".animationDiv__box").remove();
          }
        },
        0.2
      );
    }
  }

  function pcNavShow() {
    if ($(window).width() > 1024) {
      TweenMax.staggerTo(
        $(".nav__box__list"),
        0, {
          opacity: 1
        },
        0
      );
    }
  }

  function showhamburger() {
    TweenMax.to(
      $(".hamburger"),
      0, {
        opacity: 1,
        top: "5%",
        right: "4%",
      }
    );
  }

  function showLogo() {
    TweenMax.to(
      $(".logo"),
      0, {
        opacity: 1,
        top: "5%",
      }
    );
  }

  function deleteContents() {}

  function viewPointHeigt() {
    // stop breaking design due to mobile addressBar
    // if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    var hSize = $(window).height();
    $(".js-viewPointHeigt").height(hSize);
    // }
  }
});