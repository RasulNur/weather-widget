var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: [],
            },
            f,
            y,
            t,
            g;
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === "function" &&
                (g[Symbol.iterator] = function () {
                    return this;
                }),
            g
        );
        function verb(n) {
            return function (v) {
                return step([n, v]);
            };
        }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while ((g && ((g = 0), op[0] && (_ = 0)), _))
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                op[0] & 2
                                    ? y["return"]
                                    : op[0]
                                    ? y["throw"] ||
                                      ((t = y["return"]) && t.call(y), 0)
                                    : y.next) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t;
                    if (((y = 0), t)) op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0;
                                continue;
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2]) _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
var _this = this;
var WEATHER_API_KEY = "8dcfc9268c16525eda1dcd155bef5596";
var IP_API_KEY = "7bd8e6f5207a4dfca326e7a0a8d2ed86";
var weatherWidget = document.querySelector(".weather-widget");
var render = function () {
    return __awaiter(_this, void 0, void 0, function () {
        var ip,
            latitude,
            longitude,
            city,
            weatherData,
            main,
            weather,
            temp,
            temp_max,
            temp_min,
            humidity,
            pressure,
            description;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, getUserIP(IP_API_KEY)];
                case 1:
                    ip = _a.sent();
                    (latitude = ip.latitude),
                        (longitude = ip.longitude),
                        (city = ip.city);
                    return [
                        4 /*yield*/,
                        getWeatherData(latitude, longitude, WEATHER_API_KEY),
                    ];
                case 2:
                    weatherData = _a.sent();
                    (main = weatherData.main), (weather = weatherData.weather);
                    (temp = main.temp),
                        (temp_max = main.temp_max),
                        (temp_min = main.temp_min),
                        (humidity = main.humidity),
                        (pressure = main.pressure);
                    description = weather[0].description;
                    getMarkup(
                        temp,
                        city,
                        description,
                        temp_max,
                        temp_min,
                        humidity,
                        pressure
                    );
                    return [2 /*return*/];
            }
        });
    });
};
var getUserIP = function (key) {
    return __awaiter(_this, void 0, void 0, function () {
        var ipRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        fetch(
                            "https://api.ipgeolocation.io/ipgeo?apiKey=".concat(
                                key,
                                "&fields=geo&excludes=ip,country_code2,country_code3,country_name,district,state_code,state_prov,zipcode"
                            )
                        ),
                    ];
                case 1:
                    ipRes = _a.sent();
                    return [4 /*yield*/, ipRes.json()];
                case 2:
                    return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var getWeatherData = function (latitude, longitude, key) {
    return __awaiter(_this, void 0, void 0, function () {
        var weatherRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        fetch(
                            "https://api.openweathermap.org/data/2.5/weather?lat="
                                .concat(latitude, "&lon=")
                                .concat(longitude, "&appid=")
                                .concat(key, "&units=metric")
                        ),
                    ];
                case 1:
                    weatherRes = _a.sent();
                    return [4 /*yield*/, weatherRes.json()];
                case 2:
                    return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var getMarkup = function (
    temp,
    city,
    description,
    temp_max,
    temp_min,
    humidity,
    pressure
) {
    var html =
        '\n\t\t<div classname="weather-widget__top-wrapper">\n\t\t\t<div class="weather-widget__value">'
            .concat(
                Math.round(temp),
                '\u00B0C</div>\n\t\t\t<div class="weather-widget__main-info">\n\t\t\t\t<h1 class="weather-widget__city-name">'
            )
            .concat(city, '</h1>\n\t\t\t\t<p class="weather-widget__descr">')
            .concat(
                description,
                '</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<ul class="weather-widget__list">\n\t\t\t<li class="weather-widget__list-item">\n\t\t\t\t<p>Max temp: '
            )
            .concat(
                Math.round(temp_max),
                '\u00B0C</p>\n\t\t\t</li>\n\t\t\t<li class="weather-widget__list-item">\n\t\t\t\t<p>Min temp: '
            )
            .concat(
                Math.round(temp_min),
                '\u00B0C</p>\n\t\t\t</li>\n\t\t\t<li class="weather-widget__list-item">\n\t\t\t\t<p>Humidity: '
            )
            .concat(
                humidity,
                '%</p>\n\t\t\t</li>\n\t\t\t<li class="weather-widget__list-item">\n\t\t\t\t<p>Pressure: '
            )
            .concat(pressure, "</p>\n\t\t\t</li>\n\t\t</ul>\n    ");
    weatherWidget.innerHTML = html;
};
render();
