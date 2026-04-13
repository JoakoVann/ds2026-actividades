let priceFin = 0;
const calcPrecioFinal = (monto, medio) =>{
    if(monto < 200){
        priceFin = monto;
    }
    else if (monto > 200 | monto < 400) {
        if (medio === "e"){
            priceFin = monto - (monto *0.3);
        } else if(medio === "d"){
            priceFin = monto - (monto *0.2);
        } else {
            priceFin = monto - (monto *0.1);
        };
    }
    else{
        priceFin = monto - (monto * 0,4); 
    }
    console.log(`Monto: ${monto} | Pago: ${medio} | Final: ${priceFin}`)
}