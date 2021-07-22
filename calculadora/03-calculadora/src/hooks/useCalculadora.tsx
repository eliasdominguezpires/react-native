import { useRef, useState } from "react";

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {

    const [numero, setNumero] = useState('0');
    const [numeroPequeno, setNumeroPequeno] = useState('0');

    const ultimaOperacion = useRef<Operadores>();
    const ultimoResultado = useRef(0);


    const limpiar = () => {
        setNumero('0');
        setNumeroPequeno('0');
        ultimoResultado.current = 0;
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

    const cambiarNumeroPorAnterior = (operador: string) => {
        let historico = '';
        if (numero.endsWith('.')) {
            historico = (numeroPequeno != '0')
                ? numeroPequeno + numero.slice(0, -1) + operador
                : numero.slice(0, -1) + operador;
            console.log(historico);

            setNumeroPequeno(historico);
        } else {
            historico = (numeroPequeno != '0')
                ? numeroPequeno + numero + operador
                : numero + operador;
            console.log(historico);

            setNumeroPequeno(historico);
        }
        setNumero('0');
    }

    const btnOperaciones = (operador: string) => {

        cambiarNumeroPorAnterior(operador)

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
        if (ultimoResultado.current != 0) {
            console.log('distinto a 0 ' + ultimoResultado.current);
            calcular();
        }
        else {
            ultimoResultado.current = Number(numero);
            console.log(ultimoResultado.current);
        }

    }

    const calcular = () => {

        const num1 = Number(numero);
        const num2 = Number(ultimoResultado.current);
        let result = 0;
        console.log('num1 ' + num1 + '   num2 ' + num2);


        switch (ultimaOperacion.current) {
            case Operadores.dividir:
                result = num2 / num1;
                if (!isFinite(result)) {
                    setNumero('división no valida')
                } else {
                    setNumero(`${(result)}`);
                }
                break;
            case Operadores.multiplicar:
                result = num1 * num2;
                setNumero(`${result}`);
                break;
            case Operadores.sumar:
                result = num1 + num2;
                setNumero(`${result}`);
                break;
            case Operadores.restar:
                result = num2 - num1;
                setNumero(`${result}`);
                break;

            default:
                break;
        }
        ultimoResultado.current = result;
        console.log('Ultimo Resultado calcular ' + ultimoResultado.current);

        //setNumeroPequeno('0');
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