import React from 'react'
import { Text, View } from 'react-native'
import { BotonCalc } from '../components/BotonCalc'
import { styles } from '../theme/appTheme'
import { useCalculadora } from '../hooks/useCalculadora';

export const Calculadora = () => {

    const { numeroPequeno,
        numero,
        limpiar,
        positivoNegatigo,
        deleteNumero,
        btnOperaciones,
        armarNumero,
        calcular, } = useCalculadora();

    return (
        <View style={styles.calculadoraContainer}>
            {
                (numeroPequeno !== '0')
                && (<Text style={styles.resultadoPequeno}>{numeroPequeno}</Text>)
            }

            <Text style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {numero}
            </Text>

            {/* Fila de Botons */}
            <View style={styles.fila}>
                <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
                <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegatigo} />
                <BotonCalc texto="del" color="#9B9B9B" accion={deleteNumero} />
                <BotonCalc texto="/" color="#FF9427" accion={() => btnOperaciones('/')} />
            </View>
            {/* Fila Botones */}
            <View style={styles.fila}>
                <BotonCalc texto="7" accion={armarNumero} />
                <BotonCalc texto="8" accion={armarNumero} />
                <BotonCalc texto="9" accion={armarNumero} />
                <BotonCalc texto="x" color="#FF9427" accion={() => btnOperaciones('x')} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="5" accion={armarNumero} />
                <BotonCalc texto="5" accion={armarNumero} />
                <BotonCalc texto="6" accion={armarNumero} />
                <BotonCalc texto="-" color="#FF9427" accion={() => btnOperaciones('-')} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="1" accion={armarNumero} />
                <BotonCalc texto="2" accion={armarNumero} />
                <BotonCalc texto="3" accion={armarNumero} />
                <BotonCalc texto="+" color="#FF9427" accion={() => btnOperaciones('+')} />
            </View>
            <View style={styles.fila}>
                <BotonCalc texto="0" accion={armarNumero} ancho />
                <BotonCalc texto="." accion={armarNumero} />
                <BotonCalc texto="=" color="#FF9427" accion={calcular} />
            </View>

        </View>
    )
}

{/* 2D2D2D Gris Oscuro */ }
{/* FF9427 narana*/ }
{/* 9B9B9B Gris claro */ }