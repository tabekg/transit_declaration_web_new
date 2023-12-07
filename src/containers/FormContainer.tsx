import { useCallback, useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
  Navbar,
  Row,
  DropdownButton,
  Modal,
} from "react-bootstrap";
import SupplementarySheetComponent from "../components/SupplementarySheetComponent";
import { strToInt } from "../config";

function FormContainer(props: any) {
  const fileInput = useRef();

  const onLoadFile = useCallback(
    (evt: any) => {
      try {
        // @ts-ignore
        props.onImport(evt.target.result);
      } catch (e) {
        alert("Ошибка!");
        console.error(e);
      }
    },
    [props.onImport]
  );

  const onFileChange = useCallback(
    (file: any) => {
      if (!file) {
        return;
      }
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = onLoadFile;
      reader.onerror = function () {
        alert("Ошибка!");
      };
    },
    [onLoadFile]
  );

  const getAutocompleteList = useCallback(
    (k: any) => {
      // @ts-ignore
      const { data, setData } = props;

      const items = JSON.parse(localStorage.getItem(k) || "[]") || [];
      if (items.length < 1) return null;
      return [
        items.map((v: any) => {
          if (data[k] === v) return null;
          return (
            <Dropdown.Item href="#" onClick={() => setData(k, v)}>
              {v}
            </Dropdown.Item>
          );
        }),
        // <Dropdown.Divider />,
        // <Dropdown.Item
        //   href="#"
        //   onClick={() => {
        //     if (!window.confirm("Вы уверены?")) return;
        //     localStorage.removeItem(k);
        //   }}
        // >
        //   Очистить
        // </Dropdown.Item>,
      ];
    },
    [props.data, props.setData]
  );

  const {
    // @ts-ignore
    data,
    // @ts-ignore
    setData,
    // @ts-ignore
    onUpdateSupplementarySheet,
    // @ts-ignore
    onAddSupplementarySheet,
    // @ts-ignore
    onRemoveSupplementarySheet,
  } = props;

  const ss_weight = useMemo(() => {
    return data.supplementary_sheet.map(
      (g: any) => +g.ves_2_3 + +g.ves_2_2 + +g.ves_2_1 || 0
    );
  }, [data.supplementary_sheet]);

  const weight = useMemo(
    () =>
      `${(
        Math.round(
          (+data.ves35 +
            ss_weight.reduce((p: any, a: any) => p + a, 0) +
            Number.EPSILON) *
            100
        ) / 100 || 0
      ).toFixed(3)}`,
    [data.ves35, ss_weight]
  );

  const [parserIsHidden, setParserIsHidden] = useState(true);

  const [text, setText] = useState("");

  const items = useMemo(() => {
    if (!text) {
      return [];
    }
    const a = text.split("\n");
    const b = a
      .map((g) => g.split("\t").map((m) => m.trim()))
      .filter((g) => g.length === 10);
    return b;
  }, [text]);

  const content = useMemo(() => {
    const arr = items.reduce(
      // @ts-ignore
      (r, e, i) => (i % 3 ? r[r.length - 1].push(e) : r.push([e])) && r,
      []
    );
    if (arr.length < 1) {
      return {};
    }

    if (arr[arr.length - 1].length === 1) {
      // @ts-ignore
      arr[arr.length - 1].push(Array(10).fill(""));
      // @ts-ignore
      arr[arr.length - 1].push(Array(10).fill(""));
    } else if (arr[arr.length - 1].length === 2) {
      // @ts-ignore
      arr[arr.length - 1].push(Array(10).fill(""));
    }

    return {
      supplementary_sheet: arr.map((g, i) => {
        // console.log(g[0][2]);
        // return;
        return {
          form_2_1: (i + 2).toString(),
          cod_tovar_2_1: g[0][2],
          cod_tovar_2_2: g[1][2],
          cod_tovar_2_3: g[2][2],
          mark_kol_1: "1 " + g[0][1].toUpperCase(),
          mark_kol_2: "1 " + g[1][1].toUpperCase(),
          mark_kol_3: "1 " + g[2][1].toUpperCase(),
          col_otlichitel_1: g[0][4],
          col_otlichitel_2: g[1][4],
          col_otlichitel_3: g[2][4],
          ves_2_1: strToInt(g[0][7]).toFixed(3).toString(),
          ves_2_2: strToInt(g[1][7]).toFixed(3).toString(),
          ves_2_3: strToInt(g[2][7]).toFixed(3).toString(),
          usd_2_1: g[0][5],
          usd_2_2: g[1][5],
          usd_2_3: g[2][5],
          valut_st_summ_1: strToInt(g[0][9]).toFixed(2).toString(),
          valut_st_summ_2: strToInt(g[1][9]).toFixed(2).toString(),
          valut_st_summ_3: strToInt(g[2][9]).toFixed(2).toString(),

          cod_di_3: "",
          cod_di_2: "",
          dop_info_2_1: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
          dop_info_2_3: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
          dop_info_2_2: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
          number_containers_1: "2",
          number_containers_2: "2",
          number_containers_3: "2",
          dek_2_2: "TT",
          dek_2_1: "TP",
          valut_st_usd_3: "USD",
          valut_st_usd_2: "USD",
          valut_st_usd_1: "USD",
          otprav_2: "CM. ГР. 2-8",
          cod_di_1: "",
          otpr_2: "417210724/070921/000000394",
        };
      }),
    };
  }, [items]);

  const parse = useCallback(() => {
    props.onSetGlobalData((p: any) => {
      return { ...p, ...content };
    });
  }, [content, props.onSetGlobalData]);

  return (
    <>
      <Modal show={!parserIsHidden} onHide={() => setParserIsHidden(true)}>
        <Modal.Header closeButton>
          <Modal.Title>Парсер</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            rows={20}
            value={text}
            onChange={(t) => setText(t.target.value)}
            style={{ width: "100%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setParserIsHidden(true)}>
            Закрыть
          </Button>
          <Button variant="primary" disabled={items.length < 1} onClick={parse}>
            Применить ({items.length})
          </Button>
        </Modal.Footer>
      </Modal>

      <input
        // @ts-ignore
        onChange={(e) => onFileChange(e.target.files[0])}
        // @ts-ignore
        ref={fileInput}
        type={"file"}
        accept={".bsx"}
        hidden
      />

      <div>
        <Navbar sticky="top" bg="dark" variant={"dark"} expand="lg">
          <Container>
            <Navbar.Brand href="/">ТРАНЗИТНАЯ ДЕКЛАРАЦИЯ</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className={"justify-content-end"}
              id="basic-navbar-nav"
            >
              <div className={"text-white me-5"}>Вес: {weight} кг</div>
              <Button
                className={"me-2"}
                variant={"success"}
                // @ts-ignore
                onClick={() => fileInput.current.click()}
              >
                Импорт
              </Button>
              <Button
                className={"me-5"}
                variant={"success"}
                // @ts-ignore
                onClick={() => props.export()}
              >
                Экспорт
              </Button>

              <Button
                className={"me-2"}
                // @ts-ignore
                onClick={() => props.onSubmit()}
              >
                Отправить
              </Button>

              <Button
                onClick={() => setParserIsHidden(false)}
                variant={"info"}
                className={"me-5"}
              >
                Парсер
              </Button>

              <Button
                onClick={() => onAddSupplementarySheet()}
                variant={"info"}
                className={"me-5"}
              >
                Добавить ДЛ
              </Button>

              <Button
                variant={"danger"}
                onClick={() =>
                  // @ts-ignore
                  window.confirm("Вы уверены?") && props.onReset()
                }
              >
                Сбросить
              </Button>
              {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
              {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
              {/*  <NavDropdown.Item href="#action/3.2">*/}
              {/*    Another action*/}
              {/*  </NavDropdown.Item>*/}
              {/*  <NavDropdown.Item href="#action/3.3">*/}
              {/*    Something*/}
              {/*  </NavDropdown.Item>*/}
              {/*  <NavDropdown.Divider />*/}
              {/*  <NavDropdown.Item href="#action/3.4">*/}
              {/*    Separated link*/}
              {/*  </NavDropdown.Item>*/}
              {/*</NavDropdown>*/}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container style={{ marginBottom: 20, marginTop: 20 }}>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Row>
                <Col sm={4}>
                  <Form.Label className="d-flex justify-content-center">
                    2 Отправитель/ Экспортер
                  </Form.Label>
                  <InputGroup className="mb-3 mx-3">
                    <FormControl
                      onChange={(e) => setData("otprav", e.target.value)}
                      type="text"
                      placeholder="Отправитель"
                      value={data.otprav}
                    />

                    <DropdownButton
                      variant="outline-secondary"
                      align="end"
                      title={""}
                    >
                      {getAutocompleteList("otprav")}
                    </DropdownButton>
                  </InputGroup>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      1 Декларация
                    </Form.Label>
                    <div className="d-flex justify-content-center">
                      <Form.Control
                        onChange={(e) => setData("tt", e.target.value)}
                        type="text"
                        placeholder="1"
                        value={data.tt}
                      />
                      <Form.Control
                        onChange={(e) => setData("tp", e.target.value)}
                        type="text"
                        value={data.tp}
                        placeholder="2"
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col sm={4}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      А ОРГАН ОТПРАВЛЕНИЯ
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("organ", e.target.value)}
                      value={data.organ}
                      type="text"
                      placeholder="Орган отправления"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Label className="d-flex justify-content-center">
                    8 Получатель
                  </Form.Label>
                  <InputGroup className="mb-3 mx-3">
                    <FormControl
                      onChange={(e) => setData("get8", e.target.value)}
                      type="text"
                      placeholder="Получатель"
                      value={data.get8}
                    />

                    <DropdownButton
                      title={""}
                      variant="outline-secondary"
                      align="end"
                    >
                      {getAutocompleteList("get8")}
                    </DropdownButton>
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      3 Формы
                    </Form.Label>
                    <div className="d-flex justify-content-center">
                      <Form.Control
                        type="text"
                        disabled={true}
                        placeholder="1"
                        value={"1"}
                      />
                      <Form.Control
                        disabled={true}
                        type="text"
                        placeholder="2"
                        value={(data.supplementary_sheet.length + 1).toString()}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label>5 Всего т-ов</Form.Label>
                    <Form.Control
                      onChange={(e) => setData("tv5", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.tv5}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label>6 Всего мест </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("mst6", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.mst6}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={7}></Col>
                <Col sm={2}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Дата печати
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("data", e.target.value)}
                      type="text"
                      value={data.data}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Данные на дату
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("dann", e.target.value)}
                      type="text"
                      value={data.dann}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      15 Страна отправления
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("strana", e.target.value)}
                      type="text"
                      value={data.strana}
                      placeholder="Страна отправления"
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      17 Страна назначения
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("strnaz", e.target.value)}
                      type="text"
                      value={data.strnaz}
                      placeholder="Страна назначения"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "100%", marginTop: 20 }}>
            <Card.Body>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      18 Иден-ция и страна регистрации ТС
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("iden18", e.target.value)}
                      type="text"
                      value={data.iden18}
                      placeholder="18"
                    />
                  </Form.Group>
                </Col>
                <Col md={1}></Col>
                <Col sm={1} style={{ marginLeft: -23, marginTop: 31 }}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Control
                      onChange={(e) => setData("uz", e.target.value)}
                      type="text"
                      placeholder="Страна"
                      value={data.uz}
                    />
                  </Form.Group>
                </Col>
                <Col sm={1} style={{ marginLeft: -23 }}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      19 конт.
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("kont", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.kont}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      22 Валюта и общая сумма по счету
                    </Form.Label>
                    <div className="d-flex justify-content-center">
                      <Form.Control
                        onChange={(e) => setData("usd22", e.target.value)}
                        type="text"
                        value={data.usd22}
                        placeholder="USD"
                      />
                      <Form.Control
                        onChange={(e) => setData("summ", e.target.value)}
                        type="text"
                        placeholder="Сумма"
                        value={data.summ}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className={"mt-4"}>
                <Col md={5}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      21 Иден-ция и страна регистрации активного
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("iden21", e.target.value)}
                      type="text"
                      placeholder="21"
                      value={data.iden21}
                    />
                  </Form.Group>
                </Col>
                <Col md={1}></Col>
                <Col sm={2} style={{ marginLeft: -23, marginTop: 31 }}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Control
                      onChange={(e) => setData("kg", e.target.value)}
                      type="text"
                      value={data.kg}
                      placeholder="Страна"
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Вид транспорта
                    </Form.Label>
                    <div className="d-flex justify-content-center">
                      <Form.Control
                        onChange={(e) => setData("trans", e.target.value)}
                        type="text"
                        placeholder="Вид транспорта"
                        value={data.trans}
                      />
                      <FormControl
                        placeholder={"номер"}
                        onChange={(e) => setData("trans_num", e.target.value)}
                        value={data.trans_num}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card style={{ width: "100%", marginTop: 20 }}>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Мар-ка и количество
                    </Form.Label>
                    <Form.Control
                      onChange={(e) =>
                        setData("mar31", e.target.value.toUpperCase())
                      }
                      type="text"
                      placeholder=""
                      value={data.mar31}
                    />
                  </Form.Group>
                </Col>
                <Col sm={1}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      № конт-в
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("numb", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.numb}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Кол.
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("coli", e.target.value)}
                      type="text"
                      value={data.coli}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className={"mt-4"}>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Товар
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled={true}
                      placeholder=""
                      value={data.tvr32}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      33 Код товара
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("kod33", e.target.value)}
                      type="text"
                      value={data.kod33}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
                <Col sm={1}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Вес(кг)
                    </Form.Label>
                    <Form.Control
                      onChange={(e) =>
                        setData(
                          "ves35",
                          e.target.value
                            .replaceAll(",", ".")
                            .replaceAll(" ", "")
                        )
                      }
                      type="text"
                      placeholder="кг"
                      value={data.ves35}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      40 Общая декларация
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("decl40", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.decl40}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className={"mt-4"}>
                <Col>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      44 Доп. информация
                    </Form.Label>
                    <Form.Control
                      as={"textarea"}
                      onChange={(e) => setData("dop44", e.target.value)}
                      type="text"
                      placeholder="1"
                      value={data.dop44}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      41 Доп. единицы
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("perv41", e.target.value)}
                      type="text"
                      placeholder="1"
                      value={data.perv41}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Валюта и стоимость
                    </Form.Label>
                    <div className="d-flex justify-content-center">
                      <Form.Control
                        onChange={(e) => setData("perv42", e.target.value)}
                        type="text"
                        placeholder="USD"
                        value={data.perv42}
                      />
                      <Form.Control
                        onChange={(e) =>
                          setData(
                            "vtr42",
                            e.target.value
                              .replaceAll(",", ".")
                              .replaceAll(" ", "")
                          )
                        }
                        type="number"
                        value={data.vtr42}
                        placeholder="Сумма"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col sm={1}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Код ДИ
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("koddi", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.koddi}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card style={{ width: "100%", marginTop: 20 }}>
            <Card.Body>
              <Row className={"mt-4"}>
                <Col sm={5}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      50 Принципал
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      onChange={(e) => setData("princ1", e.target.value)}
                      type="text"
                      value={data.princ1}
                      placeholder="Автор"
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Место и дата
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("mest", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.mest}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      ОРГАН ОТПРАВЛЕНИЯ
                    </Form.Label>
                    <Form.Control
                      rows={4}
                      as="textarea"
                      value={data.organC}
                      onChange={(e) => setData("organC", e.target.value)}
                      type="text"
                      placeholder="С"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col sm={5}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      52 Гарантия
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("garant52", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.garant52}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Код
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("kod52", e.target.value)}
                      type="text"
                      value={data.kod52}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
                <Col sm={5}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      53 Орган назн.(страна)
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("organ53", e.target.value)}
                      type="text"
                      placeholder=""
                      value={data.organ53}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col sm={5}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Наложенные пломбы
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("plomb", e.target.value)}
                      type="text"
                      value={data.plomb}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Срок транзита(дата)
                    </Form.Label>
                    <Form.Control
                      rows={2}
                      as="textarea"
                      onChange={(e) => setData("tranzit", e.target.value)}
                      type="text"
                      value={data.tranzit}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                    <Form.Label className="d-flex justify-content-center">
                      Подпись
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => setData("podpis", e.target.value)}
                      type="text"
                      value={data.podpis}
                      placeholder=""
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {data.supplementary_sheet.map((value: any, index: number) => (
            <SupplementarySheetComponent
              // @ts-ignore
              data={value}
              globalData={data}
              id={index + 1}
              onRemove={() => onRemoveSupplementarySheet(index)}
              onUpdate={(name: any, value: any) =>
                onUpdateSupplementarySheet(index, name, value)
              }
            />
          ))}
        </Container>
      </div>
    </>
  );
}

export default FormContainer;
