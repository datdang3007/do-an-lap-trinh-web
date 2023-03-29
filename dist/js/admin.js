function AddEventButtonLogOut() {
  $("#btn-logout").click(() => {
    window.location = "/login.html";
  });
}

function AddEventButtonOptionBox() {
  let groupBtnOptionBox = document.querySelectorAll(".option-box");
  groupBtnOptionBox.forEach((btn) => {
    $(btn).click(() => {
      let type = $(btn).data().type;
      groupBtnOptionBox.forEach((tempBtn) => {
        $(tempBtn).removeClass("active");
      });
      $(btn).addClass("active");
      RenderRightPage(type);
    });
  });
}

function EventButtonDetails() {
  let groupBtnDetails = document.querySelectorAll(".btn-details");
  groupBtnDetails.forEach((btn) => {
    $(btn).click(() => {
      let id = $(btn).parent().data().id;
      window.open(`/details_movie.html?id=${id}`, "_blank");
    });
  });
}

function EventButtonClose() {
  $(".btn-close").click(() => {
    $(".screen-box").hide();
    $(".screen-box").html();
  });
}

function EventAcceptCreate() {
  $(".btn-action").click((e) => {
    e.preventDefault();
    let id = $(".btn-action").data().id;
    let name = $("#inputName").val();
    let filmType = $("#inputFilmType").val();
    let country = $("#inputCountry").val();
    let type = $("#inputType").val();
    let date = $("#inputDate").val();
    let author = $("#inputAuthor").val();
    let character = $("#inputCharacter").val();
    let totalTime = $("#inputTotalTime").val();
    let special = $("#inputSpecial").val();
    let details = $("#inputDetails").val();
    let linkYoutube = $("#inputLinkYoutube").val();
    let image = $("#inputImage").val();
    let cinema;
    let odd;

    if (type == "Chiếu Rạp") {
      cinema = true;
      odd = true;
    } else if (type == "Phim Lẻ") {
      cinema = false;
      odd = true;
    } else if (type == "Phim Bộ") {
      cinema = false;
      odd = false;
    }

    let data = {
      ten: name,
      theloai: filmType,
      quocgia: country,
      chieurap: cinema,
      phimle: odd,
      nam: date,
      daodien: author,
      thoiluong: totalTime,
      dacbiet: special,
      danhgia: 0,
      luotdanhgia: 0,
      like: 0,
      dienvien: character,
      luottruycap: 0,
      noidung: details,
      link: linkYoutube,
      image: image,
      tags: {},
    };
    fetch(`https://beautiful-tan-pantyhose.cyclic.app/film/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    $(".screen-box").hide();
    $(".screen-box").html();
    setTimeout(() => {
      RenderRightPage("list-film");
    }, 500);
  });
}

function EventAcceptEdit() {
  $(".btn-action").click((e) => {
    e.preventDefault();
    let id = $(".btn-action").data().id;
    let name = $("#inputName").val();
    let filmType = $("#inputFilmType").val();
    let country = $("#inputCountry").val();
    let type = $("#inputType").val();
    let date = $("#inputDate").val();
    let author = $("#inputAuthor").val();
    let character = $("#inputCharacter").val();
    let totalTime = $("#inputTotalTime").val();
    let special = $("#inputSpecial").val();
    let details = $("#inputDetails").val();
    let linkYoutube = $("#inputLinkYoutube").val();
    let image = $("#inputImage").val();
    let cinema;
    let odd;

    if (type == "Chiếu Rạp") {
      cinema = true;
      odd = true;
    } else if (type == "Phim Lẻ") {
      cinema = false;
      odd = true;
    } else if (type == "Phim Bộ") {
      cinema = false;
      odd = false;
    }

    fetch(`https://beautiful-tan-pantyhose.cyclic.app/film/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((get) => {
        let data = {
          ten: name,
          theloai: filmType,
          quocgia: country,
          chieurap: cinema,
          phimle: odd,
          nam: date,
          daodien: author,
          thoiluong: totalTime,
          dacbiet: special,
          danhgia: get.danhgia,
          luotdanhgia: get.luotdanhgia,
          like: get.like,
          dienvien: character,
          luottruycap: get.luottruycap,
          noidung: details,
          link: linkYoutube,
          image: image,
          tags: {},
        };
        fetch(`https://beautiful-tan-pantyhose.cyclic.app/film/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        $(".screen-box").hide();
        $(".screen-box").html();
        setTimeout(() => {
          RenderRightPage("list-film");
        }, 500);
      });
  });
}

function EventButtonEdit() {
  let groupBtnDetails = document.querySelectorAll(".btn-edit");
  groupBtnDetails.forEach((btn) => {
    $(btn).click(() => {
      let id = $(btn).parent().data().id;
      let typeText = ``;
      $.ajax({
        url: `https://beautiful-tan-pantyhose.cyclic.app/film/${id}`,
        method: "GET",
        success: function (data) {
          if (data.phimle) {
            if (data.chieurap) {
              typeText = `Chiếu Rạp`;
            } else {
              typeText = `Phim Lẻ`;
            }
          } else {
            typeText = `Phim Bộ`;
          }
          var base = `
            <div class="screen-focus">
              <div class="btn-close">x</div>
              <div class="title">Chỉnh Sửa</div>
              <div class="screen-focus-box">
                  <form action="">
                      <div class="group-input">
                          <label for="inputName">Tên Phim</label>
                          <input type="text" name="inputName" id="inputName" placeholder="Nhập tên phim..." value="${data.ten}">
                      </div>
      
                      <div class="group-input">
                          <label for="">Thể Loại</label>
                          <div class="custom-select">
                              <select id="inputFilmType" value="${data.theloai}">
                                <option value="Hành Động">Hành Động</option>
                                <option value="Tình Cảm">Tình Cảm</option>
                                <option value="Hài Hước">Hài Hước</option>
                                <option value="Cổ Trang">Cổ Trang</option>
                                <option value="Tâm Lý">Tâm Lý</option>
                                <option value="Hình Sự">Hình Sự</option>
                                <option value="Chiến Tranh">Chiến Tranh</option>
                                <option value="Thể Thao">Thể Thao</option>
                                <option value="Võ Thuật">Võ Thuật</option>
                                <option value="Hoạt Hình">Hoạt Hình</option>
                                <option value="Phiêu Lưu">Phiêu Lưu</option>
                                <option value="Viễn Tưởng">Viễn Tưởng</option>
                                <option value="Kinh Dị">Kinh Dị</option>
                                <option value="Thần Thoại">Thần Thoại</option>
                              </select>
                          </div>
                      </div>
      
                      <div class="group-input">
                          <label for="">Quốc Gia</label>
                          <div class="custom-select">
                              <select id="inputCountry" value="${data.quocgia}">
                                <option value="Âu-Mỹ">Âu-Mỹ</option>
                                <option value="Trung Quốc">Trung Quốc</option>
                                <option value="Hàn Quốc">Hàn Quốc</option>
                                <option value="Việt Nam">Việt Nam</option>
                              </select>
                          </div>
                      </div>
      
                      <div class="group-input">
                          <label for="">Loại</label>
                          <div class="custom-select">
                              <select id="inputType" value="${typeText}">
                                <option value="Chiếu Rạp">Chiếu Rạp</option>
                                <option value="Phim Lẻ">Phim Lẻ</option>
                                <option value="Phim Bộ">Phim Bộ</option>
                              </select>
                          </div>
                      </div>
      
                      <div class="group-input">
                          <label for="inputDate">Năm Phát Hành</label>
                          <input type="number" name="inputDate" id="inputDate" placeholder="Nhập năm phát hành..." value="${data.nam}">
                      </div>
      
                      <div class="group-input">
                          <label for="inputAuthor">Đạo Diễn</label>
                          <input type="text" name="inputAuthor" id="inputAuthor" placeholder="Nhập đạo diễn..." value="${data.daodien}">
                      </div>
                      
                      <div class="group-input">
                          <label for="inputCharacter">Diễn Viên</label>
                          <input type="text" name="inputCharacter" id="inputCharacter" placeholder="Nhập diễn viên..." value="${data.dienvien}">
                      </div>
      
                      <div class="group-input">
                          <label for="inputTotalTime">Thời Lượng</label>
                          <input type="text" name="inputTotalTime" id="inputTotalTime" placeholder="Nhập thời lượng..." value="${data.thoiluong}">
                      </div>
      
                      <div class="group-input">
                          <label for="inputSpecial">Đặc Biệt</label>
                          <input type="text" name="inputSpecial" id="inputSpecial" placeholder="HD|Vietsub, Thuyết Minh..." value="${data.dacbiet}">
                      </div>
      
                      <div class="group-input">
                          <label for="inputDetails">Nội Dung</label>
                          <input type="text" name="inputDetails" id="inputDetails" placeholder="Nhập nội dung..." value="${data.noidung}">
                      </div>
      
                      <div class="group-input">
                          <label for="inputLinkYoutube">Link Youtube</label>
                          <input type="text" name="inputLinkYoutube" id="inputLinkYoutube" placeholder="Nhập link youtube..." value="${data.link}">
                      </div>
      
                      <div class="group-input">
                          <label for="inputImage">Ảnh Nền</label>
                          <input type="text" name="inputImage" id="inputImage" placeholder="Nhập link ảnh nền..." value="${data.image}">
                      </div>

                      <button class="btn-action" data-id="${id}">Xác Nhận</button>
                  </form>
              </div>
            </div>
          `;
          $(".screen-box").html(base);
          $(".screen-box").show();
          EventButtonClose();
          EventAcceptEdit();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        },
      });
    });
  });
}

function EventButtonCreate() {
  $(".btn-add").click(() => {
    var base = `
      <div class="screen-focus">
        <div class="btn-close">x</div>
        <div class="title">Thêm Phim</div>
        <div class="screen-focus-box">
            <form action="">
                <div class="group-input">
                    <label for="inputName">Tên Phim</label>
                    <input type="text" name="inputName" id="inputName" placeholder="Nhập tên phim...">
                </div>

                <div class="group-input">
                    <label for="">Thể Loại</label>
                    <div class="custom-select">
                        <select id="inputFilmType">
                          <option value="Hành Động">Hành Động</option>
                          <option value="Tình Cảm">Tình Cảm</option>
                          <option value="Hài Hước">Hài Hước</option>
                          <option value="Cổ Trang">Cổ Trang</option>
                          <option value="Tâm Lý">Tâm Lý</option>
                          <option value="Hình Sự">Hình Sự</option>
                          <option value="Chiến Tranh">Chiến Tranh</option>
                          <option value="Thể Thao">Thể Thao</option>
                          <option value="Võ Thuật">Võ Thuật</option>
                          <option value="Hoạt Hình">Hoạt Hình</option>
                          <option value="Phiêu Lưu">Phiêu Lưu</option>
                          <option value="Viễn Tưởng">Viễn Tưởng</option>
                          <option value="Kinh Dị">Kinh Dị</option>
                          <option value="Thần Thoại">Thần Thoại</option>
                        </select>
                    </div>
                </div>

                <div class="group-input">
                    <label for="">Quốc Gia</label>
                    <div class="custom-select">
                        <select id="inputCountry">
                          <option value="Âu-Mỹ">Âu-Mỹ</option>
                          <option value="Trung Quốc">Trung Quốc</option>
                          <option value="Hàn Quốc">Hàn Quốc</option>
                          <option value="Việt Nam">Việt Nam</option>
                        </select>
                    </div>
                </div>

                <div class="group-input">
                    <label for="">Loại</label>
                    <div class="custom-select">
                        <select id="inputType">
                          <option value="Chiếu Rạp">Chiếu Rạp</option>
                          <option value="Phim Lẻ">Phim Lẻ</option>
                          <option value="Phim Bộ">Phim Bộ</option>
                        </select>
                    </div>
                </div>

                <div class="group-input">
                    <label for="inputDate">Năm Phát Hành</label>
                    <input type="number" name="inputDate" id="inputDate" placeholder="Nhập năm phát hành...">
                </div>

                <div class="group-input">
                    <label for="inputAuthor">Đạo Diễn</label>
                    <input type="text" name="inputAuthor" id="inputAuthor" placeholder="Nhập đạo diễn...">
                </div>
                
                <div class="group-input">
                    <label for="inputCharacter">Diễn Viên</label>
                    <input type="text" name="inputCharacter" id="inputCharacter" placeholder="Nhập diễn viên...">
                </div>

                <div class="group-input">
                    <label for="inputTotalTime">Thời Lượng</label>
                    <input type="text" name="inputTotalTime" id="inputTotalTime" placeholder="Nhập thời lượng...">
                </div>

                <div class="group-input">
                    <label for="inputSpecial">Đặc Biệt</label>
                    <input type="text" name="inputSpecial" id="inputSpecial" placeholder="HD|Vietsub, Thuyết Minh...">
                </div>

                <div class="group-input">
                    <label for="inputDetails">Nội Dung</label>
                    <input type="text" name="inputDetails" id="inputDetails" placeholder="Nhập nội dung...">
                </div>

                <div class="group-input">
                    <label for="inputLinkYoutube">Link Youtube</label>
                    <input type="text" name="inputLinkYoutube" id="inputLinkYoutube" placeholder="Nhập link youtube...">
                </div>

                <div class="group-input">
                    <label for="inputImage">Ảnh Nền</label>
                    <input type="text" name="inputImage" id="inputImage" placeholder="Nhập link ảnh nền...">
                </div>

                <button class="btn-action">Xác Nhận</button>
            </form>
        </div>
      </div>
    `;
    $(".screen-box").html(base);
    $(".screen-box").show();
    EventButtonClose();
    EventAcceptCreate();
  });
}

function EventButtonDelete() {
  let groupButtonDelete = document.querySelectorAll(".btn-delete");
  groupButtonDelete.forEach((btn) => {
    $(btn).click(() => {
      let id = $(btn).parent().data().id;

      fetch(`https://beautiful-tan-pantyhose.cyclic.app/film/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setTimeout(() => {
        RenderRightPage("list-film");
      }, 500);
    });
  });
}

function RenderRightPage(type) {
  var rigtPage = ``;
  if (type == "statistical") {
    $.ajax({
      url: `https://beautiful-tan-pantyhose.cyclic.app/statistical`,
      method: "GET",
      success: function (data) {
        let totalAccess = data.tongsoluottruycap;
        rigtPage += `
          <div class="header">
              <div class="title">Thống Kê</div>
          </div>
          <div class="statistical">
              <div class="box-statistical">
                  <div class="box">
                      <span class="title-box-statistical">
                          Số lượt truy cập vào trang web
                      </span>
                      <span class="title-box-content">
                          <i class="fa-solid fa-calendar-check"></i>
                          ${totalAccess}
                      </span>
                  </div>
              </div>
        `;
        $.ajax({
          url: `https://beautiful-tan-pantyhose.cyclic.app/users`,
          method: "GET",
          success: function (data) {
            let sumUser = 0;
            data.forEach((user) => {
              if (user.permission != "admin") {
                sumUser += 1;
              }
            });
            rigtPage += `
                <div class="box-statistical">
                  <div class="box">
                      <span class="title-box-statistical">
                          Tổng số tài khoản
                      </span>
                      <span class="title-box-content">
                        <i class="fa-solid fa-user"></i>
                        ${sumUser}
                      </span>
                    </div>
                </div>
              `;
            $.ajax({
              url: `https://beautiful-tan-pantyhose.cyclic.app/film`,
              method: "GET",
              success: function (data) {
                let countFilm = data.length;
                let countLike = 0;
                let countStarTurn = 0;
                let countPoint = 0;
                data.forEach((film) => {
                  countLike += film.like;
                  countStarTurn += film.luotdanhgia;
                  countPoint += Math.floor(
                    film.danhgia / film.luotdanhgia || 0
                  );
                });
                rigtPage += `
                        <div class="box-statistical">
                            <div class="box">
                                <span class="title-box-statistical">
                                    Tổng Số Phim
                                </span>
                                <span class="title-box-content">
                                    <i class="fa-solid fa-film"></i>
                                    ${countFilm}
                                </span>
                            </div>
                        </div>
                        <div class="box-statistical">
                            <div class="box">
                                <span class="title-box-statistical">
                                    Số lượt thích các bộ phim
                                </span>
                                <span class="title-box-content">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                    ${countLike}
                                </span>
                            </div>
                        </div>
                        <div class="box-statistical">
                            <div class="box">
                                <span class="title-box-statistical">
                                    Tổng số lượt đánh giá
                                </span>
                                <span class="title-box-content">
                                    <i class="fa-solid fa-star"></i>
                                    ${countStarTurn}
                                </span>
                            </div>
                        </div>
                        <div class="box-statistical">
                            <div class="box">
                                <span class="title-box-statistical">
                                    Số điểm trung bình của các bộ phim
                                </span>
                                <span class="title-box-content">
                                    <i class="fa-solid fa-check-double"></i>
                                    ${Math.ceil(countPoint / countFilm) + ".0"}
                                </span>
                            </div>
                        </div>
                    </div>
                  `;
                $(".right-content").html(rigtPage);
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
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      },
    });
  } else if (type == "list-film") {
    rigtPage += `
      <div class="header">
        <div class="title">Danh sách các phim</div>
        <span class="btn-add">Thêm</span>
      </div>

      <table class="first-table">
          <tr class="first-tr">
              <th>ID</th>
              <th>Tên</th>
              <th>Số Lượt Truy Cập</th>
              <th>Số Lượt Đánh Giá</th>
              <th>Điểm Đánh Giá Phim</th>
              <th>Số Lượt Thích</th>
              <th>Tương Tác</th>
          </tr>
      </table>
      <div class="list-film">
        <table class="table-film">
    `;
    $.ajax({
      url: `https://beautiful-tan-pantyhose.cyclic.app/film`,
      method: "GET",
      success: function (data) {
        data.forEach((film) => {
          rigtPage += `
            <tr>
                <th>${film.id}</th>
                <th>${film.ten}</th>
                <th>${film.luottruycap}</th>
                <th>${film.luotdanhgia}</th>
                <th>${Math.floor(film.danhgia / film.luotdanhgia) || 0}</th>
                <th>${film.like}</th>
                <th>
                    <div class="group-button-table-film" data-id="${film.id}">
                        <span class="btn btn-delete">Xóa</span>
                        <span class="btn btn-edit">Sửa</span>
                        <span class="btn btn-details">Chi Tiết</span>
                    </div>
                </th>
            </tr>
          `;
        });
        rigtPage += `
            </table>
          </div>
        `;
        $(".right-content").html(rigtPage);
        EventButtonDetails();
        EventButtonEdit();
        EventButtonCreate();
        EventButtonDelete();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      },
    });
  }
}

function RenderAdminPage() {
  var base = `
    <div class="left-content">
        <div class="header flex-center">
            <div class="logo-brand">
                <img src="https://cdn.discordapp.com/attachments/1085804453246009374/1085828963034734642/logo.png" alt="">
            </div>
            <div id="btn-logout"><i class="fa-solid fa-right-from-bracket"></i></div>
        </div>
        <div class="body">
            <div class="options">
                <span class="title">Thống Kê</span>
                <div class="option">
                    <div class="option-box active" data-type="statistical">
                        <i class="fa-solid fa-layer-group"></i>
                        <span>Thống Kê</span>
                        <i class="fa-solid fa-caret-right"></i>
                    </div>
                </div>
            </div>
            <div class="options">
                <span class="title">Phim</span>
                <div class="option">
                    <div class="option-box" data-type="list-film">
                        <i class="fa-solid fa-layer-group"></i>
                        <span>Danh Sách Phim</span>
                        <i class="fa-solid fa-caret-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="right-content"></div>
  `;

  $(".container").html(base);
  RenderRightPage("statistical");
  AddEventButtonLogOut();
  AddEventButtonOptionBox();
}

$(document).ready(function () {
  $(".screen-box").hide();
  RenderAdminPage();
});

// test = () => {
//   for(var i = 0; i < 60; i++) {
//     console.log(`<option value="${i}">${i}</option>`);
//   }
// }
