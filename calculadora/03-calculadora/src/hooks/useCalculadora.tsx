import { useRef, useState } from "react";

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {

    const [numero, setNumero] = useState('0');
    const [numeroPequeno, setNumeroPequeno] = useState('0');

    const ultimaOperacion = useRef<Operadores>()


    const limpiar = () => {
        setNumero('0');
        setNumeroPequeno('0');
    }

    const armarNumero = (numeroTexto: string) => {
        //no aceptar doble ..
        if (numero.includes('.') && numeroTexto === '.') return;
        //si el numero empeiza con 0 - 0
        if (numero.startsWith('0') || numero.startsWith('-0')) {
            // punto decimal
            if (numeroTexto === '.') {
                setNumero(numero + numeroTexto);
            }
            // si hay otro 0 y hay un punto 
            else if (numeroTexto === '0' && numero.includes('.')) {
                setNumero(numero + numeroTexto);
            }
            //si es diferente de 0 y no tiene punto
            else if (numeroTexto !== '0' && !numero.includes('.')) {
                setNumero(numeroTexto);
            }
            //eviar 0000.0000
            else if (numeroTexto === '0' && numero.includes('.')) {
                setNumero(numero);
            }
        } else {
            setNumero(numero + numeroTexto);
        }
        
    };

    const positivoNegatigo = () => {
        if (numero.includes('-')) {
            setNumero(numero.replace('-', ''));
        } else {
            setNumero('-' + numero);
        }
    };

    const deleteNumero = () => {
        const newNum = numero.slice(0, -1);
        setNumero(newNum === '' || newNum === '-' ? '0' : newNum);
    };

    const cambiarNumeroPorAnterior = () => {
        if (numero.endsWith('.')) {
            setNumeroPequeno(numero.slice(0, -1));
        } else {
            setNumeroPequeno(numero);
        }
        setNumero('0');
    }

    const btnOperaciones = (operador: string) => {
        console.log(operador);

        cambiarNumeroPorAnterior()

        switch (operador) {
            case '/':
                ultimaOperacion.current = (Operadores.dividir)
                break;
            case '*':
                ultimaOperacion.current = (Operadores.multiplicar)
                break;
            case '-':
                ultimaOperacion.current = (Operadores.restar)
                break;
            case '+':
                ultimaOperacion.current = (Operadores.sumar)
                break;
        }

    }

    const calcular = () => {

        const num1 = Number(numero);
        const num2 = Number(numeroPequeno);

        switch (ultimaOperacion.current) {
            case Operadores.dividir:
                let result = num2 / num1;
                if (!isFinite(result)) {
                    setNumero('división no valida')
                } else {
                    setNumero(`${(result)}`);
                }
                break;
            case Operadores.multiplicar:
                setNumero(`${num1 * num2}`);
                break;
            case Operadores.sumar:
                setNumero(`${num1 + num2}`);
                break;
            case Operadores.restar:
                setNumero(`${num2 - num1}`);
                break;

            default:
                break;
        }
        setNumeroPequeno('0');
    }

    return {
        numeroPequeno,
        numero,
        limpiar,
        positivoNegatigo,
        deleteNumero,
        btnOperaciones,
        armarNumero,
        calcular,
    }

}