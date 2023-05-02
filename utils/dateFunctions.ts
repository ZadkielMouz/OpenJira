import { formatDistanceToNow } from "date-fns"; 


export const dateToNow = ( date: number ) => {

    const fromNow = formatDistanceToNow( date );

    return fromNow;
}