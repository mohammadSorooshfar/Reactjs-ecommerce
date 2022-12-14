import { ACCESS_TOKEN } from "configs/variables.config";
import { useLayoutEffect } from "react";
import { NavigateFunction, useLocation } from "react-router-dom";
import {
  IOrder,
  IOrderManagement,
  IPriceManagement,
  IProduct,
  IProductManagement,
} from "types/interfaces.types";

export const parseJwt = (token: string) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};
export const CheckUserExpired = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return;
  const { exp } = parseJwt(token);
  console.log(exp * 1000, Date.now());

  if (exp * 1000 < Date.now()) {
    localStorage.removeItem(ACCESS_TOKEN);
    return false;
  }
  return true;
};

export function convertMiladiToShamsi(gy: number, gm: number, gd: number) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy + "/" + jm + "/" + jd];
}

export function isAnProductManagement(obj: any): obj is IProductManagement {
  return obj.category;
}
export function isAnPriceManagement(obj: any): obj is IPriceManagement {
  return obj.price;
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function createOrderDataForManagementTable(data: IOrder[]) {
  const orders: IOrderManagement[] = data.map((order) => ({
    id: order.id,
    name: order.userDescription.name + " " + order.userDescription.family,
    orderSubmitDate: order.orderSubmitDate,
    totalPrice: order.totalPrice,
  }));
  return orders;
}
export function createProductDataForManagementTable(data: IProduct[]) {
  const products: IProductManagement[] = data.map((product) => ({
    id: product.id,
    category: product.category,
    name: product.name,
    gender: product.gender,
    colors: product.colors,
    images: product.images,
  }));
  return products;
}

export function createPriceDataForManagementTable(data: IProduct[]) {
  const products: IPriceManagement[] = data.map((product) => ({
    id: product.id,
    inventory: product.inventory,
    name: product.name,
    price: product.price,
  }));
  return products;
}

export const checkAuth = () => {
  if (localStorage.hasOwnProperty("ACCESS_TOKEN")) {
    return true;
  } else {
    if (sessionStorage.getItem("ACCESS_TOKEN")) {
      return true;
    }
    return false;
  }
};

export const logout = (navigate: NavigateFunction) => {
  localStorage.removeItem("ACCESS_TOKEN");
  navigate("/tehranshoes");
};

export const genderEnglish = (gender: string) => {
  switch (gender) {
    case "????????????":
      return { en: "men", fa: "????????????" };
    case "??????????":
      return { en: "women", fa: "??????????" };
    case "????????????":
      return { en: "kid", fa: "????????????" };

    default:
      break;
  }
};
export const categoryEnglish = (category: string) => {
  switch (category) {
    case "??????????":
      return { en: "sneaker", fa: "??????????" };
    case "????????":
      return { en: "oxford", fa: "????????" };
    case "??????????":
      return { en: "sport", fa: "??????????" };

    default:
      break;
  }
};
export const getToken = () => {
  return (
    localStorage.getItem("ACCESS_TOKEN") ||
    sessionStorage.getItem("ACCESS_TOKEN")
  );
};
export const colorGenerator = (color: string) => {
  switch (color) {
    case "????????":
      return "red";
    case "????????????":
      return "orange";
    case "????????":
      return "black";
    case "????????":
      return "purple";
    case "????????":
      return "white";
    case "??????":
      return "yellow";
    case "??????":
      return "blue";
    case "???????? ????":
      return "silver";
    case "??????????":
      return "pink";
    case "??????":
      return "green";
    case "???????? ????":
      return "brown";
    case "??????":
      return "#E5C9B3";

    default:
      break;
  }
};
function addComma(num: string) {
  var str = num;
  str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str;
}
export const persianNumber = (number: string) => {
  number = addComma(number);
  let output = "";
  for (let index = 0; index < number.length; index++) {
    const num = number[index];

    switch (num) {
      case "1":
        output += "??";
        break;
      case "2":
        output += "??";
        break;
      case "3":
        output += "??";
        break;
      case "4":
        output += "??";
        break;
      case "5":
        output += "??";
        break;
      case "6":
        output += "??";
        break;
      case "7":
        output += "??";
        break;
      case "8":
        output += "??";
        break;
      case "9":
        output += "??";
        break;
      case "0":
        output += "??";
        break;
      case ",":
        output += ",";
        break;
      default:
        break;
    }
  }

  return output;
};

export const disablePastDate = () => {
  let dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  let monthString, dayString;
  if (month < 10) monthString = "0" + month.toString();
  if (day < 10) dayString = "0" + day.toString();

  return year + "-" + monthString + "-" + dayString;
};

export const ScrollToTop = ({ children }: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
