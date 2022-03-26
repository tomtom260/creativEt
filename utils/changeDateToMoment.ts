import moment from "moment"

export function changeDateInJSONToMoment(json: any) {
  return JSON.parse(
    JSON.stringify(json, (key, value) => {
      if (value instanceof Date) {
        return moment(value.getMilliseconds())
      }
      return value
    })
  )
}
