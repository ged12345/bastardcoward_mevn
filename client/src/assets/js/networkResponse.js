/* eslint-disable */

export default async function checkResponseAndReturnValue(
  response,
  dataArrStartIndex = 0,
  dataArrRangeLength = null
) {
  //console.log(response.data);
  if (response.data.game_data.length === 0) {
    return null;
  } else if (dataArrRangeLength === "end") {
    return response.data.game_data;
  } else if (dataArrRangeLength !== null) {
    return response.data.game_data.slice(dataArrStartIndex, dataArrRangeLength);
  } else {
    return response.data.game_data[dataArrStartIndex];
  }
}
