export let trackObject = JSON.parse(localStorage.getItem('track'));
if(!trackObject) {
    trackObject={}
}

export function assignValue(value) {
  trackObject=value
}