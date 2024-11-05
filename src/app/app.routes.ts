import { Routes } from '@angular/router';
import { AccueilComponent } from './composant/accueil/accueil.component';
import { SettingComponent } from './composant/setting/setting.component';
import { MoneyTransferComponent } from './composant/money-transfer/money-transfer.component';
import { ConnexionComponent } from './composant/connexion/connexion.component';
import { VerificationComponent } from './composant/verification/verification.component';
import { SendMoneyComponent } from './composant/send-money/send-money.component';

export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'parametres', component: SettingComponent },
  { path: 'transfert', component: MoneyTransferComponent },
  { path: 'sendmoney', component: SendMoneyComponent },
];
