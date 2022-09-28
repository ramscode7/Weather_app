<template>
  <div>
    <div class="input-text">
      <p>Search City</p>
      <input type="text" placeholder="Enter Here" v-model="value" />
      <button @click="sendValue">Search</button>
    </div>

    <div class="dtext">
      <p class="text">8-Days Forecast</p>
      <p class="city">{{ city }}</p>
    </div>

    <div class="weather" v-if="weathDetails != ''">
      <div v-for="wDet in weathDetails" :key="wDet.date" class="weather_1">
        <div class="for_date">
          <p>{{ wDet.date }}</p>
        </div>

        <div class="for_img">
          <span
            ><img
              :src="heavy"
              alt="#"
              v-if="wDet.discription === 'heavy rain'"
            />
            <img
              :src="moderate"
              alt="#"
              v-else-if="wDet.discription === 'moderate rain'"
            />
            <img
              :src="light"
              alt="#"
              v-else-if="wDet.discription === 'light rain'"
            />
            <img
              :src="over"
              alt="#"
              v-else-if="wDet.discription === 'overcast clouds'"
            />
            <img
              :src="clear"
              alt="#"
              v-else-if="wDet.discription === 'clear sky'"
            />
            <img
              :src="shatter"
              alt="#"
              v-else-if="wDet.discription === 'scattered clouds'"
            />
            <img
              :src="fewClouds"
              alt="#"
              v-else-if="wDet.discription === 'few clouds'"
            />
            <img
              :src="intensity"
              alt="#"
              v-else-if="wDet.discription === 'heavy intensity rain'"
            />
            <img
              :src="broken"
              alt="#"
              v-else-if="wDet.discription === 'broken clouds'"
            />
            <p>{{ wDet.max }}/{{ wDet.min }}&#8451;</p></span
          >
        </div>

        <div class="for_details">
          <p>{{ wDet.discription }}</p>
          <button @click="clk(wDet)">Details</button>
        </div>
      </div>

      <div v-if="details">
        <div class="model" v-for="sDet in showDetails" :key="sDet.date">
          <p>
            <span>{{ sDet.discription }}.</span>
          </p>
          <p class="det_t">
            The High will be {{ sDet.max }}&#8451;,and Low will be
            {{ sDet.min }}&#8451;.
          </p>
          <p><span>Humidity:</span>&nbsp;{{ sDet.humidity }}%.</p>
          <p><span>Dew Point:</span>&nbsp;{{ sDet.dew }}&#8451;.</p>
          <p><span>Wind Speed:</span>&nbsp;{{ sDet.wind }}m/s.</p>
          <div class="tab">
            <table>
              <tr>
                <th></th>
                <th>Morning</th>
                <th>AfterNoon</th>
                <th>Evening</th>
                <th>Night</th>
              </tr>
              <tr>
                <td>Temperature</td>
                <td>{{ Math.round(sDet.temp.morn) }}&#8451;.</td>
                <td>{{ Math.round(sDet.temp.day) }}&#8451;.</td>
                <td>{{ Math.round(sDet.temp.eve) }}&#8451;.</td>
                <td>{{ Math.round(sDet.temp.night) }}&#8451;.</td>
              </tr>
              <tr>
                <td>Feels Like</td>
                <td>{{ Math.round(sDet.feel.morn) }}&#8451;.</td>
                <td>{{ Math.round(sDet.feel.day) }}&#8451;.</td>
                <td>{{ Math.round(sDet.feel.eve) }}&#8451;.</td>
                <td>{{ Math.round(sDet.feel.night) }}&#8451;.</td>
              </tr>
            </table>
          </div>
          <br />

          <div class="tab">
            <table>
              <tr>
                <th>Sunrise</th>
                <th>Sunset</th>
                <th>Moonrise</th>
                <th>Moonset</th>
              </tr>
              <tr>
                <td>{{ sDet.sunrise }}</td>
                <td>{{ sDet.sunset }}</td>
                <td>{{ sDet.moonrise }}</td>
                <td>{{ sDet.moonset }}</td>
              </tr>
            </table>
          </div>
          <button @click="clse">close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value: "",
      city: "",
      details: false,
      opa: false,
      showDetails: [],
      moderate: "https://bit.ly/3eOtv81",
      heavy: "https://bit.ly/3QOnjdD",
      intensity: "https://bit.ly/3BCtwnm",
      light: "https://bit.ly/3BjQKOU",
      over: "https://bit.ly/3BM7VdB",
      clear: "https://bit.ly/3xtWSD1",
      broken: "https://bit.ly/3BKTK8r",
      fewClouds: "https://bit.ly/3RVJfoh",
      shatter: "https://bit.ly/3SktveG",
    };
  },
  computed: {
    ...mapState({
      weathDetails: (state) => state.weatherDetails,
    }),
  },
  methods: {
    clk(v) {
      console.log(v);
      this.showDetails.push(v);
      console.log(this.showDetails);
      this.details = true;
      this.opa = true;
    },
    clse() {
      this.details = false;
      this.opa = false;
    },
    sendValue() {
      this.$store.dispatch("getValue", this.value);
      this.city = this.value;
      this.value = "";
      this.$store.commit("loadingSpinner", true);
    },
  },
};
</script>

<style scoped>
.input-text {
  text-align: center;
}
.input-text p {
  font-size: 20px;
  font-family: sans-serif;
  font-style: italic;
}
input {
  width: 15rem;
  height: 1.5rem;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid transparent;
  border-bottom: 2px solid black;
  padding: 0.2rem;
  background-color: aliceblue;
}
button {
  margin-left: 0.5rem;
  cursor: pointer;
  width: 4.5rem;
  height: 2.06rem;
  border-radius: 10px;
  font-size: 15px;
  border-bottom: 1px solid black;
  background-color: aliceblue;
}
button:active {
  background-color: rgb(240, 248, 254);
  transform: scale(1.05);
}
.text {
  font-size: 18px;
  font-weight: bold;
  font-family: sans-serif;
  margin-left: 28rem;
}
.dtext {
  display: flex;
  justify-content: space-between;
}
.city {
  margin-right: 29rem;
  font-size: 18px;
  font-family: sans-serif;
  font-weight: bold;
  text-decoration: underline;
}
.weather {
  margin-top: 0.5rem;
  padding: 1.1rem;
  margin-left: 24.5rem;
  border: 1px solid transparent;
  width: 44%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: aliceblue;
  border-radius: 15px;
}
.weather_1 {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
}
.weather_1 p {
  padding: 0.4rem;
  font-size: 16px;
  font-family: sans-serif;
  background-color: aliceblue;
}
.weather_1 span {
  display: flex;
  margin-left: 2.3rem;
  background-color: aliceblue;
}
img {
  height: 35px;
  margin-top: 10px;
  width: 50px;
  background: transparent;
  border-radius: 12px;
}
.weather_1 button {
  font-size: 14px;
  margin-top: 1rem;
  border: transparent;
  box-shadow: rgba(0, 0, 0, 0.35) 1.95px 1.95px 2.6px;
}
.weather_1 button:hover {
  transform: scale(1.04);
  background-color: rgb(243, 246, 249);
}
.for_details {
  display: flex;
  justify-content: end;
  background-color: aliceblue;
}
.for_img {
  background-color: aliceblue;
}
.for_date {
  background-color: aliceblue;
}
.details {
  display: flex;
}
.model {
  position: fixed;
  top: 22%;
  left: 27%;
  width: 44.4%;
  padding: 0.8rem;
  height: 33rem;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
.model span {
  background: transparent;
  font-weight: bold;
  font-size: 16px;
}
.det_t {
  text-decoration: underline;
  font-size: 16.7px;
}
.model p {
  background: transparent;
  margin: 1.2rem;
}
.tab {
  background-color: transparent;
  width: 100%;
}
table {
  background-color: transparent;
  width: 40.8rem;
}
th,
td {
  background-color: transparent;
  border-radius: 8px;
  width: 15rem;
  text-align: center;
  padding: 0.7rem;
}
.model button {
  margin-top: 1.9rem;
  margin-left: 18.1rem;
}
.model button:active {
  transform: scale(1.07);
  background-color: rgb(224, 227, 227);
}
</style>
