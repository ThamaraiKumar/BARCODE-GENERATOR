let uniqueInput=document.getElementById("unique-input");
let uniqueButton=document.getElementById("unique-btn-barcode-generator");

uniqueButton.addEventListener("click",()=>{
    JsBarcode("#unique-barcode",uniqueInput.value,{
        format:"code128",
        displayValue:true,
        fontSize:24,
        lineColor:"black",
    });
});

let downloadButton=document.getElementById("download-btn");
let svg=document.getElementById("unique-barcode");

downloadButton.addEventListener("click",()=>{
    if(uniqueInput.value!='')
    {
        let data=(new XMLSerializer()).serializeToString(svg);
        let svgblob=new Blob([data],{type:'image/svg+xml;charset=utf-8'})
        let url=URL.createObjectURL(svgblob);
        convertToPNG(url);
    }
})

let convertToPNG = (svgURL) => {
    let img = new Image();
    img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        let pngURL = canvas.toDataURL('image/png');
        download(pngURL, 'image.png');
    };
    img.src = svgURL;
};

let download=(imageURL,filename)=>{
    let a=document.createElement('a');
    a.setAttribute('download',filename);
    a.setAttribute('href',imageURL);
    a.setAttribute('target','_blank');
    a.click();
}

window.onload=(event)=>{
    uniqueInput.value="";
};