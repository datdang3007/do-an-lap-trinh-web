// PARAMS:
var userID;

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

// Get page list category:
getPagelistCategory = (list, type) => {
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

// Check page list:
checkPages = (list, min, max) => {
  let result = [];
  list.map((val, idx) => {
    if (idx >= min && idx < max) {
      result.push(val);
    }
  });
  return result;
};

// Số lượng mục hiển thị trên mỗi trang
var limit = 25;

// Hàm để lấy các mục từ server bằng AJAX
function getItems(page) {
  $.ajax({
    url: "http://localhost:3000/film?page=" + page + "&limit=" + limit,
    method: "GET",
    success: function (data) {
      let min = limit * page - limit;
      let max = limit * page;
      let category = $("#list-film").data().category;
      let dataCheck = getPagelistCategory(data, category);
      let result = checkPages(dataCheck, min, max);

      // khởi tạo #item-list
      $("#list-film").empty();

      // duyệt qua từng phần tử và thêm vào #item-list
      result.forEach((item) => {
        $("#list-film").append(`
              <div class="card-film">
                  <div class="card-film-box" data-id="${item.id}" data-series="${item.phimle}">
                      <div class="blur"></div>
                      <div class="film" style="background: url(${item.image}) no-repeat center/cover;"></div>
                      <div class="btn-start-film-odd">
                          <i class="fa-solid fa-play"></i>
                      </div>
                      <span class="type">HD | Vietsub</span>
                      <span class="name">${item.ten}</span>
                  </div>
              </div>
          `);
      });

      // Tính toán và hiển thị nút phân trang
      var pages = Math.ceil(dataCheck.length / limit);
      var pageHtml = "Trang " + page + " / " + pages;
      console.log(pageHtml);
      $("#page-num").text(pageHtml);
      if (page == 1) {
        $("#prev-btn").attr("disabled", true);
      } else {
        $("#prev-btn").attr("disabled", false);
      }
      if (page == pages) {
        $("#next-btn").attr("disabled", true);
      } else {
        $("#next-btn").attr("disabled", false);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    },
  });
}

// Bắt đầu với trang đầu tiên
var currentPage = 1;
getItems(currentPage);

// Bắt sự kiện khi nhấn nút phân trang
$("#prev-btn").click(function () {
  if (currentPage > 1) {
    currentPage--;
    getItems(currentPage);
  }
});
$("#next-btn").click(function () {
  currentPage++;
  getItems(currentPage);
});

// Event chuyển đường dẫn sang trang details_movie có truyền 2 biến id và series để search
changeToFilmDetails = (id, series) => {
  window.location = `/details_movie.html?userid=${userID}&id=${id}&series=${series}`;
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
    url: "http://localhost:3000/users/",
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

RenderLogoBrand = () => {
  let parentIsTagA = $(".logo-brand").parent().prop("tagName");
  if (parentIsTagA == "A") {
    $(".logo-brand").parent().attr("href", `/home.html?userid=${userID}`);
  }
};

$(document).ready(function () {
  let option = window.location.pathname.split("/")[1].split(".html")[0];
  userID = getUrlParameter("userid");
  RenderProfile();
  RenderMenuOption(option);
  RenderLogoBrand();

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

  setTimeout(() => {
    var groupPathFilm = document.querySelectorAll(".card-film-box");
    groupPathFilm.forEach((film) => {
      $(film).click(() => {
        let id = $(film).data().id;
        let series = $(film).data().series;

        changeToFilmDetails(id, series);
      });
    });
  }, 500);
});
