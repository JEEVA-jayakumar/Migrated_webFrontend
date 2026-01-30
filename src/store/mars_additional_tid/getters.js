export const additionalTidFromMars = (state) => {
  console.log("Getter Datas------------------>"+JSON.stringify(MARS_tid))
    return state.TidFromMars
  }

  export const additionalTidFromBackEnd = (state) => {
    return state.TidFromBackEnd
  }
