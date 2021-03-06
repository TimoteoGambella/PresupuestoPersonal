const ingresos = []

const egresos = []

let cargarApp = ()=>{
    buscarStorage()
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}

let totalIngresos = ()=>{
    let totalIngreso=0
    for (let ingreso of ingresos){
        totalIngreso+=ingreso.valor
    }
    return totalIngreso
}
let totalEgresos = ()=>{
    let totalEgreso=0
    for (let egreso of egresos){
        totalEgreso+=egreso.valor
    }
    return totalEgreso
}

let cargarCabecero =()=>{
    let presupuesto = totalIngresos() - totalEgresos()
    let porcentajeEgreso = totalEgresos()/totalIngresos()
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto)
    document.getElementById("porcentaje").innerHTML=formatoPorcentaje(porcentajeEgreso)
    document.getElementById("ingreso").innerHTML=formatoMoneda(totalIngresos())
    document.getElementById("egreso").innerHTML=formatoMoneda(totalEgresos())
}

const formatoMoneda=(valor)=>{
    return valor.toLocaleString("en-US",{style:"currency", currency:"USD", minimumFractionDigits:2})
}
const formatoPorcentaje= (valor)=>{
    return valor.toLocaleString("en-US",{style:"percent", minimumFractionDigits:2})
}


const cargarIngresos=()=>{
    let ingresosHTML=""
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso)
    }
    document.getElementById("lista-ingresos").innerHTML=ingresosHTML
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML=`
    <div class="elemento limpiarEstilos">
        <div class="elemento_fecha">${ingreso._fecha}</div>
        <div class="elemento_descripcion"> ${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    return ingresoHTML
}

const eliminarIngreso=(id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso=>ingreso.id===id)
    let respuesta = confirm("Esta seguro que desea eliminar "+ ingresos[indiceEliminar]._descripcion)
    if(respuesta){
        ingresos.splice(indiceEliminar,1)
        cargarCabecero()
        cargarIngresos()
        actualizarStorage()
    }
}

const cargarEgresos = () =>{
    let egresosHTML=""
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso)
    }
    document.getElementById("lista-egresos").innerHTML=egresosHTML
}

const crearEgresoHTML = (egreso) =>{
    let egresoHTML=`
    <div class="elemento limpiarEstilos">
        <div class="elemento_fecha">${egreso._fecha}</div>
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHTML
}

const eliminarEgreso=(id)=>{
    let indiceEliminar = egresos.findIndex(egreso=>egreso.id===id)
    let respuesta = confirm("Esta seguro que desea eliminar "+ egresos[indiceEliminar]._descripcion)
    if(respuesta){
        egresos.splice(indiceEliminar,1)
        cargarCabecero()
        cargarEgresos()
        actualizarStorage()
    }
}

let agregarDato = ()=>{
    let forma=document.forms["forma"]
    let tipo = forma["tipo"]
    let descripcion=forma["descripcion"]
    let valor=forma["valor"]
    let fecha = forma["fecha"]
    if(descripcion.value!=="" && valor.value!==""){
        if(tipo.value==="ingreso"){
            ingresos.push(new ingreso(descripcion.value,Number(valor.value),fecha.value))
            cargarCabecero()
            cargarIngresos()
        }else if(tipo.value==="egreso"){
            egresos.push(new egreso(descripcion.value,Number(valor.value),fecha.value))
            cargarCabecero()
            cargarEgresos()
        }
        limpiarDescripcion()
    }
    actualizarStorage()
}

const limpiarDescripcion=()=>{
    let forma=document.forms["forma"]
    forma["descripcion"].value=""
    forma["valor"].value=""
}

const buscarStorage=()=>{
    let ingresosStorage = localStorage.getItem("INGRESOS")
    if(!ingresosStorage){
        localStorage.setItem("INGRESOS",ingresos)
    }else{
        let movimientos = JSON.parse(ingresosStorage)
        for(let i = 0;i<movimientos.length;i++){
            ingresos.push(new ingreso(movimientos[i]._descripcion,movimientos[i]._valor,movimientos[i]._fecha))
        }
    }

    let egresosStorage = localStorage.getItem("EGRESOS")
    if(!egresosStorage){
        localStorage.setItem("EGRESOS",egresos)
    }else{
        let movimientos2 = JSON.parse(egresosStorage)
        for(let i = 0;i<movimientos2.length;i++){
            egresos.push(new egreso(movimientos2[i]._descripcion,movimientos2[i]._valor,movimientos2[i]._fecha))
        }
    }
}

const actualizarStorage=()=>{
    localStorage.setItem("INGRESOS",JSON.stringify(ingresos))
    localStorage.setItem("EGRESOS",JSON.stringify(egresos))
}