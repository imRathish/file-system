export const data = {
    myfolder: {
        type:"FOLDER",
        children: ['file1.txt', 'file2.pdf'],
        'file1.txt':{
            type:"FILE",
            fileExtension: "pdf",
            children: [],
        },
        'file2.txt':{
            type:"FILE",
            fileExtension: "txt",
            children: [],
        }
    }
}