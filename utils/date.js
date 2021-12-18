const now = () => {
    const time = new Date();
    const day = ('0' + time.getDate()).slice(-2);
    const month = ('0' + (time.getMonth() + 1)).slice(-2);
    const year = time.getFullYear();

    return `${year}/${month}/${day}`;
}

module.exports = {
    now
}