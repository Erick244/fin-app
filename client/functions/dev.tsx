export async function fakeLoadingTime(time: number) {
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve("END");
        }, time);
    });
}
