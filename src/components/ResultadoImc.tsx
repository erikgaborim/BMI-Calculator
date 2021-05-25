import React from 'react'

import { IonRow, IonCard, IonCol, IonCardContent} from '@ionic/react'
import { attachProps } from '@ionic/react/dist/types/components/utils'
import { StringDecoder } from 'string_decoder'

const ResultadoImc: React.FC <{result: number; printa: String | undefined;}> = props => {
    return(
        <IonRow>
            <IonCol>
                <IonCard class="ion-text-center" color="dark">
                    <IonCardContent>
                        <h2>Seu Índice de Massa Corporal é: </h2>
                            <h3>{props.result.toFixed(2)} </h3>
                    </IonCardContent>
                </IonCard>
                <IonCard class="ion-text-center" color="dark">
                    <IonCardContent>
                        <h2>{props.printa}</h2>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    )
}

export default ResultadoImc