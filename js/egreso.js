class egreso extends Dato{
    static contadorEgresos=0

    constructor(descripcion,valor,fecha){
        super(descripcion,valor,fecha)
        this._id= ++egreso.contadorEgresos
    }
    get id(){
        return this._id
    }
}