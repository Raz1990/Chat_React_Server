export default function (id: number) {
    return new Promise((resolve) => {
        const result = getGroupById(id);

        resolve(result);
    });
}

function getGroupById(id) {
    return id;
}