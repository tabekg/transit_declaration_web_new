import { Button } from "react-bootstrap";
import qr_code from "../assets/QR.jpg";

// @ts-ignore
function ResultContainer({ data: props, goBack }) {
  const print = () => {
    // localStorage.setItem(
    //   "_data_",
    //   JSON.stringify([
    //     ...(JSON.parse(localStorage.getItem("_data_")) || []),
    //     props,
    //   ])
    // );
    window.print();
  };

  const ss_weight = props.supplementary_sheet.map(
    (g: any) => +g.ves_2_3 + +g.ves_2_2 + +g.ves_2_1 || 0
  );

  const weight = `${(
    Math.round(
      (+props.ves35 +
        ss_weight.reduce((p: any, a: any) => p + a, 0) +
        Number.EPSILON) *
        100
    ) / 100 || 0
  ).toFixed(3)}`;

  return (
    <>
      <div style={{ border: "none" }}>
        <div
          className="table_"
          style={{ fontFamily: "Times New Roman", border: "none" }}
        >
          <strong
            style={{
              fontSize: 25,
              display: "block",
              fontWeight: 900,
              marginTop: 180,
              margin: 150,
              marginBottom: 100,
            }}
          >
            URUMQI KAILINGDA INTERNATIONAL
            <br />
            TRADE CO LTD. КНР
          </strong>
          <strong
            style={{
              fontSize: 25,
              display: "block",
              fontWeight: 900,
              margin: 150,
              marginTop: 100,
            }}
          >
            LLC FE TASHKENT TRADE CENTER
            <br />
            УЗБЕКИСТАН
          </strong>
          <div
            style={{
              fontSize: 25,
              display: "block",
              fontWeight: 900,
              margin: 150,
              marginBottom: 80,
              marginLeft: 220,
            }}
          >
            УЗБЕКИСТАН
          </div>
          <div
            style={{
              fontSize: 22,
              display: "block",
              fontWeight: 900,
              margin: 150,
              marginTop: 30,
              marginBottom: 100,
              marginLeft: 290,
            }}
          >
            г. Ош Кыргызстан
          </div>
          <strong
            style={{
              fontSize: 20,
              display: "block",
              fontWeight: 900,
              margin: 150,
              marginBottom: 100,
            }}
          >
            ИНВОЙС {(props.dop44 || "").split("\n")[1].split(" ")[1]} ОТ{" "}
            {(props.dop44 || "").split("\n")[1].split(" ")[2]}
          </strong>
          <div
            style={{
              fontSize: 25,
              display: "block",
              fontWeight: 900,
              margin: 150,
              marginTop: 0,
              marginBottom: 200,
              marginLeft: 250,
            }}
          >
            {props.mst6} СОГЛАНО ПО ИНВОЙСУ
            <div style={{ display: "inline-block", marginLeft: 220 }}>
              {weight}кг
            </div>
          </div>
          <div
            style={{
              fontSize: 25,
              display: "block",
              fontWeight: 900,
              margin: 150,
              marginTop: 250,
              marginBottom: 200,
              marginLeft: 320,
            }}
          >
            <div style={{ display: "inline-block" }}>г. Ош</div>
            <div style={{ display: "inline-block", marginLeft: 200 }}>
              {(props.data || "").split(" ")[0]}
            </div>
          </div>
          <strong
            style={{
              fontSize: 22,
              display: "block",
              fontWeight: 900,
              marginTop: 180,
              margin: 150,
            }}
          >
            {(props.iden18 || "").split(": ")[1]}
          </strong>
        </div>
        <div className={"table_"}>
          <div className={"header div"}>
            <h3
              style={{
                marginLeft: 90,
                fontSize: 25,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              {" "}
              ТРАНЗИТНАЯ ДЕКЛАРАЦИЯ
            </h3>
          </div>
          <div className={"header_ri div"}>
            <span>
              {" "}
              <b> А </b> ОРГАН ОТПРАВЛЕНИЯ
            </span>
            <br />
            <span className={"content_span"} style={{ fontSize: 16.5 }}>
              {props.organ}
            </span>
            <br />
            <span
              style={{ fontSize: 16.5, lineHeight: 1 }}
              className={"content_span mt-3"}
            >
              Дата печати:{" " + props.data}
            </span>
            <br />
            <span
              style={{
                fontSize: 16.5,
                lineHeight: 1,
                position: "absolute",
                top: 90,
              }}
              className={"content_span"}
            >
              Данные на дату:{" " + props.dann}
            </span>
          </div>
          <div className={"shtrih div"}>
            <img className={"img"} src={qr_code} alt="" />
          </div>
          <div className={"exporter div"}>
            <span>2 Отправитель/Экспортер</span>
            <span style={{ position: "absolute", left: 250 }}>№</span>
            <br />
            <span className="content_span">{props.otprav}</span>
          </div>
          <div className={"declaration div"}>
            <span>1 ДЕКЛАРАЦИЯ</span>
            <span className={"tt"}>{props.tt}</span>
            <span className={"tp"}>{props.tp}</span>
          </div>
          <div className={"form div"}>
            <span style={{ marginTop: 0, paddingTop: 0 }}>3 Формы</span>
            <span className="num1">1</span>
            <span className="num2">
              {(props.supplementary_sheet.length + 1).toString()}
            </span>
          </div>
          <div className={"otpr div"}>
            <span
              style={{
                paddingTop: 0,
                marginTop: 0,
                marginRight: 0,
                whiteSpace: "nowrap",
              }}
            >
              4 Отгр. спец
            </span>
          </div>
          <div className="pod div">
            <span className={"pod_1"}>5 Всего т-ов</span>
            <span style={{ fontSize: 15, marginTop: "10px", marginLeft: 50 }}>
              {props.tv5}
            </span>
            <span className={"pod_2"}> </span>
            <span className={"pod_3"}>6 Всего мест </span>
            <span style={{ marginTop: "18px", marginLeft: 50, fontSize: 15 }}>
              {props.mst6}
            </span>
          </div>
          <div className="polu div">
            <span> 8 Получатель</span>
            <span style={{ position: "absolute", left: 200 }}>№</span>
            <br />
            <span
              style={{
                fontWeight: 500,
                paddingLeft: 5,
                fontSize: 14,
                display: "inline-block",
              }}
            >
              {props.get8}
            </span>
          </div>
          <div className="polu_2 div" />
          <div className="strana div" />
          <div className="strana_2 div">
            <div className={"strana_2_1 div"}>
              <div className={"strana_2_1_1 div"}>
                <span className={"title_span"}> 15 Страна отправления</span>
                <span className={"content_span"}> {props.strana}</span>
              </div>
              <div className={"strana_2_1_2 div"} />
            </div>
            <div className={"strana_2_2 div"}>
              <div className={"strana_2_1_1 div"} />
              <div className={"strana_2_1_2 div"}>
                <span className={"title_span"}> 17 Страна назначения</span>
                <span className={"content_span"}>{props.strnaz}</span>
              </div>
            </div>
          </div>
          <div className={"idenf div"}>
            <div style={{ left: 0 }} className="idenf_ _1_1 div">
              <span className={"title_span"}>
                18 Идентификация и страна регистрация ТС при
                отправлении/прибытии
              </span>
              <span className={"pod_indef"}>19 Kонт</span>
              <span
                style={{
                  position: "absolute",
                  top: 11,
                  paddingLeft: 10,
                  paddingTop: 10,
                  left: 440,
                  borderLeft: "1px solid",
                  height: 27,
                }}
                className={"content_span"}
              >
                {props.kont}
              </span>

              <span
                style={{
                  position: "absolute",
                  top: 24,
                  height: "50%",
                  borderLeft: "1px solid",
                  paddingRight: 10,
                  left: 390,
                  paddingLeft: 2,
                }}
                className={"content_span"}
              >
                {props.uz}
              </span>
              <span className={"content_span"}> {props.iden18}</span>
            </div>
            <div style={{ left: 0 }} className="idenf_ _1_2 div">
              <span className="title_span">
                21 Идентификация и страна регистрации активного трансп. средства
                на границе
              </span>
              <span className={"content_span"}>{props.iden21}</span>
              <span
                style={{
                  position: "absolute",
                  paddingBottom: 10,
                  right: 10,
                  height: 17,
                  borderLeft: "1px solid",
                  paddingLeft: 15,
                }}
                className="content_span"
              >
                {props.kg}
              </span>
            </div>
            <div style={{ left: 0 }} className="idenf_ _1_3 div">
              <span className="title_span">25 Вид транспорта</span>
              <span className={"content_span"}>
                <span className="avto1 content_span">21 {props.trans_num}</span>
                <span className="avto2">{props.trans}</span>
                <span className="avto3" />
              </span>
            </div>
            <div style={{ left: 0 }} className="idenf_ _1_4 div" />
          </div>
          <div className={"idenf_2 div"}>
            <div className="idenf_ _1_1 div">
              <div
                style={{
                  borderRight: "1px solid ",
                  width: 50,
                  marginTop: 15,
                  height: 34,
                }}
              />
            </div>

            <div className="idenf_ _1_2 div">
              <div
                style={{
                  borderRight: "1px solid ",
                  width: 50,
                  position: "absolute",
                  height: 49,
                  left: 236,
                }}
              />
              <div
                style={{
                  borderRight: "1px solid ",
                  width: 50,
                  position: "absolute",
                  height: 49,
                  left: 360,
                }}
              />
              <div
                style={{
                  borderRight: "1px solid ",
                  width: 50,
                  position: "absolute",
                  height: 35,
                  top: 14,
                  left: 400,
                }}
              />
              <div
                style={{
                  borderRight: "1px solid ",
                  width: 50,
                  position: "absolute",
                  height: 35,
                  top: 14,
                  left: 440,
                }}
              />
              <span className="title_span">
                22 Валюта и общая сумма по счету
              </span>
              <span
                style={{
                  paddingRight: 10,
                  paddingBottom: 5,
                  borderRight: "1px solid",
                }}
                className="content_span"
              >
                {props.usd22}
              </span>
              <span className="content_span">{props.summ}</span>
            </div>
            <div className="idenf_ _2_3 div" />
          </div>
          <div className="gruz_mest div" style={{ width: 90 }}>
            <span className="title_span">
              31 Грузовые места и описание товаров
            </span>
          </div>
          <div className="markirovka div">
            <span className="title_span">
              Маркировка и количество - Номера контейнеров - Количество и
              отличительные особенности
            </span>
            <span style={{ display: "block" }} className="content_span_2">
              {props.mar31}
            </span>
            <span className="content_span_2">{props.numb}</span>
            <br />
            <span className="content_span_2">{props.coli}</span>
            <span className="tovar2" style={{ height: 49 }}>
              <span className="title_span">32 Товар</span>
              <span
                style={{
                  padding: "0px 18px",
                  paddingBottom: 2,
                  borderRight: "1px solid",
                  fontSize: 14,
                }}
              >
                {props.tvr32}
              </span>
              <span style={{ fontSize: 14, fontWeight: 500 }}>№</span>
            </span>
          </div>
          <div className="cod div">
            <div className="cod_1 div">
              <span className={"cod_1_span_1"} style={{ width: "33.5%" }}>
                <span className="tite_span">33 Код товара</span>
                <br />
                <span style={{ marginTop: -15 }} className=" content_span_2">
                  {props.kod33}
                </span>
                <div
                  style={{
                    borderRight: "1px solid ",
                    width: 50,
                    position: "absolute",
                    height: 30,
                    left: 135,
                    top: 20,
                  }}
                />
                <div
                  style={{
                    borderRight: "1px solid ",
                    width: 50,
                    position: "absolute",
                    height: 40,
                    left: 185,
                    top: 10,
                  }}
                />
                <div
                  style={{
                    borderRight: "1px solid ",
                    width: 50,
                    position: "absolute",
                    height: 40,
                    left: 245,
                    top: 10,
                  }}
                />
                <span className={"cod_1_span_3"}>
                  <span className="tite_span" />
                </span>
              </span>
            </div>
            <div className="cod_2 div">
              <span style={{ width: "33.1%" }} className={"cod_1_span_1"}>
                <span className="tite_span" />
              </span>
              <span className={"cod_1_span_2"}>
                <span className="tite_span">35 Вес брутто (кг)</span>
                <span style={{ marginTop: -15 }} className=" content_span_2">
                  {(+props.ves35.replaceAll(",", ".")).toFixed(3)}
                </span>
              </span>
              <span className={"cod_1_span_3"}> </span>
            </div>
            <div className="cod_3 div">
              <span className={"cod_1_span_1"} style={{ width: "33.5%" }} />
              <span
                className={"cod_1_span_2"}
                style={{ height: "103%", left: "33.3%" }}
              >
                {" "}
              </span>
              <span className={"cod_1_span_3"}> </span>
            </div>
            <div className="col_4 div">
              <span className="title_span">
                40 Общая декларация/Предшествующий документ
              </span>
              <span style={{ marginTop: 12 }} className=" content_span_2">
                {props.decl40}
              </span>
            </div>
            <div className="col_5 div">
              <div className="col_5_1 div">
                <span className="title_span">41 Дополнит. единицы</span>
                <span
                  className={"content_span_2 mt-2"}
                  style={{ whiteSpace: "pre" }}
                >
                  {props.perv41}
                </span>
              </div>
              <div className="col_5_2 div">
                <span className="title_span">42 Валюта и стоимость товара</span>
                <span
                  style={{
                    marginLeft: 10,
                    paddingRight: 34,
                    paddingBottom: 10,
                    borderRight: "1px solid",
                  }}
                  className={"content_span"}
                >
                  {props.perv42}
                </span>
                <span
                  style={{ paddingTop: 10, marginLeft: 0 }}
                  className={"content_span"}
                >
                  {props.vtr42}
                </span>
              </div>
              <div className="col_6 div">
                <div className="col_6_1 div" />
                <div className="col_6_2 div">
                  <div
                    className={"div"}
                    style={{ width: 72, height: 48, left: -1, top: -1 }}
                  >
                    <span className="title_span">Код ДИ</span>
                    <span className="content_span">{props.koddi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dop_in div">
            <span className="title_span">
              44 Дополнит. информация/Представл. документы
            </span>
          </div>
          <div className="dop_in_1 div" style={{ left: 90, height: 139 }}>
            <span
              style={{
                display: "block",
                lineHeight: 1.2,
                margin: 5,
                whiteSpace: "pre-wrap",
              }}
              className="content_span"
            >
              {props.dop44}
            </span>
          </div>
          <div className="gruzki div">
            <span className="title_span">55 Перегру-зки</span>
          </div>
          <div className="local div">
            <div className="local_1 div">
              <div className="local_1_1 div">
                <span style={{ paddingTop: 5, marginLeft: 0 }}>
                  {" "}
                  Место и страна
                </span>
              </div>
              <div style={{ width: "99.6%" }} className="local_1_2 div">
                {" "}
                Идентификация и страна регистрации нового транспортного средства
              </div>
              <div className="local_1_3 div">
                <span
                  className="title_span"
                  style={{ paddingTop: 10, display: "inline-block" }}
                >
                  Конт.
                </span>
                <span
                  className="title_span"
                  style={{ paddingLeft: 120, display: "inline-block" }}
                >
                  Номер нового контейнера
                </span>
              </div>
              <div className="local_1_4 div">
                <span
                  className="title_span"
                  style={{ paddingTop: 10, display: "inline-block" }}
                >
                  Указать 1 если да 0 если нет
                </span>
              </div>
            </div>
            <div className="local_2 div">
              <div className="local_2_1 div">
                <span style={{ paddingTop: 5, marginLeft: 0 }}>
                  {" "}
                  Место и страна
                </span>
              </div>
              <div className="local_2_2 div" style={{ height: "24.5%" }}>
                {" "}
                Идентификация и страна регистрации нового транспортного средства
              </div>
              <div className="local_2_3 div">
                <span
                  className="title_span"
                  style={{ paddingTop: 10, display: "inline-block" }}
                >
                  Конт.
                </span>
                <span
                  className="title_span"
                  style={{ paddingLeft: 120, display: "inline-block" }}
                >
                  Номер нового контейнера
                </span>
              </div>
              <div className="local_2_4 div">
                <span
                  className="title_span"
                  style={{ display: "inline-block", marginTop: 12 }}
                >
                  Указать 1 если да 0 если нет
                </span>
              </div>
            </div>
          </div>
          <div className="podver_title div">
            <span className="title_span">
              F ПОДТВЕРЖ ДЕНИЕ КОМПЕТЕНТ-НЫХ ОРГАНОВ
            </span>
          </div>
          <div
            className="podver_1 div"
            style={{ left: 90, borderRight: "none" }}
          >
            <span className="tite_span_3"> Новые пломбы: Номер:</span>
            <span
              style={{ position: "absolute", bottom: 7, left: 0 }}
              className="tite_span_3"
            >
              {" "}
              Подпись:
            </span>
            <span
              style={{ position: "absolute", top: 0, left: 290 }}
              className="tite_span_3"
            >
              Тип:
            </span>
            <span
              style={{ position: "absolute", bottom: 7, right: 150 }}
              className="tite_span_3"
            >
              {" "}
              Печать:
            </span>
          </div>
          <div className="podver_2 div" style={{ left: 626 }}>
            <span className="tite_span_3"> Новые пломбы: Номер:</span>
            <span
              style={{ position: "absolute", bottom: 7, left: 0 }}
              className="tite_span_3"
            >
              {" "}
              Подпись:
            </span>
            <span
              style={{ position: "absolute", top: 0, left: 290 }}
              className="tite_span_3"
            >
              Тип:
            </span>
            <span
              style={{ position: "absolute", bottom: 7, right: 150 }}
              className="tite_span_3"
            >
              {" "}
              Печать:
            </span>
          </div>
          <div className="global div">
            <div className="global_head div" />
            <div className="global_prins div">
              <span className="title_span">50 Принципал</span>
              <span
                style={{ whiteSpace: "pre-wrap", lineHeight: 2.5 }}
                className="content_span_2"
              >
                {props.princ1}
              </span>
              <span
                style={{ position: "absolute", top: 0, left: 350 }}
                className="tite_span_3"
              >
                №
              </span>
              <span
                style={{ position: "absolute", top: 0, left: 540 }}
                className="tite_span_3"
              >
                Подпись
              </span>
              <span
                style={{ position: "absolute", top: 95, left: 5 }}
                className="title_span"
              >
                представленный:
              </span>
              <span
                style={{
                  display: "inline-block",
                  position: "absolute",
                  top: 120,
                  left: 5,
                }}
                className="title_span"
              >
                Место и дата:
              </span>
              <span
                style={{ position: "absolute", left: 110, top: 120 }}
                className="content_span_2"
              >
                {props.mest}
              </span>
            </div>
            <div className="global_organ div">
              <pre style={{ fontSize: 12 }}>
                <b style={{ fontSize: 14 }}> C</b> ОРГАН ОТПРАВЛЕНИЯ
              </pre>
              <span
                style={{ whiteSpace: "pre-wrap", lineHeight: 1.2, margin: 0 }}
                className="content_span"
              >
                {" "}
                {props.organC}
              </span>
            </div>
          </div>
          <div className="garanty div">
            <div className="garanty_title div">
              <span className="title_span"> 52 Гарантия</span>
            </div>
            <div className="garnaty_1 div">
              <span style={{ paddingTop: 10 }} className="content_span">
                {props.garant52}
              </span>
              <span style={{ position: "absolute", left: 690 }}>Код</span>
              <span
                style={{
                  position: "absolute",
                  left: 690,
                  top: 17,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {props.kod52}
              </span>
            </div>
            <div className="garnaty_2 div">
              <span className="title_span">53 Орган назначения (и страна)</span>
              <span className="content_span_2">{props.organ53}</span>
            </div>
          </div>
          <div className={"otmetki div"}>
            <div className="otmetki_1 div">
              <span className="title_span">
                <b> D</b> ОТМЕТКИ ОРГАНА ОТПРАВЛЕНИЯ
              </span>
              <span style={{ marginLeft: 50 }} className="title_span">
                Печать:
              </span>
              <br />
              <span className="title_span">Результат</span>
              <br />
              <br />
              <div style={{ border: "none" }}>
                <span style={{ marginTop: -20 }} className="title_span">
                  Наложенные пломбы
                  <span className={"razm"}> {props.plomb}</span>
                </span>
              </div>
              <span
                style={{ position: "absolute", top: 80 }}
                className="title_span"
              >
                Тип:
              </span>
              <br />
              <span
                style={{ position: "absolute", top: 110 }}
                className="title_span"
              >
                Срок транзита(дата)
              </span>
              <span
                style={{
                  position: "absolute",
                  top: 108,
                  left: 130,
                  fontSize: 14,
                  display: "inline-block",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.3,
                }}
              >
                {" "}
                {props.tranzit}
              </span>
              <div
                style={{ fontWeight: 500, position: "absolute", top: 165 }}
                className="title_span"
              >
                Подпись:
              </div>
              <br />
              <span className="content_span_2 podpis">{props.podpis}</span>
            </div>
            <div className="otmetki_2 div">
              <span className="titel_span">
                <b> I </b>КОНТРОЛЬ ОРГАНА НАЗНАЧЕНИЯ
              </span>
              <br />
              <span className="titel_span">Дата прибытия:</span>
              <br />
              <span className="title_span">Проверка пломб:</span>
              <br />
              <span className="title_span">Коментарии:</span>
            </div>
            <div className="otmetki_3 div">
              <span className="title_span">Экземпляр возвращен:</span>
              <span className="title_span">Дата:</span>
              <span className="title_span">После регистрации под:</span>
              <span className="title_span">№</span>
              <span style={{ position: "absolute", top: 150, left: 10 }}>
                Подпись:
              </span>
              <span style={{ position: "absolute", top: 150, left: 300 }}>
                Печать:
              </span>
            </div>
          </div>
        </div>

        {props.supplementary_sheet.map((v: any, i: number) => (
          <>
            <div style={{ height: 16 }}></div>
            <div className="gl div">
              <span className="content_span_2" style={{ marginLeft: 90 }}>
                ДОБАВОЧНЫЙ ЛИСТ К ТРАНЗИТНОЙ ДЕКЛАРАЦИИ
              </span>
              <div className="cm div">
                <span>2 Отправитель/ Экспортер</span>
                <span
                  className="title_span getting"
                  style={{ position: "absolute", top: 2, left: 230 }}
                >
                  8 Получатель
                </span>{" "}
                <br />
                <span className="content_span">{v.otprav_2}</span>
              </div>
              <div className="decloration-1  div">
                <div className="tt2 div">
                  <span className="title_span">1 Декларация</span>
                  <span className="content_span" style={{ margin: "30px 9px" }}>
                    {v.dek_2_2}
                  </span>
                  <div className="tp2 div" />
                </div>
                <span
                  className="content_span"
                  style={{ position: "absolute", left: 100, top: 52 }}
                >
                  {v.dek_2_1}
                </span>
                <span
                  className="title_span "
                  style={{ position: "absolute", top: "80px" }}
                >
                  3 Формы
                </span>
                <div className="form-3 div" style={{ textAlign: "center" }}>
                  <span className="content_span_2 mt-1">
                    {(i + 2).toString()}
                  </span>
                </div>
                <span
                  className="content_span_2"
                  style={{ position: "absolute", left: 50, top: 105 }}
                >
                  {(props.supplementary_sheet.length + 1).toString()}
                </span>
                <div className="form-3-2 div" />
              </div>
              <div className="A div">
                <span className="content_span_2">А</span>
                <span className={"content_span"} style={{ display: "block" }}>
                  {v.otpr_2}
                </span>
              </div>

              <div style={{ position: "absolute", top: 142 }}>
                <div
                  className="gruz_mest2 div"
                  style={{ top: 0, borderBottom: "none" }}
                >
                  <span className="title_span">
                    31 Грузовые места и описание товаров
                  </span>
                </div>
                <div className="markirovka2 div">
                  <span className="title_span">
                    Маркировка и количество- Номера контейнеров - Количество и
                    отличительные особенности
                  </span>
                  <span style={{ display: "block" }} className="content_span_2">
                    {v.mark_kol_1}
                  </span>
                  <span
                    className="content_span_2"
                    style={{ position: "absolute", top: 38 }}
                  >
                    {v.number_containers_1}
                  </span>
                  <br />
                  <span
                    className="content_span_2"
                    style={{ position: "absolute", top: 58 }}
                  >
                    {v.col_otlichitel_1}
                  </span>
                  <span className="tovar2" style={{ height: 49 }}>
                    <span className="title_span">32 Товар</span>
                    <span
                      style={{
                        margin: "2px 25%",
                        transform: "translate(-50%)",
                        paddingBottom: 5,
                        fontSize: 14,
                      }}
                    >
                      {(i + 2).toString()}
                    </span>
                    <span className="number-tov">№</span>
                  </span>
                </div>
                <div className="cod2 div">
                  <div className="cod_12 div">
                    <span
                      className={"cod_1_span_12"}
                      style={{ borderRight: "none" }}
                    >
                      <span className="tite_span">33 Код товара</span>
                      <br />

                      <span
                        style={{ marginTop: -15 }}
                        className=" content_span_2"
                      >
                        {v.cod_tovar_2_1}
                      </span>
                      <span className={"cod_1_span_32"}>
                        <span className="title_span" />
                      </span>
                    </span>
                    <span className="cod_lin"></span>
                    <span className="cod_lin2"></span>
                    <span className="cod_lin3_0" />
                  </div>
                  <div className="cod_22 div">
                    <span className="lin_3">
                      <span className="lin_3_1"></span>
                    </span>
                    <span className={"cod_1_span_12"}>
                      <span className="tite_span" />
                    </span>
                    <span className={"cod_1_span_2   fix_1"}>
                      <span className="tite_span">35 Вес брутто (кг)</span>
                      <span
                        style={{ marginTop: -15 }}
                        className=" content_span_2"
                      >
                        {(+v.ves_2_1.replaceAll(",", ".")).toFixed(3)}
                      </span>
                    </span>
                    <span className={"cod_1_span_32"}> </span>
                  </div>
                  <div className="cod_32 div">
                    <span className="lin_3_2"></span>
                    <span className={"cod_1_span_12"} />
                    <span className={"cod_1_span_2"}> </span>
                    <span className={"cod_1_span_32"}> </span>
                  </div>
                  <div className="col_42 div">
                    <span className="title_span">
                      40 Общая декларация/Предшествующий документ
                    </span>
                    <span style={{ marginTop: 4 }} className=" content_span_2">
                      {(props.decl40.split("/")[0] || "") +
                        "/" +
                        ((i + 1) * 3 - 3 + 2)}
                    </span>
                  </div>
                  <div className="col_52 div">
                    <div className="col_5_12 div">
                      <span className="title_span">41 Дополнит. единицы</span>
                      <span
                        className={"content_span_2 mt-2"}
                        style={{ whiteSpace: "pre" }}
                      >
                        {v.usd_2_1}
                      </span>
                    </div>
                    <div className="col_5_22 div">
                      <span className="title_span">
                        42 Валюта и стоимость товара
                      </span>
                      <span
                        style={{
                          width: 70,
                          padding: "9px 5px",
                          borderRight: "1px solid",
                        }}
                        className={"content_span"}
                      >
                        {v.valut_st_usd_1}
                      </span>
                      <span
                        style={{
                          padding: "9px 5px",
                          borderRight: "1px solid",
                          paddingRight: 25,
                        }}
                        className={"content_span"}
                      >
                        {v.valut_st_summ_1}
                      </span>
                    </div>
                    <div className="col_62 div">
                      <div className="" />
                      <div className="col_6_22 div">
                        <div
                          className={"div"}
                          style={{
                            borderLeft: "none",
                            width: 72,
                            height: 42,
                            top: -1,
                            left: -1,
                          }}
                        >
                          <span
                            style={{
                              borderLeft: "1px solid",
                              position: "absolute",
                              height: "26px",
                              top: 12,
                              left: -5,
                            }}
                          ></span>
                          <span className="title_span">Код ДИ</span>
                          <span className="content_span">{v.cod_di_1}</span>
                        </div>
                      </div>
                      <div className="div niz_44"></div>
                    </div>
                  </div>
                </div>
                <div className="dop_in2 div" style={{ top: 216 }}>
                  <span className="title_span">
                    44 Дополнит. информация/Представл. документы
                  </span>
                </div>
                <div className="dop_in_12 div">
                  <span
                    style={{
                      display: "block",
                      lineHeight: 1.2,
                      margin: 5,
                      whiteSpace: "pre-wrap",
                    }}
                    className="content_span"
                  >
                    {v.dop_info_2_1}
                  </span>
                </div>
              </div>

              <div style={{ position: "absolute", top: 497 }}>
                <div className="gruz_mest2 div">
                  <span className="title_span">
                    31 Грузовые места и описание товаров
                  </span>
                </div>
                <div className="markirovka2 div">
                  <span className="title_span">
                    Маркировка и количество- Номера контейнеров - Количество и
                    отличительные особенности
                  </span>
                  <span style={{ display: "block" }} className="content_span_2">
                    {v.mark_kol_2}
                  </span>
                  <span
                    className="content_span_2"
                    style={{ position: "absolute", top: 38 }}
                  >
                    {v.number_containers_2}
                  </span>
                  <br />
                  <span
                    className="content_span_2"
                    style={{ position: "absolute", top: 58 }}
                  >
                    {v.col_otlichitel_2}
                  </span>
                  <span className="tovar2">
                    <span className="title_span">32 Товар</span>
                    <span
                      style={{
                        margin: "2px 25%",
                        transform: "translate(-50%)",
                        paddingBottom: 5,
                        fontSize: 14,
                      }}
                    >
                      {(i + 3).toString()}
                    </span>
                    <span className="title_span number-tov">№</span>
                  </span>
                </div>
                <div className="cod2 div">
                  <div className="cod_12 div">
                    <span
                      className={"cod_1_span_12"}
                      style={{ borderRight: "none" }}
                    >
                      <span className="tite_span">33 Код товара</span>
                      <br />

                      <span
                        style={{ marginTop: -15 }}
                        className=" content_span_2"
                      >
                        {v.cod_tovar_2_2}
                      </span>
                      <span className={"cod_1_span_32"}>
                        <span className="title_span" />
                      </span>
                    </span>
                    <span className="cod_lin"></span>
                    <span className="cod_lin2"></span>
                    <span className="cod_lin3_0" />
                  </div>
                  <div className="cod_22 div">
                    <span className="lin_3">
                      <span className="lin_3_1"></span>
                    </span>
                    <span className={"cod_1_span_12"}>
                      <span className="tite_span" />
                    </span>
                    <span className={"cod_1_span_2"}>
                      <span className="tite_span">35 Вес брутто (кг)</span>
                      <span
                        style={{ marginTop: -15 }}
                        className=" content_span_2"
                      >
                        {(+v.ves_2_2.replaceAll(",", ".")).toFixed(3)}
                      </span>
                    </span>
                    <span className={"cod_1_span_32"}> </span>
                  </div>
                  <div className="cod_32 div">
                    <span className="lin_3_2"></span>
                    <span className={"cod_1_span_12"} />
                    <span className={"cod_1_span_2"}> </span>
                    <span className={"cod_1_span_32"}> </span>
                  </div>
                  <div className="col_42 div">
                    <span className="title_span">
                      40 Общая декларация/Предшествующий документ
                    </span>
                    <span style={{ marginTop: 4 }} className=" content_span_2">
                      {(props.decl40.split("/")[0] || "") +
                        "/" +
                        ((i + 1) * 3 - 3 + 3)}
                    </span>
                  </div>
                  <div className="col_52 div">
                    <div className="col_5_12 div">
                      <span className="title_span">41 Дополнит. единицы</span>
                      <span
                        className={"content_span_2 mt-2"}
                        style={{ whiteSpace: "pre" }}
                      >
                        {v.usd_2_2}
                      </span>
                    </div>
                    <div className="col_5_22 div">
                      <span className="title_span">
                        42 Валюта и стоимость товара
                      </span>
                      <span
                        style={{
                          width: 70,
                          padding: "9px 5px",
                          borderRight: "1px solid",
                        }}
                        className={"content_span"}
                      >
                        {v.valut_st_usd_2}
                      </span>
                      <span
                        style={{
                          padding: "9px 5px",
                          borderRight: "1px solid",
                          paddingRight: 25,
                        }}
                        className={"content_span"}
                      >
                        {(+v.valut_st_summ_2.replaceAll(",", ".")).toFixed(2)}
                      </span>
                    </div>
                    <div className="col_62 div">
                      <div className="" />
                      <div className="col_6_22 div">
                        <div
                          className={"div"}
                          style={{
                            borderLeft: "none",
                            borderBottom: "none",
                            borderTop: "none",
                            width: 72,
                            height: 42,
                            top: -2,
                            left: -1,
                          }}
                        >
                          <span
                            style={{
                              borderLeft: "1px solid",
                              position: "absolute",
                              height: "26px",
                              top: 12,
                              left: -5,
                            }}
                          ></span>
                          <span className="title_span">Код ДИ</span>
                          <span className="content_span">{v.cod_di_2}</span>
                        </div>
                      </div>
                      <div className="div niz_44"></div>
                    </div>
                  </div>
                </div>
                <div className="dop_in2 div" style={{ borderTop: "none" }}>
                  <span className="title_span">
                    44 Дополнит. информация/Представл. документы
                  </span>
                </div>
                <div className="dop_in_12 div">
                  <span
                    style={{
                      display: "block",
                      margin: 5,
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.2,
                    }}
                    className="content_span"
                  >
                    {v.dop_info_2_2}
                  </span>
                </div>
              </div>

              <div style={{ position: "absolute", top: 852 }}>
                <div className="gruz_mest2 div">
                  <span className="title_span">
                    31 Грузовые места и описание товаров
                  </span>
                </div>
                <div className="markirovka2 div">
                  <span className="title_span">
                    Маркировка и количество- Номера контейнеров - Количество и
                    отличительные особенности
                  </span>
                  <span style={{ display: "block" }} className="content_span_2">
                    {v.mark_kol_3}
                  </span>
                  <span
                    className="content_span_2"
                    style={{ position: "absolute", top: 38 }}
                  >
                    {v.number_containers_3}
                  </span>
                  <br />
                  <span
                    className="content_span_2"
                    style={{ position: "absolute", top: 58 }}
                  >
                    {v.col_otlichitel_3}
                  </span>
                  <span className="tovar2">
                    <span className="title_span">32 Товар</span>
                    <span
                      style={{
                        margin: "2px 25%",
                        transform: "translate(-50%)",
                        paddingBottom: 5,
                        fontSize: 14,
                      }}
                    >
                      {(i + 4).toString()}
                    </span>
                    <span className="number-tov">№</span>
                  </span>
                </div>
                <div className="cod2 div">
                  <div className="cod_12 div">
                    <span
                      className={"cod_1_span_12"}
                      style={{ borderRight: "none" }}
                    >
                      <span className="tite_span">33 Код товара</span>
                      <br />

                      <span
                        style={{ marginTop: -15 }}
                        className=" content_span_2"
                      >
                        {v.cod_tovar_2_3}
                      </span>
                      <span className={"cod_1_span_32"}>
                        <span className="title_span" />
                      </span>
                    </span>
                    <span className="cod_lin"></span>
                    <span className="cod_lin2"></span>
                    <span className="cod_lin3_0" />
                  </div>
                  <div className="cod_22 div">
                    <span className="lin_3">
                      <span className="lin_3_1"></span>
                    </span>
                    <span className={"cod_1_span_12"}>
                      <span className="tite_span" />
                    </span>
                    <span className={"cod_1_span_2"}>
                      <span className="tite_span">35 Вес брутто (кг)</span>
                      <span
                        style={{ marginTop: -15, fontSize: 13 }}
                        className=" content_span_2"
                      >
                        {(+v.ves_2_3.replaceAll(",", ".")).toFixed(3)}
                      </span>
                    </span>
                    <span className={"cod_1_span_32"}> </span>
                  </div>
                  <div className="cod_32 div">
                    <span className="lin_3_2"></span>
                    <span className={"cod_1_span_12"} />
                    <span className={"cod_1_span_2"}> </span>
                    <span className={"cod_1_span_32"}> </span>
                  </div>
                  <div className="col_42 div">
                    <span className="title_span">
                      40 Общая декларация/Предшествующий документ
                    </span>
                    <span style={{ marginTop: 4 }} className=" content_span_2">
                      {(props.decl40.split("/")[0] || "") +
                        "/" +
                        ((i + 1) * 3 - 3 + 4)}
                    </span>
                  </div>
                  <div className="col_52 div">
                    <div className="col_5_12 div">
                      <span className="title_span">41 Дополнит. единицы</span>
                      <span
                        className={"content_span_2 mt-2"}
                        style={{ whiteSpace: "pre" }}
                      >
                        {v.usd_2_3}
                      </span>
                    </div>
                    <div className="col_5_22 div">
                      <span className="title_span">
                        42 Валюта и стоимость товара
                      </span>
                      <span
                        style={{
                          width: 70,
                          padding: "9px 5px",
                          borderRight: "1px solid",
                        }}
                        className={"content_span"}
                      >
                        {v.valut_st_usd_3}
                      </span>
                      <span
                        style={{
                          padding: "9px 5px",
                          borderRight: "1px solid",
                          paddingRight: 25,
                        }}
                        className={"content_span"}
                      >
                        {(+v.valut_st_summ_3.replaceAll(",", ".")).toFixed(2)}
                      </span>
                    </div>
                    <div
                      className="col_62 div"
                      style={{ borderBottom: "none" }}
                    >
                      <div className="" />
                      <div className="col_6_22 div">
                        <div
                          className={"div"}
                          style={{
                            borderLeft: "none",
                            width: 72,
                            height: 42,
                            top: -1,
                            left: -1,
                          }}
                        >
                          <span
                            style={{
                              borderLeft: "1px solid",
                              position: "absolute",
                              height: "26px",
                              top: 12,
                              left: -5,
                            }}
                          ></span>
                          <span className="title_span">Код ДИ</span>
                          <span className="content_span">{v.cod_di_3}</span>
                        </div>
                      </div>
                      <div
                        className="div niz_44"
                        style={{ borderBottom: "none" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="dop_in2 div" style={{ borderTop: "none" }}>
                  <span className="title_span">
                    44 Дополнит. информация/Представл. документы
                  </span>
                </div>
                <div className="dop_in_12 div" style={{ borderBottom: "none" }}>
                  <span
                    style={{
                      display: "block",
                      margin: 5,
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.2,
                    }}
                    className="content_span"
                  >
                    {v.dop_info_2_3}
                  </span>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <div
        className={
          "d-print-none position-relative d-flex justify-content-center"
        }
      >
        <Button
          onClick={() => goBack()}
          size={"lg"}
          className={"m-5 w-75"}
          variant={"danger"}
        >
          {" "}
          Назад
        </Button>

        <Button onClick={() => print()} size={"lg"} className={"m-5 w-75"}>
          Печать...
        </Button>
      </div>
    </>
  );
}

export default ResultContainer;
