import ClockHandType from "./ClockHandType";

const AppSettings = {
    clockHandType: ClockHandType,
    clock: {
      size: 300,
      border: {
        isEnable: true,
        size: 3,
        color: "black"
      },
      background: "",
      clockHands: {
        totalRatio: 1,
        [ClockHandType.Hour]: {
          isEnable: true,
          ratio: 0.5,
          weight: 12,
          color: "black",
          background: ""
        },
        [ClockHandType.Minute]: {
          isEnable: true,
          ratio: 0.75,
          weight: 5,
          color: "black",
          background: ""
        },
        [ClockHandType.Second]: {
          isEnable: true,
          ratio: 0.8,
          weight: 3,
          color: "red",
          background: ""
        },
      },
    },
  }

  export default AppSettings;