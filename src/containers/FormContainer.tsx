import { Component, createRef } from "react";
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
} from "react-bootstrap";
import SupplementarySheetComponent from "../components/SupplementarySheetComponent";

class FormContainer extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);

    // @ts-ignore
    this.fileInput = createRef();
  }

  onLoadFile = (evt: any) => {
    try {
      // @ts-ignore
      this.props.onImport(evt.target.result);
    } catch (e) {
      alert("Ошибка!");
      console.error(e);
    }
  };

  // @ts-ignore
  onFileChange = (file) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = this.onLoadFile;
    reader.onerror = function () {
      alert("Ошибка!");
    };
  };

  getAutocompleteList = (k: any) => {
    // @ts-ignore
    const { data, setData } = this.props;

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
      <Dropdown.Divider />,
      <Dropdown.Item
        href="#"
        onClick={() => {
          if (!window.confirm("Вы уверены?")) return;
          localStorage.removeItem(k);
          this.forceUpdate();
        }}
      >
        Очистить
      </Dropdown.Item>,
    ];
  };

  render() {
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
    } = this.props;

    const ss_weight = data.supplementary_sheet.map(
      (g: any) => +g.ves_2_3 + +g.ves_2_2 + +g.ves_2_1 || 0
    );

    const weight = `${
      Math.round(
        (+data.ves35 +
          ss_weight.reduce((p: any, a: any) => p + a, 0) +
          Number.EPSILON) *
          100
      ) / 100 || 0
    }`;

    return (
      <>
        <input
          // @ts-ignore
          onChange={(e) => this.onFileChange(e.target.files[0])}
          // @ts-ignore
          ref={this.fileInput}
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
                  onClick={() => this.fileInput.current.click()}
                >
                  Импорт
                </Button>
                <Button
                  className={"me-5"}
                  variant={"success"}
                  // @ts-ignore
                  onClick={() => this.props.export()}
                >
                  Экспорт
                </Button>

                <Button
                  className={"me-2"}
                  // @ts-ignore
                  onClick={() => this.props.onSubmit()}
                >
                  Отправить
                </Button>

                <Button
                  onClick={() => onAddSupplementarySheet()}
                  variant={"info"}
                  className={"me-5"}
                >
                  Добавить добавочный лист
                </Button>

                <Button
                  variant={"danger"}
                  onClick={() =>
                    // @ts-ignore
                    window.confirm("Вы уверены?") && this.props.onReset()
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
                        {this.getAutocompleteList("otprav")}
                      </DropdownButton>
                    </InputGroup>
                  </Col>
                  <Col sm={3}>
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                        {this.getAutocompleteList("get8")}
                      </DropdownButton>
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                          value={(
                            data.supplementary_sheet.length + 1
                          ).toString()}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Control
                        onChange={(e) => setData("uz", e.target.value)}
                        type="text"
                        placeholder="Страна"
                        value={data.uz}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={1} style={{ marginLeft: -23 }}>
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Control
                        onChange={(e) => setData("kg", e.target.value)}
                        type="text"
                        value={data.kg}
                        placeholder="Страна"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label className="d-flex justify-content-center">
                        Вес(кг)
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => setData("ves35", e.target.value)}
                        type="text"
                        placeholder="кг"
                        value={data.ves35}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                          onChange={(e) => setData("vtr42", e.target.value)}
                          type="number"
                          value={data.vtr42}
                          placeholder="Сумма"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col sm={1}>
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
                    <Form.Group
                      className="mb-3 mx-3"
                      controlId="formBasicEmail"
                    >
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
}

export default FormContainer;
