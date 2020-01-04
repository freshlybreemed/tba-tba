import { Map } from 'immutable';

export function clearToken() {
  return undefined;
}

export function getToken() {
  return undefined;
}

export function timeDifference(givenTime) {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => (num > 9 ? '' + num : '0' + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'a few seconds ago';
  };
  return getTime();
}

export const slugify = string => {
  if (!string) {
    return '';
  }
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');
  const slug = string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters in a with b
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w-]+/g, '') // Remove all non-word characters such as spaces or tabs
    .replace(/--+/g, '-') // Replace multiple — with single -
    .replace(/^-+/, '') // Trim — from start of text
    .replace(/-+$/, ''); // Trim — from end of text
  return slug;
};
// Format price
export function getTime(datetime, mode) {
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var dateTime = new Date(datetime);
  var day = days[dateTime.getDay()];
  var hr = dateTime.getHours();
  var min = dateTime.getMinutes();
  if (min < 10) {
    min = '0' + min;
  }
  var ampm = 'am';
  if (hr > 12) {
    hr -= 12;
    ampm = 'pm';
  }
  var date = dateTime.getDate();
  if (date > 3 && date < 21) date = date + 'th';
  switch (date % 10) {
    case 1:
      date = date + 'st';
      break;
    case 2:
      date = date + 'nd';
      break;
    case 3:
      date = date + 'rd';
      break;
    default:
      break;
  }
  var month = months[dateTime.getMonth()];
  var year = dateTime.getFullYear();
  if (mode === 'full') return `${day}, ${month} ${date}  ${hr}:${min} ${ampm}`;
  if (mode === 'time') return hr + ':' + min + ampm;
  if (mode === 'date') return day + ', ' + month + ' ' + date;
}

export function formatPrice(number) {
  const fnumber = parseFloat(number);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(fnumber);
}
