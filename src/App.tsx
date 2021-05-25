import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonAlert,
} from "@ionic/react";
import ControlaImc from "./components/ControlaImc";
import ResultadoImc from "./components/ResultadoImc";
import ControlaInput from "./components/ControlaInput"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ControlaIm from "./components/ControlaImc";
import { text } from "ionicons/icons";

const App: React.FC = () => {
  const [calcimc, setcalcimc] = useState<number>();
  const [situacao, setsituacao] = useState<String>();
  const [erro, seterro] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg')

  const pesoref = useRef<HTMLIonInputElement>(null);
  const alturaref = useRef<HTMLIonInputElement>(null);

  const calculaimc = () => {
    const pesovalor = pesoref.current!.value;
    const alturavalor = alturaref.current!.value;

    if (!alturavalor || !pesovalor || +alturavalor <= 0 || +pesovalor <= 0) {
      seterro('Por favor, digite um valor válido!');
      return;
    }
    const pesoConverte = calcUnits === 'ftlbs' ? 2.2 : 1;
    const alturaConverte = calcUnits === 'ftlbs' ? 3.28 : 1;

    const peso = +pesovalor / pesoConverte
    const altura = +alturavalor / alturaConverte
    
    const imc = peso / (altura * altura);
    
    setcalcimc(imc);
    if (imc < 18.5) {
      setsituacao("Abaixo do peso!");
    } else if (imc <= 24.9) {
      setsituacao("Peso Normal! Parabéns");
    } else if (imc <= 29.9) {
      setsituacao("Um pouco acima do peso...");
    } else if (imc <= 34.9) {
      setsituacao("Obesidade grau 1");
    } else if (imc <= 39.9) {
      setsituacao("Obesidade grau 2");
    } else {
      setsituacao("Obesidade grau 3, situação crítica...");
    }
  };

  const reseta = () => {
    pesoref.current!.value = "";
    alturaref.current!.value = "";
  };

  const arrumaerro = () => {
    seterro('')
  }

  const selectCalcUnitHandler = (selectedValue: 'mkg' | 'ftlbs') => {
    setCalcUnits(selectedValue)
  }

  
  return (
    <React.Fragment>
      <IonAlert isOpen={!!erro} 
      message={erro} 
      buttons={[{text: 'Ok', handler: arrumaerro}]} />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Cálculo IMC</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <ControlaInput selectedValue={calcUnits} onSelectedValue={selectCalcUnitHandler}/>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Digite sua altura ({calcUnits === 'mkg' ? 'metros' : 'feet'}):
                  </IonLabel>
                  <IonInput
                    id="inputaltura"
                    type="number"
                    ref={alturaref}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Digite seu peso ({calcUnits === 'mkg' ? 'kg' : 'lbs'}): 
                  </IonLabel>
                  <IonInput
                    id="inputpeso"
                    type="number"
                    ref={pesoref}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <ControlaImc onCalculate={calculaimc} onReset={reseta} />
            {calcimc && <ResultadoImc result={calcimc} printa={situacao} />}
          </IonGrid> 
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
