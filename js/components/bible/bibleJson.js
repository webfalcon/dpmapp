import { FileSystem } from "expo";
let data;


export default async function(book) {
    await FileSystem.readAsStringAsync(FileSystem.documentDirectory + book +'.json').then((res)=>{
        data = JSON.parse(res);
    });

    return data;
}



//export default bJson;