import { mapKeys } from 'lodash';

export default function (players) {
    return mapKeys({ ...players }, () => ('player#' + Math.random().toString(10).substr(2, 8)));
}