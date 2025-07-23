import moment from 'moment'

const getTimes = (time) => {
  if (time) {
    let multiply = time?.toString()?.length > 10 ? 1 : 1000
    const timestampMilliseconds = parseInt(time)
    const timestampSeconds = timestampMilliseconds * multiply
    const date = new Date(timestampSeconds)
    const hour_12_format = date.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    const hour = parseInt(hour_12_format)
    const minute = date.getMinutes()
    const format = date
      .toLocaleString('en-US', { hour: 'numeric', hour12: true, hourCycle: 'h12' })
      .slice(-2)
    return {
      hour,
      minute: parseInt(minute) / 5 || 12,
      format
    }
  } else {
    return {
      hour: '',
      minute: '',
      format: ''
    }
  }
}

const getHour = (hour) => {
  let formateHour = parseInt(hour) < 10 ? '0' + hour : hour
  return formateHour
}

const getMinute = (minute) => {
  const formatMinute =
    parseInt(minute) * 5 < 10
      ? '0' + parseInt(minute) * 5
      : parseInt(minute) * 5 === 60
        ? '00'
        : parseInt(minute) * 5
  return formatMinute
}

const margeDateTime = (date, time) => {
  if (date && time) {
    const finalDate = Number(date) / 1000
    const finalTime = Number(time) / 1000
    const momentDate = moment.unix(finalDate)
    const momentTime = moment.unix(finalTime)
    const timeString = momentTime.format('HH:mm')
    const dateString = momentDate.format('MM/DD/YYYY')
    const combinedDateTimeString = `${dateString} ${timeString}`
    const combinedDateTime = moment(combinedDateTimeString, 'MM/DD/YYYY HH:mm').unix()
    return combinedDateTime * 1000
  } else {
    return null
  }
}

export { getHour, getMinute, getTimes, margeDateTime }
