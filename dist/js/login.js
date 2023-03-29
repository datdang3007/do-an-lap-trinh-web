var currentType = "";
var icon = {
  ["danger"]: '<i class="fa-sharp fa-solid fa-triangle-exclamation"></i>',
  ["success"]: '<i class="fa-solid fa-check"></i>',
};

LoadingDelay = (timeout) => {
  $(".loading-animation").fadeIn(300);
  setTimeout(() => {
    $(".loading-animation").fadeOut(300);
  }, timeout);
};

AlertElement = (timeout, msg, type, icon) => {
  $(".alert").html(`${icon}&emsp;${msg}`);
  $(".alert").addClass("alert-" + type);
  $(".alert").slideDown(300);
  setTimeout(() => {
    $(".alert").slideUp(300);
    setTimeout(() => {
      $(".alert").removeClass("alert-" + type);
    }, 300);
  }, timeout);
};

EventForInputPassword2 = (phone, password) => {
  var groupInputPassword2 = document.querySelectorAll('.input-password2');

  groupInputPassword2.forEach(input => {
    $(input).keyup(() => {
      if ($(input).val() != '') {
        let arr = $(input).val().split('');
        let correctNumber = [1,2,3,4,5,6,7,8,9,0]
        let correct = false
  
        for (i in arr) {
            for(j in correctNumber) {
                if (arr[i] == correctNumber[j]) {
                    correct = true;
                }
            }
        };
        if (!correct) {
          $(input).val() = '';
        };
        if ($(input).val()) {
          let no = $(input).data().no
          if (no < 4) {
            $(`#inputPassword2No${no+1}`).focus();
          }
        }
        if (arr.length > 1) {
          $(input).val(arr[1]);
        }
      };
    }).keypress(() => {
      return event.keyCode === 8 || event.charCode >= 48 && event.charCode <= 57
    });
  });

  $('.btn-login-admin').click(() => {
    let number1 = $(`#inputPassword2No1`).val();
    let number2 = $(`#inputPassword2No2`).val();
    let number3 = $(`#inputPassword2No3`).val();
    let number4 = $(`#inputPassword2No4`).val();
    
    if (number1 != '' && number2 != '' && number3 != '' && number4 != '')  {
      let password2 = number1 + number2 + number3 + number4;
      $.ajax({
        url: "https://beautiful-tan-pantyhose.cyclic.app/users/",
        method: "GET",
        success: function (data) {
          let id;
          let success = false;
          data.forEach((user) => {
            if (phone == user.sdt && password == user.password && user.password2 == password2) {
              id = user.id;
              success = true;
            }
          });
          
          if (success) {
            $(".btn-login-form").off();
            $(".page").fadeOut(300);
            setTimeout(() => {
              window.location = `/admin.html`;
            }, 300);
          } else {
            AlertElement(
              2300,
              "Mật khẩu xác cấp 2 không đúng!",
              "danger",
              icon["danger"]
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        },
      });
    } else {
      AlertElement(
        2300,
        "Mật khẩu xác minh không được để trống!",
        "danger",
        icon["danger"]
      );
    };
  });
};

ContinueCheckPassword2 = (phone, password) => {
  $(".form-login-content").hide();
  $('.form-login-content').html(`
    <div class="header-form-login-content">
      <h1 class="title-welcome">Xác Minh Mật Khẩu Cấp 2</h1>
    </div>
    <div class="form">
      <div class="group-input-password2 mt-5">
          <input class="input-password2" id="inputPassword2No1" data-no="1" type="number" min="1" step="1">
          <input class="input-password2" id="inputPassword2No2" data-no="2" type="number" min="1" step="1">
          <input class="input-password2" id="inputPassword2No3" data-no="3" type="number" min="1" step="1">
          <input class="input-password2" id="inputPassword2No4" data-no="4" type="number" min="1" step="1">
      </div>
      <button type="button" class="btn btn-login-admin mt-5">
          <i class="fa-solid fa-shield"></i>
          Xác Nhận
      </button>
    </div>
  `);
  EventForInputPassword2(phone, password);
  $(".form-login-content").show();
  $(".form-login-content").addClass("comein");
  setTimeout(() => {
    $(".form-login-content").removeClass("comein");
    $('#inputPassword2No1').focus();
  }, 700);
};

AddBtnLogin = () => {
  $(".btn-login-form").click((event) => {
    event.preventDefault();
    let phone = $(".btn-login-form")
      .parent()
      .children()
      .find("#phone-login-form")
      .val();
    let password = $(".btn-login-form")
      .parent()
      .children()
      .find("#password-login-form")
      .val();
    if (phone == "" || password == "") {
      AlertElement(
        2300,
        "Thông tin không được để trống!",
        "danger",
        icon["danger"]
      );
    } else {
      $.ajax({
        url: "https://beautiful-tan-pantyhose.cyclic.app/users/",
        method: "GET",
        success: function (data) {
          let id;
          let success = false;
          let perm = null;
          data.forEach((user) => {
            if (phone == user.sdt && password == user.password) {
              id = user.id;
              success = true;
              perm = user.permission
            }
          });
          
          if (success) {
            if (perm) {
              $(".form-login-content").addClass("runaway");
              setTimeout(() => {
                $(".form-login-content").removeClass("runaway");
                ContinueCheckPassword2(phone, password);
              }, 700);
            } else {
              $(".btn-login-form").off();
              $(".page").fadeOut(300);
              setTimeout(() => {
                window.location = `/home.html?userid=${id}`;
              }, 300);
            }
          } else {
            AlertElement(
              2300,
              "Số điện thoại hoặc mật khẩu không đúng!",
              "danger",
              icon["danger"]
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        },
      });
    }
  });
};

AddEvent = () => {
  $("#btnRegister").click((event) => {
    event.preventDefault();
    $(".page").fadeOut(300);
    setTimeout(() => {
      window.location = "/register.html";
    }, 300);
  });
};

RenderPageLogin = () => {
  $('.form-login-content').html(`
    <div class="header-form-login-content">
      <h1 class="title-welcome">Kính chào quý khách!</h1>
      <span class="title-signup">
          Bạn chưa có tài khoản?
          <a href="" id="btnRegister">Đăng Ký</a>
      </span>
    </div>

    <form action="">
      <div class="form-group-login mt-4">
          <label class="form-login-label" for="phone-login-form">Số Điện Thoại</label>
          <input type="number" min="1" step="1" onkeyup="
              let arr = this.value.split('');
              let correctNumber = [1,2,3,4,5,6,7,8,9,0]
              let correct = false

              for (i in arr) {
                  for(j in correctNumber) {
                      if (arr[i] == correctNumber[j]) {
                          correct = true;
                      }
                  }
              };
              if (!correct) {
                AlertElement(3500, 'Số điện thoại có chứa kí tự đặc biệt!', 'danger', icon['danger']);
                this.value = '';
              };"
          onkeypress="return event.keyCode === 8 || event.charCode >= 48 && event.charCode <= 57" class="form-control form-login-input mt-1" id="phone-login-form" placeholder="Nhập số điện thoại">
      </div>

      <div class="form-group-login mt-3">
          <label class="form-login-label" for="password-login-form">Mật Khẩu</label>
          <input type="password" class="form-control form-login-input mt-1" id="password-login-form" placeholder="Nhập mật khẩu">
      </div>

      <div class="form-group-checkbox mt-3">
          <input class="form-check-input" type="checkbox" value="" id="cbRememberme">
          <label class="form-check-label form-group-checkbox-rememberme-label" for="cbRememberme">
              Ghi nhớ tài khoản
          </label>
      </div>
      
      <button type="button" class="btn btn-login-form mt-3">
          <i class="fa-solid fa-shield"></i>
          Đăng Nhập
      </button>
    </form>
  `);
};

// Khi trang web mới load xong:
$(window).ready(() => {
  $(".page").hide();
  LoadingDelay(1200);
  RenderPageLogin();

  setTimeout(() => {
    AddEvent();
    setTimeout(() => {
      $(".page").fadeIn(300);
      AddBtnLogin();
    }, 300);
  }, 1200);
});
