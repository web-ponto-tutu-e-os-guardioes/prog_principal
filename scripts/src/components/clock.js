import { getCurrentHour } from '../utils/dateTime.js';

export function printCurrentHour(horaMinSeg) {
    horaMinSeg.textContent = getCurrentHour();
}