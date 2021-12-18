class ingreso extends Dato{
    static contadorIngresos = 0

    constructor(descripcion,valor,fecha){
        super(descripcion,valor,fecha)
        this._id= ++ingreso.contadorIngresos
    }
    get id(){
        return this._id
    }
}