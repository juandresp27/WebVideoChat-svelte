/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        roomId: params.roomId
    }

    //throw error(404, 'Not found');
}