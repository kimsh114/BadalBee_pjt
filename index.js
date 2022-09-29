const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
// cors
// 교차 출처 리소스 공유
// 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에
// 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제
// 웹 애플리케이션은 리소스가 자신의 출처 (도메인, 프로토콜, 포트)와 다를 때
// 교차 출처 HTTP 요청을 실행

const app = express();
const PORT = process.env.port || 8008;
// 포트 번호를 8008로 지정

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등...) 접근
};

app.use(cors(corsOptions));
// json 수정을 대신해서 안정적으로 설정할 수 있는 cors 설정

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "project",
});
// MySQL 데이터 베이스에 접근해서 정보를 수정할 수 있는 설정

// app.listen(PORT, () => {
//   console.log(`Running on PORT ${PORT}`);
// });

const multer = require("multer"); //파일 업로드
const path = require("path"); //경로
const fs = require("fs"); //파일다룰 수 있는 패키지
const parse = require("path");

try {
  //업로드 폴더가 존재하는지 확인하고 없으면 업로드 폴더를 만든다.
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  // 멀터라는클래스로 객체 만들기
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/"); //다른 경로로 설정하고 싶으면 경로만 설정해주면 된다.  현재 문서의 위치를 기준으로 적어준다
    },
    filename(req, file, done) {
      //파일 이름을 어떻게 설정할 것인가 오리지날 파일 이름을 쓰고 싶으면 그냥 저장하고, 같은 이름이 있으면 확장자를 제외한 이름만 추출하고 현재 시간을 가져오고 다시 확장자를 붙여준다.
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use("/uploads", express.static("uploads"));

app.post("/login", (req, res) => {
  var id = req.body.user_id;
  var pw = req.body.user_pw;

  const sqlQuery =
    "SELECT COUNT(*) AS 'cnt' FROM userinfo_tbl WHERE user_id = ? AND user_pw = ?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    res.send(result);
    // console.log(result[0]);

    // if (result[0].cnt === 1) {
    //   // res.json({ message: 'Success' });
    //   res.send({ message: 'Success' });
    // } else {
    //   // res.json({ message: 'Fail' });
    //   res.send({ message: 'Fail' });
    // }
  });
});

app.post("/member", (req, res) => {
  var id = req.body.user_id;
  var pw = req.body.user_pw;
  var name = req.body.user_name;
  var email = req.body.user_email;
  var address = req.body.user_address;
  var phone = req.body.user_phone;

  const sqlQuery = "INSERT INTO userinfo_tbl VALUES (?, ?, ?, ?, ?, ?);";
  db.query(sqlQuery, [id, pw, name, email, address, phone], (err, result) => {
    res.send(result);
  });
});

app.post("/storelogin", (req, res) => {
  var id = req.body.store_id;
  var pw = req.body.store_pw;

  const sqlQuery =
    "SELECT COUNT(*) AS 'cnt' FROM storeinfo_tbl WHERE store_id = ? AND store_pw = ?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    res.send(result);
  });
});

app.post("/storemember", (req, res) => {
  var id = req.body.store_id;
  var pw = req.body.store_pw;
  var name = req.body.store_name;
  var pname = req.body.store_pname;
  var phone = req.body.store_phone;
  var category = req.body.store_category;
  var address = req.body.store_address;
  var operationHour = req.body.store_operationHour;
  var closedDay = req.body.store_closedDay;
  var deliveryFee = req.body.store_deliveryFee;
  var miniPrice = req.body.store_miniPrice;

  const sqlQuery =
    "INSERT INTO storeinfo_tbl VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  db.query(
    sqlQuery,
    [
      id,
      pw,
      name,
      pname,
      phone,
      category,
      address,
      operationHour,
      closedDay,
      deliveryFee,
      miniPrice,
    ],
    (err, result) => {
      res.send(result);
      console.error(err);
    }
  );
});

app.post("/list", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var store_id = req.body.store_id;

  const start_limit = (page_num - 1) * page_size;

  const sqlQuery =
    'SELECT BOARD_NUM, BOARD_TITLE, BOARD_WRITER, BOARD_LOCATION, DATE_FORMAT(BOARD_DATE, "%y-%m-%d") AS BOARD_DATE, TIME_TO_SEC(DATE_ADD(board_date, INTERVAL (board_time) MINUTE)) AS BOARD_TIME FROM board_tbl WHERE board_storeId = ? ORDER BY BOARD_NUM DESC LIMIT ?, ?;';
  db.query(sqlQuery, [store_id, start_limit, page_size], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});
// DB 테이블 가져오기

app.post("/mypageinfolist", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var mypage_userId = req.body.mypage_userId;
  // var user_pw = req.body.user_pw;

  const start_limit = (page_num - 1) * page_size;

  const sqlQuery =
    "SELECT user_id, user_pw, user_name, user_email, user_address, user_phone FROM userinfo_tbl WHERE user_id = ? LIMIT ?, ?;";
  db.query(sqlQuery, [mypage_userId, start_limit, page_size], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});
// DB 테이블 가져오기

app.post("/storelist", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var url = req.body.url;

  const start_limit = (page_num - 1) * page_size;

  const sqlQuery =
    "SELECT store_id, store_name, store_phone, store_deliveryFee, store_address, store_miniPrice FROM storeInfo_tbl WHERE store_category = ?;";
  db.query(sqlQuery, [url], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});
// DB 테이블 가져오기

app.post("/minilist", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var number = parseInt(req.body.number);

  const start_limit = (page_num - 1) * page_size;

  // const sqlQuery_data =
  //   'UPDATE comment_tbl, board_tbl SET comment_tbl.comment_boardNum = board_tbl.board_num ';
  // db.query(sqlQuery_data)

  const sqlQuery =
    "SELECT comment_num, comment_name, comment_content, comment_price, comment_userId FROM comment_tbl WHERE comment_boardNum = ? LIMIT ?, ?;";
  db.query(sqlQuery, [number, start_limit, page_size], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});

app.post("/menulist", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var menu_storeId = req.body.menu_storeId;

  const start_limit = (page_num - 1) * page_size;

  const sqlQuery =
    "SELECT menu_storeId, menu_pictureUrl, menu_name, menu_price FROM menu_tbl WHERE menu_storeId = ? LIMIT ?, ?;";
  db.query(sqlQuery, [menu_storeId, start_limit, page_size], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});
// DB 테이블 가져오기

app.post("/usermenulist", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var store_id = req.body.store_id;

  const start_limit = (page_num - 1) * page_size;

  const sqlQuery =
    "SELECT menu_storeId, menu_pictureUrl, menu_name, menu_price FROM menu_tbl WHERE menu_storeId = ? LIMIT ?, ?;";
  db.query(sqlQuery, [store_id, start_limit, page_size], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});
// DB 테이블 가져오기

app.post("/orderlist", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송
  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var store_id = req.body.store_id;
  var board_num = req.body.board_num;
  var user_id = req.body.user_id;

  const start_limit = (page_num - 1) * page_size;

  const sqlQuery =
    "SELECT order_menuName, order_price, order_userId, order_id FROM order_tbl WHERE (order_boardNum = ? && order_userId = ?) LIMIT ?, ?;";
  db.query(
    sqlQuery,
    [board_num, user_id, start_limit, page_size],
    (err, result) => {
      res.send(result);
      // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
      // 여기서 result는 검색한 내용이 담겨져 있음
    }
  );
});

app.post("/mypagelist", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var page_num = parseInt(req.body.page_num);
  var page_size = parseInt(req.body.page_size);
  var mypage_userId = req.body.mypage_userId;

  console.error();

  const start_limit = (page_num - 1) * page_size;

  const sqlQuery =
    'SELECT DATE_FORMAT(mypage_date, "%y-%m-%d %h:%i:%s") AS MYPAGE_DATE, mypage_nickname, mypage_menuname, mypage_price FROM mypage_tbl WHERE mypage_userId = ? ORDER BY MYPAGE_DATE DESC LIMIT ?, ?;';
  db.query(sqlQuery, [mypage_userId, start_limit, page_size], (err, result) => {
    res.send(result);

    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});

app.post("/count", (req, res) => {
  var store_id = req.body.store_id;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM board_tbl WHERE board_storeId = ?;";
  db.query(sqlQuery, [store_id], (err, result) => {
    res.send(result);
  });
});

app.post("/mypageinfocount", (req, res) => {
  var user_id = req.body.user_id;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM userinfo_tbl WHERE user_id = ?;";
  db.query(sqlQuery, [user_id], (err, result) => {
    res.send(result);
  });
});

app.post("/minicount", (req, res) => {
  var number = req.body.number;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM comment_tbl WHERE comment_boardNum = ?;";
  db.query(sqlQuery, [number], (err, result) => {
    res.send(result);
  });
});

app.post("/storecount", (req, res) => {
  var url = req.body.url;
  // var number = req.body.number;
  // console.log(number);

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM storeInfo_tbl WHERE store_category = ?;";
  db.query(sqlQuery, [url], (err, result) => {
    res.send(result);
  });
});

app.post("/menucount", (req, res) => {
  var menu_storeId = req.body.menu_storeId;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM menu_tbl WHERE menu_storeId = ?;";
  db.query(sqlQuery, [menu_storeId], (err, result) => {
    res.send(result);
  });
});

app.post("/usermenucount", (req, res) => {
  var store_id = req.body.store_id;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM menu_tbl WHERE menu_storeId = ?;";
  db.query(sqlQuery, [store_id], (err, result) => {
    res.send(result);
  });
});

app.post("/ordercount", (req, res) => {
  var board_num = req.body.board_num;
  var user_id = req.body.user_id;

  const sqlQuery =
    "SELECT COUNT(*) AS COUNT FROM order_tbl WHERE (order_boardNum = ? && order_userId = ?);";
  db.query(sqlQuery, [board_num, user_id], (err, result) => {
    res.send(result);
  });
});

app.post("/mypagecount", (req, res) => {
  var mypage_userId = req.body.mypage_userId;

  console.log("asdasdasdasd");

  const sqlQuery =
    "SELECT COUNT (*) AS COUNT FROM Mypage_tbl WHERE mypage_userId = ?;";
  db.query(sqlQuery, [mypage_userId], (err, result) => {
    res.send(result);
  });
});

app.post("/insert", (req, res) => {
  var title = req.body.title;
  var writer = req.body.writer;
  var content = req.body.content;
  var location = req.body.location;
  var storeId = req.body.storeId;
  var time = req.body.time;

  const sqlQuery =
    "INSERT INTO board_tbl (BOARD_WRITER, BOARD_TITLE, BOARD_CONTENT, BOARD_LOCATION, BOARD_STOREID, BOARD_TIME) VALUES (?, ?, ?, ?, ?, ?);";
  // (?, ?, ?) : [writer, title, content]를 파라미터 값으로 받아온다는 의미
  db.query(
    sqlQuery,
    [writer, title, content, location, storeId, time],
    (err, result) => {
      // res.send(result);
      res.send("확인");
      // 여기서 result는 아무 내용이 담겨있지 않음
    }
  );
});
// DB 테이블에 내용 삽입하기

app.post("/miniinsert", (req, res) => {
  var comment_name = req.body.comment_name;
  var comment_content = req.body.comment_content;
  var comment_price = req.body.comment_price;
  var comment_boardNum = req.body.comment_boardNum;
  var comment_userId = req.body.comment_userId;

  // const sqlQuery_sel =
  //   'SELECT board_num FROM board_tbl';

  const sqlQuery =
    "INSERT INTO comment_tbl (comment_name, comment_content, comment_price, comment_boardNum, comment_userId) VALUES (?, ?, ?, ?, ?);";
  // (?, ?, ?) : [writer, title, content]를 파라미터 값으로 받아온다는 의미
  db.query(
    sqlQuery,
    [
      comment_name,
      comment_content,
      comment_price,
      comment_boardNum,
      comment_userId,
    ],
    (err, result) => {
      // res.send(result);
      res.send("확인");
      // 여기서 result는 아무 내용이 담겨있지 않음
    }
  );

  // const sqlQuery =
  //   'INSERT INTO comment_tbl (comment_name, comment_content, comment_price) VALUES (?, ?, ?);';
  // // (?, ?, ?) : [writer, title, content]를 파라미터 값으로 받아온다는 의미
  // db.query(sqlQuery, [comment_name, comment_content, comment_price], (err, result) => {
  //   // res.send(result);
  //   res.send('확인');
  //   // 여기서 result는 아무 내용이 담겨있지 않음
  // });
});

app.post("/mypageinsert", (req, res) => {
  var mypage_userid = req.body.mypage_userid;
  var mypage_nickname = req.body.mypage_nickname;
  var mypage_menuname = req.body.mypage_menuname;
  var mypage_price = req.body.mypage_price;

  const sqlQuery =
    "INSERT INTO MYPAGE_TBL (MYPAGE_USERID, MYPAGE_NICKNAME, MYPAGE_MENUNAME, MYPAGE_PRICE) VALUES (?, ?, ?, ?);";
  // (?, ?, ?) : [writer, title, content]를 파라미터 값으로 받아온다는 의미
  db.query(
    sqlQuery,
    [mypage_userid, mypage_nickname, mypage_menuname, mypage_price],
    (err, result) => {
      // res.send(result);
      res.send("확인");
      // 여기서 result는 아무 내용이 담겨있지 않음
    }
  );
});

app.post("/menuinsert", upload.single("menu_pictureUrl"), (req, res) => {
  //insert 실제 파일의 업로드가 여기서 발생한다. 여러개 업로드하고싶으면 교재를 참조해라 3가지 예시를 통해서 확인이 가능하다.
  var storeId = req.body.menu_storeId;
  var name = req.body.menu_name;
  var price = req.body.menu_price;

  const sqlQuery =
    "INSERT INTO menu_tbl (menu_pictureUrl, menu_name, menu_price, menu_storeId) values (?, ?, ?, ?);"; // 컬럼 추가
  db.query(
    sqlQuery,
    [req.file.filename, name, price, storeId], // 데이터베이스에 실제 업로드할 파일 이름을 가리킨다.
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/detail", (req, res) => {
  var num = parseInt(req.body.num);

  const sqlQuery =
    'SELECT BOARD_NUM, BOARD_TITLE, BOARD_WRITER, BOARD_CONTENT, BOARD_LOCATION, DATE_FORMAT(BOARD_DATE, "%y-%m-%d") AS BOARD_DATE, BOARD_TIME FROM board_tbl WHERE BOARD_NUM = ?;';
  db.query(sqlQuery, [num], (err, result) => {
    res.send(result);
  });
});

app.post("/mypagedetail", (req, res) => {
  var user_id = req.body.user_id;

  const sqlQuery =
    "SELECT user_id, user_pw, user_name, user_email, user_address, user_phone FROM userinfo_tbl WHERE user_id = ?;";
  db.query(sqlQuery, [user_id], (err, result) => {
    res.send(result);
  });
});

app.post("/mypageuserinfodetail", (req, res) => {
  var user_id = req.body.user_id;

  const sqlQuery =
    "SELECT user_id, user_pw, user_name, user_email, user_address, user_phone FROM userinfo_tbl WHERE user_id = ?;";
  db.query(sqlQuery, [user_id], (err, result) => {
    console.log("user_id 너 어디살아? 뒤질래? 왜안나와", user_id);
    res.send(result);
  });
});

app.post("/minidetail", (req, res) => {
  var comment_num = req.body.comment_num;

  const sqlQuery =
    "SELECT comment_num, comment_name, comment_content, comment_price FROM comment_tbl WHERE comment_num = ?;";
  db.query(sqlQuery, [comment_num], (err, result) => {
    res.send(result);
  });
});

app.post("/menudetail", (req, res) => {
  var menu_storeId = parseInt(req.body.menu_storeId);

  const sqlQuery =
    "SELECT menu_pictureUrl, menu_name, menu_price FROM menu_tbl WHERE menu_storeId = ?;";
  db.query(sqlQuery, [menu_storeId], (err, result) => {
    res.send(result);
  });
});

app.post("/update", (req, res) => {
  var title = req.body.article.board_title;
  var content = req.body.article.board_content;
  var location = req.body.article.board_location;
  var num = req.body.article.board_num;

  const sqlQuery =
    "UPDATE board_tbl SET BOARD_TITLE = ?, BOARD_CONTENT = ?, board_location = ?, BOARD_DATE = NOW() WHERE BOARD_NUM = ?;";
  db.query(sqlQuery, [title, content, location, num], (err, result) => {
    res.send(result);
  });
});

app.post("/mypageupdate", (req, res) => {
  var user_id = req.body.user_id;
  var user_pw = req.body.user_pw;
  var user_name = req.body.user_name;
  var user_email = req.body.user_email;
  var user_address = req.body.user_address;
  var user_phone = req.body.user_phone;
  var test = req.body.test;

  console.log(test);

  const sqlQuery =
    "UPDATE userinfo_tbl SET user_id = ?, user_pw = ?, user_name = ?, user_email = ?, user_address = ?, user_phone = ?;";
  db.query(
    sqlQuery,
    [user_id, user_pw, user_name, user_email, user_address, user_phone],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/miniupdate", (req, res) => {
  var comment_content = req.body.article.comment_content;
  var comment_price = req.body.article.comment_price;
  var comment_num = req.body.article.comment_num;

  const sqlQuery =
    "UPDATE comment_tbl SET comment_content = ?, comment_price = ? WHERE comment_num = ?;";
  db.query(
    sqlQuery,
    [comment_content, comment_price, comment_num],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/menuupdate", (req, res) => {
  var menu_pictureUrl = req.body.article.menu_pictureUrl;
  var menu_name = req.body.article.menu_name;
  var menu_price = req.body.article.menu_price;

  const sqlQuery =
    "UPDATE menu_tbl SET menu_pictureUrl = ?, menu_name = ?, menu_price = ? WHERE menu_name = ?;";
  db.query(
    sqlQuery,
    [menu_pictureUrl, menu_name, menu_price, menu_name],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/delete", (req, res) => {
  const num = req.body.num;

  const sqlQuery = "DELETE FROM board_tbl WHERE BOARD_NUM = ?;";
  db.query(sqlQuery, [num], (err, result) => {
    console.log(err);
    res.send(result);
  });
});

app.post("/mypagedelete", (req, res) => {
  const user_id = req.body.user_id;

  const sqlQuery = "DELETE FROM userinfo_tbl WHERE user_Id = ?;";
  db.query(sqlQuery, [user_id], (err, result) => {
    console.log(err);
    res.send(result);
  });
});

app.post("/minidelete", (req, res) => {
  const comment_num = req.body.comment_num;
  const comment_userId = req.body.comment_userId;
  const sqlQuery =
    "DELETE FROM comment_tbl WHERE comment_num = ? AND comment_userId = ?;";
  db.query(sqlQuery, [comment_num, comment_userId], (err, result) => {
    res.send(result);
  });
});

app.post("/menudelete", (req, res) => {
  const id = req.body.menu_name;

  const sqlQuery = "DELETE FROM menu_tbl WHERE menu_name = ?;";
  db.query(sqlQuery, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/orderdelete", (req, res) => {
  const order_id = req.body.num;

  const sqlQuery = "DELETE FROM order_tbl WHERE order_id = ?;";
  db.query(sqlQuery, [order_id], (err, result) => {
    // console.log(err);
    res.send(result);
  });
});

app.post("/pay", (req, res) => {
  var order_menuName = req.body.order_menuName;
  var order_boardNum = req.body.order_boardNum;
  var order_userId = req.body.order_userId;
  var order_price = req.body.order_price;

  const sqlQuery =
    "INSERT INTO order_tbl (order_menuName, order_boardNum, order_userId, order_price) VALUES (?, ?, ?, ?);";
  // (?, ?, ?) : [writer, title, content]를 파라미터 값으로 받아온다는 의미
  db.query(
    sqlQuery,
    [order_menuName, order_boardNum, order_userId, order_price],
    (err, result) => {
      // res.send(result);
      res.send("확인");
      // 여기서 result는 아무 내용이 담겨있지 않음
    }
  );
});

app.post("/mypage", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var mypage_userId = req.body.mypage_userId;
  var mypage_nickname = req.body.mypage_nickname;
  var mypage_menuName = req.body.mypage_menuName;
  var mypage_price = req.body.mypage_price;

  const sqlQuery =
    "SELECT mypage_userId, mypage_nickname, mypage_menuName, mypage_price FROM mypage_tbl WHERE mypage_userId = ?;";
  db.query(
    sqlQuery,
    [mypage_userId, mypage_nickname, mypage_menuName, mypage_price],
    (err, result) => {
      res.send(result);
      // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
      // 여기서 result는 검색한 내용이 담겨져 있음
    }
  );
});

app.post("/deliveryfee", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var store_id = req.body.store_id;

  const sqlQuery =
    "SELECT store_deliveryFee FROM storeInfo_tbl WHERE store_id = ?;";
  db.query(sqlQuery, [store_id], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});

app.post("/totalprice", (req, res) => {
  // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송

  var order_userId = req.body.order_userId;
  var order_boardNum = req.body.order_boardNum;

  const sqlQuery =
    "SELECT SUM(order_price) AS totalPrice FROM order_tbl WHERE (order_boardNum = ? && order_userid = ?);";
  db.query(sqlQuery, [order_boardNum, order_userId], (err, result) => {
    res.send(result);
    // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
    // 여기서 result는 검색한 내용이 담겨져 있음
  });
});

// app.post('/feedivide', (req, res) => {
//   // axios에서 get 방식으로 요청한 정보 중에 /list에 대한 정보를 서버에 전송
//   console.log('List');

//   var order_userId = req.body.order_userId;
//   var order_boardNum = req.body.order_boardNum;

//   console.log('------------------asasdaaasad', order_userId, order_boardNum);

//   const sqlQuery =
//     'SELECT SUM(order_price) AS totalPrice FROM order_tbl WHERE (order_boardNum = ? && order_userid = ?);';
//   db.query(sqlQuery, [order_boardNum, order_userId], (err, result) => {
//     res.send(result);
//     // select를 사용해서 가져올 결과물을 전달함 (객체 구조)
//     // 여기서 result는 검색한 내용이 담겨져 있음
//   });
// });

app.listen(PORT, () => {});
