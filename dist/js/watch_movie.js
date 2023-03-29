/// PARAMS:
var curListFilmRecommend = 0;
var stepListFilmRecommend = 1124;
var maxWidth = stepListFilmRecommend * 3;
var hoverFilmRecommend = false;
var toggleAutoRunFilmRecommend = false;
var userID;
var tickedStarScore;
var tickedStar = false;
var reactionLevel = {
  [0]: "Chưa được đánh giá",
  [1]: "dở tệ",
  [2]: "dở",
  [3]: "không hay",
  [4]: "không hay lắm",
  [5]: "bình thường",
  [6]: "xem được",
  [7]: "có vẻ hay",
  [8]: "hay",
  [9]: "rất hay",
  [10]: "tuyệt vời",
};

updateLikeCount = (pageId) => {
  fetch(`https://beautiful-tan-pantyhose.cyclic.app/film/${pageId}`)
    .then((response) => {
      return response.json();
    })
    .then((get) => {
      let likeCount = get.like;

      if (userID && userID != "false") {
        fetch(`https://beautiful-tan-pantyhose.cyclic.app/users/${userID}`)
          .then((response) => {
            return response.json();
          })
          .then((get) => {
            let finded = false;
            get.like.map((val) => {
              if (val.id == pageId) {
                finded = true;
                $("#btn-like").html(`
                  <i class="fa-solid fa-thumbs-up"></i>
                  UnLike (${likeCount})
                `);
              }
            });
            if (!finded) {
              $("#btn-like").html(`
                <i class="fa-solid fa-thumbs-up"></i>
                Like (${likeCount})
              `);
            }
          });
      } else {
        $("#btn-like").html(`
          <i class="fa-solid fa-thumbs-up"></i>
          Like (${likeCount})
        `);
      }
    });
};

EventLike = (pageId) => {
  if (userID && userID != "false") {
    $.ajax({
      url: `https://beautiful-tan-pantyhose.cyclic.app/users/${userID}`,
      method: "GET",
      success: function (data) {
        let result;
        let unlike = false;

        data.like.forEach((dataL) => {
          if (dataL.id == pageId) {
            unlike = true;
            result = data.like.filter(function (value, index, arr) {
              return value.id != pageId;
            });
          }
        });

        if (!unlike) {
          data.like.push({ id: Number(pageId) });
          result = data.like;
        }
        fetch(`https://beautiful-tan-pantyhose.cyclic.app/users/${userID}`, {
          method: "PATCH",
          body: JSON.stringify({
            like: result,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        $.ajax({
          url: `https://beautiful-tan-pantyhose.cyclic.app/film/${pageId}`,
          method: "GET",
          success: function (dataFilm) {
            let likeCount = Number(dataFilm.like);
            if (!unlike) {
              likeCount = likeCount + 1;
            } else {
              likeCount = likeCount - 1;
            }
            fetch(`https://beautiful-tan-pantyhose.cyclic.app/film/${pageId}`, {
              method: "PATCH",
              body: JSON.stringify({
                like: Number(likeCount),
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
            setTimeout(() => {
              updateLikeCount(pageId);
            }, 100);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
          },
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      },
    });
  }
};

showStar = (score) => {
  var groupStar = document.querySelectorAll(".btnStarReaction");

  groupStar.forEach((star) => {
    let id = $(star).data().id;
    if (id <= score) {
      $(star).addClass("active");
    } else {
      $(star).removeClass("active");
    }
  });
};

starEvent = (pageId) => {
  var groupStar = document.querySelectorAll(".btnStarReaction");
  groupStar.forEach((star) => {
    $(star).hover(() => {
      let id = $(star).data().id;
      showStar(id);
      $(".text-level").html(reactionLevel[Math.floor(id)]);
    });

    $(star).mouseleave(() => {
      if (!tickedStar) {
        let starCount = $(star).parent().data().score;
        showStar(starCount);
        $(".text-level").html(reactionLevel[Math.floor(starCount)]);
      } else {
        showStar(tickedStarScore);
        $(".text-level").html(reactionLevel[Math.floor(tickedStarScore)]);
      }
    });

    $(star).click(() => {
      let score = $(star).data().id;
      if (userID && userID != "false") {
        $.ajax({
          url: `https://beautiful-tan-pantyhose.cyclic.app/users/${userID}`,
          method: "GET",
          success: function (data) {
            let currentScore = 0;
            let ticked = false;
            data.danhgia.forEach((dataL) => {
              if (dataL.id == pageId) {
                ticked = true;
                result = data.danhgia.map(function (value, index, arr) {
                  if (value.id != pageId) {
                    return value;
                  } else {
                    currentScore = value.score;
                    let returnVal = {
                      id: value.id,
                      score: Number(score),
                    };
                    return returnVal;
                  }
                });
              }
            });

            if (!ticked) {
              data.danhgia.push({ id: Number(pageId), score: Number(score) });
              result = data.danhgia;
            }

            fetch(
              `https://beautiful-tan-pantyhose.cyclic.app/users/${userID}`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  danhgia: result,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            );

            $.ajax({
              url: `https://beautiful-tan-pantyhose.cyclic.app/film/${pageId}`,
              method: "GET",
              success: function (dataFilm) {
                let starCount = dataFilm.danhgia + score - currentScore;
                let tickedStarCount = dataFilm.luotdanhgia;
                if (!ticked) {
                  tickedStarCount = tickedStarCount + 1;
                }
                fetch(
                  `https://beautiful-tan-pantyhose.cyclic.app/film/${pageId}`,
                  {
                    method: "PATCH",
                    body: JSON.stringify({
                      danhgia: Number(starCount),
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                  }
                );
                fetch(
                  `https://beautiful-tan-pantyhose.cyclic.app/film/${pageId}`,
                  {
                    method: "PATCH",
                    body: JSON.stringify({
                      luotdanhgia: Number(tickedStarCount),
                    }),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                  }
                );
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
              },
            });

            tickedStarScore = score;
            tickedStar = true;
            showStar(score);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
          },
        });
      }
    });
  });
};

getUrlParameter = (sParam) => {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

autoRunSlideFilmRecommend = () => {
  curListFilmRecommend = curListFilmRecommend + stepListFilmRecommend;
  if (curListFilmRecommend >= maxWidth) {
    curListFilmRecommend = 0;
    $(".list-film-recommend-box").css(
      `transform`,
      `translateX(-${curListFilmRecommend}px)`
    );
  } else {
    $(".list-film-recommend-box").css(
      `transform`,
      `translateX(-${curListFilmRecommend}px)`
    );
  }

  setTimeout(() => {
    if (hoverFilmRecommend) {
      toggleAutoRunFilmRecommend = true;
    } else {
      autoRunSlideFilmRecommend();
    }
  }, 5000);
};

$("#inputSearchingFilm").focus((e) => {
  $("#inputSearchingFilm").css({
    border: "1px solid #0cc0df",
    "border-right": "0px solid transparent",
    "background-color": "black",
  });
  $("#btnSearchingFilm").css("border", "1px solid #0cc0df");
  $("#iconSearching").css("color", "#0cc0df");
});

$("#inputSearchingFilm").focusout((e) => {
  $("#inputSearchingFilm").css({
    border: "1px solid #484848",
    "border-right": "0px solid transparent",
    "background-color": "transparent",
  });
  $("#btnSearchingFilm").css("border", "1px solid #484848");
  $("#iconSearching").css("color", "#484848");
});

CheckDuplicateNumber = (array, el) => {
  for (var i = 0; i < array.length; i++) if (array[i] == el) return true;
  return false;
};

RandomNumber = (list, array) => {
  var rand = array[Math.floor(Math.random() * array.length)];
  if (!CheckDuplicateNumber(list, rand)) {
    list.push(rand);
    return rand;
  }
  return RandomNumber(list, array);
};

GetListRandom = (data) => {
  var result = [];
  for (var i = 0; i < 15; i++) {
    let temp = RandomNumber(result, data);
    setTimeout(() => {
      result.push(temp);
    }, 1);
  }
  return result;
};

randomListFilmRecommend = () => {
  $.ajax({
    url: "https://beautiful-tan-pantyhose.cyclic.app/film/",
    method: "GET",
    success: function (data) {
      listRandom = GetListRandom(data);

      var base = ``;
      listRandom.forEach((film) => {
        base += `
            <div class="item">
                <div class="item-box" data-id="${film.id}" data-series="${film.phimle}">
                    <div class="blur"></div>
                    <div class="film" style="background: url(${film.image}) no-repeat center/cover;"></div>
                    <div class="btn-start-film-recommend">
                        <i class="fa-solid fa-play"></i>
                    </div>
                    <span class="type">HD | Vietsub</span>
                    <span class="name">${film.ten}</span>
                </div>
            </div>
        `;
      });
      $(".list-film-recommend-box").html(base);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    },
  });
};

GetData = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (id == list[i].id) {
      return list[i];
    }
  }
};

getGroupSeries = (data) => {
  var base = `<span class="header-series-title">Tập phim mới:</span>`;
  for (const [key, value] of Object.entries(data.tapphim)) {
    let serienumber = key.split("tap")[1];
    base += `
      <span class="btn-path-series" data-serienumber="${serienumber}">Tập ${serienumber}</span>
    `;
  }
  return base;
};

changeToFilmDetails = (id, series) => {
  window.location = `/details_movie.html?userid=${userID}&id=${id}&series=${series}`;
};

changeToMovie = (id, series, serieNumber) => {
  window.location = `/watch_movie.html?userid=${userID}&id=${id}&series=${series}&serienumber=${serieNumber}`;
};

ChangeSerieFilm = (data, number, score) => {
  let filmData;
  for (const [key, value] of Object.entries(data.tapphim)) {
    if (key == `tap${number}`) {
      filmData = value;
    }
  }

  $(".group-watch-film").html(`
    <iframe src="${filmData.link}?rel=0&autoplay=1&modestbranding=1" frameborder="0" allowfullscreen></iframe>
  `);

  let social = `
    <div class="social">
      <span class="movie-name">${filmData.ten}</span>
      <div class="group-btn-like-share flex-center">
          <div id="btn-like">
              <i class="fa-solid fa-thumbs-up"></i>
              Like (${data.like})
          </div>
          <div id="btn-share">
              <i class="fa-solid fa-share"></i>
              Share
          </div>
      </div>
      <div class="star-evaluation flex-center">
          <ul class="flex-center" data-score="${score}">
  `;
  for (let star = 1; star <= 10; star++) {
    social += `<li class="btnStarReaction" data-id="${star}"><i class="fa-solid fa-star"></i></li>`;
  }
  let reactionStar = reactionLevel[Math.floor(score)];
  social += `
          </ul>
          <span class="text-statistical">(${score} điểm /${data.luotdanhgia} lượt đánh giá)</span>
          <span class="text-level">${reactionStar}</span>
      </div>
      <div class="group-movie-content">${data.noidung}</div>
    </div>
  `;
  $(".details-reaction").html(social);
};

UpdateSelectPage = (id, data) => {
  let luotTruyCap = Number(data.luottruycap) + 1;
  fetch(`https://beautiful-tan-pantyhose.cyclic.app/film/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      luottruycap: Number(luotTruyCap),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

RenderPage = (id, odd, serieNumber) => {
  $.ajax({
    url: "https://beautiful-tan-pantyhose.cyclic.app/film/",
    method: "GET",
    success: function (data) {
      let filmData = GetData(id, data);
      $(".group-series").hide();

      UpdateSelectPage(id, filmData);

      let score = Math.floor(filmData.danhgia / filmData.luotdanhgia || 0);
      let social = ``;

      if (odd == "false") {
        let groupSeries = getGroupSeries(filmData);
        $(".group-series").html(groupSeries);
        $(".group-series").show();
        $(".group-series").css("display", "flex");

        ChangeSerieFilm(filmData, serieNumber, score);
      } else {
        $(".group-watch-film").html(`
          <iframe src="${filmData.link}?rel=0&autoplay=1&modestbranding=1" frameborder="0" allowfullscreen></iframe>
        `);

        social += `
          <div class="social">
            <span class="movie-name">${filmData.ten}</span>
            <div class="group-btn-like-share flex-center">
                <div id="btn-like">
                    <i class="fa-solid fa-thumbs-up"></i>
                    Like (${filmData.like})
                </div>
                <div id="btn-share">
                    <i class="fa-solid fa-share"></i>
                    Share
                </div>
            </div>
            <div class="star-evaluation flex-center">
                <ul class="flex-center" data-score="${score}">
        `;
        for (let star = 1; star <= 10; star++) {
          social += `<li class="btnStarReaction" data-id="${star}"><i class="fa-solid fa-star"></i></li>`;
        }
        let reactionStar = reactionLevel[Math.floor(score)];
        social += `
                </ul>
                <span class="text-statistical">(${score} điểm /${filmData.luotdanhgia} lượt đánh giá)</span>
                <span class="text-level">${reactionStar}</span>
            </div>
            <div class="group-movie-content">${filmData.noidung}</div>
          </div>
        `;
        $(".details-reaction").html(social);
      }
      updateLikeCount(id);
      showStar(score);
      starEvent(id);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    },
  });
};

RenderMenuOption = (type) => {
  var base = ``;
  if (type == "home") {
    base += `
      <li class="option active"><span>Trang Chủ</span></li>
      <li class="option"><span><a href="/film_odd.html?userid=${userID}"">Phim Lẻ</a></span></li>
      <li class="option"><span><a href="/film_series.html?userid=${userID}"">Phim Bộ</a></span></li>
      <li class="option"><span><a href="/film_movie_theaters.html?userid=${userID}"">Phim Chiếu Rạp</a></span></li>
    `;
  } else if (type == "film_odd") {
    base += `
      <li class="option"><span><a href="/home.html?userid=${userID}"">Trang Chủ</a></span></li>
      <li class="option active"><span>Phim Lẻ</span></li>
      <li class="option"><span><a href="/film_series.html?userid=${userID}"">Phim Bộ</a></span></li>
      <li class="option"><span><a href="/film_movie_theaters.html?userid=${userID}"">Phim Chiếu Rạp</a></span></li>
    `;
  } else if (type == "film_series") {
    base += `
      <li class="option"><span><a href="/home.html?userid=${userID}"">Trang Chủ</a></span></li>
      <li class="option"><span><a href="/film_odd.html?userid=${userID}"">Phim Lẻ</a></span></li>
      <li class="option active"><span>Phim Bộ</span></li>
      <li class="option"><span><a href="/film_movie_theaters.html?userid=${userID}"">Phim Chiếu Rạp</a></span></li>
    `;
  } else if (type == "film_movie_theaters") {
    base += `
      <li class="option"><span><a href="/home.html?userid=${userID}">Trang Chủ</a></span></li>
      <li class="option"><span><a href="/film_odd.html?userid=${userID}"">Phim Lẻ</a></span></li>
      <li class="option"><span><a href="/film_series.html?userid=${userID}"">Phim Bộ</a></span></li>
      <li class="option active"><span>Phim Chiếu Rạp</span></li>
    `;
  } else if (type == "all") {
    base += `
      <li class="option"><span><a href="/home.html?userid=${userID}">Trang Chủ</a></span></li>
      <li class="option"><span><a href="/film_odd.html?userid=${userID}"">Phim Lẻ</a></span></li>
      <li class="option"><span><a href="/film_series.html?userid=${userID}"">Phim Bộ</a></span></li>
      <li class="option"><span><a href="/film_series.html?userid=${userID}"">Phim Bộ</a></span></li>
      <li class="option"><span><a href="/film_movie_theaters.html?userid=${userID}"">Phim Chiếu Rạp</a></span></li>
    `;
  }
  base += `
    <li class="option li-dropdown">
      <span>Thể Loại</span>
      <ul class="dropdown-list">
          <li class="dropdown-option">Phim Hành Động</li>
          <li class="dropdown-option">Phim Tình Cảm</li>
          <li class="dropdown-option">Phim Hài Hước</li>
          <li class="dropdown-option">Phim Cổ Trang</li>
          <li class="dropdown-option">Phim Tâm Lý</li>
          <li class="dropdown-option">Phim Hình Sự</li>
          <li class="dropdown-option">Phim Chiến Tranh</li>
          <li class="dropdown-option">Phim Thể Thao</li>
          <li class="dropdown-option">Phim Võ Thuật</li>
          <li class="dropdown-option">Phim Hoạt Hình</li>
          <li class="dropdown-option">Phim Phiêu Lưu</li>
          <li class="dropdown-option">Phim Viễn Tưởng</li>
          <li class="dropdown-option">Phim Kinh Dị</li>
          <li class="dropdown-option">Phim Thần Thoại</li>
      </ul>
    </li>
    <li class="option li-dropdown">
      <span>Quốc Gia</span>
      <ul class="dropdown-list">
          <li class="dropdown-option">Phim Trung Quốc</li>
          <li class="dropdown-option">Phim Hàn Quốc</li>
          <li class="dropdown-option">Phim Âu-Mỹ</li>
          <li class="dropdown-option">Phim Việt Nam</li>
      </ul>
    </li>
    <li class="option li-dropdown">
      <span>Năm Phát Hành</span>
      <ul class="dropdown-list">
          <li class="dropdown-option">Năm 2022</li>
          <li class="dropdown-option">Năm 2021</li>
          <li class="dropdown-option">Năm 2020</li>
          <li class="dropdown-option">Năm 2019</li>
          <li class="dropdown-option">Năm 2018</li>
          <li class="dropdown-option">Năm 2017</li>
          <li class="dropdown-option">Năm 2016</li>
          <li class="dropdown-option">Năm 2015</li>
          <li class="dropdown-option">Năm 2014</li>
          <li class="dropdown-option">Năm 1984</li>
          <li class="dropdown-option">Năm 1940</li>
      </ul>
    </li>
  `;

  $(".menu-option").html(base);
};

function EventButtonShowListFilmLiked() {
  $("#btnShowListFilmLiked").click(() => {
    console.log("test");
    if (userID && userID != "false") {
      window.location = `/user_liked.html?userid=${userID}`;
    }
  });
}

RenderProfile = (pageId, pageTypeOdd) => {
  var profile = ``;

  $.ajax({
    url: "https://beautiful-tan-pantyhose.cyclic.app/users/",
    method: "GET",
    success: function (data) {
      let userData;
      data.forEach((user) => {
        if (user.id == userID) {
          userData = user;
        }
      });
      if (userData) {
        profile += `
          <div class="profile-box flex-center">
            <div class="circle-user">
        `;
        if (userData.avatar == "") {
          profile += `<i class="fa-solid fa-user"></i>`;
        } else {
          profile += `<img src="${userData.avatar}" alt="">`;
        }
        profile += `
            </div>
          </div>
          <ul class="dropdown-profile">
              <li><span id="btnShowListFilmLiked">Phim đã thích</span></li>
              <li><a href="${window.location.pathname}?id=${pageId}&series=${pageTypeOdd}">Đăng xuất</a></li>
          </ul>
        `;
      } else {
        profile += `
          <div class="profile-box flex-center">
              <div class="circle-user">
                  <i class="fa-solid fa-user"></i>
              </div>
          </div>
          <ul class="dropdown-profile">
              <li><a href="/login.html">Đăng nhập</a></li>
              <li><a href="/register.html">Đăng ký</a></li>
          </ul>
        `;
      }
      $(".profile").html(profile);
      EventButtonShowListFilmLiked();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    },
  });
};

RenderLogoBrand = () => {
  let parentIsTagA = $(".logo-brand").parent().prop("tagName");
  if (parentIsTagA == "A") {
    $(".logo-brand").parent().attr("href", `/home.html?userid=${userID}`);
  }
};

$(document).ready(function () {
  userID = getUrlParameter("userid");
  let pageId = getUrlParameter("id");
  let pageTypeOdd = getUrlParameter("series");
  let serieNumber = getUrlParameter("serienumber");

  RenderPage(pageId, pageTypeOdd, serieNumber);
  RenderProfile(pageId, pageTypeOdd);
  RenderMenuOption("all");
  RenderLogoBrand();

  // setup list film recommend:
  randomListFilmRecommend();

  $(".form-searching-film").submit(() => {
    return false;
  });

  $("#inputSearchingFilm").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      let inputSearch = $("#inputSearchingFilm").val();
      window.location = `/searching_film.html?userid=${userID}&inputsearch=${inputSearch}`;
    }
  });

  $("#btnSearchingFilm").click(() => {
    let inputSearch = $("#inputSearchingFilm").val();
    window.location = `/searching_film.html?userid=${userID}&inputsearch=${inputSearch}`;
  });

  // event when click carousel
  $(".btn-carousel-left").click(() => {
    curListFilmRecommend = curListFilmRecommend - stepListFilmRecommend;
    if (curListFilmRecommend < 0) {
      curListFilmRecommend = maxWidth - stepListFilmRecommend;
      $(".list-film-recommend-box").css(
        `transform`,
        `translateX(-${curListFilmRecommend}px)`
      );
    } else {
      $(".list-film-recommend-box").css(
        `transform`,
        `translateX(-${curListFilmRecommend}px)`
      );
    }
  });

  $(".btn-carousel-right").click(() => {
    curListFilmRecommend = curListFilmRecommend + stepListFilmRecommend;
    if (curListFilmRecommend >= maxWidth) {
      curListFilmRecommend = 0;
      $(".list-film-recommend-box").css(
        `transform`,
        `translateX(-${curListFilmRecommend}px)`
      );
    } else {
      $(".list-film-recommend-box").css(
        `transform`,
        `translateX(-${curListFilmRecommend}px)`
      );
    }
  });

  autoRunSlideFilmRecommend();

  $(".list-film-recommend")
    .mouseenter(() => {
      hoverFilmRecommend = true;
    })
    .mouseleave(() => {
      hoverFilmRecommend = false;
      if (toggleAutoRunFilmRecommend) {
        toggleAutoRunFilmRecommend = false;
        autoRunSlideFilmRecommend();
      }
    });

  setTimeout(() => {
    var groupPathFilm = document.querySelectorAll(".item-box");
    groupPathFilm.forEach((film) => {
      $(film).click(() => {
        let id = $(film).data().id;
        let series = $(film).data().series;
        changeToFilmDetails(id, series);
      });
    });

    var groupPathSeries = document.querySelectorAll(".btn-path-series");
    groupPathSeries.forEach((btn) => {
      $(btn).click(() => {
        let serieNumber = Number($(btn).data().serienumber);
        changeToMovie(pageId, pageTypeOdd, serieNumber);
      });
    });

    $("#btn-like").click(() => {
      EventLike(pageId);
    });
  }, 500);
});
