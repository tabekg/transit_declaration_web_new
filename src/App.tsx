import { useEffect, useState } from "react";
import FormContainer from "./containers/FormContainer";
import ResultContainer from "./containers/ResultContainer";
import moment from "moment";
import "moment/locale/ru";
import x from "crypto-js";

moment.locale("ru");
window.x = x;

const a = {
  supplementary_sheet: [
    {
      dek_2_2: "TT",
      dek_2_1: "TP",
      valut_st_usd_3: "USD",
      valut_st_usd_2: "USD",
      valut_st_usd_1: "USD",
      otprav_2: "CM. ГР. 2-8",
      form_2_1: "2",
      form_2_2: "8",
      tovar_2: "2",
      kod_tovara_2: "6208883941",
      otpr_2: "417210724/070921/000000394",
      mark_kol_1: "1 ",
      mark_kol_2: "1 ",
      mark_kol_3: "1 ",
      number_containers_1: "2",
      number_containers_2: "2",
      number_containers_3: "2",
      col_otlichitel_1: "NA-2",
      tovar_2_1: "2",
      tovar_2_2: "3",
      tovar_2_3: "4",
      cod_tovar_2_1: "620374350",
      ves_2_1: "112.400",
      all_declaration_1: "ДВХ 417989698749873443/2",
      all_declaration_2: "ДВХ 417989698749873443/3",
      all_declaration_3: "ДВХ 417989698749873443/4",
      dop_info_2_1: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
      usd_2_1: "280    796",
      valut_st_summ_1: "560.00",
      cod_di_1: "796",
      col_otlichitel_2: "NA-5",
      cod_tovar_2_2: "2395125000",
      ves_2_2: "4021.45",
      dop_info_2_2: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
      usd_2_2: "280    796",
      valut_st_summ_2: "560.00",
      col_otlichitel_3: "NA-5",
      cod_tovar_2_3: "2395125000",
      ves_2_3: "4021.45",
      dop_info_2_3: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
      usd_2_3: "280    706",
      valut_st_summ_3: "560.00",
      cod_di_3: "124",
    },
    {
      dek_2_2: "TT",
      dek_2_1: "TP",
      valut_st_usd_3: "USD",
      valut_st_usd_2: "USD",
      valut_st_usd_1: "USD",
      otprav_2: "CM. ГР. 2-8",
      otpr_2: "417210724/070921/000000394",
      form_2_1: "3",
      form_2_2: "8",
      mark_kol_1: "1 ",
      mark_kol_2: "1 ",
      mark_kol_3: "1 ",
      tovar_2_1: "5",
      tovar_2_2: "6",
      tovar_2_3: "7",
      number_containers_1: "2",
      number_containers_2: "2",
      number_containers_3: "2",
      col_otlichitel_1: "NA-3",
      cod_tovar_2_1: "23632",
      ves_2_1: "4021.45",
      all_declaration_1: "ДВХ 417989698749873443/5",
      all_declaration_2: "ДВХ 417989698749873443/6",
      all_declaration_3: "ДВХ 417989698749873443/7",
      dop_info_2_1: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
      usd_2_1: "280    706",
      valut_st_summ_1: "560.00",
      cod_di_1: "235",
      col_otlichitel_2: "NA-3",
      cod_tovar_2_2: "2395125000",
      ves_2_2: "4021.45",
      dop_info_2_2: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
      usd_2_2: "280    706",
      valut_st_summ_2: "324532",
      col_otlichitel_3: "NA-3",
      cod_tovar_2_3: "4366346",
      ves_2_3: "4021.45",
      dop_info_2_3: "02041 0124234 07.09.2021\n04021 3663 30.08.2021",
      usd_2_3: "123    124",
      valut_st_summ_3: "214.124",
      cod_di_3: "214",
      cod_di_2: "214",
    },
  ],
  //data: '20.09.2021 10:47:28',
  //dann: '20.09.2021 10:04:50',
  tt: "TT",
  tp: "TP",
  usd22: "USD",
  perv42: "USD",
  garant52: "СОПРОВОЖДЕНИЕ",
  otprav: "URUMQI KAILINGDA INTERNATIONAL TRADE CO. LTD, КИТАЙ",
  organ: "41414141/070821/00012423",
  get8: 'ИП ООО "BARAKA HOLDING", УЗБЕКИСТАН',
  form1: "1",
  form2: "8",
  tv5: "21",
  mst6: "924",
  strana: "КИТАЙ",
  strnaz: "УЗБЕКИСТАН",
  iden18: "1: 01M00023453/234235AA",
  uz: "UZ",
  kont: "0",
  summ: "124124.03",
  iden21: "1: 01M00023453/234235AA",
  kg: "KG",
  //mar31: '1 БРЮКИ ДЖИНСОВЫЕ ДЕТСКИЕ',
  numb: "2",
  coli: "NA-10",
  tvr32: "1",
  kod33: "8757908",
  ves35: "409.500",
  decl40: "ДВХ 417989698749873443/1",
  dop44: "02014 0101024 07.092021\n04021 3442 30.08.2021",
  perv41: "1520     796",
  vtr42: "3034.30",
  koddi: "234",
  princ1:
    "СУЛТАНОВ Т, , КЫРГЫЗСТАН,\nURUMQI KAILINGDA INTERNATIONAL TRADE CO.LTD,, КИТАЙ",
  mest: 'МТО "БИМИ ОШ СЕРВИС"Б0709.2021',
  organC:
    '123423336 - МТО "БИМИ ОШ СЕРВИС" \n2 01 - ВЫПУСК РАЗРЕШЕН\n07.09.2021\nСУЛАЙМАНОВ Б',
  kod52: "05",
  organ53: "4172",
  plomb: "3 НОМЕР: GTSKR561636, GTSKR561636, GTSKR561636",
  tranzit:
    '10.09.2021/41753234 - МПТП "ДОСТУК";\nКЫРГЫЗСТАН; ОШСКАЯ ОБЛ., КАРА-СУЙСКИЙ Р-Н, (5КМ А/Д ОШ-АНДИЖАН',
  podpis: "KGAA060893",
};

console.log(Object.keys(a).length);

const getSupplementarySheetInitData = (data) => {
  const last_supplementary_sheet =
    data.supplementary_sheet[data.supplementary_sheet.length - 1];

  const last_declaration = last_supplementary_sheet
    ? last_supplementary_sheet.all_declaration_3
    : data.decl40;
  const last_declaration_split = last_declaration.split("/");

  const last_form_1 = last_supplementary_sheet
    ? +last_supplementary_sheet.form_2_1
    : +data.form1;

  const last_tvr = last_supplementary_sheet
    ? +last_supplementary_sheet.tovar_2_3
    : +data.tvr32;

  return {
    dek_2_2: "TT",
    dek_2_1: "TP",
    valut_st_usd_3: "USD",
    valut_st_usd_2: "USD",
    valut_st_usd_1: "USD",

    otpr_2: data.organ,
    all_declaration_1:
      last_declaration_split[0] + "/" + (+last_declaration_split[1] + 1),
    all_declaration_2:
      last_declaration_split[0] + "/" + (+last_declaration_split[1] + 2),
    all_declaration_3:
      last_declaration_split[0] + "/" + (+last_declaration_split[1] + 3),
    dop_info_2_1: data.dop44,
    dop_info_2_2: data.dop44,
    dop_info_2_3: data.dop44,

    form_2_2: data.form2,
    form_2_1: last_form_1 + 1,

    tovar_2_1: last_tvr + 1,
    tovar_2_2: last_tvr + 2,
    tovar_2_3: last_tvr + 3,

    mark_kol_1: "1 ",
    mark_kol_2: "1 ",
    mark_kol_3: "1 ",

    number_containers_1: "2",
    number_containers_2: "2",
    number_containers_3: "2",

    otprav_2: "CM. ГР. 2-8",
  };
};

const getInitData = () => {
  const localstorage_data = JSON.parse(localStorage.getItem("___data")) || {};
  return {
    trans: "на границе",
    data: moment().format("DD.MM.YYYY HH:mm:ss"),
    dann: moment().format("DD.MM.YYYY HH:mm:ss"),
    tt: "TT",
    tp: "TP",
    usd22: "USD",
    perv42: "USD",
    garant52: "СОПРОВОЖДЕНИЕ",

    ...a,
    ...localstorage_data,

    mar31: "1 ",
    supplementary_sheet: localstorage_data.supplementary_sheet
      ? localstorage_data.supplementary_sheet.map((g) => {
          g["mark_kol_1"] = "1 ";
          g["mark_kol_2"] = "1 ";
          g["mark_kol_3"] = "1 ";

          g["number_containers_1"] = "2";
          g["number_containers_2"] = "2";
          g["number_containers_3"] = "2";

          g["otprav_2"] = "CM. ГР. 2-8";

          return g;
        })
      : a.supplementary_sheet,
  };
};

function App() {
  const [data, setData] = useState(getInitData());
  const [showResult, setShowResult] = useState(false);

  const show = () => {
    setShowResult(false);
  };

  useEffect(() => {
    document.body.onkeyup = (e) => {
      if (e.key === "Escape") {
        show();
      }
    };
  }, []);

  const onSubmit = () => {
    setShowResult(true);
    Object.keys(data).map((v) => {
      if (v === "supplementary_sheet" || v === "dann" || v === "data")
        return false;
      const items = JSON.parse(localStorage.getItem(v)) || [];
      if (!items.includes(data[v])) {
        items.push(data[v]);
        localStorage.setItem(v, JSON.stringify(items));
      }
      return null;
    });
    localStorage.setItem("___data", JSON.stringify(data));
  };

  const onSetData = (n, v) => {
    setData((p) => {
      const g = { ...p };

      if (n === "form2") {
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s) => {
          s["form_2_2"] = v;
          return s;
        });
      } else if (n === "form1") {
        let number = +v;
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s, i) => {
          number++;
          s["form_2_1"] = number;
          return s;
        });
      } else if (n === "decl40") {
        const split = v.split("/");
        let number = +split[1];
        number = isNaN(number) ? 1 : number;
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s, i) => {
          s["all_declaration_1"] = split[0] + "/" + ++number;
          s["all_declaration_2"] = split[0] + "/" + ++number;
          s["all_declaration_3"] = split[0] + "/" + ++number;
          return s;
        });
      } else if (n === "tvr32") {
        let number = +v;
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s, i) => {
          s["tovar_2_1"] = ++number;
          s["tovar_2_2"] = ++number;
          s["tovar_2_3"] = ++number;
          return s;
        });
      } else if (n === "organ") {
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s, i) => {
          s["otpr_2"] = v;
          return s;
        });
      } else if (n === "dop44") {
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s, i) => {
          s["dop_info_2_1"] = v;
          s["dop_info_2_2"] = v;
          s["dop_info_2_3"] = v;
          return s;
        });
      } else if (n === "decl40") {
        const first_part = v.split("/")[0];
        let index = 1;
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s, i) => {
          s["all_declaration_1"] = first_part + "/" + ++index;
          s["all_declaration_2"] = first_part + "/" + ++index;
          s["all_declaration_3"] = first_part + "/" + ++index;
          return s;
        });
      }

      g[n] = v;

      return g;
    });
  };

  useEffect(() => {
    let sum = +data["vtr42"] || 0;
    data["supplementary_sheet"].map((g) => {
      sum += +g["valut_st_summ_1"] || 0;
      sum += +g["valut_st_summ_2"] || 0;
      sum += +g["valut_st_summ_3"] || 0;
      return g;
    });
    setData((o) => {
      const g = { ...o };
      g["summ"] = `${sum}`;
      return g;
    });
  }, [data.supplementary_sheet, data.vtr42, data.supplementary_sheet.length]);

  const updateSupplementarySheet = (i, n, v) => {
    setData((p) => {
      const g = { ...p };
      g["supplementary_sheet"][i][n] = v;
      return g;
    });
  };

  const removeSupplementarySheet = (i) => {
    setData((p) => {
      const g = { ...p };
      g["supplementary_sheet"].splice(i, 1);
      return g;
    });
  };

  const addSupplementarySheet = () => {
    setData((p) => {
      const g = { ...p };
      g["supplementary_sheet"] = [
        ...g["supplementary_sheet"],
        getSupplementarySheetInitData(p),
      ];
      return g;
    });
  };

  const reset = () => {
    const initData = getInitData();
    setData((p) => {
      const g = { ...p };
      Object.keys(g).map((k) => {
        g[k] =
          k === "supplementary_sheet" ? [] : k in initData ? initData[k] : "";
        return null;
      });
      return g;
    });
  };

  const onExport = () => {
    // eslint-disable-next-line no-eval
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        eval(
          atob(
            atob(
              "S0daMWJtTjBhVzl1SUNncGUzSmxkSFZ5YmlCNExrRkZVeTVsYm1OeWVYQjBLRXBUVDA0dWMzUnlhVzVuYVdaNUtHUmhkR0VwTENCaGRHOWlLQ0pqZWxwU1pFZHdVbVZFU1ROaVYyc3lZbGhXVUdWV2EzcGFSbEpYVkcxa2JXVllhR2hPZWtwR1dsVmFhRlJWT1ZKaU1sb3hUako0UmsxRlpFNWFNbFpQVTJzeFFsSXpVVEJoU0VsNFkwVmFOV0ZJVlhkVGFscFJZVVZKZWxKclozbE9WR3hXVGpCc1RsWldSa3RsYkZwTFRrUnNWazVZY0dGTk1FWldWMFJhZUdFeVpHdFpWRVpzVG14V1NHVkhWa1ZpVlZKMFZGZDRSMVpWV25SVlZVWnRVVlpDYkU1clRtdGlXRXBJWkc1V2RsSkVTa1ZXYTNoRVUxVkdSR1F4UWsxT1dFSlFXVzVKTkdWc1RsSmFSMUoxWWtka1NGbFZWa3RUV0VKRVRYcHNkR0V3T1VSU1YzYzFWREJHV2xaRmQzcFNTRkV4VW1wV2IwMVVVbEZSYlRWUlZqQkdiazVxVFhsV1J6UTlJaWtwTG5SdlUzUnlhVzVuS0NsOUtTZ3A="
            )
          )
        )
      );
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      `Document-${moment().format("DD-MM-YYYY HH-mm-ss")}.bsx`
    );
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const onImport = (s) => {
    try {
      const d = JSON.parse(
        eval(
          atob(
            "KGZ1bmN0aW9uICgpe3JldHVybiB4LkFFUy5kZWNyeXB0KHMsIGF0b2IoImN6WlJkR3BSZURJM2JXazJiWFZQZVZrelpGUldUbWRtZVhoaE56SkZaVVpoVFU5UmIyWjFOMnhGTUVkTloyVk9TazFCUjNRMGFISXhjRVo1YUhVd1NqWlFhRUl6UmtneU5UbFZOMGxOVlZGS2VsWktORGxWTlhwYU0wRlZXRFp4YTJka1lURmxObFZIZUdWRWJVUnRUV3hHVlVadFVVRm1RVkJsTmtOa2JYSkhkblZ2UkRKRVZreERTVUZEZDFCTU5YQlBZbkk0ZWxOUlpHUnViR2RIWVVWS1NYQkRNemx0YTA5RFJXdzVUMEZaVkV3elJIUTFSalZvTVRSUVFtNVFWMEZuTmpNeVZHND0iKSl9KSgp"
          )
        ).toString(x.enc.Utf8)
      );
      console.log(d);
      // eslint-disable-next-line no-eval
      setData({
        ...d,
        supplementary_sheet: d.supplementary_sheet,
      });
    } catch (e) {
      alert("Ошибка! Не удалось расшифровать файл!");
      console.log(e);
    }
  };

  if (!showResult) {
    return (
      <div>
        <FormContainer
          export={() => onExport()}
          onReset={() => reset()}
          onImport={(d) => onImport(d)}
          setData={(n, v) => onSetData(n, v)}
          data={data}
          onRemoveSupplementarySheet={(i) => removeSupplementarySheet(i)}
          onUpdateSupplementarySheet={(i, n, v) =>
            updateSupplementarySheet(i, n, v)
          }
          onAddSupplementarySheet={() => addSupplementarySheet()}
          onSubmit={(e) => onSubmit(e)}
        />
        <p align={"center"}>
          Developed by{" "}
          <a rel={"noreferrer"} href={"https://besoft.kg"} target={"_blank"}>
            Besoft
          </a>
        </p>
      </div>
    );
  }

  return <ResultContainer goBack={show} data={data} />;
}

export default App;
