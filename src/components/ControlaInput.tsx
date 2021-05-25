import React from 'react'
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react'
import { attachProps } from '@ionic/react/dist/types/components/utils'
import { personAddSharp } from 'ionicons/icons'


const ControlaInput: React.FC <{
    selectedValue: 'mkg' | 'ftlbs';
    onSelectedValue: (value: 'mkg' | 'ftlbs') => void;
}> = props =>{
    const trocaTipo = (event: CustomEvent) => {
        props.onSelectedValue(event.detail.value)
    }
    return(
        <IonSegment value={props.selectedValue} onIonChange={trocaTipo}>
            <IonSegmentButton value="mkg">
            <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
        )
    }
export default ControlaInput