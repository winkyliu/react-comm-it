import moment from "moment";
import Colors from "../styles/Colors";

export function GetListYears() {
  var yearActual = moment().format("YYYY");
  var list = [{ label: "Select", value: null }];
  for (var i = yearActual; i >= 1900; i--) {
    list.push({ label: i, value: i });
  }
  return list;
}

export function GetListSort() {
  return [
    {
      label: "Popularity Desc",
      value: "popularity.desc",
    },
    {
      label: "Popularity Asc",
      value: "popularity.asc",
    },
    {
      label: "Launch Desc",
      value: "primary_release_date.desc",
    },
    {
      label: "Launch Asc",
      value: "primary_release_date.asc",
    },
    {
      label: "Rating Desc",
      value: "vote_average.desc",
    },
    {
      label: "Rating Adc",
      value: "vote_average.asc",
    },
    {
      label: "Title (Z - A)",
      value: "original_title.desc",
    },
    {
      label: "Title (A- Z)",
      value: "original_title.Asc",
    },
  ];
}

export function GetImage(size, image) {
  if (image == undefined || image == null || image == "") return false;
  return `https://image.tmdb.org/t/p/${size}${image}`;
}

export function HexToRgbA(hex, opacity) {
  if (hex == undefined || hex == null) return "";
  const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${opacity})`;
}

export function ConvertRuntime(min) {
  if (min != 0) {
    let h = Math.floor(min / 60);
    let m = min % 60;
    h = h < 10 ? "0" + h + "h" : h + "h";
    m = m < 10 ? "0" + m + "min" : m + "min";
    if (h == "00h") h = "";
    if (m == "00min") m = "";
    return `${h} ${m}`;
  }
}

export function FormatterDollar(money) {
  if (money == undefined || money == "" || money == null) return false;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);
}

export function StatusMovieToBr(status) {
  switch (status) {
    case "Released":
      return "Released";
    case "Post Production":
      return "Post Production";
    case "Planned":
      return "Planned";
  }
}

export function GetColorRating(rating) {
  if (rating == 0) {
    return "#000000";
  } else if (rating > 0 && rating <= 3) {
    return Colors.brand_red;
  } else if (rating > 3 && rating <= 6) {
    return Colors.brand_yellow;
  } else if (rating > 6 && rating <= 10) {
    return Colors.brand_green;
  }
}

export function GetDepartmentPerson(department) {
  switch (department) {
    case "Acting":
      return "Acting";
    case "Scripted":
      return "Scripting";
  }
}
