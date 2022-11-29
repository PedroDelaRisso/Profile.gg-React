export default function importAll(r) {
    let images = {};
    r.keys().forEach((item: any, index: string | number) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}