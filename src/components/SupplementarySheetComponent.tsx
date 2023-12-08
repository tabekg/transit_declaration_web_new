import { Component, useCallback } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function SelectButtons(props: any) {
  const onSelect = useCallback(
    (t: any) => {
      const v = (props.value || "").split(" - ");
      props.select(`${t} - ${v[1] || props.value || ""}`);
    },
    [props.value, props.select]
  );

  return (
    <div className="mt-1 d-flex gap-1">
      <Button onClick={() => onSelect("BG")}>BG</Button>
      <Button onClick={() => onSelect("BX")}>BX</Button>
      <Button onClick={() => onSelect("NA")}>NA</Button>
    </div>
  );
}

function SelectButtonsAdditional(props: any) {
  const onSelect = useCallback(
    (t: any) => {
      const v = props.value.split("   ");
      props.select(`${v[0] || props.value}   ${t}`);
    },
    [props.value, props.select]
  );

  return (
    <div className="mt-1 d-flex gap-1">
      <Button onClick={() => onSelect("796")}>796</Button>
      <Button onClick={() => onSelect("715")}>715</Button>
      <Button onClick={() => onSelect("055")}>055</Button>
      <Button onClick={() => onSelect("")}>NO</Button>
    </div>
  );
}

class SupplementarySheetComponent extends Component {
  render() {
    // @ts-ignore
    const { data, onUpdate, globalData, id } = this.props;

    return (
      <Card className={"mt-4"}>
        <Card.Body>
          <div className={"d-flex justify-content-between align-items-center"}>
            <h3 className={"mx-3 my-2 text-center"}>Добавочный лист #{id}</h3>
            <Button
              variant={"danger"}
              size={"sm"}
              onClick={() =>
                // @ts-ignore
                window.confirm("Вы уверены?") && this.props.onRemove()
              }
            >
              Убрать
            </Button>
          </div>
          <hr />
          <Row>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  1 Декларация
                </Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Control
                    onChange={(e) => onUpdate("dek_2_2", e.target.value)}
                    type="text"
                    placeholder="1"
                    value={data.dek_2_2}
                  />
                  <Form.Control
                    onChange={(e) => onUpdate("dek_2_1", e.target.value)}
                    type="text"
                    placeholder="2"
                    value={data.dek_2_1}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  2 Отправитель/ Экспортер
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("otprav_2", e.target.value)}
                  type="text"
                  value={data.otprav_2}
                  placeholder="Отправитель"
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  3 Формы
                </Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Control
                    disabled={true}
                    type="text"
                    value={(id + 1).toString()}
                    placeholder="1"
                  />
                  <Form.Control
                    type="text"
                    placeholder="2"
                    disabled={true}
                    value={(
                      globalData.supplementary_sheet.length + 1
                    ).toString()}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={11}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  А
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("otpr_2", e.target.value)}
                  type="text"
                  placeholder="Орган отправления"
                  value={data.otpr_2}
                />
              </Form.Group>
            </Col>
          </Row>

          <hr style={{ color: "red", border: "2px solid " }} />

          <Row className={"mt-4"}>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Мар-ка и кол./Номер кон./Кол. и особ.
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("mark_kol_1", e.target.value)}
                  value={data.mark_kol_1}
                  type="text"
                  placeholder="Маркировка и количество"
                />
                <Form.Control
                  className={"mt-2"}
                  onChange={(e) =>
                    onUpdate("number_containers_1", e.target.value)
                  }
                  type="text"
                  // disabled={true}
                  value={data.number_containers_1}
                  placeholder="Номер контейнеров"
                />
                <Form.Control
                  className={"mt-2"}
                  onChange={(e) => onUpdate("col_otlichitel_1", e.target.value)}
                  value={data.col_otlichitel_1}
                  type="text"
                  placeholder="количество и отличител"
                />
                <SelectButtons
                  value={data.col_otlichitel_1}
                  select={(t: any) => onUpdate("col_otlichitel_1", t)}
                />
              </Form.Group>
            </Col>
            <Col sm={1}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Товар
                </Form.Label>
                <Form.Control
                  disabled={true}
                  type="text"
                  value={(id * 3 - 3 + 2).toString()}
                  placeholder=""
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  33 Код товара
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("cod_tovar_2_1", e.target.value)}
                  type="text"
                  value={data.cod_tovar_2_1}
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
                    onUpdate("ves_2_1", e.target.value.replaceAll(",", "."))
                  }
                  type="text"
                  value={data.ves_2_1}
                  placeholder=""
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className={"mt-4"}>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  41 Доп. единицы
                </Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Control
                    onChange={(e) => onUpdate("usd_2_1", e.target.value)}
                    type="text"
                    value={data.usd_2_1}
                  />
                </div>
                <SelectButtonsAdditional
                  value={data.usd_2_1}
                  select={(e: any) => {
                    onUpdate("usd_2_1", e.split("   ")[1] ? e : "");
                    onUpdate("cod_di_1", e.split("   ")[1] || "");
                  }}
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
                    onChange={(e) => onUpdate("valut_st_usd_1", e.target.value)}
                    type="text"
                    value={data.valut_st_usd_1}
                  />
                  <Form.Control
                    onChange={(e) =>
                      onUpdate(
                        "valut_st_summ_1",
                        e.target.value.replaceAll(",", ".")
                      )
                    }
                    type="text"
                    value={data.valut_st_summ_1}
                    placeholder="Сумма"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Код ДИ
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("cod_di_1", e.target.value)}
                  type="text"
                  placeholder=""
                  value={data.cod_di_1}
                />
              </Form.Group>
            </Col>
          </Row>

          <hr style={{ color: "red", border: "2px solid " }} />

          <Row className={"mt-4"}>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Мар-ка и кол./Номер кон./Кол. и особ.
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("mark_kol_2", e.target.value)}
                  value={data.mark_kol_2}
                  type="text"
                  placeholder="Маркировка и количество"
                />
                <Form.Control
                  className={"mt-2"}
                  onChange={(e) =>
                    onUpdate("number_containers_2", e.target.value)
                  }
                  type="text"
                  // disabled={true}
                  value={data.number_containers_2}
                  placeholder="Номер контейнеров"
                />
                <Form.Control
                  className={"mt-2"}
                  onChange={(e) => onUpdate("col_otlichitel_2", e.target.value)}
                  value={data.col_otlichitel_2}
                  type="text"
                  placeholder="количество и отличител"
                />
                <SelectButtons
                  value={data.col_otlichitel_2}
                  select={(t: any) => onUpdate("col_otlichitel_2", t)}
                />
              </Form.Group>
            </Col>
            <Col sm={1}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Товар
                </Form.Label>
                <Form.Control
                  type="text"
                  value={(id * 3 - 3 + 3).toString()}
                  placeholder=""
                  disabled={true}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  33 Код товара
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("cod_tovar_2_2", e.target.value)}
                  type="text"
                  value={data.cod_tovar_2_2}
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
                    onUpdate("ves_2_2", e.target.value.replaceAll(",", "."))
                  }
                  type="text"
                  value={data.ves_2_2}
                  placeholder=""
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className={"mt-4"}>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  41 Доп. единицы
                </Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Control
                    onChange={(e) => onUpdate("usd_2_2", e.target.value)}
                    type="text"
                    value={data.usd_2_2}
                  />
                </div>
                <SelectButtonsAdditional
                  value={data.usd_2_2}
                  select={(e: any) => {
                    onUpdate("usd_2_2", e.split("   ")[1] ? e : "");
                    onUpdate("cod_di_2", e.split("   ")[1] || "");
                  }}
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
                    onChange={(e) => onUpdate("valut_st_usd_2", e.target.value)}
                    type="text"
                    value={data.valut_st_usd_2}
                  />
                  <Form.Control
                    onChange={(e) =>
                      onUpdate(
                        "valut_st_summ_2",
                        e.target.value.replaceAll(",", ".")
                      )
                    }
                    type="text"
                    value={data.valut_st_summ_2}
                    placeholder="Сумма"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Код ДИ
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("cod_di_2", e.target.value)}
                  type="text"
                  placeholder=""
                  value={data.cod_di_2}
                />
              </Form.Group>
            </Col>
          </Row>

          <hr style={{ color: "red", border: "2px solid " }} />

          <Row className={"mt-4"}>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Мар-ка и кол./Номер кон./Кол. и особ.
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("mark_kol_3", e.target.value)}
                  value={data.mark_kol_3}
                  type="text"
                  placeholder="Маркировка и количество"
                />
                <Form.Control
                  className={"mt-2"}
                  // disabled={true}
                  onChange={(e) =>
                    onUpdate("number_containers_3", e.target.value)
                  }
                  type="text"
                  value={data.number_containers_3}
                  placeholder="Номер контейнеров"
                />
                <Form.Control
                  className={"mt-2"}
                  onChange={(e) => onUpdate("col_otlichitel_3", e.target.value)}
                  value={data.col_otlichitel_3}
                  type="text"
                  placeholder="количество и отличител"
                />
                <SelectButtons
                  value={data.col_otlichitel_3}
                  select={(t: any) => onUpdate("col_otlichitel_3", t)}
                />
              </Form.Group>
            </Col>
            <Col sm={1}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Товар
                </Form.Label>
                <Form.Control
                  type="text"
                  value={(id * 3 - 3 + 4).toString()}
                  placeholder=""
                  disabled={true}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  33 Код товара
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("cod_tovar_2_3", e.target.value)}
                  type="text"
                  value={data.cod_tovar_2_3}
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
                    onUpdate("ves_2_3", e.target.value.replaceAll(",", "."))
                  }
                  type="text"
                  value={data.ves_2_3}
                  placeholder=""
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className={"mt-4"}>
            <Col sm={3}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  41 Доп. единицы
                </Form.Label>
                <div className="d-flex justify-content-center">
                  <Form.Control
                    onChange={(e) => onUpdate("usd_2_3", e.target.value)}
                    type="text"
                    value={data.usd_2_3}
                  />
                </div>
                <SelectButtonsAdditional
                  value={data.usd_2_3}
                  select={(e: any) => {
                    onUpdate("usd_2_3", e.split("   ")[1] ? e : "");
                    onUpdate("cod_di_3", e.split("   ")[1] || "");
                  }}
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
                    onChange={(e) => onUpdate("valut_st_usd_3", e.target.value)}
                    type="text"
                    value={data.valut_st_usd_3}
                    placeholder="USD"
                  />
                  <Form.Control
                    onChange={(e) =>
                      onUpdate(
                        "valut_st_summ_3",
                        e.target.value.replaceAll(",", ".")
                      )
                    }
                    type="text"
                    value={data.valut_st_summ_3}
                    placeholder="Сумма"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <Form.Group className="mb-3 mx-3" controlId="formBasicEmail">
                <Form.Label className="d-flex justify-content-center">
                  Код ДИ
                </Form.Label>
                <Form.Control
                  onChange={(e) => onUpdate("cod_di_3", e.target.value)}
                  type="text"
                  placeholder=""
                  value={data.cod_di_3}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default SupplementarySheetComponent;
