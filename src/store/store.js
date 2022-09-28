import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state() {
    return {
      showLoader: false,
      latitude: "",
      longitude: "",
      weatherDetails: [],
    };
  },
  mutations: {
    setValue(state, payload) {
      const cityDetails = payload.data.list;
      const coord = cityDetails[0].coord;
      const { lat, lon } = coord;
      state.latitude = lat;
      state.longitude = lon;
    },

    loadingSpinner(state, payload) {
      state.showLoader = payload;
    },

    finalValues(state, payload) {
      const dDate = payload.daily;
      console.log(dDate);

      let dates = dDate.map((date) => {
        const hum = date.humidity;
        const sunrise = date.sunrise;
        const sunset = date.sunset;
        // console.log(sunset);
        const moonrise = date.moonrise;
        const moonset = date.moonset;
        var moment = require("moment");
        var si = new Date(0);
        var st = new Date(0);
        var mr = new Date(0);
        var ms = new Date(0);
        const dewPnt = Math.round(date.dew_point);
        const min = Math.round(date.temp.min);
        const max = Math.round(date.temp.max);
        const teemp = date.temp;
        const feel = date.feels_like;
        const wind = date.wind_speed;
        const weather = date.weather[0].description;
        // console.log(weather);
        var d = new Date(0);
        var utcSeconds = date.dt;
        const ri = si.setUTCSeconds(sunrise);
        const se = st.setUTCSeconds(sunset);
        const mri = mr.setUTCSeconds(moonrise);
        const mse = ms.setUTCSeconds(moonset);

        const sunris = moment(ri).format("LT");
        const sunse = moment(se).format("LT");
        const moonri = moment(mri).format("LT");
        const moonse = moment(mse).format("LT");

        d.setUTCSeconds(utcSeconds);
        const dt = d.toDateString();
        const dates = {
          date: dt,
          min: min,
          max: max,
          discription: weather,
          humidity: hum,
          dew: dewPnt,
          temp: teemp,
          feel: feel,
          wind: wind,
          sunrise: sunris,
          sunset: sunse,
          moonrise: moonri,
          moonset: moonse,
        };
        state.weatherDetails.push(dates);
      });
    },
  },
  actions: {
    async getValue(context, val) {
      console.log(val);
      try {
        const response = await axios.get(
          `https://openweathermap.org/data/2.5/find?q=${val}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`
        );
        context.commit("setValue", response);
        context.dispatch("passValue", response);
        context.commit("loadingSpinner", false);
        // console.log(response.data.list);
      } catch (err) {
        context.commit("loadingSpinner", false);
        alert("Invalid Value.Please enter valid Name.");
      }
    },
    async passValue(context, cities) {
      const cityDet = cities.data.list;
      const coordina = cityDet[0].coord;
      const { lat, lon } = coordina;
      const response = await axios.get(
        `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02`
      );
      context.commit("finalValues", response.data);
      // console.log(response.data);
    },
  },
});
