import { useCallback, useEffect, useState } from "react";
import FormContainer from "./containers/FormContainer";
import ResultContainer from "./containers/ResultContainer";
import moment from "moment";
import "moment/locale/ru";
import x from "crypto-js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { randomIntFromInterval } from "./utils";

moment.locale("ru");

const INITIAL_DATA = {
  supplementary_sheet: [
    {
      dek_2_2: "TT",
      dek_2_1: "TP",
      valut_st_usd_3: "USD",
      valut_st_usd_2: "USD",
      valut_st_usd_1: "USD",
      otprav_2: "CM. ГР. 2-8",
      kod_tovara_2: "6208883941",
      otpr_2: "417210724/070921/000000394",
      mark_kol_1: "1 ",
      mark_kol_2: "1 ",
      mark_kol_3: "1 ",
      number_containers_1: "2",
      number_containers_2: "2",
      number_containers_3: "2",
      col_otlichitel_1: "NA-2",
      cod_tovar_2_1: "620374350",
      ves_2_1: "112.400",
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
      mark_kol_1: "1 ",
      mark_kol_2: "1 ",
      mark_kol_3: "1 ",
      number_containers_1: "2",
      number_containers_2: "2",
      number_containers_3: "2",
      col_otlichitel_1: "NA-3",
      cod_tovar_2_1: "23632",
      ves_2_1: "4021.45",
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

  trans: "на границе",
  data: "01.12.2023 19:02:23",
  dann: "01.12.2023 19:01:38",
  tt: "TT",
  tp: "TP",
  usd22: "USD",
  perv42: "USD",
  garant52: "СОПРОВОЖДЕНИЕ",
  otprav: "URUMQI KAILINGDA INTERNATIONAL TRADE CO. LTD, КИТАЙ",
  organ: "41762107/011223/0006842",
  get8: "LLC FE TASHKENT TRADE CENTER, УЗБЕКИСТАН, Г. ТАШКЕНТ,",
  tv5: "23",
  mst6: "1131",
  strana: "КИТАЙ",
  strnaz: "УЗБЕКИСТАН",
  iden18: "1: 01M004724/013273AA",
  uz: "UZ",
  kont: "0",
  summ: "21900.95",
  iden21: "1: P17453/P6962",
  kg: "KG",
  numb: "2",
  coli: "BG - 3",
  tvr32: "1",
  kod33: "6201400000",
  ves35: "137.900",
  decl40: "ДВХ 41762107230022529/1",
  dop44: "02015 00006372 01.12.2023\n04021 7265 24.11.2023",
  perv41: "150   796",
  vtr42: "225.00",
  koddi: "796",
  princ1:
    "СУЛАЙМАНОВ К, , КЫРГЫЗСТАН,\nURUMQI KAILINGDA INTERNATIONAL TRADE CO.LTD,, КИТАЙ",
  mest: 'МТО "БИМИ ОШ СЕРВИС", 01.12.2023',
  organC:
    '1 41762107 - МТО "БИМИ ОШ СЕРВИС" \n 2 01 - ВЫПУСК РАЗРЕШЕН\n 01.12.2023\n АКБАРОВ А',
  kod52: "05",
  organ53: '41762101 - МПТП "ДОСТУК"',
  plomb: "3 НОМЕР: ГТИ КР 420, ГТИ КР 420, ГТИ КР 420",
  tranzit:
    '04.12.2023/41762101 - МПТП "ДОСТУК";\nКЫРГЫЗСТАН; ОШСКАЯ ОБЛ., КАРА-СУЙСКИЙ Р-Н, (5КМ А/Д ОШ-АНДИЖАН',
  podpis: "KGAA0882649",
  mar31: "1 ",
};

console.log(Object.keys(INITIAL_DATA).length);

const getSupplementarySheetInitData = (data: any) => {
  return {
    dek_2_2: "TT",
    dek_2_1: "TP",
    valut_st_usd_3: "USD",
    valut_st_usd_2: "USD",
    valut_st_usd_1: "USD",

    otpr_2: data.organ,
    dop_info_2_1: data.dop44,
    dop_info_2_2: data.dop44,
    dop_info_2_3: data.dop44,

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
  const localstorage_data =
    JSON.parse(localStorage.getItem("___data") || "{}") || {};
  return {
    // trans: "на границе",
    // data: moment().format("DD.MM.YYYY HH:mm:ss"),
    // dann: moment().format("DD.MM.YYYY HH:mm:ss"),
    // tt: "TT",
    // tp: "TP",
    // usd22: "USD",
    // perv42: "USD",
    // garant52: "СОПРОВОЖДЕНИЕ",

    ...INITIAL_DATA,
    ...localstorage_data,

    mar31: "1 ",
    supplementary_sheet: localstorage_data.supplementary_sheet
      ? localstorage_data.supplementary_sheet.map((g: any) => {
          g["mark_kol_1"] = "1 ";
          g["mark_kol_2"] = "1 ";
          g["mark_kol_3"] = "1 ";

          g["number_containers_1"] = "2";
          g["number_containers_2"] = "2";
          g["number_containers_3"] = "2";

          g["otprav_2"] = "CM. ГР. 2-8";

          return g;
        })
      : INITIAL_DATA.supplementary_sheet,
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

  const onSubmit = useCallback(() => {
    setShowResult(true);
    Object.keys(data).map((v) => {
      if (v === "supplementary_sheet" || v === "dann" || v === "data") {
        return false;
      }
      const items = JSON.parse(localStorage.getItem(v) || "") || [];
      if (!items.includes(data[v])) {
        items.push(data[v]);
        localStorage.setItem(v, JSON.stringify(items));
      }
      return null;
    });
    localStorage.setItem("___data", JSON.stringify(data));
  }, [data]);

  const onSetData = (n: any, v: any) => {
    // @ts-ignore
    setData((p) => {
      const g = { ...p };

      if (n === "organ") {
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s: any) => {
          s["otpr_2"] = v;
          return s;
        });
      } else if (n === "data") {
        g["dann"] = moment(v, "DD.MM.YYYY HH:mm:ss")
          .subtract(randomIntFromInterval(10, 30), "seconds")
          .format("DD.MM.YYYY HH:mm:ss");
      } else if (n === "dop44") {
        g["supplementary_sheet"] = g["supplementary_sheet"].map((s: any) => {
          s["dop_info_2_1"] = v;
          s["dop_info_2_2"] = v;
          s["dop_info_2_3"] = v;
          return s;
        });
      }

      g[n] = v;

      return g;
    });
  };

  useEffect(() => {
    let sum = +data["vtr42"] || 0;
    data["supplementary_sheet"].map((g: any) => {
      sum += +g["valut_st_summ_1"] || 0;
      sum += +g["valut_st_summ_2"] || 0;
      sum += +g["valut_st_summ_3"] || 0;
      return g;
    });
    // @ts-ignore
    setData((o) => {
      const g = { ...o };
      g["summ"] = `${sum.toFixed(2)}`;
      return g;
    });
  }, [data.supplementary_sheet, data.vtr42, data.supplementary_sheet.length]);

  const updateSupplementarySheet = useCallback(
    (i: number, n: string, v: any) => {
      setData((p: any) => {
        const g = { ...p };
        g["supplementary_sheet"][i][n] = v;
        return g;
      });
    },
    []
  );

  const removeSupplementarySheet = (i: number) => {
    // @ts-ignore
    setData((p) => {
      const g = { ...p };
      g["supplementary_sheet"].splice(i, 1);
      return g;
    });
  };

  const addSupplementarySheet = () => {
    // @ts-ignore
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
    // @ts-ignore
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

  const onExport = useCallback(() => {
    // eslint-disable-next-line no-eval
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        x.AES.encrypt(
          JSON.stringify(data),
          atob(
            "czZRdGpReDI3bWk2bXVPeVkzZFRWTmdmeXhhNzJFZUZhTU9Rb2Z1N2xFMEdNZ2VOSk1BR3Q0aHIxcEZ5aHUwSjZQaEIzRkgyNTlVN0lNVVFKelZKNDlVNXpaM0FVWDZxa2dkYTFlNlVHeGVEbURtTWxGVUZtUUFmQVBlNkNkbXJHdnVvRDJEVkxDSUFDd1BMNXBPYnI4elNRZGRubGdHYUVKSXBDMzlta09DRWw5T0FZVEwzRHQ1RjVoMTRQQm5QV0FnNjMyVG4="
          )
        ).toString()
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
  }, [data]);

  // @ts-ignore
  const onImport = (s) => {
    try {
      const d = JSON.parse(
        x.AES.decrypt(
          s,
          "s6QtjQx27mi6muOyY3dTVNgfyxa72EeFaMOQofu7lE0GMgeNJMAGt4hr1pFyhu0J6PhB3FH259U7IMUQJzVJ49U5zZ3AUX6qkgda1e6UGxeDmDmMlFUFmQAfAPe6CdmrGvuoD2DVLCIACwPL5pObr8zSQddnlgGaEJIpC39mkOCEl9OAYTL3Dt5F5h14PBnPWAg632Tn"
        ).toString(x.enc.Utf8)
      );
      // eslint-disable-next-line no-eval
      setData({
        ...INITIAL_DATA,
        ...d,
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
          // @ts-ignore
          export={() => onExport()}
          onReset={() => reset()}
          onImport={(d: any) => onImport(d)}
          setData={(n: any, v: any) => onSetData(n, v)}
          data={data}
          onSetGlobalData={setData}
          onRemoveSupplementarySheet={(i: number) =>
            removeSupplementarySheet(i)
          }
          onUpdateSupplementarySheet={(i: any, n: any, v: any) =>
            updateSupplementarySheet(i, n, v)
          }
          onAddSupplementarySheet={() => addSupplementarySheet()}
          onSubmit={() => onSubmit()}
        />
        <p style={{ textAlign: "center" }}>
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
