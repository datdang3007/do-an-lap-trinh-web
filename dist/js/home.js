// PARAMS:
var curListFilmHot = 0;
var stepListFilmHot = 1600;
var maxWidth = stepListFilmHot * 3;
var hoverFilmHot = false;
var toggleAutoRunFilmHot = false;
var userID;

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

changeToFilmDetails = (id, series) => {
  window.location = `/details_movie.html?userid=${userID}&id=${id}&series=${series}`;
};

autoRunSlideFilmHot = () => {
  curListFilmHot = curListFilmHot + stepListFilmHot;
  if (curListFilmHot >= maxWidth) {
    curListFilmHot = 0;
    $(".list-film-hot-box").css(
      `transform`,
      `translateX(-${curListFilmHot}px)`
    );
  } else {
    $(".list-film-hot-box").css(
      `transform`,
      `translateX(-${curListFilmHot}px)`
    );
  }

  setTimeout(() => {
    if (hoverFilmHot) {
      toggleAutoRunFilmHot = true;
    } else {
      autoRunSlideFilmHot();
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

randomListFilmHot = () => {
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
                    <div class="btn-start-film-hot">
                        <i class="fa-solid fa-play"></i>
                    </div>
                    <span class="type">HD | Vietsub</span>
                    <span class="name">${film.ten}</span>
                </div>
            </div>
        `;
      });
      $(".list-film-hot-box").html(base);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    },
  });
};

getlistFilmCategory = (list, type) => {
  let result = [];

  if (type == "odd") {
    result = list.filter((val, idx) => val.phimle);
  } else if (type == "series") {
    result = list.filter((val, idx) => !val.phimle);
  } else if (type == "movie_theaters") {
    result = list.filter((val, idx) => val.phimle && val.chieurap);
  }

  return result;
};

ViewMoreBtnEvent = (type) => {
  if (type == "odd") {
    window.location = `/film_odd.html?userid=${userID}`;
  } else if (type == "series") {
    window.location = `/film_series.html?userid=${userID}`;
  } else if (type == "movie_theaters") {
    window.location = `/film_movie_theaters.html?userid=${userID}`;
  }
};

SetupListFilm = (element, type) => {
  $.ajax({
    url: "https://beautiful-tan-pantyhose.cyclic.app/film/",
    method: "GET",
    success: function (data) {
      let dataCategory = getlistFilmCategory(data, type);
      base = `
                <div class="top-content flex-center">
                    <div class="left" data-id="${dataCategory[0].id}" data-series="${dataCategory[0].phimle}">
                        <div class="left-content-box">
                            <div class="blur"></div>
                            <div class="film" style="background: url(${dataCategory[0].image}) no-repeat center/cover;"></div>
                            <div class="btn-start-film-odd">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <span class="type">HD | Vietsub</span>
                            <span class="name">${dataCategory[0].ten}</span>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-content-box">
                            <div class="item">
                                <div class="item-box" data-id="${dataCategory[1].id}" data-series="${dataCategory[1].phimle}">
                                    <div class="blur"></div>
                                    <div class="film" style="background: url(${dataCategory[1].image}) no-repeat center/cover;"></div>
                                    <div class="btn-start-film-odd">
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <span class="type">HD | Vietsub</span>
                                    <span class="name">${dataCategory[1].ten}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-box" data-id="${dataCategory[2].id}" data-series="${dataCategory[2].phimle}">
                                    <div class="blur"></div>
                                    <div class="film" style="background: url(${dataCategory[2].image}) no-repeat center/cover;"></div>
                                    <div class="btn-start-film-odd">
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <span class="type">HD | Vietsub</span>
                                    <span class="name">${dataCategory[2].ten}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-box" data-id="${dataCategory[3].id}" data-series="${dataCategory[3].phimle}">
                                    <div class="blur"></div>
                                    <div class="film" style="background: url(${dataCategory[3].image}) no-repeat center/cover;"></div>
                                    <div class="btn-start-film-odd">
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <span class="type">HD | Vietsub</span>
                                    <span class="name">${dataCategory[3].ten}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-box" data-id="${dataCategory[4].id}" data-series="${dataCategory[4].phimle}">
                                    <div class="blur"></div>
                                    <div class="film" style="background: url(${dataCategory[4].image}) no-repeat center/cover;"></div>
                                    <div class="btn-start-film-odd">
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <span class="type">HD | Vietsub</span>
                                    <span class="name">${dataCategory[4].ten}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-box" data-id="${dataCategory[5].id}" data-series="${dataCategory[5].phimle}">
                                    <div class="blur"></div>
                                    <div class="film" style="background: url(${dataCategory[5].image}) no-repeat center/cover;"></div>
                                    <div class="btn-start-film-odd">
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <span class="type">HD | Vietsub</span>
                                    <span class="name">${dataCategory[5].ten}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-box" data-id="${dataCategory[6].id}" data-series="${dataCategory[6].phimle}">
                                    <div class="blur"></div>
                                    <div class="film" style="background: url(${dataCategory[6].image}) no-repeat center/cover;"></div>
                                    <div class="btn-start-film-odd">
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <span class="type">HD | Vietsub</span>
                                    <span class="name">${dataCategory[6].ten}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-content flex-center">
                    <div class="item">
                        <div class="item-box" data-id="${dataCategory[7].id}" data-series="${dataCategory[7].phimle}">
                            <div class="blur"></div>
                            <div class="film" style="background: url(${dataCategory[7].image}) no-repeat center/cover;"></div>
                            <div class="btn-start-film-odd">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <span class="type">HD | Vietsub</span>
                            <span class="name">${dataCategory[7].ten}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-box" data-id="${dataCategory[8].id}" data-series="${dataCategory[8].phimle}">
                            <div class="blur"></div>
                            <div class="film" style="background: url(${dataCategory[8].image}) no-repeat center/cover;"></div>
                            <div class="btn-start-film-odd">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <span class="type">HD | Vietsub</span>
                            <span class="name">${dataCategory[8].ten}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-box" data-id="${dataCategory[9].id}" data-series="${dataCategory[9].phimle}">
                            <div class="blur"></div>
                            <div class="film" style="background: url(${dataCategory[9].image}) no-repeat center/cover;"></div>
                            <div class="btn-start-film-odd">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <span class="type">HD | Vietsub</span>
                            <span class="name">${dataCategory[9].ten}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-box" data-id="${dataCategory[10].id}" data-series="${dataCategory[10].phimle}">
                            <div class="blur"></div>
                            <div class="film" style="background: url(${dataCategory[10].image}) no-repeat center/cover;"></div>
                            <div class="btn-start-film-odd">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <span class="type">HD | Vietsub</span>
                            <span class="name">${dataCategory[10].ten}</span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-box" data-id="${dataCategory[11].id}" data-series="${dataCategory[11].phimle}">
                            <div class="blur"></div>
                            <div class="film" style="background: url(${dataCategory[11].image}) no-repeat center/cover;"></div>
                            <div class="btn-start-film-odd">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <span class="type">HD | Vietsub</span>
                            <span class="name">${dataCategory[11].ten}</span>
                        </div>
                    </div>
                </div>
      `;
      element.html(base);
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
  $('#btnShowListFilmLiked').click(() => {
    if (userID && userID != 'false') {
      window.location = `/user_liked.html?userid=${userID}`;
    }
  });
};

RenderProfile = () => {
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
              <li><a href="${window.location.pathname}">Đăng xuất</a></li>
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

UpdateCountSelect = () => {
  fetch(`https://beautiful-tan-pantyhose.cyclic.app/statistical`)
    .then((response) => {
      return response.json();
    })
    .then((get) => {
      let soluottruycap = Number(get.tongsoluottruycap) + 1
      fetch(`https://beautiful-tan-pantyhose.cyclic.app/statistical`, {
        method: "PATCH",
        body: JSON.stringify({
          tongsoluottruycap: Number(soluottruycap),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    });
};

$(document).ready(function () {
  userID = getUrlParameter("userid");
  RenderProfile();
  RenderMenuOption("home");
  UpdateCountSelect();
  
  // event loading list film order by category:
  let groupListFilm = document.querySelectorAll(".list-film");

  groupListFilm.forEach((listFilm) => {
    SetupListFilm($(listFilm), $(listFilm).data().category);
  });

  // event when select btn view more will be change direction:
  let groupViewMore = document.querySelectorAll(".view-more");

  groupViewMore.forEach((btn) => {
    $(btn).click(() => {
      console.log($(btn).data().category);
      ViewMoreBtnEvent($(btn).data().category);
    });
  });

  // setup list film hot:
  randomListFilmHot();

  // event when click carousel
  $(".btn-carousel-left").click(() => {
    curListFilmHot = curListFilmHot - stepListFilmHot;
    if (curListFilmHot < 0) {
      curListFilmHot = maxWidth - stepListFilmHot;
      $(".list-film-hot-box").css(
        `transform`,
        `translateX(-${curListFilmHot}px)`
      );
    } else {
      $(".list-film-hot-box").css(
        `transform`,
        `translateX(-${curListFilmHot}px)`
      );
    }
  });

  $(".btn-carousel-right").click(() => {
    curListFilmHot = curListFilmHot + stepListFilmHot;
    if (curListFilmHot >= maxWidth) {
      curListFilmHot = 0;
      $(".list-film-hot-box").css(
        `transform`,
        `translateX(-${curListFilmHot}px)`
      );
    } else {
      $(".list-film-hot-box").css(
        `transform`,
        `translateX(-${curListFilmHot}px)`
      );
    }
  });

  autoRunSlideFilmHot();

  $(".list-film-hot")
    .mouseover(() => {
      hoverFilmHot = true;
    })
    .mouseleave(() => {
      hoverFilmHot = false;
      if (toggleAutoRunFilmHot) {
        toggleAutoRunFilmHot = false;
        autoRunSlideFilmHot();
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

    var groupPathFilmLeftContent = document.querySelectorAll(".left");
    groupPathFilmLeftContent.forEach((film) => {
      $(film).click(() => {
        let id = $(film).data().id;
        let series = $(film).data().series;
        changeToFilmDetails(id, series);
      });
    });

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
  }, 500);
});
