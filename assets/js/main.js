$(document).ready(function () {
  startAnimation();
  // titleAnimation is inside of "onComplete" from startAnimation();
  // titleAnimation();
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
            TweenMax.to(container, 1, {
              ease: Back.easeOut.config(1.7),
              y: -100,
              opacity: 0
            });
            smoothState.restartCSSAnimations();
            if ($(".fp-enabled").length) {
              setTimeout(function () {
                $(".fullpage").fullpage.destroy("all");
              }, 1);
              $(".fullpage").css({
                opacity: "0"
              });
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
              y: -100
            }, {
              y: 0,
              opacity: 1,
              ease: Back.easeOut.config(1.7)
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
          showTitles();
          moveSectionDown();
          if ($(".skillBoxes").length) {
            barAnimatiaon();
          }
          $(".animationDiv__box").remove();
        }
      },
      smoothState = $("#wrapper")
      .smoothState(options)
      .data("smoothState");
  });

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
    //モバイルナビのリストをクリックした時にナビを消す
    if ($(window).width() < 1024) {
      navLists.click(function () {
        menuToggle.reversed() ? menuToggle.restart() : menuToggle.reverse();
      });
      $(".container").click(function () {
        if (!menuToggle.reversed()) {
          menuToggle.reverse();
        }
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
        "project6",
        "project7"
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
    projectMenuBtn.click(function () {
      $(".logo, .projectMenuBtn").css({
        display: "none"
      })
    })
    projectMenuToggle
      .to(projectMenu, 0.1, {
        display: "block",
        position: "fixed",
        left: "0%",
        top: "0%",
        ease: Power4.easeOut,
        width: "70%"
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

    $(".container").click(function () {
      tlProjectMenuClose = new TimelineMax({});
      tlProjectMenuClose
        .to(projectMenu, 0.1, {
          display: "none",
          width: "0%",
          ease: Linear.easeNone
        })
      $(".logo, .projectMenuBtn").css({
        display: "block"
      }, )
    });
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
      $(".logo, .projectMenuBtn").css({
        display: "block"
      }, )
    });
    lists.click(function () {
      tlProjectMenuClose = new TimelineMax({});
      tlProjectMenuClose
        .to(projectMenu, 0.1, {
          display: "none",
          width: "0%",
          ease: Linear.easeNone
        })
      $(".logo, .projectMenuBtn").css({
        display: "block"
      }, )
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
    // アニメーション終わる
    $(".skipAnimationBtn").click(function () {
      $(this).css({
        display: "none"
      })
      tl.totalProgress(1, false);
    })
    tl.fromTo(
      $(".animationDiv__box:eq(0)"),
      speed, {
        autoAlpha: 0,
        right: "0%",
        top: "0%"
      }, {
        autoAlpha: 1,
        backgroundColor: "#212121",
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
        backgroundColor: "#212121",
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
        backgroundColor: "#212121",
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
        backgroundColor: "#212121",
        height: "100%",
        width: "25%"
      }
    );
    tl.to($(".animationDiv__box:eq(3)"), 0.5, {
      left: "0%",
      backgroundColor: "#212121"
    });
    tl.to($(".animationDiv__box:eq(2)"), 0.5, {
      left: "3%",
      backgroundColor: "#282828"
    });
    tl.to($(".animationDiv__box:eq(1)"), 0.5, {
      left: "6%",
      backgroundColor: "#3f3f3f"
    });
    tl.to($(".animationDiv__box:eq(0)"), 0.5, {
      backgroundColor: "#4f4f4f",
      left: "9%"
    });
    tl.to($(".animationDiv__box"), 0.5, {
      backgroundColor: "black",
      left: "0%",
      opacity: 0.8
    });
    tl.to($(".animationDiv__box"), 0.5, {
      width: "100%"
    });
    tl.to($(".animationDiv__box"), 1, {
      width: "0%",
      left: "100%"
    });

    // コンテント表示
    tl.to($(".container"), 0.1, {
      autoAlpha: 1
    });
    // each text title animation
    $(".titleBox__title")
      .contents()
      .each(function (_, node) {
        node.parentNode.removeChild(node);
        switch (node.nodeType) {
          case Node.TEXT_NODE:
            var text_split = node.textContent.split("");

            function animate() {
              text_split.forEach(function (val) {
                if (val == " ") {
                  $(".titleBox__title").append("<span>" + "&nbsp;" + "</span>");
                } else {
                  $(".titleBox__title").append("<span>" + val + "</span>");
                }
              });
            }
            animate();
            break;
          default:
            $(".titleBox__title").append(node);
        }
      });
    tl.staggerFrom(
      $(".titleBox__title span"),
      1, {
        ease: Power1.easeOut,
        opacity: 0,
        display: "inline-block",
        y: -500
      },
      0.3
    );
    tl.from($(".titleBox__subTitle"), 1, {
      ease: Power1.easeOut,
      y: 100,
      onComplete: function () {
        titleAnimation();
      }
    });
    tl.from($(".logoBack"), 4, {
      ease: Power1.easeOut,
      width: "0px",
      opacity: 1
    });
    tl.to($(".logo"), 1, {
      ease: Bounce.easeOut,
      top: "5%",
      autoAlpha: 1
    });
    tl.to($(".hamburger"), 1, {
      top: "5%",
      right: "4%",
      autoAlpha: 1
    });
    if ($(window).width() > 1024) {
      tl.staggerTo(
        navLists,
        0.5, {
          opacity: 1,
          ease: Power4.easeOut,
          // 終了と同時にアニメーションdivを消す
          onComplete: function () {
            $(".animationDiv").remove();
          }
        },
        0.2
      );
    }
  }

  function showTitles() {
    TweenMax.staggerTo(
      $(".titleBox__title span"),
      0, {
        ease: Power1.easeOut,
        opacity: 1,
        display: "inline-block",
        y: 0
      },
      0
    );
    TweenMax.to($(".titleBox__subTitle"), 0, {
      ease: Power1.easeOut,
      y: 0
    });
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
    TweenMax.to($(".hamburger"), 0, {
      opacity: 1,
      top: "5%",
      right: "4%"
    });
  }

  function showLogo() {
    TweenMax.to($(".logo"), 0, {
      opacity: 1,
      top: "5%"
    });
  }


  function viewPointHeigt() {
    // stop breaking design due to mobile addressBar
    // if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    var hSize = $(window).height();
    $(".js-viewPointHeigt").height(hSize);
    // }
  }

  function moveSectionDown() {
    $(".moveSectionDown").click(function () {
      $(".fullpage").fullpage.moveSectionDown();
    });
  }

  function barAnimatiaon() {
    $(".skillBoxes__box__bar__chart").width(0);
    if ($(window).width() > 1024) {
      $(".skillBoxes__box__bar__chart").css("width", "100%");
    }
    $(window).scroll(function () {
      var st = $(window).scrollTop();
      var scrollBottom =
        $(document).height() - $(window).height() - $(window).scrollTop();
      var dev = $("#toggleDev").offset().top;

      if (scrollBottom < dev) {
        console.log("dev");
        $("#toggleDev")
          .siblings()
          .find(".skillBoxes__box__bar__chart")
          .css("width", "100%");
      }
      if (scrollBottom < 300) {
        console.log("desi");
        $("#toggleDesign")
          .siblings()
          .find(".skillBoxes__box__bar__chart")
          .css("width", "100%");
      }
      if (scrollBottom < 100) {
        console.log("other");
        $("#toggleOthers")
          .siblings()
          .find(".skillBoxes__box__bar__chart")
          .css("width", "100%");
      }
    });
  }
});