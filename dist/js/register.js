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

ValidateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
  AlertElement(3000, "Email không hợp lệ!", "danger", icon["danger"]);
  return false;
};

ValidatePassword = (password) => {
  let strings = password;
  let i = 0;
  let character = "";
  let number = false;
  let upper = false;
  let lower = false;

  while (i <= strings.length) {
    character = strings.charAt(i);
    if (!isNaN(character * 1)) {
      number = true;
    } else {
      if (character == character.toUpperCase()) {
        upper = true;
      }
      if (character == character.toLowerCase()) {
        lower = true;
      }
    }
    i++;
  }

  if (number && upper && lower && strings.length >= 8 && strings.length <= 25)
    return true;
  else return false;
};

CheckDupicatePhone = (phone, password, doubleCheckPassword) => {
  $.ajax({
    url: "http://localhost:3000/users/",
    method: "GET",
    success: function (data) {
      let nextStep = true;
      data.forEach((user) => {
        if (phone == user.sdt) {
          nextStep = false;
        }
      });
      if (!nextStep) {
        AlertElement(
          3000,
          "Số điện thoại đã được đăng ký!",
          "danger",
          icon["danger"]
        );
      } else {
        if (password == doubleCheckPassword && ValidatePassword(password)) {
          $(".form-register-content").addClass("runaway");
          setTimeout(() => {
            $(".form-register-content").removeClass("runaway");
            ContinueRegister(phone, password);
          }, 700);
        } else {
          $("#validatePassword").addClass("d-none");
          $("#doubleCheckPassword").addClass("d-none");
          if (!ValidatePassword(password)) {
            $("#validatePassword").removeClass("d-none");
          }
          if (password != doubleCheckPassword) {
            $("#doubleCheckPassword").removeClass("d-none");
          }
        }
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    },
  });
};

CheckDupicateEmail = (phone, password, fullname, email) => {
  $.ajax({
    url: "http://localhost:3000/users/",
    method: "GET",
    success: function (data) {
      let success = true;
      data.forEach((user) => {
        if (email == user.email) {
          success = false;
        }
      });

      if (!success) {
        AlertElement(
          3000,
          "Địa chỉ Email đã được đăng ký!",
          "danger",
          icon["danger"]
        );
      } else {
        fetch("http://localhost:3000/users/", {
          method: "POST",
          body: JSON.stringify({
            hoten: fullname,
            email: email,
            sdt: phone,
            password: password,
            avatar: '',
            like: [],
            danhgia: []
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        $(".btn-register-form").off();
        $(".page").fadeOut(300);
        setTimeout(() => {
          window.location = "/login.html";
        }, 300);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);
    },
  });
};

AddBtnLogin = () => {
  $("#btnLogin").click((event) => {
    event.preventDefault();
    $(".page").fadeOut(300);
    setTimeout(() => {
      window.location = "/login.html";
    }, 300);
  });
};

AddBtnContinueRegister = () => {
  $(".btn-continue-register-form").click((event) => {
    event.preventDefault();
    let phone = $(".btn-continue-register-form")
      .parent()
      .children()
      .find("#phone-register-form")
      .val();
    let password = $(".btn-continue-register-form")
      .parent()
      .children()
      .find("#password-register-form")
      .val();
    let doubleCheckPassword = $(".btn-continue-register-form")
      .parent()
      .children()
      .find("#password-doublecheck-register-form")
      .val();

    if (phone == "" || password == "" || doubleCheckPassword == "") {
      AlertElement(
        2300,
        "Thông tin không được để trống!",
        "danger",
        icon["danger"]
      );
    } else {
      CheckDupicatePhone(phone, password, doubleCheckPassword);
    }
  });
};

AddBtnRegister = (phone, password) => {
  $(".btn-register-form").click((event) => {
    event.preventDefault();
    let fullname = $(".btn-register-form")
      .parent()
      .children()
      .find("#fullname-register-form")
      .val();
    let email = $(".btn-register-form")
      .parent()
      .children()
      .find("#email-register-form")
      .val();
    let acceptPolicy = $("#cbAcceptPolicy").is(":checked");
    if (fullname == "" || email == "") {
      AlertElement(
        3000,
        "Thông tin không được để trống!",
        "danger",
        icon["danger"]
      );
    } else if (!acceptPolicy) {
      AlertElement(
        3000,
        "Bạn cần đồng ý chấp hành những điều khoản của chúng tôi!",
        "danger",
        icon["danger"]
      );
    } else {
      if (!ValidateEmail(email)) return;
      CheckDupicateEmail(phone, password, fullname, email);
    }
  });
};

AddBtnBackRegister = () => {
  $(".btn-back-register-form").click((event) => {
    event.preventDefault();
    $(".form-register-content").addClass("runaway");
    setTimeout(() => {
      $(".form-register-content").removeClass("runaway");
      BackRegister();
    }, 700);
  });
};

BackRegister = () => {
  $(".form-register-content").hide();
  $(".form-register-content").html(`
        <div class="header-form-register-content">
            <h1 class="title-welcome">CTBank kính chào!</h1>
            <span class="title-signup">
                Bạn đã có tài khoản?
                <a href="" id="btnLogin">Đăng Nhập</a>
            </span>
        </div>

        <form action="">
            <div class="form-group-register mt-4">
                <label class="form-register-label" for="phone-register-form">Số Điện Thoại</label>
                <input type="number" onkeydown="return (event.keyCode !== 69 && event.keyCode !== 107 && event.keyCode !== 189 && event.keyCode !== 187)" class="form-control form-register-input mt-1" id="phone-register-form" placeholder="Nhập số điện thoại">
            </div>

            <div class="form-group-register mt-3">
                <label class="form-register-label" for="password-register-form">Mật Khẩu</label>
                <input type="password" class="form-control form-register-input mt-1" id="password-register-form" placeholder="Nhập mật khẩu">
            </div>

            <div class="form-group-register mt-3">
                <label class="form-register-label" for="password-doublecheck-register-form">Nhập Lại Mật Khẩu</label>
                <input type="password" class="form-control form-register-input mt-1" id="password-doublecheck-register-form" placeholder="Nhập lại mật khẩu">
            </div>
            
            <button type="button" class="btn btn-continue-register-form mt-4">
                Tiếp Tục
                <i class="fa-solid fa-arrow-right arrow"></i>
            </button>
        </form>
    `);
  AddBtnLogin();
  AddBtnContinueRegister();
  $(".form-register-content").show();
  $(".form-register-content").addClass("comein");
  setTimeout(() => {
    $(".form-register-content").removeClass("comein");
  }, 700);
};

ContinueRegister = (phone, password) => {
  $(".form-register-content").hide();
  $(".form-register-content").html(`
        <button type="button" class="btn-back-register-form mt-2">
            <i class="fa-regular fa-circle-left"></i>
        </button>

        <div class="header-form-register-content">
            <h1 class="title-welcome">CTBank kính chào!</h1>
            <span class="title-signup">
                Bạn đã có tài khoản?
                <a href="" id="btnLogin">Đăng Nhập</a>
            </span>
        </div>

        <form action="">
            <div class="form-group-register mt-4">
                <label class="form-register-label" for="fullname-register-form">Họ Tên</label>
                <input type="text" class="form-control form-register-input mt-1" id="fullname-register-form" placeholder="Nhập họ tên">
            </div>

            <div class="form-group-register mt-3">
                <label class="form-register-label" for="email-register-form">Email</label>
                <input type="email" class="form-control form-register-input mt-1" id="email-register-form" placeholder="Nhập email">
            </div>

            <div class="form-group-checkbox mt-3">
                <input class="form-check-register" type="checkbox" value="" id="cbAcceptPolicy">
                <label class="form-check-label form-group-checkbox-accept-policy-label" for="cbAcceptPolicy">
                    Tôi đồng ý với các điều khoản dịch vụ
                </label>
            </div>
            
            <button type="button" class="btn btn-register-form mt-4">
                <i class="fa-solid fa-shield shield"></i>
                Đăng Ký
            </button>
        </form> 
    `);
  AddBtnLogin();
  AddBtnBackRegister();
  AddBtnRegister(phone, password);
  $(".form-register-content").show();
  $(".form-register-content").addClass("comein");
  setTimeout(() => {
    $(".form-register-content").removeClass("comein");
  }, 700);
};

// Khi trang web mới load xong:
$(window).ready(() => {
  $(".page").hide();
  $("alert-danger").hide();
  LoadingDelay(1200);
  setTimeout(() => {
    AddBtnLogin();
    AddBtnContinueRegister();
    setTimeout(() => {
      $(".page").fadeIn(300);
    }, 300);
  }, 1200);
});
